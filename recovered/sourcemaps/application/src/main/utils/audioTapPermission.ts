import { spawn } from 'node:child_process';

import log from 'electron-log';

import { getExternalModulePath } from '@/main/utils/module';

/**
 * System Audio Recording (TCC kTCCServiceAudioCapture) permission probing for
 * macOS 14.2+, backed by the capture sidecar's one-shot subcommands
 * (`tiro-audio-capture check-permission|request-permission`).
 *
 * Invariant this module exists to keep: the permission onboarding asks for is
 * the permission the runtime capture actually uses. Production mac capture is
 * the Core Audio process-tap sidecar (System Audio Recording bucket), so
 * onboarding must probe the same bucket through the same binary. The legacy
 * Screen Recording flow stays intact for macOS < 14.2 and probe failures.
 */

export type TapPermissionStatus = 'granted' | 'denied' | 'undetermined';
export type TapPermissionCheckResult = TapPermissionStatus | 'unsupported';

/** macOS version that introduced the Core Audio process-tap API. */
const TAP_MIN_MAJOR = 14;
const TAP_MIN_MINOR = 2;

const CHECK_TIMEOUT_MS = 3_000;

/**
 * Numeric [major, minor] comparison — string comparison would order
 * '14.10' < '14.2' and '9' > '14'.
 */
export const isVersionAtLeast = (
  version: string | undefined,
  major: number,
  minor: number,
): boolean => {
  if (!version) return false;
  const parts = version.split('.').map((part) => Number.parseInt(part, 10));
  if (!Number.isFinite(parts[0])) return false;
  const versionMajor = parts[0];
  const versionMinor = Number.isFinite(parts[1]) ? parts[1] : 0;
  if (versionMajor !== major) return versionMajor > major;
  return versionMinor >= minor;
};

/**
 * Single gate for the tap-permission path. Older macOS versions still use the
 * legacy Screen Recording permission check when the audio-tap API is absent.
 */
export const supportsAudioTapPermission = (input: {
  isMac: boolean;
  systemVersion: string | undefined;
}): boolean => {
  return (
    input.isMac &&
    isVersionAtLeast(input.systemVersion, TAP_MIN_MAJOR, TAP_MIN_MINOR)
  );
};

export type SystemAudioPermissionPath =
  | 'tap'
  | 'legacy-mac'
  | 'legacy-windows'
  | 'none';

/**
 * Which permission flow a has/grant invocation should take. The tap probe can
 * still degrade to 'legacy-mac' at runtime when the sidecar check comes back
 * 'unsupported' — this only decides the attempted path.
 */
export const decideSystemAudioPermissionPath = (input: {
  isMac: boolean;
  isWindows: boolean;
  tapSupported: boolean;
}): SystemAudioPermissionPath => {
  if (input.isMac) return input.tapSupported ? 'tap' : 'legacy-mac';
  if (input.isWindows) return 'legacy-windows';
  return 'none';
};

/** Parse one line of `check-permission` stdout. Anything else is a protocol
 * violation (old binary, crash garbage) and must fall back. */
export const parseCheckPermissionOutput = (
  stdout: string,
): TapPermissionStatus | null => {
  const value = stdout.trim();
  if (value === 'granted' || value === 'denied' || value === 'undetermined') {
    return value;
  }
  return null;
};

/**
 * OR-grandfather: Screen Recording ("Screen & System Audio Recording") is a
 * superset that already covers tap capture — existing users who granted it
 * (tap status still undetermined) must pass onboarding without a re-prompt.
 * An EXPLICIT tap denial is excluded on purpose: whether tap capture works
 * under denied×screen-granted is unproven, and passing onboarding into a
 * possibly-silent recording is the zero-audio failure class — send that rare
 * cohort through grant → Settings instead.
 */
export const resolveHasSystemAudioPermission = (
  tapStatus: TapPermissionCheckResult,
  screenGranted: boolean,
): boolean => {
  if (tapStatus === 'granted') return true;
  return screenGranted && tapStatus !== 'denied';
};

const getSidecarPath = () => getExternalModulePath('mac/tiro-audio-capture');

/**
 * Once the OS reports granted, stop probing: TCC grants are sticky, and
 * PermissionPage keeps polling every 1.5s while the OTHER permission (mic) is
 * still pending — without this cache each tick would spawn a fresh probe
 * (AC7). A mid-session revoke resets on next app launch.
 */
let grantedCache = false;

/** Log each distinct fallback reason once — the has-poll would otherwise
 * repeat it every 1.5s in permanently-unsupported environments. */
const loggedFallbackReasons = new Set<string>();
const logFallbackOnce = (reason: string) => {
  if (loggedFallbackReasons.has(reason)) return;
  loggedFallbackReasons.add(reason);
  log.warn(
    `[audioTapPermission] falling back to screen-recording permission — ${reason}`,
  );
};

/** Gate-level fallback reasons are field signals too (AC19) — logged once
 * from the handler wrapper. */
export const logTapGateFallbackOnce = (input: {
  isMac: boolean;
  systemVersion: string | undefined;
}) => {
  if (!input.isMac) return;
  if (!isVersionAtLeast(input.systemVersion, TAP_MIN_MAJOR, TAP_MIN_MINOR)) {
    logFallbackOnce(
      `macOS ${input.systemVersion ?? 'unknown'} < ${TAP_MIN_MAJOR}.${TAP_MIN_MINOR}`,
    );
  }
};

/**
 * Run `check-permission` (never prompts, never touches the HAL). Every
 * abnormal outcome — missing binary, old binary without the subcommand,
 * non-zero exit (private TCC API broke), garbage stdout, timeout — resolves
 * to 'unsupported' with a logged reason so callers degrade to the
 * screen-recording fallback. Never rejects.
 *
 * In-flight coalescing: PermissionPage polls every 1.5s; a slow probe must
 * not stack processes. The guard is released only when the child actually
 * terminated (close/error) — a timeout kills with SIGKILL and still waits,
 * so concurrent probes stay ≤ 1 even against a stuck child.
 */
let inFlightCheck: Promise<TapPermissionCheckResult> | null = null;

export const checkTapPermission = (): Promise<TapPermissionCheckResult> => {
  if (grantedCache) return Promise.resolve('granted');
  if (inFlightCheck) return inFlightCheck;

  inFlightCheck = new Promise<TapPermissionCheckResult>((resolve) => {
    let settled = false;
    const settle = (result: TapPermissionCheckResult, reason?: string) => {
      if (settled) return;
      settled = true;
      if (result === 'granted') grantedCache = true;
      if (result === 'unsupported') {
        logFallbackOnce(`check ${reason ?? 'unknown'}`);
      }
      resolve(result);
    };
    const release = () => {
      inFlightCheck = null;
    };

    let child: ReturnType<typeof spawn>;
    try {
      child = spawn(getSidecarPath(), ['check-permission']);
    } catch (error) {
      settle('unsupported', `spawn threw: ${String(error)}`);
      release();
      return;
    }

    const timeout = setTimeout(() => {
      // SIGKILL, not SIGTERM: the probe is stateless and must die now — the
      // coalescing guard stays held until 'close' actually fires.
      child.kill('SIGKILL');
      settle('unsupported', `timeout after ${CHECK_TIMEOUT_MS}ms`);
    }, CHECK_TIMEOUT_MS);

    let stdout = '';
    let stderr = '';
    child.stdout?.on('data', (chunk: Buffer) => {
      stdout += chunk.toString();
    });
    child.stderr?.on('data', (chunk: Buffer) => {
      stderr += chunk.toString();
    });
    child.on('error', (error) => {
      clearTimeout(timeout);
      settle('unsupported', `spawn error: ${error.message}`);
      release();
    });
    child.on('close', (code) => {
      clearTimeout(timeout);
      if (code !== 0) {
        // stderr tail distinguishes "private TCC API broke" from "stale
        // binary without the subcommand (clap usage error)" in field logs.
        settle(
          'unsupported',
          `exit code ${code}${stderr ? ` — ${stderr.trim().slice(0, 120)}` : ''}`,
        );
      } else {
        const status = parseCheckPermissionOutput(stdout);
        if (!status) {
          settle('unsupported', `unparseable stdout: ${stdout.slice(0, 40)}`);
        } else {
          settle(status);
        }
      }
      release();
    });
  });

  return inFlightCheck;
};

/**
 * A check that reflects the world AFTER now — used right after the consent
 * prompt closes. A plain checkTapPermission() could coalesce onto a stale
 * probe the 1.5s poll spawned BEFORE the user answered and report the
 * pre-answer snapshot; this waits any such probe out, then probes fresh.
 */
export const freshCheckTapPermission =
  async (): Promise<TapPermissionCheckResult> => {
    const staleProbe = inFlightCheck;
    if (staleProbe) {
      try {
        await staleProbe;
      } catch {
        // A stale probe's failure is irrelevant — we only wait it out.
      }
    }
    return checkTapPermission();
  };

/**
 * Run `request-permission` — a prompt TRIGGER only. It attempts a real tap
 * (public API) so macOS shows the System Audio Recording consent dialog
 * attributed to Tiro, then exits. The verdict comes from a follow-up check;
 * the OS gives no reliable denied-vs-dismissed signal here.
 *
 * No timeout on purpose: the user may stare at the prompt for minutes. The
 * process is killed on app quit instead. Double-clicks coalesce onto the
 * in-flight promise so only one prompt can exist.
 */
let inFlightRequest: Promise<void> | null = null;
let requestChild: ReturnType<typeof spawn> | null = null;

export const requestTapPermission = (): Promise<void> => {
  if (inFlightRequest) return inFlightRequest;

  inFlightRequest = new Promise<void>((resolve) => {
    let child: ReturnType<typeof spawn>;
    try {
      child = spawn(getSidecarPath(), ['request-permission']);
    } catch (error) {
      log.warn(`[audioTapPermission] request spawn threw: ${String(error)}`);
      resolve();
      return;
    }
    requestChild = child;
    child.on('error', (error) => {
      log.warn(`[audioTapPermission] request spawn error: ${error.message}`);
      requestChild = null;
      resolve();
    });
    child.on('close', () => {
      requestChild = null;
      resolve();
    });
  }).finally(() => {
    inFlightRequest = null;
  });

  return inFlightRequest;
};

/** Kill a request probe left waiting on the consent dialog. Call on app quit. */
export const killPendingTapPermissionRequest = () => {
  requestChild?.kill();
  requestChild = null;
};

type GrantViaTapDeps = {
  check: () => Promise<TapPermissionCheckResult>;
  freshCheck: () => Promise<TapPermissionCheckResult>;
  request: () => Promise<void>;
  openSystemAudioSettings: () => void;
};

/**
 * The grant flow for the tap path (extracted for unit tests — AC9/10/11):
 * - granted      → true, no prompt process spawned
 * - denied       → open the Settings pane (macOS never re-prompts after an
 *                  explicit deny — a dead button would strand the user), false
 * - undetermined → trigger the prompt, then judge by a FRESH check.
 *                  If it is STILL undetermined the prompt never appeared
 *                  (tap creation failed) — open Settings so the user is not
 *                  stuck in a click → nothing loop. If it is denied the user
 *                  just answered; return false without yanking Settings open.
 * - unsupported  → null: caller falls through to the legacy screen flow.
 */
export const grantSystemAudioPermissionViaTap = async (
  deps: GrantViaTapDeps,
): Promise<boolean | null> => {
  const status = await deps.check();
  if (status === 'unsupported') return null;
  if (status === 'granted') return true;
  if (status === 'denied') {
    deps.openSystemAudioSettings();
    return false;
  }

  await deps.request();
  const after = await deps.freshCheck();
  if (after === 'undetermined') {
    deps.openSystemAudioSettings();
  }
  return after === 'granted';
};

/** Test-only: reset module state (granted cache, once-logs, in-flight). */
export const resetAudioTapPermissionStateForTests = () => {
  grantedCache = false;
  loggedFallbackReasons.clear();
  inFlightCheck = null;
  inFlightRequest = null;
  requestChild = null;
};
