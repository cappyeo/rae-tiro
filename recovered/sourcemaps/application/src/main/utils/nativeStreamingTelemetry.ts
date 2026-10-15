import type {
  AudioSource,
  AudioSourceDiagnostics,
} from '@/main/services/AudioCaptureProcess';

const SECOND = 1_000;
export const NATIVE_STREAMING_TELEMETRY_INTERVAL = 30 * SECOND;

const SILENT_LINEAR_RMS_THRESHOLD = 0.0001;
const SILENT_PERCEPTUAL_LEVEL_THRESHOLD = 0.001;
const SOURCE_STARVED_FILL_RATIO = 0.05;
const DOMINANT_SAMPLE_RATIO = 0.9;
const MIN_CLASSIFICATION_SAMPLES = 10;

export type NativeStreamingTelemetryReason =
  | 'interval'
  | 'pause'
  | 'end'
  | 'unmount';

export type NativeAudioContentState =
  | 'no_frames'
  | 'unknown'
  | 'source_starved'
  | 'silent'
  | 'active';

export type NativeAudioInputState =
  | 'disabled'
  | 'unknown'
  | 'start_failed'
  | 'starved'
  | 'underfilled'
  | 'silent'
  | 'active';

export type NativeAudioContentSample = AudioSourceDiagnostics & {
  mixedLevel: number;
};

export type NativeStreamingTelemetryFlush = {
  reason: NativeStreamingTelemetryReason;
  level: 'info' | 'warn';
  boundNoteId: number;
  sessionElapsedMs: number;
  windowElapsedMs: number;
  framesSentIn30sWindow: number;
  bytesSentIn30sWindow: number;
  audioSamplesIn30sWindow: number;
  micRequested: boolean;
  systemRequested: boolean;
  micEnabled: boolean;
  systemEnabled: boolean;
  actualSourcesKnown: boolean;
  contentState: NativeAudioContentState;
  micInputState: NativeAudioInputState;
  systemInputState: NativeAudioInputState;
  mixedLevelAvg: number | null;
  mixedLevelMax: number | null;
  mixedLinearRmsAvg: number | null;
  mixedLinearRmsMax: number | null;
  mixedLinearPeakMax: number | null;
  micLinearRmsAvg: number | null;
  micLinearRmsMax: number | null;
  micLinearPeakMax: number | null;
  micInputFillRatioAvg: number | null;
  micInputFillRatioMin: number | null;
  micInputStarvedRatio: number | null;
  systemLinearRmsAvg: number | null;
  systemLinearRmsMax: number | null;
  systemLinearPeakMax: number | null;
  systemInputFillRatioAvg: number | null;
  systemInputFillRatioMin: number | null;
  systemInputStarvedRatio: number | null;
};

export type NativeStreamingTelemetryOptions = {
  /** Injectable clock for deterministic tests. Defaults to Date.now. */
  now?: () => number;
  /** Sink for the flushed summary. The main layer routes it to Datadog. */
  onFlush: (flush: NativeStreamingTelemetryFlush) => void;
};

export type NativeStreamingTelemetry = {
  start: (noteId: number, sources: AudioSource[]) => void;
  setActiveSources: (sources: AudioSource[], known: boolean) => void;
  recordSent: (byteLength: number) => void;
  recordAudioSample: (sample: NativeAudioContentSample) => void;
  /**
   * Emit the current window. Interval flushes include empty windows because a
   * full 30 seconds without frames is diagnostic. Empty pause/end tails are
   * suppressed to avoid treating normal lifecycle boundaries as failures.
   */
  flush: (reason: NativeStreamingTelemetryReason) => void;
  pause: () => void;
  stop: (reason: NativeStreamingTelemetryReason) => void;
};

type Metric = {
  count: number;
  sum: number;
  max: number;
  min: number;
};

type SourceMetrics = {
  linearRms: Metric;
  linearPeak: Metric;
  fillRatio: Metric;
  silentSamples: number;
  starvedSamples: number;
};

type WindowMetrics = {
  mixedLevel: Metric;
  mixedLinearRms: Metric;
  mixedLinearPeak: Metric;
  mixedSilentSamples: number;
  perceptualSilentSamples: number;
  mic: SourceMetrics;
  system: SourceMetrics;
};

type State = {
  sessionStartedAt: number | null;
  windowStartedAt: number;
  boundNoteId: number;
  requestedSources: AudioSource[];
  enabledSources: AudioSource[];
  actualSourcesKnown: boolean;
  paused: boolean;
  /**
   * Whether any frame or audio sample has arrived since `start`. Used to tell
   * a normal empty tail (stop right after a flush) from a session that never
   * captured anything — the latter must still emit a record.
   */
  sessionHadData: boolean;
  framesSentIn30sWindow: number;
  bytesSentIn30sWindow: number;
  audioSamplesIn30sWindow: number;
  window: WindowMetrics;
};

const createMetric = (): Metric => ({
  count: 0,
  sum: 0,
  max: Number.NEGATIVE_INFINITY,
  min: Number.POSITIVE_INFINITY,
});

const createSourceMetrics = (): SourceMetrics => ({
  linearRms: createMetric(),
  linearPeak: createMetric(),
  fillRatio: createMetric(),
  silentSamples: 0,
  starvedSamples: 0,
});

const createWindowMetrics = (): WindowMetrics => ({
  mixedLevel: createMetric(),
  mixedLinearRms: createMetric(),
  mixedLinearPeak: createMetric(),
  mixedSilentSamples: 0,
  perceptualSilentSamples: 0,
  mic: createSourceMetrics(),
  system: createSourceMetrics(),
});

const createState = (): State => ({
  sessionStartedAt: null,
  windowStartedAt: 0,
  boundNoteId: 0,
  requestedSources: [],
  enabledSources: [],
  actualSourcesKnown: false,
  paused: false,
  sessionHadData: false,
  framesSentIn30sWindow: 0,
  bytesSentIn30sWindow: 0,
  audioSamplesIn30sWindow: 0,
  window: createWindowMetrics(),
});

const recordMetric = (metric: Metric, value: number | undefined): void => {
  if (value === undefined || !Number.isFinite(value)) return;
  metric.count += 1;
  metric.sum += value;
  metric.max = Math.max(metric.max, value);
  metric.min = Math.min(metric.min, value);
};

const average = (metric: Metric): number | null =>
  metric.count > 0 ? metric.sum / metric.count : null;

const maximum = (metric: Metric): number | null =>
  metric.count > 0 ? metric.max : null;

const minimum = (metric: Metric): number | null =>
  metric.count > 0 ? metric.min : null;

const ratio = (count: number, total: number): number | null =>
  total > 0 ? count / total : null;

const recordSourceMetrics = (
  source: SourceMetrics,
  linearRms: number | undefined,
  linearPeak: number | undefined,
  fillRatio: number | undefined,
): void => {
  recordMetric(source.linearRms, linearRms);
  recordMetric(source.linearPeak, linearPeak);
  recordMetric(source.fillRatio, fillRatio);
  if (linearRms !== undefined && linearRms <= SILENT_LINEAR_RMS_THRESHOLD) {
    source.silentSamples += 1;
  }
  if (fillRatio !== undefined && fillRatio <= SOURCE_STARVED_FILL_RATIO) {
    source.starvedSamples += 1;
  }
};

const inputState = (
  requested: boolean,
  enabled: boolean,
  actualSourcesKnown: boolean,
  source: SourceMetrics,
): NativeAudioInputState => {
  if (!requested) return 'disabled';
  if (!actualSourcesKnown) return 'unknown';
  if (!enabled) return 'start_failed';
  if (
    source.linearRms.count < MIN_CLASSIFICATION_SAMPLES &&
    source.fillRatio.count < MIN_CLASSIFICATION_SAMPLES
  ) {
    return 'unknown';
  }
  if (
    source.fillRatio.count >= MIN_CLASSIFICATION_SAMPLES &&
    source.starvedSamples / source.fillRatio.count >= DOMINANT_SAMPLE_RATIO
  ) {
    return 'starved';
  }
  if (
    source.fillRatio.count >= MIN_CLASSIFICATION_SAMPLES &&
    source.fillRatio.sum / source.fillRatio.count < DOMINANT_SAMPLE_RATIO
  ) {
    return 'underfilled';
  }
  if (
    source.linearRms.count >= MIN_CLASSIFICATION_SAMPLES &&
    source.silentSamples / source.linearRms.count >= DOMINANT_SAMPLE_RATIO
  ) {
    return 'silent';
  }
  return 'active';
};

const contentState = (
  state: State,
  micState: NativeAudioInputState,
  systemState: NativeAudioInputState,
): NativeAudioContentState => {
  if (state.framesSentIn30sWindow === 0) return 'no_frames';
  if (
    state.window.mixedLevel.count === 0 &&
    state.window.mixedLinearRms.count === 0
  ) {
    return 'unknown';
  }

  const enabledInputStates = [
    state.enabledSources.includes('mic') ? micState : null,
    state.enabledSources.includes('system') ? systemState : null,
  ].filter((value): value is NativeAudioInputState => value !== null);
  if (
    enabledInputStates.length > 0 &&
    enabledInputStates.every((value) => value === 'starved')
  ) {
    return 'source_starved';
  }

  const linearSilent =
    state.window.mixedLinearRms.count >= MIN_CLASSIFICATION_SAMPLES &&
    state.window.mixedSilentSamples / state.window.mixedLinearRms.count >=
      DOMINANT_SAMPLE_RATIO;
  const perceptualSilent =
    state.window.mixedLevel.count >= MIN_CLASSIFICATION_SAMPLES &&
    state.window.perceptualSilentSamples / state.window.mixedLevel.count >=
      DOMINANT_SAMPLE_RATIO;
  if (linearSilent || perceptualSilent) return 'silent';
  return 'active';
};

export const createNativeStreamingTelemetry = (
  options: NativeStreamingTelemetryOptions,
): NativeStreamingTelemetry => {
  const now = options.now ?? Date.now;
  const { onFlush } = options;

  let state = createState();

  const start = (noteId: number, sources: AudioSource[]): void => {
    const at = now();
    state = {
      ...createState(),
      sessionStartedAt: at,
      windowStartedAt: at,
      boundNoteId: noteId,
      requestedSources: [...sources],
    };
  };

  const setActiveSources = (sources: AudioSource[], known: boolean): void => {
    if (state.sessionStartedAt === null) return;
    state.enabledSources = known ? [...sources] : [];
    state.actualSourcesKnown = known;
  };

  const recordSent = (byteLength: number): void => {
    if (state.sessionStartedAt === null || state.paused) return;
    state.sessionHadData = true;
    state.framesSentIn30sWindow += 1;
    state.bytesSentIn30sWindow += byteLength;
  };

  const recordAudioSample = (sample: NativeAudioContentSample): void => {
    if (state.sessionStartedAt === null || state.paused) return;
    state.sessionHadData = true;
    state.audioSamplesIn30sWindow += 1;
    recordMetric(state.window.mixedLevel, sample.mixedLevel);
    recordMetric(state.window.mixedLinearRms, sample.mixedLinearRms);
    recordMetric(state.window.mixedLinearPeak, sample.mixedLinearPeak);
    if (
      sample.mixedLinearRms !== undefined &&
      sample.mixedLinearRms <= SILENT_LINEAR_RMS_THRESHOLD
    ) {
      state.window.mixedSilentSamples += 1;
    }
    if (
      Number.isFinite(sample.mixedLevel) &&
      sample.mixedLevel <= SILENT_PERCEPTUAL_LEVEL_THRESHOLD
    ) {
      state.window.perceptualSilentSamples += 1;
    }
    recordSourceMetrics(
      state.window.mic,
      sample.micLinearRms,
      sample.micLinearPeak,
      sample.micInputFillRatio,
    );
    recordSourceMetrics(
      state.window.system,
      sample.systemLinearRms,
      sample.systemLinearPeak,
      sample.systemInputFillRatio,
    );
  };

  const flush = (reason: NativeStreamingTelemetryReason): void => {
    if (state.sessionStartedAt === null) return;
    const flushedAt = now();
    const hasWindowData =
      state.framesSentIn30sWindow > 0 ||
      state.bytesSentIn30sWindow > 0 ||
      state.audioSamplesIn30sWindow > 0;
    // Suppress the empty tail a normal pause/stop leaves right after a flush,
    // but never suppress a session that produced nothing at all — a note that
    // recorded zero frames is exactly the incident this telemetry exists to
    // explain, and it usually ends well before the 30 s interval fires.
    if (reason !== 'interval' && !hasWindowData && state.sessionHadData) {
      state = {
        ...state,
        windowStartedAt: flushedAt,
        window: createWindowMetrics(),
      };
      return;
    }
    const micRequested = state.requestedSources.includes('mic');
    const systemRequested = state.requestedSources.includes('system');
    const micEnabled = state.enabledSources.includes('mic');
    const systemEnabled = state.enabledSources.includes('system');
    const micState = inputState(
      micRequested,
      micEnabled,
      state.actualSourcesKnown,
      state.window.mic,
    );
    const systemState = inputState(
      systemRequested,
      systemEnabled,
      state.actualSourcesKnown,
      state.window.system,
    );
    const currentContentState = contentState(state, micState, systemState);
    // WARN is reserved for states that mean capture is actually broken, and
    // must never encode a steady-state configuration — otherwise the only new
    // alert channel this module adds is saturated by healthy sessions:
    //   - Windows loopback with nothing playing supplies zero packets for the
    //     entire recording, so `systemInputState` sits at `starved` forever.
    //   - macOS without system-audio permission starts mic-only, so
    //     `systemInputState` sits at `start_failed` forever.
    //   - A machine with no microphone at all does the same to `micInputState`
    //     via `start_failed`.
    // `starved` on the mic is different: it means the mic *did* start and then
    // stopped supplying, which is a runtime failure rather than a config. A
    // quiet 30-second window is common in real meetings, so `silent` stays
    // INFO. Every per-source state remains in the payload and queryable.
    const level =
      currentContentState === 'no_frames' ||
      currentContentState === 'source_starved' ||
      micState === 'starved'
        ? 'warn'
        : 'info';
    onFlush({
      reason,
      level,
      boundNoteId: state.boundNoteId,
      sessionElapsedMs: flushedAt - state.sessionStartedAt,
      windowElapsedMs: flushedAt - state.windowStartedAt,
      framesSentIn30sWindow: state.framesSentIn30sWindow,
      bytesSentIn30sWindow: state.bytesSentIn30sWindow,
      audioSamplesIn30sWindow: state.audioSamplesIn30sWindow,
      micRequested,
      systemRequested,
      micEnabled,
      systemEnabled,
      actualSourcesKnown: state.actualSourcesKnown,
      contentState: currentContentState,
      micInputState: micState,
      systemInputState: systemState,
      mixedLevelAvg: average(state.window.mixedLevel),
      mixedLevelMax: maximum(state.window.mixedLevel),
      mixedLinearRmsAvg: average(state.window.mixedLinearRms),
      mixedLinearRmsMax: maximum(state.window.mixedLinearRms),
      mixedLinearPeakMax: maximum(state.window.mixedLinearPeak),
      micLinearRmsAvg: average(state.window.mic.linearRms),
      micLinearRmsMax: maximum(state.window.mic.linearRms),
      micLinearPeakMax: maximum(state.window.mic.linearPeak),
      micInputFillRatioAvg: average(state.window.mic.fillRatio),
      micInputFillRatioMin: minimum(state.window.mic.fillRatio),
      micInputStarvedRatio: ratio(
        state.window.mic.starvedSamples,
        state.window.mic.fillRatio.count,
      ),
      systemLinearRmsAvg: average(state.window.system.linearRms),
      systemLinearRmsMax: maximum(state.window.system.linearRms),
      systemLinearPeakMax: maximum(state.window.system.linearPeak),
      systemInputFillRatioAvg: average(state.window.system.fillRatio),
      systemInputFillRatioMin: minimum(state.window.system.fillRatio),
      systemInputStarvedRatio: ratio(
        state.window.system.starvedSamples,
        state.window.system.fillRatio.count,
      ),
    });
    state = {
      ...state,
      windowStartedAt: flushedAt,
      framesSentIn30sWindow: 0,
      bytesSentIn30sWindow: 0,
      audioSamplesIn30sWindow: 0,
      window: createWindowMetrics(),
    };
  };

  const pause = (): void => {
    flush('pause');
    if (state.sessionStartedAt !== null) {
      state.paused = true;
    }
  };

  const stop = (reason: NativeStreamingTelemetryReason): void => {
    flush(reason);
    state = createState();
  };

  return {
    start,
    setActiveSources,
    recordSent,
    recordAudioSample,
    flush,
    pause,
    stop,
  };
};
