import log from 'electron-log';

import { getCurrentLocale, t } from '@/main/frameworks/locale';
import {
  type CallApp,
  clampMeetingEndPollMs,
  diffCallAppMicState,
  type MicInputProcessLike,
  resolveCallAppsHoldingMic,
} from '@/main/utils/meetingEndCallApp';
import {
  createNotificationWindow,
  getLocaleSelectOptions,
} from '@/main/utils/window';

let isTiroUsingMic = false;
let isTiroUsingMicTimeout: NodeJS.Timeout | null = null;
const MIC_IN_USE_CHECK_INTERVAL_MS = 5 * 1000; // 5 seconds

export const setIsTiroUsingMic = (value: boolean) => {
  if (isTiroUsingMicTimeout) {
    clearTimeout(isTiroUsingMicTimeout);
    isTiroUsingMicTimeout = null;
  }

  if (value) {
    isTiroUsingMic = true;
  } else {
    // Delay clearing the flag to account for OS mic release time
    isTiroUsingMicTimeout = setTimeout(() => {
      isTiroUsingMic = false;
    }, MIC_IN_USE_CHECK_INTERVAL_MS * 2);
  }
};

/**
 * Start monitoring microphone usage and show a custom notification window
 * when microphone becomes in-use. Returns the interval ID.
 * Supported on macOS and Windows.
 */
export const startMicInUseNotificationMonitor = (
  getNotificationEnabled: () => boolean,
  getRecordingPreferences?: () => {
    transcribeLocale?: string;
    summaryLocale?: string;
  },
): NodeJS.Timeout | null => {
  let wasMicInUse = false;

  // eslint-disable-next-line @typescript-eslint/no-require-imports
  const microphone = require('@plato-corp/microphone');

  if (typeof microphone?.isOtherAppUsingMic !== 'function') {
    log.warn(
      'Microphone module loaded but isOtherAppUsingMic is not a function',
    );
    return null;
  }

  const timer = setInterval(() => {
    // Use the new native function that automatically excludes Tiro's own microphone usage.
    // Guarded: a native throw here would otherwise reach uncaughtException,
    // whose handler calls process.exit(1) — killing the app mid-recording.
    let inUse = false;
    try {
      inUse = Boolean(microphone.isOtherAppUsingMic());
    } catch (error) {
      log.warn('isOtherAppUsingMic threw — skipping mic-in-use tick', error);
      return;
    }

    if (inUse && !wasMicInUse) {
      // Check if notification is enabled
      const isEnabled = getNotificationEnabled();
      if (!isEnabled) {
        wasMicInUse = inUse;
        return;
      }

      // Skip notification if Tiro itself is recording
      if (isTiroUsingMic) {
        wasMicInUse = inUse;
        return;
      }

      try {
        const preferences = getRecordingPreferences?.() ?? {};
        const appLocale = getCurrentLocale();
        const localeOptions = getLocaleSelectOptions(appLocale);

        createNotificationWindow({
          title: t('notifications.micInUse.title'),
          body: t('notifications.micInUse.body'),
          action: {
            text: t('notifications.micInUse.action'),
            callbackUrl: 'tiro://mic/create-note?title=Untitled',
          },
          languageSelect: {
            transcribeLocale: preferences.transcribeLocale ?? '',
            summaryLocale: preferences.summaryLocale ?? '',
            transcribeLocales: localeOptions.transcribeLocales,
            summaryLocales: localeOptions.summaryLocales,
            startRecordingText: t('notifications.micInUse.startRecording'),
          },
        });
      } catch (error) {
        log.error('Failed to show mic notification window:', error);
      }
    }

    wasMicInUse = inUse;
  }, MIC_IN_USE_CHECK_INTERVAL_MS);

  return timer;
};

export type MeetingEndMicEdge = {
  kind: 'acquired' | 'released';
  /** Which known call app changed state (e.g. 'zoom' / 'teams'). */
  app: string;
  atMs: number;
};

/**
 * Watch which CALL APPS hold the microphone and emit per-app acquire/release
 * EDGES. Unlike the device-level boolean (`isOtherAppUsingMic`, which is
 * hardwired false while Tiro's own session is active), the per-app enumeration
 * (`getMicInputProcesses`, @plato-corp/microphone >= 1.1.0) works WHILE Tiro
 * records — the only window where meeting-end detection matters.
 *
 * Exclusion strategy: Tiro's own processes are excluded by pid set
 * (`getTiroPids`, rebuilt per poll — Electron helper pids churn), and
 * identifiers that map to no known call app (browsers, the capture sidecar,
 * unknown helpers) are ignored by the mapping — so neither can ever produce a
 * false edge.
 *
 * On @plato-corp/microphone < 1.1.0 (or any load failure) the monitor stays
 * DORMANT (returns null, logged) — fail-safe: no signals, no prompts.
 *
 * `prev` starts empty, so if a call app already holds the mic when monitoring
 * begins (recording started mid-call — the common case), the first poll emits
 * `acquired`, seeding the detector before the eventual `released`.
 *
 * This NEVER touches the audio-capture path — it only reads process metadata.
 * The renderer-side detector applies all guards and decides whether to prompt.
 */
export const startMeetingEndPerAppMonitor = (
  emit: (edge: MeetingEndMicEdge) => void,
  options: { pollMs?: number; getTiroPids: () => ReadonlySet<number> },
): NodeJS.Timeout | null => {
  // Guarded require: a native LOAD failure (ABI mismatch, missing arch slice)
  // must leave the monitor dormant, not reject the IPC invoke — same fail-safe
  // as the missing-export case below.
  let loaded: { getMicInputProcesses?: () => MicInputProcessLike[] };
  try {
    // eslint-disable-next-line @typescript-eslint/no-require-imports
    loaded = require('@plato-corp/microphone') as {
      getMicInputProcesses?: () => MicInputProcessLike[];
    };
  } catch (error) {
    log.warn(
      '[meeting-end] @plato-corp/microphone failed to load — monitor dormant',
      error,
    );
    return null;
  }
  const getMicInputProcesses = loaded?.getMicInputProcesses;

  if (typeof getMicInputProcesses !== 'function') {
    log.warn(
      '[meeting-end] getMicInputProcesses unavailable (needs @plato-corp/microphone >= 1.1.0) — monitor dormant',
    );
    return null;
  }

  const pollMs = clampMeetingEndPollMs(options.pollMs);
  let prev = new Set<CallApp>();

  const poll = () => {
    let processes: MicInputProcessLike[] = [];
    try {
      processes = getMicInputProcesses() ?? [];
    } catch (error) {
      log.warn('[meeting-end] getMicInputProcesses threw', error);
      return;
    }

    const apps = new Set(
      resolveCallAppsHoldingMic(processes, options.getTiroPids()),
    );
    const { acquired, released } = diffCallAppMicState(prev, apps);
    const atMs = Date.now();
    for (const app of acquired) {
      emit({ kind: 'acquired', app, atMs });
    }
    for (const app of released) {
      emit({ kind: 'released', app, atMs });
    }
    prev = apps;
  };

  // Seed immediately: a call app already holding the mic at start must emit
  // its 'acquired' NOW — sampling only inside setInterval would make a release
  // within the first poll window invisible (missed meeting-end edge).
  poll();

  return setInterval(poll, pollMs);
};
