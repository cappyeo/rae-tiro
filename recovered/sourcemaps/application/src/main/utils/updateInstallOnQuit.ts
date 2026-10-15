import { isNoUpdateAvailableError } from '@/main/utils/updateErrors';

/**
 * The macOS install-on-quit state machine, kept out of `index.ts` so every
 * reachable outcome (skipped / installing / failed) can be driven in a test
 * against a real store double and a fake updater — the persisted marker, the
 * attempted-version bookkeeping and the termination hand-off all change
 * together, and `index.ts` itself cannot be imported under vitest.
 *
 * Background: Squirrel.Mac only swaps the bundle through ShipIt, and ShipIt is
 * only started by `quitAndInstall()`. Windows needs none of this — Squirrel
 * unpacks at download time and its stub exe runs the newest folder — so this
 * whole path is macOS-only.
 */

export const QUIT_INSTALL_FORCE_EXIT_MS = 3000;

/**
 * electron-store writes hit the disk, so clearing a key can fail for the same
 * reason writing it did. Recovery must not become the thing that throws.
 */
const safeDelete = (
  store: MinimalStore,
  key: string,
  log: { error: (message: string, ...args: unknown[]) => void },
): void => {
  try {
    store.delete(key);
  } catch (error) {
    log.error(`quit: could not clear ${key}`, error);
  }
};

/**
 * The click path sets its "installing" flag ~3s before it actually calls
 * quitAndInstall, and on failure it only clears the flag — it never exits. A
 * quit that deferred to it would otherwise leave this already-torn-down process
 * (no window, no tray) alive holding the single-instance lock, so the user
 * could not reopen the app at all. Outlive that attempt, then exit.
 */
export const QUIT_INSTALL_PENDING_EXIT_MS = 10_000;

type MinimalStore = {
  set: (key: string, value: unknown) => void;
  delete: (key: string) => void;
};

type MinimalAutoUpdater = {
  quitAndInstall: () => void;
  once: (event: 'error', listener: (error: Error) => void) => unknown;
};

export type QuitInstallDeps = {
  isMac: boolean;
  /** True once either install path has committed to quitAndInstall. */
  installStarted: boolean;
  /** Version staged IN THIS PROCESS, the only thing Squirrel can install. */
  readyVersion: string | null;
  store: MinimalStore;
  autoUpdater: MinimalAutoUpdater;
  now: () => number;
  markInstallStarted: () => void;
  /** Called the instant Squirrel is asked to install — from then on it owns termination. */
  markInstallHandedOff: () => void;
  markInstallAborted: () => void;
  scheduleForceExit: (delayMs: number) => void;
  onInstallFailed: (params: {
    error: unknown;
    attemptedVersion: string;
  }) => void;
  log: {
    info: (message: string, ...args: unknown[]) => void;
    error: (message: string, ...args: unknown[]) => void;
  };
};

export type QuitInstallResult =
  | { kind: 'skipped'; reason: 'not-mac' | 'no-staged-update' }
  /** Another path already asked Squirrel to install; the caller must not exit. */
  | { kind: 'already-installing' }
  | { kind: 'installing'; version: string }
  | { kind: 'failed'; version: string; isNoUpdateAvailable: boolean };

/**
 * Installs the staged build as the app terminates. Returns the outcome; the
 * caller exits the app itself unless Squirrel took over termination
 * (`installing` / `already-installing`).
 */
export const runInstallStagedUpdateOnQuit = (
  deps: QuitInstallDeps,
): QuitInstallResult => {
  const {
    isMac,
    installStarted,
    readyVersion,
    store,
    autoUpdater,
    now,
    markInstallStarted,
    markInstallHandedOff,
    markInstallAborted,
    scheduleForceExit,
    onInstallFailed,
    log,
  } = deps;

  if (!isMac) return { kind: 'skipped', reason: 'not-mac' };
  if (installStarted) {
    scheduleForceExit(QUIT_INSTALL_PENDING_EXIT_MS);
    return { kind: 'already-installing' };
  }
  if (!readyVersion) return { kind: 'skipped', reason: 'no-staged-update' };

  markInstallStarted();

  log.info('quit: installing staged update', readyVersion);

  // Whether Squirrel was actually asked to install. A failure before that point
  // is not an install attempt, and must not be reported as one.
  let installCallReached = false;

  try {
    // Same bookkeeping as the click-to-update path: the next launch compares
    // this with the version that actually booted (PLT-5221) and reports the
    // outcome. Inside the try because a full disk or a locked config file makes
    // these throw too, and a half-written transition must still land in the
    // recovery path below instead of escaping into the quit handler.
    // Marker first. If the disk refuses the write, nothing has been recorded at
    // all and the next launch has nothing to misread. Writing the attempted
    // version first would leave it behind when the marker write fails, and the
    // next boot would report an install that was never even requested.
    store.set('quit_after_install', { version: readyVersion, at: now() });
    store.set('attempted_install_version', readyVersion);

    // The quit cleanup drops every autoUpdater listener before this runs; an
    // 'error' emitted with no handler would take the process down as an
    // uncaught exception.
    autoUpdater.once('error', (error) => {
      log.error('quit: autoUpdater error while installing', error);
    });

    markInstallHandedOff();
    installCallReached = true;
    autoUpdater.quitAndInstall();
  } catch (error) {
    // The relaunch marker must go, or the next launch would exit on a relaunch
    // that never happened — and clearing it must not throw on the very store
    // failure that brought us here.
    safeDelete(store, 'quit_after_install', log);
    // attempted_install_version is what the next launch compares against the
    // version that booted. Keep it only when Squirrel was actually asked to
    // install (the click path does the same); a failure before that call never
    // attempted anything, so leaving it would report a phantom install failure.
    if (!installCallReached) {
      safeDelete(store, 'attempted_install_version', log);
    }
    markInstallAborted();

    const isNoUpdateAvailable = isNoUpdateAvailableError(error);
    if (isNoUpdateAvailable) {
      log.info('quit: no staged update available to install');
    } else {
      log.error('quit: quitAndInstall failed', error);
      onInstallFailed({ error, attemptedVersion: readyVersion });
    }
    return { kind: 'failed', version: readyVersion, isNoUpdateAvailable };
  }

  // quitAndInstall terminates the process itself. If it ever doesn't, exit
  // anyway rather than leave an invisible window-less process behind — ShipIt
  // waits for this PID to die before swapping the bundle.
  scheduleForceExit(QUIT_INSTALL_FORCE_EXIT_MS);
  return { kind: 'installing', version: readyVersion };
};

/** Whether Squirrel is now responsible for ending this process. */
export const squirrelOwnsTermination = (result: QuitInstallResult): boolean =>
  result.kind === 'installing' || result.kind === 'already-installing';
