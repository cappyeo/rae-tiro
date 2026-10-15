import { createWriteStream, promises as fs, type WriteStream } from 'node:fs';
import path from 'node:path';

import { app } from 'electron';
import log from 'electron-log';
import type Store from 'electron-store';

import { isLocalAudioDeletionEnforced } from '@/main/utils/localAudioPolicy';
import {
  calculateDuration,
  createWavHeader,
  updateWavHeader,
  validateWavFile,
} from '@/main/utils/wav';
import {
  RECORDING_UNSUPPORTED_OS_ERROR,
  type RecordingSupport,
} from '@/renderer/entities/recordingSupport';

export type RecordingStatus = {
  isRecording: boolean;
  filePath: string | null;
  startTime: number | null;
  dataSize: number;
  duration: number;
};

export type RecordingResult = {
  filePath: string;
  duration: number;
  fileSize: number;
  startTime: number;
  endTime: number;
};

type RecordingSession = {
  noteId: number;
  noteGuid: string;
  wavFilePath: string;
  tempFilePath: string;
  writeStream: WriteStream;
  startTime: number;
  dataSize: number;
  headerWritten: boolean;
  sampleRate: number;
};

type RecordingStartOptions = {
  freshRecordingId?: string;
};

type StoreType = {
  auth_token: string;
  pending_update: {
    shouldForceUpdate: boolean;
    newVersion: string;
    currentVersion: string;
    isPatchUpdate: boolean;
  } | null;
  calendar_notification_enabled: boolean;
  audio_recording_path?: string;
  audio_recordings?: Array<{
    noteId: number;
    filePath: string;
    duration: number;
    fileSize: number;
    startTime: number;
    endTime: number;
  }>;
  security_policy?: { deleteLocalAudioAfterProcessing: boolean };
};

/**
 * AudioRecordingManager
 * Manages audio recording sessions and saves them as WAV files
 */
export class AudioRecordingManager {
  private sessions: Map<string, RecordingSession> = new Map();
  private store: Store<StoreType>;

  /** Tracks dropped frames per noteGuid after session ends, to avoid log spam. */
  private droppedFrames: Map<string, number> = new Map();

  // WAV format: mono Int16. Sample rate is supplied per-session because the
  // legacy WebAudio path emits 16 kHz while the native binary path emits 48 kHz.
  private readonly numChannels = 1;
  private readonly bitsPerSample = 16;

  constructor(
    store: Store<StoreType>,
    private readonly recordingSupport: RecordingSupport,
  ) {
    this.store = store;
  }

  /**
   * Start recording for a specific note
   * @param noteId - Note ID
   * @param noteGuid - Note GUID
   * @param noteCreatedAt - Note creation timestamp (ISO 8601)
   * @param sampleRate - PCM sample rate in Hz (16000 for legacy WebAudio, 48000 for native binary)
   * @returns File path where recording will be saved
   */
  async startRecording(
    noteId: number,
    noteGuid: string,
    noteCreatedAt: string,
    sampleRate: number,
    options: RecordingStartOptions = {},
  ): Promise<string> {
    if (this.recordingSupport.kind !== 'supported') {
      throw new Error(RECORDING_UNSUPPORTED_OS_ERROR);
    }
    // Flush any dropped-frame summary from a prior session for this note.
    this.flushDroppedFramesSummary(noteGuid);

    // Check if session already exists for this note (currently recording)
    const existingSession = this.sessions.get(noteGuid);

    if (existingSession) {
      if (options.freshRecordingId) {
        throw new Error(`Recording session is already active: ${noteGuid}`);
      }
      // Reuse existing session
      log.info(`Reusing existing recording session for note ${noteGuid}`);
      return existingSession.wavFilePath;
    }

    let createdSession: RecordingSession | null = null;

    try {
      // Get or create recordings directory
      const recordingsDir = await this.getRecordingsDirectory();
      await this.ensureDirectoryExists(recordingsDir);

      // Generate file paths
      const sanitizedCreatedAt = noteCreatedAt.replace(/[:.]/g, '-');
      const sanitizedRecordingId = options.freshRecordingId?.replace(
        /[^a-zA-Z0-9_-]/g,
        '-',
      );
      const fileName = [
        `note-${noteGuid}-${sanitizedCreatedAt}`,
        sanitizedRecordingId,
      ]
        .filter(Boolean)
        .join('-');
      const wavFilePath = path.join(recordingsDir, `${fileName}.wav`);

      // Check if existing recording file exists (app restart scenario)
      const existingFile = options.freshRecordingId
        ? null
        : await this.findRecordingFile(noteGuid);

      if (existingFile) {
        if (!existingFile.isTemp) {
          // Found completed .wav file - validate and resume if valid
          log.info(
            `Found existing recording for note ${noteGuid}: ${existingFile.filePath}`,
          );

          const validation = await this.validateAndRepairWavFile(
            existingFile.filePath,
          );

          if (validation.isValid && validation.dataSize !== null) {
            // Valid file - resume recording by appending
            log.info(
              `Resuming recording for note ${noteGuid}, current data size: ${validation.dataSize}`,
            );

            await this.resumeRecording(
              noteId,
              noteGuid,
              existingFile.filePath,
              validation.dataSize,
              sampleRate,
            );

            return existingFile.filePath;
          } else {
            // Invalid file - backup and start fresh
            log.warn(
              `Existing recording is invalid: ${validation.error}, backing up and starting fresh`,
            );

            // 정책 org 는 .backup-*.wav 사본을 만들지 않는다 — 어떤 삭제 경로에도
            // 안 잡혀 평문이 영구 잔존한다 (파손 파일이라 유실 방지 가치도 낮음).
            if (!isLocalAudioDeletionEnforced(this.store)) {
              await this.backupRecording(existingFile.filePath);
            }
            await fs.unlink(existingFile.filePath).catch(() => {});
          }
        } else {
          // Found incomplete .tmp file - clean up and start fresh
          log.warn(
            `Found incomplete recording for note ${noteGuid}, will restart`,
          );
          await fs.unlink(existingFile.filePath).catch(() => {});
        }
      }

      // Start new recording
      const tempFilePath = path.join(recordingsDir, `${fileName}.tmp`);

      // Create write stream
      const writeStream = createWriteStream(tempFilePath, {
        flags: options.freshRecordingId ? 'wx' : 'w',
      });

      // Create recording session
      const session: RecordingSession = {
        noteId,
        noteGuid,
        wavFilePath,
        tempFilePath,
        writeStream,
        startTime: Date.now(),
        dataSize: 0,
        headerWritten: false,
        sampleRate,
      };
      createdSession = session;

      this.sessions.set(noteGuid, session);

      // Write placeholder WAV header (will be updated on stop)
      const header = createWavHeader(0, {
        sampleRate: session.sampleRate,
        numChannels: this.numChannels,
        bitsPerSample: this.bitsPerSample,
      });

      await this.writeToStream(writeStream, header);
      session.headerWritten = true;

      log.info(
        `New recording session started for note ${noteGuid}: ${wavFilePath}`,
      );

      return wavFilePath;
    } catch (error) {
      if (
        createdSession !== null &&
        this.sessions.get(noteGuid) === createdSession &&
        createdSession.dataSize === 0
      ) {
        await this.discardRecording(noteGuid);
      }
      log.error(`Failed to start recording for note ${noteGuid}:`, error);
      throw error;
    }
  }

  /**
   * Append audio data to the recording
   * @param noteGuid - Note GUID
   * @param audioData - Audio data as Uint8Array
   */
  appendAudioData(noteGuid: string, audioData: Uint8Array): void {
    const session = this.sessions.get(noteGuid);

    if (!session) {
      // Throttle: log once on first dropped frame, then count silently.
      const prev = this.droppedFrames.get(noteGuid) ?? 0;
      if (prev === 0) {
        log.warn(
          `No active recording session for note ${noteGuid}, dropping audio frames (further drops will be summarised).`,
        );
      }
      this.droppedFrames.set(noteGuid, prev + 1);
      return;
    }

    if (!session.headerWritten) {
      log.warn(`Header not written yet for note ${noteGuid}`);
      return;
    }

    try {
      // Write audio data to stream
      session.writeStream.write(Buffer.from(audioData));
      session.dataSize += audioData.byteLength;
    } catch (error) {
      log.error(`Failed to append audio data for note ${noteGuid}:`, error);
    }
  }

  /**
   * Pause recording (flush stream but keep session alive)
   * @param noteGuid - Note GUID
   */
  async pauseRecording(noteGuid: string): Promise<void> {
    const session = this.sessions.get(noteGuid);

    if (!session) {
      log.warn(`No recording session found for note ${noteGuid}`);
      return;
    }

    try {
      // Flush stream to ensure all data is written to disk
      await new Promise<void>((resolve, reject) => {
        session.writeStream.write('', (error) => {
          if (error) reject(error);
          else resolve();
        });
      });

      log.info(
        `Recording paused for note ${noteGuid}, dataSize: ${session.dataSize}`,
      );
    } catch (error) {
      log.error(`Failed to pause recording for note ${noteGuid}:`, error);
      throw error;
    }
  }

  /**
   * Finalize and stop recording (close session and complete file)
   * @param noteGuid - Note GUID
   * @returns Recording result with file info
   */
  async finalizeRecording(noteGuid: string): Promise<RecordingResult> {
    const session = this.sessions.get(noteGuid);

    if (!session) {
      log.warn(`No recording session found for note ${noteGuid}`);
      return;
    }

    try {
      // Close write stream
      await this.closeStream(session.writeStream);

      // Update WAV header with actual data size
      await this.updateWavHeaderInFile(session.tempFilePath, session.dataSize);

      // Rename temp file to WAV file
      await fs.rename(session.tempFilePath, session.wavFilePath);

      const fileSize = (await fs.stat(session.wavFilePath)).size;

      const result: RecordingResult = {
        filePath: session.wavFilePath,
        duration: calculateDuration(
          session.dataSize,
          session.sampleRate,
          this.bitsPerSample,
          this.numChannels,
        ),
        fileSize,
        startTime: session.startTime,
        endTime: Date.now(),
      };

      // Remove session
      this.sessions.delete(noteGuid);

      log.info(`Recording finalized for note ${noteGuid}:`, result);

      // Save to metadata
      await this.saveRecordingMetadata(session.noteId, result);

      return result;
    } catch (error) {
      log.error(`Failed to finalize recording for note ${noteGuid}:`, error);
      session.writeStream.destroy();
      this.sessions.delete(noteGuid);
      throw error;
    }
  }

  async discardRecording(noteGuid: string): Promise<void> {
    const session = this.sessions.get(noteGuid);
    if (!session) return;

    this.sessions.delete(noteGuid);
    await this.closeStream(session.writeStream).catch(() => {});
    await Promise.all([
      fs.unlink(session.tempFilePath).catch(() => {}),
      fs.unlink(session.wavFilePath).catch(() => {}),
    ]);
  }

  /**
   * Stop recording and finalize the file (legacy method, calls finalizeRecording)
   * @param noteGuid - Note GUID
   * @returns Recording result with file info
   */
  async stopRecording(noteGuid: string): Promise<RecordingResult> {
    return this.finalizeRecording(noteGuid);
  }

  /**
   * Get current recording status for a note
   * @param noteGuid - Note GUID
   * @returns Recording status
   */
  getRecordingStatus(noteGuid: string): RecordingStatus {
    const session = this.sessions.get(noteGuid);

    if (!session) {
      return {
        isRecording: false,
        filePath: null,
        startTime: null,
        dataSize: 0,
        duration: 0,
      };
    }

    return {
      isRecording: true,
      filePath: session.wavFilePath,
      startTime: session.startTime,
      dataSize: session.dataSize,
      duration: calculateDuration(
        session.dataSize,
        session.sampleRate,
        this.bitsPerSample,
        this.numChannels,
      ),
    };
  }

  getActiveRecordingFilePaths(): string[] {
    return Array.from(this.sessions.values()).flatMap((session) => [
      session.tempFilePath,
      session.wavFilePath,
    ]);
  }

  /**
   * Find recording file for a note by scanning the directory
   * @param noteGuid - Note GUID
   * @returns File path if found, null otherwise
   */
  async findRecordingFile(noteGuid: string): Promise<{
    filePath: string;
    isTemp: boolean;
  } | null> {
    try {
      const recordingsDir = await this.getRecordingsDirectory();

      // Check if directory exists
      try {
        await fs.access(recordingsDir);
      } catch {
        return null;
      }

      // Read all files in directory
      const files = await fs.readdir(recordingsDir);

      // Look for files matching pattern: note-{noteGuid}-*.wav or note-{noteGuid}-*.tmp
      const wavPattern = `note-${noteGuid}-`;
      const matchingFiles = files.filter(
        (file) =>
          file.startsWith(wavPattern) &&
          (file.endsWith('.wav') || file.endsWith('.tmp')),
      );

      if (matchingFiles.length === 0) {
        return null;
      }

      // Prefer .wav over .tmp
      const wavFile = matchingFiles.find((file) => file.endsWith('.wav'));
      const tmpFile = matchingFiles.find((file) => file.endsWith('.tmp'));

      if (wavFile) {
        return {
          filePath: path.join(recordingsDir, wavFile),
          isTemp: false,
        };
      }

      if (tmpFile) {
        return {
          filePath: path.join(recordingsDir, tmpFile),
          isTemp: true,
        };
      }

      return null;
    } catch (error) {
      log.error(`Failed to find recording file for note ${noteGuid}:`, error);
      return null;
    }
  }

  /**
   * Get recordings directory path
   * Uses custom path from store or default path
   */
  private async getRecordingsDirectory(): Promise<string> {
    const customPath = this.store.get('audio_recording_path') as
      | string
      | undefined;

    if (customPath) {
      return customPath;
    }

    // Default: ~/Documents/Tiro/recordings
    const documentsPath = app.getPath('documents');
    return path.join(documentsPath, 'Tiro', 'recordings');
  }

  /**
   * Ensure directory exists, create if not
   */
  private async ensureDirectoryExists(dirPath: string): Promise<void> {
    try {
      await fs.access(dirPath);
    } catch {
      await fs.mkdir(dirPath, { recursive: true });
      log.info(`Created recordings directory: ${dirPath}`);
    }
  }

  /**
   * Write data to stream and wait for drain
   */
  private async writeToStream(
    stream: WriteStream,
    data: Uint8Array,
  ): Promise<void> {
    return new Promise((resolve, reject) => {
      const canWrite = stream.write(Buffer.from(data));

      if (canWrite) {
        resolve();
      } else {
        stream.once('drain', resolve);
        stream.once('error', reject);
      }
    });
  }

  /**
   * Close write stream
   */
  private async closeStream(stream: WriteStream): Promise<void> {
    return new Promise((resolve, reject) => {
      stream.end(() => {
        resolve();
      });

      stream.once('error', reject);
    });
  }

  /**
   * Update WAV header in file with actual data size
   */
  private async updateWavHeaderInFile(
    filePath: string,
    dataSize: number,
  ): Promise<void> {
    const fileHandle = await fs.open(filePath, 'r+');

    try {
      // Read existing header
      const headerBuffer = Buffer.alloc(44);
      await fileHandle.read(headerBuffer, 0, 44, 0);

      // Update header
      const updatedHeader = updateWavHeader(
        new Uint8Array(headerBuffer),
        dataSize,
      );

      // Write updated header
      await fileHandle.write(Buffer.from(updatedHeader), 0, 44, 0);
    } finally {
      await fileHandle.close();
    }
  }

  /**
   * Save recording metadata to store
   * Maintains a maximum of 30 recordings, deleting oldest files when limit is exceeded
   */
  private async saveRecordingMetadata(
    noteId: number,
    result: RecordingResult,
  ): Promise<void> {
    try {
      const recordings = (this.store.get('audio_recordings') || []) as Array<{
        noteId: number;
        filePath: string;
        duration: number;
        fileSize: number;
        startTime: number;
        endTime: number;
      }>;

      // Add new recording
      recordings.push({
        noteId,
        filePath: result.filePath,
        duration: result.duration,
        fileSize: result.fileSize,
        startTime: result.startTime,
        endTime: result.endTime,
      });

      // Maximum 30 recordings limit
      const MAX_RECORDINGS = 30;
      if (recordings.length > MAX_RECORDINGS) {
        // Sort by startTime (oldest first)
        recordings.sort((a, b) => a.startTime - b.startTime);

        // Calculate how many to delete
        const deleteCount = recordings.length - MAX_RECORDINGS;

        // Delete oldest files
        for (let i = 0; i < deleteCount; i++) {
          const oldRecording = recordings[i];
          try {
            await fs.unlink(oldRecording.filePath);
            log.info(
              `Deleted old recording due to limit: ${oldRecording.filePath}`,
            );
          } catch (error) {
            log.warn(
              `Failed to delete old recording file: ${oldRecording.filePath}`,
              error,
            );
            // Continue even if file deletion fails (file might already be deleted)
          }
        }

        // Keep only the most recent MAX_RECORDINGS
        recordings.splice(0, deleteCount);
      }

      this.store.set('audio_recordings', recordings);
    } catch (error) {
      log.error('Failed to save recording metadata:', error);
    }
  }

  /**
   * Get all recordings metadata
   */
  getRecordingsMetadata(): Array<{
    noteId: number;
    filePath: string;
    duration: number;
    fileSize: number;
    startTime: number;
    endTime: number;
  }> {
    return (this.store.get('audio_recordings') || []) as Array<{
      noteId: number;
      filePath: string;
      duration: number;
      fileSize: number;
      startTime: number;
      endTime: number;
    }>;
  }

  /**
   * Resume recording to an existing WAV file
   * Opens the file for appending and restores session state
   * @param noteId - Note ID
   * @param noteGuid - Note GUID
   * @param filePath - Path to existing WAV file
   * @param dataSize - Current data size in the file
   * @param sampleRate - PCM sample rate in Hz
   * @returns Recording session
   */
  private async resumeRecording(
    noteId: number,
    noteGuid: string,
    filePath: string,
    dataSize: number,
    sampleRate: number,
  ): Promise<RecordingSession> {
    log.info(
      `Resuming recording for note ${noteGuid}: ${filePath} (current size: ${dataSize})`,
    );

    // Create temporary file for appending
    const tempFilePath = filePath.replace('.wav', '.tmp');

    // Copy existing WAV to temp file
    await fs.copyFile(filePath, tempFilePath);

    // Open write stream in append mode
    // Using 'a' flag will append to the end of the file
    const writeStream = createWriteStream(tempFilePath, {
      flags: 'a', // Append mode
    });

    const session: RecordingSession = {
      noteId,
      noteGuid,
      wavFilePath: filePath,
      tempFilePath,
      writeStream,
      startTime: Date.now(),
      dataSize,
      headerWritten: true,
      sampleRate,
    };

    this.sessions.set(noteGuid, session);

    log.info(
      `Recording session resumed for note ${noteGuid}, ready to append new data`,
    );

    return session;
  }

  /**
   * Validate and repair WAV file if needed
   * @param filePath - Path to WAV file
   * @returns Validation result and repaired data size
   */
  private async validateAndRepairWavFile(filePath: string): Promise<{
    isValid: boolean;
    dataSize: number | null;
    error?: string;
  }> {
    const validation = await validateWavFile(filePath);

    if (validation.isValid) {
      return validation;
    }

    log.warn(`WAV file validation failed: ${validation.error}`);

    // Try to repair by recalculating header
    if (validation.dataSize !== null) {
      try {
        // File size mismatch - try to fix header
        const stats = await fs.stat(filePath);
        const actualDataSize = stats.size - 44;

        if (actualDataSize > 0) {
          await this.updateWavHeaderInFile(filePath, actualDataSize);
          log.info(`Repaired WAV header for ${filePath}`);

          return {
            isValid: true,
            dataSize: actualDataSize,
          };
        }
      } catch (repairError) {
        log.error(`Failed to repair WAV file: ${repairError}`);
      }
    }

    return validation;
  }

  /**
   * Backup recording file
   * @param filePath - Path to file to backup
   * @returns Backup file path
   */
  private async backupRecording(filePath: string): Promise<string> {
    const timestamp = new Date().toISOString().replace(/[:.]/g, '-');
    const backupPath = filePath.replace('.wav', `.backup-${timestamp}.wav`);

    await fs.copyFile(filePath, backupPath);
    log.info(`Backed up recording: ${filePath} -> ${backupPath}`);

    return backupPath;
  }

  /**
   * Cleanup all active recording sessions
   * Should be called on app quit
   */
  async cleanup(): Promise<void> {
    log.info('Cleaning up all recording sessions...');

    const promises = Array.from(this.sessions.keys()).map((noteGuid) =>
      this.stopRecording(noteGuid).catch((error) => {
        log.error(`Failed to stop recording for note ${noteGuid}:`, error);
      }),
    );

    await Promise.all(promises);

    // Flush all remaining dropped-frame summaries on shutdown.
    for (const noteGuid of this.droppedFrames.keys()) {
      this.flushDroppedFramesSummary(noteGuid);
    }
  }

  /** Log a summary of dropped frames for a note and clear the counter. */
  private flushDroppedFramesSummary(noteGuid: string): void {
    const count = this.droppedFrames.get(noteGuid);
    if (count && count > 0) {
      log.warn(
        `Dropped ${count} audio frame(s) for note ${noteGuid} (no active session).`,
      );
      this.droppedFrames.delete(noteGuid);
    }
  }
}
