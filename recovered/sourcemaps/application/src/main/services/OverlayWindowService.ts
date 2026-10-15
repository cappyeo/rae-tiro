import { type BrowserWindow } from 'electron';
import type Store from 'electron-store';

import { createOverlayWindow } from '@/main/utils/window';
import {
  DECAY_TICK_MS,
  DISPLAY_FLOOR,
  FRAME_STALE_MS,
  MIN_BAR_PX,
  RELEASE_FACTOR,
} from '@/shared/audioMeter';

/**
 * Overlay Window Service
 * Manages the mini recording overlay window that appears when main window loses focus during recording
 */
export class OverlayWindowService {
  private overlayWindow: BrowserWindow | null = null;
  private isRecording = false;
  private currentNoteId: number | null = null;
  private isShowing = false;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  private store: Store<any>;

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  constructor(store: Store<any>) {
    this.store = store;
  }

  /**
   * Initialize overlay window (pre-create to avoid focus issues on first show)
   */
  initialize(): void {
    if (!this.overlayWindow || this.overlayWindow.isDestroyed()) {
      this.overlayWindow = createOverlayWindow();

      this.loadOverlayContent();
      // Hide it immediately after creation
      this.overlayWindow.hide();
    }
  }

  /**
   * Set recording state
   */
  setRecordingState(recording: boolean, noteId?: number): void {
    this.isRecording = recording;
    this.currentNoteId = noteId ?? null;

    // If recording stopped, hide overlay
    if (!recording && this.overlayWindow) {
      this.hide();
    }
  }

  /**
   * Get current note ID
   */
  getCurrentNoteId(): number | null {
    return this.currentNoteId;
  }

  /**
   * Show overlay window
   */
  show(): void {
    // Check if overlay should be shown (recording + enabled in settings)
    if (!this.shouldShow()) {
      return;
    }

    // Prevent duplicate calls
    if (
      this.isShowing &&
      this.overlayWindow &&
      !this.overlayWindow.isDestroyed()
    ) {
      return;
    }

    // Create window if needed (shouldn't happen if initialized properly)
    if (!this.overlayWindow || this.overlayWindow.isDestroyed()) {
      this.initialize();
    }

    // Show existing window without stealing focus
    if (this.overlayWindow && !this.overlayWindow.isVisible()) {
      this.overlayWindow.showInactive();
    }

    this.isShowing = true;
  }

  /**
   * Hide overlay window
   */
  hide(): void {
    if (this.overlayWindow && !this.overlayWindow.isDestroyed()) {
      this.overlayWindow.hide();
    }
    this.isShowing = false;
  }

  /**
   * Check if overlay should be shown.
   * Returns true only if recording AND overlay is enabled in settings.
   *
   * Restored alongside the tray menu so users have a visual indicator that
   * recording is active even when the main window is hidden — feedback was
   * that the tray-only surface made it hard to tell whether the app was
   * still capturing.
   */
  shouldShow(): boolean {
    const isEnabled = this.store.get('overlay_enabled', true) as boolean;
    return this.isRecording && isEnabled;
  }

  /**
   * Get overlay window instance
   */
  getWindow(): BrowserWindow | null {
    return this.overlayWindow;
  }

  /**
   * Load overlay HTML content
   */
  private loadOverlayContent(): void {
    if (!this.overlayWindow || this.overlayWindow.isDestroyed()) return;

    const htmlContent = `
      <!DOCTYPE html>
      <html>
        <head>
          <meta charset="UTF-8">
          <meta name="viewport" content="width=device-width, initial-scale=1.0">
          <style>
            :root {
              /* brown-800. 램프가 움직이면 여기도 맞춰야 합니다. main 프로세스라 tds 변수가 안 닿습니다 */
              --overlay-surface-color: #3D261C; /* fg-primary 라이트와 같은 값. 항상 어두운 오버레이라 고정입니다 */
              --overlay-border-color: #6D5747; /* brown-500. 전에는 rgb(112 88 76) 로 램프 밖이었습니다 */
            }
            * { margin: 0; padding: 0; box-sizing: border-box; }
            body {
              margin: 0;
              width: 100vw;
              height: 100vh;
              padding: 2px 2px 5px 2px;
              overflow: hidden;
              background: transparent;
            }

            .overlay-container {
              display: flex;
              flex-direction: column;
              align-items: center;
              width: 100%;
              height: 100%;
              gap: 4px;
              background: var(--overlay-surface-color);
              border-radius: 18px;
              padding: 5px 8px 10px 8px;
              border: 1px solid var(--overlay-border-color);
              overflow: hidden;
            }

            // .drag-handle-wrapper {
            //   width: 100%;
            //   display: flex;
            //   justify-content: center;
            //   align-items: center;
            //   min-height: 12px;
            //   position: relative;
            //   cursor: grab;
            //   -webkit-app-region: no-drag;
            //   app-region: no-drag;
            // }

            // .drag-handle-wrapper:active {
            //   cursor: grabbing;
            // }

            .drag-handle {
              width: 30px;
              height: 10px;
              display: flex;
              align-items: center;
              justify-content: center;
              -webkit-app-region: drag;
              app-region: drag;
              pointer-events: none;
            }

            .drag-handle::before {
              content: '';
              width: 20px;
              height: 3px;
              background: rgba(255, 255, 255, 0.2);
              border-radius: 9px;
            }

            .content-row {
              display: flex;
              align-items: center;
              gap: 8px;
              padding: 1px 2px 0 2px;
              cursor: pointer;
              -webkit-app-region: no-drag;
              pointer-events: auto;
              transition: opacity 0.2s ease;
            }

            .content-row:hover { opacity: 0.9; }
            .content-row:active { opacity: 0.8; }

            .logo {
              width: 23px;
              height: 23px;
              background: url('data:image/png;base64,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') center/contain no-repeat;
              pointer-events: none;
            }

            .waveform {
              display: flex;
              align-items: center;
              gap: 3px;
              height: 19px;
            }

            .wave-bar {
              width: 3px;
              background: white;
              border-radius: 9px;
              /* 80 ms keeps motion smooth while staying inside one Rust-side
                 emit tick (~50 ms) so the meter doesn't visibly lag bursts. */
              transition: height 0.08s ease-out;
              height: 3px;
            }
          </style>
        </head>
        <body>
          <div class="overlay-container">
            <div class="drag-handle-wrapper">
              <div class="drag-handle"></div>
            </div>
            <div class="content-row" id="content-row">
              <div class="logo"></div>
              <div class="waveform">
                <div class="wave-bar"></div>
                <div class="wave-bar"></div>
                <div class="wave-bar"></div>
                <div class="wave-bar"></div>
                <div class="wave-bar"></div>
              </div>
            </div>
          </div>

          <script>
            document.getElementById('content-row').addEventListener('click', () => {
              window.overlay.click();
            });

            const bars = document.querySelectorAll('.wave-bar');
            // Softened decorative hill for this instantaneous 5-bar meter (a
            // shape, NOT a scroll history). Rebalanced off the old positional
            // array; the pow() perceptual curve is gone — main feeds an
            // already-perceptual [0,1] level (clamped), so heights are LINEAR.
            const barShape = [0.7, 0.85, 1.0, 0.85, 0.7];
            const maxHeight = 19;
            const minBar = ${MIN_BAR_PX};

            // Anti-freeze decay. Constants are interpolated from the shared
            // audioMeter module (SSOT) at build time — the overlay is a dumb
            // data:text/html window and cannot import TS, so numbers are baked
            // in here but never drift from src/shared/audioMeter.ts (DA1).
            // Instant attack, then release toward the floor if frames stop
            // (pause / sidecar crash). ONE timer, self-terminating at the floor
            // when idle — no perpetual rAF/interval while hidden.
            const RELEASE = ${RELEASE_FACTOR};
            const TICK_MS = ${DECAY_TICK_MS};
            const FLOOR = ${DISPLAY_FLOOR};
            const STALE_MS = ${FRAME_STALE_MS};
            let shown = 0;
            let target = 0;
            let lastFrameAt = 0;
            let decayTimer = null;

            function draw() {
              bars.forEach((bar, i) => {
                const h = Math.max(shown * maxHeight * barShape[i], minBar);
                bar.style.height = h + 'px';
              });
            }

            function ensureDecay() {
              if (decayTimer) return;
              decayTimer = setInterval(() => {
                const stale = Date.now() - lastFrameAt >= STALE_MS;
                const t = stale ? 0 : target;
                const released = shown * RELEASE;
                shown = t > released ? t : released;
                if (shown < FLOOR) shown = 0;
                draw();
                if (shown === 0 && stale) {
                  clearInterval(decayTimer);
                  decayTimer = null;
                }
              }, TICK_MS);
            }

            function renderLevel(level) {
              target = level;
              lastFrameAt = Date.now();
              if (level > shown) {
                shown = level; // instant attack
                draw();
              }
              ensureDecay();
            }

            window.overlay.onAudioLevel(renderLevel);
          </script>
        </body>
      </html>
    `;

    this.overlayWindow.loadURL(
      `data:text/html;charset=utf-8,${encodeURIComponent(htmlContent)}`,
    );
  }

  /**
   * Update audio level in overlay window
   * Sends real-time audio level to the overlay waveform visualization
   */
  updateAudioLevel(level: number): void {
    if (
      this.overlayWindow &&
      !this.overlayWindow.isDestroyed() &&
      this.isShowing
    ) {
      this.overlayWindow.webContents.send('overlay:audio-level', level);
    }
  }

  /**
   * Destroy overlay window
   */
  destroy(): void {
    if (this.overlayWindow && !this.overlayWindow.isDestroyed()) {
      this.overlayWindow.destroy();
      this.overlayWindow = null;
    }
    this.isShowing = false;
  }
}
