// See the Electron documentation for details on how to use preload scripts:
// https://www.electronjs.org/docs/latest/tutorial/process-model#preload-scripts

import { contextBridge, ipcRenderer, type IpcRendererEvent } from 'electron';

import { isMac, isWindows } from '@/main/utils/platform';
import { type MainLogPayload } from '@/renderer/entities/mainLog';
import {
  type NativeAudioDiagnosticContext,
  type NativeAudioDiagnosticRequest,
} from '@/renderer/entities/nativeAudioDiagnostics';
import { type UpdateTelemetryEvent } from '@/renderer/entities/updateTelemetry';

import { version } from '../../package.json';

const nativeAudioRendererInstanceId = crypto.randomUUID();
const nativeAudioRequest = (
  context?: NativeAudioDiagnosticContext,
): NativeAudioDiagnosticRequest => ({
  ...context,
  reason: context?.reason ?? 'unannotated',
  requestId: crypto.randomUUID(),
  rendererInstanceId: nativeAudioRendererInstanceId,
});

contextBridge.exposeInMainWorld('electron', {
  baseUrl: {
    api: import.meta.env.VITE_API_BASE_URL,
    web: import.meta.env.VITE_WEB_BASE_URL,
    ws: import.meta.env.VITE_WS_BASE_URL,
    docs: import.meta.env.VITE_DOCS_BASE_URL,
    channelTalk: import.meta.env.VITE_CHANNEL_TALK_PLUGIN_KEY,
  },
  app: {
    version,
    quit: () => ipcRenderer.invoke('app:quit'),
    isFullScreen: () => ipcRenderer.invoke('mac:isFullScreen'),
    onFullScreenChange: (callback: (isFullScreen: boolean) => void) => {
      const wrappedCallback = (
        _event: IpcRendererEvent,
        isFullScreen: boolean,
      ) => callback(isFullScreen);
      ipcRenderer.on('mac:fullscreen-changed', wrappedCallback);
    },

    offFullScreenChange: (_callback: (isFullScreen: boolean) => void) => {
      ipcRenderer.removeAllListeners('mac:fullscreen-changed');
    },
  },
  platform: {
    isMac,
    isWindows,
  },
  windows: {
    minimize: () => ipcRenderer.invoke('windows:minimize'),
    maximize: () => ipcRenderer.invoke('windows:maximize'),
    restore: () => ipcRenderer.invoke('windows:restore'),
    close: () => ipcRenderer.invoke('windows:close'),
    isMaximized: () => ipcRenderer.invoke('windows:isMaximized'),
    focus: () =>
      ipcRenderer.invoke('windows:focus') as Promise<{ popped: boolean }>,
    onMaximizeChange: (callback: (isMaximized: boolean) => void) => {
      const wrappedCallback = (
        _event: IpcRendererEvent,
        isMaximized: boolean,
      ) => callback(isMaximized);
      ipcRenderer.on('windows:maximized-changed', wrappedCallback);
    },

    offMaximizeChange: (_callback: (isMaximized: boolean) => void) => {
      ipcRenderer.removeAllListeners('windows:maximized-changed');
    },
  },
  appMenu: {
    popup: (payload?: { x: number; y: number; isAuthenticated?: boolean }) =>
      ipcRenderer.invoke('app-menu:popup', payload),
    onAction: (
      callback: (
        action: 'new-note' | 'open-settings' | 'open-shortcuts' | 'logout',
      ) => void,
    ) => {
      const wrapped = (
        _event: IpcRendererEvent,
        action: 'new-note' | 'open-settings' | 'open-shortcuts' | 'logout',
      ) => callback(action);
      ipcRenderer.on('app-menu:action', wrapped);
      return () => ipcRenderer.removeListener('app-menu:action', wrapped);
    },
  },
  overlay: {
    setRecordingState: (isRecording: boolean, noteId?: number) =>
      ipcRenderer.invoke('overlay:set-recording-state', isRecording, noteId),
    setEnabled: (enabled: boolean) =>
      ipcRenderer.invoke('overlay:set-enabled', enabled),
    getEnabled: () => ipcRenderer.invoke('overlay:get-enabled'),
    updateAudioLevel: (level: number) =>
      ipcRenderer.invoke('overlay:update-audio-level', level),
  },
  // Meeting-end detection (mic-release → pause prompt). The renderer starts the
  // monitor while recording + flag enabled, subscribes to acquire/release edges,
  // and routes the prompt's actions back to main.
  meetingEnd: {
    start: (pollMs?: number) =>
      ipcRenderer.invoke('meeting-end:start', { pollMs }) as Promise<{
        started: boolean;
      }>,
    stop: () => ipcRenderer.invoke('meeting-end:stop'),
    requestPause: () =>
      ipcRenderer.invoke('meeting-end:request-pause') as Promise<{
        paused: boolean;
      }>,
    onMicSignal: (
      callback: (edge: {
        kind: 'acquired' | 'released';
        app: string;
        atMs: number;
      }) => void,
    ) => {
      const wrapped = (
        _event: IpcRendererEvent,
        edge: { kind: 'acquired' | 'released'; app: string; atMs: number },
      ) => callback(edge);
      ipcRenderer.on('meeting-end:mic-signal', wrapped);
      return () =>
        ipcRenderer.removeListener('meeting-end:mic-signal', wrapped);
    },
  },
  notification: {
    show: (payload: {
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
    }) => {
      return ipcRenderer.invoke('notification-show', payload);
    },
  },
  securityPolicy: {
    update: (policy: { deleteLocalAudioAfterProcessing?: boolean }) =>
      ipcRenderer.invoke('security-policy:update', policy),
    clear: () => ipcRenderer.invoke('security-policy:clear'),
  },
  locale: {
    set: (language: string) => ipcRenderer.invoke('locale:set', language),
    setRecordingPreferences: (preferences: {
      transcribeLocale: string;
      summaryLocale: string;
    }) => ipcRenderer.invoke('locale:set-recording-preferences', preferences),
    getRecordingPreferences: () =>
      ipcRenderer.invoke('locale:get-recording-preferences') as Promise<{
        transcribeLocale?: string;
        summaryLocale?: string;
      }>,
  },
  calendar: {
    syncEvents: (calendarData: {
      calendars: Array<{
        events: Array<{
          id: string;
          externalId?: string;
          summary?: string;
          description?: string;
          location?: string;
          hangoutLink?: string;
          start?: {
            date?: string;
            dateTime?: string;
            timeZone?: string;
          };
          end?: {
            date?: string;
            dateTime?: string;
            timeZone?: string;
          };
          attendees?: Array<{
            email: string;
            responseStatus:
              | 'accepted'
              | 'needsAction'
              | 'declined'
              | 'tentative';
          }>;
          status?: string;
        }>;
      }>;
    }) => {
      return ipcRenderer.invoke('calendar:sync-events', calendarData);
    },
    getNotificationStatus: () => {
      return ipcRenderer.invoke('calendar:get-notification-status');
    },
    setNotificationEnabled: (enabled: boolean) => {
      return ipcRenderer.invoke('calendar:set-notification-enabled', enabled);
    },
    getNotificationEnabled: () => {
      return ipcRenderer.invoke('calendar:get-notification-enabled');
    },
  },
  micDetection: {
    getNotificationEnabled: () => {
      return ipcRenderer.invoke('mic-detection:get-notification-enabled');
    },
    setNotificationEnabled: (enabled: boolean) => {
      return ipcRenderer.invoke(
        'mic-detection:set-notification-enabled',
        enabled,
      );
    },
    setTiroMicState: (isUsing: boolean) => {
      ipcRenderer.send('mic-detection:set-tiro-mic-state', isUsing);
    },
  },
  auth: {
    setAuthToken: (token: string) => {
      return ipcRenderer.invoke('set-auth-token', token);
    },
    getAuthToken: () => {
      return ipcRenderer.invoke('get-auth-token');
    },
    setRequestInterceptor: () => {
      return ipcRenderer.invoke('set-request-interceptor');
    },
  },
  /**
   * Bridge for ad attributions delivered via `tiro://auth/callback` deeplink.
   * The renderer reads them once after login completes, sends each to the
   * server, and clears the store on success.
   */
  adAttribution: {
    getPending: () => ipcRenderer.invoke('ad-attribution:get-pending'),
    clearPending: () => ipcRenderer.invoke('ad-attribution:clear-pending'),
  },
  /**
   * Bridge for the web PostHog distinct_id delivered via `tiro://auth/callback`
   * deeplink (`phDistinctId`). The renderer reads it once to merge the web
   * landing person with this app person, then clears it.
   */
  posthogHandoff: {
    getPendingWebDistinctId: () =>
      ipcRenderer.invoke('posthog-handoff:get-pending-web-distinct-id'),
    clearPendingWebDistinctId: () =>
      ipcRenderer.invoke('posthog-handoff:clear-pending-web-distinct-id'),
  },
  /**
   * Bridge for the once-per-installation first-launch analytics slot.
   * `claim()` returns true exactly once per install (read+mark은 main 에서
   * 원자적으로 처리) — 렌더러는 true 일 때만 view_page_first_launch 를 쏜다.
   */
  firstLaunch: {
    claim: (): Promise<boolean> => ipcRenderer.invoke('first-launch:claim'),
  },
  deeplink: {
    notifyReady: () => {
      ipcRenderer.send('deeplink:renderer-ready');
    },
    notifyGone: () => {
      ipcRenderer.send('deeplink:renderer-gone');
    },
  },
  credentialAttach: {
    claimResult: () => ipcRenderer.invoke('credential-attach-result:claim'),
  },
  workflowConnect: {
    claimResults: () => ipcRenderer.invoke('workflow-connect-result:claim'),
  },
  googleDrivePicker: {
    open: (ticket: string) =>
      ipcRenderer.invoke('google-drive-picker:open', ticket),
    claimResult: () => ipcRenderer.invoke('google-drive-picker:claim'),
  },
  authorize: (
    authUrl: string,
    provider: string,
    options?: {
      usePkce?: boolean;
      bindsAuthCallback?: boolean;
      credentialAttachVerifier?: string;
      credentialAttachNonce?: string;
    },
  ) => {
    return ipcRenderer.invoke('authorize', { authUrl, provider, ...options });
  },
  setObservabilityUser: (guid: string | null) =>
    ipcRenderer.invoke('observability:set-user', guid),
  clearAuthToken: () => {
    return ipcRenderer.invoke('clear-auth-token');
  },
  openUrlInExternalBrowser: (
    url: string,
    options?: { meetingMode?: boolean },
  ): Promise<boolean> =>
    ipcRenderer
      .invoke('open-url-in-external-browser', url, options)
      .catch(() => false),
  getExternalModulePath: (name: string) => {
    return ipcRenderer.invoke('get-external-module-path', name);
  },
  getDeviceUUID: () => {
    return ipcRenderer.invoke('get-device-uuid');
  },

  update: () => {
    ipcRenderer.send('update');
  },
  getUpdateInfo: () => {
    return ipcRenderer.invoke('get-update-info');
  },
  onUpdateAvailable: (
    callback: (updateInfo: {
      shouldForceUpdate: boolean;
      newVersion: string;
      currentVersion: string;
    }) => void,
  ) => {
    ipcRenderer.on('update-available', (_, updateInfo) => {
      callback(updateInfo);
    });
  },
  onUpdateCompleted: (
    callback: (updateInfo: {
      newVersion: string;
      currentVersion: string;
    }) => void,
  ) => {
    ipcRenderer.on('update-completed', (_, updateInfo) => {
      callback(updateInfo);
    });
  },
  onUpdateTelemetry: (callback: (event: UpdateTelemetryEvent) => void) => {
    const handler = (_e: IpcRendererEvent, event: UpdateTelemetryEvent) =>
      callback(event);
    ipcRenderer.on('telemetry:update-event', handler);
    return () => {
      ipcRenderer.removeListener('telemetry:update-event', handler);
    };
  },
  onTelemetryLog: (callback: (payload: MainLogPayload) => void) => {
    const handler = (_e: IpcRendererEvent, payload: MainLogPayload) =>
      callback(payload);
    ipcRenderer.on('telemetry:log', handler);
    return () => {
      ipcRenderer.removeListener('telemetry:log', handler);
    };
  },
  notifyTelemetryReady: () => {
    return ipcRenderer.invoke('telemetry:ready');
  },

  hasMicrophonePermission: () => {
    return ipcRenderer.invoke('has-microphone-permission');
  },
  hasSystemAudioCapturePermission: () => {
    return ipcRenderer.invoke('has-system-audio-capture-permission');
  },
  grantMicrophonePermission: () => {
    return ipcRenderer.invoke('grant-microphone-permission');
  },
  grantSystemAudioCapturePermission: () => {
    return ipcRenderer.invoke('grant-system-audio-capture-permission');
  },
  recordingSupport: {
    get: () =>
      isWindows
        ? Promise.resolve({ kind: 'supported' })
        : ipcRenderer
            .invoke('recording-support:get')
            .catch(() => ({ kind: 'unavailable' })),
    ensureSupported: () =>
      isWindows
        ? Promise.resolve(true)
        : ipcRenderer
            .invoke('recording-support:ensure-supported')
            .catch(() => false),
  },

  onTrayCreateNote: (callback: (params: { title: string }) => void) => {
    // make this single listener
    ipcRenderer.removeAllListeners('tray:create-note');
    ipcRenderer.on('tray:create-note', (_, params) => callback(params));
  },
  onRequestCalendarEvents: (callback: () => void) => {
    ipcRenderer.on('tray:request-calendar-events', callback);
  },
  updateCalendarEvents: (
    events: {
      id: string;
      title: string;
      startTime: string;
      endTime: string;
    }[],
  ) => {
    ipcRenderer.send('tray:update-calendar-events', events);
  },

  // Tray recording-state push (renderer → main). The main process owns the
  // tray UI; renderer contexts (NoteStreamingContext / OfflineRecordingContext)
  // call this whenever the recording lifecycle changes so the menu, tooltip
  // and (on macOS) menu-bar title stay in sync — even when the main window
  // is hidden.
  trayRecordingState: {
    update: (payload: {
      mode: 'live' | 'offline' | null;
      noteId: number | null;
      noteTitle: string | null;
      startedAt: number | null;
      isPaused: boolean;
    }) => {
      ipcRenderer.send('tray:recording-state:update', payload);
    },
  },

  // Tray recording-control listeners (main → renderer). Tray menu clicks are
  // forwarded here so renderer contexts can run the full pause/resume/stop
  // flow (STOMP signaling, file finalize, S3 upload, store updates).
  // Each listener returns an unsubscribe function for cleanup.
  trayRecordingControl: {
    onLivePause: (cb: (reason?: string) => void) => {
      const handler = (_event: IpcRendererEvent, reason?: string) => cb(reason);
      ipcRenderer.on('tray:live:pause', handler);
      return () => ipcRenderer.removeListener('tray:live:pause', handler);
    },
    onLiveResume: (cb: () => void) => {
      const handler = () => cb();
      ipcRenderer.on('tray:live:resume', handler);
      return () => ipcRenderer.removeListener('tray:live:resume', handler);
    },
    onLiveStop: (cb: () => void) => {
      const handler = () => cb();
      ipcRenderer.on('tray:live:stop', handler);
      return () => ipcRenderer.removeListener('tray:live:stop', handler);
    },
    onOfflinePause: (cb: (reason?: string) => void) => {
      const handler = (_event: IpcRendererEvent, reason?: string) => cb(reason);
      ipcRenderer.on('tray:offline:pause', handler);
      return () => ipcRenderer.removeListener('tray:offline:pause', handler);
    },
    onOfflineResume: (cb: () => void) => {
      const handler = () => cb();
      ipcRenderer.on('tray:offline:resume', handler);
      return () => ipcRenderer.removeListener('tray:offline:resume', handler);
    },
    onOfflineStop: (cb: () => void) => {
      const handler = () => cb();
      ipcRenderer.on('tray:offline:stop', handler);
      return () => ipcRenderer.removeListener('tray:offline:stop', handler);
    },
  },
  pdf: {
    generatePDF: (options: { title: string; htmlContent: string }) => {
      return ipcRenderer.invoke('pdf:generate', options);
    },
  },
  docx: {
    generateDOCX: (options: { title: string; document: string }) => {
      return ipcRenderer.invoke('docx:generate', options);
    },
  },
  zoom: {
    in: () => ipcRenderer.invoke('zoom:in'),
    out: () => ipcRenderer.invoke('zoom:out'),
    reset: () => ipcRenderer.invoke('zoom:reset'),
    getLevel: () => ipcRenderer.invoke('zoom:get-level'),
    setLevel: (zoomLevel: number) =>
      ipcRenderer.invoke('zoom:set-level', zoomLevel),
  },
  system: {
    onSuspend: (callback: () => void) => {
      const wrappedCallback = () => callback();
      ipcRenderer.on('system:suspend', wrappedCallback);
      return wrappedCallback;
    },
    onResume: (callback: () => void) => {
      const wrappedCallback = () => callback();
      ipcRenderer.on('system:resume', wrappedCallback);
      return wrappedCallback;
    },
    onLockScreen: (callback: () => void) => {
      const wrappedCallback = () => callback();
      ipcRenderer.on('system:lock', wrappedCallback);
      return wrappedCallback;
    },
    onUnlockScreen: (callback: () => void) => {
      const wrappedCallback = () => callback();
      ipcRenderer.on('system:unlock', wrappedCallback);
      return wrappedCallback;
    },
    removeListener: (channel: string, callback: () => void) => {
      ipcRenderer.removeListener(channel, callback);
    },
  },
  audioRecording: {
    start: (params: {
      noteId: number;
      noteGuid: string;
      noteCreatedAt: string;
      sampleRate: number;
    }) => ipcRenderer.invoke('audio-recording:start', params),
    append: (noteGuid: string, audioData: Uint8Array) =>
      ipcRenderer.send('audio-recording:append', { noteGuid, audioData }),
    pause: (noteGuid: string) =>
      ipcRenderer.invoke('audio-recording:pause', noteGuid),
    stop: (noteGuid: string) =>
      ipcRenderer.invoke('audio-recording:stop', noteGuid),
    setSavePath: () => ipcRenderer.invoke('audio-recording:set-save-path'),
    getSavePath: () => ipcRenderer.invoke('audio-recording:get-save-path'),
    openFile: (filePath: string) =>
      ipcRenderer.invoke('audio-recording:open-file', filePath),
    getRecordings: () => ipcRenderer.invoke('audio-recording:get-recordings'),
    getEnabled: () => ipcRenderer.invoke('audio-recording:get-enabled'),
    setEnabled: (enabled: boolean) =>
      ipcRenderer.invoke('audio-recording:set-enabled', enabled),
    hasRecording: (noteGuid: string) =>
      ipcRenderer.invoke('audio-recording:has-recording', noteGuid),
    downloadFile: (noteGuid: string) =>
      ipcRenderer.invoke('audio-recording:download-file', noteGuid),
  },
  offlineRecording: {
    start: (params: {
      noteId: number;
      noteGuid: string;
      noteCreatedAt: string;
      sessionId: string;
      sampleRate: number;
    }) => ipcRenderer.invoke('offline-recording:start', params),
    append: (noteGuid: string, audioData: Uint8Array) =>
      ipcRenderer.send('offline-recording:append', { noteGuid, audioData }),
    pause: (params: { noteGuid: string; sessionId: string }) =>
      ipcRenderer.invoke('offline-recording:pause', params),
    resume: (params: {
      noteId: number;
      noteGuid: string;
      noteCreatedAt: string;
      sessionId: string;
      sampleRate: number;
    }) => ipcRenderer.invoke('offline-recording:resume', params),
    stop: (params: { noteGuid: string; sessionId: string }) =>
      ipcRenderer.invoke('offline-recording:stop', params),
    getFile: (filePath: string) =>
      ipcRenderer.invoke('offline-recording:get-file', filePath),
    getUploadFileSize: (sessionId: string) =>
      ipcRenderer.invoke('offline-recording:get-upload-file-size', sessionId),
    saveFile: (params: { filePath: string; destinationPath: string }) =>
      ipcRenderer.invoke('offline-recording:save-file', params),
    uploadFile: (params: {
      sessionId: string;
      partSize: number;
      uploadParts: Array<{ partNumber: number; uploadUrl: string }>;
    }) => ipcRenderer.invoke('offline-recording:upload-file', params),
    listTempFiles: () =>
      ipcRenderer.invoke('offline-recording:list-temp-files'),
    deleteFile: (filePath: string, origin?: 'policy-cleanup' | 'user') =>
      ipcRenderer.invoke('offline-recording:delete-file', filePath, origin),
    getPendingSessions: () =>
      ipcRenderer.invoke('offline-recording:get-pending-sessions'),
    cleanupSessions: () =>
      ipcRenderer.invoke('offline-recording:cleanup-sessions'),
    clearPendingSession: (sessionId: string) =>
      ipcRenderer.invoke('offline-recording:clear-pending-session', sessionId),
    updateSessionStatus: (params: {
      sessionId: string;
      status:
        | 'recording'
        | 'paused'
        | 'completed'
        | 'upload_pending'
        | 'uploading'
        | 'upload_failed';
      additionalData?: Record<string, unknown>;
    }) => ipcRenderer.invoke('offline-recording:update-session-status', params),
    getSettings: () => ipcRenderer.invoke('offline-recording:get-settings'),
    updateSettings: (settings: { deleteAfterUpload?: boolean }) =>
      ipcRenderer.invoke('offline-recording:update-settings', settings),
    generateSessionId: () =>
      ipcRenderer.invoke('offline-recording:generate-session-id'),
  },
  dialog: {
    showSaveDialog: (options: {
      title?: string;
      defaultPath?: string;
      filters?: Array<{ name: string; extensions: string[] }>;
    }) => ipcRenderer.invoke('dialog:show-save-dialog', options),
    showOpenDialog: (options: {
      title?: string;
      defaultPath?: string;
      filters?: Array<{ name: string; extensions: string[] }>;
      properties?: string[];
    }) => ipcRenderer.invoke('dialog:show-open-dialog', options),
  },
  fs: {
    writeFile: (filePath: string, data: unknown) =>
      ipcRenderer.invoke('fs:write-file', filePath, data),
    readFile: (filePath: string) =>
      ipcRenderer.invoke('fs:read-file', filePath),
  },

  nativeAudioCapture: {
    start: (
      options: {
        sources: ('mic' | 'system')[];
        micDevice?: string;
        gains: { mic: number; system: number };
        noteGuid?: string;
        noteId?: number;
      },
      context?: NativeAudioDiagnosticContext,
    ) =>
      ipcRenderer.invoke(
        'native-audio:start',
        options,
        nativeAudioRequest(context),
      ),
    confirmSystemOnlyFallback: (copy: {
      title: string;
      description: string;
      settings: string;
      systemOnly: string;
      cancel: string;
    }) => {
      const limits = {
        title: 120,
        description: 1000,
        settings: 80,
        systemOnly: 80,
        cancel: 80,
      } as const;
      if (
        !copy ||
        typeof copy !== 'object' ||
        Object.entries(limits).some(([key, limit]) => {
          const value = copy[key as keyof typeof limits];
          return (
            typeof value !== 'string' ||
            value.length === 0 ||
            value.length > limit
          );
        })
      ) {
        return Promise.reject(
          new TypeError('Invalid system-only fallback copy'),
        );
      }
      return ipcRenderer.invoke(
        'native-audio:confirm-system-only-fallback',
        copy,
      );
    },
    changeMicDevice: (micDevice?: string) =>
      ipcRenderer.invoke('native-audio:change-mic', micDevice),
    stop: (context?: NativeAudioDiagnosticContext) =>
      ipcRenderer.invoke('native-audio:stop', nativeAudioRequest(context)),
    pause: () => ipcRenderer.invoke('native-audio:pause'),
    setGain: (source: 'mic' | 'system', gain: number) =>
      ipcRenderer.invoke('native-audio:set-gain', source, gain),
    recoverSystemAudio: () => ipcRenderer.invoke('native-audio:recover-system'),
    onAudioLevel: (callback: (rms: number, peak: number) => void) => {
      const handler = (
        _event: IpcRendererEvent,
        data: { rms: number; peak: number },
      ) => callback(data.rms, data.peak);
      ipcRenderer.on('native-audio:level', handler);
      return () => {
        ipcRenderer.removeListener('native-audio:level', handler);
      };
    },
    onError: (
      callback: (code: string, message: string, fatal: boolean) => void,
    ) => {
      const handler = (
        _event: IpcRendererEvent,
        data: { code: string; message: string; fatal: boolean },
      ) => callback(data.code, data.message, data.fatal);
      ipcRenderer.on('native-audio:error', handler);
      return () => {
        ipcRenderer.removeListener('native-audio:error', handler);
      };
    },
    onPermissionRequired: (callback: (source: 'mic' | 'system') => void) => {
      const handler = (
        _event: IpcRendererEvent,
        data: { source: 'mic' | 'system' },
      ) => callback(data.source);
      ipcRenderer.on('native-audio:permission-required', handler);
      return () => {
        ipcRenderer.removeListener('native-audio:permission-required', handler);
      };
    },
    onMicDeviceFallbackApplied: (callback: () => void) => {
      const handler = () => callback();
      ipcRenderer.on('native-audio:mic-device-fallback-applied', handler);
      return () => {
        ipcRenderer.removeListener(
          'native-audio:mic-device-fallback-applied',
          handler,
        );
      };
    },
  },

  stompStreaming: {
    connect: (noteId: number, platform: string) =>
      ipcRenderer.invoke('stomp:connect', { noteId, platform }),
    disconnect: (noteId: number) =>
      ipcRenderer.invoke('stomp:disconnect', { noteId }),
    sendResume: (noteId: number, connectType: string, platform: string) =>
      ipcRenderer.invoke('stomp:send-resume', {
        noteId,
        connectType,
        platform,
      }),
    sendPause: (noteId: number, pauseReason: string) =>
      ipcRenderer.invoke('stomp:send-pause', { noteId, pauseReason }),
    sendEnd: (noteId: number) =>
      ipcRenderer.invoke('stomp:send-end', { noteId }),
    sendSummary: (noteId: number, templateId: number, force: boolean) =>
      ipcRenderer.invoke('stomp:send-summary', { noteId, templateId, force }),
    sendRecordingFile: (noteId: number, body: string) =>
      ipcRenderer.invoke('stomp:send-recording-file', { noteId, body }),
    sendRecordingFileUri: (noteId: number, body: string) =>
      ipcRenderer.invoke('stomp:send-recording-file-uri', { noteId, body }),
    isConnected: (noteId: number) =>
      ipcRenderer.invoke('stomp:is-connected', { noteId }) as Promise<boolean>,
    onSubscriptionMessage: (
      callback: (data: {
        noteId: number;
        topic: 'alert' | 'frame' | 'status';
        body: string;
        headers: Record<string, string>;
      }) => void,
    ) => {
      const handler = (
        _e: IpcRendererEvent,
        data: Parameters<typeof callback>[0],
      ) => callback(data);
      ipcRenderer.on('stomp:subscription-message', handler);
      return () => {
        ipcRenderer.removeListener('stomp:subscription-message', handler);
      };
    },
    onConnectionStatus: (
      callback: (data: {
        noteId: number;
        connected: boolean;
        reason?: 'clean-close' | 'reconnecting' | 'server-going-away';
      }) => void,
    ) => {
      const handler = (
        _e: IpcRendererEvent,
        data: Parameters<typeof callback>[0],
      ) => callback(data);
      ipcRenderer.on('stomp:connection-status', handler);
      return () => {
        ipcRenderer.removeListener('stomp:connection-status', handler);
      };
    },
    onError: (
      callback: (data: {
        noteId: number;
        type: string;
        message: string;
        reason?: string;
      }) => void,
    ) => {
      const handler = (
        _e: IpcRendererEvent,
        data: Parameters<typeof callback>[0],
      ) => callback(data);
      ipcRenderer.on('stomp:error', handler);
      return () => {
        ipcRenderer.removeListener('stomp:error', handler);
      };
    },
  },
} satisfies Window['electron']);

// Listen for calendar-create-note events from main process
ipcRenderer.on('calendar-create-note', (_, noteData) => {
  // Parse the data if it's a string
  const data = typeof noteData === 'string' ? JSON.parse(noteData) : noteData;

  // Dispatch a custom event that our React app can listen for
  window.dispatchEvent(
    new CustomEvent('calendar-create-note', { detail: data }),
  );
});

ipcRenderer.on('integration:connect-result', () => {
  window.dispatchEvent(new Event('integration:connect-result'));
});

ipcRenderer.on('google-drive-picker:result', () => {
  window.dispatchEvent(new Event('google-drive-picker:result'));
});

ipcRenderer.on('credential-attach-complete', () => {
  window.dispatchEvent(new Event('credential-attach-complete'));
});

ipcRenderer.on('auth-callback-failed', (_, data) => {
  const eventData = typeof data === 'object' && data !== null ? data : {};
  window.dispatchEvent(
    new CustomEvent('auth-callback-failed', { detail: eventData }),
  );
});

// Deep Link: start-recording (Xenia integration)
ipcRenderer.on('deeplink-start-recording', (_, data) => {
  const eventData = typeof data === 'string' ? JSON.parse(data) : data;
  window.dispatchEvent(
    new CustomEvent('deeplink-start-recording', { detail: eventData }),
  );
});

// Deep Link: stop-recording (Xenia integration)
ipcRenderer.on('deeplink-stop-recording', (_, data) => {
  const eventData = typeof data === 'string' ? JSON.parse(data) : data;
  window.dispatchEvent(
    new CustomEvent('deeplink-stop-recording', { detail: eventData }),
  );
});

// Deep Link: welcome overlay after Stripe checkout
ipcRenderer.on('welcome-overlay-show', (_, data) => {
  const eventData = typeof data === 'string' ? JSON.parse(data) : data;
  window.dispatchEvent(
    new CustomEvent('welcome-overlay-show', { detail: eventData }),
  );
});
