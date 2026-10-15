import {
  app,
  autoUpdater,
  dialog,
  Menu,
  type MenuItemConstructorOptions,
  type MessageBoxOptions,
} from 'electron';
import log from 'electron-log';
import semver from 'semver';

import { t } from '@/main/frameworks/locale';

/**
 * Application menu service (macOS only).
 *
 * Defines the macOS menu-bar application menu (the `Tiro` dropdown) and the
 * manual "Check for Updates..." flow that lives under "About Tiro".
 *
 * The manual check uses native `dialog.showMessageBox` from the main process
 * (like Slack / Notion / Figma) so it ALWAYS shows feedback regardless of which
 * renderer screen is visible (login, permission, in-app, hidden window, etc.).
 *
 * NOTE: this app uses Electron's *native* `autoUpdater` (Squirrel.Mac), not
 * `electron-updater`. Its `update-not-available` event is unreliable on
 * repeated/concurrent calls, so availability is decided by reading the update
 * feed (RELEASES.json) directly and comparing versions with semver.
 * `autoUpdater` is used only to *download* and *install* (`quitAndInstall`
 * installs the newest staged build). When a download completes, the global
 * `update-downloaded` handler flips the menu to "Restart to Apply Update"
 * (same pattern as Notion: a one-shot notice, then the menu morphs).
 */

type UpdateMenuState =
  | { kind: 'idle' }
  | { kind: 'checking' }
  | { kind: 'pending'; newVersion: string };

type AppMenuDeps = {
  /**
   * Applies the staged update and restarts. Owned by the main entry point so it
   * reuses the exact same bookkeeping as the existing `update` IPC handler
   * (`attempted_install_version`, overlay teardown, delayed quitAndInstall).
   */
  applyUpdate: () => void;
  /** Update feed URL (RELEASES.json) used to authoritatively detect new versions. */
  feedUrl: string;
  /**
   * Returns the version of the currently staged/downloaded update (the
   * `pending_update` the main entry point tracks), or null if none is staged.
   */
  getPendingVersion: () => string | null;
};

/** How long to wait for the feed request before giving up. */
const FEED_FETCH_TIMEOUT_MS = 10 * 1000;

let deps: AppMenuDeps | null = null;
let updateState: UpdateMenuState = { kind: 'idle' };

/** App-modal message box (no parent) so it shows on any screen / window state. */
const showMessageBox = (
  options: MessageBoxOptions,
): Promise<Electron.MessageBoxReturnValue> => dialog.showMessageBox(options);

/**
 * Reads the update feed (RELEASES.json) and returns its `currentRelease`
 * version, or null on any failure. This is the authoritative source of "what is
 * the latest version" — far more reliable than native autoUpdater events.
 *
 * A cache-busting query param + `no-store` keeps the manual check truly live
 * (no stale CDN/disk cache), so "Check for Updates..." reflects the feed now.
 */
const fetchLatestFeedVersion = async (): Promise<string | null> => {
  if (!deps?.feedUrl) return null;

  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), FEED_FETCH_TIMEOUT_MS);
  try {
    const url = `${deps.feedUrl}?_=${Date.now()}`;
    const response = await fetch(url, {
      cache: 'no-store',
      signal: controller.signal,
    });
    if (!response.ok) {
      log.error('appMenu: update feed responded with', response.status);
      return null;
    }
    const data = (await response.json()) as { currentRelease?: unknown };
    return typeof data.currentRelease === 'string' ? data.currentRelease : null;
  } catch (error) {
    log.error('appMenu: failed to fetch update feed', error);
    return null;
  } finally {
    clearTimeout(timer);
  }
};

/** Shows the "ready to install" prompt; installs only on explicit confirm. */
const promptInstall = async (version: string): Promise<void> => {
  setUpdateMenuState({ kind: 'pending', newVersion: version });
  const installIndex = 0;
  const { response } = await showMessageBox({
    type: 'info',
    message: t('appMenu.available.message', { version }),
    detail: t('appMenu.available.detail'),
    buttons: [t('appMenu.available.updateNow'), t('appMenu.available.later')],
    defaultId: installIndex,
    cancelId: 1,
  });
  if (response === installIndex) {
    deps?.applyUpdate();
  }
};

/**
 * Handles the "Check for Updates..." menu action. Reads the live feed to decide
 * authoritatively whether a newer version exists, then shows a native dialog.
 * Never quits the app on its own — installing happens only when the user
 * explicitly confirms "Install Now".
 */
async function handleManualCheck(): Promise<void> {
  if (process.platform !== 'darwin' || !deps) return;

  setUpdateMenuState({ kind: 'checking' });

  const latestVersion = await fetchLatestFeedVersion();
  const currentVersion = app.getVersion();

  // Could not read the feed → report an error rather than a false "up to date".
  if (!latestVersion) {
    setUpdateMenuState({ kind: 'idle' });
    await showMessageBox({
      type: 'error',
      message: t('appMenu.error.message'),
      detail: t('appMenu.error.detail'),
      buttons: [t('appMenu.error.confirm')],
      defaultId: 0,
    });
    return;
  }

  // Already on (or ahead of) the latest version → up to date.
  if (!semver.gt(latestVersion, currentVersion)) {
    setUpdateMenuState({ kind: 'idle' });
    await showMessageBox({
      type: 'info',
      message: t('appMenu.upToDate.message'),
      detail: t('appMenu.upToDate.detail', { version: currentVersion }),
      buttons: [t('appMenu.upToDate.confirm')],
      defaultId: 0,
    });
    return;
  }

  // A newer version exists and is already staged → offer to install now.
  if (deps.getPendingVersion() === latestVersion) {
    await promptInstall(latestVersion);
    return;
  }

  // Not staged yet: start the background download and tell the user (Notion
  // pattern — a one-shot notice). The menu stays responsive (idle); when the
  // download finishes, the global `update-downloaded` handler flips it to
  // "Restart to Apply Update", which the user clicks to install.
  setUpdateMenuState({ kind: 'idle' });
  try {
    autoUpdater.checkForUpdates();
  } catch (error) {
    log.error('appMenu: checkForUpdates threw', error);
  }
  await showMessageBox({
    type: 'info',
    message: t('appMenu.downloading.message'),
    detail: t('appMenu.downloading.detail', {
      current: currentVersion,
      latest: latestVersion,
    }),
    buttons: [t('appMenu.downloading.confirm')],
    defaultId: 0,
  });
}

/**
 * Handles the "Restart to Apply Update" menu action: applies the newest staged
 * build and restarts. `quitAndInstall` installs the latest staged build; the
 * background poll + manual check keep the staged build current.
 */
function handleRestartToApply(): void {
  if (process.platform !== 'darwin' || !deps) return;
  deps.applyUpdate();
}

// Menu-bar labels are intentionally always English (like macOS app menus from
// Linear/Slack), regardless of the in-app language. Only the dialogs shown
// after clicking follow the user's Tiro language setting (via `t`).
const ABOUT_LABEL = 'About Tiro';
const CHECK_FOR_UPDATES_LABEL = 'Check for Updates...';
const CHECKING_LABEL = 'Checking for Updates…';
const RESTART_TO_APPLY_LABEL = 'Restart to Apply Update';

/** Lets the native menu click finish before this service rebuilds the menu. */
const runAfterMenuClick = (callback: () => void): void => {
  setTimeout(callback, 0);
};

/** Builds the morphing update menu item based on the current update state. */
const buildUpdateMenuItem = (): MenuItemConstructorOptions => {
  switch (updateState.kind) {
    case 'pending':
      return {
        label: RESTART_TO_APPLY_LABEL,
        click: () => runAfterMenuClick(handleRestartToApply),
      };
    case 'checking':
      return {
        label: CHECKING_LABEL,
        enabled: false,
      };
    case 'idle':
    default:
      return {
        label: CHECK_FOR_UPDATES_LABEL,
        click: () => runAfterMenuClick(() => void handleManualCheck()),
      };
  }
};

/**
 * Builds and sets the full macOS application menu. No-op on other platforms,
 * which keep Electron's default menu.
 *
 * `setApplicationMenu` replaces the entire menu bar, so the standard
 * File/Edit/View/Window/Help submenus are reproduced via roles (Edit must stay
 * for ⌘C/⌘V etc.). "About Tiro" uses a custom click instead of `role: 'about'`
 * so macOS does not attach an icon — only text, as designed.
 */
export const buildAndSetAppMenu = (): void => {
  if (process.platform !== 'darwin') return;

  const template: MenuItemConstructorOptions[] = [
    {
      label: app.name,
      submenu: [
        { label: ABOUT_LABEL, click: () => app.showAboutPanel() },
        buildUpdateMenuItem(),
        { type: 'separator' },
        { role: 'services' },
        { type: 'separator' },
        { role: 'hide' },
        { role: 'hideOthers' },
        { role: 'unhide' },
        { type: 'separator' },
        { role: 'quit' },
      ],
    },
    { role: 'fileMenu' },
    { role: 'editMenu' },
    { role: 'viewMenu' },
    { role: 'windowMenu' },
    { role: 'help', submenu: [] },
  ];

  Menu.setApplicationMenu(Menu.buildFromTemplate(template));
};

/** Updates the update menu state and rebuilds the menu. */
export const setUpdateMenuState = (next: UpdateMenuState): void => {
  updateState = next;
  buildAndSetAppMenu();
};

/** Wires dependencies and builds the menu for the first time. */
export const initAppMenu = (nextDeps: AppMenuDeps): void => {
  deps = nextDeps;
  buildAndSetAppMenu();
};

/** Test-only reset of module state. */
export const __resetAppMenuStateForTest = (): void => {
  deps = null;
  updateState = { kind: 'idle' };
};
