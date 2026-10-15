import { type MenuItemConstructorOptions } from 'electron';

import { t } from '@/main/frameworks/locale';

/** Renderer-side actions a menu click delegates to the renderer process. */
export type WindowsAppMenuAction =
  | 'new-note'
  | 'open-settings'
  | 'open-shortcuts'
  | 'logout';

export type WindowsAppMenuDeps = {
  /**
   * Whether a user is signed in. When false (e.g. the login screen), the
   * session-only items (New Note / Settings / Log Out) are omitted.
   */
  isAuthenticated: boolean;
  /** Whether a newer update is already downloaded and ready to install. */
  isUpdateReady: boolean;
  /** Runs the manual update check (shows native dialogs). */
  onCheckForUpdates: () => void;
  /** Applies the staged update and restarts. */
  onRestartToApply: () => void;
  /** Quits the app completely. */
  onQuit: () => void;
  /** Opens the changelog in the external browser. */
  onOpenChangelog: () => void;
  /** Shows the native About panel. */
  onAbout: () => void;
  /** Delegates a renderer-side action (new note / settings / shortcuts / logout). */
  onRendererAction: (action: WindowsAppMenuAction) => void;
  /** Include the developer-tools entry (dev builds only). */
  includeDevTools: boolean;
};

/**
 * Builds the native Windows app-menu template (the icon-triggered menu that
 * mimics Notion/Slack: File / Edit / View / Help).
 *
 * The menu is popped up on demand (`Menu.popup`) rather than set as the
 * application menu, so its accelerators are display-only and do NOT hijack the
 * existing renderer shortcuts (`mod+n`, `mod+,`, `mod+/`) — the labels simply mirror
 * those already-working shortcuts. Edit/View use roles so copy/paste/zoom work
 * via Electron/Chromium without extra wiring.
 *
 * Rebuilding on each popup makes the update item morph automatically:
 * "Check for Updates" → "Restart to Apply Update" once a build is staged.
 *
 * Pure (no electron runtime imports) so it can be unit-tested.
 */
export const buildWindowsAppMenuTemplate = (
  deps: WindowsAppMenuDeps,
): MenuItemConstructorOptions[] => {
  const updateItem: MenuItemConstructorOptions = deps.isUpdateReady
    ? {
        label: t('titlebar.menu.restartToApply'),
        click: () => deps.onRestartToApply(),
      }
    : {
        label: t('titlebar.menu.checkForUpdates'),
        click: () => deps.onCheckForUpdates(),
      };

  const viewSubmenu: MenuItemConstructorOptions[] = [
    { role: 'reload', label: t('titlebar.menu.reload') },
    { type: 'separator' },
    { role: 'resetZoom', label: t('titlebar.menu.resetZoom') },
    { role: 'zoomIn', label: t('titlebar.menu.zoomIn') },
    { role: 'zoomOut', label: t('titlebar.menu.zoomOut') },
    { type: 'separator' },
    { role: 'togglefullscreen', label: t('titlebar.menu.toggleFullscreen') },
  ];
  if (deps.includeDevTools) {
    viewSubmenu.push({
      role: 'toggleDevTools',
      label: t('titlebar.menu.toggleDevTools'),
    });
  }

  const fileSubmenu: MenuItemConstructorOptions[] = [];
  if (deps.isAuthenticated) {
    fileSubmenu.push(
      {
        label: t('titlebar.menu.newNote'),
        accelerator: 'CmdOrCtrl+N',
        click: () => deps.onRendererAction('new-note'),
      },
      {
        label: t('titlebar.menu.settings'),
        accelerator: 'CmdOrCtrl+,',
        click: () => deps.onRendererAction('open-settings'),
      },
      { type: 'separator' },
    );
  }
  fileSubmenu.push(updateItem, { type: 'separator' });
  if (deps.isAuthenticated) {
    fileSubmenu.push({
      label: t('titlebar.menu.logout'),
      click: () => deps.onRendererAction('logout'),
    });
  }
  fileSubmenu.push({
    label: t('titlebar.menu.quit'),
    accelerator: 'CmdOrCtrl+Q',
    click: () => deps.onQuit(),
  });

  return [
    {
      label: t('titlebar.menu.file'),
      submenu: fileSubmenu,
    },
    {
      label: t('titlebar.menu.edit'),
      submenu: [
        { role: 'undo', label: t('titlebar.menu.undo') },
        { role: 'redo', label: t('titlebar.menu.redo') },
        { type: 'separator' },
        { role: 'cut', label: t('titlebar.menu.cut') },
        { role: 'copy', label: t('titlebar.menu.copy') },
        { role: 'paste', label: t('titlebar.menu.paste') },
        { role: 'selectAll', label: t('titlebar.menu.selectAll') },
      ],
    },
    {
      label: t('titlebar.menu.view'),
      submenu: viewSubmenu,
    },
    {
      label: t('titlebar.menu.help'),
      submenu: [
        ...(deps.isAuthenticated
          ? [
              {
                label: t('titlebar.menu.keyboardShortcuts'),
                accelerator: 'CmdOrCtrl+/',
                click: () => deps.onRendererAction('open-shortcuts'),
              },
            ]
          : []),
        {
          label: t('titlebar.menu.changelog'),
          click: () => deps.onOpenChangelog(),
        },
        {
          label: t('titlebar.menu.about'),
          click: () => deps.onAbout(),
        },
      ],
    },
  ];
};
