export const PROD_DEEP_LINK_PROTOCOL = 'tiro';
export const DEV_DEEP_LINK_PROTOCOL = 'tiro-dev';

export type DesktopDeepLinkProtocol =
  | typeof PROD_DEEP_LINK_PROTOCOL
  | typeof DEV_DEEP_LINK_PROTOCOL;

export type WorkflowDeepLinkProvider =
  | 'confluence'
  | 'googleDrive'
  | 'hubspot'
  | 'microsoftTeams'
  | 'notion'
  | 'salesforce'
  | 'slack';

type GetRegisteredDeepLinkProtocolOptions = {
  isPackaged: boolean;
};

const SUPPORTED_DEEP_LINK_PROTOCOLS = new Set<string>([
  `${PROD_DEEP_LINK_PROTOCOL}:`,
  `${DEV_DEEP_LINK_PROTOCOL}:`,
]);

const WORKFLOW_DEEP_LINK_PROVIDERS: Record<string, WorkflowDeepLinkProvider> = {
  confluence: 'confluence',
  'google-drive': 'googleDrive',
  hubspot: 'hubspot',
  'microsoft-teams': 'microsoftTeams',
  notion: 'notion',
  salesforce: 'salesforce',
  slack: 'slack',
};

export const getRegisteredDeepLinkProtocol = ({
  isPackaged,
}: GetRegisteredDeepLinkProtocolOptions): DesktopDeepLinkProtocol => {
  return isPackaged ? PROD_DEEP_LINK_PROTOCOL : DEV_DEEP_LINK_PROTOCOL;
};

const parseSupportedTiroDeepLink = (rawUrl: string): URL | null => {
  try {
    const url = new URL(rawUrl);
    return SUPPORTED_DEEP_LINK_PROTOCOLS.has(url.protocol) ? url : null;
  } catch {
    return null;
  }
};

export const isAuthCallbackDeepLink = (rawUrl: string): boolean => {
  const url = parseSupportedTiroDeepLink(rawUrl);
  if (!url) return false;

  return url.hostname === 'auth' && url.pathname === '/callback';
};

export const isCredentialAttachCallbackDeepLink = (rawUrl: string): boolean => {
  const url = parseSupportedTiroDeepLink(rawUrl);
  if (!url) return false;

  return (
    url.hostname === 'auth' && url.pathname === '/credential-attach-callback'
  );
};

export const getDeepLinkLogMetadata = (rawUrl?: string) => {
  if (!rawUrl) return { route: null, provider: null, hasCode: false };
  try {
    const url = new URL(rawUrl);
    return {
      route: `${url.hostname}${url.pathname}`,
      provider: url.searchParams.get('provider'),
      hasCode:
        url.searchParams.has('code') ||
        url.searchParams.has('credentialAttachCode'),
    };
  } catch {
    return { route: null, provider: null, hasCode: false };
  }
};

export const getWorkflowProviderFromDeepLink = (
  rawUrl: string,
): WorkflowDeepLinkProvider | null => {
  const url = parseSupportedTiroDeepLink(rawUrl);
  if (!url || url.pathname !== '/connect') return null;
  return WORKFLOW_DEEP_LINK_PROVIDERS[url.hostname] ?? null;
};

export const getSalesforceOAuthErrorFromDeepLink = (
  rawUrl: string,
): string | null => {
  const url = parseSupportedTiroDeepLink(rawUrl);
  if (!url || url.hostname !== 'salesforce' || url.pathname !== '/connect') {
    return null;
  }
  return url.searchParams.get('salesforceOAuthError');
};

export const getSalesforceOAuthReasonFromDeepLink = (
  rawUrl: string,
): string | null => {
  if (getSalesforceOAuthErrorFromDeepLink(rawUrl) !== 'authorization_failed')
    return null;
  const reason = parseSupportedTiroDeepLink(rawUrl)?.searchParams.get(
    'salesforceOAuthReason',
  );
  return reason === 'app_not_installed' ? reason : null;
};

export type TiroDeepLink = {
  /** `host` + `pathname` without the scheme, e.g. `notes/create/live-voice`. */
  route: string;
  params: URLSearchParams;
};

/**
 * Parses a deep link into its route and params.
 *
 * Route matching must go through this rather than `rawUrl.includes('tiro://…')`:
 * substring matching misses the `tiro-dev` scheme entirely, and it matches a
 * route that merely appears inside a query value
 * (`tiro://auth/callback?next=tiro://calendar/create-note`).
 */
export const parseTiroDeepLink = (rawUrl: string): TiroDeepLink | null => {
  const result = parseTiroDeepLinkDetailed(rawUrl);
  return result.status === 'ready' ? result.deepLink : null;
};

/**
 * Splits the two failures that `parseTiroDeepLink` collapses into `null`:
 * a foreign scheme must be ignored, but a Tiro-scheme URL that does not parse
 * means a broken integration and deserves an error log instead of silence.
 */
export type TiroDeepLinkParseResult =
  | { status: 'ready'; deepLink: TiroDeepLink }
  | { status: 'unsupported_url' }
  | { status: 'invalid_url'; error: Error };

/**
 * Prefix-only check, deliberately weaker than full parsing: the deep-link entry
 * points use it so that a Tiro-scheme URL that fails to parse still reaches
 * `handleDeepLink`, where the invalid_url branch can log it instead of the
 * filter silently discarding it.
 */
export const isTiroScheme = (rawUrl: string): boolean => {
  // Case-insensitive like URL.protocol, which the previous check relied on —
  // URI schemes are case-insensitive and TIRO:// arrives from real callers.
  const lower = rawUrl.toLowerCase();
  return (
    lower.startsWith(`${PROD_DEEP_LINK_PROTOCOL}:`) ||
    lower.startsWith(`${DEV_DEEP_LINK_PROTOCOL}:`)
  );
};

export const parseTiroDeepLinkDetailed = (
  rawUrl: string,
): TiroDeepLinkParseResult => {
  let url: URL;
  try {
    url = new URL(rawUrl);
  } catch (error) {
    return isTiroScheme(rawUrl)
      ? { status: 'invalid_url', error: error as Error }
      : { status: 'unsupported_url' };
  }
  if (!SUPPORTED_DEEP_LINK_PROTOCOLS.has(url.protocol)) {
    return { status: 'unsupported_url' };
  }

  const path = url.pathname.replace(/^\/+|\/+$/g, '');
  return {
    status: 'ready',
    deepLink: {
      route: path ? `${url.hostname}/${path}` : url.hostname,
      params: url.searchParams,
    },
  };
};

export const RECORDING_MODES = ['live-voice', 'offline-mode'] as const;
export type RecordingMode = (typeof RECORDING_MODES)[number];

/**
 * Desktop default when a caller does not state a mode. Kept as `offline-mode`
 * because that is what `start-recording` has always done here, and existing
 * external integrations rely on it.
 */
export const DEFAULT_RECORDING_MODE: RecordingMode = 'offline-mode';

const CANONICAL_RECORDING_ROUTES: Record<string, RecordingMode> = {
  'notes/create/live-voice': 'live-voice',
  'notes/create/offline-mode': 'offline-mode',
  // Pre-`offline-mode` desktop spelling, kept for backward compatibility.
  'notes/create/offline-recording': 'offline-mode',
};

const isRecordingMode = (value: string | null): value is RecordingMode =>
  value != null && RECORDING_MODES.includes(value as RecordingMode);

/**
 * Resolves which recording mode a deep link asks for, or null when the route is
 * not a recording route. `start-recording` is the mode-agnostic alias kept for
 * existing external integrations: it honours `?mode=` and otherwise falls back
 * to the platform default.
 */
export const resolveRecordingMode = ({
  route,
  params,
}: TiroDeepLink): RecordingMode | null => {
  const canonical = CANONICAL_RECORDING_ROUTES[route];
  if (canonical) return canonical;

  if (route !== 'start-recording') return null;

  const requested = params.get('mode');
  return isRecordingMode(requested) ? requested : DEFAULT_RECORDING_MODE;
};

const RENDERER_LISTENER_ROUTES = new Set([
  'calendar/create-note',
  'mic/create-note',
  'stop-recording',
  'welcome',
  'settings/welcome',
]);

/**
 * True when the route is delivered by pushing to a listener that only exists
 * inside the authenticated renderer shell. The remaining routes either drive
 * `loadURL` from the main process (`note/resume`, `calendar/connect`) or carry a
 * short-lived auth intent that must not be delayed (`auth/*`).
 */
export const requiresAuthenticatedRenderer = (
  deepLink: TiroDeepLink,
): boolean => {
  return (
    resolveRecordingMode(deepLink) != null ||
    RENDERER_LISTENER_ROUTES.has(deepLink.route)
  );
};

/**
 * A deep link that waited longer than this is no longer something the user is
 * still expecting; replaying it would turn the mic on out of nowhere.
 */
export const HELD_DEEP_LINK_TTL_MS = 10 * 60 * 1000;

/**
 * Holds a deep link until the authenticated renderer shell reports that its
 * listeners are mounted. `did-finish-load` only means the DOM loaded, so a
 * cold-start deep link sent before then is dropped on the floor.
 */
export const createRendererDeepLinkHold = (now: () => number = Date.now) => {
  let isReady = false;
  let held: { url: string; heldAt: number } | null = null;

  return {
    get isRendererReady() {
      return isReady;
    },
    /** Returns the URL it replaced, so the caller can report the drop. */
    hold(url: string): string | null {
      const replaced = held?.url ?? null;
      held = { url, heldAt: now() };
      return replaced;
    },
    /** Returns the held URL, if any, and clears it so a replay cannot re-enter. */
    markRendererReady(): string | null {
      isReady = true;
      const previous = held;
      held = null;
      if (!previous) return null;
      return now() - previous.heldAt > HELD_DEEP_LINK_TTL_MS
        ? null
        : previous.url;
    },
    markRendererGone() {
      isReady = false;
    },
    /**
     * A held deep link belongs to whoever fired it while logged out — replaying
     * it after an explicit logout could hand it to a different account.
     */
    discardHeldUrl() {
      held = null;
    },
  };
};

export const rendererDeepLinkHold = createRendererDeepLinkHold();

export type StartRecordingDeepLinkParams = {
  title: string | null;
  reservedGuid: string | null;
  folderIds: number[];
  attendees: string[];
  transcribeLocale: string | null;
  summaryLocale: string | null;
  isBackground: boolean;
};

const splitCsvParam = (value: string | null): string[] => {
  return (value ?? '')
    .split(',')
    .map((item) => item.trim())
    .filter(Boolean);
};

/**
 * One place for the recording deep-link vocabulary, legacy aliases included:
 * `folderId` (single-value spelling), `tags` (calendar notification route) and
 * `summary` (offline-recording route) all predate the canonical names and are
 * still emitted by shipped integrations.
 */
export const parseStartRecordingDeepLinkParams = (
  params: URLSearchParams,
): StartRecordingDeepLinkParams => {
  return {
    title: params.get('title') || null,
    reservedGuid: params.get('reservedGuid') || null,
    folderIds: splitCsvParam(params.get('folderIds') ?? params.get('folderId'))
      .filter((id) => /^\d+$/.test(id))
      .map(Number),
    attendees: splitCsvParam(params.get('attendees') ?? params.get('tags')),
    transcribeLocale: params.get('transcribeLocale') || null,
    summaryLocale: params.get('summaryLocale') ?? params.get('summary') ?? null,
    isBackground: params.get('background') === 'true',
  };
};

type RunMicCreateNoteActionOptions = {
  autoStart: boolean;
  isRecordingSupported: () => boolean;
  ensureRecordingSupported: () => Promise<boolean>;
  createNote: () => void;
  enterMeetingMode: () => void;
};

export const runMicCreateNoteAction = async ({
  autoStart,
  isRecordingSupported,
  ensureRecordingSupported,
  createNote,
  enterMeetingMode,
}: RunMicCreateNoteActionOptions): Promise<void> => {
  if (autoStart && !isRecordingSupported()) {
    await ensureRecordingSupported();
    return;
  }
  createNote();
  enterMeetingMode();
};

type RunCalendarMeetingActionOptions = {
  autoStart: boolean;
  isRecordingSupported: () => boolean;
  openMeetingLink: () => Promise<boolean>;
  enterMeetingMode: () => void;
};

export const runCalendarMeetingAction = async ({
  autoStart,
  isRecordingSupported,
  openMeetingLink,
  enterMeetingMode,
}: RunCalendarMeetingActionOptions): Promise<void> => {
  const opened = await openMeetingLink();
  if (!opened) return;
  if (autoStart && !isRecordingSupported()) return;
  enterMeetingMode();
};
