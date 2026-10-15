/**
 * Shared audio-meter helpers for the recording waveform.
 *
 * Neutral module: pure TypeScript with NO imports from `@/main`, `@/renderer`,
 * `electron`, `react`, `mobx`, or node. Lives in `src/shared` so BOTH the main
 * bundle (overlay feed) and the renderer bundle (stores + components) can import
 * it via the `@/* -> src/*` tsconfig alias without crossing the main<->renderer
 * boundary.
 *
 * The perceptual stage lives UPSTREAM, not here. The native Rust sidecar
 * (crates/tiro-audio-capture) dB-windows, noise-gates, and smooths raw RMS into
 * a perceptual [0, 1] level before it reaches us (the sidecar emits that level in
 * the IPC field misleadingly named `rms`). So this module does NOT re-map: it
 * clamps the already-perceptual level, applies the display-side decay, and
 * renders bar heights linearly. (The decay clock itself is React state.)
 */

// ---------------------------------------------------------------------------
// CONSTANTS
// ---------------------------------------------------------------------------

/** Minimum rendered bar height in px, so a bar stays visible at the floor. */
export const MIN_BAR_PX = 2;

/**
 * Softened decorative bar shape for the instantaneous 5-bar meters (in-note
 * controller + offline toast). A per-bar height multiplier, NOT a history — the
 * single display level drives all bars. The pill overlay keeps its own inline
 * copy (a data:text/html window can't import TS).
 */
export const INSTANT_BAR_SHAPE = [0.7, 0.85, 1, 0.85, 0.7];

/**
 * Per-tick multiplier for the asymmetric display decay: attack is instant
 * (a louder reading shows at once), release multiplies the shown value by this
 * each `DECAY_TICK_MS`. 0.6 over 50 ms ticks settles a full bar (1.0) to
 * `DISPLAY_FLOOR` in ~400 ms (0.6^8 < 0.02 → 8 ticks × 50 ms), or ~550 ms on a
 * hard frame-stop including the `FRAME_STALE_MS` hold before release begins —
 * smooth fall while live, decay-to-floor when frames stop.
 */
export const RELEASE_FACTOR = 0.6;

/** Cadence of the recording-scoped decay clock, ~one native emit tick. */
export const DECAY_TICK_MS = 50;

/** Below this shown level, snap to 0 so bars fully settle instead of crawling. */
export const DISPLAY_FLOOR = 0.02;

/**
 * If no fresh frame arrives within this window while recording, the meter is
 * considered stalled (paused mid-stream, sidecar crash, device switch) and the
 * shown level decays toward 0 instead of freezing at the last value.
 */
export const FRAME_STALE_MS = 150;

// ---------------------------------------------------------------------------
// PURE HELPERS
// ---------------------------------------------------------------------------

/**
 * Clamp an already-perceptual [0, 1] display level. The native sidecar level
 * arrives dB-windowed / gated / smoothed upstream, so this is IDENTITY plus a defensive clamp — do NOT dB-window it
 * again (a second window double-maps and collapses the dynamic range).
 * Used for BOTH sources.
 */
export const clampLevel = (level: number): number => {
  if (!Number.isFinite(level) || level <= 0) return 0;
  return level >= 1 ? 1 : level;
};

/**
 * Asymmetric decay reducer: instant attack, gradual release.
 * `shown = max(next, prev * releaseFactor)`. Pass the live reading as `next`
 * for attack/release toward it, or 0 as `next` to release toward the floor.
 */
export const decayLevel = (
  prev: number,
  next: number,
  releaseFactor: number = RELEASE_FACTOR,
): number => {
  const released = prev * releaseFactor;
  return next > released ? next : released;
};

/**
 * Linear render height for a display level, floored to `MIN_BAR_PX`.
 * No perceptual curve here — the perceptual stage is upstream (sidecar/worklet).
 */
export const barHeight = (level: number, maxHeightPx: number): number => {
  const h = level * maxHeightPx;
  return h > MIN_BAR_PX ? h : MIN_BAR_PX;
};
