// One-time path authorization for fs:read-file / fs:write-file IPCs.
//
// Background: fs:read-file and fs:write-file used to accept an arbitrary path
// argument from the renderer, so a single renderer-side XSS could read/write
// any OS-level file (ssh keys, launchd plists, browser cookies, …).
//
// Strategy: only paths returned from dialog.showSaveDialog or
// dialog.showOpenDialog (which require explicit user interaction) become
// authorized. Authorization is consumed on use (one-shot), bounded by
// max-size, and expires after a short TTL so memory does not grow.
//
// The renderer call shape is unchanged: it still calls
//   1. window.electron.dialog.showSaveDialog(...)  → returns { filePath }
//   2. window.electron.fs.writeFile(filePath, data)
// Authorization is enforced transparently in the main process.
//
// See: docs audit TIRO-SEC-04.

const MAX_APPROVED = 64;
const APPROVAL_TTL_MS = 5 * 60 * 1000;

const approvals = new Map<string, number>();

const sweep = (now: number = Date.now()): void => {
  for (const [p, expiresAt] of approvals) {
    if (expiresAt <= now) approvals.delete(p);
  }
  if (approvals.size > MAX_APPROVED) {
    const sorted = Array.from(approvals.entries()).sort((a, b) => a[1] - b[1]);
    const overflow = approvals.size - MAX_APPROVED;
    for (let i = 0; i < overflow; i++) {
      approvals.delete(sorted[i][0]);
    }
  }
};

export const approveDialogPath = (filePath: string | undefined): void => {
  if (!filePath) return;
  approvals.set(filePath, Date.now() + APPROVAL_TTL_MS);
  sweep();
};

export const approveDialogPaths = (
  filePaths: readonly string[] | undefined,
): void => {
  if (!filePaths) return;
  for (const p of filePaths) approveDialogPath(p);
};

export const consumeApprovedDialogPath = (filePath: string): boolean => {
  sweep();
  if (!approvals.has(filePath)) return false;
  approvals.delete(filePath);
  return true;
};

// Test-only helpers
export const __resetApprovedDialogPaths = (): void => {
  approvals.clear();
};

export const __getApprovedDialogPathCount = (): number => approvals.size;
