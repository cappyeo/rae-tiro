import { randomUUID } from 'node:crypto';
import { mkdirSync, promises as fs } from 'node:fs';
import http from 'node:http';
import path from 'node:path';

import * as Sentry from '@sentry/electron/main';
import {
  app,
  autoUpdater,
  BrowserWindow,
  desktopCapturer,
  dialog,
  ipcMain,
  Menu,
  nativeImage,
  powerMonitor,
  session,
  shell,
  systemPreferences,
  Tray,
} from 'electron';
import log from 'electron-log';
import started from 'electron-squirrel-startup';
import Store from 'electron-store';
import { machineId } from 'node-machine-id';
import semver from 'semver';

import {
  getCurrentLocale,
  initMainI18n,
  setMainLocale,
  t,
} from '@/main/frameworks/locale';
import {
  setIsTiroUsingMic,
  startMeetingEndPerAppMonitor,
  startMicInUseNotificationMonitor,
} from '@/main/utils/audio';
import {
  checkTapPermission,
  freshCheckTapPermission,
  grantSystemAudioPermissionViaTap,
  killPendingTapPermissionRequest,
  logTapGateFallbackOnce,
  requestTapPermission,
  resolveHasSystemAudioPermission,
  supportsAudioTapPermission,
} from '@/main/utils/audioTapPermission';
import {
  AuthCodeExchangeError,
  exchangeAuthCode,
} from '@/main/utils/authCodeExchange';
import {
  type AuthIntentRecord,
  type AuthIntentStore,
  clearAuthIntent,
  consumeLoginAuthIntentRecord,
  getLoginAuthIntentRecord,
  getPendingAuthIntentRecord,
  hasBlockingAuthIntent,
  markAuthCallbackIntent,
  restoreAuthIntent,
} from '@/main/utils/authIntent';
import {
  applyAuthRequestHeaders,
  AUTH_INTERCEPT_URL_PATTERNS,
} from '@/main/utils/authRequestHeaders';
import {
  clearAuthSessionState,
  getBlockingAuthSessionCleanupFailure,
} from '@/main/utils/authSessionCleanup';
import {
  claimCredentialAttachResult,
  completeBoundOAuth,
  completeCredentialAttach,
  consumeCredentialAttachCallback,
  type CredentialAttachTerminalResult,
  discardCredentialAttachResult,
  retainCredentialAttachResult,
  toCredentialAttachFailure,
  WORKFLOW_COMPLETE_PATH,
} from '@/main/utils/credentialAttachCompletion';
import {
  DEV_DEEP_LINK_PROTOCOL,
  getDeepLinkLogMetadata,
  getRegisteredDeepLinkProtocol,
  getSalesforceOAuthErrorFromDeepLink,
  getSalesforceOAuthReasonFromDeepLink,
  getWorkflowProviderFromDeepLink,
  isAuthCallbackDeepLink,
  isCredentialAttachCallbackDeepLink,
  isTiroScheme,
  parseStartRecordingDeepLinkParams,
  parseTiroDeepLinkDetailed,
  rendererDeepLinkHold,
  requiresAuthenticatedRenderer,
  resolveRecordingMode,
  runCalendarMeetingAction,
  runMicCreateNoteAction,
} from '@/main/utils/deepLink';
import {
  approveDialogPath,
  approveDialogPaths,
  consumeApprovedDialogPath,
} from '@/main/utils/dialogPathAuth';
import {
  acceptGoogleDrivePickedDeepLink,
  beginGoogleDrivePick,
  buildGoogleDrivePickerUrl,
  claimGoogleDrivePickerResult,
  discardGoogleDrivePicker,
  GOOGLE_DRIVE_PICKED_ROUTE,
  isValidPickerTicket,
} from '@/main/utils/googleDrivePicker';
import {
  applySecurityPolicyUpdate,
  clearSecurityPolicy,
  composeDeleteAfterUpload,
  isLocalAudioDeletionEnforced as isLocalAudioDeletionEnforcedIn,
} from '@/main/utils/localAudioPolicy';
import {
  type LoginAttemptHistoryStore,
  rememberCompletedLoginAttempt,
  wasLoginAttemptCompleted,
} from '@/main/utils/loginAttemptHistory';
import {
  buildLoginHandoffLog,
  sanitizeAuthProvider,
  sanitizeLoginAttemptId,
} from '@/main/utils/loginHandoffLog';
import { getExternalModulePath } from '@/main/utils/module';
import { registerNativeAudioFrameRouting } from '@/main/utils/native-audio-frame-routing';
import {
  audioProcessDiagnosticTelemetry,
  createNativeAudioDiagnostics,
  emitNativeAudioDiagnostic,
  type NativeAudioRequestDiagnostics,
  sanitizeNativeAudioDiagnostics,
} from '@/main/utils/nativeAudioDiagnostics';
import { createNativeRecordingSessionLifecycle } from '@/main/utils/nativeRecordingSession';
import { createNativeStreamingTelemetry } from '@/main/utils/nativeStreamingTelemetry';
import {
  appendPkceParameters,
  createPkcePair,
  isPkceVerifier,
} from '@/main/utils/pkce';
import { isMac, isWindows } from '@/main/utils/platform';
import {
  createRecordingSupportGate,
  resolveRecordingSupport,
  showRecordingSupportNotice,
} from '@/main/utils/recordingSupport';
import {
  openExternalOrThrow,
  safeOpenExternal,
} from '@/main/utils/safeOpenExternal';
import {
  getAuthToken,
  initAuthTokenStorage,
  protectAuthSecret,
  removeAuthToken,
  setAuthToken,
  unprotectAuthSecret,
} from '@/main/utils/secureAuthStore';
import {
  prepareDesktopSentryEvent,
  scrubSentryEvent,
} from '@/main/utils/sentryScrub';
import { setSentryUser } from '@/main/utils/sentryUser';
import { registerShareNetworkTelemetry } from '@/main/utils/shareNetworkTelemetry';
import { sigtermSenderTelemetryContext } from '@/main/utils/sigtermSenderDiagnostics';
import { getSystemCaCertificates } from '@/main/utils/systemCa';
import { createTelemetryDocumentGate } from '@/main/utils/telemetryDocumentGate';
import { isNoUpdateAvailableError } from '@/main/utils/updateErrors';
import {
  decidePostInstallExit,
  decideUpdateAction,
  decideUpdateReadiness,
  parseCurrentReleaseVersion,
  parseLatestWindowsReleaseVersion,
  shouldSkipBackgroundCheck,
  shouldUseReleaseFeed,
} from '@/main/utils/updateFeed';
import {
  runInstallStagedUpdateOnQuit,
  squirrelOwnsTermination,
} from '@/main/utils/updateInstallOnQuit';
import {
  createMainWindow,
  createNotificationWindow,
  enterMeetingMode,
  focusWindow,
  resolveNotificationActionUrl,
} from '@/main/utils/window';
import {
  claimWorkflowConnectResults,
  discardWorkflowConnectResults,
  getWorkflowAuthorizeEpoch,
  markWorkflowAuthorizeEpoch,
  retainWorkflowConnectResult,
  type WorkflowConnectResult,
} from '@/main/utils/workflowConnectResult';
import { SECOND } from '@/renderer/utils/time';
import { clampLevel } from '@/shared/audioMeter';
import {
  DEV_AUTH_CALLBACK_PORT,
  DEV_AUTH_CALLBACK_URL,
} from '@/shared/devAuthLoopback';
import {
  LOGIN_ATTEMPT_ID_PARAM,
  type LoginHandoffErrorKind,
  type LoginHandoffStage,
} from '@/shared/loginHandoff';

import { initAppMenu, setUpdateMenuState } from './services/appMenuService';
import {
  AudioCaptureProcess,
  type CaptureConfig,
} from './services/AudioCaptureProcess';
import { AudioRecordingManager } from './services/AudioRecordingManager';
import {
  type CalendarData,
  getCalendarNotificationManager,
} from './services/CalendarNotificationManager';
import { nativeStartTelemetryContext } from './services/nativeStartDiagnostic';
import {
  type DeleteFileOrigin,
  OfflineRecordingPersistence,
  type OfflineRecordingSettings,
  type PersistedOfflineRecordingSession,
} from './services/OfflineRecordingPersistence';
import { createOfflineRecordingStop } from './services/offlineRecordingStop';
import { OverlayWindowService } from './services/OverlayWindowService';
import { StompStreamingService } from './services/StompStreamingService';
import {
  buildWindowsAppMenuTemplate,
  type WindowsAppMenuAction,
} from './services/windowsAppMenuService';

type AppUpdateInfo = {
  shouldForceUpdate: boolean;
  newVersion: string;
  currentVersion: string;
  isPatchUpdate: boolean;
};

const isAiDev = process.env.TIRO_DESKTOP_AI === '1';

if (isAiDev) {
  if (app.isPackaged) {
    throw new Error('TIRO_DESKTOP_AI is only available in development');
  }

  const aiUserDataPath = path.join(app.getPath('appData'), 'Tiro AI Dev');
  mkdirSync(aiUserDataPath, { recursive: true });
  app.setPath('userData', aiUserDataPath);
  app.commandLine.appendSwitch('remote-debugging-address', '127.0.0.1');
  app.commandLine.appendSwitch('remote-debugging-port', '9222');
}

Sentry.init({
  dsn: 'https://20d0df24729f7a731d8be63fd87fa4b2@o4507116655149056.ingest.us.sentry.io/4509014398402560',
  enabled: process.env.NODE_ENV === 'production',
  environment: process.env.VITE_APP_ENV,
  tracesSampleRate: 0.15,
  beforeSend: (event) => prepareDesktopSentryEvent(event),
  beforeBreadcrumb: (breadcrumb) => scrubSentryEvent(breadcrumb),
});

// Configure electron-log for safe shutdown
log.transports.file.level = 'info';
log.transports.file.fileName = 'app.log';

// In development mode, disable console transport to prevent EIO errors on Ctrl+C
// In production, keep console transport enabled for debugging
if (process.env.NODE_ENV === 'development') {
  log.transports.console.level = false;
}

// Catch process termination signals
process.on('SIGINT', () => {
  log.info('SIGINT received - initiating graceful shutdown');
  app.quit();
});

process.on('SIGTERM', () => {
  log.info('SIGTERM received - initiating graceful shutdown');
  app.quit();
});

// Catch uncaught exceptions during shutdown
process.on('uncaughtException', (error) => {
  // Broken-pipe (EPIPE) / EIO errors are benign log-write failures — e.g. the
  // logger writing to a closed stdout pipe in a packaged GUI app. They must not
  // take the whole app down via process.exit().
  if (/\b(?:EPIPE|EIO)\b/.test(error.message)) {
    log.warn('Ignoring benign IO error in uncaughtException handler');
  } else {
    log.error('Uncaught exception:', error);
    process.exit(1);
  }
});

/**
 * Subset of `PendingAdAttribution` (defined in @plato-corp/tiro-core) that
 * the desktop main process trusts from a deeplink-bridge payload.
 *
 * We deliberately keep the shape narrow: the renderer-side flush re-typechecks
 * everything via `isPendingAdAttribution` before sending to the server, so the
 * main process only validates the load-bearing fields needed to dedupe and
 * persist.
 */
type PendingAdAttributionPayload = {
  attributionId: string;
  attributedAt: string;
  landingUrl: string;
  rawPayload: string;
};

/** electron-store key holding ad attributions delivered via auth deeplink. */
const PENDING_AD_ATTRIBUTIONS_KEY = 'pending_ad_attributions';

/**
 * electron-store key holding the web PostHog anonymous `distinct_id` tossed
 * through the auth deeplink (`phDistinctId`). The renderer reads it once to
 * merge the web landing person with this app person, then clears it.
 */
const PENDING_WEB_DISTINCT_ID_KEY = 'pending_web_distinct_id';

/** Defence-in-depth cap on the length of a distinct_id accepted from a deeplink. */
const MAX_WEB_DISTINCT_ID_LENGTH = 200;

/**
 * electron-store key marking that `view_page_first_launch` has been sent for
 * this installation. 설치 자체는 앱 코드 밖(인스톨러)이라 관측할 수 없어, 최초
 * 실행이 설치의 프록시다 — 모바일 SDK 의 `Application Installed` 도 같은 방식.
 *
 * userData 에 남으므로 재설치해도 다시 발사되지 않는다(같은 기기·같은 사용자를
 * 신규 설치로 세지 않기 위함). 앱을 완전히 지우고 userData 까지 날린 경우만 초기화.
 */
const FIRST_LAUNCH_EVENT_SENT_KEY = 'first_launch_event_sent';

/**
 * Defence-in-depth cap on entries persisted from a single deeplink payload.
 * The web client already trims to MAX_ATTRIBUTIONS (10), but the main process
 * should not blindly trust client input — if a malformed deeplink ever holds
 * more, we silently keep only the last 10.
 */
const MAX_TRUSTED_AD_ATTRIBUTIONS = 10;

const store = new Store<{
  auth_token: string;
  pending_update: AppUpdateInfo | null;
  calendar_notification_enabled: boolean;
  mic_detection_notification_enabled?: boolean;
  audio_recording_enabled?: boolean;
  audio_recording_path?: string;
  audio_recordings?: Array<{
    noteId: number;
    filePath: string;
    duration: number;
    fileSize: number;
    startTime: number;
    endTime: number;
  }>;
  overlay_enabled?: boolean;
  last_installed_version?: string;
  attempted_install_version?: string;
  offline_recording_sessions?: PersistedOfflineRecordingSession[];
  offline_recording_settings?: OfflineRecordingSettings;
  transcribe_locale?: string;
  summary_locale?: string;
  pending_ad_attributions?: PendingAdAttributionPayload[];
  pending_web_distinct_id?: string;
  auth_token_encrypted?: string;
  auth_intent?: AuthIntentRecord;
  completed_login_attempt_ids?: string[];
  security_policy?: { deleteLocalAudioAfterProcessing: boolean };
  // [macOS] set by installStagedUpdateOnQuit so the relaunch Squirrel forces
  // after the install exits instead of reopening the app the user just quit.
  quit_after_install?: { version: string; at: number };
}>({
  defaults: {
    auth_token: '',
    pending_update: null,
    calendar_notification_enabled: false,
    overlay_enabled: true,
    last_installed_version: '',
  },
});
/**
 * Startup bookkeeping writes must never take the launch down with them. A full
 * or read-only disk makes electron-store throw, and an exception thrown inside
 * `whenReady` rejects it before the window and the autoUpdater handlers exist —
 * the window-less launch this app already shipped once (4.6.6). Losing a
 * bookkeeping key only costs a duplicated telemetry line on the next launch.
 */
const writeStoreOrLog = (key: string, value: unknown): void => {
  try {
    (store as unknown as { set: (k: string, v: unknown) => void }).set(
      key,
      value,
    );
  } catch (error) {
    log.error(`[startup] could not persist ${key}`, error);
  }
};

const deleteStoreOrLog = (key: string): void => {
  try {
    (store as unknown as { delete: (k: string) => void }).delete(key);
  } catch (error) {
    log.error(`[startup] could not clear ${key}`, error);
  }
};

// One-shot migration of any plaintext auth_token into the safeStorage slot.
// Safe to call on every boot; no-op when already migrated. See TIRO-SEC-18.
// eslint-disable-next-line @typescript-eslint/no-explicit-any
initAuthTokenStorage(store as any);

const startupDeepLinkMetadata = getDeepLinkLogMetadata(
  process.argv.find(isTiroScheme),
);
log.info(
  `[auth] === process start === pid=${process.pid} version=${app.getVersion()} execPath=${process.execPath} defaultApp=${!!process.defaultApp} deepLink=${JSON.stringify(startupDeepLinkMetadata)}`,
);

/**
 * Decodes and validates the `adAttributions` query parameter from a
 * `tiro://auth/callback` deeplink. Returns null when the payload is
 * missing, malformed, not an array, or empty after structural validation.
 *
 * Defence-in-depth: caps the result at MAX_TRUSTED_AD_ATTRIBUTIONS so a
 * malformed deeplink cannot blow up electron-store. The renderer-side
 * flush re-validates each item against the full PendingAdAttribution
 * shape before sending to the server, so this parse only enforces the
 * fields the main process itself relies on (id, timestamp, debug fields).
 */
const parsePendingAdAttributionsParam = (
  encoded: string | null,
): PendingAdAttributionPayload[] | null => {
  if (!encoded) return null;

  try {
    const parsed = JSON.parse(decodeURIComponent(encoded));
    if (!Array.isArray(parsed)) return null;

    const validated = parsed.filter(
      (item): item is PendingAdAttributionPayload =>
        item != null &&
        typeof item === 'object' &&
        typeof item.attributionId === 'string' &&
        typeof item.attributedAt === 'string' &&
        typeof item.landingUrl === 'string' &&
        typeof item.rawPayload === 'string',
    );

    if (validated.length === 0) return null;

    return validated.slice(-MAX_TRUSTED_AD_ATTRIBUTIONS);
  } catch (error) {
    log.warn('Failed to parse adAttributions deeplink param', error);
    return null;
  }
};

/**
 * Validates the `phDistinctId` query param from a `tiro://auth/callback`
 * deeplink — the web anonymous PostHog distinct_id used to stitch the web
 * landing person to this app person. Returns null when missing, empty, or
 * over-long (defence-in-depth against a malformed deeplink).
 */
const parseWebDistinctIdParam = (raw: string | null): string | null => {
  if (!raw) return null;
  const trimmed = raw.trim();
  if (!trimmed || trimmed.length > MAX_WEB_DISTINCT_ID_LENGTH) return null;
  return trimmed;
};

const recordingSupport = resolveRecordingSupport({
  platform: process.platform,
  systemVersion: process.getSystemVersion(),
});
log.info('[RecordingSupport] resolved', recordingSupport);
const audioRecordingManager = new AudioRecordingManager(
  store,
  recordingSupport,
);
const overlayWindowService = new OverlayWindowService(store);
const offlineRecordingPersistence = new OfflineRecordingPersistence(
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  store as any,
);
const recordingSupportGate = createRecordingSupportGate({
  support: recordingSupport,
  showNotice: (support) =>
    showRecordingSupportNotice(support, {
      t,
      webBaseUrl: process.env.VITE_WEB_BASE_URL,
      getRecordingDirectories: () =>
        offlineRecordingPersistence.getRecordingsRoots(),
      showMessageBox: (options) => {
        const parent =
          BrowserWindow.getFocusedWindow() ??
          (mainWindow?.isVisible() ? mainWindow : null);
        return parent
          ? dialog.showMessageBox(parent, options)
          : dialog.showMessageBox(options);
      },
      openExternal: safeOpenExternal,
      openPath: (target) => shell.openPath(target),
    }),
});

ipcMain.handle('recording-support:get', () => recordingSupport);
ipcMain.handle('recording-support:ensure-supported', () =>
  recordingSupportGate.ensureSupported(),
);
const stopOfflineRecording = createOfflineRecordingStop({
  stopNativeCapture: async (noteGuid) => {
    if (currentNativeRecordingNoteGuid === noteGuid) {
      logNativeAudioRequest(
        'stop',
        getNativeAudioRequestDiagnostics(undefined, {
          reason: 'offline-recording-stop',
          noteGuid,
        }),
      );
      await cleanupNativeRecordingSession();
    }
  },
  stopRecording: (noteGuid) => audioRecordingManager.stopRecording(noteGuid),
  updateSessionStatus: (sessionId, status, additionalData) =>
    offlineRecordingPersistence.updateSessionStatusOrThrow(
      sessionId,
      status,
      additionalData,
    ),
});
let mainWindow: BrowserWindow | null = null;
// When a fresh main window is hidden before its first frame is ready (e.g. a
// background deep-link cold start calls hideToBackground()), we must not let the
// window's own 'ready-to-show' handler force it back into view. Reset to false
// on every window creation; set to true by hideToBackground().
let suppressMainWindowInitialShow = false;
let notificationWindow: BrowserWindow | null = null;
let tray: Tray | null = null;
let updateCheckInterval: NodeJS.Timeout | null = null;
let pendingUpdate: AppUpdateInfo | null = null;
// Set the moment either install path commits to quitAndInstall, so the quit
// path and a renderer "Update now" click racing each other can only fire the
// native install once.
let updateInstallStarted = false;
// True only while the 'before-quit' cleanup routine is running, so a repeated
// quit request can be told apart from the quit Squirrel itself starts.
let gracefulShutdownInProgress = false;
// Set the instant Squirrel is actually asked to install. Only from then on does
// it own process termination — before that the install is merely scheduled and
// a user quit must still win.
let installHandedOff = false;
// The click path's delayed quitAndInstall, kept cancellable so a quit arriving
// inside that delay isn't dropped on the floor.
let scheduledInstallTimer: NodeJS.Timeout | null = null;
const getReadyUpdate = (): AppUpdateInfo | null =>
  decideUpdateReadiness({
    currentVersion: app.getVersion(),
    inProcessUpdate: pendingUpdate,
    persistedVersion: null,
  }).readyUpdate;
let micMonitorInterval: NodeJS.Timeout | null = null;
// Meeting-end detection (mic-release) poller. Started/stopped by the renderer
// via IPC, only while a recording is active and the feature flag is enabled.
// Separate from `micMonitorInterval` (the start-recording notification) — it
// watches the opposite edge. Off the audio-capture path entirely.
let meetingEndMicMonitor: NodeJS.Timeout | null = null;

/**
 * Authoritative recording state for the tray UI. Renderer contexts
 * (NoteStreamingContext for live, OfflineRecordingContext for offline) push
 * updates via the `tray:recording-state:update` IPC channel — the main
 * process owns the tray menu/title, so it has to know what's currently
 * recording even when the main window is hidden.
 *
 * Single-mode: at most one recording at a time. Live takes precedence and
 * any active offline session is auto-stopped before a live note starts
 * (see NoteStreamingContext).
 */
type TrayRecordingState = {
  mode: 'live' | 'offline';
  noteId: number | null;
  noteTitle: string | null;
  startedAt: number;
  isPaused: boolean;
};
let currentRecording: TrayRecordingState | null = null;
let trayElapsedTimer: NodeJS.Timeout | null = null;
let isQuitting = false;
let pendingDeepLinkUrl: string | null = null;

// [Dev only] Receive the OAuth callback over 127.0.0.1 instead of the shared
// `tiro-dev://` scheme (see src/shared/devAuthLoopback.ts for why), then reuse
// handleDeepLink so token/intent/interceptor/navigation stay identical.
function startDevAuthLoopbackServer() {
  if (app.isPackaged) return;

  http
    .createServer((req, res) => {
      const reqUrl = new URL(req.url ?? '', DEV_AUTH_CALLBACK_URL);
      if (reqUrl.pathname === '/auth/callback') {
        void handleDeepLink(
          `${DEV_DEEP_LINK_PROTOCOL}://auth/callback${reqUrl.search}`,
        );
        // Steal focus back from the browser so the app comes to the front
        // (handleDeepLink's window.focus() alone won't beat the active browser).
        if (mainWindow && !mainWindow.isDestroyed()) {
          focusWindow(mainWindow, true);
        }
      }
      // 204 = don't navigate the browser away from web's login-complete page
      // (matches prod, where the `tiro://` scheme also leaves the tab in place).
      res.writeHead(204).end();
    })
    .on('error', (error) =>
      log.warn(`[auth] dev auth loopback failed: ${error.message}`),
    )
    .listen(DEV_AUTH_CALLBACK_PORT, '127.0.0.1', () =>
      log.info(`[auth] dev auth loopback on ${DEV_AUTH_CALLBACK_URL}`),
    );
}

/**
 * Attach hide-on-close behavior to the main window.
 * When the user closes the window, it hides instead of destroying,
 * unless the app is in the process of quitting.
 *
 * Windows: 첫 hide 시 트레이에 풍선 알림을 한 번 표시 — 사용자가
 * "X 눌렀더니 앱이 사라졌네"라고 오해하지 않도록.
 */
function attachHideOnClose(window: BrowserWindow): void {
  window.on('close', (event) => {
    if (!isQuitting) {
      event.preventDefault();
      window.hide();
      // Don't force-hide the overlay here — when recording is active the
      // overlay is the only visual indicator left after the main window
      // disappears. Overlay visibility is owned by setRecordingState() and
      // the browser-window-blur handler, both of which already gate on
      // shouldShow() (isRecording && overlay_enabled).

      if (isWindows && tray && !store.get('shown_tray_hint_v1')) {
        try {
          tray.displayBalloon({
            title: 'Tiro is still running',
            content:
              'Tiro stays in the system tray. Click the icon to reopen, or right-click for options.',
          });
          store.set('shown_tray_hint_v1', true);
        } catch (err) {
          log.warn('Failed to display tray balloon hint:', err);
        }
      }
    }
  });
}

async function createAndSetupMainWindow(): Promise<BrowserWindow> {
  suppressMainWindowInitialShow = false;
  // Before createMainWindow, which already starts loading the renderer: the
  // listener below would miss that first navigation, and a window recreated
  // after the previous one was destroyed inherits its stale ready flag.
  rendererDeepLinkHold.markRendererGone();
  const window = await createMainWindow();
  attachHideOnClose(window);
  attachTelemetryDrainTargetTracking(window);
  // A document load tears the renderer down without running React cleanup, so
  // main has to invalidate readiness itself. Subframe and same-document
  // navigations must not count: an in-app iframe (Channel Talk) would otherwise
  // wedge every later deep link into the hold.
  window.webContents.on('did-start-navigation', (details) => {
    if (!details.isMainFrame || details.isSameDocument) return;
    rendererDeepLinkHold.markRendererGone();
  });
  // The window is created with `show: false` so users never see the blank/white
  // frame Electron shows by default before content paints. Reveal it once the
  // renderer is ready — unless it was intentionally hidden in the meantime
  // (background deep-link cold start), in which case leave it hidden.
  window.once('ready-to-show', () => {
    if (window.isDestroyed()) return;
    if (isAiDev) {
      process.stdout.write(
        `[AI Dev] Ready: http://127.0.0.1:9222 (page: ${window.webContents.getURL()})\n`,
      );
    }
    if (suppressMainWindowInitialShow) return;
    window.show();
  });
  return window;
}

if (process.platform === 'win32') {
  const squirrelEvent = process.argv[1];
  if (squirrelEvent && squirrelEvent.startsWith('--squirrel')) {
    log.info(
      `[auth] squirrel event: ${squirrelEvent} (pid=${process.pid} version=${app.getVersion()} execPath=${process.execPath})`,
    );
    switch (squirrelEvent) {
      case '--squirrel-install':
      case '--squirrel-updated': {
        // Register tiro:// protocol handler during Squirrel install/update so
        // that deep links (e.g. Google OAuth callback) work immediately.
        // setAsDefaultProtocolClient writes to the Windows registry synchronously,
        // so it completes before the app quits.
        app.setAsDefaultProtocolClient('tiro');
        log.info(
          `[auth] squirrel ${squirrelEvent}: re-registered tiro:// handler → execPath=${process.execPath} isDefaultProtocolClient=${app.isDefaultProtocolClient('tiro')}`,
        );
        setTimeout(() => app.quit(), 1000);
        break;
      }
      case '--squirrel-uninstall':
        app.removeAsDefaultProtocolClient('tiro');
        setTimeout(() => app.quit(), 1000);
        break;
      case '--squirrel-firstrun':
        log.info('First run after install');
        break;
      case '--squirrel-obsolete':
        app.quit();
        break;
    }
  }
}

/**
 * [macOS, Windows]
 * Guarantee that only one instance of the app is running
 */
const isPrimaryInstance = app.requestSingleInstanceLock();
log.info(
  `[auth] requestSingleInstanceLock → isPrimaryInstance=${isPrimaryInstance} (pid=${process.pid} version=${app.getVersion()})`,
);

if (!isPrimaryInstance) {
  log.info(
    '[auth] not primary instance → quitting; deep link / argv will be forwarded to the primary via second-instance',
  );
  app.quit();
}

/**
 * [Windows]
 * Quit the app after launched by squirrel
 */
if (started) {
  log.info(
    '[auth] electron-squirrel-startup flagged → quitting this launcher process',
  );
  app.quit();
}

/**
 * [macOS, Windows]
 * Check update every 1 minute
 */
const UPDATE_FEED_BASE_URL =
  'https://d1phxbe6dskhfp.cloudfront.net/tiro-desktop';
// Module-scoped so the manual "Check for Updates" handler can read the same feed
// the auto-updater polls. macOS uses a JSON feed (RELEASES.json); Windows uses a
// Squirrel directory whose RELEASES manifest lives at `${url}/RELEASES`.
const updateFeedUrl =
  process.platform === 'darwin'
    ? `${UPDATE_FEED_BASE_URL}/${process.platform}/universal/RELEASES.json`
    : `${UPDATE_FEED_BASE_URL}/${process.platform}/${process.arch}`;

// A dev-API QA build carries the production app id, version and feed, so leaving
// the updater on lets a production release install itself over the build under
// test. Route every check through requestUpdateCheck() so that stays true for
// the startup check, the 5-minute poll and the manual re-check alike.
const releaseFeedEnabled = shouldUseReleaseFeed(process.env.VITE_APP_ENV);

const requestUpdateCheck = () => {
  if (!releaseFeedEnabled) {
    log.info('auto-update disabled: dev-API build');
    return;
  }
  autoUpdater.checkForUpdates();
};

// Skip auto-updater in test environment to prevent network requests that block startup
if (process.env.NODE_ENV !== 'test' && releaseFeedEnabled) {
  autoUpdater.setFeedURL({
    url: updateFeedUrl,
    serverType: process.platform === 'darwin' ? 'json' : undefined,
  });
}

/**
 * [macOS, Windows]
 * Renderer backgrounding is intentionally LEFT ENABLED (Chromium default) so a
 * hidden/idle window throttles and stops burning CPU when the app just sits
 * open. We previously disabled it app-wide, which kept the renderer's
 * compositor running full speed even while hidden (~12% CPU at idle).
 * Background throttling is now turned off only while recording, per-window via
 * `setBackgroundThrottling(false)` (see the 'overlay:set-recording-state'
 * handler), so background capture/streaming is never paused.
 */

/**
 * [Windows]
 * Set AppUserModelId so Windows consistently identifies the app across
 * Squirrel updates (tray icon visibility, taskbar grouping, toast origin).
 * Without this, each versioned install folder looks like a "new" app and
 * the user's "show in notification area" setting resets on every update.
 */
if (isWindows) {
  app.setAppUserModelId('com.squirrel.tiro-desktop.Tiro');
}

/**
 * [macOS, Windows]
 * Create the window when the app is ready
 */
app.whenReady().then(async () => {
  // A non-primary (duplicate) instance or a Squirrel maintenance relaunch
  // (--squirrel-install/updated/uninstall/obsolete, flagged by `started`) is
  // going to quit almost immediately — see the `!isPrimaryInstance` / `started`
  // blocks above where app.quit() is called. But app.quit() is async, so if we
  // fall through here we create and briefly show a blank throwaway window before
  // the quit takes effect — the "empty window flash" on Windows startup and when
  // reopening a hidden window. Bail out before touching any window; the primary
  // instance's 'second-instance' handler restores the real (possibly hidden)
  // window instead. NOTE: --squirrel-firstrun is the real first launch (started
  // is false there), so it correctly proceeds and creates the window.
  if (!isPrimaryInstance || started) {
    log.info(
      `[startup] Skipping window creation for transient instance (isPrimaryInstance=${isPrimaryInstance} started=${started})`,
    );
    return;
  }

  // [macOS] This process may be the relaunch Squirrel forced after installing a
  // staged update while the user was quitting (installStagedUpdateOnQuit). The
  // user asked to quit, so honor that and exit before anything is created — the
  // new version is already on disk for their next launch. The marker is deleted
  // before it is honored, so it can never become a quit-on-every-launch loop.
  const quitAfterInstall = store.get('quit_after_install') ?? null;
  // Honor the marker only once it is gone from disk. A read-only or full disk
  // makes delete() throw, and letting that escape would reject whenReady before
  // the window exists — the window-less launch loop this file was burned by on
  // 4.6.6. Worse, exiting on a marker that survives would repeat every launch.
  let quitAfterInstallCleared = quitAfterInstall === null;
  if (quitAfterInstall) {
    try {
      store.delete('quit_after_install');
      quitAfterInstallCleared = true;
    } catch (error) {
      log.error('[startup] could not clear the post-install marker', error);
    }
  }
  // A launch carrying a deep link is never Squirrel's relaunch — exiting on it
  // would drop an auth callback (the user would just see login do nothing), so
  // the marker never wins over one. `open-url` is registered at module scope and
  // fires before whenReady on macOS, so a launch-triggered URL is already here.
  const hasDeepLinkOnLaunch =
    pendingDeepLinkUrl !== null || process.argv.some(isTiroScheme);
  if (
    quitAfterInstallCleared &&
    decidePostInstallExit({
      isMac,
      hasDeepLinkOnLaunch,
      currentVersion: app.getVersion(),
      record: quitAfterInstall,
      now: Date.now(),
    })
  ) {
    log.info(
      `[startup] post-install relaunch of ${app.getVersion()} → exiting (user had quit)`,
    );
    app.exit(0);
    return;
  }

  // Initialize main-process i18n
  await initMainI18n();

  // Populate the native About panel (Windows app-menu "About" entry).
  app.setAboutPanelOptions({
    applicationName: 'Tiro',
    applicationVersion: app.getVersion(),
    version: app.getVersion(),
  });

  // Keep the legacy displayMedia handler for the Screen Recording permission
  // fallback on macOS versions that do not support the audio-tap API.
  if (isMac || isWindows) {
    session.defaultSession.setDisplayMediaRequestHandler((_, callback) => {
      desktopCapturer.getSources({ types: ['screen'] }).then((sources) => {
        callback({ video: sources[0], audio: 'loopback' });
      });
    });
  }

  // Apply persisted pending updates on startup.
  const startupPendingUpdate = store.get('pending_update');
  if (startupPendingUpdate) {
    const hasNewerPendingUpdate = semver.gt(
      startupPendingUpdate.newVersion,
      app.getVersion(),
    );

    if (process.env.NODE_ENV === 'development' && hasNewerPendingUpdate) {
      log.info(
        'startup: preserving pending update in development',
        startupPendingUpdate.newVersion,
      );
    } else if (hasNewerPendingUpdate) {
      // Do NOT quitAndInstall() here. On Squirrel, quitAndInstall only works
      // in a process where 'update-downloaded' has fired — a freshly launched
      // process has no in-process download, so a startup quitAndInstall
      // deterministically fails with "No update available". Because this
      // branch used to return before window creation (and before the
      // autoUpdater 'error' handler was registered), that failure was an
      // uncaught throw that left the app window-less in a permanent
      // launch-crash loop (observed on 4.6.6→4.6.7). Squirrel normally
      // installs a downloaded update when the app terminates; reaching this
      // branch means that hand-off failed, so keep the record, continue a
      // normal boot, and let the startup checkForUpdates() re-download
      // in-process (patch updates then apply silently on the next quit;
      // minors re-surface the update badge, majors the badge and toast).
      log.info(
        'startup: pending update present, deferring to in-process re-download',
        startupPendingUpdate.newVersion,
      );
    } else {
      log.info(
        'startup: clearing stale pending_update',
        startupPendingUpdate.newVersion,
      );
      store.set('pending_update', null);
    }
  }

  // Set activation policy to regular to ensure app appears in Dock and Command+Tab
  // This must be set before creating windows
  if (isMac) {
    app.setActivationPolicy('regular');
    await app.dock?.show();
  }

  const isShareNetworkTelemetryRegistered = registerShareNetworkTelemetry({
    webRequest: session.defaultSession.webRequest,
    apiBaseUrl: process.env.VITE_API_BASE_URL,
    onEvent: ({ level, message, context }) => {
      forwardLogToDatadog(level, message, context);
    },
  });
  if (!isShareNetworkTelemetryRegistered) {
    log.warn(
      '[ShareNetwork] Telemetry disabled because API base URL is unavailable',
    );
  }

  mainWindow = await createAndSetupMainWindow();
  // Pre-create overlay window to avoid focus issues on first show
  overlayWindowService.initialize();

  // macOS application menu (menu-bar "Tiro" dropdown) with "About Tiro" and
  // "Check for Updates...". No-op on other platforms.
  app.setAboutPanelOptions({
    applicationName: 'Tiro',
    applicationVersion: app.getVersion(),
    version: app.getVersion(),
  });
  initAppMenu({
    applyUpdate: applyPendingUpdateAndRestart,
    feedUrl: updateFeedUrl,
    getPendingVersion: () => pendingUpdate?.newVersion ?? null,
  });

  mainWindow.on('closed', () => {
    overlayWindowService.destroy();
  });

  // Setup overlay window show/hide logic using app-level events
  // This is more reliable than window-level blur/focus on macOS
  let isOverlayRelatedBlur = false;

  app.on('browser-window-blur', (_event, window) => {
    // Mark if this blur is from overlay window
    if (window === overlayWindowService.getWindow()) {
      isOverlayRelatedBlur = true;
      setTimeout(() => {
        isOverlayRelatedBlur = false;
      }, 100);
      return;
    }

    // Only handle main window blur events
    if (window !== mainWindow) {
      return;
    }

    // Ignore blur if it's caused by overlay window interaction
    if (isOverlayRelatedBlur) {
      return;
    }

    if (overlayWindowService.shouldShow()) {
      // Use setImmediate to avoid focus race condition
      setImmediate(() => {
        overlayWindowService.show();
      });
    }
  });

  app.on('browser-window-focus', (_event, window) => {
    // Ignore overlay window focus - overlay can be focused for dragging
    if (window === overlayWindowService.getWindow()) {
      return;
    }

    // Only handle main window focus events
    if (window !== mainWindow) {
      return;
    }

    overlayWindowService.hide();
  });

  // pending_update in the store is only a retry hint after a restart.
  // Keep install affordances hidden until this process emits update-downloaded.

  // Check if app was updated (version changed)
  const lastInstalledVersion = store.get('last_installed_version');
  const currentVersion = app.getVersion();

  if (lastInstalledVersion && lastInstalledVersion !== currentVersion) {
    // Version changed - app was updated
    log.info('App updated detected:', {
      from: lastInstalledVersion,
      to: currentVersion,
    });

    // Send update completed event to renderer
    sendWebContents('update-completed', {
      newVersion: currentVersion,
      currentVersion: lastInstalledVersion,
    });
  }

  // Verify install outcome against attempted_install_version. This compares the
  // version we asked quitAndInstall to apply with the version that actually
  // booted, so the renderer can complete the auto-update funnel in PostHog.
  const attemptedInstallVersion = store.get('attempted_install_version');
  if (attemptedInstallVersion) {
    if (attemptedInstallVersion === currentVersion) {
      sendWebContents('telemetry:update-event', {
        stage: 'install-success',
        attemptedVersion: attemptedInstallVersion,
        currentVersion,
      });
      // PLT-5221: staged update applied successfully — clear the staged record
      // now (previously cleared prematurely in applyPendingUpdateAndRestart,
      // which bricked retries when an install attempt failed).
      pendingUpdate = null;
      writeStoreOrLog('pending_update', null);
    } else {
      // PLT-5221: forward install failures to Datadog (main-process logs are
      // otherwise local-only) so we can see, fleet-wide, when an attempted
      // update did not boot the expected version. Only failures are forwarded —
      // never the 5-min checking/not-available poll (PostHog cost lesson, #1550).
      forwardLogToDatadog('error', 'update-install-failed', {
        attempted_version: attemptedInstallVersion,
        current_version: currentVersion,
      });
      sendWebContents('telemetry:update-event', {
        stage: 'install-failed',
        attemptedVersion: attemptedInstallVersion,
        currentVersion,
      });
    }
    // Use delete() — electron-store throws "Use `delete()` to clear values" on
    // set(key, undefined). Throwing here previously aborted the rest of
    // whenReady (so the autoUpdater 'update-downloaded' handler never
    // registered), which broke update detection on every post-update launch.
    // A disk-level failure throws the same way, so it goes through the same
    // guard: a record we could not clear is worth a duplicate telemetry line,
    // not a launch without an updater.
    deleteStoreOrLog('attempted_install_version');
  }

  // Update last installed version
  writeStoreOrLog('last_installed_version', currentVersion);

  autoUpdater.on(
    'update-downloaded',

    (_event, _releaseNotes, releaseName, _releaseDate, _updateURL) => {
      log.info('update-downloaded');

      // normalize version
      const newVersion = releaseName.match(/(\d+\.\d+\.\d+)/) || '0.0.0';
      const currentVersion = app.getVersion();

      // Guard: skip if downloaded version is not newer than current version
      // This prevents showing "Update Now vX.X.X" when already on the same version
      if (!semver.gt(newVersion[0], currentVersion)) {
        log.info(
          'update-downloaded: skipping, downloaded version is not newer',
          {
            newVersion: newVersion[0],
            currentVersion,
          },
        );
        return;
      }

      const shouldForceUpdate =
        semver.gt(newVersion[0], currentVersion) &&
        (semver.major(newVersion[0]) > semver.major(currentVersion) ||
          semver.minor(newVersion[0]) > semver.minor(currentVersion));

      // Check if this is a patch-only update
      const versionDiff = semver.diff(currentVersion, newVersion[0]);
      const isPatchUpdate = versionDiff === 'patch';

      pendingUpdate = {
        shouldForceUpdate,
        newVersion: newVersion[0],
        currentVersion,
        isPatchUpdate,
      };

      log.info('pendingUpdate', pendingUpdate);

      // Reflect the freshly staged build in the macOS app menu so it morphs to
      // "Restart to Apply Update" (also keeps it pointed at the newest version
      // when a later build is downloaded over an earlier one).
      setUpdateMenuState({ kind: 'pending', newVersion: newVersion[0] });

      sendWebContents('telemetry:update-event', {
        stage: 'downloaded',
        newVersion: newVersion[0],
        currentVersion,
        isPatchUpdate,
      });

      // For patch updates: silent — no notification, auto-apply on next restart
      // For major/minor updates: show notification to user
      if (isPatchUpdate) {
        log.info(
          'Patch update detected, scheduling silent update on next restart',
        );
        store.set('pending_update', pendingUpdate);
        if (mainWindow && !mainWindow.isDestroyed()) {
          sendWebContents('update-available', pendingUpdate);
        }
      } else {
        // Do not Send web contents when windows are destroyed
        // Send Client Update Info after some delay
        if (mainWindow && !mainWindow.isDestroyed() && pendingUpdate) {
          sendWebContents('update-available', pendingUpdate);
          store.set('pending_update', pendingUpdate);
        }
      }
    },
  );
  autoUpdater.on('update-not-available', () => {
    log.info('update-not-available');
    sendWebContents('telemetry:update-event', {
      stage: 'not-available',
      currentVersion: app.getVersion(),
    });
  });
  autoUpdater.on('error', (error) => {
    if (isNoUpdateAvailableError(error)) {
      log.info('update: no staged update available; waiting for re-download');
      sendWebContents('telemetry:update-event', {
        stage: 'not-available',
        currentVersion: app.getVersion(),
      });
      return;
    }

    // PLT-5221: forward auto-update errors to Datadog for fleet-wide visibility
    // (forwardLogToDatadog also preserves the local electron-log line). Only
    // errors/install-failures are forwarded — never the 5-min checking poll.
    forwardLogToDatadog('error', 'update-error', {
      error_message: error?.message ?? String(error),
      error_stack: error?.stack ?? '',
      current_version: app.getVersion(),
    });
    sendWebContents('telemetry:update-event', {
      stage: 'error',
      message: error?.message ?? String(error),
      currentVersion: app.getVersion(),
    });
  });
  autoUpdater.on('update-available', () => {
    log.info('update-available');
    sendWebContents('telemetry:update-event', {
      stage: 'available',
      currentVersion: app.getVersion(),
    });
  });
  autoUpdater.on('checking-for-update', () => {
    log.info('checking-for-update');
    sendWebContents('telemetry:update-event', {
      stage: 'checking',
      currentVersion: app.getVersion(),
    });
  });

  // Always check for updates on startup to ensure we fetch the latest version
  log.info('checking-for-update on startup');
  requestUpdateCheck();
  updateCheckInterval = setInterval(
    () => {
      // PLT-5221: Once a newer build is downloaded/staged, STOP calling
      // checkForUpdates(). On Electron 39.7.0 the macOS Squirrel.Mac path
      // (#49365/#50200, fixed in 39.8.1) deletes the staged build on a repeated
      // check, so a later quitAndInstall() fails "No update available" and the
      // app stays on the old version (Windows: same class, #6647). Keep
      // re-surfacing the staged update (survives a renderer remount); normal
      // checks resume after it's applied on the next launch. A build newer than
      // the staged one is picked up after the staged one is applied — we do NOT
      // re-check to "jump", since that re-check would reset the staged build.
      if (
        pendingUpdate &&
        !pendingUpdate.isPatchUpdate &&
        semver.gt(pendingUpdate.newVersion, app.getVersion())
      ) {
        log.info('send update-available');
        sendWebContents('update-available', pendingUpdate);
      }

      if (
        shouldSkipBackgroundCheck({
          currentVersion: app.getVersion(),
          stagedVersion: pendingUpdate?.newVersion ?? null,
        })
      ) {
        return;
      }

      requestUpdateCheck();
    },
    1000 * 60 * 5,
  ); // 5 minutes

  // Create tray icon
  createTray();

  const token = getAuthToken(store);
  log.info(
    `[auth] app.whenReady auth restore: hasToken=${!!token} tokenLength=${token.length} apiBaseUrlSet=${!!process.env.VITE_API_BASE_URL} wsBaseUrlSet=${!!process.env.VITE_WS_BASE_URL}`,
  );
  if (token) {
    log.info(
      '[auth] Found token in store on startup, setting up request interceptor',
    );

    session.defaultSession.webRequest.onBeforeSendHeaders(null);
    session.defaultSession.webRequest.onBeforeSendHeaders(
      { urls: AUTH_INTERCEPT_URL_PATTERNS },
      (details, callback) => {
        const { requestHeaders } = details;

        applyAuthRequestHeaders({
          url: details.url,
          requestHeaders,
          token,
          apiBaseUrl: process.env.VITE_API_BASE_URL,
          webSocketBaseUrl: process.env.VITE_WS_BASE_URL,
          webBaseUrl: process.env.VITE_WEB_BASE_URL,
        });
        callback({ requestHeaders });
      },
    );
    log.info('[auth] Request interceptor set on app start');
  } else {
    log.warn(
      '[auth] No token found in store on startup → renderer getUser() will 401 and route to /login',
    );
  }

  /**
   * [macOS, Windows]
   * Register the app as a default client for the desktop deep link protocol.
   */
  const registeredDeepLinkProtocol = getRegisteredDeepLinkProtocol({
    isPackaged: app.isPackaged,
  });

  if (process.defaultApp && process.argv.length >= 2) {
    const resolvedArg = path.resolve(process.argv[1]);
    app.setAsDefaultProtocolClient(
      registeredDeepLinkProtocol,
      process.execPath,
      [resolvedArg],
    );
  } else {
    app.setAsDefaultProtocolClient(registeredDeepLinkProtocol);
  }
  log.info(
    `[auth] ${registeredDeepLinkProtocol}:// handler on startup: isDefaultProtocolClient=${app.isDefaultProtocolClient(registeredDeepLinkProtocol)} execPath=${process.execPath} version=${app.getVersion()}`,
  );

  // request calendar events
  mainWindow.webContents.on('did-finish-load', () => {
    sendWebContents('tray:request-calendar-events');
  });

  // Start microphone in-use monitor
  micMonitorInterval = startMicInUseNotificationMonitor(
    () => store.get('mic_detection_notification_enabled', true),
    () => ({
      transcribeLocale: store.get('transcribe_locale'),
      summaryLocale: store.get('summary_locale'),
    }),
  );

  // System power events monitoring
  powerMonitor.on('suspend', () => {
    log.info(
      '[PowerMonitor] System suspend detected - timestamp:',
      new Date().toISOString(),
    );
    sendWebContents('system:suspend');
  });

  powerMonitor.on('resume', () => {
    log.info(
      '[PowerMonitor] System resume detected - timestamp:',
      new Date().toISOString(),
    );
    sendWebContents('system:resume');
  });

  powerMonitor.on('lock-screen', () => {
    log.info(
      '[PowerMonitor] Screen locked - timestamp:',
      new Date().toISOString(),
    );
    sendWebContents('system:lock');
  });

  powerMonitor.on('unlock-screen', () => {
    log.info(
      '[PowerMonitor] Screen unlocked - timestamp:',
      new Date().toISOString(),
    );
    sendWebContents('system:unlock');
  });

  // [Windows] Check for deep link URL in process.argv on cold start
  // On Windows, if the app is launched via a tiro:// URL when it's not
  // already running, the URL will be in process.argv instead of coming
  // through the 'second-instance' event.
  if (isWindows) {
    const deepLinkArgv = process.argv.find(isTiroScheme);
    if (deepLinkArgv) {
      log.info(
        `[auth] cold-start deep link in argv (Windows). isAuthCallback=${isAuthCallbackDeepLink(deepLinkArgv)}`,
      );
      void handleDeepLink(deepLinkArgv);
    }
  }

  // [macOS] Process any deep link URL that was queued during initialization
  if (pendingDeepLinkUrl) {
    void handleDeepLink(pendingDeepLinkUrl);
    pendingDeepLinkUrl = null;
  }

  // [Dev] OAuth callbacks come back over 127.0.0.1 instead of the shared
  // `tiro-dev://` scheme, so they always reach this running instance.
  startDevAuthLoopbackServer();
});

/**
 * [macOS, Windows]
 * Cleanup Before Quit.
 */
app.on('before-quit', async (event) => {
  // This IS the quit quitAndInstall() started — never interfere with it.
  if (installHandedOff) {
    return;
  }

  // A second Cmd+Q (or Dock → Quit) while the cleanup below is still running
  // would otherwise fall through without preventDefault() and let Electron end
  // the process mid-cleanup — losing the recording teardown and the update
  // install that runs after it. Swallow it; the cleanup finishes on its own and
  // is bounded by the force-quit timeout.
  if (gracefulShutdownInProgress) {
    log.info('before-quit: shutdown already in progress; ignoring duplicate');
    event.preventDefault();
    return;
  }

  // "Update now" scheduled an install that hasn't reached Squirrel yet, and the
  // user has since asked to quit. Quitting wins: cancel the restart-style
  // install and fall through to the normal shutdown, which installs the same
  // build at the end — just without bringing the app back up. Letting the quit
  // through as-is would drop the install AND leave attempted_install_version
  // behind, so the next launch would report a failure that never happened.
  if (scheduledInstallTimer) {
    clearTimeout(scheduledInstallTimer);
    scheduledInstallTimer = null;
    updateInstallStarted = false;
    log.info('before-quit: cancelled scheduled install; quitting instead');
  }

  // Note: a staged update is installed at the very end of this handler, on
  // macOS only (installStagedUpdateOnQuit) — Windows Squirrel already unpacked
  // it at download time, so its next launch is the new build either way.
  // pending_update stays in the store until a launch confirms the new version,
  // so a failed install still re-surfaces:
  //   - Patch updates  → re-downloaded silently, applied on the next quit
  //   - Minor updates  → update badge re-shown so the user can choose when to apply
  //   - Major updates  → update badge and toast re-shown so the user can choose when to apply

  // Mark as quitting to prevent re-entry
  isQuitting = true;
  gracefulShutdownInProgress = true;
  event.preventDefault(); // Prevent immediate quit

  log.info('Starting graceful shutdown...');

  // Set timeout for forced shutdown
  const forceQuitTimeout = setTimeout(() => {
    log.warn('Graceful shutdown timeout - forcing exit');
    // A cleanup that hangs must not swallow the update too. This process is
    // being killed either way, and Squirrel only swaps the bundle after it
    // exits, so asking for the install here costs the user nothing and saves
    // the quit they already made. Exit regardless of what Squirrel does.
    if (installStagedUpdateOnQuit()) {
      setTimeout(() => process.exit(0), 2000);
      return;
    }
    process.exit(0);
  }, 3000); // 3 seconds timeout

  try {
    // Cleanup audio recording sessions
    try {
      await audioRecordingManager.cleanup();
    } catch (error) {
      log.error('Failed to cleanup audio recordings:', error);
    }

    // Cleanup overlay window
    overlayWindowService.destroy();

    // Reset Tiro microphone session state
    try {
      // eslint-disable-next-line @typescript-eslint/no-require-imports
      const microphone = require('@plato-corp/microphone');
      if (typeof microphone?.stopTiroSession === 'function') {
        microphone.stopTiroSession();
      }
    } catch (error) {
      log.error('Failed to stop Tiro microphone session:', error);
    }

    if (tray) {
      tray.destroy();
      tray = null;
    }

    if (mainWindow) {
      mainWindow.destroy();
      mainWindow = null;
    }

    if (updateCheckInterval) {
      clearInterval(updateCheckInterval);
      updateCheckInterval = null;
    }

    if (micMonitorInterval) {
      clearInterval(micMonitorInterval);
      micMonitorInterval = null;
    }

    stopMeetingEndMonitor();

    autoUpdater.removeAllListeners('update-downloaded');
    autoUpdater.removeAllListeners('update-not-available');
    autoUpdater.removeAllListeners('error');
    autoUpdater.removeAllListeners('update-available');
    autoUpdater.removeAllListeners('checking-for-update');

    log.info('Cleanup completed successfully');
  } catch (error) {
    log.error('Error during cleanup:', error);
  } finally {
    // Clear the timeout since cleanup finished
    clearTimeout(forceQuitTimeout);

    // Small delay to allow log to flush
    setTimeout(() => {
      // [macOS] Install the staged build as we go down; it terminates us.
      if (installStagedUpdateOnQuit()) return;
      log.info('Exiting application');
      app.exit(0);
    }, 100);
  }
});

/**
 * [macOS]
 * Create the window when the app is activated but no window is open
 */
app.on('activate', async () => {
  if (!mainWindow || mainWindow.isDestroyed()) {
    mainWindow = await createAndSetupMainWindow();
  } else if (!mainWindow.isVisible()) {
    mainWindow.show();
  }

  if (
    mainWindow &&
    !mainWindow.isDestroyed() &&
    pendingUpdate &&
    !pendingUpdate.isPatchUpdate &&
    semver.gt(pendingUpdate.newVersion, app.getVersion())
  ) {
    sendWebContents('update-available', pendingUpdate);
    store.set('pending_update', pendingUpdate);
  }
});

/**
 * [macOS, Windows]
 * Focus the primary instance when a second instance is about to be launched
 * - The second instance would be quit
 *
 * [Windows]
 * Open the app when a URL is opened
 */
app.on('second-instance', (_, commandLine) => {
  // handle Deep Link
  const url = commandLine.find(isTiroScheme);
  const deepLinkMetadata = getDeepLinkLogMetadata(url);
  log.info(
    `[auth] second-instance fired in PRIMARY (pid=${process.pid} version=${app.getVersion()}). deepLink=${JSON.stringify(deepLinkMetadata)}`,
  );
  const isBackground = url ? isBackgroundDeepLink(url) : false;

  if (mainWindow && !mainWindow.isDestroyed()) {
    // Only restore/focus if not a background deep link
    if (!isBackground) {
      if (!mainWindow.isVisible()) {
        mainWindow.show();
      }
      if (mainWindow.isMinimized()) {
        mainWindow.restore();
      }
      mainWindow.focus();
    }

    if (url) {
      handleDeepLink(url);
      // For background mode, hide app after handling the deep link
      // Use a longer delay to ensure the renderer processes the IPC message first
      if (isBackground) {
        setTimeout(() => {
          hideToBackground();
        }, 500);
      }
    }
  } else {
    log.warn(
      'second-instance: mainWindow not available — cannot handle deep link',
    );
  }
});

/**
 * [macOS]
 * Handle desktop deep links.
 * Registered at module scope so it captures events that fire during the async
 * app.whenReady() initialization (before mainWindow is created). Any URL that
 * arrives before initialization completes is queued in pendingDeepLinkUrl and
 * processed at the end of the whenReady block.
 */
app.on('open-url', async (event, url) => {
  event.preventDefault();
  log.info(
    `[auth] open-url fired (macOS, pid=${process.pid} version=${app.getVersion()}). isAuthCallback=${isAuthCallbackDeepLink(url)} mainWindowReady=${!!(mainWindow && !mainWindow.isDestroyed())}`,
  );

  const isBackground = isBackgroundDeepLink(url);

  if (mainWindow && !mainWindow.isDestroyed()) {
    if (!isBackground) {
      focusWindow(mainWindow, true);
    }
    void handleDeepLink(url);
    if (isBackground) {
      setTimeout(() => {
        hideToBackground();
      }, 500);
    }
  } else {
    // App is still running through whenReady — queue for later
    pendingDeepLinkUrl = url;
  }
});

/**
 * [Windows]
 * Quit the app when all windows are closed
 */
app.on('window-all-closed', () => {
  // The graceful shutdown destroys the window itself; re-entering app.quit()
  // here would fire a second 'before-quit' that returns without
  // preventDefault(), letting Electron tear the process down before the
  // cleanup — and the update install that follows it — has run.
  if (isQuitting) {
    return;
  }

  // Only a download completed in this process is safe for Squirrel to apply.
  // A persisted-only record is a retry hint and must not make macOS quit early.
  const hasNewerStaged = getReadyUpdate() !== null;
  log.info('window-all-closed: pendingUpdate', pendingUpdate);

  // If a newer downloaded update is pending, quit so Squirrel can install it
  // on termination (before-quit does NOT quitAndInstall; Squirrel applies the
  // update downloaded in this process when the app exits, and the next boot
  // clears the record once the new version comes up).
  if (hasNewerStaged) {
    log.info('window-all-closed: quitting app to apply update');
    app.quit();
    return;
  }

  if (!isMac) {
    app.quit();
  }
});

ipcMain.on('deeplink:renderer-gone', () => {
  rendererDeepLinkHold.markRendererGone();
});

ipcMain.on('deeplink:renderer-ready', () => {
  const heldUrl = rendererDeepLinkHold.markRendererReady();
  if (!heldUrl) return;
  log.info('[DeepLink] renderer ready → replaying held deep link');
  void handleDeepLink(heldUrl);
});

ipcMain.handle('credential-attach-result:claim', () => {
  return claimCredentialAttachResult();
});

ipcMain.handle('workflow-connect-result:claim', () => {
  return claimWorkflowConnectResults();
});

/**
 * [macOS, Windows]
 * Google Drive 폴더 선택: renderer 가 받은 1회용 ticket 으로 web 의 Picker 페이지를
 * 시스템 브라우저에 연다. 결과는 `google-drive/picked` 딥링크로 돌아온다.
 */
ipcMain.handle('google-drive-picker:open', async (_, ticket: unknown) => {
  const webBaseUrl = process.env.VITE_WEB_BASE_URL;
  if (!isValidPickerTicket(ticket) || !webBaseUrl) {
    throw new Error('Cannot open Google Drive picker');
  }
  const url = buildGoogleDrivePickerUrl({
    webBaseUrl,
    ticket,
    clientNonce: beginGoogleDrivePick(),
    deepLinkProtocol: getRegisteredDeepLinkProtocol({
      isPackaged: app.isPackaged,
    }),
  });
  await openExternalOrThrow(url);
});

ipcMain.handle('google-drive-picker:claim', () => {
  return claimGoogleDrivePickerResult();
});

/**
 * [macOS, Windows]
 * Clear auth token when logout
 */
ipcMain.handle('clear-auth-token', () => {
  log.warn(
    '[auth] ipc clear-auth-token: CLEARING auth token + interceptor (explicit logout/leave expected)',
  );
  const failures = clearAuthSessionState({
    removeAuthToken: () => removeAuthToken(store),
    clearAuthIntent: () => clearAuthIntent(store as unknown as AuthIntentStore),
    discardCredentialAttachResult,
    discardWorkflowConnectResults,
    discardGoogleDrivePicker,
    discardHeldUrl: () => rendererDeepLinkHold.discardHeldUrl(),
    clearObservabilityUser: () => setSentryUser(null),
    removeRequestInterceptor: () =>
      session.defaultSession.webRequest.onBeforeSendHeaders(null),
  });
  failures.forEach(({ step, error }) => {
    log.error(`[auth] ipc clear-auth-token: ${step} failed`, error);
  });
  const blockingFailure = getBlockingAuthSessionCleanupFailure(failures);
  if (blockingFailure) throw blockingFailure.error;
  log.info('[auth] ipc clear-auth-token: request interceptor removed');

  return true;
});

ipcMain.handle('observability:set-user', (_event, guid: unknown) => {
  if (guid === null) setSentryUser(null);
  if (typeof guid === 'string' && guid) setSentryUser(guid);
});

/**
 * [macOS, Windows]
 * Get auth token
 */
ipcMain.handle('get-auth-token', () => {
  return getAuthToken(store);
});

/**
 * [macOS, Windows]
 * Set auth token
 */
ipcMain.handle('set-auth-token', (_, token: string) => {
  log.info(
    `[auth] ipc set-auth-token: received tokenLength=${token?.length ?? 0}`,
  );
  try {
    setAuthToken(store, token);
  } catch (error) {
    log.error(
      '[auth] ipc set-auth-token: setAuthToken threw — token NOT persisted, interceptor NOT set',
      error,
    );
    throw error;
  }

  session.defaultSession.webRequest.onBeforeSendHeaders(null);
  session.defaultSession.webRequest.onBeforeSendHeaders(
    { urls: AUTH_INTERCEPT_URL_PATTERNS },
    (details, callback) => {
      const { requestHeaders } = details;
      applyAuthRequestHeaders({
        url: details.url,
        requestHeaders,
        token,
        apiBaseUrl: process.env.VITE_API_BASE_URL,
        webSocketBaseUrl: process.env.VITE_WS_BASE_URL,
        webBaseUrl: process.env.VITE_WEB_BASE_URL,
      });
      callback({ requestHeaders });
    },
  );

  log.info(
    '[auth] ipc set-auth-token: request interceptor set for Authorization headers',
  );
});

/**
 * [macOS, Windows]
 * Returns ad attributions persisted from a deeplink (or empty array).
 *
 * The renderer's `useAdAttributionFlush` calls this once after the user
 * is authenticated, sends each entry to the server, and follows up with
 * `ad-attribution:clear-pending` on success.
 */
ipcMain.handle('ad-attribution:get-pending', () => {
  return store.get(PENDING_AD_ATTRIBUTIONS_KEY, []);
});

/**
 * [macOS, Windows]
 * Drops the persisted ad attributions after a successful flush.
 */
ipcMain.handle('ad-attribution:clear-pending', () => {
  store.delete(PENDING_AD_ATTRIBUTIONS_KEY);
});

/**
 * [macOS, Windows]
 * Returns the web PostHog distinct_id persisted from a deeplink (or null).
 * The renderer's `useWebIdentityHandoff` reads it once to merge the web
 * landing person with this app person, then calls the clear handler below.
 */
ipcMain.handle('posthog-handoff:get-pending-web-distinct-id', () => {
  return store.get(PENDING_WEB_DISTINCT_ID_KEY, null);
});

/**
 * [macOS, Windows]
 * Drops the persisted web distinct_id after a successful handoff.
 */
ipcMain.handle('posthog-handoff:clear-pending-web-distinct-id', () => {
  store.delete(PENDING_WEB_DISTINCT_ID_KEY);
});

/**
 * [macOS, Windows]
 * Claims the once-per-installation first-launch slot. Returns true exactly once
 * per install; the renderer fires `view_page_first_launch` only on true.
 *
 * 읽기와 쓰기를 한 handler 안에서 끝내는 이유: 렌더러가 "읽고 → 발사 → 표시"
 * 3단계로 나누면 창이 두 개 뜨거나 렌더러가 재마운트될 때 둘 다 true 를 읽어
 * 중복 발사된다. electron-store 는 동기라 이 handler 안에서는 원자적이다.
 */
ipcMain.handle('first-launch:claim', () => {
  if (store.get(FIRST_LAUNCH_EVENT_SENT_KEY, false)) {
    return false;
  }
  store.set(FIRST_LAUNCH_EVENT_SENT_KEY, true);
  return true;
});

/**
 * [macOS, Windows]
 * Set request interceptor for Authorization header
 */
ipcMain.handle('set-request-interceptor', () => {
  const token = getAuthToken(store);
  if (!token) {
    log.warn('No token found in store, cannot set request interceptor');
    return false;
  }

  session.defaultSession.webRequest.onBeforeSendHeaders(null);
  session.defaultSession.webRequest.onBeforeSendHeaders(
    { urls: AUTH_INTERCEPT_URL_PATTERNS },
    (details, callback) => {
      const { requestHeaders } = details;
      applyAuthRequestHeaders({
        url: details.url,
        requestHeaders,
        token,
        apiBaseUrl: process.env.VITE_API_BASE_URL,
        webSocketBaseUrl: process.env.VITE_WS_BASE_URL,
        webBaseUrl: process.env.VITE_WEB_BASE_URL,
      });
      callback({ requestHeaders });
    },
  );

  log.info('Request interceptor set for Authorization headers');
  return true;
});

/**
 * The renderer signals it has attached the `telemetry:log` listener, so main can
 * release logs it buffered while no renderer was able to ship them.
 */
ipcMain.handle('telemetry:ready', (event) => {
  const senderFrame = event.senderFrame;
  if (
    event.sender.isDestroyed() ||
    !senderFrame ||
    !telemetryDocumentGate?.acknowledge(senderFrame)
  )
    return false;
  // 곧 교체될 문서면 배수하지 않는다 — 큐를 그 문서로 흘리면 교체와 함께 사라진다.
  if (rendererSwapPending) return true;
  drainPendingTelemetryTo(event.sender);
  return true;
});

/**
 * [macOS, Windows]
 * Authorize in auth window
 */
ipcMain.handle(
  'authorize',
  async (
    _,
    {
      authUrl,
      provider,
      usePkce,
      bindsAuthCallback,
      credentialAttachVerifier,
      credentialAttachNonce,
    }: {
      authUrl: string;
      provider: string;
      usePkce?: boolean;
      bindsAuthCallback?: boolean;
      credentialAttachVerifier?: string;
      credentialAttachNonce?: string;
    },
  ) => {
    if (
      credentialAttachVerifier &&
      (credentialAttachVerifier.length !== 43 ||
        !isPkceVerifier(credentialAttachVerifier))
    ) {
      throw new Error('Invalid credential attach verifier');
    }
    if (credentialAttachVerifier && !credentialAttachNonce) {
      throw new Error('Credential attach nonce is required');
    }
    if (credentialAttachNonce && !credentialAttachVerifier) {
      throw new Error('Credential attach verifier is required');
    }
    const authIntentStore = store as unknown as AuthIntentStore;
    if (
      hasBlockingAuthIntent(authIntentStore, {
        bindsAuthCallback,
        credentialAttachNonce,
      })
    ) {
      throw new Error('Another OAuth authorization is already pending');
    }
    const pendingAuthIntent = usePkce
      ? getLoginAuthIntentRecord(authIntentStore, provider)
      : null;
    const pendingCodeVerifier = pendingAuthIntent?.protectedCodeVerifier
      ? unprotectAuthSecret(pendingAuthIntent.protectedCodeVerifier)
      : null;
    const reusableCodeVerifier =
      pendingCodeVerifier && isPkceVerifier(pendingCodeVerifier)
        ? pendingCodeVerifier
        : undefined;
    const pkce = usePkce ? createPkcePair(reusableCodeVerifier) : null;
    const codeVerifier = credentialAttachVerifier ?? pkce?.codeVerifier;
    const protectedCodeVerifier = codeVerifier
      ? protectAuthSecret(codeVerifier)
      : null;
    const targetUrl =
      pkce && protectedCodeVerifier
        ? appendPkceParameters(authUrl, pkce.codeChallenge)
        : authUrl;
    if (usePkce && !protectedCodeVerifier) {
      log.warn(
        '[auth] safe storage unavailable; continuing login without PKCE',
      );
    }
    if (credentialAttachVerifier && !protectedCodeVerifier) {
      throw new Error('Secure storage is unavailable');
    }

    // Record that the user explicitly initiated an auth flow so
    // `tiro://auth/callback` can reject token injection attempts that arrive
    // without an in-app login click. Persisted store keeps Windows cold-start
    // OAuth callbacks working when the protocol handler relaunches the app.
    // 콜백이 intent 를 읽지 않는 연동(Calendar 등)은 `bindsAuthCallback` 없이 호출된다.
    const previousAuthIntent = bindsAuthCallback
      ? getPendingAuthIntentRecord(authIntentStore)
      : null;
    markAuthCallbackIntent(authIntentStore, provider, {
      bindsAuthCallback,
      protectedCodeVerifier: protectedCodeVerifier ?? undefined,
      credentialAttachNonce,
    });
    markWorkflowAuthorizeEpoch(provider);
    try {
      // Restrict to http/https to prevent file:// / javascript: / custom-scheme
      // attacks via renderer-supplied URLs. See TIRO-SEC-03.
      await openExternalOrThrow(targetUrl);
    } catch (error) {
      // 재시도에서 브라우저 열기만 실패하면 먼저 연 브라우저의 콜백은 아직 유효하다.
      if (previousAuthIntent) {
        restoreAuthIntent(authIntentStore, previousAuthIntent);
      } else if (bindsAuthCallback) {
        clearAuthIntent(authIntentStore);
      }
      throw error;
    }
  },
);

/**
 * [macOS, Windows]
 * Notification show
 */
ipcMain.handle(
  'notification-show',
  (
    _,
    payload: {
      id: string;
      type: 'STREAMING_ERROR' | 'UPCOMING_MEETING';
      payload: {
        title: string;
        body: string;
        icon?: string;
        action: {
          text: string;
          callbackUrl: string;
        };
      };
    },
  ) => {
    if (notificationWindow) {
      return;
    }

    // Use custom notification window for all notification types
    if (
      (payload.type === 'UPCOMING_MEETING' ||
        payload.type === 'STREAMING_ERROR') &&
      payload.payload.action
    ) {
      try {
        notificationWindow = createNotificationWindow({
          title: payload.payload.title,
          body: payload.payload.body,
          action: {
            text: payload.payload.action.text,
            callbackUrl: payload.payload.action.callbackUrl,
          },
        });

        notificationWindow.on('closed', () => {
          notificationWindow = null;
        });

        return;
      } catch (error) {
        log.error('Error parsing deepLink:', error);
      }
    }

    notificationWindow = createNotificationWindow({
      title: payload.payload.title,
      body: payload.payload.body,
      action: {
        text: 'Show Details',
        callbackUrl: 'tiro://main/focus/mainList',
      },
    });

    notificationWindow.on('closed', () => {
      notificationWindow = null;
    });
  },
);

/**
 * [macOS, Windows]
 * Locale sync IPC
 */
ipcMain.handle('locale:set', async (_event, language: string) => {
  return await setMainLocale(language);
});

/**
 * [macOS, Windows]
 * Recording locale preferences sync (renderer → main)
 * Used by notification popups to show the user's preferred language
 */
ipcMain.handle(
  'locale:set-recording-preferences',
  (
    _event,
    preferences: { transcribeLocale: string; summaryLocale: string },
  ) => {
    store.set('transcribe_locale', preferences.transcribeLocale);
    store.set('summary_locale', preferences.summaryLocale);
  },
);

ipcMain.handle('locale:get-recording-preferences', () => {
  return {
    transcribeLocale: store.get('transcribe_locale'),
    summaryLocale: store.get('summary_locale'),
  };
});

/**
 * [macOS, Windows]
 * Open url in external browser
 */
ipcMain.handle(
  'open-url-in-external-browser',
  async (_, url: string, options?: { meetingMode?: boolean }) => {
    // Restrict to http/https/mailto. See TIRO-SEC-07.
    const opened = await safeOpenExternal(url);
    if (!opened) return false;
    if (!mainWindow || mainWindow.isDestroyed()) {
      mainWindow = await createAndSetupMainWindow();
    }

    // Enter meeting mode if requested
    if (options?.meetingMode) {
      enterMeetingMode(mainWindow, true); // User initiated action, focus allowed
    }
    return true;
  },
);

/**
 * [macOS, Windows]
 * Get external module path
 */
ipcMain.handle('get-external-module-path', (_, name: string) => {
  return getExternalModulePath(name);
});

/**
 * [macOS, Windows]
 * Get device UUID
 */
ipcMain.handle('get-device-uuid', async () => {
  return await machineId();
});

/**
 * [macOS, Windows]
 * Generate DOCX from HTML content
 */
ipcMain.handle(
  'docx:generate',
  async (_, options: { title: string; document: string }) => {
    try {
      // Show save dialog
      const result = await dialog.showSaveDialog(mainWindow, {
        title: 'Export DOCX',
        defaultPath: `${options.title}.docx`,
        filters: [{ name: 'DOCX Files', extensions: ['docx'] }],
      });

      if (result.canceled) {
        return { success: false, error: 'User canceled' };
      }

      // write docs to file
      const buffer = Buffer.from(options.document, 'base64');
      await fs.writeFile(result.filePath, buffer);

      return { success: true };
    } catch (error) {
      log.error('DOCX generation error:', error);
      return {
        success: false,
        error: error instanceof Error ? error.message : 'Unknown error',
      };
    }
  },
);

/**
 * [macOS, Windows]
 * Generate PDF from HTML content
 */
ipcMain.handle(
  'pdf:generate',
  async (_, options: { title: string; htmlContent: string }) => {
    try {
      if (!mainWindow) {
        return { success: false, error: 'Main window not found' };
      }

      // Create a hidden BrowserWindow for PDF generation
      const pdfWindow = new BrowserWindow({
        width: 800,
        height: 600,
        show: false,
        webPreferences: {
          nodeIntegration: false,
          contextIsolation: true,
        },
      });

      // Load the HTML content
      await pdfWindow.webContents.loadURL(
        `data:text/html;charset=utf-8,${encodeURIComponent(options.htmlContent)}`,
      );

      // Show save dialog
      const result = await dialog.showSaveDialog(mainWindow, {
        title: 'Export PDF',
        defaultPath: `${options.title}.pdf`,
        filters: [{ name: 'PDF Files', extensions: ['pdf'] }],
      });

      if (result.canceled) {
        pdfWindow.close();
        return { success: false, error: 'User canceled' };
      }

      // Generate PDF
      const pdfData = await pdfWindow.webContents.printToPDF({
        pageSize: 'A4',
        margins: {
          top: 1,
          right: 1,
          bottom: 1,
          left: 1,
        },
        printBackground: true,
      });

      // Write PDF to file
      await fs.writeFile(result.filePath, pdfData);

      // Close the hidden window
      pdfWindow.close();

      return { success: true };
    } catch (error) {
      log.error('PDF generation error:', error);
      return {
        success: false,
        error: error instanceof Error ? error.message : 'Unknown error',
      };
    }
  },
);

/**
 * [macOS, Windows]
 * Update
 */
/**
 * [macOS]
 * Installs the staged build while the app is terminating, so quitting and
 * reopening Tiro lands on the new version without the user ever clicking the
 * update toast/badge — the behaviour Windows already gets for free (Squirrel
 * unpacks into `app-<version>` at download time and the stub exe runs the
 * newest folder). Squirrel.Mac instead needs ShipIt, which only runs via
 * quitAndInstall(), so before this a mac user who never clicked just
 * re-downloaded the same build every launch.
 *
 * quitAndInstall() always relaunches (Electron exposes no `relaunch: false`),
 * which is why this is only safe on the quit path together with the
 * `quit_after_install` marker the relaunched process exits on (see whenReady).
 *
 * Returns true when Squirrel took over termination, false when the caller must
 * exit the app itself.
 */
function installStagedUpdateOnQuit(): boolean {
  const result = runInstallStagedUpdateOnQuit({
    isMac,
    installStarted: updateInstallStarted,
    readyVersion: getReadyUpdate()?.newVersion ?? null,
    store,
    autoUpdater,
    now: () => Date.now(),
    markInstallStarted: () => {
      updateInstallStarted = true;
    },
    markInstallHandedOff: () => {
      installHandedOff = true;
    },
    markInstallAborted: () => {
      updateInstallStarted = false;
      installHandedOff = false;
    },
    scheduleForceExit: (delayMs) => {
      setTimeout(() => {
        log.warn('quit: still alive after quitAndInstall — exiting');
        app.exit(0);
      }, delayMs);
    },
    onInstallFailed: ({ error, attemptedVersion }) => {
      forwardLogToDatadog('error', 'update-quit-and-install-failed', {
        error_message: error instanceof Error ? error.message : String(error),
        current_version: app.getVersion(),
        attempted_version: attemptedVersion,
      });
    },
    log,
  });

  return squirrelOwnsTermination(result);
}

/**
 * Applies the staged update and restarts. Shared by the `update` IPC handler
 * (renderer "Update now" toast), the macOS app-menu flow, and the Windows
 * app-menu / "Check for Updates" dialog so they all go through identical
 * bookkeeping. quitAndInstall installs the newest staged build.
 */
function applyPendingUpdateAndRestart(): void {
  if (updateInstallStarted) {
    log.info('update: install already started; ignoring duplicate request');
    return;
  }

  // The app is already going down and its cleanup installs the same build at
  // the end — scheduling a restart-style install on top of that shutdown would
  // fight it, and would bring the app back up after the user asked to quit.
  if (gracefulShutdownInProgress) {
    log.info('update: shutdown in progress; the quit path installs this build');
    return;
  }

  const updateToApply = getReadyUpdate();
  if (!updateToApply) {
    log.info('update: no in-process staged update to apply');
    return;
  }

  log.info('update: quitAndInstall');
  const installingVersion = updateToApply.newVersion;
  // PLT-5221: do NOT clear pendingUpdate / store('pending_update') before
  // quitAndInstall succeeds. If the install fails or never relaunches (observed
  // on macOS when the native staged build was lost), clearing first permanently
  // drops the staged-update record — the user can't retry and the
  // window-all-closed quit-to-apply path stops firing. The record is cleared
  // only after a confirmed successful boot (see attempted_install_version
  // handling in app.whenReady).
  if (installingVersion) {
    store.set('attempted_install_version', installingVersion);
  }
  // Mark as quitting so hide-on-close doesn't intercept window close
  isQuitting = true;
  updateInstallStarted = true;

  // Both flags are set before Squirrel is asked to install, and only a
  // synchronous throw undoes them. If quitAndInstall() instead returns without
  // ever terminating us (or fails asynchronously), the app would stay latched:
  // no retry (updateInstallStarted), and window-all-closed silently ignored
  // (isQuitting). Release the latch so the app behaves normally again — on a
  // successful install the process is long gone before either fires.
  //
  // The timer AND the error listener are torn down together with the latch:
  // both are per-attempt, the flags they touch are process-global, so a
  // straggler from attempt N must never unlatch attempt N+1.
  let forceUnlatchTimer: NodeJS.Timeout | null = null;
  const unlatchInstall = (reason: string) => {
    if (forceUnlatchTimer) {
      clearTimeout(forceUnlatchTimer);
      forceUnlatchTimer = null;
    }
    // An error can arrive inside the delay before the install call. Leaving that
    // timer armed would fire an install this attempt already gave up on, and a
    // retry would then schedule a second one on top of it.
    if (scheduledInstallTimer) {
      clearTimeout(scheduledInstallTimer);
      scheduledInstallTimer = null;
    }
    autoUpdater.removeListener('error', onInstallError);
    if (!updateInstallStarted) return;
    log.warn(`update: install did not take effect (${reason}); unlatching`);
    isQuitting = false;
    installHandedOff = false;
    updateInstallStarted = false;
  };
  function onInstallError(error: unknown) {
    unlatchInstall(error instanceof Error ? error.message : String(error));
  }
  autoUpdater.once('error', onInstallError);

  scheduledInstallTimer = setTimeout(() => {
    scheduledInstallTimer = null;
    try {
      // Destroy overlay window
      overlayWindowService.destroy();
      installHandedOff = true;
      autoUpdater.quitAndInstall();
      forceUnlatchTimer = setTimeout(
        () => unlatchInstall('still running'),
        10 * SECOND,
      );
    } catch (error) {
      // quitAndInstall throws when no update was downloaded in THIS process
      // (Squirrel keeps that state in-memory only). Thrown inside a timer it
      // would otherwise be an uncaught exception that kills the app. Keep the
      // pending_update record (the normal check/download loop re-establishes
      // it) and undo the quitting flag so window close goes back to
      // hide-to-tray instead of quitting the app.
      unlatchInstall('quitAndInstall threw');
      if (isNoUpdateAvailableError(error)) {
        log.info('update: no staged update available; waiting for re-download');
        return;
      }
      log.error('update: quitAndInstall failed', error);
      forwardLogToDatadog('error', 'update-quit-and-install-failed', {
        error_message: error instanceof Error ? error.message : String(error),
        current_version: app.getVersion(),
        attempted_version: installingVersion ?? '',
      });
    }
  }, 3 * SECOND);
}

ipcMain.on('update', () => {
  applyPendingUpdateAndRestart();
});

/**
 * [macOS, Windows]
 * Get update info
 */
ipcMain.handle('get-update-info', () => {
  const currentVersion = app.getVersion();
  const persistedUpdate = store.get('pending_update');

  const { readyUpdate, shouldClearPersistedUpdate } = decideUpdateReadiness({
    currentVersion,
    inProcessUpdate: pendingUpdate,
    persistedVersion: persistedUpdate?.newVersion ?? null,
  });

  if (shouldClearPersistedUpdate) {
    log.info('get-update-info: clearing stale pending_update', {
      pendingUpdateVersion: persistedUpdate?.newVersion,
      currentVersion,
    });
    store.set('pending_update', null);
  }

  return readyUpdate;
});

/** How long to wait for the update feed before giving up. */
const FEED_FETCH_TIMEOUT_MS = 10 * SECOND;

/**
 * Reads the update feed live (cache-busted, no-store) and returns the latest
 * available version, or null on any failure. Authoritative source of "what is
 * the latest version" — more reliable than the auto-updater's events. Bounded
 * by a timeout so a hung request surfaces an error instead of hanging.
 */
const fetchLatestFeedVersion = async (): Promise<string | null> => {
  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), FEED_FETCH_TIMEOUT_MS);
  try {
    if (process.platform === 'darwin') {
      const response = await fetch(`${updateFeedUrl}?_=${Date.now()}`, {
        cache: 'no-store',
        signal: controller.signal,
      });
      if (!response.ok) {
        log.error('check-for-updates: feed responded with', response.status);
        return null;
      }
      return parseCurrentReleaseVersion(await response.json());
    }

    // Windows (Squirrel): the RELEASES manifest lives under the feed directory.
    const response = await fetch(`${updateFeedUrl}/RELEASES?_=${Date.now()}`, {
      cache: 'no-store',
      signal: controller.signal,
    });
    if (!response.ok) {
      log.error('check-for-updates: RELEASES responded with', response.status);
      return null;
    }
    return parseLatestWindowsReleaseVersion(await response.text());
  } catch (error) {
    log.error('check-for-updates: failed to read update feed', error);
    return null;
  } finally {
    clearTimeout(timer);
  }
};

/** Shows the "ready to install" prompt; installs only on explicit confirm. */
const promptInstallUpdate = async (version: string): Promise<void> => {
  const installIndex = 0;
  const { response } = await dialog.showMessageBox({
    type: 'info',
    title: t('titlebar.menu.checkForUpdates'),
    message: t('titlebar.menu.update.available.message', { version }),
    detail: t('titlebar.menu.update.available.detail'),
    buttons: [
      t('titlebar.menu.update.available.updateNow'),
      t('titlebar.menu.update.available.later'),
    ],
    defaultId: installIndex,
    cancelId: 1,
  });
  if (response === installIndex) {
    applyPendingUpdateAndRestart();
  }
};

/**
 * [macOS, Windows]
 * Manual "Check for Updates" (Windows app-menu item). Shows a native message box
 * (like Slack / Notion / Figma) so feedback is reliable regardless of which
 * renderer screen is visible. Reads the feed directly so it never reports a
 * false "up to date"; installing only happens when the user explicitly confirms.
 */
const runManualUpdateCheck = async (): Promise<void> => {
  const currentVersion = app.getVersion();
  const staged = getReadyUpdate();
  const latestVersion = await fetchLatestFeedVersion();

  const decision = decideUpdateAction({
    currentVersion,
    stagedVersion: staged?.newVersion ?? null,
    latestVersion,
  });

  switch (decision.kind) {
    case 'install-staged':
      await promptInstallUpdate(decision.version);
      return;
    case 'up-to-date':
      await dialog.showMessageBox({
        type: 'info',
        title: t('titlebar.menu.checkForUpdates'),
        message: t('titlebar.menu.update.upToDate.message'),
        detail: t('titlebar.menu.update.upToDate.detail', {
          version: currentVersion,
        }),
        buttons: [t('titlebar.menu.update.upToDate.confirm')],
        defaultId: 0,
      });
      return;
    case 'error':
      await dialog.showMessageBox({
        type: 'error',
        title: t('titlebar.menu.checkForUpdates'),
        message: t('titlebar.menu.update.error.message'),
        detail: t('titlebar.menu.update.error.detail'),
        buttons: [t('titlebar.menu.update.error.confirm')],
        defaultId: 0,
      });
      return;
    case 'download':
      // Start the background download; the existing `update-downloaded` handler
      // notifies the renderer (major: toast + badge, minor: badge) when it's ready to
      // install; a patch stays silent and applies on the next restart.
      try {
        requestUpdateCheck();
      } catch (error) {
        log.error('check-for-updates: checkForUpdates threw', error);
      }
      await dialog.showMessageBox({
        type: 'info',
        title: t('titlebar.menu.checkForUpdates'),
        message: t('titlebar.menu.update.downloading.message'),
        detail: t('titlebar.menu.update.downloading.detail', {
          version: decision.version,
        }),
        buttons: [t('titlebar.menu.update.downloading.confirm')],
        defaultId: 0,
      });
      return;
  }
};

/**
 * [Windows]
 * Pops up the native app menu (File / Edit / View / Help) at the icon, mimicking
 * Notion/Slack. Built fresh each time so the update item morphs to
 * "Restart to Apply Update" once a build is staged. Renderer-side actions are
 * delegated back via the `app-menu:action` event.
 */
ipcMain.handle(
  'app-menu:popup',
  (_event, payload?: { x: number; y: number; isAuthenticated?: boolean }) => {
    const window = BrowserWindow.getFocusedWindow() ?? mainWindow;
    if (!window) return;

    // Only a build downloaded in this process can be installed by Squirrel.
    const isUpdateReady = getReadyUpdate() !== null;

    const template = buildWindowsAppMenuTemplate({
      isAuthenticated: payload?.isAuthenticated ?? true,
      isUpdateReady,
      onCheckForUpdates: () => void runManualUpdateCheck(),
      onRestartToApply: applyPendingUpdateAndRestart,
      onQuit: () => app.quit(),
      onOpenChangelog: () => {
        const locale = getCurrentLocale();
        shell.openExternal(`https://docs.tiro.ooo/${locale}/updates`);
      },
      onAbout: () => app.showAboutPanel(),
      onRendererAction: (action: WindowsAppMenuAction) =>
        sendWebContents('app-menu:action', action),
      includeDevTools: process.env.NODE_ENV === 'development',
    });

    const menu = Menu.buildFromTemplate(template);
    menu.popup({
      window,
      x: payload ? Math.round(payload.x) : undefined,
      y: payload ? Math.round(payload.y) : undefined,
    });
  },
);

/**
 * [Windows]
 * Quit the app completely (used by the Windows app-menu "Quit" item).
 */
ipcMain.handle('app:quit', () => {
  app.quit();
});

/**
 * [macOS, Windows]
 * Check if the app has microphone permission
 */
ipcMain.handle('has-microphone-permission', () => {
  const granted =
    systemPreferences.getMediaAccessStatus('microphone') === 'granted';

  return granted;
});

/**
 * [macOS, Windows]
 * Grant microphone permission
 */
ipcMain.handle('grant-microphone-permission', async () => {
  if (isMac) {
    // Loading @plato-corp/microphone is only an optional per-app mic attribution
    // hint — it must NOT block the actual OS permission request below. If the
    // native module fails to load (e.g. missing from the package), a throw here
    // would skip askForMediaAccess entirely, leaving mic permission ungranted and
    // onboarding stuck with a disabled "계속" button. Isolate it in try/catch.
    let microphone:
      | { startTiroSession?: () => void; stopTiroSession?: () => void }
      | undefined;
    try {
      // eslint-disable-next-line @typescript-eslint/no-require-imports
      microphone = require('@plato-corp/microphone');

      // Set Tiro mic state before asking permission (macOS actually accesses mic)
      if (typeof microphone?.startTiroSession === 'function') {
        microphone.startTiroSession();
      }
    } catch (error) {
      log.error(
        'Failed to load @plato-corp/microphone before permission request:',
        error,
      );
    }

    const granted = await systemPreferences.askForMediaAccess('microphone');

    // Reset state after permission check (with delay for permission dialog)
    setTimeout(() => {
      try {
        if (typeof microphone?.stopTiroSession === 'function') {
          microphone.stopTiroSession();
        }
      } catch (error) {
        log.error('Failed to stop Tiro microphone session:', error);
      }
    }, 3000);

    if (!granted) {
      shell.openExternal(
        'x-apple.systempreferences:com.apple.preference.security?Privacy_Microphone',
      );
    }

    return granted;
  }

  if (isWindows) {
    const granted =
      systemPreferences.getMediaAccessStatus('microphone') === 'granted';

    if (!granted) {
      shell.openExternal('ms-settings:privacy-microphone');
    }

    return granted;
  }

  return false;
});

/**
 * The tap-permission path probes the System Audio Recording TCC bucket — the
 * permission the sidecar capture actually uses — instead of the broader
 * Screen Recording one, so granting no longer forces macOS's "quit and
 * reopen" restart. Gate conditions (macOS version, native-capture flag) live
 * in supportsAudioTapPermission; anything outside them (older macOS,
 * legacy-capture builds, probe failure) keeps the original screen-recording
 * flow byte-for-byte.
 */
const getTapGateInput = () => ({
  isMac,
  systemVersion: process.getSystemVersion(),
});

const usesAudioTapPermission = () => {
  const input = getTapGateInput();
  const supported = supportsAudioTapPermission(input);
  if (!supported) {
    // Field signal (once per reason): version/flag fallbacks matter as much
    // as probe failures when diagnosing why a mac is on the legacy flow.
    logTapGateFallbackOnce(input);
  }
  return supported;
};

const openSystemAudioSettingsPane = () => {
  // Unified "Screen & System Audio Recording" pane — hosts the System Audio
  // Recording toggle too (macOS 14.4+; earlier 14.x fall back to the screen
  // recording list, still the right neighborhood).
  shell.openExternal(
    'x-apple.systempreferences:com.apple.preference.security?Privacy_ScreenCapture',
  );
};

/**
 * [macOS, Windows]
 * Check if the app has system audio capture permission
 */
ipcMain.handle('has-system-audio-capture-permission', async () => {
  if (isMac && usesAudioTapPermission()) {
    const tapStatus = await checkTapPermission();
    if (tapStatus !== 'unsupported') {
      // OR-grandfather: Screen Recording is a superset that already covers
      // tap capture — users who granted it must not be re-onboarded.
      return resolveHasSystemAudioPermission(
        tapStatus,
        systemPreferences.getMediaAccessStatus('screen') === 'granted',
      );
    }
    // probe unsupported (logged inside) — fall through to the legacy path
  }

  if (isMac) {
    const granted =
      systemPreferences.getMediaAccessStatus('screen') === 'granted';

    if (granted) {
      session.defaultSession.setDisplayMediaRequestHandler((_, callback) => {
        desktopCapturer.getSources({ types: ['screen'] }).then((sources) => {
          callback({ video: sources[0], audio: 'loopback' });
        });
      });
    }

    return granted;
  }

  if (isWindows) {
    const granted =
      systemPreferences.getMediaAccessStatus('screen') === 'granted';

    if (granted) {
      session.defaultSession.setDisplayMediaRequestHandler((_, callback) => {
        desktopCapturer.getSources({ types: ['screen'] }).then((sources) => {
          callback({ video: sources[0], audio: 'loopback' });
        });
      });
    }

    return granted;
  }

  return false;
});

/**
 * [macOS, Windows]
 * Grant system audio capture permission
 */
ipcMain.handle('grant-system-audio-capture-permission', async () => {
  if (isMac && usesAudioTapPermission()) {
    // Flow (unit-tested in audioTapPermission): granted → true / denied →
    // Settings pane / undetermined → prompt via real tap attempt, verdict by
    // a FRESH follow-up check (a plain check could coalesce onto a stale
    // pre-answer probe from the 1.5s poll). null = probe unsupported.
    const granted = await grantSystemAudioPermissionViaTap({
      check: checkTapPermission,
      freshCheck: freshCheckTapPermission,
      request: requestTapPermission,
      openSystemAudioSettings: openSystemAudioSettingsPane,
    });
    if (granted !== null) {
      return granted;
    }
    // probe unsupported (logged inside) — use the legacy path below.
  }

  if (isMac) {
    try {
      await desktopCapturer.getSources({ types: ['screen'] });

      session.defaultSession.setDisplayMediaRequestHandler((_, callback) => {
        desktopCapturer.getSources({ types: ['screen'] }).then((sources) => {
          callback({ video: sources[0], audio: 'loopback' });
        });
      });

      return true;
    } catch {
      shell.openExternal(
        'x-apple.systempreferences:com.apple.preference.security?Privacy_ScreenCapture',
      );

      return false;
    }
  }

  if (isWindows) {
    try {
      await desktopCapturer.getSources({ types: ['screen'] });

      session.defaultSession.setDisplayMediaRequestHandler((_, callback) => {
        desktopCapturer.getSources({ types: ['screen'] }).then((sources) => {
          callback({ video: sources[0], audio: 'loopback' });
        });
      });

      return true;
    } catch {
      return false;
    }
  }

  return false;
});

// ---------------------------------------------------------------------------
// Native Audio Capture (Rust binary)
// ---------------------------------------------------------------------------

const audioCaptureProcess = new AudioCaptureProcess();

audioCaptureProcess.on('audio-level', (rms, peak) => {
  // Direct push to the overlay window — skipping the renderer hop. When
  // the main window is hidden Chromium throttles renderer event loops, so
  // a `binary → main → renderer → IPC back → overlay` round-trip can build
  // a multi-second backlog over time. Going `binary → main → overlay`
  // keeps the waveform responsive regardless of main-window state.
  //
  // The `rms` field is already the sidecar's perceptual [0,1] level, so the
  // overlay just needs a defensive clamp (shared clampLevel) — no re-mapping.
  // The renderer still receives the RAW field and clamps for its own stores;
  // the zero-audio watchdog (below) keeps the raw value untouched.
  overlayWindowService.updateAudioLevel(clampLevel(rms));
  sendWebContents('native-audio:level', { rms, peak });
});
audioCaptureProcess.on('process-diagnostic', (diagnostic) => {
  const { level, message, context } =
    audioProcessDiagnosticTelemetry(diagnostic);
  forwardLogToDatadog(level, message, context);
});
audioCaptureProcess.on('sigterm-sender', (diagnostics) => {
  forwardLogToDatadog(
    'warn',
    '[AudioCapture] SIGTERM sender',
    sigtermSenderTelemetryContext(diagnostics),
  );
});
audioCaptureProcess.on('start-diagnostic', (diagnostic) => {
  emitNativeAudioDiagnostic(() =>
    forwardLogToDatadog(
      diagnostic.outcome === 'timeout' ? 'warn' : 'info',
      '[AudioCapture] native start stage',
      nativeStartTelemetryContext(
        diagnostic,
        diagnostic.stage === 'command_sent'
          ? nativeAudioDiagnostics.snapshot()
          : {},
      ),
    ),
  );
});
audioCaptureProcess.on('error', (code, message, fatal) => {
  if (audioCaptureProcess.isChangingMic()) return;
  forwardLogToDatadog(fatal ? 'error' : 'warn', '[AudioCapture] native error', {
    event: 'native_audio_capture_error',
    code,
    fatal,
    nativeErrorMessage: message,
    noteGuid: currentNativeRecordingNoteGuid ?? '',
  });
  if (!fatal) {
    sendWebContents('native-audio:error', { code, message, fatal });
  }
});
audioCaptureProcess.on('permission-required', (source) => {
  if (audioCaptureProcess.isChangingMic()) return;
  forwardLogToDatadog('warn', '[AudioCapture] native permission required', {
    event: 'native_audio_permission_required',
    source,
    noteId: currentNativeRecordingNoteId?.toString() ?? 'null',
  });
  sendWebContents('native-audio:permission-required', { source });
});
audioCaptureProcess.on('sources-state', (sources, known) => {
  if (currentNativeRecordingNoteId === null) return;
  nativeTelemetry.setActiveSources(sources, known);
  forwardLogToDatadog('info', '[AudioCapture] native sources state', {
    event: 'native_audio_sources_state',
    noteId: String(currentNativeRecordingNoteId),
    activeSources: known ? sources.join(',') : 'unknown',
    actualSourcesKnown: known,
  });
});
audioCaptureProcess.on('device-lost', (source) => {
  forwardLogToDatadog('warn', '[AudioCapture] device-lost', {
    event: 'native_audio_device_lost',
    source,
    noteId: currentNativeRecordingNoteId ?? -1,
  });
  sendWebContents('native-audio:device-lost', { source });
});
audioCaptureProcess.on('mic-device-fallback-applied', () => {
  sendWebContents('native-audio:mic-device-fallback-applied');
});
audioCaptureProcess.on('capture-interrupted', (failure) => {
  sendWebContents('native-audio:error', {
    code: failure.code,
    message: failure.message,
    fatal: true,
  });
  if (!currentRecording || currentRecording.isPaused) return;
  void dispatchTrayRecordingAction(
    currentRecording.mode === 'live' ? 'live:pause' : 'offline:pause',
    'NATIVE_AUDIO_CAPTURE_ERROR',
  );
});
let currentNativeRecordingNoteGuid: string | null = null;

const nativeAudioDiagnostics = createNativeAudioDiagnostics();

type NativeRecordingStartOptions = CaptureConfig & {
  diagnostics?: NativeAudioRequestDiagnostics;
  noteGuid?: string;
  noteId?: number;
};

type SystemOnlyFallbackChoice = 'settings' | 'system-only' | 'cancel';
type SystemOnlyFallbackCopy = {
  title: string;
  description: string;
  settings: string;
  systemOnly: string;
  cancel: string;
};

const validateSystemOnlyFallbackCopy = (
  input: unknown,
): SystemOnlyFallbackCopy => {
  const limits: Record<keyof SystemOnlyFallbackCopy, number> = {
    title: 120,
    description: 1000,
    settings: 80,
    systemOnly: 80,
    cancel: 80,
  };
  if (!input || typeof input !== 'object') {
    throw new TypeError('Invalid system-only fallback copy');
  }
  for (const [key, limit] of Object.entries(limits)) {
    const value = (input as Record<string, unknown>)[key];
    if (
      typeof value !== 'string' ||
      value.length === 0 ||
      value.length > limit
    ) {
      throw new TypeError(`Invalid system-only fallback copy: ${key}`);
    }
  }
  return input as SystemOnlyFallbackCopy;
};

const nativeRecordingSessionLifecycle = createNativeRecordingSessionLifecycle({
  isRecordingSupported: recordingSupportGate.isSupported,
  getCaptureState: () => audioCaptureProcess.getState(),
  isStopPending: () => audioCaptureProcess.isStopPending(),
  startCapture: ({
    diagnostics: _diagnostics,
    ...options
  }: NativeRecordingStartOptions) => audioCaptureProcess.start(options),
  stopCapture: () => audioCaptureProcess.stop(),
  onStartRequested: (options) => {
    nativeAudioDiagnostics.accept(
      options.diagnostics ?? { reason: 'unannotated' },
    );
    const requestedNoteId = options.noteId ?? null;
    if (options.noteGuid) {
      currentNativeRecordingNoteGuid = options.noteGuid;
    }
    currentNativeRecordingNoteId = requestedNoteId;
    if (options.noteId !== undefined && options.noteGuid) {
      stompStreamingService.attachNoteGuid(options.noteId, options.noteGuid);
    }
    forwardLogToDatadog('info', '[AudioCapture] native-audio:start requested', {
      event: 'native_audio_start',
      sources: options.sources.join(','),
      isDefaultMicDevice: !options.micDevice,
      noteId: options.noteId ?? -1,
      hasNoteGuid: !!options.noteGuid,
    });
    if (options.noteId !== undefined) {
      forwardLogToDatadog('info', '[StreamRouting] native active note set', {
        event: 'stream_routing_native_set',
        noteId: options.noteId,
      });
      nativeTelemetry.start(options.noteId, options.sources);
    }
  },
  onStartCompleted: (options) => {
    if (options.diagnostics)
      nativeAudioDiagnostics.complete(options.diagnostics);
    if (options.noteId !== undefined) {
      armNativeTelemetryTimers();
    }
  },
  onDuplicateStart: (options) => {
    forwardLogToDatadog(
      'info',
      '[AudioCapture] duplicate native start ignored',
      {
        event: 'native_audio_duplicate_start_ignored',
        noteId: options.noteId?.toString() ?? 'null',
      },
    );
  },
  onSessionCleared: () => {
    nativeAudioDiagnostics.clear();
    clearNativeTelemetryTimers();
    nativeTelemetry.stop('end');
    currentNativeRecordingNoteGuid = null;
    if (currentNativeRecordingNoteId !== null) {
      forwardLogToDatadog(
        'info',
        '[StreamRouting] native active note cleared',
        {
          event: 'stream_routing_native_cleared',
          noteId: currentNativeRecordingNoteId,
        },
      );
    }
    currentNativeRecordingNoteId = null;
  },
});

const getNativeAudioRequestDiagnostics = (
  event: Electron.IpcMainInvokeEvent | undefined,
  rawDiagnostics: unknown,
  startOptions?: { noteGuid?: unknown },
): NativeAudioRequestDiagnostics => {
  const diagnostics = sanitizeNativeAudioDiagnostics(
    rawDiagnostics,
    startOptions,
  );
  emitNativeAudioDiagnostic(() => {
    if (!event) return;
    diagnostics.senderWebContentsId = event.sender.id;
    if (event.senderFrame) {
      diagnostics.senderProcessId = event.senderFrame.processId;
      diagnostics.senderFrameRoutingId = event.senderFrame.routingId;
    }
  });
  return diagnostics;
};

const logNativeAudioRequest = (
  action: 'start' | 'stop',
  diagnostics: NativeAudioRequestDiagnostics,
): void =>
  emitNativeAudioDiagnostic(() => {
    forwardLogToDatadog(
      'info',
      `[AudioCapture] native ${action} request received`,
      {
        event: `native_audio_${action}_received`,
        ...diagnostics,
        ...nativeAudioDiagnostics.snapshot(),
        captureState: audioCaptureProcess.getState(),
        stopPending: audioCaptureProcess.isStopPending(),
      },
    );
  });

const cleanupNativeRecordingSession = (): Promise<void> =>
  nativeRecordingSessionLifecycle.stop();

ipcMain.handle(
  'native-audio:start',
  async (
    event,
    options: NativeRecordingStartOptions,
    rawDiagnostics: unknown,
  ) => {
    const diagnostics = getNativeAudioRequestDiagnostics(
      event,
      rawDiagnostics,
      options,
    );
    logNativeAudioRequest('start', diagnostics);
    return nativeRecordingSessionLifecycle.start({ ...options, diagnostics });
  },
);

ipcMain.handle(
  'native-audio:confirm-system-only-fallback',
  async (_, rawCopy: unknown): Promise<SystemOnlyFallbackChoice> => {
    const copy = validateSystemOnlyFallbackCopy(rawCopy);
    const options = {
      type: 'warning' as const,
      title: copy.title,
      message: copy.title,
      detail: copy.description,
      buttons: [copy.settings, copy.systemOnly, copy.cancel],
      defaultId: 0,
      cancelId: 2,
      noLink: true,
    };
    const focusedWindow =
      BrowserWindow.getFocusedWindow() ??
      (mainWindow?.isVisible() ? mainWindow : null);
    const { response } = focusedWindow
      ? await dialog.showMessageBox(focusedWindow, options)
      : await dialog.showMessageBox(options);
    const choice: SystemOnlyFallbackChoice =
      response === 0 ? 'settings' : response === 1 ? 'system-only' : 'cancel';

    if (choice === 'settings') {
      await shell.openExternal(
        isWindows
          ? 'ms-settings:sound-defaultinputproperties'
          : 'x-apple.systempreferences:com.apple.Sound-Settings.extension',
      );
    }
    return choice;
  },
);

ipcMain.handle('native-audio:change-mic', async (_, micDevice?: string) => {
  forwardLogToDatadog('info', '[AudioCapture] native mic change requested', {
    event: 'native_audio_mic_change_requested',
    requestedSelection: micDevice ?? '(OS default)',
    noteId: currentNativeRecordingNoteId ?? -1,
  });
  const result = await audioCaptureProcess.changeMicDevice(micDevice);
  forwardLogToDatadog(
    result.status === 'applied' || result.status === 'deferred'
      ? 'info'
      : 'warn',
    '[AudioCapture] native mic change completed',
    {
      event: 'native_audio_mic_change_completed',
      requestedSelection: micDevice ?? '(OS default)',
      status: result.status,
      micActive: audioCaptureProcess.getActiveSources().sources.includes('mic'),
      noteId: currentNativeRecordingNoteId ?? -1,
    },
  );
  return result;
});

ipcMain.handle('native-audio:stop', async (event, rawDiagnostics: unknown) => {
  const diagnostics = getNativeAudioRequestDiagnostics(event, rawDiagnostics);
  logNativeAudioRequest('stop', diagnostics);
  forwardLogToDatadog('info', '[AudioCapture] native-audio:stop requested', {
    event: 'native_audio_stop',
    noteId: currentNativeRecordingNoteId ?? -1,
  });
  await cleanupNativeRecordingSession();
});

ipcMain.handle('native-audio:pause', async () => {
  forwardLogToDatadog('info', '[AudioCapture] native-audio:pause requested', {
    event: 'native_audio_pause',
    noteId: currentNativeRecordingNoteId ?? -1,
  });
  await audioCaptureProcess.pause();
  // Native telemetry is note-bound. Offline pause has no noteId, so do not
  // emit live recording telemetry for it.
  if (currentNativeRecordingNoteId !== null) {
    clearNativeTelemetryTimers();
    nativeTelemetry.pause();
  }
});

ipcMain.handle('native-audio:recover-system', async () => {
  // Renderer detected a default-output device switch (e.g. earphones plugged
  // in mid-session). Re-bind the WASAPI loopback to the new default output so
  // system sound capture keeps working. No-op if not recording system audio.
  forwardLogToDatadog(
    'warn',
    '[AudioCapture] native-audio:recover-system requested',
    {
      event: 'native_audio_recover_system',
      reason: 'default_output_changed',
      noteId: currentNativeRecordingNoteId ?? -1,
    },
  );
  audioCaptureProcess.recoverSystemAudio();
});

ipcMain.handle(
  'native-audio:set-gain',
  async (_, source: 'mic' | 'system', gain: number) => {
    audioCaptureProcess.setGain(source, gain);
  },
);

// Shutdown on app quit
app.on('before-quit', () => {
  audioCaptureProcess.shutdown();
  stompStreamingService.disconnectAll();
  // A permission-request probe may still be blocked on the OS consent dialog.
  killPendingTapPermissionRequest();
});

// ---------------------------------------------------------------------------
// STOMP Streaming Service (live transcription)
// ---------------------------------------------------------------------------

const STOMP_NETWORK_SENTRY_SAMPLE_RATE = 0.01;

const stompStreamingService = new StompStreamingService({
  wsBaseUrl: import.meta.env.VITE_WS_BASE_URL,
  getToken: () => getAuthToken(store) || undefined,
  sendToRenderer: (channel, data) => sendWebContents(channel, data),
  // Honour the OS/PAC proxy and OS certificate store so the main-process `ws`
  // socket connects the way the renderer's browser WebSocket used to.
  resolveProxy: (url) => session.defaultSession.resolveProxy(url),
  getCaCertificates: () => getSystemCaCertificates(),
  observeRecovery: (event) => {
    const warning =
      event.stage.endsWith('failed') ||
      event.stage === 'overflow' ||
      (event.stage === 'disconnected' && event.pendingBytes > 0);
    forwardLogToDatadog(
      warning ? 'warn' : 'info',
      '[StompStreaming] recovery',
      {
        ...event,
        event: 'desktop_stomp_recovery',
      },
      { buffer: true },
    );
    drainPendingTelemetry();
  },
  observeNetworkError: ({ kind, source, code }) => {
    // One structured event per occurrence is the lossless source for the
    // Datadog log-based counter `desktop.stomp.network_error`. Keep the
    // dimensions deliberately low-cardinality: never attach noteId/userId.
    forwardLogToDatadog('info', 'desktop-stomp-network-error', {
      event: 'desktop_stomp_network_error',
      metric: 'desktop.stomp.network_error',
      metricValue: 1,
      kind,
      source,
      code: code ?? 'none',
    });
    return Math.random() < STOMP_NETWORK_SENTRY_SAMPLE_RATE;
  },
  reportError: (error, context) =>
    Sentry.captureException(error, {
      tags: {
        feature: 'stomp-streaming',
        ...(typeof context?.networkErrorKind === 'string'
          ? { network_error_kind: context.networkErrorKind }
          : {}),
      },
      extra: {
        ...context,
        ...(typeof context?.networkErrorKind === 'string'
          ? { sentrySampleRate: STOMP_NETWORK_SENTRY_SAMPLE_RATE }
          : {}),
      },
    }),
});

// NoteId for the active native capture session, routing PCM frames to the
// right STOMP connection. Owned exclusively by the `native-audio:start/stop`
// lifecycle — a `stomp:connect` from a note viewer must never rebind frame
// routing (PLT-5191: viewer connect rerouted live frames to the viewed note).
let currentNativeRecordingNoteId: number | null = null;
let lastAudioLevel = 0;

const NATIVE_TELEMETRY_INTERVAL_MS = 30_000;
const NATIVE_ZERO_AUDIO_THRESHOLD_MS = 3_000;
/**
 * Drop unmeasured metrics instead of encoding them as a sentinel.
 *
 * Every one of these fields has domain [0, 1], so any out-of-band number
 * (-1 included) lands inside the firing range of the very threshold monitors
 * this telemetry exists to enable — `micInputFillRatioAvg < 0.5` would page on
 * "no data". An absent attribute is unambiguous in Datadog and is excluded
 * from a threshold query rather than matching it.
 */
const definedMetrics = (
  metrics: Record<string, number | null>,
): Record<string, number> =>
  Object.fromEntries(
    Object.entries(metrics).filter(
      (entry): entry is [string, number] => entry[1] !== null,
    ),
  );

const nativeTelemetry = createNativeStreamingTelemetry({
  onFlush: (flush) => {
    forwardLogToDatadog(
      flush.level,
      '[StreamRouting] live audio streaming telemetry',
      {
        event: 'live_audio_streaming_telemetry',
        capturePath: 'native',
        // Match the all-sources string convention for the shared `noteId`
        // facet (renderer/web/mobile emit string) so unified Datadog queries
        // and group-by don't break on string/number type mixing.
        noteId: String(flush.boundNoteId),
        reason: flush.reason,
        framesSentIn30sWindow: flush.framesSentIn30sWindow,
        bytesSentIn30sWindow: flush.bytesSentIn30sWindow,
        sessionElapsedMs: flush.sessionElapsedMs,
        windowElapsedMs: flush.windowElapsedMs,
        audioSamplesIn30sWindow: flush.audioSamplesIn30sWindow,
        micRequested: flush.micRequested,
        systemRequested: flush.systemRequested,
        micEnabled: flush.micEnabled,
        systemEnabled: flush.systemEnabled,
        actualSourcesKnown: flush.actualSourcesKnown,
        requestedSources: [
          flush.micRequested ? 'mic' : '',
          flush.systemRequested ? 'system' : '',
        ]
          .filter(Boolean)
          .join(','),
        activeSources: flush.actualSourcesKnown
          ? [flush.micEnabled ? 'mic' : '', flush.systemEnabled ? 'system' : '']
              .filter(Boolean)
              .join(',')
          : 'unknown',
        contentState: flush.contentState,
        micInputState: flush.micInputState,
        systemInputState: flush.systemInputState,
        ...definedMetrics({
          mixedLevelAvg: flush.mixedLevelAvg,
          mixedLevelMax: flush.mixedLevelMax,
          mixedLinearRmsAvg: flush.mixedLinearRmsAvg,
          mixedLinearRmsMax: flush.mixedLinearRmsMax,
          mixedLinearPeakMax: flush.mixedLinearPeakMax,
          micLinearRmsAvg: flush.micLinearRmsAvg,
          micLinearRmsMax: flush.micLinearRmsMax,
          micLinearPeakMax: flush.micLinearPeakMax,
          micInputFillRatioAvg: flush.micInputFillRatioAvg,
          micInputFillRatioMin: flush.micInputFillRatioMin,
          micInputStarvedRatio: flush.micInputStarvedRatio,
          systemLinearRmsAvg: flush.systemLinearRmsAvg,
          systemLinearRmsMax: flush.systemLinearRmsMax,
          systemLinearPeakMax: flush.systemLinearPeakMax,
          systemInputFillRatioAvg: flush.systemInputFillRatioAvg,
          systemInputFillRatioMin: flush.systemInputFillRatioMin,
          systemInputStarvedRatio: flush.systemInputStarvedRatio,
        }),
      },
    );
  },
});

audioCaptureProcess.on('audio-level', (rms, _peak, diagnostics) => {
  lastAudioLevel = rms;
  nativeTelemetry.recordAudioSample({
    mixedLevel: rms,
    ...diagnostics,
  });
});

let nativeIntervalTimer: NodeJS.Timeout | null = null;
let nativeZeroAudioTimer: NodeJS.Timeout | null = null;

// Fast first-signal for zero-audio: re-armed on every frame, so a healthy
// stream never trips it. A >3s gap (incl. a session that never produces a
// frame) emits ONE WARN per gap — it does not self-repeat, by design, to
// avoid log spam. Sustained silence is still fully visible via the 30s
// interval flushes (framesSentIn30sWindow=0); this is just the fast alert.
const armNativeZeroAudioTimer = (): void => {
  if (nativeZeroAudioTimer) clearTimeout(nativeZeroAudioTimer);
  nativeZeroAudioTimer = setTimeout(() => {
    forwardLogToDatadog('warn', '[StreamRouting] native zero-audio', {
      event: 'native_zero_audio',
      capturePath: 'native',
      noteId: currentNativeRecordingNoteId?.toString() ?? 'null',
      noFrameForMs: NATIVE_ZERO_AUDIO_THRESHOLD_MS,
    });
  }, NATIVE_ZERO_AUDIO_THRESHOLD_MS);
};

const armNativeTelemetryTimers = (): void => {
  if (nativeIntervalTimer) clearInterval(nativeIntervalTimer);
  nativeIntervalTimer = setInterval(() => {
    nativeTelemetry.flush('interval');
  }, NATIVE_TELEMETRY_INTERVAL_MS);
  armNativeZeroAudioTimer();
};

const clearNativeTelemetryTimers = (): void => {
  if (nativeIntervalTimer) {
    clearInterval(nativeIntervalTimer);
    nativeIntervalTimer = null;
  }
  if (nativeZeroAudioTimer) {
    clearTimeout(nativeZeroAudioTimer);
    nativeZeroAudioTimer = null;
  }
};

registerNativeAudioFrameRouting({
  source: audioCaptureProcess,
  getState: () => ({
    noteId: currentNativeRecordingNoteId,
    noteGuid: currentNativeRecordingNoteGuid,
    audioLevel: lastAudioLevel,
  }),
  sendStreamingFrame: (noteId, data, audioLevel) => {
    nativeTelemetry.recordSent(data.length);
    armNativeZeroAudioTimer();
    stompStreamingService.sendFrame(noteId, data, audioLevel);
  },
  appendRecordingFrame: (noteGuid, data) =>
    audioRecordingManager.appendAudioData(noteGuid, data),
});

ipcMain.handle(
  'stomp:connect',
  async (_, params: { noteId: number; platform: string }) => {
    if (
      currentNativeRecordingNoteId !== null &&
      currentNativeRecordingNoteId !== params.noteId
    ) {
      forwardLogToDatadog(
        'info',
        '[StreamRouting] viewer connect during native recording — routing kept',
        {
          event: 'stream_routing_viewer_connect_ignored',
          recordingNoteId: currentNativeRecordingNoteId,
          viewerNoteId: params.noteId,
          platform: params.platform,
        },
      );
    }
    await stompStreamingService.connect(params.noteId, params.platform);
  },
);

ipcMain.handle('stomp:disconnect', async (_, params: { noteId: number }) => {
  stompStreamingService.disconnect(params.noteId);
});

ipcMain.handle(
  'stomp:send-resume',
  async (
    _,
    params: { noteId: number; connectType: string; platform: string },
  ) => {
    stompStreamingService.sendResume(
      params.noteId,
      params.connectType,
      params.platform,
    );
  },
);

ipcMain.handle(
  'stomp:send-pause',
  async (_, params: { noteId: number; pauseReason: string }) => {
    stompStreamingService.sendPause(params.noteId, params.pauseReason);
  },
);

ipcMain.handle('stomp:send-end', async (_, params: { noteId: number }) => {
  stompStreamingService.sendEnd(params.noteId);
});

ipcMain.handle(
  'stomp:send-summary',
  async (_, params: { noteId: number; templateId: number; force: boolean }) => {
    stompStreamingService.sendSummary(
      params.noteId,
      params.templateId,
      params.force,
    );
  },
);

ipcMain.handle(
  'stomp:send-recording-file',
  async (_, params: { noteId: number; body: string }) => {
    stompStreamingService.sendRecordingFile(params.noteId, params.body);
  },
);

ipcMain.handle(
  'stomp:send-recording-file-uri',
  async (_, params: { noteId: number; body: string }) => {
    stompStreamingService.sendRecordingFileUri(params.noteId, params.body);
  },
);

ipcMain.handle('stomp:is-connected', async (_, params: { noteId: number }) => {
  return stompStreamingService.isConnected(params.noteId);
});

/**
 * Check if the URL is a background deep link
 * Background deep links should not focus the window
 */
function isBackgroundDeepLink(url: string): boolean {
  try {
    const urlObj = new URL(url);
    return urlObj.searchParams.get('background') === 'true';
  } catch {
    return false;
  }
}

/**
 * Hide the app to background (platform-specific)
 * - macOS: app.hide() hides all windows
 * - Windows: mainWindow.hide() hides the main window
 */
function hideToBackground() {
  // Guard against a not-yet-ready window being force-shown by its
  // 'ready-to-show' handler after we hide it (see createAndSetupMainWindow).
  suppressMainWindowInitialShow = true;
  if (process.platform === 'darwin') {
    app.hide();
  } else if (mainWindow && !mainWindow.isDestroyed()) {
    mainWindow.hide();
  }
}

/** 연동 OAuth 복귀 결과를 보관하고 renderer 에 claim 하라고 알린다. */
function emitWorkflowConnectResult(
  type: WorkflowConnectResult['type'],
  detail: WorkflowConnectResult['detail'],
  startedEpoch: number,
): void {
  retainWorkflowConnectResult({ type, detail }, startedEpoch);
  sendWebContents('integration:connect-result');
}

/**
 * Send IPC message to renderer process with safety checks
 * Handles window loading state and prevents race conditions
 *
 * @param eventName - IPC event name to send
 * @param data - Optional data payload
 */
// eslint-disable-next-line @typescript-eslint/no-explicit-any
function sendWebContents(eventName: string, data?: any) {
  // Phase 1: Initial null check
  if (!mainWindow || mainWindow.isDestroyed()) {
    log.debug(`sendWebContents: Window unavailable for event "${eventName}"`);
    return;
  }

  // Phase 2: If loading, schedule with safety checks
  if (mainWindow.webContents.isLoading()) {
    // Capture reference to current window
    const windowRef = mainWindow;

    setTimeout(() => {
      // Re-check window validity after delay
      if (!windowRef || windowRef.isDestroyed()) {
        log.debug(
          `sendWebContents: Window closed during delay for event "${eventName}"`,
        );
        return;
      }

      // Defensive: Also check webContents
      if (!windowRef.webContents || windowRef.webContents.isDestroyed()) {
        log.debug(
          `sendWebContents: WebContents destroyed for event "${eventName}"`,
        );
        return;
      }

      // Safe send with error handling
      try {
        windowRef.webContents.send(eventName, data);
      } catch (error) {
        log.error(
          `sendWebContents: Failed to send event "${eventName}"`,
          error,
        );
      }
    }, 2_000);
  } else {
    // Phase 3: Send immediately if not loading
    try {
      mainWindow.webContents.send(eventName, data);
    } catch (error) {
      log.error(`sendWebContents: Failed to send event "${eventName}"`, error);
    }
  }
}

function publishCredentialAttachResult(
  result: CredentialAttachTerminalResult,
): void {
  retainCredentialAttachResult(result);
  sendWebContents('credential-attach-complete');
}

type ForwardLogLevel = 'info' | 'warn' | 'error';

type PendingTelemetryLog = {
  level: ForwardLogLevel;
  message: string;
  context?: Record<string, string | number | boolean>;
};

// Bounded so a renderer that never comes back cannot grow this without limit;
// the newest entries win because they describe whatever just went wrong.
const PENDING_TELEMETRY_LOG_LIMIT = 50;
const pendingTelemetryLogs: PendingTelemetryLog[] = [];

let telemetryDocumentGate: ReturnType<
  typeof createTelemetryDocumentGate
> | null = null;

/**
 * main 이 이 문서를 곧 `loadURL` 로 교체할 예정임. 콜드 스타트 분기는 `did-finish-load`
 * 에 교체를 예약하는데, 렌더러의 ack 는 그보다 먼저 온다 — 그때 배수하면 곧 사라질
 * 문서로 흘려보내게 된다. 예약 시점에 세우고 실제 교체가 시작될 때 내린다.
 */
let rendererSwapPending = false;

/**
 * `loadURL` 은 같은 WebContents 를 재사용하므로 id 비교만으로는 문서 교체를 못 잡는다.
 * 문서 교체가 시작되면 ack 를 무효화해 새 React 트리가 리스너를 다시 붙일 때까지 큐가
 * 대기하게 한다.
 *
 * `did-start-loading` 을 쓰지 않는다. 그건 FrameTree 전체의 로딩 상태라 in-app iframe
 * (Channel Talk) 로드에도 발화하는데, ack 는 문서당 1회뿐이라 한 번 무효화되면 그 문서가
 * 사는 내내 게이트가 닫힌 채로 남는다. 바로 위 `did-start-navigation` 리스너가 같은
 * 이유로 이미 `isMainFrame`/`isSameDocument` 를 걸고 있다.
 *
 * fragment 만 바뀌는 이동(HashRouter 라 로그인 성공 후 `#/` 이동이 여기 해당할 수 있다)은
 * 문서를 교체하지 않아 새 ack 가 영영 오지 않는다. 그 경우는 배수 지점이 사라지므로
 * `did-navigate-in-page` 에서 직접 흘린다.
 */
function attachTelemetryDrainTargetTracking(window: BrowserWindow): void {
  const gate = createTelemetryDocumentGate(window.webContents.mainFrame);
  telemetryDocumentGate = gate;

  window.webContents.on('did-start-navigation', (details) => {
    if (!details.isMainFrame || details.isSameDocument) return;
    gate.startNavigation();
    rendererSwapPending = false;
  });
  // `did-navigate` is the main-frame commit boundary. Waiting for
  // `did-frame-finish-load` can reject the new renderer's effect-time ack.
  window.webContents.on('did-navigate', () => {
    gate.commitNavigation(window.webContents.mainFrame);
  });
  window.webContents.on('did-navigate-in-page', (_event, _url, isMainFrame) => {
    if (isMainFrame) drainPendingTelemetry();
  });
  window.on('closed', () => {
    gate.reset();
    if (telemetryDocumentGate === gate) telemetryDocumentGate = null;
    rendererSwapPending = false;
  });
}

/**
 * Logs in the main process to electron-log AND forwards the payload to the
 * renderer over a fixed IPC channel so it reaches Datadog (only the renderer
 * runs the @datadog/browser-logs SDK). Local electron-log output is preserved.
 *
 * `buffer` is opt-in on purpose. Every other caller (audio capture, stream
 * routing, updater) keeps today's fire-and-forget behavior, so a broken
 * readiness handshake can never silently mute those channels, and their volume
 * can never evict a buffered login handoff from the bounded queue.
 */
function forwardLogToDatadog(
  level: ForwardLogLevel,
  message: string,
  context?: Record<string, string | number | boolean>,
  options?: { buffer?: boolean },
) {
  log[level](message, context ?? '');

  // 렌더러 readiness 를 보고 즉시 보내면 안 된다. 로그인 성공 경로는 살아있는(=ready)
  // 렌더러로 stage 를 보낸 직후 그 렌더러를 loadURL 로 교체하므로, ready 였다는 사실이
  // 곧 "이 로그가 배송된다"를 뜻하지 않는다 (2026-08-26 dev 실측: protocol_received~
  // token_saved 4건이 5ms 뒤 네비게이션에 통째로 유실). 버퍼를 요청한 로그는 항상 큐에
  // 넣고, 리스너 부착을 ack 한 문서가 확인된 시점에만 배수한다.
  if (options?.buffer) {
    if (pendingTelemetryLogs.length >= PENDING_TELEMETRY_LOG_LIMIT) {
      // 조용히 버리면 배수가 멈춘 사실 자체를 아무도 모른다. 원격 채널이 막힌
      // 상황이라 로컬 로그가 유일한 신호다.
      log.warn(
        '[telemetry] pending queue overflow; dropping oldest buffered log',
      );
      pendingTelemetryLogs.shift();
    }
    pendingTelemetryLogs.push({ level, message, context });
    return;
  }

  sendWebContents('telemetry:log', { level, message, context });
}

type AuthFailReason =
  | 'missing-code'
  | 'invalid-intent'
  | 'missing-pkce-verifier'
  | 'exchange-failed';

/**
 * 렌더러 교체 없이 끝나는 경로에서 버퍼를 흘려보낸다. 성공 경로는 새 렌더러의
 * `telemetry:ready` 가 배수하지만, 실패 경로는 렌더러를 그대로 두므로 여기서
 * 비우지 않으면 stage 가 큐에 갇힌 채 다음 로그인에 evict 된다.
 *
 * `sendWebContents` 를 쓰지 않는다. 그건 "창이 살아있나"만 보는데, 리스너를 아직 안 단
 * 문서로 보낸 로그는 조용히 사라진다. `telemetry:ready` 로 리스너 부착을 알린 바로 그
 * 문서에만 흘리고, 아니면 큐에 남겨 다음 ack 를 기다린다.
 */
function drainPendingTelemetry(): void {
  const target = mainWindow?.webContents;
  if (
    rendererSwapPending ||
    !target ||
    target.isDestroyed() ||
    !telemetryDocumentGate?.isReady(target.mainFrame)
  )
    return;
  drainPendingTelemetryTo(target);
}

/**
 * 보낸 뒤에 지운다. 먼저 splice 하면 send 가 throw 했을 때 남은 항목까지 함께
 * 증발하고, 큐에는 복구할 근거가 남지 않는다.
 */
function drainPendingTelemetryTo(target: Electron.WebContents): void {
  while (pendingTelemetryLogs.length > 0) {
    try {
      target.send('telemetry:log', pendingTelemetryLogs[0]);
    } catch (error) {
      // 큐를 보존한 채 중단한다 — 다음 ack 때 다시 시도한다.
      log.debug('[telemetry] drain interrupted; queue kept', error);
      return;
    }
    pendingTelemetryLogs.shift();
  }
}

// auth 콜백의 실패 경로는 조용히 return하지 말고 이걸 부른다. 안 부르면 렌더러
// OAuth 화면이 영구 스피너로 남고, 로그가 로컬 app.log에만 있어 원격 판별도
// 불가능하다 (PLT-6106).
function failAuthCallback(reason: AuthFailReason, message: string): void {
  // 배수를 먼저 한다. 이 error 로그는 버퍼를 타지 않으므로 순서를 뒤집으면
  // 실패 사유가 그 사유를 만든 stage 들보다 먼저 도착한다.
  drainPendingTelemetry();
  forwardLogToDatadog('error', message, { reason });
  sendWebContents('auth-callback-failed', { reason });
}

/**
 * Reports the native half of one OAuth handoff. `elapsed_ms` covers the gap to
 * the previous stage *inside this process* only; gaps between surfaces are not
 * trustworthy durations (buffered logs reach Datadog stamped at flush time), so
 * the cross-surface view is a stage presence/absence funnel, not a timing chart.
 */
class LoginHandoffReporter {
  private lastStageAt = Date.now();
  private terminalReported = false;
  private savedToken = false;

  constructor(
    private readonly loginAttemptId: string | undefined,
    private readonly provider: string | undefined,
  ) {}

  /**
   * 토큰이 실제로 저장됐는지. `terminalReported`와 다르다 — 저 쪽은 실패로 끝난
   * 시도도 포함하므로, 저장 이후 실패인지 판정하는 데 쓰면 교환 실패까지
   * "이미 인증됨"으로 오분류해 렌더러가 스피너에 갇힌다 (PLT-6106).
   */
  get tokenPersisted(): boolean {
    return this.savedToken;
  }

  stage(
    stage: LoginHandoffStage,
    errorKind?: LoginHandoffErrorKind,
    options: { replayedAttempt?: boolean } = {},
  ): void {
    const now = Date.now();
    const { message, context } = buildLoginHandoffLog({
      stage,
      loginAttemptId: this.loginAttemptId,
      provider: this.provider,
      errorKind,
      elapsedMs: now - this.lastStageAt,
      replayedAttempt: options.replayedAttempt,
    });
    this.lastStageAt = now;
    if (errorKind || stage === 'token_saved') this.terminalReported = true;
    if (stage === 'token_saved' && !errorKind) this.savedToken = true;

    forwardLogToDatadog(errorKind ? 'warn' : 'info', message, context, {
      buffer: true,
    });
  }

  /**
   * Reports an unexpected throw only when the attempt has no outcome yet — after
   * `token_saved` the handoff already succeeded and any later failure belongs to
   * renderer startup, not this stage sequence.
   */
  failUnlessReported(errorKind: LoginHandoffErrorKind): void {
    if (this.terminalReported) return;
    this.stage('exchange_failed', errorKind);
  }
}

/**
 * handleDeepLink
 */
export async function handleDeepLink(url: string) {
  if (!isTiroScheme(url)) {
    return;
  }

  // Guard: Check if mainWindow exists and is not destroyed
  if (!mainWindow || mainWindow.isDestroyed()) {
    log.warn(
      `[auth] handleDeepLink: no live mainWindow → creating one and deferring (appReady=${app.isReady()})`,
    );
    // If the app is ready, create a new main window
    if (app.isReady()) {
      mainWindow = await createAndSetupMainWindow();
      // Wait for the main window to load before handling the deep link
      mainWindow.webContents.once('did-finish-load', () => {
        handleDeepLink(url);
      });
    } else {
      // Schedule the deep link to be handled after app is ready
      app.once('ready', async () => {
        // Create main window if it doesn't exist
        if (!mainWindow || mainWindow.isDestroyed()) {
          mainWindow = await createAndSetupMainWindow();
        }

        // Wait for the main window to load before handling the deep link
        mainWindow.webContents.once('did-finish-load', () => {
          handleDeepLink(url);
        });
      });
    }
    return;
  }

  // Route matching goes through the parsed host/path so that the tiro-dev scheme
  // works and a route appearing inside a query value is not mistaken for one.
  const parsed = parseTiroDeepLinkDetailed(url);
  if (parsed.status === 'unsupported_url') {
    return;
  }
  if (parsed.status === 'invalid_url') {
    log.error('[DeepLink] malformed Tiro deep link:', parsed.error.message);
    return;
  }
  const deepLink = parsed.deepLink;
  const { route, params } = deepLink;

  // `did-finish-load` is DOM-ready, not session-restored, so these routes would
  // otherwise be pushed to listeners that have not mounted yet and vanish.
  if (
    !rendererDeepLinkHold.isRendererReady &&
    requiresAuthenticatedRenderer(deepLink)
  ) {
    const replaced = rendererDeepLinkHold.hold(url);
    log.info('[DeepLink] renderer not ready → held:', route);
    if (replaced) {
      log.warn('[DeepLink] dropped an earlier held deep link (one slot)');
    }
    return;
  }

  // Deep Link: Start recording.
  // Canonical routes are notes/create/live-voice and notes/create/offline-mode;
  // start-recording is the mode-agnostic alias kept for external integrations.
  //   reservedGuid (optional): claim a pre-reserved note guid
  //   folderIds (optional): comma-separated team folder IDs (folderId accepted)
  //   attendees (optional): comma-separated emails, tagged as note participants
  //   title, transcribeLocale, summaryLocale (optional)
  //   background (optional): keep the app in the background
  const recordingMode = resolveRecordingMode(deepLink);
  if (recordingMode) {
    try {
      const {
        title,
        reservedGuid,
        folderIds,
        attendees,
        transcribeLocale,
        summaryLocale,
        isBackground,
      } = parseStartRecordingDeepLinkParams(params);

      if (!isBackground) {
        if (mainWindow.isMinimized()) {
          mainWindow.restore();
        }
        mainWindow.focus();
      }

      if (recordingMode === 'live-voice') {
        sendWebContents('calendar-create-note', {
          params: {
            title: title || 'Untitled',
            // Empty string would tag a blank participant: the receiver splits
            // `tags` unconditionally, and `''.split(',')` yields `['']`.
            tags: attendees.length > 0 ? attendees.join(',') : null,
            meetingId: null,
            hangoutLink: null,
            transcribeLocale,
            summaryLocale,
            autoStart: true,
            reservedGuid,
            folderIds,
          },
        });
      } else {
        sendWebContents('deeplink-start-recording', {
          reservedGuid,
          background: isBackground,
          folderIds,
          attendees,
          title,
          summaryLocale,
        });
      }

      log.info('[DeepLink] start recording sent:', {
        route,
        mode: recordingMode,
        reservedGuid,
        background: isBackground,
        folderIds,
        attendeesCount: attendees.length,
      });

      // Note: hideToBackground is called from open-url/second-instance handler
      // to avoid duplicate hide calls and ensure renderer processes the message
    } catch (error) {
      log.error('Error handling start recording deep link:', error);
    }
    return;
  }

  // Calendar Notification
  if (route === 'calendar/create-note') {
    if (mainWindow.isMinimized()) {
      mainWindow.restore();
    }
    mainWindow.focus();

    try {
      const urlObj = new URL(url);
      const title = urlObj.searchParams.get('title');
      const tags = urlObj.searchParams.get('tags');
      const meetingId = urlObj.searchParams.get('meetingId');
      const hangoutLink = urlObj.searchParams.get('hangoutLink');
      const transcribeLocale = urlObj.searchParams.get('transcribeLocale');
      const summaryLocale = urlObj.searchParams.get('summaryLocale');
      const autoStart = urlObj.searchParams.get('autoStart') === 'true';

      sendWebContents('calendar-create-note', {
        title,
        tags,
        meetingId,
        hangoutLink,
        transcribeLocale,
        summaryLocale,
        autoStart,
      });

      if (hangoutLink) {
        const targetWindow = mainWindow;
        // hangoutLink comes from an attacker-controllable deeplink payload;
        // restrict to http/https. See TIRO-SEC-06.
        void runCalendarMeetingAction({
          autoStart,
          isRecordingSupported: recordingSupportGate.isSupported,
          openMeetingLink: () => safeOpenExternal(hangoutLink),
          // User initiated action, focus allowed
          enterMeetingMode: () => enterMeetingMode(targetWindow, true),
        });
      }
    } catch (error) {
      log.error('Error parsing calendar create-note URL:', error);
    }

    return;
  }

  // Welcome overlay after Stripe checkout. Keep accepting the old
  // tiro://settings/welcome route for already-issued checkout redirects.
  if (route === 'welcome' || route === 'settings/welcome') {
    if (mainWindow.isMinimized()) {
      mainWindow.restore();
    }
    mainWindow.focus();

    try {
      const productName = params.get('productName') ?? '';

      sendWebContents('welcome-overlay-show', { productName });
    } catch (error) {
      log.error('Error parsing welcome URL:', error);
    }

    return;
  }

  if (isCredentialAttachCallbackDeepLink(url)) {
    let callbackConsumed = false;
    try {
      const urlObj = new URL(url);
      const provider = urlObj.searchParams.get('provider');
      if (!provider) {
        log.warn(
          '[auth] rejected credential attach callback without a provider',
        );
        return;
      }
      const completionCode =
        urlObj.searchParams.get('credentialAttachCode') ?? undefined;
      const errorCode =
        urlObj.searchParams.get('credentialAttachError') ?? undefined;
      const callback = consumeCredentialAttachCallback(
        store as unknown as AuthIntentStore,
        provider,
        urlObj.searchParams.get('credentialAttachNonce'),
        completionCode,
        errorCode,
      );
      if (!callback) {
        log.warn('[auth] rejected invalid credential attach callback');
        return;
      }
      callbackConsumed = true;

      if (callback.errorCode) {
        publishCredentialAttachResult({
          success: false,
          errorCode: callback.errorCode,
        });
      } else {
        const codeVerifier = callback.intent.protectedCodeVerifier
          ? unprotectAuthSecret(callback.intent.protectedCodeVerifier)
          : null;
        const token = getAuthToken(store);
        const apiBaseUrl = process.env.VITE_API_BASE_URL;
        if (
          !codeVerifier ||
          !isPkceVerifier(codeVerifier) ||
          !token ||
          !apiBaseUrl
        ) {
          throw new Error(
            'Credential attach finalize prerequisites are missing',
          );
        }

        // intent/verifier는 위에서 먼저 소비했다. 응답을 잃어도 one-shot code를
        // 재전송하지 않고 사용자가 새 attach flow를 시작하게 한다.
        await completeCredentialAttach(
          apiBaseUrl,
          token,
          callback.completionCode!,
          codeVerifier,
          Object.freeze({
            platform: isMac ? 'mac' : 'windows',
            appVersion: app.getVersion(),
            correlationId: randomUUID(),
            deviceUuid: await machineId().catch((): undefined => undefined),
          }),
        );
        publishCredentialAttachResult({ success: true });
      }

      if (mainWindow.isMinimized()) {
        mainWindow.restore();
      }
      mainWindow.focus();
    } catch (error) {
      log.error('[auth] error handling credential attach callback', error);
      if (callbackConsumed) {
        publishCredentialAttachResult(toCredentialAttachFailure(error));
      }
    }
    return;
  }

  // Google OAuth Login
  if (isAuthCallbackDeepLink(url)) {
    log.info(
      `[auth] handleDeepLink: auth/callback received (pid=${process.pid} version=${app.getVersion()} execPath=${process.execPath})`,
    );
    const urlObj = new URL(url);
    const callbackProvider = urlObj.searchParams.get('provider');
    const code = urlObj.searchParams.get('code');
    const loginAttemptId = sanitizeLoginAttemptId(
      urlObj.searchParams.get(LOGIN_ATTEMPT_ID_PARAM),
    );
    const attemptHistory = store as unknown as LoginAttemptHistoryStore;
    const handoff = new LoginHandoffReporter(
      loginAttemptId,
      // Reported only when known: this value reaches a Datadog facet before the
      // auth-intent check has vouched for the callback at all.
      sanitizeAuthProvider(callbackProvider),
    );

    if (!code) {
      if (urlObj.searchParams.get('restart') === 'true') {
        consumeLoginAuthIntentRecord(
          store as unknown as AuthIntentStore,
          callbackProvider,
        );
      }
      // stage 를 먼저 찍는다 — failAuthCallback 이 버퍼를 배수하므로, 뒤에 찍으면
      // 이 경로는 렌더러를 교체하지 않아 배수 기회가 다시 오지 않는다.
      handoff.stage('protocol_received', 'missing_code');
      failAuthCallback(
        'missing-code',
        '[auth] handleDeepLink: NO code in auth callback URL',
      );
      return;
    }
    handoff.stage('protocol_received');

    try {
      // 교환 뒤로 옮기지 말 것. 그러면 (1) TTL이 왕복 중 만료돼 발급된 토큰을
      // 버리고, (2) 실패 시 intent가 남아 잔여 TTL 동안 임의의 code를 수락하고,
      // (3) 콜백이 두 번 배달되면 둘 다 통과해 중복 교환을 보낸다.
      const authIntent = consumeLoginAuthIntentRecord(
        store as unknown as AuthIntentStore,
        callbackProvider,
      );
      if (!authIntent) {
        handoff.stage('intent_validation_failed', 'intent_invalid', {
          replayedAttempt: wasLoginAttemptCompleted(
            attemptHistory,
            loginAttemptId,
          ),
        });
        failAuthCallback(
          'invalid-intent',
          '[auth] handleDeepLink: rejected auth callback without a valid pending auth intent',
        );
        return;
      }

      handoff.stage('exchange_started');
      const apiBaseUrl = process.env.VITE_API_BASE_URL;
      if (!apiBaseUrl) {
        handoff.stage('exchange_failed', 'api_base_url_missing');
        throw new Error('VITE_API_BASE_URL is not configured');
      }
      const codeVerifier = authIntent.protectedCodeVerifier
        ? unprotectAuthSecret(authIntent.protectedCodeVerifier)
        : undefined;
      if (
        authIntent.protectedCodeVerifier &&
        (!codeVerifier || !isPkceVerifier(codeVerifier))
      ) {
        // intent 자체는 통과했지만 검증기가 없어 교환을 못 보낸 경우 —
        // terminal event 없이 끝나면 funnel 에서 "protocol 미수신"과 구별되지 않는다.
        handoff.stage('intent_validation_failed', 'intent_invalid');
        failAuthCallback(
          'missing-pkce-verifier',
          '[auth] handleDeepLink: rejected PKCE callback without a valid verifier',
        );
        return;
      }
      const token = await exchangeAuthCode(code, apiBaseUrl, codeVerifier);
      handoff.stage('exchange_succeeded');

      try {
        setAuthToken(store, token);
      } catch (error) {
        // keytar/electron-store 쓰기 실패를 exchange 실패로 뭉개면 "서버 교환이 깨졌다"로
        // 오진한다 — 티켓이 요구한 exchange 실패 / token 저장 실패 구분점이다.
        handoff.stage('token_saved', 'token_save_failed');
        throw error;
      }
      handoff.stage('token_saved');
      try {
        rememberCompletedLoginAttempt(attemptHistory, loginAttemptId);
      } catch (error) {
        // 재전달 분류용 이력이다. 토큰은 이미 저장됐으므로 여기서 던지면 인터셉터
        // 설정과 화면 전환이 건너뛰어져 사용자가 로딩 화면에 남는다.
        log.warn(
          '[auth] handleDeepLink: failed to record completed login attempt',
          error,
        );
      }
      log.info(
        '[auth] handleDeepLink: setAuthToken OK; setting interceptor + navigating renderer',
      );

      void mainWindow.webContents
        .executeJavaScript(
          "sessionStorage.removeItem('LAST_VISITED_FOLDER'); sessionStorage.removeItem('LAST_VISITED_SECTION');",
          true,
        )
        .catch((error) => {
          log.error('Failed to clear last visited note list state:', error);
        });

      const pendingAdAttributions = parsePendingAdAttributionsParam(
        urlObj.searchParams.get('adAttributions'),
      );
      if (pendingAdAttributions && pendingAdAttributions.length > 0) {
        store.set(PENDING_AD_ATTRIBUTIONS_KEY, pendingAdAttributions);
        log.info(
          `Persisted ${pendingAdAttributions.length} pending ad attributions from deeplink`,
        );
      }

      const webDistinctId = parseWebDistinctIdParam(
        urlObj.searchParams.get('phDistinctId'),
      );
      if (webDistinctId) {
        store.set(PENDING_WEB_DISTINCT_ID_KEY, webDistinctId);
        log.info('Persisted web PostHog distinct_id from deeplink for handoff');
      }

      session.defaultSession.webRequest.onBeforeSendHeaders(null);
      session.defaultSession.webRequest.onBeforeSendHeaders(
        { urls: AUTH_INTERCEPT_URL_PATTERNS },
        (details, callback) => {
          const { requestHeaders } = details;
          applyAuthRequestHeaders({
            url: details.url,
            requestHeaders,
            token,
            apiBaseUrl: process.env.VITE_API_BASE_URL,
            webSocketBaseUrl: process.env.VITE_WS_BASE_URL,
            webBaseUrl: process.env.VITE_WEB_BASE_URL,
          });
          callback({ requestHeaders });
        },
      );
      log.info(
        '[auth] handleDeepLink: interceptor set for Authorization headers',
      );
      if (mainWindow.isMinimized()) {
        mainWindow.restore();
      }
      mainWindow.focus();

      const currentURL = mainWindow.webContents.getURL();

      // Route to main page — guard against empty/about:blank (window still loading on fresh install)
      if (!currentURL || currentURL === 'about:blank') {
        // 지금 로딩 중인 문서는 아래에서 교체한다. 렌더러 ack 는 `did-finish-load`
        // 보다 먼저 오므로, 표시해두지 않으면 곧 사라질 문서로 큐를 배수한다.
        rendererSwapPending = true;
        mainWindow.webContents.once('did-finish-load', () => {
          // 가드는 이 콜백을 등록하기 전에 통과했지만, 로딩이 끝나기까지 사이에
          // 창이 닫힐 수 있다. 이 함수 앞부분의 가드와 같은 방식으로 다시 확인한다.
          if (!mainWindow || mainWindow.isDestroyed()) {
            rendererSwapPending = false;
            return;
          }
          const loadedURL = mainWindow.webContents.getURL();
          const base = loadedURL.split('#')[0];
          void mainWindow.loadURL(`${base}#/`);
        });
      } else {
        const baseURL = currentURL.split('#')[0];
        log.info(`[auth] handleDeepLink: navigating renderer to ${baseURL}#/`);
        mainWindow.loadURL(`${baseURL}#/`);
      }
    } catch (error) {
      const detail = error instanceof Error ? error.message : String(error);
      if (handoff.tokenPersisted) {
        // 사용자는 이미 인증된 상태다. 로그인 실패로 알리면 거짓이고
        // exchange-failed로 남기면 이 티켓의 판별 신호가 오염된다.
        // 이 경로는 렌더러를 교체하지 않고 끝나므로 버퍼를 직접 비운다.
        drainPendingTelemetry();
        forwardLogToDatadog(
          'error',
          `[auth] handleDeepLink: failed after token was persisted: ${detail}`,
          { reason: 'post-auth-failed' },
        );
        return;
      }
      handoff.failUnlessReported(
        error instanceof AuthCodeExchangeError ? error.errorKind : 'unknown',
      );
      failAuthCallback(
        'exchange-failed',
        `[auth] handleDeepLink: error handling auth callback: ${detail}`,
      );
    }

    return;
  }

  // Integration
  // Google Calendar
  if (route === 'calendar/connect') {
    if (mainWindow.isMinimized()) {
      mainWindow.restore();
    }
    mainWindow.focus();

    const currentURL = mainWindow.webContents.getURL();
    const baseURL = currentURL.split('#')[0];

    const hashPath = currentURL.split('#')[1]?.split('?')[0] || '/n';
    const finalURL = `${baseURL}#${hashPath}?action=open-settings-calendar`;

    // should reload then load url with new params
    mainWindow.loadURL(finalURL);
    return;
  }

  // Mic Create Note (from microphone detection notification)
  if (route === 'mic/create-note') {
    const targetWindow = mainWindow;
    if (targetWindow.isMinimized()) {
      targetWindow.restore();
    }
    targetWindow.focus();

    try {
      const urlObj = new URL(url);
      const title = urlObj.searchParams.get('title') || 'Untitled';
      const transcribeLocale = urlObj.searchParams.get('transcribeLocale');
      const summaryLocale = urlObj.searchParams.get('summaryLocale');
      const autoStart = urlObj.searchParams.get('autoStart') === 'true';

      await runMicCreateNoteAction({
        autoStart,
        isRecordingSupported: recordingSupportGate.isSupported,
        ensureRecordingSupported: recordingSupportGate.ensureSupported,
        createNote: () =>
          sendWebContents('calendar-create-note', {
            title,
            tags: null,
            meetingId: null,
            hangoutLink: null,
            transcribeLocale,
            summaryLocale,
            autoStart,
          }),
        enterMeetingMode: () => enterMeetingMode(targetWindow, true),
      });
    } catch (error) {
      log.error('Error parsing mic create-note URL:', error);
    }

    return;
  }

  // Note Resume (from system suspend notification)
  if (route === 'note/resume') {
    if (mainWindow.isMinimized()) {
      mainWindow.restore();
    }
    mainWindow.focus();

    try {
      const urlObj = new URL(url);
      const noteId = urlObj.searchParams.get('noteId');
      const guid = urlObj.searchParams.get('guid');

      if (!noteId || !guid) {
        log.error('Missing noteId or guid in note/resume URL');
        return;
      }

      // Navigate to the note page
      const currentURL = mainWindow.webContents.getURL();
      const baseURL = currentURL.split('#')[0];
      mainWindow.loadURL(`${baseURL}#/n?noteId=${noteId}`);

      log.info('Navigated to paused note:', { noteId, guid });
    } catch (error) {
      log.error('Error parsing note/resume URL:', error);
    }

    return;
  }

  if (route === GOOGLE_DRIVE_PICKED_ROUTE) {
    if (mainWindow.isMinimized()) {
      mainWindow.restore();
    }
    mainWindow.focus();
    const outcome = acceptGoogleDrivePickedDeepLink(params);
    if (!outcome.accepted) {
      log.warn(
        '[GoogleDrivePicker] rejected picked deep link:',
        outcome.reason,
      );
      return;
    }
    sendWebContents('google-drive-picker:result');
    return;
  }

  const workflowProvider = getWorkflowProviderFromDeepLink(url);
  if (workflowProvider) {
    if (mainWindow.isMinimized()) {
      mainWindow.restore();
    }
    mainWindow.focus();

    const urlObj = new URL(url);
    const callbackProvider = urlObj.hostname;
    const workflowSessionEpoch = getWorkflowAuthorizeEpoch(callbackProvider);
    const providerParameter = new URLSearchParams({
      provider: callbackProvider,
    });
    // Salesforce 는 auth intent 없이 복귀하므로 딥링크의 오류를 그대로 실패로 알린다.
    // 다른 연동처럼 실패면 공유를 이어가지 않고(노트 재로드 없음) 안내만 띄운다.
    const salesforceOAuthError = getSalesforceOAuthErrorFromDeepLink(url);
    if (salesforceOAuthError === 'authorization_failed') {
      emitWorkflowConnectResult(
        'failed',
        {
          provider: workflowProvider,
          errorCode: salesforceOAuthError,
          salesforceOAuthReason: getSalesforceOAuthReasonFromDeepLink(url),
        },
        workflowSessionEpoch,
      );
      return;
    }
    const currentURL = mainWindow.webContents.getURL();
    const baseURL = currentURL.split('#')[0];

    // extract individual parameters from current window URL
    const searchParams = new URLSearchParams(currentURL.split('?')[1]);
    const layout = searchParams.get('layout');
    const noteId = searchParams.get('noteId');

    if (workflowProvider !== 'salesforce') {
      const callback = consumeCredentialAttachCallback(
        store as unknown as AuthIntentStore,
        callbackProvider,
        urlObj.searchParams.get('clientNonce'),
        urlObj.searchParams.get('completionCode') ?? undefined,
        urlObj.searchParams.get('error') ?? undefined,
      );
      if (!callback) {
        log.warn('[workflow OAuth] rejected invalid callback');
        return;
      }
      if (callback.errorCode) {
        emitWorkflowConnectResult(
          'failed',
          {
            provider: workflowProvider,
            errorCode: callback.errorCode,
          },
          workflowSessionEpoch,
        );
        return;
      }

      const codeVerifier = callback.intent.protectedCodeVerifier
        ? unprotectAuthSecret(callback.intent.protectedCodeVerifier)
        : null;
      const token = getAuthToken(store);
      const apiBaseUrl = process.env.VITE_API_BASE_URL;
      if (
        !codeVerifier ||
        !isPkceVerifier(codeVerifier) ||
        !token ||
        !apiBaseUrl
      ) {
        log.warn('[workflow OAuth] finalize prerequisites are missing');
        emitWorkflowConnectResult(
          'failed',
          {
            provider: workflowProvider,
          },
          workflowSessionEpoch,
        );
        return;
      }

      try {
        await completeBoundOAuth(
          apiBaseUrl,
          token,
          callback.completionCode!,
          codeVerifier,
          Object.freeze({
            platform: isMac ? 'mac' : 'windows',
            appVersion: app.getVersion(),
            correlationId: randomUUID(),
            deviceUuid: await machineId().catch((): undefined => undefined),
          }),
          WORKFLOW_COMPLETE_PATH,
        );
      } catch (error) {
        log.error('[workflow OAuth] finalize failed', error);
        emitWorkflowConnectResult(
          'failed',
          {
            provider: workflowProvider,
          },
          workflowSessionEpoch,
        );
        return;
      }
    }

    if (noteId) {
      const finalURL = `${baseURL}#/n?noteId=${noteId}&${layout ? `layout=${layout}&` : ''}${providerParameter.toString()}&action=open-share`;
      mainWindow.loadURL(finalURL);
    }

    emitWorkflowConnectResult(
      'complete',
      { provider: workflowProvider },
      workflowSessionEpoch,
    );

    return;
  }

  // Deep Link: Stop recording by GUID (Xenia integration)
  // Supports background mode via ?background=true parameter
  if (route === 'stop-recording') {
    try {
      const urlObj = new URL(url);
      const guid = urlObj.searchParams.get('guid');
      const isBackground = urlObj.searchParams.get('background') === 'true';

      if (!guid) {
        log.error('[DeepLink] stop-recording: guid is required');
        return;
      }

      // Only restore/focus if not background mode
      if (!isBackground) {
        if (mainWindow.isMinimized()) {
          mainWindow.restore();
        }
        mainWindow.focus();
      }

      sendWebContents('deeplink-stop-recording', {
        guid,
        background: isBackground,
      });
      log.info('[DeepLink] stop-recording sent:', {
        guid,
        background: isBackground,
      });

      // Note: hideToBackground is called from open-url/second-instance handler
      // to avoid duplicate hide calls and ensure renderer processes the message
    } catch (error) {
      log.error('Error parsing stop-recording URL:', error);
    }
    return;
  }

  // Reached only when no branch above claimed the route. Without this the app
  // just focuses and a typo'd route (`start_recording`) leaves no trace at all.
  log.warn('[DeepLink] unhandled route:', route);
}

/**
 * Create tray icon with menu.
 *
 * macOS: 메뉴바 status item. 클릭으로 context menu 표시. 다크/라이트 메뉴바
 * 자동 대응을 위해 setTemplateImage(true) 사용.
 *
 * Windows: 시스템 트레이 아이콘. 좌클릭으로 메인 윈도우 토글, 우클릭으로
 * context menu (Electron 기본). 별도 컬러 PNG 사용 (Windows 트레이는
 * template image 미지원).
 */
function createTray() {
  if (!isMac && !isWindows) return;

  try {
    let trayIcon;
    if (isMac) {
      // Use template image for automatic color adaptation based on menubar appearance.
      // Base64-encoded because Vite bundles main process and __dirname won't resolve
      // to source assets.
      const templateIcon = nativeImage.createFromDataURL(
        'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACwAAAAsCAYAAAAehFoBAAAACXBIWXMAAAsTAAALEwEAmpwYAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAOdEVYdFNvZnR3YXJlAEZpZ21hnrGWYwAAAiNJREFUeAHVmeFVwjAUhS+6ACM8J5ANrBvoBHYD3aAdASfADdQJxAnECcAJ8K+/MK8NniBJoMlF6nfOBQ9J+66vL+G1DBBmaHRldGEkVnDeWSyc95nRu9HU+XwnarQyWhqtjqhqD69N9uY4rlFXc0SuaN/M7jTdR7OuaS1VnFqzFdoF1lfU7Bfaxdikm5mJwglUgHflltY4SqJZwTYC3o5TnpiXETg8w7936mf34HChhs/BYRYZW4CDqGEBh2HiWBdEX7T2GPX1FgnEiqHnoZxorUdsXjHN7IQZY2D/YDO1ZgW8cmg4lOGDcQI+U6Nro0vwdocNmDU89py/Jsegrd4CYUbg7RTZJ3jAfgtL7NyjGdb+4A7dKZHXWySXgCAdQXqJJB0U6521PEqrGFeJsemG35x5L5F5RWLspIPGARMjz9xQ+zpJjJ100E/3/4shtheUb54kxk02rKrhp3TmlIE5k4y4yQeGsqyMrSkfkhFzldNLqNnQPvxp9BEYu0EGuc3PLbq1j4Ld212UXMOxLPvQ7VCQAaO97JLlW2TCMLxvlksQbnjV8AL57JO5CvksWHcc6/4hhI4JCLAyrFSJY11oMvwBDgJ/lkvwHta8q+EpePi+FFjZVWZ6m6/1Nwfv+UGN9vGBEus5Ujhzg6x6rtp1vs5yX83O4UHwz36U6aPpqFmXGsc1urQetjaCQdhz858VaO/JzvE3P92qXo2e0PbUW3wDvGBydNmjleMAAAAASUVORK5CYII=',
      );
      trayIcon = templateIcon.resize({
        width: 18,
        height: 18,
        quality: 'best',
      });
      trayIcon.setTemplateImage(true);
    } else {
      // Windows tray icon: 32x32 PNG (Electron auto-scales for highDPI displays).
      // Brown-colored Tiro logo (tiro-icon-brown.png) — Windows tray 영역은
      // 시스템 테마에 따라 밝거나 약간 어두운 색이지만, 흰색/크림은 light
      // 테마에서 거의 안 보이는 사례가 보고됨. 브라운은 양쪽 모두에서
      // 적당한 대비를 제공.
      trayIcon = nativeImage.createFromDataURL(
        'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAYAAABzenr0AAAABGdBTUEAALGPC/xhBQAAACBjSFJNAAB6JgAAgIQAAPoAAACA6AAAdTAAAOpgAAA6mAAAF3CculE8AAAAlmVYSWZNTQAqAAAACAAGARIAAwAAAAEAAQAAARoABQAAAAEAAABWARsABQAAAAEAAABeASgAAwAAAAEAAgAAATEAAgAAAAYAAABmh2kABAAAAAEAAABsAAAAAAAAAEgAAAABAAAASAAAAAFGaWdtYQAAA6ABAAMAAAABAAEAAKACAAQAAAABAAAAIKADAAQAAAABAAAAIAAAAADICFL/AAAACXBIWXMAAAsTAAALEwEAmpwYAAABwGlUWHRYTUw6Y29tLmFkb2JlLnhtcAAAAAAAPHg6eG1wbWV0YSB4bWxuczp4PSJhZG9iZTpuczptZXRhLyIgeDp4bXB0az0iWE1QIENvcmUgNi4wLjAiPgogICA8cmRmOlJERiB4bWxuczpyZGY9Imh0dHA6Ly93d3cudzMub3JnLzE5OTkvMDIvMjItcmRmLXN5bnRheC1ucyMiPgogICAgICA8cmRmOkRlc2NyaXB0aW9uIHJkZjphYm91dD0iIgogICAgICAgICAgICB4bWxuczp0aWZmPSJodHRwOi8vbnMuYWRvYmUuY29tL3RpZmYvMS4wLyIKICAgICAgICAgICAgeG1sbnM6eG1wPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvIj4KICAgICAgICAgPHRpZmY6T3JpZW50YXRpb24+MTwvdGlmZjpPcmllbnRhdGlvbj4KICAgICAgICAgPHhtcDpDcmVhdG9yVG9vbD5GaWdtYTwveG1wOkNyZWF0b3JUb29sPgogICAgICA8L3JkZjpEZXNjcmlwdGlvbj4KICAgPC9yZGY6UkRGPgo8L3g6eG1wbWV0YT4Kc6r2JgAABWhJREFUWAmdV91PXEUUn5m7H4APXUIblo/ASkjV8GK7bBSKEWPfffDjSd5sVUJN47O+VP8ENZE3ov4Hvhl1TSxoCm1iwpPErsiW5YGkJhhYdu8cf7+5d5uFXe699GTnzuzM+Z5zZs5oFYBBZzmcGxsqWmMXlNJX8HdEKRnAuBfjNBrxkoBopY5FySFo90HwCHzua2O+vfvX7nrIwMkEnmPqhM8WBr822tw0WisQKxGQ4YPuqYDMNXjhp/BVFrys2OXVyt77IUNDHAczhfzPGc/MN3zrQywU0gaCA1rSd4LvtOM8pSjldaIENmCRpjieac94x74tr1VqrxHfEdHyjOe9CeFHmMuAI+epHRmznQYfXvI8uMugAYXKQvGOLWoZQBzHE144gqGTIxf6hv95/N/3+trE0LQWdQ8LZNDNig7hHoT7VtbB/QsuwrNLUGbaPwcPGgCVp1Ni7bvwCveGLopTwFlO4at/10ptmq3MjufvwRvTyQwRC8d5TeMv0DVXgzCjK2MAEen2JbR8ZnS0l41U9IaLKEZtLHDLiKavpPAdJgl+LpJiadsQsqnUE2FJ94/klBWqOQIOcpF/woBrY99liGi3wAX+ElZXypUKg9YBTFriWpgR4Wz3jrICR8mAni3kySTbHbXrrM8gbIr8Dq2/gmBmyYcIqpfOEYQtxnUqwEOoW6q1kLr1deTzCaWRwnUgnpjrRnhqzjLwziOcWy1pY7IQ+NOxr15g45hzXEMjTlIwDMKEIA2kTprR2xD5dLVS+7yN8PXZZ4c+QRR/hiPXQ0o3YBfvjliIT72AhZ8yJo0cryACZ1Yf7lK4mZqayrBx7OawRhziYi6RJ2IVgE9xaDDo7Hf1gZHLdyt7vxWLRWfd5ubmMRt15BzX6gO1y8QlDWm5FgUMQu7bWeDjiPUQ3T+uPqxdJ1KxqNIbGwouVgoX2KvscbH8wn5+XqXKZdXk+Nr44A/GM9dxakYeEdEeQLIGESo1MqW7JzYCq7DnC2mjy2wcc/1SWUm4JUqM2nO0MSdjtAJ0vTt59NsvF/IFuvtgcjIIXLFzQQJBjBsrxTXiEBex+o6jBQ8qdxZEK+AkSANBlTFK3yaTP0NO0kzfaVq/yibN5h1Ob2ezbjuNktsp4yFOhFsVODGkO93FKUD6VJMXpZIbr4xfHNra2qrPFwo9azs7VXD+km1tZ7/KOVpfKlzKg+ZGQKMDb52W2vY/gQK0wHmhzzce7wBVbzadVVCLZY6zujWXUqmP4LE+0gDV4bXJ6xhSgdhUoRd8ekHU4tzYWD+sR7F5EjjHNVSTHzjc+NqCDBCrKkipk+w6/qFoohe8nNWNxY7VcMLq+iKs7ycuppJ49xhIchj6Keo8AD+eB/CCllvFif4LlAliVxByPF/I5XAV33I48da30vuQPPZZ1EJ6jALKIKWZEYM9kr1JoYKyio3juu55j2vEwd9I6ykrKKT1PhGrkO8ijYyiAFc/LxpcB+JSUsTikGQZT8fIx24t3nonizIBj6CAPOCjAX1sMALL4LJppD1vGKX8G6CrwW97HGNuiGvEcawjP2JDmfc1n2IoxtdBHHlmt/GD+1xNV8HcH7Qdyr+IgnQchyaNSKCActU1AqHkbf97sDuae2YYFpSgBMuzuMOD7rJQoh833nPon4cDc6gTkwo/QjWVQaou44JbJjMHT/E0o0BXz4ZMulnOdUY8O+CjounyNCOh7Dw+WOFzCVVPyTMGdSefZvi6+HQ6nv5wjU+BM3G4Bi/h/YZUCbLF0PK1yt5bITPSO6AStEjxqcbXEmiv4u8wdBuAIr0wgZVPC5+oUUBeSMcnz/Mqxg+MNd/8ur27ERI6mf8DkK9eraEmIv0AAAAASUVORK5CYII=',
      );
    }

    tray = new Tray(trayIcon);

    let _calendarEvents: {
      title: string;
      startTime: string;
      endTime: string;
      id: string;
    }[] = [];
    const appVersion = app.getVersion();

    const buildContextMenu = () => {
      type MenuItemType = Electron.MenuItemConstructorOptions;

      const template: MenuItemType[] = [];

      // "Today" group header + calendar events
      template.push({
        label: 'Today',
        enabled: false,
      });

      if (_calendarEvents.length > 0) {
        _calendarEvents.forEach((event) => {
          template.push(
            {
              label: `${event.title}`,
              click: async () => {
                if (!mainWindow || mainWindow.isDestroyed()) {
                  mainWindow = await createAndSetupMainWindow();
                }

                focusWindow(mainWindow, true);
                sendWebContents('tray:create-note', {
                  title: event.title,
                });
              },
            } as MenuItemType,
            {
              label: `${event.startTime} - ${event.endTime}`,
              enabled: false,
            },
          );
        });
      } else {
        template.push({
          label: 'No upcoming events',
          enabled: false,
        });
      }

      // Recording state menu items (mode-aware: live vs offline).
      // Click handlers still talk directly to the native binary in this PR;
      // a follow-up PR routes them through the renderer contexts so STOMP
      // signaling and offline file finalization happen end-to-end.
      if (currentRecording) {
        template.push({ type: 'separator' });

        const isLive = currentRecording.mode === 'live';
        const headerLabel = isLive
          ? currentRecording.isPaused
            ? '⏸ 라이브 노트 일시정지'
            : '🔴 라이브 노트 진행 중'
          : currentRecording.isPaused
            ? '⏸ 오프라인 녹음 일시정지'
            : '⏺ 오프라인 녹음 중';

        const elapsed = formatElapsed(Date.now() - currentRecording.startedAt);
        const noteLabel = `${currentRecording.noteTitle ?? 'Untitled'} — ${elapsed}`;

        template.push(
          { label: headerLabel, enabled: false },
          { label: noteLabel, enabled: false },
          { type: 'separator' },
        );

        if (currentRecording.isPaused) {
          template.push({
            label: 'Resume',
            click: () =>
              dispatchTrayRecordingAction(
                isLive ? 'live:resume' : 'offline:resume',
              ),
          });
        } else {
          template.push({
            label: 'Pause',
            click: () =>
              dispatchTrayRecordingAction(
                isLive ? 'live:pause' : 'offline:pause',
              ),
          });
        }

        template.push(
          {
            label: isLive ? 'Stop & End Note' : 'Stop & Save',
            click: () =>
              dispatchTrayRecordingAction(
                isLive ? 'live:stop' : 'offline:stop',
              ),
          },
          {
            label: '녹음 화면으로 돌아가기',
            click: async () => {
              if (!mainWindow || mainWindow.isDestroyed()) {
                mainWindow = await createAndSetupMainWindow();
              }
              focusWindow(mainWindow, true);
              // Offline 녹음은 별도의 녹음 화면이 없고 백그라운드에서 진행되므로
              // 'Open Tiro'와 동일하게 메인 창만 띄운다. 라이브일 때만 해당
              // 노트 화면으로 라우팅.
              if (isLive && currentRecording?.noteId != null) {
                const currentURL = mainWindow.webContents.getURL();
                const baseURL = currentURL.split('#')[0];
                // Renderer router only defines `/n` (with `noteId` as a query
                // param) — there is no `/n/:noteId` path route, so the prior
                // `#/n/${id}` form fell through to the catch-all `*` and
                // rendered the ErrorPage. Match the canonical pattern used
                // elsewhere in the renderer (e.g. useNotes, deeplink hooks).
                mainWindow.loadURL(
                  `${baseURL}#/n?noteId=${currentRecording.noteId}`,
                );
              }
            },
          },
        );
      }

      template.push(
        { type: 'separator' },
        {
          label: 'Open Tiro',
          click: async () => {
            if (!mainWindow || mainWindow.isDestroyed()) {
              mainWindow = await createAndSetupMainWindow();
            }

            focusWindow(mainWindow, true);
          },
          accelerator: isMac ? 'Cmd+O' : 'Ctrl+O',
        },
        {
          label: 'Quick Note',
          click: async () => {
            if (!mainWindow || mainWindow.isDestroyed()) {
              mainWindow = await createAndSetupMainWindow();
            }

            focusWindow(mainWindow, true);
            const currentURL = mainWindow.webContents.getURL();
            const baseURL = currentURL.split('#')[0];
            mainWindow.loadURL(`${baseURL}#/n`);
            sendWebContents('tray:create-note', {
              title: 'Untitled',
            });
          },
          accelerator: isMac ? 'Cmd+N' : 'Ctrl+N',
        },
        {
          label: 'View All Notes',
          click: async () => {
            if (!mainWindow || mainWindow.isDestroyed()) {
              mainWindow = await createAndSetupMainWindow();
            }

            focusWindow(mainWindow, true);
            const currentURL = mainWindow.webContents.getURL();
            const baseURL = currentURL.split('#')[0];
            mainWindow.loadURL(`${baseURL}#/n`);
          },
          accelerator: isMac ? 'Cmd+Shift+N' : 'Ctrl+Shift+N',
        },
        { type: 'separator' },
        {
          label: `Tiro v${appVersion}`,
          enabled: false,
        },
        { type: 'separator' },
        {
          label: 'Quit Tiro Completely',
          click: () => {
            app.quit();
          },
          accelerator: isMac ? 'Cmd+Q' : 'Ctrl+Q',
        },
      );

      return Menu.buildFromTemplate(template);
    };

    // Expose the closure-bound menu builder so the elapsed-time ticker and
    // refreshTraySurface() can rebuild the menu on each tick.
    getCurrentTrayMenu = () => buildContextMenu();

    tray.setToolTip('Tiro');
    tray.setContextMenu(getCurrentTrayMenu());

    if (isMac) {
      // 단일 클릭으로 메뉴 표시 (macOS 메뉴바 status item 표준)
      tray.on('click', () => {
        tray?.popUpContextMenu();
      });
    } else if (isWindows) {
      // 좌클릭으로 윈도우 토글 (Windows 트레이 표준 동작)
      // — 보이고 포커스 있으면 숨김, 그 외에는 보이고 포커스
      // 우클릭 → context menu는 setContextMenu로 자동 노출됨
      tray.on('click', async () => {
        if (!mainWindow || mainWindow.isDestroyed()) {
          mainWindow = await createAndSetupMainWindow();
        } else if (
          mainWindow.isVisible() &&
          !mainWindow.isMinimized() &&
          mainWindow.isFocused()
        ) {
          mainWindow.hide();
          return;
        }
        focusWindow(mainWindow, true);
      });
    }

    ipcMain.on('tray:update-calendar-events', (_, events) => {
      _calendarEvents = events;
      if (tray) {
        tray.setContextMenu(buildContextMenu());
      }
    });

    // Renderer (NoteStreamingContext / OfflineRecordingContext) pushes
    // recording lifecycle changes here. The main process owns the tray UI,
    // so this is what keeps the tray menu/title/tooltip in sync — even when
    // the main window is hidden.
    ipcMain.on(
      'tray:recording-state:update',
      (
        _,
        payload: {
          mode: 'live' | 'offline' | null;
          noteId: number | null;
          noteTitle: string | null;
          startedAt: number | null;
          isPaused: boolean;
        },
      ) => {
        if (payload.mode === null) {
          currentRecording = null;
          stopTrayElapsedTicker();
        } else {
          currentRecording = {
            mode: payload.mode,
            noteId: payload.noteId,
            noteTitle: payload.noteTitle,
            startedAt: payload.startedAt ?? Date.now(),
            isPaused: payload.isPaused,
          };
          if (currentRecording.isPaused) {
            stopTrayElapsedTicker();
          } else {
            startTrayElapsedTicker();
          }
        }
        refreshTraySurface();
      },
    );

    // Tray surface (title, tooltip, menu) is driven by `currentRecording`,
    // which renderer contexts push via IPC. We still listen to native binary
    // state changes purely as a safety net so the menu reflects the binary
    // pausing/erroring even before the renderer has a chance to push.
    audioCaptureProcess.on('state-change', () => {
      refreshTraySurface();
    });

    log.info('Tray created successfully');
  } catch (error) {
    log.error('Failed to create tray:', error);
  }
}

// ---------------------------------------------------------------------------
// Tray surface helpers (title / tooltip / menu / elapsed-time ticker)
// ---------------------------------------------------------------------------

function formatElapsed(ms: number): string {
  const totalSec = Math.max(0, Math.floor(ms / 1000));
  const m = Math.floor(totalSec / 60);
  const s = totalSec % 60;
  if (m >= 60) {
    const h = Math.floor(m / 60);
    const mm = m % 60;
    return `${h}:${String(mm).padStart(2, '0')}:${String(s).padStart(2, '0')}`;
  }
  return `${m}:${String(s).padStart(2, '0')}`;
}

function refreshTraySurface(): void {
  if (!tray) return;
  // Tooltip
  if (currentRecording) {
    const elapsed = formatElapsed(Date.now() - currentRecording.startedAt);
    const modeLabel =
      currentRecording.mode === 'live' ? '라이브' : '오프라인 녹음';
    const stateLabel = currentRecording.isPaused ? '일시정지' : modeLabel;
    const title = currentRecording.noteTitle ?? 'Untitled';
    tray.setToolTip(`Tiro — ${stateLabel} (${title} · ${elapsed})`);
  } else {
    tray.setToolTip('Tiro');
  }

  // Rebuild the context menu so labels (especially elapsed time) refresh.
  tray.setContextMenu(getCurrentTrayMenu());
}

// Re-exported by the tray initialization closure so refresh helpers can
// call into the menu builder without re-creating it on every tick.
let getCurrentTrayMenu: () => Electron.Menu = () => Menu.buildFromTemplate([]);

function startTrayElapsedTicker(): void {
  if (trayElapsedTimer) return;
  trayElapsedTimer = setInterval(() => {
    if (!currentRecording || currentRecording.isPaused) return;
    refreshTraySurface();
  }, 1000);
}

function stopTrayElapsedTicker(): void {
  if (trayElapsedTimer) {
    clearInterval(trayElapsedTimer);
    trayElapsedTimer = null;
  }
}

/**
 * Forward a tray recording-control action to the renderer. The renderer
 * (NoteStreamingContext / OfflineRecordingContext) owns the full lifecycle
 * — STOMP signaling for live, file finalize + S3 upload for offline — so
 * direct `audioCaptureProcess.pause/stop` calls from main would skip those
 * and break data integrity.
 *
 * Behavior:
 * - Main window alive: just `webContents.send`. Window stays in whatever
 *   visibility state it's in (hidden when invoked from a tray menu after
 *   the user closed the window — that's the whole point).
 * - Main window destroyed: re-create it (hidden), then send. The user did
 *   not ask for the window so we don't focus it.
 */
type TrayRecordingAction =
  | 'live:pause'
  | 'live:resume'
  | 'live:stop'
  | 'offline:pause'
  | 'offline:resume'
  | 'offline:stop';

async function dispatchTrayRecordingAction(
  action: TrayRecordingAction,
  reason?: string,
): Promise<void> {
  try {
    if (!mainWindow || mainWindow.isDestroyed()) {
      mainWindow = await createAndSetupMainWindow();
    }
    if (!mainWindow.webContents || mainWindow.webContents.isDestroyed()) {
      log.warn(`[Tray] Cannot dispatch ${action} — webContents unavailable`);
      return;
    }
    // `reason` is optional: tray-menu pauses send none (the renderer falls back
    // to its own default), meeting-end pauses tag it 'MEETING_ENDED' so the
    // server can attribute them.
    mainWindow.webContents.send(`tray:${action}`, reason);
  } catch (err) {
    log.error(`[Tray] Failed to dispatch ${action}:`, err);
  }
}

// Window control handlers
ipcMain.handle('windows:minimize', () => {
  const win = BrowserWindow.getFocusedWindow();
  if (win) win.minimize();
});

ipcMain.handle('windows:maximize', () => {
  const win = BrowserWindow.getFocusedWindow();
  if (win) win.maximize();
});

ipcMain.handle('windows:restore', () => {
  const win = BrowserWindow.getFocusedWindow();
  if (win) win.restore();
});

ipcMain.handle('windows:close', () => {
  const win = BrowserWindow.getFocusedWindow();
  if (win) win.close();
});

ipcMain.handle('windows:isMaximized', () => {
  const win = BrowserWindow.getFocusedWindow();
  return win ? win.isMaximized() : false;
});

// Fullscreen handling
ipcMain.handle('mac:isFullScreen', () => {
  const win = BrowserWindow.getFocusedWindow();
  return win ? win.isFullScreen() : false;
});

// ===== Meeting-end detection (mic-release → pause prompt) =====
// The renderer owns the feature flag and all guards; main only polls the
// per-app mic attribution (`@plato-corp/microphone.getMicInputProcesses`,
// >= 1.1.0 — dormant on older versions) and dispatches through existing
// seams. Never touches the audio-capture path.

/**
 * Every pid that belongs to Tiro itself — the Electron main process plus all
 * Electron child processes (renderer/GPU/utility; mic capture lives in a
 * helper). Rebuilt per poll because helper pids churn.
 *
 * The tiro-audio-capture SIDECAR is deliberately not collected here: its
 * ChildProcess handle lives behind AudioCaptureProcess, which meeting-end code
 * must never touch (recording critical path). That is safe — pid exclusion is
 * defense-in-depth, and the sidecar can never map to a call app anyway (its
 * identifier is empty on macOS / 'tiro-audio-capture.exe' on Windows, neither
 * of which is in the call-app map).
 */
const collectTiroPids = (): ReadonlySet<number> => {
  const pids = new Set<number>([process.pid]);
  try {
    for (const metric of app.getAppMetrics()) {
      pids.add(metric.pid);
    }
  } catch (error) {
    // Best-effort: identifier mapping already excludes Tiro's processes.
    log.warn('[meeting-end] app.getAppMetrics failed', error);
  }
  return pids;
};

/**
 * Stop the meeting-end monitor and detach its renderer-lifetime listeners.
 * Single owner for the interval + listener pair so restart/stop/crash paths
 * can never leak either.
 */
let meetingEndMonitorDetach: (() => void) | null = null;
const stopMeetingEndMonitor = () => {
  if (meetingEndMicMonitor) {
    clearInterval(meetingEndMicMonitor);
    meetingEndMicMonitor = null;
  }
  if (meetingEndMonitorDetach) {
    meetingEndMonitorDetach();
    meetingEndMonitorDetach = null;
  }
};

ipcMain.handle('meeting-end:start', (event, payload?: { pollMs?: number }) => {
  stopMeetingEndMonitor();
  // pollMs is validated + clamped inside the monitor (never trust IPC input).
  const pollMs =
    typeof payload?.pollMs === 'number' ? payload.pollMs : undefined;
  meetingEndMicMonitor = startMeetingEndPerAppMonitor(
    (edge) => {
      if (mainWindow && !mainWindow.isDestroyed()) {
        mainWindow.webContents.send('meeting-end:mic-signal', edge);
      }
    },
    { pollMs, getTiroPids: collectTiroPids },
  );
  if (meetingEndMicMonitor !== null) {
    // The renderer's subscription dies with its page (crash/reload/navigation)
    // and nothing would ever call meeting-end:stop — stop polling with it.
    const sender = event.sender;
    const onSenderGone = () => stopMeetingEndMonitor();
    sender.once('render-process-gone', onSenderGone);
    sender.once('destroyed', onSenderGone);
    sender.once('did-navigate', onSenderGone);
    meetingEndMonitorDetach = () => {
      sender.removeListener('render-process-gone', onSenderGone);
      sender.removeListener('destroyed', onSenderGone);
      sender.removeListener('did-navigate', onSenderGone);
    };
  }
  return { started: meetingEndMicMonitor !== null };
});

ipcMain.handle('meeting-end:stop', () => {
  stopMeetingEndMonitor();
});

// The prompt's "Pause" reuses the proven tray pause flow, so it runs the full
// pause (STOMP signaling / file finalize / store update) for whichever mode is
// active — no separate pause path.
ipcMain.handle('meeting-end:request-pause', async () => {
  if (!currentRecording || currentRecording.isPaused) {
    return { paused: false };
  }
  await dispatchTrayRecordingAction(
    currentRecording.mode === 'live' ? 'live:pause' : 'offline:pause',
    'MEETING_ENDED',
  );
  return { paused: true };
});

// Foreground-pop for the prompt. Skips when the window is already visible AND
// focused (no point stealing focus from yourself).
ipcMain.handle('windows:focus', () => {
  if (!mainWindow || mainWindow.isDestroyed()) return { popped: false };
  if (mainWindow.isVisible() && mainWindow.isFocused()) {
    return { popped: false };
  }
  focusWindow(mainWindow, true);
  return { popped: true };
});

// Listen for maximize/unmaximize events
app.on('browser-window-created', (_, window) => {
  window.on('maximize', () => {
    sendWebContents('windows:maximized-changed', true);
  });

  window.on('unmaximize', () => {
    sendWebContents('windows:maximized-changed', false);
  });

  // Add fullscreen change listeners
  window.on('enter-full-screen', () => {
    sendWebContents('mac:fullscreen-changed', true);
  });

  window.on('leave-full-screen', () => {
    sendWebContents('mac:fullscreen-changed', false);
  });
});

/**
 * [macOS, Windows]
 * Sync calendar events from renderer to main process
 */
ipcMain.handle('calendar:sync-events', (_, calendarData: CalendarData) => {
  const manager = getCalendarNotificationManager(
    () => store.get('calendar_notification_enabled', false),
    () => ({
      transcribeLocale: store.get('transcribe_locale'),
      summaryLocale: store.get('summary_locale'),
    }),
  );
  manager.updateCalendarData(calendarData);
  log.info('Calendar events synced to main process');
});

/**
 * [macOS, Windows]
 * Get calendar notification status
 */
ipcMain.handle('calendar:get-notification-status', () => {
  const manager = getCalendarNotificationManager(() =>
    store.get('calendar_notification_enabled', false),
  );
  return manager.getStatus();
});

/**
 * [macOS, Windows]
 * Set calendar notification enabled/disabled
 */
ipcMain.handle('calendar:set-notification-enabled', (_, enabled: boolean) => {
  store.set('calendar_notification_enabled', enabled);
  const manager = getCalendarNotificationManager(() =>
    store.get('calendar_notification_enabled', false),
  );
  manager.setNotificationEnabled(enabled);
  log.info(`Calendar notification ${enabled ? 'enabled' : 'disabled'}`);
});

/**
 * [macOS, Windows]
 * Get calendar notification enabled/disabled setting
 */
ipcMain.handle('calendar:get-notification-enabled', () => {
  return store.get('calendar_notification_enabled', false); // Default to false
});

/**
 * [macOS, Windows]
 * Get mic detection notification enabled/disabled setting
 */
ipcMain.handle('mic-detection:get-notification-enabled', () => {
  return store.get('mic_detection_notification_enabled', true); // default to true
});

/**
 * [macOS, Windows]
 * Set mic detection notification enabled/disabled
 */
ipcMain.handle(
  'mic-detection:set-notification-enabled',
  (_, enabled: boolean) => {
    store.set('mic_detection_notification_enabled', enabled);
    log.info(`Mic detection notification ${enabled ? 'enabled' : 'disabled'}`);
  },
);

/**
 * [macOS, Windows]
 * Set Tiro's microphone usage state
 * Called when Tiro starts/stops using microphone
 */
ipcMain.on('mic-detection:set-tiro-mic-state', (_, isUsing: boolean) => {
  setIsTiroUsingMic(isUsing);

  try {
    // eslint-disable-next-line @typescript-eslint/no-require-imports
    const microphone = require('@plato-corp/microphone');

    if (isUsing) {
      if (typeof microphone?.startTiroSession === 'function') {
        microphone.startTiroSession();
        log.info('Tiro microphone session started');
      } else {
        log.warn('startTiroSession function not available');
      }
    } else {
      if (typeof microphone?.stopTiroSession === 'function') {
        microphone.stopTiroSession();
        log.info('Tiro microphone session stopped');
      } else {
        log.warn('stopTiroSession function not available');
      }
    }
  } catch (error) {
    log.error('Failed to set Tiro microphone state:', error);
  }
});

/**
 * [macOS, Windows]
 * Handle notification action button clicks
 */
ipcMain.handle(
  'notification:action-clicked',
  (
    event,
    locales?: { transcribeLocale?: unknown; summaryLocale?: unknown },
  ) => {
    const callbackUrl = resolveNotificationActionUrl(event.sender, locales);
    if (callbackUrl) handleDeepLink(callbackUrl);
  },
);

// The calendar notification is a transparent, always-on-top window whose bounds
// are larger than its visible card (right-aligned content + slide-in margin).
// It defaults to click-through (setIgnoreMouseEvents(true, { forward: true }))
// so clicks over the transparent area reach the window underneath (e.g. the
// main window's play / end-recording controls). The notification's own card
// toggles this off on hover (mouseenter) and back on (mouseleave) so its
// buttons/selectors stay interactive. Without this the transparent overhang
// swallowed clicks meant for the main window (Windows: bottom-right overlap).
ipcMain.on('notification:set-ignore-mouse', (event, ignore: boolean) => {
  const win = BrowserWindow.fromWebContents(event.sender);
  if (!win || win.isDestroyed()) return;
  win.setIgnoreMouseEvents(!!ignore, { forward: true });
});

/**
 * [macOS, Windows]
 * Zoom in
 */
ipcMain.handle('zoom:in', () => {
  const focusedWindow = BrowserWindow.getFocusedWindow();
  if (!focusedWindow) return;

  const currentZoom = focusedWindow.webContents.getZoomFactor();
  const newZoom = Math.min(currentZoom + 0.1, 1.5); // Max 150%
  focusedWindow.webContents.setZoomFactor(newZoom);

  return newZoom;
});

/**
 * [macOS, Windows]
 * Zoom out
 */
ipcMain.handle('zoom:out', () => {
  const focusedWindow = BrowserWindow.getFocusedWindow();
  if (!focusedWindow) return;

  const currentZoom = focusedWindow.webContents.getZoomFactor();
  const newZoom = Math.max(currentZoom - 0.1, 0.75); // Min 75%
  focusedWindow.webContents.setZoomFactor(newZoom);

  return newZoom;
});

/**
 * [macOS, Windows]
 * Reset zoom to default (100%)
 */
ipcMain.handle('zoom:reset', () => {
  const focusedWindow = BrowserWindow.getFocusedWindow();
  if (!focusedWindow) return;

  focusedWindow.webContents.setZoomFactor(1.0);

  return 1.0;
});

/**
 * [macOS, Windows]
 * Get current zoom level
 */
ipcMain.handle('zoom:get-level', () => {
  const focusedWindow = BrowserWindow.getFocusedWindow();
  if (!focusedWindow) return 1.0;

  return focusedWindow.webContents.getZoomFactor();
});

/**
 * [macOS, Windows]
 * Set zoom level
 */
ipcMain.handle('zoom:set-level', (_, zoomLevel: number) => {
  const focusedWindow = BrowserWindow.getFocusedWindow();
  if (!focusedWindow) return;

  const clampedZoom = Math.max(0.5, Math.min(zoomLevel, 1.5));
  focusedWindow.webContents.setZoomFactor(clampedZoom);

  return clampedZoom;
});

const isLocalAudioDeletionEnforced = () =>
  isLocalAudioDeletionEnforcedIn(store);

ipcMain.handle(
  'security-policy:update',
  (_, policy: { deleteLocalAudioAfterProcessing?: boolean }) => {
    const { applied, previous, next } = applySecurityPolicyUpdate(
      store,
      policy,
    );
    if (applied && previous !== next) {
      // 원격 감사 증적 — 로컬 로그만 남기면 피감사자 기기에서 지워질 수 있다.
      forwardLogToDatadog(
        'info',
        '[SecurityPolicy] deleteLocalAudioAfterProcessing changed',
        { previous, next },
      );
    }
  },
);

ipcMain.handle('security-policy:clear', () => {
  // enforcement 해제도 전환이다 — update 경로와 동일하게 원격 증적을 남긴다
  if (isLocalAudioDeletionEnforced()) {
    forwardLogToDatadog(
      'info',
      '[SecurityPolicy] deleteLocalAudioAfterProcessing cleared on logout',
      { previous: true },
    );
  }
  clearSecurityPolicy(store);
});

/**
 * [macOS, Windows]
 * Audio Recording: Start recording
 */
ipcMain.handle(
  'audio-recording:start',
  async (
    _,
    {
      noteId,
      noteGuid,
      noteCreatedAt,
      sampleRate,
    }: {
      noteId: number;
      noteGuid: string;
      noteCreatedAt: string;
      sampleRate: number;
    },
  ) => {
    // 정책 org 는 실시간 녹음의 로컬 저장 자체를 만들지 않는다 — 파일이 없으면 삭제·반출 대상도 없다.
    if (isLocalAudioDeletionEnforced()) {
      forwardLogToDatadog(
        'info',
        '[SecurityPolicy] audio recording start blocked',
        { noteGuid },
      );
      return { success: false, error: 'blocked_by_security_policy' };
    }
    try {
      const filePath = await audioRecordingManager.startRecording(
        noteId,
        noteGuid,
        noteCreatedAt,
        sampleRate,
      );
      log.info('Audio recording started:', filePath);
      return { success: true, filePath };
    } catch (error) {
      log.error('Failed to start audio recording:', error);
      return {
        success: false,
        error: error instanceof Error ? error.message : 'Unknown error',
      };
    }
  },
);

/**
 * [macOS, Windows]
 * Audio Recording: Append audio data
 */
ipcMain.on(
  'audio-recording:append',
  (_, { noteGuid, audioData }: { noteGuid: string; audioData: Uint8Array }) => {
    audioRecordingManager.appendAudioData(noteGuid, audioData);
  },
);

/**
 * [macOS, Windows]
 * Audio Recording: Pause recording
 */
ipcMain.handle('audio-recording:pause', async (_, noteGuid: string) => {
  try {
    await audioRecordingManager.pauseRecording(noteGuid);
    log.info('Audio recording paused:', noteGuid);
    return { success: true };
  } catch (error) {
    log.error('Failed to pause audio recording:', error);
    return {
      success: false,
      error: error instanceof Error ? error.message : 'Unknown error',
    };
  }
});

/**
 * [macOS, Windows]
 * Audio Recording: Stop recording
 */
ipcMain.handle('audio-recording:stop', async (_, noteGuid: string) => {
  try {
    const result = await audioRecordingManager.stopRecording(noteGuid);
    log.info('Audio recording stopped:', result);
    return result;
  } catch (error) {
    log.error('Failed to stop audio recording:', error);
    throw error;
  }
});

/**
 * [macOS, Windows]
 * Audio Recording: Set save path
 */
ipcMain.handle('audio-recording:set-save-path', async () => {
  if (isLocalAudioDeletionEnforced()) {
    log.info('Audio recording set-save-path blocked by security policy');
    return null;
  }
  log.info('Audio recording save path set');
  const result = await dialog.showOpenDialog({
    title: 'Select Audio Recording Save Location',
    properties: ['openDirectory', 'createDirectory'],
  });

  if (result.canceled) {
    return null;
  }

  const savePath = result.filePaths[0];
  store.set('audio_recording_path', savePath);
  log.info('Audio recording save path set to:', savePath);

  return savePath;
});

/**
 * [macOS, Windows]
 * Audio Recording: Get save path
 */
ipcMain.handle('audio-recording:get-save-path', () => {
  log.info('Audio recording save path get');
  return store.get('audio_recording_path') || null;
});

/**
 * [macOS, Windows]
 * Audio Recording: Open file in Finder/Explorer
 */
ipcMain.handle('audio-recording:open-file', (_, filePath: string) => {
  if (isLocalAudioDeletionEnforced()) {
    log.info('Audio recording open-file blocked by security policy');
    return;
  }
  shell.showItemInFolder(filePath);
});

/**
 * [macOS, Windows]
 * Audio Recording: Get all recordings metadata
 */
ipcMain.handle('audio-recording:get-recordings', () => {
  log.info('Audio recording recordings get');
  return audioRecordingManager.getRecordingsMetadata();
});

/**
 * [macOS, Windows]
 * Audio Recording: Get recording enabled flag
 */
ipcMain.handle('audio-recording:get-enabled', () => {
  if (isLocalAudioDeletionEnforced()) return false;
  return store.get('audio_recording_enabled', false); // Default to false
});

/**
 * [macOS, Windows]
 * Audio Recording: Set recording enabled flag
 */
ipcMain.handle('audio-recording:set-enabled', (_, enabled: boolean) => {
  store.set('audio_recording_enabled', enabled);
  log.info(`Audio recording ${enabled ? 'enabled' : 'disabled'}`);
});

/**
 * [macOS, Windows]
 * Audio Recording: Check if recording exists for note
 */
ipcMain.handle('audio-recording:has-recording', async (_, noteGuid: string) => {
  // Check if there's an active recording session
  const status = audioRecordingManager.getRecordingStatus(noteGuid);
  if (status.isRecording) return true;

  // Check if file exists in directory (handles app restarts)
  const fileInfo = await audioRecordingManager.findRecordingFile(noteGuid);
  return !!fileInfo;
});

/**
 * [macOS, Windows]
 * Audio Recording: Download recording file
 */
ipcMain.handle('audio-recording:download-file', async (_, noteGuid: string) => {
  if (isLocalAudioDeletionEnforced()) {
    forwardLogToDatadog(
      'info',
      '[SecurityPolicy] audio recording download blocked',
      { noteGuid },
    );
    return { success: false, error: 'blocked_by_security_policy' };
  }
  let tempFilePath: string | null = null;

  try {
    // First check if there's an active recording session
    const status = audioRecordingManager.getRecordingStatus(noteGuid);
    let sourceFilePath: string | null = null;

    if (status.isRecording && status.filePath) {
      // Active session exists - use the temporary file being written to
      log.info(
        `Active recording session found for ${noteGuid}, using temp file`,
      );

      // Get the temp file path from the session
      // The session's filePath is the final .wav path, temp file is .tmp
      const tempFile = status.filePath.replace('.wav', '.tmp');

      // Verify temp file exists
      try {
        await fs.access(tempFile);

        // Create a temporary copy for download with updated header
        const tempWavPath = tempFile.replace('.tmp', '-download.wav');
        tempFilePath = tempWavPath;

        // Copy .tmp to temporary .wav
        await fs.copyFile(tempFile, tempWavPath);

        // Get file size to calculate data size
        const stats = await fs.stat(tempWavPath);
        const dataSize = stats.size - 44; // Subtract WAV header size

        // Update WAV header with correct size
        const fileHandle = await fs.open(tempWavPath, 'r+');
        try {
          const headerBuffer = Buffer.alloc(44);
          await fileHandle.read(headerBuffer, 0, 44, 0);

          // Update header
          const view = new DataView(headerBuffer.buffer);
          view.setUint32(4, dataSize + 36, true); // File size - 8
          view.setUint32(40, dataSize, true); // Data size

          await fileHandle.write(headerBuffer, 0, 44, 0);
        } finally {
          await fileHandle.close();
        }

        sourceFilePath = tempWavPath;
        log.info(
          `Created temporary wav file for active session download: ${tempWavPath}`,
        );
      } catch {
        log.warn(
          `Temp file not found for active session, falling back to file search`,
        );
        // Fall through to file search below
      }
    }

    // If no active session or temp file not found, search for existing file
    if (!sourceFilePath) {
      const fileInfo = await audioRecordingManager.findRecordingFile(noteGuid);

      if (!fileInfo) {
        return { success: false, error: 'Recording not found' };
      }

      sourceFilePath = fileInfo.filePath;

      // If it's a .tmp file, convert to .wav for download
      if (fileInfo.isTemp) {
        const tempWavPath = fileInfo.filePath.replace('.tmp', '-download.wav');
        tempFilePath = tempWavPath;

        // Copy .tmp to temporary .wav
        await fs.copyFile(fileInfo.filePath, tempWavPath);

        // Get file size to calculate data size
        const stats = await fs.stat(tempWavPath);
        const dataSize = stats.size - 44; // Subtract WAV header size

        // Update WAV header with correct size
        const fileHandle = await fs.open(tempWavPath, 'r+');
        try {
          const headerBuffer = Buffer.alloc(44);
          await fileHandle.read(headerBuffer, 0, 44, 0);

          // Update header
          const view = new DataView(headerBuffer.buffer);
          view.setUint32(4, dataSize + 36, true); // File size - 8
          view.setUint32(40, dataSize, true); // Data size

          await fileHandle.write(headerBuffer, 0, 44, 0);
        } finally {
          await fileHandle.close();
        }

        sourceFilePath = tempWavPath;
        log.info(`Created temporary wav file for download: ${tempWavPath}`);
      }
    }

    // Get original file name
    const originalFileName = path
      .basename(sourceFilePath)
      .replace('-download', '');

    // Show save dialog
    const result = await dialog.showSaveDialog(mainWindow, {
      title: 'Download Audio Recording',
      defaultPath: originalFileName,
      filters: [
        { name: 'Audio Files', extensions: ['wav', 'mp3', 'm4a'] },
        { name: 'All Files', extensions: ['*'] },
      ],
    });

    if (result.canceled) {
      // Clean up temp file
      if (tempFilePath) {
        await fs.unlink(tempFilePath).catch(() => {});
      }
      return { success: false, error: 'User canceled' };
    }

    // Copy file to selected location
    await fs.copyFile(sourceFilePath, result.filePath);

    // Clean up temp file
    if (tempFilePath) {
      await fs.unlink(tempFilePath).catch(() => {});
    }

    log.info(`Audio recording downloaded: ${result.filePath}`);
    return { success: true };
  } catch (error) {
    log.error('Audio recording download error:', error);

    // Clean up temp file on error
    if (tempFilePath) {
      await fs.unlink(tempFilePath).catch(() => {});
    }

    return {
      success: false,
      error: error instanceof Error ? error.message : 'Unknown error',
    };
  }
});

/**
 * [macOS, Windows]
 * Overlay: Handle overlay click
 */
ipcMain.handle('overlay:clicked', async (event) => {
  // Only the overlay window may trigger this.
  if (event.sender !== overlayWindowService.getWindow()?.webContents) return;
  if (mainWindow && !mainWindow.isDestroyed()) {
    if (mainWindow.isMinimized()) {
      mainWindow.restore();
    }
    mainWindow.show();
    mainWindow.focus();

    // Hide overlay when main window is focused
    console.info('Overlay clicked: hiding overlay');
    overlayWindowService.hide();

    // Navigate to the recording note if noteId exists
    const noteId = overlayWindowService.getCurrentNoteId();
    if (noteId) {
      log.info(`Overlay clicked: navigating to note ${noteId}`);
      sendWebContents('overlay:navigate-to-note', { noteId });
    }

    return { success: true };
  }
  return { success: false };
});

/**
 * [macOS, Windows]
 * Overlay: Set recording state
 */
ipcMain.handle(
  'overlay:set-recording-state',
  (_, isRecording: boolean, noteId?: number) => {
    log.info(
      `Setting overlay recording state: ${isRecording}, noteId: ${noteId}`,
    );
    overlayWindowService.setRecordingState(isRecording, noteId);

    // Keep the renderer unthrottled only while recording so background
    // capture/streaming (Web Audio, websocket flush timers) isn't paused when
    // the window is hidden. When not recording, allow throttling so an idle
    // hidden window stops burning CPU.
    if (mainWindow && !mainWindow.isDestroyed()) {
      mainWindow.webContents.setBackgroundThrottling(!isRecording);
    }

    // Show overlay if recording and main window is not focused
    if (isRecording && mainWindow && !mainWindow.isFocused()) {
      overlayWindowService.show();
    }

    return { success: true };
  },
);

/**
 * [macOS, Windows]
 * Overlay: Update audio level for waveform visualization
 */
ipcMain.handle('overlay:update-audio-level', (_, level: number) => {
  overlayWindowService.updateAudioLevel(level);
});

/**
 * [macOS, Windows]
 * Overlay: Set enabled state
 */
ipcMain.handle('overlay:set-enabled', async (_, enabled: boolean) => {
  try {
    log.info(`Setting overlay enabled state: ${enabled}`);
    store.set('overlay_enabled', enabled);

    // If disabled, hide overlay immediately
    if (!enabled) {
      overlayWindowService.hide();
    }

    return { success: true };
  } catch (error) {
    log.error('Failed to set overlay enabled state:', error);
    return { success: false, error: (error as Error).message };
  }
});

/**
 * [macOS, Windows]
 * Overlay: Get enabled state
 */
ipcMain.handle('overlay:get-enabled', async () => {
  try {
    const enabled = store.get('overlay_enabled', true) as boolean;
    log.info(`Getting overlay enabled state: ${enabled}`);
    return enabled;
  } catch (error) {
    log.error('Failed to get overlay enabled state:', error);
    return true; // Return default value on error
  }
});

// ============================================================================
// Offline Recording IPC Handlers
// ============================================================================

/**
 * [macOS, Windows]
 * Offline Recording: Start recording for a note
 */
ipcMain.handle(
  'offline-recording:start',
  async (
    _,
    params: {
      noteId: number;
      noteGuid: string;
      noteCreatedAt: string;
      sessionId: string;
      sampleRate: number;
    },
  ) => {
    let startedFilePath: string | null = null;

    try {
      startedFilePath = await audioRecordingManager.startRecording(
        params.noteId,
        params.noteGuid,
        params.noteCreatedAt,
        params.sampleRate,
        { freshRecordingId: params.sessionId },
      );

      // Persist session for recovery
      offlineRecordingPersistence.saveSessionOrThrow({
        id: params.sessionId,
        noteId: params.noteId,
        noteGuid: params.noteGuid,
        filePath: startedFilePath,
        startedAt: new Date().toISOString(),
        accumulatedDuration: 0,
        status: 'recording',
      });

      log.info('Offline recording started:', startedFilePath);
      return { success: true, filePath: startedFilePath };
    } catch (error) {
      const activeRecording = audioRecordingManager.getRecordingStatus(
        params.noteGuid,
      );
      if (
        startedFilePath !== null &&
        activeRecording.filePath === startedFilePath &&
        activeRecording.dataSize === 0
      ) {
        await audioRecordingManager.discardRecording(params.noteGuid);
      }
      log.error('Failed to start offline recording:', error);
      return {
        success: false,
        error: error instanceof Error ? error.message : 'Unknown error',
      };
    }
  },
);

/**
 * [macOS, Windows]
 * Offline Recording: Append audio data
 */
ipcMain.on(
  'offline-recording:append',
  (_, { noteGuid, audioData }: { noteGuid: string; audioData: Uint8Array }) => {
    audioRecordingManager.appendAudioData(noteGuid, audioData);
  },
);

/**
 * [macOS, Windows]
 * Offline Recording: Pause recording
 */
ipcMain.handle(
  'offline-recording:pause',
  async (
    _,
    { noteGuid, sessionId }: { noteGuid: string; sessionId: string },
  ) => {
    try {
      await audioRecordingManager.pauseRecording(noteGuid);

      // Update session status
      offlineRecordingPersistence.updateSessionStatus(sessionId, 'paused');

      log.info('Offline recording paused:', noteGuid);
      return { success: true };
    } catch (error) {
      log.error('Failed to pause offline recording:', error);
      return {
        success: false,
        error: error instanceof Error ? error.message : 'Unknown error',
      };
    }
  },
);

/**
 * [macOS, Windows]
 * Offline Recording: Resume recording
 */
ipcMain.handle(
  'offline-recording:resume',
  async (
    _,
    params: {
      noteId: number;
      noteGuid: string;
      noteCreatedAt: string;
      sessionId: string;
      sampleRate: number;
    },
  ) => {
    try {
      if (
        !audioRecordingManager.getRecordingStatus(params.noteGuid).isRecording
      ) {
        return {
          success: false,
          error: 'Recording session is not active',
        };
      }

      const filePath = await audioRecordingManager.startRecording(
        params.noteId,
        params.noteGuid,
        params.noteCreatedAt,
        params.sampleRate,
      );

      // Update session status
      offlineRecordingPersistence.updateSessionStatus(
        params.sessionId,
        'recording',
      );

      log.info('Offline recording resumed:', filePath);
      return { success: true, filePath };
    } catch (error) {
      log.error('Failed to resume offline recording:', error);
      return {
        success: false,
        error: error instanceof Error ? error.message : 'Unknown error',
      };
    }
  },
);

/**
 * [macOS, Windows]
 * Offline Recording: Stop recording
 */
ipcMain.handle(
  'offline-recording:stop',
  async (
    _,
    { noteGuid, sessionId }: { noteGuid: string; sessionId: string },
  ) => {
    const result = await stopOfflineRecording({ noteGuid, sessionId });
    if (result.success === false) {
      log.error('Failed to stop offline recording:', result.error);
      return result;
    }

    log.info('Offline recording stopped:', result);
    return result;
  },
);

/**
 * [macOS, Windows]
 * Offline Recording: Get file buffer for upload
 */
ipcMain.handle('offline-recording:get-file', async (_, filePath: string) => {
  try {
    const buffer = await offlineRecordingPersistence.getFileBuffer(filePath);
    if (!buffer) {
      return { success: false, error: 'File not found' };
    }
    return { success: true, buffer: buffer.toString('base64') };
  } catch (error) {
    log.error('Failed to get offline recording file:', error);
    return {
      success: false,
      error: error instanceof Error ? error.message : 'Unknown error',
    };
  }
});

/**
 * [macOS, Windows]
 * Offline Recording: Save a playable file without renderer byte transfer
 */
ipcMain.handle('offline-recording:save-file', async (_, params: unknown) => {
  if (!params || typeof params !== 'object') {
    return { success: false, error: 'Invalid parameters' };
  }
  const { filePath, destinationPath } = params as Record<string, unknown>;
  if (
    typeof filePath !== 'string' ||
    typeof destinationPath !== 'string' ||
    !consumeApprovedDialogPath(destinationPath)
  ) {
    return { success: false, error: 'Unauthorized file path' };
  }
  return offlineRecordingPersistence.saveFile(filePath, destinationPath);
});

ipcMain.handle(
  'offline-recording:get-upload-file-size',
  async (_, sessionId: string) => {
    try {
      const size =
        await offlineRecordingPersistence.getUploadFileSize(sessionId);
      if (size === null) {
        return { success: false, error: 'Session or file not found' };
      }
      return { success: true, size };
    } catch (error) {
      log.error('Failed to get offline recording upload file size:', error);
      return {
        success: false,
        error: error instanceof Error ? error.message : 'Unknown error',
      };
    }
  },
);

/**
 * [macOS, Windows]
 * Offline Recording: Stream a persisted recording to its upload URL
 */
ipcMain.handle(
  'offline-recording:upload-file',
  async (
    _,
    params: {
      sessionId: string;
      partSize: number;
      uploadParts: Array<{ partNumber: number; uploadUrl: string }>;
    },
  ) => {
    try {
      const result = await offlineRecordingPersistence.uploadFile(
        params.sessionId,
        params.partSize,
        params.uploadParts,
      );
      if (result === null) {
        return { success: false, error: 'Session or file not found' };
      }
      if (result.success === false) {
        return {
          success: false,
          status: result.status,
          error: 'Failed to upload recording part',
        };
      }
      return result;
    } catch (error) {
      log.error('Failed to upload offline recording file:', error);
      return {
        success: false,
        error: error instanceof Error ? error.message : 'Unknown error',
      };
    }
  },
);

/**
 * [macOS, Windows]
 * Offline Recording: List unfinished temp recordings without modifying them
 */
ipcMain.handle('offline-recording:list-temp-files', async () => {
  try {
    const files = await offlineRecordingPersistence.listTempRecordings(() =>
      audioRecordingManager.getActiveRecordingFilePaths(),
    );
    return { success: true, files };
  } catch (error) {
    log.error('Failed to list offline temp recordings:', error);
    return {
      success: false,
      files: [],
      error: error instanceof Error ? error.message : 'Unknown error',
    };
  }
});

/**
 * [macOS, Windows]
 * Offline Recording: Delete local file
 */
ipcMain.handle(
  'offline-recording:delete-file',
  async (_, filePath: string, origin: DeleteFileOrigin = 'user') => {
    try {
      const outcome = await offlineRecordingPersistence.deleteFile(
        filePath,
        () => audioRecordingManager.getActiveRecordingFilePaths(),
        origin,
      );
      if (
        (outcome === 'failed' || outcome === 'rejected') &&
        origin === 'policy-cleanup'
      ) {
        // 감사 대상 기기의 로컬 로그는 지워질 수 있어 원격으로 남긴다 — 정책상 사라져야 할
        // 평문 음성이 남았다는 뜻이므로, 정책 전환 로그보다 오히려 더 중요한 이벤트다.
        forwardLogToDatadog(
          'warn',
          '[SecurityPolicy] local audio cleanup failed',
          { outcome },
        );
      }
      return {
        success: outcome !== 'failed' && outcome !== 'rejected',
        outcome,
      };
    } catch (error) {
      log.error('Failed to delete offline recording file:', error);
      return {
        success: false,
        error: error instanceof Error ? error.message : 'Unknown error',
      };
    }
  },
);

/**
 * [macOS, Windows]
 * Offline Recording: Get pending sessions for recovery
 */
ipcMain.handle('offline-recording:get-pending-sessions', async () => {
  try {
    // Use async method that calculates duration from file if needed
    const sessions =
      await offlineRecordingPersistence.getPendingSessionsWithDuration();
    return { success: true, sessions };
  } catch (error) {
    log.error('Failed to get pending sessions:', error);
    return {
      success: false,
      error: error instanceof Error ? error.message : 'Unknown error',
      sessions: [],
    };
  }
});

/**
 * [macOS, Windows]
 * Offline Recording: Cleanup completed and invalid sessions
 */
ipcMain.handle('offline-recording:cleanup-sessions', async () => {
  try {
    const result = await offlineRecordingPersistence.cleanupCompletedSessions();
    return { success: true, ...result };
  } catch (error) {
    log.error('Failed to cleanup sessions:', error);
    return {
      success: false,
      error: error instanceof Error ? error.message : 'Unknown error',
      removedCount: 0,
      removedSessionIds: [],
    };
  }
});

/**
 * [macOS, Windows]
 * Offline Recording: Clear a pending session
 */
ipcMain.handle(
  'offline-recording:clear-pending-session',
  async (_, sessionId: string) => {
    try {
      const session = offlineRecordingPersistence.getSession(sessionId);
      if (session) {
        const activeRecording = audioRecordingManager.getRecordingStatus(
          session.noteGuid,
        );
        if (activeRecording.isRecording) {
          if (activeRecording.dataSize > 0) {
            throw new Error('Cannot discard a recording with captured audio');
          }
          await audioRecordingManager.discardRecording(session.noteGuid);
        }
      }
      offlineRecordingPersistence.removeSession(sessionId);
      return { success: true };
    } catch (error) {
      log.error('Failed to clear pending session:', error);
      return {
        success: false,
        error: error instanceof Error ? error.message : 'Unknown error',
      };
    }
  },
);

/**
 * [macOS, Windows]
 * Offline Recording: Update session status
 */
ipcMain.handle(
  'offline-recording:update-session-status',
  async (
    _,
    {
      sessionId,
      status,
      additionalData,
    }: {
      sessionId: string;
      status:
        | 'recording'
        | 'paused'
        | 'completed'
        | 'upload_pending'
        | 'uploading'
        | 'upload_failed';
      additionalData?: Partial<PersistedOfflineRecordingSession>;
    },
  ) => {
    try {
      if (status === 'uploading') {
        offlineRecordingPersistence.updateSessionStatusOrThrow(
          sessionId,
          status,
          additionalData,
        );
      } else {
        offlineRecordingPersistence.updateSessionStatus(
          sessionId,
          status,
          additionalData,
        );
      }
      return { success: true };
    } catch (error) {
      log.error('Failed to update session status:', error);
      return {
        success: false,
        error: error instanceof Error ? error.message : 'Unknown error',
      };
    }
  },
);

/**
 * [macOS, Windows]
 * Offline Recording: Get settings
 */
ipcMain.handle('offline-recording:get-settings', async () => {
  try {
    const settings = offlineRecordingPersistence.getSettings();
    return {
      success: true,
      settings: composeDeleteAfterUpload(
        settings,
        isLocalAudioDeletionEnforced(),
      ),
    };
  } catch (error) {
    log.error('Failed to get offline recording settings:', error);
    return {
      success: false,
      error: error instanceof Error ? error.message : 'Unknown error',
      settings: { deleteAfterUpload: isLocalAudioDeletionEnforced() },
    };
  }
});

/**
 * [macOS, Windows]
 * Offline Recording: Update settings
 */
ipcMain.handle(
  'offline-recording:update-settings',
  async (_, settings: Partial<OfflineRecordingSettings>) => {
    try {
      offlineRecordingPersistence.updateSettings(settings);
      return { success: true };
    } catch (error) {
      log.error('Failed to update offline recording settings:', error);
      return {
        success: false,
        error: error instanceof Error ? error.message : 'Unknown error',
      };
    }
  },
);

/**
 * [macOS, Windows]
 * Offline Recording: Generate session ID
 */
ipcMain.handle('offline-recording:generate-session-id', async () => {
  return offlineRecordingPersistence.generateSessionId();
});

ipcMain.handle(
  'dialog:show-save-dialog',
  async (
    _,
    options: {
      title?: string;
      defaultPath?: string;
      filters?: Array<{ name: string; extensions: string[] }>;
    },
  ) => {
    const result = await dialog.showSaveDialog(options);
    if (!result.canceled && result.filePath) {
      approveDialogPath(result.filePath);
    }
    return result;
  },
);

ipcMain.handle(
  'dialog:show-open-dialog',
  async (
    _,
    options: {
      title?: string;
      defaultPath?: string;
      filters?: Array<{ name: string; extensions: string[] }>;
      properties?: string[];
    },
  ) => {
    const result = await dialog.showOpenDialog(
      options as Parameters<typeof dialog.showOpenDialog>[0],
    );
    if (!result.canceled) {
      approveDialogPaths(result.filePaths);
    }
    return result;
  },
);

ipcMain.handle('fs:write-file', async (_, filePath: string, data: unknown) => {
  if (typeof filePath !== 'string' || !consumeApprovedDialogPath(filePath)) {
    log.warn('Rejected fs:write-file for unauthorized path');
    throw new Error('Unauthorized file path');
  }
  const buffer =
    typeof data === 'string'
      ? Buffer.from(data, 'base64')
      : Buffer.from(data as ArrayBuffer);
  await fs.writeFile(filePath, buffer);
});

ipcMain.handle('fs:read-file', async (_, filePath: string) => {
  if (typeof filePath !== 'string' || !consumeApprovedDialogPath(filePath)) {
    log.warn('Rejected fs:read-file for unauthorized path');
    throw new Error('Unauthorized file path');
  }
  const buffer = await fs.readFile(filePath);
  return buffer;
});
