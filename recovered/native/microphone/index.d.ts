declare module "@plato-corp/microphone" {
  /**
   * Returns true when the default input device (microphone) is in use.
   * Supported on macOS (CoreAudio) and Windows (WASAPI).
   * On other platforms, this function returns false.
   */
  export function isMicInUse(): boolean;

  /**
   * Marks that Tiro has started using the microphone.
   * This should be called when Tiro begins audio capture.
   */
  export function startTiroSession(): void;

  /**
   * Marks that Tiro has stopped using the microphone.
   * This should be called when Tiro ends audio capture.
   */
  export function stopTiroSession(): void;

  /**
   * Returns true when an application OTHER THAN Tiro is using the microphone.
   * This function automatically excludes Tiro's own microphone usage.
   * Supported on macOS (CoreAudio) and Windows (WASAPI).
   * On other platforms, this function returns false.
   */
  export function isOtherAppUsingMic(): boolean;

  /** A single process currently using the microphone for input. */
  export interface MicInputProcess {
    /** OS process id; -1 if unknown. */
    pid: number;
    /**
     * Windows: executable basename, lowercased (e.g. "zoom.exe").
     * macOS: bundle id (e.g. "us.zoom.xos"); may be empty for non-bundled
     * executables (helpers, sidecars).
     */
    identifier: string;
    /** Windows: full executable path. macOS: empty. */
    executable: string;
  }

  /**
   * Returns every process currently using the microphone for input — a pure
   * sensor. The caller excludes its own processes (by pid/identifier) and maps
   * identifiers to known call apps.
   *
   * - Windows: active WASAPI capture sessions on the DEFAULT capture endpoint
   *   only (process id + image name). A call app recording from a non-default
   *   input device may not appear.
   * - macOS 14.4+: CoreAudio process objects with input running.
   * - macOS < 14.4 and other platforms: returns an empty array (the
   *   per-process input API does not exist there).
   *
   * Notes:
   * - Synchronous; call on the main thread and avoid tight polling loops.
   * - `identifier` is ADVISORY, not authoritative for security decisions. On
   *   Windows it is resolved from the live OS at enumeration time, so a process
   *   that exits mid-enumeration is skipped rather than mis-attributed; only
   *   sessions whose process could be opened and named are returned.
   * - macOS may return an entry with a valid `pid` but an empty `identifier`
   *   (non-bundled helpers/sidecars) — exclude those by `pid`.
   */
  export function getMicInputProcesses(): MicInputProcess[];
}
