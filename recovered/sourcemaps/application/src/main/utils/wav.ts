/**
 * WAV file header generation utility
 * Format: 16kHz, 16-bit PCM, Mono
 */

export type WavHeaderOptions = {
  sampleRate: number;
  numChannels: number;
  bitsPerSample: number;
};

/**
 * Create WAV file header
 * @param dataSize - Size of audio data in bytes
 * @param options - WAV format options
 * @returns WAV header as Uint8Array (44 bytes)
 */
export function createWavHeader(
  dataSize: number,
  options: WavHeaderOptions = {
    sampleRate: 16000,
    numChannels: 1,
    bitsPerSample: 16,
  },
): Uint8Array {
  const { sampleRate, numChannels, bitsPerSample } = options;

  const byteRate = (sampleRate * numChannels * bitsPerSample) / 8;
  const blockAlign = (numChannels * bitsPerSample) / 8;
  const fileSize = dataSize + 36; // 44 - 8

  const buffer = new ArrayBuffer(44);
  const view = new DataView(buffer);

  // RIFF chunk descriptor
  writeString(view, 0, 'RIFF');
  view.setUint32(4, fileSize, true); // File size - 8
  writeString(view, 8, 'WAVE');

  // fmt sub-chunk
  writeString(view, 12, 'fmt ');
  view.setUint32(16, 16, true); // Subchunk1Size (16 for PCM)
  view.setUint16(20, 1, true); // AudioFormat (1 for PCM)
  view.setUint16(22, numChannels, true); // NumChannels
  view.setUint32(24, sampleRate, true); // SampleRate
  view.setUint32(28, byteRate, true); // ByteRate
  view.setUint16(32, blockAlign, true); // BlockAlign
  view.setUint16(34, bitsPerSample, true); // BitsPerSample

  // data sub-chunk
  writeString(view, 36, 'data');
  view.setUint32(40, dataSize, true); // Subchunk2Size

  return new Uint8Array(buffer);
}

/**
 * Update WAV header with actual data size
 * @param header - Original WAV header
 * @param dataSize - Actual audio data size in bytes
 * @returns Updated WAV header
 */
export function updateWavHeader(
  header: Uint8Array,
  dataSize: number,
): Uint8Array {
  const view = new DataView(
    header.buffer,
    header.byteOffset,
    header.byteLength,
  );

  // Update file size (at byte 4)
  view.setUint32(4, dataSize + 36, true);

  // Update data chunk size (at byte 40)
  view.setUint32(40, dataSize, true);

  return header;
}

/**
 * Write string to DataView
 */
function writeString(view: DataView, offset: number, str: string): void {
  for (let i = 0; i < str.length; i++) {
    view.setUint8(offset + i, str.charCodeAt(i));
  }
}

/**
 * Calculate WAV file duration from data size
 * @param dataSize - Audio data size in bytes
 * @param sampleRate - Sample rate (default: 16000)
 * @param bitsPerSample - Bits per sample (default: 16)
 * @param numChannels - Number of channels (default: 1)
 * @returns Duration in seconds
 */
export function calculateDuration(
  dataSize: number,
  sampleRate = 16000,
  bitsPerSample = 16,
  numChannels = 1,
): number {
  const byteRate = (sampleRate * numChannels * bitsPerSample) / 8;
  return dataSize / byteRate;
}

/**
 * Validate WAV file header
 * @param headerBuffer - WAV header buffer (first 44 bytes)
 * @returns true if valid WAV header, false otherwise
 */
export function validateWavHeader(headerBuffer: Buffer): boolean {
  if (headerBuffer.length < 44) {
    return false;
  }

  const view = new DataView(
    headerBuffer.buffer,
    headerBuffer.byteOffset,
    headerBuffer.byteLength,
  );

  // Check RIFF signature
  const riff = String.fromCharCode(
    view.getUint8(0),
    view.getUint8(1),
    view.getUint8(2),
    view.getUint8(3),
  );
  if (riff !== 'RIFF') {
    return false;
  }

  // Check WAVE signature
  const wave = String.fromCharCode(
    view.getUint8(8),
    view.getUint8(9),
    view.getUint8(10),
    view.getUint8(11),
  );
  if (wave !== 'WAVE') {
    return false;
  }

  // Check fmt signature
  const fmt = String.fromCharCode(
    view.getUint8(12),
    view.getUint8(13),
    view.getUint8(14),
    view.getUint8(15),
  );
  if (fmt !== 'fmt ') {
    return false;
  }

  // Check data signature
  const data = String.fromCharCode(
    view.getUint8(36),
    view.getUint8(37),
    view.getUint8(38),
    view.getUint8(39),
  );
  if (data !== 'data') {
    return false;
  }

  return true;
}

/**
 * Get data size from WAV header
 * @param headerBuffer - WAV header buffer (first 44 bytes)
 * @returns Data size in bytes, or null if invalid
 */
export function getWavDataSize(headerBuffer: Buffer): number | null {
  if (!validateWavHeader(headerBuffer)) {
    return null;
  }

  const view = new DataView(
    headerBuffer.buffer,
    headerBuffer.byteOffset,
    headerBuffer.byteLength,
  );

  // Read data size from byte 40
  return view.getUint32(40, true);
}

/**
 * Validate WAV file integrity
 * @param filePath - Path to WAV file
 * @param expectedDataSize - Expected data size (optional)
 * @returns Validation result with data size
 */
export async function validateWavFile(
  filePath: string,
): Promise<{ isValid: boolean; dataSize: number | null; error?: string }> {
  try {
    const fs = await import('node:fs/promises');

    // Check file exists
    const stats = await fs.stat(filePath);
    const fileSize = stats.size;

    if (fileSize < 44) {
      return {
        isValid: false,
        dataSize: null,
        error: 'File too small to be a valid WAV file',
      };
    }

    // Read header
    const fileHandle = await fs.open(filePath, 'r');
    try {
      const headerBuffer = Buffer.alloc(44);
      await fileHandle.read(headerBuffer, 0, 44, 0);

      // Validate header
      if (!validateWavHeader(headerBuffer)) {
        return {
          isValid: false,
          dataSize: null,
          error: 'Invalid WAV header',
        };
      }

      // Get data size from header
      const dataSize = getWavDataSize(headerBuffer);
      if (dataSize === null) {
        return {
          isValid: false,
          dataSize: null,
          error: 'Could not read data size from header',
        };
      }

      // Validate file size matches header
      const expectedFileSize = dataSize + 44;
      if (fileSize !== expectedFileSize) {
        return {
          isValid: false,
          dataSize,
          error: `File size mismatch: expected ${expectedFileSize}, got ${fileSize}`,
        };
      }

      return {
        isValid: true,
        dataSize,
      };
    } finally {
      await fileHandle.close();
    }
  } catch (error) {
    return {
      isValid: false,
      dataSize: null,
      error: error instanceof Error ? error.message : 'Unknown error',
    };
  }
}
