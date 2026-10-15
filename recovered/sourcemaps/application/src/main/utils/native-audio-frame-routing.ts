type NativeAudioFrameRoutingState = {
  noteId: number | null;
  noteGuid: string | null;
  audioLevel: number;
};

type NativeAudioFrameSource = {
  on(event: 'pcm-frame', listener: (data: Buffer) => void): unknown;
  on(event: 'pcm-frame-48k', listener: (data: Buffer) => void): unknown;
};

type NativeAudioFrameRoutingOptions = {
  source: NativeAudioFrameSource;
  getState: () => NativeAudioFrameRoutingState;
  sendStreamingFrame: (
    noteId: number,
    data: Buffer,
    audioLevel: number,
  ) => void;
  appendRecordingFrame: (noteGuid: string, data: Uint8Array) => void;
};

export const registerNativeAudioFrameRouting = ({
  source,
  getState,
  sendStreamingFrame,
  appendRecordingFrame,
}: NativeAudioFrameRoutingOptions): void => {
  source.on('pcm-frame', (data) => {
    const { noteId, audioLevel } = getState();
    if (noteId !== null) {
      sendStreamingFrame(noteId, data, audioLevel);
    }
  });

  source.on('pcm-frame-48k', (data) => {
    const { noteGuid } = getState();
    if (noteGuid) {
      appendRecordingFrame(noteGuid, new Uint8Array(data));
    }
  });
};
