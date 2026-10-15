import { type ChildProcess, spawn } from 'node:child_process';
import { EventEmitter } from 'node:events';

import { powerSaveBlocker } from 'electron';
import log from 'electron-log';

import {
  createNativeStartLineParser,
  type NativeStartDiagnostic,
} from '@/main/services/nativeStartDiagnostic';
import { getExternalModulePath } from '@/main/utils/module';
import { emitNativeAudioDiagnostic } from '@/main/utils/nativeAudioDiagnostics';
import { isMac } from '@/main/utils/platform';
import {
  observeSigtermSender,
  type SigtermSenderDiagnostics,
} from '@/main/utils/sigtermSenderDiagnostics';

// ---------------------------------------------------------------------------
// Desktop-used subset of tiro-audio-protocol
// ---------------------------------------------------------------------------

export type CaptureState = 'idle' | 'recording' | 'paused' | 'error';

export type AudioSource = 'mic' | 'system';

export type AudioSourceDiagnostics = {
  mixedLinearRms?: number;
  mixedLinearPeak?: number;
  micLinearRms?: number;
  micLinearPeak?: number;
  systemLinearRms?: number;
  systemLinearPeak?: number;
  micInputFillRatio?: number;
  systemInputFillRatio?: number;
};

export type CaptureConfig = {
  sources: AudioSource[];
  micDevice?: string;
  gains: {
    mic: number;
    system: number;
  };
};

export type NativeAudioFailureCode =
  | 'NATIVE_AUDIO_CAPTURE_FAILED'
  | 'NATIVE_AUDIO_MIC_NOT_FOUND'
  | 'NATIVE_AUDIO_SYSTEM_UNAVAILABLE'
  | 'NATIVE_AUDIO_NO_SOURCES'
  | 'NATIVE_AUDIO_PERMISSION_REQUIRED_MIC'
  | 'NATIVE_AUDIO_PERMISSION_REQUIRED_SYSTEM'
  | 'NATIVE_AUDIO_PERMISSION_DENIED'
  | 'NATIVE_AUDIO_START_TIMEOUT'
  | 'NATIVE_AUDIO_PROCESS_TERMINATED'
  | 'NATIVE_AUDIO_PROCESS_EXITED'
  | 'NATIVE_AUDIO_PROCESS_UNRESPONSIVE';

export type NativeAudioFailure = {
  code: NativeAudioFailureCode;
  message: string;
};

type StartConfig = Omit<CaptureConfig, 'gains'> & {
  gains?: CaptureConfig['gains'];
};

type ProcessSignalReason =
  | 'forced_shutdown'
  | 'crash_recovery'
  | 'stop_ack_timeout';

type AudioProcessDiagnosticContext = {
  childPid: number | null;
  parentPid: number;
  captureState: CaptureState;
};

export type AudioProcessDiagnostic = AudioProcessDiagnosticContext &
  (
    | {
        event:
          | 'native_audio_process_signal_sent'
          | 'native_audio_process_signal_failed';
        signal: NodeJS.Signals;
        reason: ProcessSignalReason;
      }
    | {
        event: 'native_audio_heartbeat_timeout';
        lastPongAgeMs: number;
        heartbeatTimeoutMs: number;
        failureCode: NativeAudioFailureCode;
      }
    | {
        event: 'native_audio_process_restart_failed';
        sourceChildPid: number | null;
        restartAttempt: number;
        maxRestarts: number;
        failureCode: NativeAudioFailureCode;
        errorMessage: string;
      }
  );

const DEFAULT_GAINS: CaptureConfig['gains'] = { mic: 1, system: 1 };

const cloneConfig = (config: CaptureConfig): CaptureConfig => ({
  ...config,
  sources: [...config.sources],
  gains: { ...config.gains },
});

export type MicDeviceChangeResult =
  | { status: 'applied' }
  | { status: 'deferred' }
  | { status: 'rolledBack' }
  | { status: 'paused' };

type Command =
  | {
      cmd: 'start';
      sources: AudioSource[];
      mic_device?: string;
      diagnostic_attempt_id?: number;
    }
  | { cmd: 'stop' }
  | { cmd: 'pause' }
  | { cmd: 'set_gain'; source: AudioSource; gain: number }
  | { cmd: 'ping' }
  | { cmd: 'shutdown' };

type CaptureEvent =
  | { event: 'started'; timestamp: number; sources?: AudioSource[] }
  | { event: 'stopped'; timestamp: number }
  | { event: 'paused' }
  | {
      event: 'level';
      rms: number;
      peak: number;
      mixed_linear_rms?: number | null;
      mixed_linear_peak?: number | null;
      mic_linear_rms?: number | null;
      mic_linear_peak?: number | null;
      system_linear_rms?: number | null;
      system_linear_peak?: number | null;
      mic_input_fill_ratio?: number | null;
      system_input_fill_ratio?: number | null;
    }
  | { event: 'error'; code: string; message: string; fatal: boolean }
  | { event: 'pong' }
  | { event: 'device_lost'; source: AudioSource }
  | { event: 'permission_required'; source: AudioSource };

export type CaptureEvents = {
  'start-diagnostic': [diagnostics: NativeStartDiagnostic];
  'sigterm-sender': [diagnostics: SigtermSenderDiagnostics];
  'process-diagnostic': [diagnostics: AudioProcessDiagnostic];
  'internal-state-change': [state: CaptureState];
  'state-change': [state: CaptureState];
  /** 16 kHz Int16 PCM (AGC + noise gate applied — for STT/STOMP). */
  'pcm-frame': [data: Buffer];
  /** 48 kHz Int16 PCM (raw — for offline WAV recording). */
  'pcm-frame-48k': [data: Buffer];
  'audio-level': [
    rms: number,
    peak: number,
    diagnostics: AudioSourceDiagnostics,
  ];
  'sources-state': [sources: AudioSource[], known: boolean];
  error: [code: string, message: string, fatal: boolean];
  'device-lost': [source: AudioSource];
  'mic-device-fallback-applied': [];
  'capture-interrupted': [failure: NativeAudioFailure];
  'permission-required': [source: AudioSource];
};

// ---------------------------------------------------------------------------
// Binary framing constants (must match tiro-audio-protocol)
// ---------------------------------------------------------------------------

const TAG_PCM_FRAME = 0x01;
const TAG_JSON_EVENT = 0x02;
const TAG_PCM_FRAME_48K = 0x03;
const FRAME_HEADER_SIZE = 5; // 1 tag + 4 length
const MIC_INPUT_STALL_LEVEL_THRESHOLD = 60; // 3 seconds at 50 ms per level event

const finiteUnitInterval = (value: unknown): number | undefined =>
  typeof value === 'number' &&
  Number.isFinite(value) &&
  value >= 0 &&
  value <= 1
    ? value
    : undefined;

// ---------------------------------------------------------------------------
// AudioCaptureProcess
// ---------------------------------------------------------------------------

/**
 * Manages the lifecycle of the tiro-audio-capture Rust binary.
 * Spawns the binary as a child process, parses stdout frames, and
 * forwards commands via stdin.
 */
export class AudioCaptureProcess extends EventEmitter<CaptureEvents> {
  private nextDiagnosticAttemptId = 0;
  private process: ChildProcess | null = null;
  private state: CaptureState = 'idle';
  private heartbeatTimer: NodeJS.Timeout | null = null;
  private lastPong: number = 0;
  private restartCount = 0;
  private powerSaveId: number | null = null;
  private activeSources: AudioSource[] = [];
  private actualSourcesKnown = false;
  private acceptStartedEvents = false;
  private acceptAudioFrames = false;
  private cancelPendingStart: ((error?: Error) => void) | null = null;
  private cancelPendingPauseAck: (() => void) | null = null;
  private startRequestToken: symbol | null = null;
  private startGeneration = 0;
  private stopAckPromise: Promise<void> | null = null;
  private resolveStopAck: (() => void) | null = null;
  private stopAckTimer: NodeJS.Timeout | null = null;
  private micSwitchPromise: Promise<MicDeviceChangeResult> | null = null;
  private isSwitchingMic = false;
  private consecutiveMicStalledLevels = 0;
  private lastSigtermRecoveryCompletedAt: number | null = null;

  // stdout buffer for incremental frame parsing
  private stdoutBuffer: Buffer = Buffer.alloc(0);

  private desiredConfig: CaptureConfig | null = null;
  private appliedConfig: CaptureConfig | null = null;
  private interruptedGeneration: number | null = null;
  // Active recovery timers, tracked so user-initiated stop/kill can cancel them
  private recoveryTimers: NodeJS.Timeout[] = [];
  // When true, a system-audio restart owns the capture lifecycle. Intermediate
  // idle/error transitions are swallowed so the renderer does not flicker.
  private isRecoveringSystemAudio = false;

  private readonly maxRestarts = 3;
  private readonly heartbeatIntervalMs = 5000;
  private readonly heartbeatTimeoutMs = 10000;
  private readonly startAckTimeoutMs = 3000;
  private readonly micRecoveryStopDelayMs = 300;
  private readonly micRecoverySettleDelayMs = 500;
  private readonly sampleRate: number;
  private readonly noiseGateDb: number;

  constructor(options?: { sampleRate?: number; noiseGateDb?: number }) {
    super();
    this.sampleRate = options?.sampleRate ?? 16000;
    this.noiseGateDb = options?.noiseGateDb ?? -50;
  }

  // ---------------------------------------------------------------------------
  // Public API
  // ---------------------------------------------------------------------------

  getState(): CaptureState {
    return this.state;
  }

  getActiveSources(): { sources: AudioSource[]; known: boolean } {
    return {
      sources: [...this.activeSources],
      known: this.actualSourcesKnown,
    };
  }

  isStopPending(): boolean {
    return this.stopAckPromise !== null;
  }

  isChangingMic(): boolean {
    return this.isSwitchingMic;
  }

  /**
   * Spawn the Rust binary. Called lazily on first recording start.
   */
  spawn(): void {
    if (this.process) return;

    const binaryPath = this.getBinaryPath();
    log.info(`[AudioCapture] Spawning: ${binaryPath}`);

    const args = [
      '--sample-rate',
      String(this.sampleRate),
      '--noise-gate-db',
      String(this.noiseGateDb),
    ];

    if (isMac) args.push('--signal-diagnostic-fd=3', '--start-diagnostic-fd=4');
    const spawnedProcess = isMac
      ? spawn(binaryPath, args, {
          stdio: ['pipe', 'pipe', 'pipe', 'pipe', 'pipe'],
        })
      : spawn(binaryPath, args);
    if (isMac) {
      observeSigtermSender(spawnedProcess, binaryPath, (diagnostics) => {
        this.emit('sigterm-sender', diagnostics);
      });
    }
    this.process = spawnedProcess;
    log.info('[AudioCapture] process spawned', {
      event: 'native_audio_process_spawned',
      childPid: spawnedProcess.pid ?? null,
      parentPid: process.pid,
    });

    spawnedProcess.stdout?.on('data', (chunk: Buffer) => {
      if (this.process !== spawnedProcess) return;
      this.handleStdoutData(chunk);
    });

    const parseStartDiagnostic = createNativeStartLineParser(
      ({ status, ...stage }) =>
        this.emitStartDiagnostic({
          ...stage,
          ...(status !== undefined ? { nativeStatus: status } : {}),
          childPid: spawnedProcess.pid ?? null,
          receivedAt: Date.now(),
          outcome: 'progress',
        }),
    );
    const startDiagnosticStream = spawnedProcess.stdio[4];
    startDiagnosticStream?.on('error', () => undefined);
    startDiagnosticStream?.on('data', (data: Buffer) => {
      if (this.process !== spawnedProcess) return;
      parseStartDiagnostic(data);
    });
    spawnedProcess.stderr?.on('data', (data: Buffer) => {
      if (this.process !== spawnedProcess) return;
      try {
        log.warn(`[AudioCapture] stderr: ${data.toString().trim()}`);
      } catch {
        return;
      }
    });

    spawnedProcess.on('exit', (code, signal) => {
      if (this.process !== spawnedProcess) return;
      this.handleProcessExit(spawnedProcess.pid ?? null, code, signal);
    });

    spawnedProcess.on('close', (code, signal) => {
      if (this.process !== spawnedProcess) return;
      this.handleProcessExit(spawnedProcess.pid ?? null, code, signal);
    });

    spawnedProcess.on('error', (err) => {
      if (this.process !== spawnedProcess) return;
      log.error(`[AudioCapture] Process error: ${err.message}`);
      if (spawnedProcess.pid === undefined) {
        this.handleProcessExit(null, null, null);
      }
    });

    this.lastPong = Date.now();
    this.startHeartbeat();
  }

  /**
   * Start audio capture with the given sources.
   */
  async start(input: StartConfig): Promise<void> {
    if (this.startRequestToken !== null) {
      throw new Error('Native audio start already pending');
    }
    if (
      this.stopAckPromise === null &&
      (this.state === 'recording' || this.state === 'paused')
    ) {
      throw new Error(`Native audio capture is already ${this.state}`);
    }
    const config: CaptureConfig = {
      micDevice: input.micDevice,
      sources: [...input.sources],
      gains: { ...(input.gains ?? DEFAULT_GAINS) },
    };
    this.restartCount = 0;
    this.lastSigtermRecoveryCompletedAt = null;
    this.interruptedGeneration = null;
    this.desiredConfig = cloneConfig(config);
    const requiredSources = [...config.sources];
    const isMacMicAndSystem =
      isMac &&
      requiredSources.includes('mic') &&
      requiredSources.includes('system');
    const startOptions = {
      startAckTimeoutMs: isMacMicAndSystem ? 5000 : this.startAckTimeoutMs,
      emitStartDiagnostics: isMacMicAndSystem,
    };
    let sigtermRetryAvailable = true;
    const startWithSigtermRetry = async (target: CaptureConfig) => {
      try {
        await this.startConfig(target, requiredSources, false, startOptions);
      } catch (error) {
        if (
          sigtermRetryAvailable &&
          error instanceof Error &&
          error.message.includes('NATIVE_AUDIO_PROCESS_TERMINATED')
        ) {
          sigtermRetryAvailable = false;
          await this.startConfig(target, requiredSources, false, startOptions);
          this.lastSigtermRecoveryCompletedAt = Date.now();
          return;
        }
        throw error;
      }
    };
    try {
      await startWithSigtermRetry(config);
    } catch (error) {
      const message = error instanceof Error ? error.message : '';
      const selectedMicFailed =
        config.micDevice && /missing required source: mic/i.test(message);
      if (!selectedMicFailed) throw error;

      const fallbackConfig: CaptureConfig = {
        ...config,
        micDevice: undefined,
      };
      this.desiredConfig = cloneConfig(fallbackConfig);
      await startWithSigtermRetry(fallbackConfig);
      this.emit('mic-device-fallback-applied');
    }
  }

  private startConfig(
    config: CaptureConfig,
    requiredSources: AudioSource[],
    restorePaused = false,
    startOptions = {
      startAckTimeoutMs: this.startAckTimeoutMs,
      emitStartDiagnostics: false,
    },
  ): Promise<void> {
    log.info('[AudioCapture] start() called with:', JSON.stringify(config));

    if (this.startRequestToken !== null) {
      return Promise.reject(new Error('Native audio start already pending'));
    }

    const generation = this.startGeneration;
    const requestToken = Symbol('native-audio-start');
    this.startRequestToken = requestToken;
    return this.startAfterPreviousStop(
      config,
      generation,
      requiredSources,
      restorePaused,
      startOptions,
    ).finally(() => {
      if (this.startRequestToken === requestToken) {
        this.startRequestToken = null;
      }
    });
  }

  private async startAfterPreviousStop(
    config: CaptureConfig,
    generation: number,
    requiredSources: AudioSource[],
    restorePaused: boolean,
    startOptions: { startAckTimeoutMs: number; emitStartDiagnostics: boolean },
  ): Promise<void> {
    const stopAckPromise = this.stopAckPromise;
    if (stopAckPromise !== null) {
      await stopAckPromise;
    }
    if (generation !== this.startGeneration) {
      throw new Error('Native audio start cancelled');
    }
    if (this.state === 'recording' || this.state === 'paused') {
      throw new Error(`Native audio capture is already ${this.state}`);
    }

    this.ensureSpawned();
    this.acceptStartedEvents = true;
    const attemptId = startOptions.emitStartDiagnostics
      ? ++this.nextDiagnosticAttemptId
      : undefined;
    const childPid = this.process?.pid ?? null;

    await new Promise<void>((resolve, reject) => {
      let settled = false;
      let configApplied = false;
      let timeout: ReturnType<typeof setTimeout> | null = null;
      let cancelStart: ((error?: Error) => void) | null = null;

      const cleanupListeners = () => {
        if (timeout) {
          clearTimeout(timeout);
          timeout = null;
        }
        this.off('internal-state-change', onStateChange);
        this.off('error', onError);
        this.off('permission-required', onPermissionRequired);
        if (cancelStart !== null && this.cancelPendingStart === cancelStart) {
          this.cancelPendingStart = null;
        }
      };

      const failStart = (error: Error, drainNativeCommand = false) => {
        if (settled) return;
        settled = true;
        if (drainNativeCommand) {
          this.acceptStartedEvents = false;
          this.acceptAudioFrames = false;
          this.requestStopAndDrain();
        }
        cleanupListeners();
        this.acceptStartedEvents = false;
        this.disablePowerSaveBlocker();
        reject(error);
      };

      cancelStart = (error = new Error('Native audio start cancelled')) => {
        failStart(error);
      };

      const onStateChange = (state: CaptureState) => {
        if (state === 'recording') {
          const missingRequiredSources = this.actualSourcesKnown
            ? requiredSources.filter(
                (source) => !this.activeSources.includes(source),
              )
            : [];
          if (missingRequiredSources.length > 0) {
            const micNotFound =
              missingRequiredSources.length === 1 &&
              missingRequiredSources[0] === 'mic' &&
              this.activeSources.length === 1 &&
              this.activeSources[0] === 'system';
            const code: NativeAudioFailureCode = micNotFound
              ? 'NATIVE_AUDIO_MIC_NOT_FOUND'
              : this.activeSources.length === 0
                ? 'NATIVE_AUDIO_NO_SOURCES'
                : missingRequiredSources.includes('system')
                  ? 'NATIVE_AUDIO_SYSTEM_UNAVAILABLE'
                  : 'NATIVE_AUDIO_CAPTURE_FAILED';
            failStart(
              this.failureError(
                code,
                `Native audio capture missing required source: ${missingRequiredSources.join(',')}`,
              ),
              true,
            );
            return;
          }
          if (settled) return;
          if (
            generation !== this.startGeneration ||
            this.desiredConfig === null
          ) {
            reject(new Error('Native audio start cancelled'));
            return;
          }
          const appliedConfig = {
            ...config,
            gains: { ...this.desiredConfig.gains },
          };
          this.sendCommand({
            cmd: 'set_gain',
            source: 'mic',
            gain: appliedConfig.gains.mic,
          });
          if (generation !== this.startGeneration) {
            reject(new Error('Native audio start cancelled'));
            return;
          }
          this.sendCommand({
            cmd: 'set_gain',
            source: 'system',
            gain: appliedConfig.gains.system,
          });
          if (generation !== this.startGeneration) {
            reject(new Error('Native audio start cancelled'));
            return;
          }
          this.desiredConfig = cloneConfig(appliedConfig);
          this.appliedConfig = cloneConfig(appliedConfig);
          configApplied = true;
          if (restorePaused) {
            this.acceptAudioFrames = false;
            this.sendCommand({ cmd: 'pause' });
            return;
          }
          settled = true;
          if (attemptId !== undefined)
            this.emitStartDiagnostic({
              attemptId,
              childPid,
              stage: 'ack_success',
              outcome: 'success',
              receivedAt: Date.now(),
            });
          cleanupListeners();
          this.startRequestToken = null;
          resolve();
          return;
        }

        if (state === 'paused' && restorePaused && configApplied) {
          settled = true;
          cleanupListeners();
          this.startRequestToken = null;
          resolve();
          return;
        }

        if (state === 'error') {
          failStart(new Error('Native audio capture entered error state'));
        }
      };

      const onError = (code: string, message: string, fatal: boolean) => {
        if (!fatal) return;
        const failure = this.failureFromNativeError({ code, message });
        failStart(this.failureError(failure.code, failure.message), true);
      };

      const onPermissionRequired = (source: AudioSource) => {
        failStart(
          this.failureError(
            source === 'mic'
              ? 'NATIVE_AUDIO_PERMISSION_REQUIRED_MIC'
              : 'NATIVE_AUDIO_PERMISSION_REQUIRED_SYSTEM',
            `Permission required for ${source}`,
          ),
          true,
        );
      };

      timeout = setTimeout(() => {
        if (attemptId !== undefined)
          this.emitStartDiagnostic({
            attemptId,
            childPid,
            stage: 'ack_timeout',
            outcome: 'timeout',
            receivedAt: Date.now(),
          });
        failStart(
          this.failureError(
            'NATIVE_AUDIO_START_TIMEOUT',
            'Native audio start timed out',
          ),
          true,
        );
      }, startOptions.startAckTimeoutMs);

      this.cancelPendingStart = cancelStart;
      this.on('internal-state-change', onStateChange);
      this.on('error', onError);
      this.on('permission-required', onPermissionRequired);

      if (attemptId !== undefined)
        this.emitStartDiagnostic({
          attemptId,
          childPid,
          stage: 'command_sent',
          outcome: 'progress',
          receivedAt: Date.now(),
          sources: config.sources.join(','),
          isDefaultMicDevice: !config.micDevice,
        });
      this.sendCommand({
        cmd: 'start',
        sources: config.sources,
        mic_device: config.micDevice,
        ...(attemptId !== undefined
          ? { diagnostic_attempt_id: attemptId }
          : {}),
      });
      this.enablePowerSaveBlocker();
    });
  }

  private emitStartDiagnostic(record: NativeStartDiagnostic): void {
    try {
      this.emit('start-diagnostic', record);
    } catch {
      return;
    }
  }

  stop(): Promise<void> {
    this.cancelPendingPauseAck?.();
    this.startGeneration += 1;
    this.acceptStartedEvents = false;
    this.acceptAudioFrames = false;
    this.requestStopAndDrain();
    const stopAckPromise = this.stopAckPromise ?? Promise.resolve();
    this.cancelPendingStart?.();
    this.startRequestToken = null;
    this.cancelRecovery();
    this.desiredConfig = null;
    this.appliedConfig = null;
    this.activeSources = [];
    this.actualSourcesKnown = false;
    this.disablePowerSaveBlocker();
    return stopAckPromise;
  }

  async changeMicDevice(micDevice?: string): Promise<MicDeviceChangeResult> {
    if (this.state !== 'recording' || !this.appliedConfig) {
      return { status: 'deferred' };
    }
    if (this.micSwitchPromise || this.isRecoveringSystemAudio) {
      throw new Error('Microphone change already in progress');
    }

    const previousConfig = cloneConfig(this.appliedConfig);
    const generation = this.startGeneration;
    this.isSwitchingMic = true;
    const transaction = this.runMicSwitchTransaction(
      previousConfig,
      micDevice,
      generation,
    ).finally(() => {
      this.isSwitchingMic = false;
      if (this.micSwitchPromise === transaction) {
        this.micSwitchPromise = null;
      }
    });
    this.micSwitchPromise = transaction;
    return transaction;
  }

  async pause(): Promise<void> {
    await this.micSwitchPromise;
    if (this.state === 'recording') {
      if (this.cancelPendingPauseAck !== null) {
        throw new Error('Native audio pause already pending');
      }
      this.sendCommand({ cmd: 'pause' });
      await this.waitForPauseAck();
    }
  }

  setGain(source: AudioSource, gain: number): void {
    if (this.desiredConfig) {
      this.desiredConfig = {
        ...this.desiredConfig,
        gains: { ...this.desiredConfig.gains, [source]: gain },
      };
    }
    if (
      this.startRequestToken !== null ||
      this.isSwitchingMic ||
      (this.isRecoveringSystemAudio &&
        (this.stopAckPromise !== null || this.state !== 'recording'))
    ) {
      return;
    }
    this.sendCommand({ cmd: 'set_gain', source, gain });
    if (this.appliedConfig) {
      this.appliedConfig = {
        ...this.appliedConfig,
        gains: { ...this.appliedConfig.gains, [source]: gain },
      };
    }
  }

  private async runMicSwitchTransaction(
    previousConfig: CaptureConfig,
    micDevice: string | undefined,
    generation: number,
  ): Promise<MicDeviceChangeResult> {
    const targetSources: AudioSource[] = previousConfig.sources.includes('mic')
      ? [...previousConfig.sources]
      : ['mic', ...previousConfig.sources];

    try {
      const targetConfig = {
        ...previousConfig,
        sources: targetSources,
        micDevice,
      };
      this.desiredConfig = cloneConfig(targetConfig);
      await this.restartCapture(targetConfig, targetSources);
      if (
        !previousConfig.sources.includes('mic') &&
        (!this.actualSourcesKnown || !this.activeSources.includes('mic'))
      ) {
        throw new Error('Native audio capture could not confirm mic source');
      }
      return { status: 'applied' };
    } catch (targetError) {
      if (generation !== this.startGeneration) throw targetError;

      try {
        const rollbackConfig = {
          ...previousConfig,
          gains: {
            ...(this.desiredConfig?.gains ?? previousConfig.gains),
          },
        };
        this.desiredConfig = cloneConfig(rollbackConfig);
        await this.restartCapture(rollbackConfig, previousConfig.sources);
        return { status: 'rolledBack' };
      } catch (rollbackError) {
        if (generation !== this.startGeneration) throw rollbackError;
        const stopAckPromise = this.stopAckPromise;
        if (stopAckPromise) await stopAckPromise;
        this.isSwitchingMic = false;
        this.setState('paused');
        this.emitCaptureInterruptedOnce({
          code: 'NATIVE_AUDIO_CAPTURE_FAILED',
          message: 'Microphone change and rollback failed',
        });
        return { status: 'paused' };
      }
    }
  }

  private restartCapture(
    config: CaptureConfig,
    requiredSources: AudioSource[],
  ): Promise<void> {
    if (this.state === 'recording' || this.state === 'paused') {
      this.acceptStartedEvents = false;
      this.acceptAudioFrames = false;
      this.requestStopAndDrain();
    }
    return this.startConfig(config, requiredSources);
  }

  /**
   * Re-bind system-audio (WASAPI loopback) capture to the current default
   * output device.
   *
   * Why this is needed: on Windows, plugging in earphones / a new speaker
   * mid-session changes the default render endpoint, but the existing loopback
   * stream stays bound to the *old* endpoint and silently stops delivering
   * frames — cpal raises no error, so the binary never emits `device_lost`.
   * The renderer detects the default-output switch and calls this to run the
   * same stop+start recovery, which re-opens loopback on the new default.
   *
   * No-op unless currently recording with the `system` source active (or
   * already mid-recovery), so spurious devicechange events are harmless.
   */
  recoverSystemAudio(): void {
    if (this.state !== 'recording') return;
    if (this.isRecoveringSystemAudio) return;
    if (!this.desiredConfig?.sources.includes('system')) return;
    log.warn(
      '[AudioCapture] Default output changed — re-binding system audio loopback',
    );
    this.scheduleDeviceLossRecovery('system');
  }

  /**
   * Gracefully shut down the binary.
   */
  shutdown(): void {
    this.startGeneration += 1;
    this.acceptStartedEvents = false;
    this.acceptAudioFrames = false;
    this.cancelPendingStart?.();
    this.startRequestToken = null;
    this.cancelRecovery();
    this.desiredConfig = null;
    this.appliedConfig = null;
    this.stopHeartbeat();
    this.disablePowerSaveBlocker();

    if (this.process) {
      this.sendCommand({ cmd: 'shutdown' });
      // Give it 2 seconds to exit gracefully, then force kill
      const forceTimer = setTimeout(() => {
        this.kill();
      }, 2000);
      this.process.once('exit', () => clearTimeout(forceTimer));
    }
  }

  /**
   * Force kill the binary process.
   */
  kill(): void {
    this.startGeneration += 1;
    this.acceptStartedEvents = false;
    this.acceptAudioFrames = false;
    this.cancelPendingStart?.();
    this.startRequestToken = null;
    this.cancelRecovery();
    this.desiredConfig = null;
    this.appliedConfig = null;
    this.activeSources = [];
    this.actualSourcesKnown = false;
    this.stopHeartbeat();
    this.disablePowerSaveBlocker();

    if (this.process) {
      const childProcess = this.process;
      this.process.stdout?.removeAllListeners();
      this.process.stderr?.removeAllListeners();
      this.process.stdio[4]?.removeAllListeners('data');
      this.process.removeAllListeners();
      this.signalProcess(childProcess, 'SIGTERM', 'forced_shutdown');
      this.process = null;
    }
    this.stdoutBuffer = Buffer.alloc(0);
    this.completeStopAckBarrier();
    this.setState('idle');
  }

  // ---------------------------------------------------------------------------
  // Private — Process management
  // ---------------------------------------------------------------------------

  private ensureSpawned(): void {
    if (!this.process) {
      this.spawn();
    }
  }

  private getBinaryPath(): string {
    const platform = isMac ? 'mac' : 'win';
    const ext = isMac ? '' : '.exe';
    return getExternalModulePath(`${platform}/tiro-audio-capture${ext}`);
  }

  private sendCommand(cmd: Command): void {
    if (!this.process?.stdin?.writable) {
      log.warn('[AudioCapture] Cannot send command — process not running');
      return;
    }
    const json = JSON.stringify(cmd) + '\n';
    this.process.stdin.write(json);
  }

  private waitForPauseAck(): Promise<void> {
    return new Promise((resolve, reject) => {
      let settled = false;
      let timeout: ReturnType<typeof setTimeout> | null = null;
      let cancelPauseAck: (() => void) | null = null;

      const cleanup = () => {
        if (timeout !== null) {
          clearTimeout(timeout);
          timeout = null;
        }
        this.off('internal-state-change', onStateChange);
        if (
          cancelPauseAck !== null &&
          this.cancelPendingPauseAck === cancelPauseAck
        ) {
          this.cancelPendingPauseAck = null;
        }
      };

      const settle = (error?: Error) => {
        if (settled) return;
        settled = true;
        cleanup();
        if (error) {
          reject(error);
        } else {
          resolve();
        }
      };

      const onStateChange = (state: CaptureState) => {
        if (state === 'paused') {
          settle();
        } else if (state === 'error' || state === 'idle') {
          settle(new Error(`Native audio pause interrupted by ${state}`));
        }
      };

      cancelPauseAck = () => {
        settle(new Error('Native audio pause cancelled'));
      };
      this.cancelPendingPauseAck = cancelPauseAck;
      this.on('internal-state-change', onStateChange);
      timeout = setTimeout(() => {
        settle(new Error('Native audio pause timed out'));
      }, this.startAckTimeoutMs);
    });
  }

  private setState(newState: CaptureState): void {
    if (this.state === newState) return;
    log.info(`[AudioCapture] State: ${this.state} → ${newState}`);
    this.state = newState;
    this.emit('internal-state-change', newState);

    // A restart is one externally atomic transaction. Keep the renderer on
    // its previous recording state until success, or publish one terminal
    // state after rollback fails.
    if (this.isRecoveringSystemAudio || this.isSwitchingMic) {
      log.info(
        `[AudioCapture] State change to ${newState} suppressed during capture restart`,
      );
      return;
    }
    this.emit('state-change', newState);
  }

  // ---------------------------------------------------------------------------
  // Private — stdout binary frame parsing
  // ---------------------------------------------------------------------------

  private handleStdoutData(chunk: Buffer): void {
    this.stdoutBuffer = Buffer.concat([this.stdoutBuffer, chunk]);

    while (this.stdoutBuffer.length >= FRAME_HEADER_SIZE) {
      const tag = this.stdoutBuffer[0];
      const payloadLength = this.stdoutBuffer.readUInt32LE(1);
      const totalLength = FRAME_HEADER_SIZE + payloadLength;

      if (this.stdoutBuffer.length < totalLength) {
        break; // wait for more data
      }

      const payload = this.stdoutBuffer.subarray(
        FRAME_HEADER_SIZE,
        totalLength,
      );
      this.stdoutBuffer = this.stdoutBuffer.subarray(totalLength);

      if (tag === TAG_PCM_FRAME) {
        if (this.acceptAudioFrames) {
          this.emit('pcm-frame', Buffer.from(payload));
        }
      } else if (tag === TAG_PCM_FRAME_48K) {
        if (this.acceptAudioFrames) {
          this.emit('pcm-frame-48k', Buffer.from(payload));
        }
      } else if (tag === TAG_JSON_EVENT) {
        this.handleJsonEvent(payload);
      } else {
        log.warn(`[AudioCapture] Unknown frame tag: 0x${tag.toString(16)}`);
      }
    }
  }

  private handleJsonEvent(payload: Buffer): void {
    try {
      const event = JSON.parse(payload.toString('utf-8')) as CaptureEvent;

      switch (event.event) {
        case 'started':
          if (!this.acceptStartedEvents) {
            log.warn('[AudioCapture] Ignoring stale started event');
            break;
          }
          this.consecutiveMicStalledLevels = 0;
          this.actualSourcesKnown = Array.isArray(event.sources);
          this.activeSources = this.actualSourcesKnown
            ? [...(event.sources ?? [])]
            : [...(this.desiredConfig?.sources ?? [])];
          this.emit(
            'sources-state',
            [...this.activeSources],
            this.actualSourcesKnown,
          );
          this.enablePowerSaveBlocker();
          this.acceptAudioFrames = true;
          this.setState('recording');
          break;

        case 'stopped':
          this.consecutiveMicStalledLevels = 0;
          this.acceptAudioFrames = false;
          this.activeSources = [];
          this.actualSourcesKnown = false;
          this.emit('sources-state', [], false);
          this.setState('idle');
          this.disablePowerSaveBlocker();
          this.completeStopAckBarrier();
          break;

        case 'paused':
          if (!this.acceptStartedEvents) break;
          this.setState('paused');
          break;

        case 'level':
          if (this.acceptAudioFrames) {
            const micInputFillRatio = finiteUnitInterval(
              event.mic_input_fill_ratio,
            );
            this.emit('audio-level', event.rms, event.peak, {
              mixedLinearRms: finiteUnitInterval(event.mixed_linear_rms),
              mixedLinearPeak: finiteUnitInterval(event.mixed_linear_peak),
              micLinearRms: finiteUnitInterval(event.mic_linear_rms),
              micLinearPeak: finiteUnitInterval(event.mic_linear_peak),
              systemLinearRms: finiteUnitInterval(event.system_linear_rms),
              systemLinearPeak: finiteUnitInterval(event.system_linear_peak),
              micInputFillRatio,
              systemInputFillRatio: finiteUnitInterval(
                event.system_input_fill_ratio,
              ),
            });
            if (
              this.activeSources.includes('mic') &&
              micInputFillRatio === 0 &&
              this.desiredConfig?.micDevice !== undefined
            ) {
              this.consecutiveMicStalledLevels += 1;
              if (
                this.consecutiveMicStalledLevels >=
                MIC_INPUT_STALL_LEVEL_THRESHOLD
              ) {
                this.consecutiveMicStalledLevels = 0;
                log.warn(
                  '[AudioCapture] Mic input stalled — recovering on OS default',
                );
                this.emit('device-lost', 'mic');
                this.recoverMicOnOsDefault();
              }
            } else {
              this.consecutiveMicStalledLevels = 0;
            }
          }
          break;

        case 'error':
          log.error(
            `[AudioCapture] Error: [${event.code}] ${event.message} (fatal: ${event.fatal})`,
          );
          if (event.fatal) {
            const captureWasActive =
              this.startRequestToken === null &&
              (this.state === 'recording' || this.state === 'paused');
            const recoveryOwnsFailure =
              this.isRecoveringSystemAudio && this.startRequestToken !== null;
            this.acceptStartedEvents = false;
            this.acceptAudioFrames = false;
            this.activeSources = [];
            this.actualSourcesKnown = true;
            this.emit('sources-state', [], true);
            if (!recoveryOwnsFailure) {
              this.cancelRecovery();
            }
            // Guarded because node's EventEmitter *throws* on an unhandled
            // 'error' emit. Crashing the main process would kill the user's
            // recording outright, which is worse than dropping one log line.
            if (this.listenerCount('error') > 0) {
              this.emit('error', event.code, event.message, true);
            }
            this.setState('error');
            if (
              captureWasActive &&
              !this.isSwitchingMic &&
              !recoveryOwnsFailure
            ) {
              this.emitCaptureInterruptedOnce(
                this.failureFromNativeError(event),
              );
            }
          } else if (this.listenerCount('error') > 0) {
            this.emit('error', event.code, event.message, false);
          }
          break;

        case 'pong':
          this.lastPong = Date.now();
          break;

        case 'device_lost':
          this.emit('device-lost', event.source);
          // Both mic and system device loss are recoverable via stop+start.
          // Mic: earphones unplugged / BT disconnect → OS falls back to built-in.
          // System: new audio output connected on Windows → WASAPI loopback
          //   handle invalidated, but a restart picks up the new default output.
          if (this.desiredConfig) {
            log.warn(
              `[AudioCapture] ${event.source} device lost — scheduling auto-restart`,
            );
            if (event.source === 'mic') {
              this.recoverMicOnOsDefault();
            } else {
              this.scheduleDeviceLossRecovery(event.source);
            }
          } else {
            this.setState('error');
          }
          break;

        case 'permission_required':
          log.warn(`[AudioCapture] Permission required for: ${event.source}`);
          this.emit('permission-required', event.source);
          break;
      }
    } catch (e) {
      log.error('[AudioCapture] Failed to parse JSON event:', e);
    }
  }

  // ---------------------------------------------------------------------------
  // Private — Device-loss recovery
  // ---------------------------------------------------------------------------

  private recoverMicOnOsDefault(): void {
    if (!this.desiredConfig) return;
    if (this.isRecoveringSystemAudio) {
      this.cancelRecovery();
    }
    void this.changeMicDevice(undefined)
      .then((result) => {
        if (result.status === 'applied') {
          this.emit('mic-device-fallback-applied');
        }
      })
      .catch((error: unknown) => {
        log.error('[AudioCapture] Mic device recovery failed', error);
      });
  }

  /**
   * Recover from a system `device_lost` event.
   *
   * On Windows, connecting new headphones / BT speaker invalidates the
   * WASAPI loopback handle. A stop+start picks up the new default output
   * device, restoring system sound capture.
   */
  private scheduleDeviceLossRecovery(source: AudioSource): void {
    if (this.isRecoveringSystemAudio || !this.desiredConfig) return;

    const requiredSources = [...this.desiredConfig.sources];
    this.isRecoveringSystemAudio = true;
    this.acceptStartedEvents = false;
    this.acceptAudioFrames = false;

    this.requestStopAndDrain();

    const restartTimer = setTimeout(() => {
      this.recoveryTimers = this.recoveryTimers.filter(
        (t) => t !== restartTimer,
      );
      if (!this.isRecoveringSystemAudio) return;
      if (this.startRequestToken !== null) return;
      log.info(`[AudioCapture] Auto-restart after ${source} device loss`);
      const config = this.desiredConfig;
      if (!config) return;
      void this.startConfig(cloneConfig(config), requiredSources)
        .then(() => {
          const settleTimer = setTimeout(() => {
            this.recoveryTimers = this.recoveryTimers.filter(
              (t) => t !== settleTimer,
            );
            this.isRecoveringSystemAudio = false;
            log.info(`[AudioCapture] ${source} device recovery complete`);
          }, this.micRecoverySettleDelayMs);
          this.recoveryTimers.push(settleTimer);
        })
        .catch((error: unknown) => {
          if (!this.isRecoveringSystemAudio) return;
          log.error(`[AudioCapture] ${source} device recovery failed`, error);
          this.isRecoveringSystemAudio = false;
          this.setState('paused');
          this.emitCaptureInterruptedOnce({
            code: 'NATIVE_AUDIO_CAPTURE_FAILED',
            message: `${source} device recovery failed`,
          });
        });
    }, this.micRecoveryStopDelayMs);
    this.recoveryTimers.push(restartTimer);
  }

  private cancelRecovery(): void {
    if (this.recoveryTimers.length === 0 && !this.isRecoveringSystemAudio)
      return;
    this.recoveryTimers.forEach(clearTimeout);
    this.recoveryTimers = [];
    this.isRecoveringSystemAudio = false;
  }

  // ---------------------------------------------------------------------------
  // Private — Heartbeat
  // ---------------------------------------------------------------------------

  private startHeartbeat(): void {
    this.stopHeartbeat();
    this.heartbeatTimer = setInterval(() => {
      if (!this.process) return;

      // Check if pong was received within timeout
      const lastPongAgeMs = Date.now() - this.lastPong;
      if (lastPongAgeMs > this.heartbeatTimeoutMs) {
        log.error('[AudioCapture] Heartbeat timeout');
        emitNativeAudioDiagnostic(() => {
          this.emit('process-diagnostic', {
            event: 'native_audio_heartbeat_timeout',
            childPid: this.process?.pid ?? null,
            parentPid: process.pid,
            captureState: this.state,
            lastPongAgeMs,
            heartbeatTimeoutMs: this.heartbeatTimeoutMs,
            failureCode: 'NATIVE_AUDIO_PROCESS_UNRESPONSIVE',
          });
        });
        this.handleProcessCrash(this.state === 'paused', {
          code: 'NATIVE_AUDIO_PROCESS_UNRESPONSIVE',
          message: 'Native audio process stopped responding',
        });
        return;
      }

      this.sendCommand({ cmd: 'ping' });
    }, this.heartbeatIntervalMs);
  }

  private stopHeartbeat(): void {
    if (this.heartbeatTimer) {
      clearInterval(this.heartbeatTimer);
      this.heartbeatTimer = null;
    }
  }

  // ---------------------------------------------------------------------------
  // Private — Crash handling
  // ---------------------------------------------------------------------------

  private handleProcessExit(
    childPid: number | null,
    code: number | null,
    signal: string | null,
  ): void {
    log.info('[AudioCapture] process exited', {
      event: 'native_audio_process_exited',
      childPid,
      code,
      signal,
      state: this.state,
      restartCount: this.restartCount,
    });
    this.process = null;
    this.stdoutBuffer = Buffer.alloc(0);
    this.stopHeartbeat();
    this.disablePowerSaveBlocker();
    this.acceptAudioFrames = false;
    this.activeSources = [];
    this.actualSourcesKnown = false;
    this.emit('sources-state', [], false);
    this.completeStopAckBarrier();

    if (this.startRequestToken !== null) {
      this.cancelPendingStart?.(
        this.failureError(
          signal === 'SIGTERM'
            ? 'NATIVE_AUDIO_PROCESS_TERMINATED'
            : 'NATIVE_AUDIO_PROCESS_EXITED',
          `Native audio process exited before start: code=${code} signal=${signal}`,
        ),
      );
      this.setState('idle');
      return;
    }

    if (
      (this.state === 'recording' || this.state === 'paused') &&
      this.desiredConfig
    ) {
      const failure: NativeAudioFailure = {
        code:
          signal === 'SIGTERM'
            ? 'NATIVE_AUDIO_PROCESS_TERMINATED'
            : 'NATIVE_AUDIO_PROCESS_EXITED',
        message: `Native audio process exited: code=${code} signal=${signal}`,
      };
      if (signal === 'SIGTERM') {
        const now = Date.now();
        if (
          this.lastSigtermRecoveryCompletedAt !== null &&
          now - this.lastSigtermRecoveryCompletedAt <= 5000
        ) {
          this.finishCrashRecovery(failure);
          return;
        }
        this.restartCount = 0;
        this.handleProcessCrash(this.state === 'paused', failure, 1);
        return;
      }
      this.handleProcessCrash(this.state === 'paused', failure);
    } else {
      this.setState('idle');
    }
  }

  private handleProcessCrash(
    restorePaused = this.state === 'paused',
    failure: NativeAudioFailure = {
      code: 'NATIVE_AUDIO_PROCESS_EXITED',
      message: 'Native audio process exited unexpectedly',
    },
    maxRestarts = this.maxRestarts,
  ): void {
    const config = this.desiredConfig ?? this.appliedConfig;
    if (!config) {
      this.terminateProcess();
      return;
    }

    const sourceChildPid = this.process?.pid ?? null;
    this.cancelRecovery();
    this.isRecoveringSystemAudio = true;
    this.terminateProcess();

    if (this.restartCount < maxRestarts) {
      this.restartCount++;
      log.warn(
        `[AudioCapture] Restart attempt ${this.restartCount}/${maxRestarts}`,
      );
      this.spawn();
      const childPid = this.process?.pid ?? null;
      const restartAttempt = this.restartCount;
      void this.startConfig(cloneConfig(config), config.sources, restorePaused)
        .then(() => {
          if (failure.code === 'NATIVE_AUDIO_PROCESS_TERMINATED') {
            this.lastSigtermRecoveryCompletedAt = Date.now();
          }
          this.isRecoveringSystemAudio = false;
        })
        .catch((error: unknown) => {
          if (!this.isRecoveringSystemAudio) return;
          log.error('[AudioCapture] Process restart failed', error);
          emitNativeAudioDiagnostic(() => {
            this.emit('process-diagnostic', {
              event: 'native_audio_process_restart_failed',
              childPid,
              sourceChildPid,
              parentPid: process.pid,
              captureState: this.state,
              restartAttempt,
              maxRestarts,
              failureCode: failure.code,
              errorMessage:
                error instanceof Error ? error.message : String(error),
            });
          });
          this.handleProcessCrash(restorePaused, failure, maxRestarts);
        });
    } else {
      this.finishCrashRecovery(failure);
    }
  }

  private finishCrashRecovery(failure: NativeAudioFailure): void {
    log.error('[AudioCapture] Capture recovery stopped', failure);
    this.isRecoveringSystemAudio = false;
    this.desiredConfig = null;
    this.appliedConfig = null;
    this.setState('error');
    this.emitCaptureInterruptedOnce(failure);
    if (this.listenerCount('error') > 0) {
      this.emit('error', failure.code, failure.message, true);
    }
  }

  private createStopAckBarrier(): void {
    if (this.stopAckPromise !== null) return;

    this.stopAckPromise = new Promise((resolve) => {
      this.resolveStopAck = resolve;
    });
    this.stopAckTimer = setTimeout(() => {
      log.warn(
        '[AudioCapture] Timed out waiting for stopped event; restarting process',
      );
      this.resetProcessAfterStopTimeout();
    }, this.startAckTimeoutMs);
  }

  /**
   * Ask the sidecar to stop and wait for its acknowledgement.
   *
   * The command is sent whenever a child exists — we never try to predict the
   * sidecar's state from our own flags. `Command::Stop` in the sidecar is
   * unconditional and idempotent: it tears down every source and always
   * answers `stopped`, whatever state it was in. A redundant stop therefore
   * costs one round trip, while a *skipped* stop is unrecoverable — the
   * sidecar keeps capturing with the microphone held open, and because it is
   * then no longer `Idle` every later `start` is refused with a non-fatal
   * `InvalidCommand`, bricking recording until the app restarts.
   */
  private requestStopAndDrain(): void {
    if (this.process === null) return;

    this.createStopAckBarrier();
    this.sendCommand({ cmd: 'stop' });
  }

  private completeStopAckBarrier(): void {
    if (this.stopAckTimer !== null) {
      clearTimeout(this.stopAckTimer);
      this.stopAckTimer = null;
    }
    const resolve = this.resolveStopAck;
    this.resolveStopAck = null;
    this.stopAckPromise = null;
    resolve?.();
  }

  private resetProcessAfterStopTimeout(): void {
    this.acceptStartedEvents = false;
    this.acceptAudioFrames = false;
    this.activeSources = [];
    this.actualSourcesKnown = false;
    this.stopHeartbeat();
    this.disablePowerSaveBlocker();

    // Keep the stop barrier and exit listener until the OS confirms that the
    // timed-out sidecar no longer owns the audio devices. Ignore every late
    // stdout event so a buffered `stopped` cannot release the barrier early.
    this.process?.stdout?.removeAllListeners('data');
    if (this.process) {
      this.signalProcess(this.process, 'SIGKILL', 'stop_ack_timeout');
    }
  }

  private terminateProcess(): void {
    this.acceptStartedEvents = false;
    this.acceptAudioFrames = false;
    this.stopHeartbeat();
    this.disablePowerSaveBlocker();
    if (this.process) {
      const childProcess = this.process;
      this.process.stdout?.removeAllListeners();
      this.process.stderr?.removeAllListeners();
      this.process.stdio[4]?.removeAllListeners('data');
      this.process.removeAllListeners();
      this.signalProcess(childProcess, 'SIGTERM', 'crash_recovery');
      this.process = null;
    }
    this.stdoutBuffer = Buffer.alloc(0);
    this.completeStopAckBarrier();
    this.setState('idle');
  }

  private signalProcess(
    childProcess: ChildProcess,
    signal: NodeJS.Signals,
    reason: ProcessSignalReason,
  ): void {
    const sent = childProcess.kill(signal);
    log.warn('[AudioCapture] sending process signal', {
      event: sent
        ? 'native_audio_process_signal_sent'
        : 'native_audio_process_signal_failed',
      childPid: childProcess.pid ?? null,
      signal,
      reason,
    });
    emitNativeAudioDiagnostic(() => {
      this.emit('process-diagnostic', {
        event: sent
          ? 'native_audio_process_signal_sent'
          : 'native_audio_process_signal_failed',
        childPid: childProcess.pid ?? null,
        parentPid: process.pid,
        captureState: this.state,
        signal,
        reason,
      });
    });
  }

  private emitCaptureInterruptedOnce(failure: NativeAudioFailure): void {
    if (this.interruptedGeneration === this.startGeneration) return;
    this.interruptedGeneration = this.startGeneration;
    this.emit('capture-interrupted', failure);
  }

  private failureError(code: NativeAudioFailureCode, message: string): Error {
    return new Error(`[${code}] ${message}`);
  }

  private failureFromNativeError(event: {
    code: string;
    message: string;
  }): NativeAudioFailure {
    return {
      code:
        event.code === 'PERMISSION_DENIED'
          ? 'NATIVE_AUDIO_PERMISSION_DENIED'
          : event.code === 'STREAM_ERROR' &&
              event.message === 'No audio sources available'
            ? 'NATIVE_AUDIO_NO_SOURCES'
            : 'NATIVE_AUDIO_CAPTURE_FAILED',
      message: `[${event.code}] ${event.message}`,
    };
  }

  // ---------------------------------------------------------------------------
  // Private — Power management
  // ---------------------------------------------------------------------------

  private enablePowerSaveBlocker(): void {
    if (this.powerSaveId === null) {
      this.powerSaveId = powerSaveBlocker.start('prevent-app-suspension');
      log.info(
        `[AudioCapture] Power save blocker enabled (id: ${this.powerSaveId})`,
      );
    }
  }

  private disablePowerSaveBlocker(): void {
    if (this.powerSaveId !== null) {
      powerSaveBlocker.stop(this.powerSaveId);
      log.info(
        `[AudioCapture] Power save blocker disabled (id: ${this.powerSaveId})`,
      );
      this.powerSaveId = null;
    }
  }
}
