import { type FileHandle, open, stat } from 'node:fs/promises';

import { session } from 'electron';

export const RECORDING_MULTIPART_PART_SIZE = 32 * 1024 * 1024;
export const MAX_RECORDING_UPLOAD_FILE_SIZE = 1024 * 1024 * 1024;
const MAX_RECORDING_MULTIPART_PARTS = 32;
const RECORDING_MULTIPART_CONCURRENCY = 3;

export type OfflineRecordingUploadPart = {
  partNumber: number;
  uploadUrl: string;
};

export type CompletedOfflineRecordingUploadPart = {
  partNumber: number;
  eTag: string;
};

export type OfflineRecordingMultipartResult =
  | { success: true; parts: CompletedOfflineRecordingUploadPart[] }
  | { success: false; status: number };

export class OfflineRecordingFileError extends Error {}

const RECORDING_UPLOAD_S3_HOSTS = new Set([
  'theplato-app-tiro-audio-dev.s3-accelerate.amazonaws.com',
  'tiro-audio.s3-accelerate.amazonaws.com',
]);

const REQUIRED_SIGV4_PARAMS = [
  'X-Amz-Credential',
  'X-Amz-Date',
  'X-Amz-SignedHeaders',
  'X-Amz-Signature',
] as const;

const validateFileSize = (fileSize: number): void => {
  if (
    !Number.isSafeInteger(fileSize) ||
    fileSize <= 0 ||
    fileSize > MAX_RECORDING_UPLOAD_FILE_SIZE
  ) {
    throw new OfflineRecordingFileError(
      'Offline recording size is outside the upload limit',
    );
  }
};

const validateMultipartContract = (
  fileSize: number,
  partSize: number,
  uploadParts: OfflineRecordingUploadPart[],
): void => {
  validateFileSize(fileSize);
  const expectedPartCount = Math.ceil(fileSize / partSize);
  if (
    partSize !== RECORDING_MULTIPART_PART_SIZE ||
    expectedPartCount > MAX_RECORDING_MULTIPART_PARTS ||
    uploadParts.length !== expectedPartCount ||
    uploadParts.some((part, index) => part.partNumber !== index + 1)
  ) {
    throw new Error('Invalid offline recording multipart contract');
  }
};

const validateUploadPartUrls = (
  uploadParts: OfflineRecordingUploadPart[],
): void => {
  let expectedPath: string | undefined;
  let expectedUploadId: string | undefined;

  for (const part of uploadParts) {
    const url = new URL(part.uploadUrl);
    const expires = Number(url.searchParams.get('X-Amz-Expires'));
    const uploadId = url.searchParams.get('uploadId');
    if (
      url.protocol !== 'https:' ||
      url.port !== '' ||
      url.username ||
      url.password ||
      url.hash ||
      !RECORDING_UPLOAD_S3_HOSTS.has(url.hostname) ||
      !/^\/recordings\/[^/]+\/[^/]+$/.test(url.pathname) ||
      url.searchParams.get('X-Amz-Algorithm') !== 'AWS4-HMAC-SHA256' ||
      !Number.isInteger(expires) ||
      expires <= 0 ||
      expires > 21_600 ||
      REQUIRED_SIGV4_PARAMS.some(
        (parameter) => !url.searchParams.get(parameter),
      ) ||
      url.searchParams.get('partNumber') !== String(part.partNumber) ||
      !uploadId ||
      (expectedPath !== undefined && url.pathname !== expectedPath) ||
      (expectedUploadId !== undefined && uploadId !== expectedUploadId)
    ) {
      throw new Error('Unauthorized offline recording upload URL');
    }
    expectedPath = url.pathname;
    expectedUploadId = uploadId;
  }
};

const readPart = async (
  file: FileHandle,
  fileSize: number,
  partNumber: number,
): Promise<Buffer> => {
  const offset = (partNumber - 1) * RECORDING_MULTIPART_PART_SIZE;
  const length = Math.min(RECORDING_MULTIPART_PART_SIZE, fileSize - offset);
  const buffer = Buffer.allocUnsafe(length);
  let bytesRead = 0;
  while (bytesRead < length) {
    const result = await file.read(
      buffer,
      bytesRead,
      length - bytesRead,
      offset + bytesRead,
    );
    if (result.bytesRead === 0) {
      throw new OfflineRecordingFileError(
        'Offline recording changed during upload',
      );
    }
    bytesRead += result.bytesRead;
  }
  return buffer;
};

export const uploadOfflineRecordingFile = async (
  filePath: string,
  partSize: number,
  uploadParts: OfflineRecordingUploadPart[],
): Promise<OfflineRecordingMultipartResult> => {
  const initialSize = (await stat(filePath)).size;
  validateMultipartContract(initialSize, partSize, uploadParts);
  validateUploadPartUrls(uploadParts);
  const file = await open(filePath, 'r');

  try {
    const completedParts: CompletedOfflineRecordingUploadPart[] = [];
    let nextPartIndex = 0;
    let stopped = false;
    let firstFailure: { error: unknown } | { status: number } | undefined;

    const uploadWorker = async (): Promise<void> => {
      while (!stopped) {
        const partIndex = nextPartIndex++;
        const part = uploadParts[partIndex];
        if (!part) return;

        try {
          const body = await readPart(file, initialSize, part.partNumber);
          let response: Response;
          try {
            response = await session.defaultSession.fetch(part.uploadUrl, {
              method: 'PUT',
              headers: { 'Content-Type': 'audio/wav' },
              body,
              credentials: 'include',
              redirect: 'error',
            });
            if (!response.ok) {
              // HTTP status is authoritative once response headers are received.
              stopped = true;
              firstFailure ??= { status: response.status };
            }
            await response.arrayBuffer();
          } catch (cause) {
            throw new Error('NETWORK_BLOCKED', { cause });
          }

          if (!response.ok) {
            return;
          }
          const eTag = response.headers.get('etag');
          if (!eTag) throw new Error('Missing upload part ETag');
          completedParts.push({ partNumber: part.partNumber, eTag });
        } catch (error) {
          firstFailure ??= { error };
          stopped = true;
          throw error;
        }
      }
    };

    const workers = Array.from(
      { length: Math.min(RECORDING_MULTIPART_CONCURRENCY, uploadParts.length) },
      uploadWorker,
    );
    await Promise.allSettled(workers);

    if (firstFailure && 'error' in firstFailure) throw firstFailure.error;
    if (firstFailure && 'status' in firstFailure) {
      return { success: false, status: firstFailure.status };
    }

    if ((await stat(filePath)).size !== initialSize) {
      throw new OfflineRecordingFileError(
        'Offline recording changed during upload',
      );
    }
    completedParts.sort((a, b) => a.partNumber - b.partNumber);
    return { success: true, parts: completedParts };
  } finally {
    await file.close();
  }
};
