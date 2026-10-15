import { shell } from 'electron';
import log from 'electron-log';

// Allowed URL schemes for `shell.openExternal` when the input URL comes from a
// non-trusted source (renderer IPC, calendar deeplink, etc.).
//
// `shell.openExternal` will happily hand a URL to the OS via its custom URI
// handler registry. An attacker who can plant a URL into any of our IPCs can
// therefore reach `file:///…` (exfiltrate local files), `javascript:` (script
// execution in the launched browser), or any third-party custom scheme. We
// require either http/https for outbound links or mailto for email export.
// Anything else is dropped with a warn log. See TIRO-SEC-03 / 06 / 07.
const ALLOWED_OUTBOUND_SCHEMES = new Set(['https:', 'http:', 'mailto:']);

export const safeOpenExternal = async (rawUrl: string): Promise<boolean> => {
  if (typeof rawUrl !== 'string' || rawUrl.length === 0) {
    log.warn('Rejected shell.openExternal — empty or non-string URL');
    return false;
  }

  let parsed: URL;
  try {
    parsed = new URL(rawUrl);
  } catch {
    log.warn('Rejected shell.openExternal — unparseable URL');
    return false;
  }

  if (!ALLOWED_OUTBOUND_SCHEMES.has(parsed.protocol)) {
    log.warn(
      `Rejected shell.openExternal — disallowed scheme "${parsed.protocol}"`,
    );
    return false;
  }

  await shell.openExternal(rawUrl);
  return true;
};

export const openExternalOrThrow = async (rawUrl: string): Promise<void> => {
  if (!(await safeOpenExternal(rawUrl))) {
    throw new Error('Failed to open external URL');
  }
};
