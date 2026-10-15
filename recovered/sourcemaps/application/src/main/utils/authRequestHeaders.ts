import { TOKEN_EXCHANGE_PATH } from '@/main/utils/authCodeExchange';

// webRequest match patterns can't specify ports (any port matches). The
// http/ws localhost entries exist for local-backend dev
// (VITE_API_BASE_URL=http://localhost:8080) — without them the interceptor
// never fires on plain http, so no Authorization header is ever attached and
// every call 401s. applyAuthRequestHeaders still gates on the exact
// configured origin, so the token never goes anywhere else.
export const AUTH_INTERCEPT_URL_PATTERNS = [
  'https://*/*',
  'wss://*/*',
  'http://localhost/*',
  'ws://localhost/*',
  'http://127.0.0.1/*',
  'ws://127.0.0.1/*',
];

type AuthRequestHeaders = Record<string, string>;

type ApplyAuthRequestHeadersOptions = {
  url: string;
  requestHeaders: AuthRequestHeaders;
  token: string;
  apiBaseUrl: string;
  webSocketBaseUrl: string;
  webBaseUrl: string;
};

export const applyAuthRequestHeaders = ({
  url,
  requestHeaders,
  token,
  apiBaseUrl,
  webSocketBaseUrl,
  webBaseUrl,
}: ApplyAuthRequestHeadersOptions): void => {
  const requestUrl = new URL(url);
  const requestOrigin = requestUrl.origin;
  const isWebSocket = requestOrigin === new URL(webSocketBaseUrl).origin;
  if (requestOrigin !== new URL(apiBaseUrl).origin && !isWebSocket) return;
  // token-exchange는 main에서 defaultSession으로 나가 이 인터셉터를 통과한다.
  // 스토어에 낡은 토큰이 남은 상태(세션 만료 후 재로그인)면 revoke된 Bearer가
  // 붙는다 (PLT-6106).
  if (requestUrl.pathname.endsWith(TOKEN_EXCHANGE_PATH)) return;

  requestHeaders.Authorization = `Bearer ${token}`;
  if (isWebSocket) requestHeaders.Origin = webBaseUrl;
};
