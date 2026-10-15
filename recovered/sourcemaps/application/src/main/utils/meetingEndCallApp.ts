/**
 * Per-app meeting-end signal core (pure).
 *
 * The device-level source (`isOtherAppUsingMic`) is a boolean and is dormant
 * while Tiro itself records, so it can't see a call app release the mic mid-
 * recording. The per-app source (`@plato-corp/microphone.getMicInputProcesses`,
 * 1.1.0+) enumerates the processes holding mic input, so we can attribute the
 * mic to a specific call app even during Tiro capture.
 *
 * This module is the PURE brain of that source: identifier → call-app mapping,
 * Tiro's own-process exclusion, and acquire/release edge derivation. It is
 * framework-free and fully unit-tested. The main-process poller and IPC wiring
 * that calls `getMicInputProcesses()` live separately (and need the 1.1.0
 * native API at runtime).
 */

/**
 * Confidently-identifiable native call apps. Mirrors the renderer-side
 * `CallApp` union in `@/renderer/entities/meetingEnd`; kept main-local so this
 * layer doesn't import renderer code. `MicSignal.app` is a plain string, so the
 * two interoperate without a shared import.
 *
 * `meet` is intentionally NOT produced here: Google Meet runs in a browser tab,
 * and the native API reports the browser process (e.g. com.google.Chrome), not
 * the tab — so it cannot be confidently attributed from the identifier alone.
 * Browser-based calls are a documented gap (would need tab-title/automation
 * APIs); we prefer missing a signal over false-firing, per the never-auto-stop
 * philosophy.
 */
export type CallApp = 'zoom' | 'teams' | 'slack' | 'webex';

/**
 * Structural mirror of `@plato-corp/microphone`'s `MicInputProcess` (1.1.0+).
 * Declared locally so this code type-checks against the currently-consumed
 * 1.0.5 types (which predate `MicInputProcess`); the shapes are identical, so
 * the real type assigns to this once desktop consumes ^1.1.0.
 */
export type MicInputProcessLike = {
  /** OS process id; -1 if unknown. */
  pid: number;
  /** macOS: bundle id (e.g. "us.zoom.xos"). Windows: exe basename, lowercased (e.g. "zoom.exe"). */
  identifier: string;
  /** Windows: full executable path. macOS: empty. */
  executable: string;
};

/**
 * identifier → call app. Keys are lowercased (macOS bundle ids are already
 * lowercase; Windows exe basenames arrive lowercased; we lowercase on lookup to
 * be safe — e.g. Webex's mixed-case bundle ids). `identifier` is ADVISORY per
 * the native module's contract, so this list is best-effort and extensible.
 */
const CALL_APP_BY_IDENTIFIER: Readonly<Record<string, CallApp>> = {
  // macOS bundle ids
  'us.zoom.xos': 'zoom',
  'com.microsoft.teams': 'teams',
  'com.microsoft.teams2': 'teams', // new Teams
  'com.tinyspeck.slackmacgap': 'slack',
  'com.cisco.webexmeetingsapp': 'webex',
  'com.webex.meetingmanager': 'webex',
  'cisco-systems.spark': 'webex', // modern unified Webex client
  // Windows exe basenames (lowercased)
  'zoom.exe': 'zoom',
  'ms-teams.exe': 'teams', // new Teams
  'teams.exe': 'teams', // classic Teams
  'slack.exe': 'slack',
  'webexmta.exe': 'webex',
  'ciscowebexstart.exe': 'webex',
  'ciscocollabhost.exe': 'webex', // modern unified Webex client
  'atmgr.exe': 'webex', // classic Webex in-meeting process
};

/**
 * Prefix rules for identifiers the exact map can't enumerate: Electron-based
 * call apps on macOS often attribute mic input to a HELPER bundle (e.g.
 * "com.microsoft.teams2.helper"), which an exact match would miss. Prefixes
 * are vendor-specific and disjoint, so order does not matter.
 */
const CALL_APP_BY_IDENTIFIER_PREFIX: ReadonlyArray<[string, CallApp]> = [
  ['us.zoom.', 'zoom'],
  ['com.microsoft.teams', 'teams'],
  ['com.tinyspeck.slackmacgap', 'slack'],
  ['com.cisco.webex', 'webex'],
  ['com.webex.', 'webex'],
  ['cisco-systems.spark', 'webex'],
];

/**
 * Map a single mic-owner identifier to a known call app, or `null` when it is
 * not a recognized native call app (unknown app, browser, or empty identifier).
 * Exact match first, then vendor bundle-prefix fallback (mac helper bundles).
 */
export const mapIdentifierToCallApp = (identifier: string): CallApp | null => {
  if (!identifier) {
    return null;
  }
  const id = identifier.toLowerCase();
  const exact = CALL_APP_BY_IDENTIFIER[id];
  if (exact) {
    return exact;
  }
  for (const [prefix, app] of CALL_APP_BY_IDENTIFIER_PREFIX) {
    if (id.startsWith(prefix)) {
      return app;
    }
  }
  return null;
};

/**
 * Resolve which known call apps are currently holding the mic, excluding Tiro's
 * own processes (Electron main + the audio-capture sidecar) by pid. Deduped:
 * two Zoom helper processes collapse to a single `zoom`.
 */
export const resolveCallAppsHoldingMic = (
  processes: readonly MicInputProcessLike[],
  tiroPids: ReadonlySet<number>,
): CallApp[] => {
  const apps = new Set<CallApp>();
  for (const proc of processes) {
    if (tiroPids.has(proc.pid)) {
      continue; // never attribute Tiro's own mic use as a "call app"
    }
    const app = mapIdentifierToCallApp(proc.identifier);
    if (app) {
      apps.add(app);
    }
  }
  return [...apps];
};

/**
 * Derive acquire/release edges between two successive call-app sets.
 * `acquired` = apps present now but not before; `released` = apps present
 * before but not now. A call app releasing the mic is the meeting-end signal.
 */
export const diffCallAppMicState = (
  prev: ReadonlySet<CallApp>,
  next: ReadonlySet<CallApp>,
): { acquired: CallApp[]; released: CallApp[] } => {
  const acquired = [...next].filter((app) => !prev.has(app));
  const released = [...prev].filter((app) => !next.has(app));
  return { acquired, released };
};

/** Bounds for the main-process per-app mic poll interval. */
export const MEETING_END_POLL_DEFAULT_MS = 5_000;
export const MEETING_END_POLL_MIN_MS = 2_000;
export const MEETING_END_POLL_MAX_MS = 60_000;

/**
 * Clamp the IPC-supplied (ultimately flag-payload-supplied) poll interval to a
 * sane range. The renderer validates its own config, but main must not trust
 * IPC input: a typo'd payload (e.g. seconds instead of milliseconds) would
 * otherwise drive a near-busy synchronous native enumeration loop on the
 * Electron main thread.
 */
export const clampMeetingEndPollMs = (value: unknown): number => {
  if (typeof value !== 'number' || !Number.isFinite(value)) {
    return MEETING_END_POLL_DEFAULT_MS;
  }
  const floored = Math.floor(value);
  return Math.min(
    MEETING_END_POLL_MAX_MS,
    Math.max(MEETING_END_POLL_MIN_MS, floored),
  );
};
