import { net } from 'electron';

import { type LoginHandoffErrorKind } from '@/shared/loginHandoff';

// Node 글로벌 `fetch`로 되돌리지 말 것. OS/PAC 프록시와 시스템 인증서 저장소를
// 무시해서 기업망에서만 실패한다 (PLT-6106).
// 정상 왕복은 ~126ms. 이 예산은 서버가 아니라 콜드 WPAD/PAC 발견과 407 재시도용.
const EXCHANGE_TIMEOUT_MS = 15_000;

export const TOKEN_EXCHANGE_PATH = '/v1/auth/token-exchange';

type TokenExchangeResponse = {
  accessToken?: unknown;
};

/**
 * Carries a low-cardinality cause so "앱으로 돌아왔는데 로그인이 안 됐다" can be
 * split into refused (4xx), server-side (5xx), unreachable (network), timed-out
 * and malformed-response cases without logging the response body (PLT-6097).
 */
export class AuthCodeExchangeError extends Error {
  constructor(
    message: string,
    readonly errorKind: LoginHandoffErrorKind,
  ) {
    super(message);
    this.name = 'AuthCodeExchangeError';
  }
}

export const exchangeAuthCode = async (
  code: string,
  apiBaseUrl: string,
  codeVerifier?: string,
): Promise<string> => {
  let response: Response;
  try {
    response = await net.fetch(`${apiBaseUrl}${TOKEN_EXCHANGE_PATH}`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        code,
        ...(codeVerifier ? { code_verifier: codeVerifier } : {}),
      }),
      // 생략하면 안 된다. `net.fetch`는 Origin 헤더가 없을 때 credentials를
      // same-origin에서 include로 승격시켜 defaultSession 쿠키를 실어 보낸다.
      credentials: 'omit',
      signal: AbortSignal.timeout(EXCHANGE_TIMEOUT_MS),
    });
  } catch (error) {
    // 타임아웃을 network와 합치지 말 것. 기업망 프록시 정지(PLT-6106)와 단순
    // 연결 실패는 대응이 다르다.
    const timedOut = (error as Error).name === 'TimeoutError';
    throw new AuthCodeExchangeError(
      timedOut
        ? `Auth code exchange timed out after ${EXCHANGE_TIMEOUT_MS}ms`
        : `Auth code exchange could not reach the server: ${(error as Error).message}`,
      timedOut ? 'exchange_timeout' : 'exchange_network',
    );
  }

  if (!response.ok) {
    throw new AuthCodeExchangeError(
      `Auth code exchange failed: ${response.status}`,
      response.status >= 500 ? 'exchange_http_5xx' : 'exchange_http_4xx',
    );
  }

  let body: TokenExchangeResponse;
  try {
    body = (await response.json()) as TokenExchangeResponse;
  } catch {
    // body를 메시지에 넣지 말 것. JSON.parse 에러에는 응답 앞부분이 담기는데
    // Datadog 전송 경로에는 sentryScrub 같은 스크러버가 없다.
    throw new AuthCodeExchangeError(
      `Auth code exchange returned non-JSON body: ${response.status} ${response.headers.get('content-type') ?? 'unknown'}`,
      'exchange_invalid_body',
    );
  }

  if (typeof body.accessToken !== 'string' || body.accessToken.length === 0) {
    throw new AuthCodeExchangeError(
      'Auth code exchange returned no access token',
      'exchange_no_token',
    );
  }
  return body.accessToken;
};
