export const RECORDING_UNSUPPORTED_OS_ERROR = 'NATIVE_AUDIO_UNSUPPORTED_OS';

export type RecordingSupport =
  | { kind: 'supported' }
  | { kind: 'unsupported-os'; minimumVersion: string; systemVersion: string }
  | { kind: 'unavailable' };

export type UnsupportedRecordingSupport = Exclude<
  RecordingSupport,
  { kind: 'supported' }
>;
