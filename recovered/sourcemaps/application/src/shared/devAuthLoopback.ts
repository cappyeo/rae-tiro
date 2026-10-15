// Dev-only OAuth callback loopback. All worktrees' `yarn dev` share one bundle
// id (`com.github.electron`) + `tiro-dev://` scheme, so macOS routes the OAuth
// callback to the wrong worktree. A 127.0.0.1 URL reaches the running instance
// directly (TCP → whoever listens). Prod keeps `tiro://` (unique bundle id).
// Renderer builds this URL; main (index.ts) listens on it — keep the port here.
export const DEV_AUTH_CALLBACK_PORT = 43117;
export const DEV_AUTH_CALLBACK_URL = `http://127.0.0.1:${DEV_AUTH_CALLBACK_PORT}/auth/callback`;
