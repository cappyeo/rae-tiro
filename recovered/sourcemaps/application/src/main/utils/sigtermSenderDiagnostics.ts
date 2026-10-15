import { type ChildProcess, execFile } from 'node:child_process';

import { z } from 'zod';

import { emitNativeAudioDiagnostic } from '@/main/utils/nativeAudioDiagnostics';

const pathResultSchema = z.discriminatedUnion('status', [
  z.object({ status: z.literal('resolved'), path: z.string().min(1) }),
  z.object({ status: z.literal('process_not_found'), errno: z.number().int() }),
  z.object({ status: z.literal('permission_denied'), errno: z.number().int() }),
  z.object({ status: z.literal('lookup_failed'), errno: z.number().int() }),
]);

type PathResult =
  | z.infer<typeof pathResultSchema>
  | { status: 'lookup_timeout' }
  | { status: 'lookup_failed'; errno: null };

type SenderRecord = {
  signalCode: number | null;
  senderPid: number | null;
  senderUid: number | null;
};

type SenderPath =
  | {
      senderPathLookupStatus: 'resolved';
      senderExecutablePath: string;
      senderPathLookupErrno: null;
    }
  | {
      senderPathLookupStatus:
        | Exclude<PathResult['status'], 'resolved'>
        | 'sender_unavailable'
        | 'diagnostics_unavailable';
      senderExecutablePath: null;
      senderPathLookupErrno: number | null;
    };

export type SigtermSenderDiagnostics = SenderRecord &
  SenderPath & {
    event: 'native_audio_sigterm_sender';
    childPid: number | null;
    signal: 'SIGTERM';
    senderPathLookupMethod: 'proc_pidpath';
    diagnosticRecordStatus: 'received' | 'missing' | 'invalid' | 'stream_error';
  };

export function resolveSenderPath(
  binaryPath: string,
  senderPid: number,
): Promise<PathResult> {
  return new Promise((resolve) => {
    try {
      execFile(
        binaryPath,
        ['resolve-process-path', '--pid', String(senderPid)],
        { timeout: 500, maxBuffer: 8192 },
        (error, stdout) => {
          if (error) {
            resolve(
              error.killed && error.code !== 'ERR_CHILD_PROCESS_STDIO_MAXBUFFER'
                ? { status: 'lookup_timeout' }
                : { status: 'lookup_failed', errno: null },
            );
            return;
          }
          try {
            const parsed = pathResultSchema.safeParse(JSON.parse(stdout));
            resolve(
              parsed.success
                ? parsed.data
                : { status: 'lookup_failed', errno: null },
            );
          } catch {
            resolve({ status: 'lookup_failed', errno: null });
          }
        },
      );
    } catch {
      resolve({ status: 'lookup_failed', errno: null });
    }
  });
}

function decodeRecord(buffer: Buffer): SenderRecord | null {
  if (
    buffer.length !== 24 ||
    buffer.readUInt32LE(0) !== 0x5449524f ||
    buffer.readUInt32LE(4) !== 1 ||
    buffer.readInt32LE(8) !== 15
  )
    return null;
  const code = buffer.readInt32LE(12);
  const pid = buffer.readInt32LE(16);
  const identified = (code === 0 || code === 0x10001) && pid > 0;
  return {
    signalCode: code === -2147483648 ? null : code,
    senderPid: identified ? pid : null,
    senderUid: identified ? buffer.readUInt32LE(20) : null,
  };
}

export function observeSigtermSender(
  child: ChildProcess,
  binaryPath: string,
  emit: (diagnostics: SigtermSenderDiagnostics) => void,
): void {
  const report = (diagnostics: SigtermSenderDiagnostics) => {
    emitNativeAudioDiagnostic(() => emit(diagnostics));
  };
  const childPid = child.pid ?? null;
  let buffer = Buffer.alloc(0);
  let recordStatus: SigtermSenderDiagnostics['diagnosticRecordStatus'] =
    'missing';
  let observed = false;
  const base = {
    event: 'native_audio_sigterm_sender',
    childPid,
    signal: 'SIGTERM',
    senderPathLookupMethod: 'proc_pidpath',
  } satisfies Pick<
    SigtermSenderDiagnostics,
    'event' | 'childPid' | 'signal' | 'senderPathLookupMethod'
  >;
  const stream = child.stdio?.[3];
  stream?.on('error', () => {
    recordStatus = 'stream_error';
  });
  stream?.on('data', (chunk: Buffer) => {
    if (observed || recordStatus === 'invalid') return;
    if (buffer.length + chunk.length > 24) {
      recordStatus = 'invalid';
      return;
    }
    buffer = Buffer.concat([buffer, chunk]);
    if (buffer.length < 24) return;
    const sender = decodeRecord(buffer);
    if (!sender) {
      recordStatus = 'invalid';
      return;
    }
    observed = true;
    if (sender.senderPid === null) {
      report({
        ...base,
        ...sender,
        diagnosticRecordStatus: 'received',
        senderPathLookupStatus: 'sender_unavailable',
        senderExecutablePath: null,
        senderPathLookupErrno: null,
      });
      return;
    }
    void resolveSenderPath(binaryPath, sender.senderPid).then((result) => {
      const path: SenderPath =
        result.status === 'resolved'
          ? {
              senderPathLookupStatus: 'resolved',
              senderExecutablePath: result.path,
              senderPathLookupErrno: null,
            }
          : {
              senderPathLookupStatus: result.status,
              senderExecutablePath: null,
              senderPathLookupErrno: 'errno' in result ? result.errno : null,
            };
      report({
        ...base,
        ...sender,
        ...path,
        diagnosticRecordStatus: 'received',
      });
    });
  });
  // Node emits child close after stdio closes, so late diagnostic bytes have drained.
  child.once('close', (_code, signal) => {
    if (signal !== 'SIGTERM' || observed) return;
    report({
      ...base,
      senderPid: null,
      senderUid: null,
      signalCode: null,
      diagnosticRecordStatus:
        buffer.length > 0 && recordStatus === 'missing'
          ? 'invalid'
          : recordStatus,
      senderPathLookupStatus: 'diagnostics_unavailable',
      senderExecutablePath: null,
      senderPathLookupErrno: null,
    });
  });
}

export function sigtermSenderTelemetryContext(
  diagnostics: SigtermSenderDiagnostics,
): Record<string, string | number> {
  const context: Record<string, string | number> = {};
  for (const [key, value] of Object.entries(diagnostics)) {
    if (value !== null) context[key] = value;
  }
  return context;
}
