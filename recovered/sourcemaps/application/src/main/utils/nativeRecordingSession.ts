import { RECORDING_UNSUPPORTED_OS_ERROR } from '@/renderer/entities/recordingSupport';

export const getNativeRecordingSessionKey = (
  noteId: number | null,
  noteGuid: string | undefined,
): string | null => {
  if (noteId !== null) return `note-id:${noteId}`;
  if (noteGuid) return `note-guid:${noteGuid}`;
  return null;
};

export type NativeRecordingStartDisposition =
  | 'start'
  | 'duplicate'
  | 'reject-active';

type NativeRecordingCaptureState = 'idle' | 'recording' | 'paused' | 'error';

type NativeRecordingSessionRequest = {
  noteGuid?: string;
  noteId?: number;
};

export const getNativeRecordingStartDisposition = ({
  captureState,
  stopPending,
  currentSessionKey,
  requestedSessionKey,
}: {
  captureState: NativeRecordingCaptureState;
  stopPending: boolean;
  currentSessionKey: string | null;
  requestedSessionKey: string | null;
}): NativeRecordingStartDisposition => {
  if (captureState !== 'recording' && captureState !== 'paused') {
    return 'start';
  }
  if (stopPending) return 'start';
  if (
    requestedSessionKey !== null &&
    currentSessionKey === requestedSessionKey
  ) {
    return 'duplicate';
  }
  return 'reject-active';
};

type NativeRecordingSessionLifecycleDependencies<
  StartOptions extends NativeRecordingSessionRequest,
> = {
  isRecordingSupported: () => boolean;
  getCaptureState: () => NativeRecordingCaptureState;
  isStopPending: () => boolean;
  startCapture: (options: StartOptions) => Promise<void>;
  stopCapture: () => Promise<void>;
  onStartRequested: (options: StartOptions) => void;
  onStartCompleted: (options: StartOptions) => void;
  onDuplicateStart: (options: StartOptions) => void;
  onSessionCleared: () => void;
};

export const createNativeRecordingSessionLifecycle = <
  StartOptions extends NativeRecordingSessionRequest,
>({
  isRecordingSupported,
  getCaptureState,
  isStopPending,
  startCapture,
  stopCapture,
  onStartRequested,
  onStartCompleted,
  onDuplicateStart,
  onSessionCleared,
}: NativeRecordingSessionLifecycleDependencies<StartOptions>) => {
  let currentSessionKey: string | null = null;
  let generation = 0;
  let startPending = false;

  const stop = (): Promise<void> => {
    generation += 1;
    startPending = false;
    const stopPromise = stopCapture();
    onSessionCleared();
    currentSessionKey = null;
    return stopPromise;
  };

  const start = async (options: StartOptions): Promise<void> => {
    if (!isRecordingSupported()) {
      throw new Error(RECORDING_UNSUPPORTED_OS_ERROR);
    }
    const requestedSessionKey = getNativeRecordingSessionKey(
      options.noteId ?? null,
      options.noteGuid,
    );
    if (startPending) {
      throw new Error('Native audio capture start is already pending');
    }

    const disposition = getNativeRecordingStartDisposition({
      captureState: getCaptureState(),
      stopPending: isStopPending(),
      currentSessionKey,
      requestedSessionKey,
    });
    if (disposition === 'duplicate') {
      onDuplicateStart(options);
      return;
    }
    if (disposition === 'reject-active') {
      throw new Error('Native audio capture is already active');
    }

    const requestGeneration = ++generation;
    startPending = true;
    currentSessionKey = requestedSessionKey;
    onStartRequested(options);

    try {
      await startCapture(options);
      if (
        requestGeneration !== generation ||
        currentSessionKey !== requestedSessionKey
      ) {
        return;
      }
      startPending = false;
      onStartCompleted(options);
    } catch (error) {
      if (requestGeneration === generation) {
        void stop();
      }
      throw error;
    }
  };

  return { start, stop };
};
