import { type Agent } from 'node:http';

import { HttpsProxyAgent } from 'https-proxy-agent';
import { SocksProxyAgent } from 'socks-proxy-agent';

/**
 * Build an HTTP(S)/SOCKS proxy agent from an Electron `session.resolveProxy`
 * result so that the `ws` WebSocket honours the OS/PAC proxy configuration the
 * way Chromium does. The renderer's browser WebSocket got this for free; the
 * Node `ws` socket in the main process does not, which breaks users behind a
 * corporate proxy.
 *
 * `resolveProxy` returns a PAC-style string, e.g.:
 *   - "DIRECT"
 *   - "PROXY 1.2.3.4:8080"
 *   - "PROXY 1.2.3.4:8080;DIRECT"
 *   - "HTTPS proxy.corp:443"
 *   - "SOCKS5 1.2.3.4:1080"
 *
 * Only the first (preferred) directive is honoured; `;`-separated entries are
 * fallbacks that the agents themselves do not model.
 *
 * @param proxyResult - The string returned by Electron `session.resolveProxy`.
 * @returns A proxy agent, or `undefined` for DIRECT / unparseable results.
 */
export const createProxyAgent = (proxyResult: string): Agent | undefined => {
  const first = proxyResult.split(';')[0]?.trim() ?? '';
  if (!first || first.toUpperCase() === 'DIRECT') {
    return undefined;
  }

  const match = first.match(/^(\S+)\s+(\S+)$/);
  if (!match) {
    return undefined;
  }

  const scheme = match[1].toUpperCase();
  const hostPort = match[2];

  switch (scheme) {
    case 'PROXY':
      return new HttpsProxyAgent(`http://${hostPort}`);
    case 'HTTPS':
      return new HttpsProxyAgent(`https://${hostPort}`);
    case 'SOCKS':
    case 'SOCKS5':
      return new SocksProxyAgent(`socks5://${hostPort}`);
    case 'SOCKS4':
      return new SocksProxyAgent(`socks4://${hostPort}`);
    default:
      return undefined;
  }
};
