import tls from 'node:tls';

import log from 'electron-log';

let cached: string[] | undefined;

/**
 * Returns the CA certificates the OS trusts (Keychain on macOS, certificate
 * store on Windows) merged with Node's bundled roots and any NODE_EXTRA_CA_CERTS.
 *
 * The renderer's browser WebSocket validated TLS against the OS trust store via
 * Chromium. The Node `ws` socket in the main process only uses Node's bundled
 * CA bundle, so it fails for users behind a TLS-intercepting corporate proxy
 * whose MITM root lives in the OS store. Passing this list as the `ca` option
 * restores that behaviour. Cached for the process lifetime.
 *
 * Uses `tls.getCACertificates` (Node 22.15+, available in Electron 39's Node
 * 22.x), so no native dependency is required. Falls back to the bundled roots
 * on older runtimes or on error.
 */
export const getSystemCaCertificates = (): string[] => {
  if (cached) {
    return cached;
  }

  if (typeof tls.getCACertificates !== 'function') {
    cached = [...tls.rootCertificates];
    return cached;
  }

  try {
    const bundled = tls.getCACertificates('bundled');
    const system = tls.getCACertificates('system');
    const extra = tls.getCACertificates('extra');
    // De-duplicate while preserving order (bundled first, then OS/extra roots).
    cached = Array.from(new Set([...bundled, ...system, ...extra]));
    log.info(
      `[SystemCA] Loaded CA certificates bundled=${bundled.length} system=${system.length} extra=${extra.length} total=${cached.length}`,
    );
  } catch (e) {
    log.warn('[SystemCA] Failed to read system certificates; using bundled', e);
    cached = [...tls.rootCertificates];
  }

  return cached;
};
