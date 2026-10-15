import { randomUUID } from 'node:crypto';
import { type Dirent, promises as fs } from 'node:fs';
import path from 'node:path';

import { app } from 'electron';
import log from 'electron-log';
import type Store from 'electron-store';

import { type SecurityPolicySnapshot } from '@/main/utils/localAudioPolicy';
import {
  type OfflineRecordingMultipartResult,
  type OfflineRecordingUploadPart,
  uploadOfflineRecordingFile,
} from '@/main/utils/uploadOfflineRecordingFile';
import {
  calculateDuration,
  updateWavHeader,
  validateWavHeader,
} from '@/main/utils/wav';

/**
 * Session status for persistence
 */
export type OfflineRecordingSessionStatus =
  | 'recording'
  | 'paused'
  | 'completed'
  | 'upload_pending'
  | 'uploading'
  | 'upload_failed';

/**
 * Persisted session data
 */
export type PersistedOfflineRecordingSession = {
  id: string;
  noteId: number;
  noteGuid: string;
  filePath: string;
  startedAt: string;
  completedAt?: string;
  duration?: number;
  /** Accumulated recording duration in seconds (excludes paused time) */
  accumulatedDuration: number;
  status: OfflineRecordingSessionStatus;
  summaryLocale?: string;
  uploadRetryCount?: number;
  lastUploadAttempt?: string;
};

/**
 * Offline recording settings
 */
export type OfflineRecordingSettings = {
  deleteAfterUpload: boolean;
};

export type RecoverableTempRecording = {
  filePath: string;
  fileName: string;
  modifiedAt: string;
  size: number;
  duration: number | null;
  isPlayable: boolean;
};

/**
 * Store type extension for offline recording
 */
/** 삭제 요청 주체. 정책 자동 정리(policy-cleanup)의 실패만 원격 감사 로그 대상이다. */
export type DeleteFileOrigin = 'policy-cleanup' | 'user';

export type DeleteFileOutcome =
  | 'deleted'
  | 'already-gone'
  | 'rejected'
  | 'failed';

type OfflineRecordingStoreType = {
  offline_recording_sessions?: PersistedOfflineRecordingSession[];
  offline_recording_settings?: OfflineRecordingSettings;
  offline_recording_schema_version?: number;
  security_policy?: SecurityPolicySnapshot;
  audio_recording_path?: string;
};

/**
 * Current schema version for offline recording sessions
 * Increment this when making breaking changes to session structure
 * Version history:
 * - v1: Initial schema (no accumulatedDuration field)
 * - v2: Added accumulatedDuration field for accurate time tracking
 */
const SCHEMA_VERSION = 2;

/**
 * Default settings
 */
const DEFAULT_SETTINGS: OfflineRecordingSettings = {
  deleteAfterUpload: false,
};

const MAX_RIFF_PCM_DATA_SIZE_BYTES = 0xffff_ffff - 36;

/**
 * OfflineRecordingPersistence
 * Manages persistence of offline recording sessions for recovery on app restart
 */
export class OfflineRecordingPersistence {
  private store: Store<OfflineRecordingStoreType>;

  constructor(store: Store<OfflineRecordingStoreType>) {
    this.store = store;
    // Run migration on initialization
    this.migrateSessionsIfNeeded();
  }

  /**
   * Migrate sessions when schema version changes
   * Clears all old sessions to prevent backward compatibility issues
   */
  private migrateSessionsIfNeeded(): void {
    const currentVersion =
      this.store.get('offline_recording_schema_version') || 1;

    if (currentVersion < SCHEMA_VERSION) {
      log.info(
        `Migrating offline recording sessions from v${currentVersion} to v${SCHEMA_VERSION}`,
      );

      // Clear all old sessions to prevent backward compatibility issues
      const oldSessions = this.getSessions();
      if (oldSessions.length > 0) {
        log.info(
          `Clearing ${oldSessions.length} old sessions for schema migration`,
        );
        this.clearAllSessions();
      }

      // Update schema version
      this.store.set('offline_recording_schema_version', SCHEMA_VERSION);
      log.info(`Schema migration complete: v${SCHEMA_VERSION}`);
    }
  }

  // ========== Session Management ==========

  /**
   * Save a new or updated session
   */
  saveSession(session: PersistedOfflineRecordingSession): void {
    try {
      this.saveSessionOrThrow(session);
    } catch (error) {
      log.error('Failed to save offline recording session:', error);
    }
  }

  saveSessionOrThrow(session: PersistedOfflineRecordingSession): void {
    const sessions = this.getSessions();
    const existingIndex = sessions.findIndex((s) => s.id === session.id);
    const updatedSessions =
      existingIndex >= 0
        ? sessions.map((existing, index) =>
            index === existingIndex ? session : existing,
          )
        : [...sessions, session];

    this.store.set('offline_recording_sessions', updatedSessions);
    log.info(`Offline recording session saved: ${session.id}`);
  }

  /**
   * Get all saved sessions
   */
  getSessions(): PersistedOfflineRecordingSession[] {
    return (this.store.get('offline_recording_sessions') ||
      []) as PersistedOfflineRecordingSession[];
  }

  /**
   * Calculate duration from WAV file size
   * WAV format: 16-bit PCM, 16000 Hz, mono
   * Duration = (fileSize - 44 bytes header) / (sampleRate * bytesPerSample)
   */
  async calculateDurationFromFile(filePath: string): Promise<number> {
    try {
      const stats = await fs.stat(filePath);
      const dataSize = stats.size - 44; // WAV header is 44 bytes
      if (dataSize <= 0) return 0;
      // 16000 Hz * 2 bytes (16-bit) = 32000 bytes per second
      return Math.floor(dataSize / 32000);
    } catch {
      return 0;
    }
  }

  /**
   * Get pending sessions (not completed successfully)
   * These are sessions that need recovery on app restart
   * Enriches sessions with calculated duration from file if accumulatedDuration is 0
   */
  async getPendingSessionsWithDuration(): Promise<
    PersistedOfflineRecordingSession[]
  > {
    const sessions = this.getSessions();
    const pendingSessions = sessions.filter(
      (session) =>
        session.status === 'recording' ||
        session.status === 'paused' ||
        session.status === 'upload_pending' ||
        session.status === 'upload_failed',
    );

    // Enrich sessions with calculated duration
    const enrichedSessions = await Promise.all(
      pendingSessions.map(async (session) => {
        if (
          (session.accumulatedDuration === 0 ||
            session.accumulatedDuration === undefined) &&
          (session.status === 'recording' || session.status === 'paused')
        ) {
          const calculatedDuration = await this.calculateDurationFromFile(
            session.filePath,
          );
          log.info(
            `Calculated duration for session ${session.id}: ${calculatedDuration}s`,
          );
          return {
            ...session,
            accumulatedDuration: calculatedDuration,
          };
        }
        return session;
      }),
    );

    return enrichedSessions;
  }

  /**
   * Get pending sessions (not completed successfully)
   * These are sessions that need recovery on app restart
   */
  getPendingSessions(): PersistedOfflineRecordingSession[] {
    const sessions = this.getSessions();
    return sessions.filter(
      (session) =>
        session.status === 'recording' ||
        session.status === 'paused' ||
        session.status === 'upload_pending' ||
        session.status === 'upload_failed',
    );
  }

  /**
   * Get a session by ID
   */
  getSession(sessionId: string): PersistedOfflineRecordingSession | null {
    const sessions = this.getSessions();
    return sessions.find((s) => s.id === sessionId) || null;
  }

  /**
   * Get a session by note GUID
   */
  getSessionByNoteGuid(
    noteGuid: string,
  ): PersistedOfflineRecordingSession | null {
    const sessions = this.getSessions();
    return sessions.find((s) => s.noteGuid === noteGuid) || null;
  }

  /**
   * Update session status
   */
  updateSessionStatus(
    sessionId: string,
    status: OfflineRecordingSessionStatus,
    additionalData?: Partial<PersistedOfflineRecordingSession>,
  ): void {
    const session = this.getSession(sessionId);
    if (!session) {
      log.warn(`Session not found for update: ${sessionId}`);
      return;
    }

    this.saveSession({
      ...session,
      ...additionalData,
      status,
    });
  }

  updateSessionStatusOrThrow(
    sessionId: string,
    status: OfflineRecordingSessionStatus,
    additionalData?: Partial<PersistedOfflineRecordingSession>,
  ): void {
    const session = this.getSession(sessionId);
    if (!session) throw new Error(`Session not found: ${sessionId}`);
    this.saveSessionOrThrow({
      ...session,
      ...additionalData,
      status,
    });
  }

  /**
   * Remove a session
   */
  removeSession(sessionId: string): void {
    try {
      const sessions = this.getSessions();
      const filtered = sessions.filter((s) => s.id !== sessionId);
      this.store.set('offline_recording_sessions', filtered);
      log.info(`Offline recording session removed: ${sessionId}`);
    } catch (error) {
      log.error('Failed to remove offline recording session:', error);
    }
  }

  /**
   * Clear all sessions
   */
  clearAllSessions(): void {
    this.store.set('offline_recording_sessions', []);
    log.info('All offline recording sessions cleared');
  }

  /**
   * Cleanup completed sessions and sessions with missing files
   * Called on app startup to prevent stale session accumulation
   * Note: upload_failed sessions are kept, and files are preserved for deleted notes
   */
  async cleanupCompletedSessions(): Promise<{
    removedCount: number;
    removedSessionIds: string[];
  }> {
    const sessions = this.getSessions();
    const removedSessionIds: string[] = [];

    const sessionsToKeep: PersistedOfflineRecordingSession[] = [];

    for (const session of sessions) {
      // Remove completed sessions (successfully uploaded)
      if (session.status === 'completed') {
        removedSessionIds.push(session.id);
        log.info(`Cleanup: Removing completed session ${session.id}`);
        continue;
      }

      // Remove uploading sessions (stuck in uploading state after restart)
      if (session.status === 'uploading') {
        removedSessionIds.push(session.id);
        log.info(`Cleanup: Removing stuck uploading session ${session.id}`);
        continue;
      }

      // Check if file exists for recording/paused/upload_pending/upload_failed
      const fileExists = await this.fileExists(session.filePath);
      if (!fileExists) {
        removedSessionIds.push(session.id);
        log.info(
          `Cleanup: Removing session ${session.id} (file not found: ${session.filePath})`,
        );
        continue;
      }

      // Keep this session
      sessionsToKeep.push(session);
    }

    // Update store with remaining sessions
    this.store.set('offline_recording_sessions', sessionsToKeep);

    log.info(
      `Session cleanup complete: removed ${removedSessionIds.length} sessions`,
    );

    return {
      removedCount: removedSessionIds.length,
      removedSessionIds,
    };
  }

  // ========== Settings Management ==========

  /**
   * Get settings
   */
  getSettings(): OfflineRecordingSettings {
    const settings = this.store.get('offline_recording_settings');
    return { ...DEFAULT_SETTINGS, ...settings };
  }

  /**
   * Update settings
   */
  updateSettings(settings: Partial<OfflineRecordingSettings>): void {
    const currentSettings = this.getSettings();
    this.store.set('offline_recording_settings', {
      ...currentSettings,
      ...settings,
    });
    log.info('Offline recording settings updated:', settings);
  }

  // ========== File Management ==========

  async listTempRecordings(
    getActiveFilePaths: () => readonly string[] = () => [],
  ): Promise<RecoverableTempRecording[]> {
    const filePaths = new Set<string>();
    let readableRootCount = 0;
    let scanError: unknown;

    for (const recordingRoot of this.getRecordingsRoots()) {
      let entries: Dirent[];
      try {
        entries = await fs.readdir(recordingRoot, { withFileTypes: true });
      } catch (error) {
        if ((error as NodeJS.ErrnoException).code !== 'ENOENT') {
          scanError ??= error;
          log.warn(`Failed to scan recording root: ${recordingRoot}`, error);
        }
        continue;
      }
      readableRootCount += 1;

      entries
        .filter(
          (entry) =>
            entry.isFile() &&
            entry.name.startsWith('note-') &&
            entry.name.endsWith('.tmp'),
        )
        .forEach((entry) => {
          filePaths.add(path.resolve(recordingRoot, entry.name));
        });
    }

    if (readableRootCount === 0 && scanError) throw scanError;

    this.getSessions()
      .filter(
        (session) =>
          (session.status === 'recording' ||
            session.status === 'paused' ||
            session.status === 'upload_pending' ||
            session.status === 'upload_failed') &&
          path.extname(session.filePath).toLowerCase() === '.wav' &&
          this.isInsideRecordingsRoots(session.filePath),
      )
      .forEach((session) => {
        filePaths.add(path.resolve(session.filePath));
      });

    const files = await Promise.all(
      Array.from(filePaths).map(
        async (filePath): Promise<RecoverableTempRecording | null> => {
          if (this.isActiveRecordingPath(filePath, getActiveFilePaths)) {
            return null;
          }

          try {
            const stats = await fs.stat(filePath);
            if (!stats.isFile()) return null;
            const duration = await this.getTempRecordingDuration(
              filePath,
              stats.size,
            );
            if (this.isActiveRecordingPath(filePath, getActiveFilePaths)) {
              return null;
            }
            return {
              filePath,
              fileName: path.basename(filePath),
              modifiedAt: stats.mtime.toISOString(),
              size: stats.size,
              duration,
              isPlayable: duration !== null,
            };
          } catch (error) {
            if ((error as NodeJS.ErrnoException).code !== 'ENOENT') {
              log.warn(`Failed to inspect recovery file: ${filePath}`, error);
            }
            return null;
          }
        },
      ),
    );

    return files
      .filter((file): file is RecoverableTempRecording => file !== null)
      .sort(
        (left, right) =>
          Date.parse(right.modifiedAt) - Date.parse(left.modifiedAt),
      );
  }

  getRecordingsRoots(): string[] {
    const customRoot = this.store.get('audio_recording_path') as
      | string
      | undefined;
    return Array.from(
      new Set(
        [
          customRoot && path.resolve(customRoot),
          path.resolve(app.getPath('documents'), 'Tiro', 'recordings'),
        ].filter((root): root is string => Boolean(root)),
      ),
    );
  }

  private async resolveRecordingFilePath(
    filePath: string,
  ): Promise<string | null> {
    if (!this.isInsideRecordingsRoots(filePath)) return null;

    try {
      const canonicalFilePath = await fs.realpath(filePath);
      const extension = path.extname(canonicalFilePath).toLowerCase();
      if (extension !== '.tmp' && extension !== '.wav') return null;

      const stats = await fs.stat(canonicalFilePath);
      if (!stats.isFile()) return null;

      const canonicalRoots = await Promise.all(
        this.getRecordingsRoots().map((root) =>
          fs.realpath(root).catch((): null => null),
        ),
      );
      return canonicalRoots.some(
        (root) =>
          root !== null &&
          (canonicalFilePath === root ||
            canonicalFilePath.startsWith(root + path.sep)),
      )
        ? canonicalFilePath
        : null;
    } catch {
      return null;
    }
  }

  private getPlayableDuration(
    header: Buffer,
    actualDataSize: number,
  ): number | null {
    const playableDataSize = this.getPlayableDataSize(header, actualDataSize);
    if (playableDataSize === null) return null;

    const numChannels = header.readUInt16LE(22);
    const sampleRate = header.readUInt32LE(24);
    const bitsPerSample = header.readUInt16LE(34);

    return calculateDuration(
      playableDataSize,
      sampleRate,
      bitsPerSample,
      numChannels,
    );
  }

  private getPlayableDataSize(
    header: Buffer,
    actualDataSize: number,
  ): number | null {
    if (!validateWavHeader(header)) return null;

    const audioFormat = header.readUInt16LE(20);
    const numChannels = header.readUInt16LE(22);
    const sampleRate = header.readUInt32LE(24);
    const blockAlign = header.readUInt16LE(32);
    const bitsPerSample = header.readUInt16LE(34);

    if (
      audioFormat !== 1 ||
      numChannels === 0 ||
      sampleRate === 0 ||
      blockAlign === 0 ||
      bitsPerSample === 0
    ) {
      return null;
    }

    const playableDataSize = actualDataSize - (actualDataSize % blockAlign);
    return playableDataSize > 0 &&
      playableDataSize <= MAX_RIFF_PCM_DATA_SIZE_BYTES
      ? playableDataSize
      : null;
  }

  private async getTempRecordingDuration(
    filePath: string,
    fileSize: number,
  ): Promise<number | null> {
    if (fileSize < 44) return null;

    const header = await this.readWavHeader(filePath);
    return this.getPlayableDuration(header, fileSize - 44);
  }

  private async readWavHeader(filePath: string): Promise<Buffer> {
    const fileHandle = await fs.open(filePath, 'r');
    try {
      const header = Buffer.alloc(44);
      const { bytesRead } = await fileHandle.read(header, 0, 44, 0);
      if (bytesRead !== 44) throw new Error('Invalid WAV header');
      return header;
    } finally {
      await fileHandle.close();
    }
  }

  /**
   * Whether the given path is inside one of the allowed recording roots.
   * Allowed roots: the user-configured `audio_recording_path` (set only via
   * dialog.showOpenDialog) and the default ~/Documents/Tiro/recordings.
   * Used to prevent arbitrary file read/delete via the offline-recording IPCs.
   */
  private isInsideRecordingsRoots(filePath: string): boolean {
    if (typeof filePath !== 'string' || filePath.length === 0) return false;

    const resolved = path.resolve(filePath);
    return this.getRecordingsRoots().some(
      (root) => resolved === root || resolved.startsWith(root + path.sep),
    );
  }

  private isActiveRecordingPath(
    filePath: string,
    getActiveFilePaths: () => readonly string[],
  ): boolean {
    const resolvedFilePath = path.resolve(filePath);
    return getActiveFilePaths().some(
      (activeFilePath) => path.resolve(activeFilePath) === resolvedFilePath,
    );
  }

  private removeSessionsForRecordingPath(filePath: string): void {
    const resolvedFilePath = path.resolve(filePath);
    const parsedFilePath = path.parse(resolvedFilePath);
    const recordingExtensions = new Set(['.tmp', '.wav']);
    const sessions = this.getSessions();
    const sessionsToKeep = sessions.filter((session) => {
      const resolvedSessionPath = path.resolve(session.filePath);
      if (resolvedSessionPath === resolvedFilePath) return false;

      const parsedSessionPath = path.parse(resolvedSessionPath);
      return !(
        recordingExtensions.has(parsedFilePath.ext.toLowerCase()) &&
        recordingExtensions.has(parsedSessionPath.ext.toLowerCase()) &&
        parsedSessionPath.dir === parsedFilePath.dir &&
        parsedSessionPath.name === parsedFilePath.name
      );
    });

    if (sessionsToKeep.length !== sessions.length) {
      this.store.set('offline_recording_sessions', sessionsToKeep);
    }
  }

  async getUploadFileSize(sessionId: string): Promise<number | null> {
    const session = this.getSession(sessionId);
    if (!session || !this.isInsideRecordingsRoots(session.filePath)) {
      log.warn(
        'Rejected getUploadFileSize for unknown session or invalid path',
      );
      return null;
    }
    return (await fs.stat(session.filePath)).size;
  }

  /** Upload the persisted file for a session without exposing its path. */
  async uploadFile(
    sessionId: string,
    partSize: number,
    uploadParts: OfflineRecordingUploadPart[],
  ): Promise<OfflineRecordingMultipartResult | null> {
    const session = this.getSession(sessionId);
    if (!session || !this.isInsideRecordingsRoots(session.filePath)) {
      log.warn('Rejected uploadFile for unknown session or invalid path');
      return null;
    }
    return uploadOfflineRecordingFile(session.filePath, partSize, uploadParts);
  }

  /** Save a recording without transferring its bytes through the renderer. */
  async saveFile(
    filePath: string,
    destinationPath: string,
  ): Promise<{ success: boolean; error?: string }> {
    const sourcePath = await this.resolveRecordingFilePath(filePath);
    if (!sourcePath) {
      return { success: false, error: 'Invalid recording file' };
    }

    let temporaryPath: string | undefined;
    try {
      const existingDestination = await fs
        .realpath(destinationPath)
        .catch((): null => null);
      if (
        path.resolve(sourcePath) === path.resolve(destinationPath) ||
        existingDestination === sourcePath
      ) {
        return { success: false, error: 'Source and destination are the same' };
      }

      temporaryPath = path.join(
        path.dirname(destinationPath),
        `.${path.basename(destinationPath)}.${randomUUID()}.tmp`,
      );
      if (path.extname(sourcePath).toLowerCase() === '.tmp') {
        if (!(await this.copyPlayableWav(sourcePath, temporaryPath))) {
          throw new Error('Failed to prepare recording file');
        }
      } else {
        await fs.copyFile(sourcePath, temporaryPath);
      }
      await fs.rename(temporaryPath, destinationPath);
      temporaryPath = undefined;
      return { success: true };
    } catch (error) {
      log.error(`Failed to save recording file: ${filePath}`, error);
      return {
        success: false,
        error: error instanceof Error ? error.message : 'Unknown error',
      };
    } finally {
      if (temporaryPath) {
        await fs
          .rm(temporaryPath, { force: true })
          .catch((): undefined => undefined);
      }
    }
  }

  /**
   * Get file contents as Buffer
   */
  async getFileBuffer(filePath: string): Promise<Buffer | null> {
    if (!this.isInsideRecordingsRoots(filePath)) {
      log.warn(`Rejected getFileBuffer for path outside recordings root`);
      return null;
    }
    try {
      await fs.access(filePath);
      const buffer = await fs.readFile(filePath);
      if (!filePath.endsWith('.tmp')) return buffer;
      if (buffer.length < 44) return null;

      const playableDataSize = this.getPlayableDataSize(
        buffer.subarray(0, 44),
        buffer.length - 44,
      );
      if (playableDataSize === null) return null;

      const header = Buffer.from(buffer.subarray(0, 44));
      const repairedHeader = updateWavHeader(header, playableDataSize);
      return Buffer.concat([
        Buffer.from(repairedHeader),
        buffer.subarray(44, 44 + playableDataSize),
      ]);
    } catch (error) {
      log.error(`Failed to read file: ${filePath}`, error);
      return null;
    }
  }

  private async copyPlayableWav(
    sourcePath: string,
    destinationPath: string,
  ): Promise<boolean> {
    const stats = await fs.stat(sourcePath);
    if (stats.size < 44) return false;
    const header = await this.readWavHeader(sourcePath);
    const playableDataSize = this.getPlayableDataSize(header, stats.size - 44);
    if (playableDataSize === null) return false;

    await fs.copyFile(sourcePath, destinationPath);
    await fs.chmod(destinationPath, (stats.mode & 0o777) | 0o200);
    await fs.truncate(destinationPath, 44 + playableDataSize);
    const fileHandle = await fs.open(destinationPath, 'r+');
    try {
      const repairedHeader = Buffer.from(
        updateWavHeader(Buffer.from(header), playableDataSize),
      );
      await fileHandle.write(repairedHeader, 0, repairedHeader.length, 0);
    } finally {
      await fileHandle.close();
    }
    return true;
  }

  /**
   * Delete file
   *
   * 여기는 삭제 시점을 판단하지 않는다 — "업로드가 확정된 뒤에만 지운다" 는 renderer 계약이다
   * (`policy-cleanup` 호출 2곳 모두 서버 accept + 세션 completed 이후에만 도달).
   * main 은 검증할 수단도 없다: 세션 status 'completed' 는 업로드가 아니라 녹음 종료
   * 시점에도 세팅되므로 status 게이트로는 두 상태를 구분할 수 없다.
   * 이 계층은 잘못된 삭제를 거부하는 가드만 맡는다: recordings 루트 밖 경로와
   * 현재 녹음 중인 파일은 거부한다.
   *
   * `already-gone` 과 `failed` 를 구분한다: 전자는 무해하지만 후자는 지워져야 할 평문이
   * 남은 것이다. 재시도는 없다 — 원격 감사 로그(IPC 핸들러)가 유일한 backstop 이다.
   */
  async deleteFile(
    filePath: string,
    getActiveFilePaths: () => readonly string[] = () => [],
    origin: DeleteFileOrigin = 'user',
  ): Promise<DeleteFileOutcome> {
    if (!this.isInsideRecordingsRoots(filePath)) {
      log.warn(`Rejected deleteFile for path outside recordings root`);
      return 'rejected';
    }
    if (this.isActiveRecordingPath(filePath, getActiveFilePaths)) {
      log.warn(`Rejected deletion of active recording: ${filePath}`);
      return 'rejected';
    }
    if (
      origin === 'user' &&
      this.getSessions().some(
        (session) =>
          session.status === 'uploading' &&
          path.resolve(session.filePath) === path.resolve(filePath),
      )
    ) {
      log.warn(`Rejected deletion of uploading recording: ${filePath}`);
      return 'rejected';
    }

    try {
      await fs.unlink(filePath);
    } catch (error) {
      // access 선검사는 검사-삭제 사이 레이스로 'failed' 오탐을 만든다 — ENOENT 로 구분
      if ((error as NodeJS.ErrnoException).code === 'ENOENT') {
        log.info(`File already gone: ${filePath}`);
        return 'already-gone';
      }
      log.error(`Failed to delete file: ${filePath}`, error);
      return 'failed';
    }

    try {
      this.removeSessionsForRecordingPath(filePath);
    } catch (error) {
      log.error(`File deleted but session cleanup failed: ${filePath}`, error);
    }
    log.info(`File deleted: ${filePath}`);
    return 'deleted';
  }

  /**
   * Check if file exists
   */
  async fileExists(filePath: string): Promise<boolean> {
    try {
      await fs.access(filePath);
      return true;
    } catch {
      return false;
    }
  }

  /**
   * Get recordings directory path
   */
  async getRecordingsDirectory(): Promise<string> {
    const documentsPath = app.getPath('documents');
    const recordingsDir = path.join(documentsPath, 'Tiro', 'recordings');

    // Ensure directory exists
    try {
      await fs.access(recordingsDir);
    } catch {
      await fs.mkdir(recordingsDir, { recursive: true });
    }

    return recordingsDir;
  }

  /**
   * Generate a unique session ID
   */
  generateSessionId(): string {
    return `offline-${Date.now()}-${Math.random().toString(36).substring(2, 9)}`;
  }
}
