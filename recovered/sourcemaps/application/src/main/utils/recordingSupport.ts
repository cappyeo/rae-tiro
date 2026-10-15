import { promises as fs } from 'node:fs';

import { type MessageBoxOptions } from 'electron';
import log from 'electron-log';

import { isVersionAtLeast } from '@/main/utils/audioTapPermission';
import {
  type RecordingSupport,
  type UnsupportedRecordingSupport,
} from '@/renderer/entities/recordingSupport';

const MAC_RECORDING_MINIMUM = { major: 14, minor: 2, label: '14.2' };

export const resolveRecordingSupport = ({
  platform,
  systemVersion,
}: {
  platform: NodeJS.Platform;
  systemVersion: string;
}): RecordingSupport => {
  if (platform !== 'darwin') return { kind: 'supported' };
  if (!/^\d+(\.\d+)*$/.test(systemVersion)) return { kind: 'unavailable' };
  if (
    isVersionAtLeast(
      systemVersion,
      MAC_RECORDING_MINIMUM.major,
      MAC_RECORDING_MINIMUM.minor,
    )
  ) {
    return { kind: 'supported' };
  }
  return {
    kind: 'unsupported-os',
    minimumVersion: MAC_RECORDING_MINIMUM.label,
    systemVersion,
  };
};

export const createRecordingSupportGate = ({
  support,
  showNotice,
}: {
  support: RecordingSupport;
  showNotice: (support: UnsupportedRecordingSupport) => Promise<void>;
}) => {
  let pendingNotice: Promise<void> | null = null;

  return {
    isSupported: () => support.kind === 'supported',
    ensureSupported: async (): Promise<boolean> => {
      if (support.kind === 'supported') return true;
      pendingNotice ??= showNotice(support)
        .catch((error: unknown) => {
          log.warn('[RecordingSupport] notice failed', error);
        })
        .finally(() => {
          pendingNotice = null;
        });
      await pendingNotice;
      return false;
    },
  };
};

type RecordingSupportNoticeDeps = {
  t: (key: string, options?: Record<string, string>) => string;
  webBaseUrl: string | undefined;
  getRecordingDirectories: () => string[];
  showMessageBox: (options: MessageBoxOptions) => Promise<{ response: number }>;
  openExternal: (url: string) => Promise<boolean>;
  openPath: (path: string) => Promise<string>;
};

type NoticeAction = { label: string; run?: () => Promise<unknown> };

const isDirectory = (target: string): Promise<boolean> =>
  fs.stat(target).then(
    (stats) => stats.isDirectory(),
    () => false,
  );

const showActionFailed = (
  deps: RecordingSupportNoticeDeps,
  copyKey: 'webOpenFailed' | 'folderOpenFailed',
) =>
  deps.showMessageBox({
    type: 'warning',
    message: deps.t(`recordingSupport.${copyKey}.message`),
    detail: deps.t(`recordingSupport.${copyKey}.detail`),
    buttons: [deps.t('recordingSupport.close')],
    noLink: true,
  });

const openWeb = async (deps: RecordingSupportNoticeDeps, url: string) => {
  const opened = await deps.openExternal(url).catch((error: unknown) => {
    log.warn('[RecordingSupport] failed to open web', error);
    return false;
  });
  if (!opened) await showActionFailed(deps, 'webOpenFailed');
};

const openRecordingFolders = async (deps: RecordingSupportNoticeDeps) => {
  const candidates = deps.getRecordingDirectories();
  const existing = (
    await Promise.all(
      candidates.map(async (directory) =>
        (await isDirectory(directory)) ? directory : null,
      ),
    )
  ).filter((directory): directory is string => directory !== null);

  let openedCount = 0;
  for (const directory of existing) {
    const error = await deps
      .openPath(directory)
      .catch((reason: unknown) => String(reason));
    if (error) {
      log.warn(`[RecordingSupport] failed to open ${directory}: ${error}`);
    } else {
      openedCount += 1;
    }
  }
  if (openedCount === 0) await showActionFailed(deps, 'folderOpenFailed');
};

export const showRecordingSupportNotice = async (
  support: UnsupportedRecordingSupport,
  deps: RecordingSupportNoticeDeps,
): Promise<void> => {
  const copyKey =
    support.kind === 'unsupported-os'
      ? 'recordingSupport.unsupportedOs'
      : 'recordingSupport.unavailable';
  const copyValues = { minimumVersion: MAC_RECORDING_MINIMUM.label };
  const { webBaseUrl } = deps;
  const actions: NoticeAction[] = [
    ...(webBaseUrl
      ? [
          {
            label: deps.t('recordingSupport.recordOnWeb'),
            run: () => openWeb(deps, webBaseUrl),
          },
        ]
      : []),
    {
      label: deps.t('recordingSupport.openRecordingFolder'),
      run: () => openRecordingFolders(deps),
    },
    { label: deps.t('recordingSupport.close') },
  ];

  const { response } = await deps.showMessageBox({
    type: 'warning',
    message: deps.t(`${copyKey}.message`, copyValues),
    detail: deps.t(`${copyKey}.detail`, copyValues),
    buttons: actions.map(({ label }) => label),
    defaultId: 0,
    cancelId: actions.length - 1,
    noLink: true,
  });

  try {
    await actions[response]?.run?.();
  } catch (error) {
    log.warn('[RecordingSupport] notice action failed', error);
  }
};
