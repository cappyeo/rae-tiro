import { type AudioProcessDiagnostic } from '@/main/services/AudioCaptureProcess';
import { type NativeAudioDiagnosticRequest } from '@/renderer/entities/nativeAudioDiagnostics';

export type NativeAudioRequestDiagnostics =
  Partial<NativeAudioDiagnosticRequest> & {
    reason: string;
    senderWebContentsId?: number;
    senderProcessId?: number;
    senderFrameRoutingId?: number;
  };

export const sanitizeNativeAudioDiagnostics = (
  input: unknown,
  startOptions?: { noteGuid?: unknown },
): NativeAudioRequestDiagnostics => {
  const result: NativeAudioRequestDiagnostics = { reason: 'unannotated' };
  const record =
    input && typeof input === 'object'
      ? (input as Record<string, unknown>)
      : {};
  for (const key of [
    'requestId',
    'rendererInstanceId',
    'operationId',
    'reason',
    'noteGuid',
  ] as const) {
    const value =
      key === 'noteGuid' && startOptions !== undefined
        ? startOptions.noteGuid
        : record[key];
    if (typeof value === 'string' && /^[a-zA-Z0-9_.:-]{1,128}$/.test(value)) {
      result[key] = value;
    }
  }
  return result;
};

export const createNativeAudioDiagnostics = () => {
  let accepted: NativeAudioRequestDiagnostics | undefined;
  let startPending = false;
  return {
    accept(request: NativeAudioRequestDiagnostics) {
      accepted = request;
      startPending = true;
    },
    complete(request: NativeAudioRequestDiagnostics) {
      if (accepted === request) startPending = false;
    },
    clear() {
      accepted = undefined;
      startPending = false;
    },
    snapshot(): Record<string, string | number | boolean> {
      return {
        captureStartPending: startPending,
        ...(accepted?.requestId
          ? { captureRequestId: accepted.requestId }
          : {}),
        ...(accepted?.noteGuid ? { captureNoteGuid: accepted.noteGuid } : {}),
      };
    },
  };
};

export const emitNativeAudioDiagnostic = (emit: () => void): void => {
  try {
    emit();
  } catch {
    return;
  }
};

export const audioProcessDiagnosticTelemetry = (
  diagnostic: AudioProcessDiagnostic,
): {
  level: 'warn' | 'error';
  message: string;
  context: Record<string, string | number | boolean>;
} => {
  const context: Record<string, string | number | boolean> = {};
  for (const [key, value] of Object.entries(diagnostic)) {
    if (value !== null) context[key] = value;
  }
  switch (diagnostic.event) {
    case 'native_audio_process_signal_sent':
    case 'native_audio_process_signal_failed':
      return {
        level: 'warn',
        message: '[AudioCapture] sending process signal',
        context,
      };
    case 'native_audio_heartbeat_timeout':
      return {
        level: 'error',
        message: '[AudioCapture] Heartbeat timeout',
        context,
      };
    case 'native_audio_process_restart_failed':
      return {
        level: 'error',
        message: '[AudioCapture] Process restart failed',
        context,
      };
  }
};
