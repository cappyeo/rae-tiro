import type { RecordingResult } from './AudioRecordingManager';

export type OfflineRecordingStopParams = {
  noteGuid: string;
  sessionId: string;
};

export type OfflineRecordingStopResult =
  | ({ success: true } & RecordingResult)
  | { success: false; error: string };

type OfflineRecordingStopDependencies = {
  stopNativeCapture: (noteGuid: string) => Promise<void>;
  stopRecording: (noteGuid: string) => Promise<RecordingResult>;
  updateSessionStatus: (
    sessionId: string,
    status: 'upload_pending',
    additionalData: {
      completedAt: string;
      duration: number;
      filePath: string;
    },
  ) => void;
};

const getErrorMessage = (error: unknown) =>
  error instanceof Error ? error.message : 'Unknown error';

export const createOfflineRecordingStop = ({
  stopNativeCapture,
  stopRecording,
  updateSessionStatus,
}: OfflineRecordingStopDependencies) => {
  let pending:
    | {
        sessionId: string;
        promise: Promise<OfflineRecordingStopResult>;
      }
    | undefined;

  return ({ noteGuid, sessionId }: OfflineRecordingStopParams) => {
    if (pending) {
      if (pending.sessionId === sessionId) return pending.promise;
      return Promise.reject(
        new Error('Offline recording stop is already pending'),
      );
    }

    const promise = (async (): Promise<OfflineRecordingStopResult> => {
      await stopNativeCapture(noteGuid);

      try {
        const result = await stopRecording(noteGuid);
        updateSessionStatus(sessionId, 'upload_pending', {
          completedAt: new Date().toISOString(),
          duration: result.duration,
          filePath: result.filePath,
        });
        return { success: true, ...result };
      } catch (error) {
        return { success: false, error: getErrorMessage(error) };
      }
    })().finally(() => {
      if (pending?.promise === promise) pending = undefined;
    });

    pending = { sessionId, promise };
    return promise;
  };
};
