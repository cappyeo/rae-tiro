import semver from 'semver';

/**
 * Decides which update metadata is safe to expose or install. Persisted metadata
 * can trigger a re-download after a restart, but only an update that reached
 * `update-downloaded` in this process is ready for Squirrel to install.
 */
export const decideUpdateReadiness = <
  T extends { newVersion: string },
>(params: {
  currentVersion: string;
  inProcessUpdate: T | null;
  persistedVersion: string | null;
}): {
  readyUpdate: T | null;
  shouldClearPersistedUpdate: boolean;
} => {
  const { currentVersion, inProcessUpdate, persistedVersion } = params;
  return {
    readyUpdate:
      inProcessUpdate !== null &&
      semver.gt(inProcessUpdate.newVersion, currentVersion)
        ? inProcessUpdate
        : null,
    shouldClearPersistedUpdate:
      persistedVersion !== null && !semver.gt(persistedVersion, currentVersion),
  };
};

/**
 * Parses the latest (highest) version from a Squirrel.Windows `RELEASES`
 * manifest. Each line looks like:
 *
 *   <SHA1> <PackageName>-<version>-full.nupkg <size>
 *
 * (delta entries use `-delta.nupkg`). We extract every semver-looking version
 * token and return the greatest one, or null if the manifest has none.
 *
 * Reading the feed directly and comparing with semver is far more reliable than
 * trusting Squirrel's `update-not-available` event, which yields false
 * negatives on repeated/concurrent checks (see PR #1277 for the macOS rationale).
 */
export const parseLatestWindowsReleaseVersion = (
  releasesText: string,
): string | null => {
  const versions = releasesText
    .split('\n')
    .map((line) => line.trim())
    .filter(Boolean)
    .map((line) => {
      const match = line.match(/(\d+\.\d+\.\d+)/);
      return match ? match[1] : null;
    })
    .filter((version): version is string => version !== null);

  if (versions.length === 0) return null;

  return versions.reduce((max, version) =>
    semver.gt(version, max) ? version : max,
  );
};

/**
 * Parses the `currentRelease` version from a macOS Squirrel.Mac `RELEASES.json`
 * feed body. Returns null when the field is missing or not a string.
 */
export const parseCurrentReleaseVersion = (json: unknown): string | null => {
  if (
    typeof json === 'object' &&
    json !== null &&
    'currentRelease' in json &&
    typeof (json as { currentRelease: unknown }).currentRelease === 'string'
  ) {
    return (json as { currentRelease: string }).currentRelease;
  }
  return null;
};

/**
 * The action a manual "Check for Updates" should take, decided purely from
 * versions (no I/O) so it can be unit-tested. The caller renders the matching
 * native dialog and performs the install.
 *
 * - `install-staged` : a newer build is already downloaded → offer to install.
 * - `up-to-date`     : running version is the latest.
 * - `download`       : a newer version exists, not yet downloaded.
 * - `error`          : the feed could not be read (never a false "up to date").
 */
export type UpdateCheckDecision =
  | { kind: 'install-staged'; version: string }
  | { kind: 'up-to-date' }
  | { kind: 'download'; version: string }
  | { kind: 'error' };

export const decideUpdateAction = (params: {
  currentVersion: string;
  stagedVersion: string | null;
  latestVersion: string | null;
}): UpdateCheckDecision => {
  const { currentVersion, stagedVersion, latestVersion } = params;

  // A newer build is already staged → install it directly.
  if (stagedVersion && semver.gt(stagedVersion, currentVersion)) {
    return { kind: 'install-staged', version: stagedVersion };
  }

  // Feed unreadable → surface an error rather than a false "up to date".
  if (!latestVersion) {
    return { kind: 'error' };
  }

  if (!semver.gt(latestVersion, currentVersion)) {
    return { kind: 'up-to-date' };
  }

  return { kind: 'download', version: latestVersion };
};

/**
 * Whether the periodic background update check should SKIP calling
 * `autoUpdater.checkForUpdates()` because a newer build is already staged.
 *
 * On Electron 39.7.0 the macOS Squirrel.Mac path has a bug (electron #49365 /
 * #50200, fixed in 39.8.1) where re-checking after a build is downloaded/staged
 * DELETES the staged update, so the later `quitAndInstall()` fails with "No
 * update available" and the app never moves off the old version (Windows has the
 * same class of bug, #6647). So once a newer build is staged we stop re-checking
 * and just keep surfacing it; normal checks resume after it is applied on the
 * next launch.
 *
 * A build newer than the staged one is picked up only AFTER the staged one is
 * applied — deliberately: re-checking to "jump" to it would reset the staged
 * build and re-introduce the bug above (the jump's download window leaves the
 * user with no applicable staged build if it fails). The wait is bounded by the
 * user restarting to apply what's already staged. (PLT-5221)
 */
export const shouldSkipBackgroundCheck = (params: {
  currentVersion: string;
  stagedVersion: string | null;
}): boolean => {
  const { currentVersion, stagedVersion } = params;
  return stagedVersion !== null && semver.gt(stagedVersion, currentVersion);
};

/**
 * A `backend=development` QA artifact is packaged with the production app id,
 * version and update feed — only its API URLs differ. Left alone it polls the
 * release feed every 5 minutes, so the moment production ships a version at or
 * above the build under test, the QA app silently replaces itself with the
 * production app mid-verification and the E2E result is about the wrong binary.
 * `VITE_APP_ENV` is baked in at build time (`vite.main.config.mts` define) and
 * is `dev` only for that artifact — release builds use `.env.production`
 * (`prod`), and an unset value keeps updates on.
 */
export const shouldUseReleaseFeed = (appEnv: string | undefined): boolean =>
  appEnv !== 'dev';

/**
 * Whether this launch is the relaunch Squirrel.Mac forces after an
 * install-on-quit, and should therefore exit immediately.
 *
 * `autoUpdater.quitAndInstall()` is the only way to make Squirrel.Mac's ShipIt
 * swap the bundle, and Electron gives no `relaunch: false` — so installing while
 * the user is quitting would pop the app right back up. The quit path leaves a
 * `{version, at}` marker; the relaunched process reads it and exits, which is
 * what makes mac match Windows ("quit now, new version next time you open it").
 *
 * Honored only when the booted version IS the version we installed and the
 * marker is seconds old: if the install failed (old version boots) or the user
 * launches the app themselves later, this is a normal boot and must not quit.
 *
 * The marker cannot prove WHO launched this process. A real install-on-quit was
 * measured end to end (M-series Mac, 4.8.1 QA build updating to the 4.8.2
 * release): quitAndInstall to the relaunched process's first log line took
 * **10.4s**, and the relaunch carried exactly the same argv as a user launch, so
 * there is nothing else to key on. The window has to cover that swap on slower
 * disks too — falling short means the app the user just quit comes back, which
 * is the behaviour this whole path exists to avoid.
 *
 * A user launch racing inside the window is swallowed once, and only once: the
 * caller deletes the marker before asking, so the next launch opens normally.
 * The caller also refuses to honor it when a deep link is in flight, since
 * losing one of those loses a login callback rather than a window.
 */
export const POST_INSTALL_RELAUNCH_WINDOW_MS = 45_000;

export const shouldQuitAfterInstallRelaunch = (params: {
  currentVersion: string;
  record: { version: string; at: number } | null;
  now: number;
}): boolean => {
  const { currentVersion, record, now } = params;
  if (!record) return false;
  if (record.version !== currentVersion) return false;
  const age = now - record.at;
  return age >= 0 && age < POST_INSTALL_RELAUNCH_WINDOW_MS;
};

/**
 * Whether this launch must exit immediately because it is the relaunch
 * Squirrel.Mac forced after an install-on-quit. Wraps
 * `shouldQuitAfterInstallRelaunch` with the two conditions that make exiting
 * unsafe regardless of the marker:
 *
 * - non-macOS: nothing on Windows ever writes the marker, and Squirrel there
 *   applies updates without this dance at all
 * - a launch carrying a deep link: that is never Squirrel's relaunch, and
 *   dropping it would drop a login callback rather than just a window
 */
export const decidePostInstallExit = (params: {
  isMac: boolean;
  hasDeepLinkOnLaunch: boolean;
  currentVersion: string;
  record: { version: string; at: number } | null;
  now: number;
}): boolean => {
  const { isMac, hasDeepLinkOnLaunch, currentVersion, record, now } = params;
  if (!isMac || hasDeepLinkOnLaunch) return false;
  return shouldQuitAfterInstallRelaunch({ currentVersion, record, now });
};
