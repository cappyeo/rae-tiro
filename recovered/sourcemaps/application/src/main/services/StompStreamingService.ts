import { randomUUID } from 'node:crypto';
import { type Agent } from 'node:http';

import {
  Client,
  ReconnectionTimeMode,
  type StompSubscription,
} from '@stomp/stompjs';
import log from 'electron-log';
import WebSocket from 'ws';

import { createProxyAgent } from '@/main/utils/proxyAgent';
import { safeJsonParse } from '@/renderer/utils/json';

// ---------------------------------------------------------------------------
// Types
// ---------------------------------------------------------------------------

export type StompTopic = 'alert' | 'frame' | 'status';

export type SubscriptionMessage = {
  noteId: number;
  topic: StompTopic;
  body: string;
  headers: Record<string, string>;
};

export type ConnectionStatus = {
  noteId: number;
  connected: boolean;
  reason?: 'clean-close' | 'reconnecting' | 'server-going-away';
};

export type StompError = {
  noteId: number;
  type: 'websocket-close' | 'stomp-error' | 'websocket-error' | 'auth-rejected';
  message: string;
  /**
   * Server auth-failure reason for an `auth-rejected` handshake 401, read from
   * the `x-auth-failure-reason` header (SESSION_REVOKED | TOKEN_EXPIRED), or
   * undefined when the header is absent (older server / non-auth path).
   */
  reason?: string;
};

type SendToRenderer = (channel: string, data: unknown) => void;

type GetAuthToken = () => string | undefined;

/** Resolves a PAC-style proxy string for a URL (Electron `session.resolveProxy`). */
type ResolveProxy = (url: string) => Promise<string>;

/** Returns the CA certificates to trust for TLS (OS store + bundled roots). */
type GetCaCertificates = () => string[];

/** Reports a connection error to an external monitor (e.g. Sentry). */
type ReportError = (error: Error, context?: Record<string, unknown>) => void;

export type StompNetworkErrorKind =
  | 'abnormal-close'
  | 'broker-closed'
  | 'closed-before-established'
  | 'connection-refused'
  | 'connection-reset'
  | 'dns'
  | 'timeout';

export type StompNetworkErrorObservation = {
  kind: StompNetworkErrorKind;
  source: 'stomp-error' | 'websocket-close' | 'websocket-error';
  code?: string;
};

/**
 * Records every known transient network failure and returns whether this
 * occurrence should also be retained as a sampled Sentry event.
 */
type ObserveNetworkError = (event: StompNetworkErrorObservation) => boolean;

/** Shape of the error surfaced by `ws` / @stomp/stompjs `onWebSocketError`. */
type WebSocketErrorLike = {
  error?: { message?: string; code?: string; stack?: string; syscall?: string };
  message?: string;
  code?: string;
  stack?: string;
  syscall?: string;
};

type RecoveryStage =
  | 'buffering'
  | 'server-going-away'
  | 'connected'
  | 'resume-published'
  | 'resume-publish-failed'
  | 'frame-publish-failed'
  | 'reconnect-failed'
  | 'overflow'
  | 'paused'
  | 'ended'
  | 'drained'
  | 'disconnected';
type RecoveryObservation = {
  stage: RecoveryStage;
  recoveryId: string;
  noteGuid?: string;
  elapsedMs: number;
  pendingFrames: number;
  pendingBytes: number;
  droppedFrames: number;
  droppedBytes: number;
  locallyPublishedBytes: number;
};

type StompConnection = {
  client: Client;
  buffer: { data: Uint8Array; audioLevel: number }[];
  resumePublished: boolean;
  noteGuid?: string;
  recovery?: {
    id: string;
    startedAt: number;
    stages: Set<RecoveryStage>;
    droppedFrames: number;
    droppedBytes: number;
    locallyPublishedBytes: number;
  };
  subscriptions: StompSubscription[];
  isConnected: boolean;
  /** True after the first successful STOMP connection for this note. */
  hasConnectedOnce: boolean;
  /** True after a failed connection attempt until the next successful connect. */
  hasConnectionFailure: boolean;
  /** Last disconnect classification, re-emitted when a renderer is recreated. */
  lastDisconnectReason?: NonNullable<ConnectionStatus['reason']>;
  /**
   * True while the user-intended streaming session is active. This lets the
   * main process auto-resume after reconnect without resuming a manually
   * paused/ended note.
   */
  shouldAutoResume: boolean;
  /**
   * Whether an error has already been reported during the current
   * disconnected streak. Reset on (re)connect so a sustained failure (1s
   * reconnect loop) reports to Sentry once per streak instead of flooding.
   */
  hasReportedError: boolean;
};

const SUBSCRIBE_TOPICS: { topic: StompTopic; destination: string }[] = [
  { topic: 'alert', destination: '/user/sub/alert' },
  { topic: 'frame', destination: '/user/sub/frame' },
  { topic: 'status', destination: '/user/sub/status' },
];

const MAX_FRAME_BUFFER_BYTES = 60 * 16000 * 2; // 60 seconds of 16kHz Int16 PCM

const classifyNetworkError = (
  message: string,
  code?: string,
): StompNetworkErrorKind | null => {
  const normalizedCode = code?.toUpperCase();
  const normalizedMessage = message.toLowerCase();

  if (
    normalizedCode === 'ENOTFOUND' ||
    normalizedCode === 'EAI_AGAIN' ||
    normalizedMessage.includes('getaddrinfo enotfound') ||
    normalizedMessage.includes('getaddrinfo eai_again')
  ) {
    return 'dns';
  }
  if (
    normalizedCode === 'ETIMEDOUT' ||
    normalizedMessage.includes('timed out') ||
    normalizedMessage.includes('timeout')
  ) {
    return 'timeout';
  }
  if (normalizedCode === 'ECONNRESET') return 'connection-reset';
  if (normalizedCode === 'ECONNREFUSED') return 'connection-refused';
  if (
    normalizedMessage.includes(
      'websocket was closed before the connection was established',
    )
  ) {
    return 'closed-before-established';
  }
  if (normalizedMessage.includes('connection to broker closed')) {
    return 'broker-closed';
  }
  return null;
};

// ---------------------------------------------------------------------------
// StompStreamingService
// ---------------------------------------------------------------------------

/**
 * Manages STOMP connections to the streaming server from the main process.
 * One connection per noteId. PCM frames sent via sendFrame; subscription
 * messages forwarded to the renderer via IPC.
 */
export class StompStreamingService {
  private connections = new Map<number, StompConnection>();
  private wsBaseUrl: string;
  private getToken: GetAuthToken;
  private sendToRenderer: SendToRenderer;
  private resolveProxy?: ResolveProxy;
  private getCaCertificates?: GetCaCertificates;
  private reportError?: ReportError;
  private observeNetworkError?: ObserveNetworkError;
  private observeRecovery?: (event: RecoveryObservation) => void;

  constructor(options: {
    wsBaseUrl: string;
    getToken: GetAuthToken;
    sendToRenderer: SendToRenderer;
    /**
     * Resolves the OS/PAC proxy for the WebSocket URL so the Node `ws` socket
     * routes through the same proxy Chromium would. When omitted, no proxy is
     * applied (DIRECT).
     */
    resolveProxy?: ResolveProxy;
    /**
     * Supplies the CA certificates to trust for the TLS handshake, restoring
     * the OS trust store the renderer's browser WebSocket used. When omitted,
     * `ws` falls back to Node's bundled CA bundle.
     */
    getCaCertificates?: GetCaCertificates;
    /**
     * Reports connection errors to an external monitor (e.g. Sentry). Called
     * at most once per disconnected streak per note to avoid flooding.
     */
    reportError?: ReportError;
    /**
     * Receives every known transient network failure for low-cardinality
     * counting and decides whether to keep a Sentry sample.
     */
    observeNetworkError?: ObserveNetworkError;
    observeRecovery?: (event: RecoveryObservation) => void;
  }) {
    this.wsBaseUrl = options.wsBaseUrl;
    this.getToken = options.getToken;
    this.sendToRenderer = options.sendToRenderer;
    this.resolveProxy = options.resolveProxy;
    this.getCaCertificates = options.getCaCertificates;
    this.reportError = options.reportError;
    this.observeNetworkError = options.observeNetworkError;
    this.observeRecovery = options.observeRecovery;
  }

  // ---------------------------------------------------------------------------
  // Public API — Lifecycle
  // ---------------------------------------------------------------------------

  /**
   * Open a STOMP connection for the given note. If a connection already
   * exists, it is left untouched.
   */
  async connect(noteId: number, platform: string): Promise<void> {
    const existing = this.connections.get(noteId);
    if (existing) {
      log.info(`[StompStreaming] Already connected for note ${noteId}`);
      // The renderer client that just called connect() may be a freshly created
      // instance (streaming setup effect re-run / navigation / notification
      // close) whose local `connected` flag starts false. Since the main-side
      // socket is already up, no new `onConnect` will fire to sync it — so
      // re-emit the current status. Without this the renderer's isConnected()
      // stays false forever and onResume retries every 1s (the play button
      // spins indefinitely and recording never starts).
      this.sendToRenderer('stomp:connection-status', {
        noteId,
        connected: existing.isConnected,
        ...(!existing.isConnected &&
        (existing.hasConnectedOnce || existing.hasConnectionFailure)
          ? { reason: existing.lastDisconnectReason ?? 'reconnecting' }
          : {}),
      } satisfies ConnectionStatus);
      return;
    }

    const wsUrl = `${this.wsBaseUrl}/stomp`;
    log.info(
      `[StompStreaming] Connecting note=${noteId} platform=${platform} url=${wsUrl}`,
    );

    const conn: StompConnection = {
      client: null as unknown as Client,
      buffer: [],
      resumePublished: false,
      subscriptions: [],
      isConnected: false,
      hasConnectedOnce: false,
      hasConnectionFailure: false,
      shouldAutoResume: false,
      hasReportedError: false,
    };
    // Register before the async proxy resolution so frames arriving in the
    // meantime are buffered (sendFrame) rather than dropped.
    this.connections.set(noteId, conn);

    // Restore the Chromium-equivalent network trust the renderer's browser
    // WebSocket had: route through the OS/PAC proxy and validate TLS against
    // the OS certificate store. The Node `ws` socket does neither by default,
    // which is why some users (corporate proxy / TLS interception) fail to
    // connect in production.
    let proxyAgent: Agent | undefined;
    if (this.resolveProxy) {
      try {
        const proxyResult = await this.resolveProxy(wsUrl);
        proxyAgent = createProxyAgent(proxyResult);
        log.info(
          `[StompStreaming] Proxy for note=${noteId}: ${proxyResult}${proxyAgent ? ' (agent applied)' : ''}`,
        );
      } catch (e) {
        log.warn(`[StompStreaming] Proxy resolution failed note=${noteId}`, e);
      }
    }

    // If the connection was torn down (disconnect) during proxy resolution,
    // abort instead of resurrecting a stale entry.
    if (this.connections.get(noteId) !== conn) {
      return;
    }

    const ca = this.getCaCertificates?.();

    const client = new Client({
      webSocketFactory: () => {
        const token = this.getToken();
        const headers: Record<string, string> = {};
        if (token) {
          headers.Authorization = `Bearer ${token}`;
        }
        // STOMP subprotocols must be advertised explicitly for ws WebSocket
        // (browser WebSocket negotiates these automatically via @stomp/stompjs;
        // ws does not, causing servers to close with code 1002).
        const protocols = ['v12.stomp', 'v11.stomp', 'v10.stomp'];
        const wsOptions: WebSocket.ClientOptions = { headers };
        if (proxyAgent) {
          wsOptions.agent = proxyAgent;
        }
        if (ca) {
          wsOptions.ca = ca;
        }
        const socket = new WebSocket(wsUrl, protocols, wsOptions);
        // ws exposes the handshake HTTP status (browsers cannot): a 401 here
        // means the token was revoked server-side (PLT-4333). Stop the
        // reconnect loop and hand the session-expired flow to the renderer.
        socket.on('unexpected-response', (req, res) => {
          if (res.statusCode === 401) {
            // 서버가 핸드셰이크 401 에 사유를 헤더로 실어 보낸다 (PLT-4333):
            // SESSION_REVOKED(원격 로그아웃/비번 변경) vs TOKEN_EXPIRED. 클라는
            // 이 사유로 녹음 중지 안내 문구를 차등한다. 헤더가 없으면 undefined.
            const reasonHeader = res.headers['x-auth-failure-reason'];
            const reason = Array.isArray(reasonHeader)
              ? reasonHeader[0]
              : reasonHeader;
            log.warn(
              `[StompStreaming] Handshake rejected with 401 note=${noteId} reason=${reason ?? 'UNKNOWN'} — stopping reconnect`,
            );
            this.sendToRenderer('stomp:error', {
              noteId,
              type: 'auth-rejected',
              message: 'WebSocket handshake rejected with 401',
              reason,
            } satisfies StompError);
            this.disconnect(noteId);
            return;
          }
          // Registering this listener suppresses ws's default abortHandshake
          // for ALL non-101 responses — restore it for non-auth failures
          // (e.g. an LB 503 during deploy) so the socket errors out and
          // stompjs schedules a backoff reconnect instead of hanging in
          // CONNECTING forever.
          req.destroy(
            new Error(`Unexpected server response: ${res.statusCode}`),
          );
        });
        return socket as unknown as WebSocket;
      },
      connectHeaders: (() => {
        const token = this.getToken();
        const headers: Record<string, string> = {
          'x-note-id': String(noteId),
          'x-platform': platform,
        };
        if (token) {
          headers.Authorization = `Bearer ${token}`;
        }
        return headers;
      })(),
      reconnectDelay: 1000,
      // 1초 고정 무한 재연결은 revoke된 토큰과 결합하면 핸드셰이크 폭주가
      // 된다 (PLT-4333) — 지수 백오프로 완화.
      reconnectTimeMode: ReconnectionTimeMode.EXPONENTIAL,
      maxReconnectDelay: 30000,
      heartbeatOutgoing: 5000,
      heartbeatIncoming: 0,
      debug: () => {
        // suppress @stomp/stompjs internal logs
      },
    });

    client.onConnect = () => {
      if (this.connections.get(noteId) !== conn) return;
      conn.resumePublished = false;
      conn.hasConnectedOnce = true;
      conn.hasConnectionFailure = false;
      conn.lastDisconnectReason = undefined;
      log.info(`[StompStreaming] Connected note=${noteId}`);
      conn.isConnected = true;
      if (conn.recovery) this.observe(conn, 'connected');
      // A successful connect ends the failure streak: allow the next error to
      // be reported again.
      conn.hasReportedError = false;

      // Subscribe to the three server topics
      conn.subscriptions = SUBSCRIBE_TOPICS.map(({ topic, destination }) =>
        client.subscribe(destination, (message) => {
          const alert =
            topic === 'alert'
              ? safeJsonParse<{
                  type?: string;
                  payload?: { shouldReconnect?: boolean };
                }>(message.body, null, 'StompStreamingService.alert')
              : null;
          const isCurrentNote = message.headers.noteId === String(noteId);

          if (
            isCurrentNote &&
            alert?.type === 'TRANSCRIPTION_CONNECTION_CLOSED' &&
            alert.payload?.shouldReconnect === false
          ) {
            conn.shouldAutoResume = false;
            conn.resumePublished = false;
          }

          if (isCurrentNote && alert?.type === 'SERVER_GOING_AWAY') {
            this.observe(conn, 'server-going-away');
            this.reconnect(noteId, conn, 'server-going-away');
            return;
          }

          const payload: SubscriptionMessage = {
            noteId,
            topic,
            body: message.body,
            headers: message.headers as Record<string, string>,
          };
          this.sendToRenderer('stomp:subscription-message', payload);
        }),
      );

      this.sendToRenderer('stomp:connection-status', {
        noteId,
        connected: true,
      } satisfies ConnectionStatus);

      if (conn.shouldAutoResume) {
        this.sendResume(noteId, 'auto', platform);
      }
    };

    client.onWebSocketClose = (event) => {
      const wasConnected = conn.isConnected;
      conn.isConnected = false;
      conn.resumePublished = false;

      // A close caused by deactivate() is a planned transport handoff.
      if (!client.active) return;

      log.warn(
        `[StompStreaming] WebSocket closed note=${noteId} code=${event.code} clean=${event.wasClean}`,
      );
      const isUnexpectedClose = !event.wasClean || event.code !== 1000;
      if (isUnexpectedClose) {
        conn.hasConnectionFailure = true;
        conn.lastDisconnectReason = 'reconnecting';
        this.sendToRenderer('stomp:connection-status', {
          noteId,
          connected: false,
          ...(!wasConnected ? { reason: 'reconnecting' as const } : {}),
        } satisfies ConnectionStatus);
      } else if (wasConnected) {
        conn.lastDisconnectReason = 'clean-close';
        this.sendToRenderer('stomp:connection-status', {
          noteId,
          connected: false,
          reason: 'clean-close',
        } satisfies ConnectionStatus);
      }
      if (!event.wasClean) {
        this.sendToRenderer('stomp:error', {
          noteId,
          type: 'websocket-close',
          message: `code=${event.code}`,
        } satisfies StompError);
        // RFC 6455 code 1006 "Abnormal Closure" = the TCP socket died with no
        // Close frame. In practice this is pure network noise (idle timeout at
        // a sleeve middlebox, Wi-Fi/VPN flap, sleep/wake, server RST) that the
        // reconnect loop already recovers from. We don't drop the renderer
        // notification (the UI may want to react). The observer counts every
        // occurrence and retains only its approved Sentry sample, keeping
        // actionable codes (1011 server error, 1015 TLS handshake, 1008 policy,
        // 4xxx application-defined) at full fidelity.
        if (event.code === 1006) {
          const observation = {
            kind: 'abnormal-close',
            source: 'websocket-close',
            code: String(event.code),
          } satisfies StompNetworkErrorObservation;
          if (this.shouldReportNetworkError(observation, false)) {
            const reported = new Error(
              `WebSocket closed uncleanly code=${event.code}`,
            );
            reported.name = 'StompWebSocketClose';
            this.reportConnectionError(conn, reported, {
              noteId,
              type: 'websocket-close',
              code: event.code,
              wasClean: event.wasClean,
              networkErrorKind: observation.kind,
            });
          }
          return;
        }
        // Report unclean close (e.g. RFC 6455 codes 1011, 1015) to the
        // monitor even when no explicit `onWebSocketError` fired. The streak
        // throttle (hasReportedError) collapses this with a paired error
        // within the same disconnected streak, so a typical close-after-error
        // sequence still produces a single Sentry event. `event.code` is part
        // of the message so close codes group as distinct Sentry issues
        // automatically.
        const reported = new Error(
          `WebSocket closed uncleanly code=${event.code}`,
        );
        reported.name = 'StompWebSocketClose';
        this.reportConnectionError(conn, reported, {
          noteId,
          type: 'websocket-close',
          code: event.code,
          wasClean: event.wasClean,
        });
      }
    };

    client.onStompError = (frame) => {
      conn.hasConnectionFailure = true;
      conn.lastDisconnectReason = 'reconnecting';
      log.error(`[StompStreaming] STOMP error note=${noteId}`, frame.headers);
      const message = frame.headers['message'] ?? 'STOMP error';
      this.sendToRenderer('stomp:error', {
        noteId,
        type: 'stomp-error',
        message,
      } satisfies StompError);
      conn.isConnected = false;
      conn.resumePublished = false;
      this.sendToRenderer('stomp:connection-status', {
        noteId,
        connected: false,
      } satisfies ConnectionStatus);
      const networkErrorKind = classifyNetworkError(message);
      if (
        networkErrorKind &&
        !this.shouldReportNetworkError({
          kind: networkErrorKind,
          source: 'stomp-error',
        })
      ) {
        return;
      }
      this.reportConnectionError(conn, new Error(`STOMP error: ${message}`), {
        noteId,
        type: 'stomp-error',
        headers: frame.headers,
        ...(networkErrorKind ? { networkErrorKind } : {}),
      });
    };

    client.onWebSocketError = (err) => {
      conn.hasConnectionFailure = true;
      // `ws` surfaces the underlying error either directly or under `.error`.
      // Capture code/syscall/stack so production logs distinguish a TLS trust
      // failure (e.g. UNABLE_TO_VERIFY_LEAF_SIGNATURE) from a proxy/egress
      // failure (e.g. ETIMEDOUT / ECONNREFUSED).
      const e = (err ?? {}) as WebSocketErrorLike;
      const detail = e.error ?? e;
      log.error(
        `[StompStreaming] WebSocket error note=${noteId} code=${detail.code} syscall=${detail.syscall} message=${detail.message}`,
        detail.stack,
      );
      this.sendToRenderer('stomp:error', {
        noteId,
        type: 'websocket-error',
        message: detail.code
          ? `${detail.code}: ${detail.message ?? ''}`
          : (detail.message ?? 'WebSocket error'),
      } satisfies StompError);

      // Report to Sentry preserving the original code/syscall, which are the
      // signal that tells proxy/egress failures apart from TLS-trust failures.
      const reported = new Error(detail.message ?? 'WebSocket error');
      reported.name = 'StompWebSocketError';
      if (detail.stack) {
        reported.stack = detail.stack;
      }
      const networkErrorKind = classifyNetworkError(
        detail.message ?? '',
        detail.code,
      );
      if (
        networkErrorKind &&
        !this.shouldReportNetworkError({
          kind: networkErrorKind,
          source: 'websocket-error',
          code: detail.code,
        })
      ) {
        return;
      }
      this.reportConnectionError(conn, reported, {
        noteId,
        type: 'websocket-error',
        code: detail.code,
        syscall: detail.syscall,
        ...(networkErrorKind ? { networkErrorKind } : {}),
      });
    };

    conn.client = client;
    client.activate();
  }

  /**
   * Close the STOMP connection for a note and clean up subscriptions.
   */
  disconnect(noteId: number): void {
    const conn = this.connections.get(noteId);
    if (!conn) return;

    if (conn.recovery || conn.buffer.length) this.observe(conn, 'disconnected');
    log.info(`[StompStreaming] Disconnecting note=${noteId}`);
    try {
      conn.subscriptions.forEach((sub) => sub.unsubscribe());
    } catch (e) {
      log.warn(`[StompStreaming] Unsubscribe failed:`, e);
    }
    conn.client.deactivate().catch((e) => {
      log.warn(`[StompStreaming] Deactivate failed:`, e);
    });
    this.connections.delete(noteId);
  }

  /**
   * Disconnect all active connections (called on app quit).
   */
  disconnectAll(): void {
    for (const noteId of this.connections.keys()) {
      this.disconnect(noteId);
    }
  }

  isConnected(noteId: number): boolean {
    return this.connections.get(noteId)?.isConnected ?? false;
  }

  // ---------------------------------------------------------------------------
  // Public API — Send commands
  // ---------------------------------------------------------------------------

  sendResume(noteId: number, connectType: string, platform: string): void {
    const conn = this.connections.get(noteId);
    if (!conn) return;
    conn.shouldAutoResume = true;
    conn.resumePublished = this.publish(noteId, '/pub/resume', {
      'x-note-id': String(noteId),
      'x-connect-type': connectType,
      'x-platform': platform,
    });
    if (conn.resumePublished) {
      if (conn.recovery) this.observe(conn, 'resume-published');
      this.flushBuffer(noteId);
    } else if (conn.isConnected) {
      this.observe(conn, 'resume-publish-failed');
      this.reconnect(noteId, conn, 'reconnecting');
    }
  }

  attachNoteGuid(noteId: number, noteGuid: string): void {
    const conn = this.connections.get(noteId);
    if (conn) conn.noteGuid = noteGuid;
  }

  sendPause(noteId: number, pauseReason: string): void {
    const conn = this.connections.get(noteId);
    if (conn) {
      conn.shouldAutoResume = false;
      conn.resumePublished = false;
      if (conn.recovery || conn.buffer.length) this.observe(conn, 'paused');
    }
    this.publish(noteId, '/pub/pause', {
      'x-note-id': String(noteId),
      'x-pause-reason': pauseReason,
    });
  }

  sendEnd(noteId: number): void {
    const conn = this.connections.get(noteId);
    if (conn) {
      conn.shouldAutoResume = false;
      conn.resumePublished = false;
      if (conn.recovery || conn.buffer.length) this.observe(conn, 'ended');
    }
    this.publish(noteId, '/pub/end', {
      'x-note-id': String(noteId),
    });
  }

  sendSummary(noteId: number, templateId: number, force: boolean): void {
    this.publish(noteId, '/pub/note/summary', {
      'x-note-id': String(noteId),
      'x-note-summary-template-id': String(templateId),
      force: String(force),
    });
  }

  sendRecordingFile(noteId: number, body: string): void {
    this.publish(
      noteId,
      '/pub/recording-file',
      { 'x-note-id': String(noteId) },
      body,
    );
  }

  sendRecordingFileUri(noteId: number, body: string): void {
    this.publish(
      noteId,
      '/pub/recording-file-uri',
      { 'x-note-id': String(noteId) },
      body,
    );
  }

  /**
   * Send a PCM audio frame for the given note. If the WebSocket is
   * disconnected, the frame is buffered and replayed on reconnect.
   */
  sendFrame(noteId: number, pcmData: Buffer, audioLevel: number): void {
    const conn = this.connections.get(noteId);
    if (!conn) return;

    this.addToBuffer(conn, new Uint8Array(pcmData), audioLevel);
    if (!conn.isConnected || !conn.resumePublished) {
      this.observe(conn, 'buffering');
      return;
    }
    this.flushBuffer(noteId);
  }

  // ---------------------------------------------------------------------------
  // Private — Helpers
  // ---------------------------------------------------------------------------

  /**
   * Forward a connection error to the external monitor, throttled to once per
   * disconnected streak per connection. The `reconnectDelay` of 1s would
   * otherwise flood Sentry on a sustained failure; the flag resets on the next
   * successful connect (onConnect).
   */
  private reportConnectionError(
    conn: StompConnection,
    error: Error,
    context: Record<string, unknown>,
  ): void {
    if (!this.reportError || conn.hasReportedError) {
      return;
    }
    conn.hasReportedError = true;
    this.reportError(error, context);
  }

  private shouldReportNetworkError(
    event: StompNetworkErrorObservation,
    defaultWhenUnobserved = true,
  ): boolean {
    if (!this.observeNetworkError) return defaultWhenUnobserved;
    try {
      return this.observeNetworkError(event);
    } catch (error) {
      log.warn('[StompStreaming] Network telemetry observer failed', error);
      return true;
    }
  }

  private publish(
    noteId: number,
    destination: string,
    headers: Record<string, string>,
    body?: string,
  ): boolean {
    const conn = this.connections.get(noteId);
    if (!conn) {
      log.warn(
        `[StompStreaming] No connection for note=${noteId} (publish ${destination})`,
      );
      return false;
    }
    if (!conn.isConnected) {
      log.warn(
        `[StompStreaming] Not connected for note=${noteId} (publish ${destination})`,
      );
      return false;
    }
    try {
      conn.client.publish({
        destination,
        headers,
        body: body ?? '',
      });
      return true;
    } catch (error) {
      if (destination !== '/pub/resume') {
        log.warn(
          `[StompStreaming] Publish failed note=${noteId} dest=${destination}`,
          error,
        );
      }
      return false;
    }
  }

  private addToBuffer(
    conn: StompConnection,
    data: Uint8Array,
    audioLevel: number,
  ): void {
    conn.buffer.push({ data, audioLevel });
    let total = conn.buffer.reduce(
      (sum, frame) => sum + frame.data.byteLength,
      0,
    );
    while (total > MAX_FRAME_BUFFER_BYTES && conn.buffer.length > 0) {
      const dropped = conn.buffer.shift()!;
      total -= dropped.data.byteLength;
      this.observe(conn, 'buffering');
      conn.recovery!.droppedFrames += 1;
      conn.recovery!.droppedBytes += dropped.data.byteLength;
    }
    if (conn.recovery?.droppedFrames) this.observe(conn, 'overflow');
  }

  private flushBuffer(noteId: number): void {
    const conn = this.connections.get(noteId);
    if (!conn?.isConnected || !conn.resumePublished) return;
    while (conn.buffer.length) {
      const frame = conn.buffer[0];
      try {
        conn.client.publish({
          destination: '/pub/frame',
          binaryBody: frame.data,
          headers: {
            'x-note-id': String(noteId),
            'x-audio-level': String(frame.audioLevel),
          },
          skipContentLengthHeader: true,
        });
      } catch {
        this.observe(conn, 'frame-publish-failed');
        return;
      }
      conn.buffer.shift();
      if (conn.recovery)
        conn.recovery.locallyPublishedBytes += frame.data.byteLength;
    }
    if (conn.recovery) {
      this.observe(conn, 'drained');
      conn.recovery = undefined;
    }
  }

  private reconnect(
    noteId: number,
    conn: StompConnection,
    reason: 'reconnecting' | 'server-going-away',
  ): void {
    conn.isConnected = false;
    conn.resumePublished = false;
    conn.lastDisconnectReason = reason;
    this.sendToRenderer('stomp:connection-status', {
      noteId,
      connected: false,
      reason,
    } satisfies ConnectionStatus);
    void conn.client
      .deactivate({ force: true })
      .then(() => {
        if (this.connections.get(noteId) === conn) conn.client.activate();
      })
      .catch(() => this.observe(conn, 'reconnect-failed'));
  }

  private observe(conn: StompConnection, stage: RecoveryStage): void {
    const recovery = (conn.recovery ??= {
      id: randomUUID(),
      startedAt: Date.now(),
      stages: new Set<RecoveryStage>(),
      droppedFrames: 0,
      droppedBytes: 0,
      locallyPublishedBytes: 0,
    });
    if (recovery.stages.has(stage)) return;
    recovery.stages.add(stage);
    try {
      this.observeRecovery?.({
        stage,
        recoveryId: recovery.id,
        ...(conn.noteGuid ? { noteGuid: conn.noteGuid } : {}),
        elapsedMs: Date.now() - recovery.startedAt,
        pendingFrames: conn.buffer.length,
        pendingBytes: conn.buffer.reduce(
          (sum, frame) => sum + frame.data.byteLength,
          0,
        ),
        droppedFrames: recovery.droppedFrames,
        droppedBytes: recovery.droppedBytes,
        locallyPublishedBytes: recovery.locallyPublishedBytes,
      });
    } catch {
      return;
    }
  }
}
