import { z } from 'zod';

export const nativeStartStageSchema = z
  .object({
    attemptId: z.number().int().positive().max(Number.MAX_SAFE_INTEGER),
    stage: z.enum([
      'start_command',
      'mic_device_lookup',
      'mic_default_config',
      'mic_build_stream',
      'mic_play',
      'system_tap_create',
      'system_tap_uid',
      'system_aggregate_create',
      'system_sample_rate',
      'system_ioproc_create',
      'system_device_start',
    ]),
    phase: z.enum(['begin', 'end']),
    status: z.number().int().optional(),
    sampleRate: z.number().int().positive().max(768000).optional(),
    channels: z.number().int().positive().max(128).optional(),
  })
  .strict();

export type NativeStartStage = z.infer<typeof nativeStartStageSchema> &
  Required<
    Pick<
      z.infer<typeof nativeStartStageSchema>,
      'attemptId' | 'stage' | 'phase'
    >
  >;
type StartDiagnosticStamp = {
  attemptId: number;
  childPid: number | null;
  receivedAt: number;
};

export type NativeStartDiagnostic = StartDiagnosticStamp &
  (
    | (Omit<NativeStartStage, 'status'> & {
        nativeStatus?: number;
        outcome: 'progress';
      })
    | {
        stage: 'command_sent';
        outcome: 'progress';
        sources: string;
        isDefaultMicDevice: boolean;
      }
    | { stage: 'ack_success'; outcome: 'success' }
    | { stage: 'ack_timeout'; outcome: 'timeout' }
  );

export const nativeStartTelemetryContext = (
  diagnostic: NativeStartDiagnostic,
  snapshot: Readonly<Record<string, string | number | boolean>>,
) => ({
  ...(diagnostic.stage === 'command_sent' ? snapshot : {}),
  ...diagnostic,
  event: 'native_audio_start_stage',
});

const PREFIX = '[tiro-start-stage] ';
const MAX_LINE_BYTES = 4096;

export const createNativeStartLineParser = (
  accept: (stage: NativeStartStage) => void,
) => {
  let pending = '';
  let dropping = false;
  return (chunk: Buffer): void => {
    for (const part of chunk.toString().split(/(?<=\n)/)) {
      if (!dropping) pending += part;
      if (Buffer.byteLength(pending) > MAX_LINE_BYTES) {
        pending = '';
        dropping = true;
      }
      if (!part.endsWith('\n')) continue;
      const line = pending.trimEnd();
      pending = '';
      if (dropping) {
        dropping = false;
        continue;
      }
      if (!line.startsWith(PREFIX)) continue;
      try {
        const parsed = nativeStartStageSchema.safeParse(
          JSON.parse(line.slice(PREFIX.length)),
        );
        if (parsed.success)
          accept({
            ...parsed.data,
            attemptId: parsed.data.attemptId,
            stage: parsed.data.stage,
            phase: parsed.data.phase,
          });
      } catch {
        continue;
      }
    }
  };
};
