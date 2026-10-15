import { net } from 'electron';

import {
  type AuthIntentRecord,
  type AuthIntentStore,
  consumeAuthIntentRecord,
  getAuthIntentRecord,
  matchesCredentialAttachNonce,
} from './authIntent';

const CREDENTIAL_COMPLETE_PATH = '/v1/users/me/credentials/complete';
export const WORKFLOW_COMPLETE_PATH = '/v1/workflow/oauth/complete';
const COMPLETE_TIMEOUT_MS = 15_000;
const API_ERROR_CODE = /^\d{6}$/;

export type CredentialAttachCallback = {
  completionCode?: string;
  errorCode?: string;
  intent: AuthIntentRecord;
};

export type CredentialAttachTerminalResult = {
  success: boolean;
  errorCode?: string;
  /** 401의 서버 reason. renderer가 일반 오류 대신 세션 만료 흐름으로 보낸다. */
  sessionExpiredReason?: string;
};

export class CredentialAttachCompletionError extends Error {
  constructor(
    readonly status: number,
    readonly errorCode?: string,
    readonly authFailureReason?: string,
  ) {
    super(`Credential attach completion failed: ${status}`);
    this.name = 'CredentialAttachCompletionError';
  }
}

export type CredentialAttachRequestContext = Readonly<{
  platform: 'mac' | 'windows';
  appVersion: string;
  correlationId: string;
  deviceUuid?: string;
}>;

let pendingTerminalResult: CredentialAttachTerminalResult | null = null;

export const retainCredentialAttachResult = (
  result: CredentialAttachTerminalResult,
): void => {
  pendingTerminalResult = result;
};

export const claimCredentialAttachResult =
  (): CredentialAttachTerminalResult | null => {
    const result = pendingTerminalResult;
    pendingTerminalResult = null;
    return result;
  };

export const discardCredentialAttachResult = (): void => {
  pendingTerminalResult = null;
};

export const consumeCredentialAttachCallback = (
  store: AuthIntentStore,
  provider: string,
  nonce: string | null,
  completionCode?: string,
  errorCode?: string,
): CredentialAttachCallback | null => {
  const intent = getAuthIntentRecord(store, provider);
  if (
    !intent ||
    !matchesCredentialAttachNonce(intent, nonce) ||
    !!completionCode === !!errorCode
  ) {
    return null;
  }

  const consumed = consumeAuthIntentRecord(store, provider);
  return consumed ? { intent: consumed, completionCode, errorCode } : null;
};

const readApiError = async (
  response: Response,
): Promise<{ errorCode?: string; authFailureReason?: string }> => {
  try {
    const body = (await response.json()) as {
      error?: { code?: unknown; detail?: { reason?: unknown } };
    };
    const code = body?.error?.code;
    const normalized = typeof code === 'number' ? String(code) : code;
    const reason = body?.error?.detail?.reason;
    return {
      errorCode:
        typeof normalized === 'string' && API_ERROR_CODE.test(normalized)
          ? normalized
          : undefined,
      authFailureReason:
        response.status === 401 && typeof reason === 'string' && reason.trim()
          ? reason
          : undefined,
    };
  } catch {
    return {};
  }
};

/** handleDeepLink의 실패를 renderer에 넘길 terminal result로 바꾼다. */
export const toCredentialAttachFailure = (
  error: unknown,
): CredentialAttachTerminalResult => {
  if (!(error instanceof CredentialAttachCompletionError)) {
    return { success: false, errorCode: 'invalid' };
  }
  return {
    success: false,
    errorCode: error.errorCode ?? 'invalid',
    ...(error.authFailureReason
      ? { sessionExpiredReason: error.authFailureReason }
      : undefined),
  };
};

export const completeBoundOAuth = async (
  apiBaseUrl: string,
  token: string,
  completionCode: string,
  codeVerifier: string,
  context: CredentialAttachRequestContext,
  path: string,
): Promise<void> => {
  const response = await net.fetch(`${apiBaseUrl}${path}`, {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json',
      'x-platform': context.platform,
      'x-app-version': context.appVersion,
      'X-Correlation-Id': context.correlationId,
      ...(context.deviceUuid
        ? { 'x-device-uuid': context.deviceUuid }
        : undefined),
    },
    body: JSON.stringify({ completionCode, codeVerifier }),
    credentials: 'omit',
    signal: AbortSignal.timeout(COMPLETE_TIMEOUT_MS),
  });

  if (!response.ok) {
    const { errorCode, authFailureReason } = await readApiError(response);
    throw new CredentialAttachCompletionError(
      response.status,
      errorCode,
      authFailureReason,
    );
  }
};

export const completeCredentialAttach = async (
  apiBaseUrl: string,
  token: string,
  completionCode: string,
  codeVerifier: string,
  context: CredentialAttachRequestContext,
): Promise<void> => {
  await completeBoundOAuth(
    apiBaseUrl,
    token,
    completionCode,
    codeVerifier,
    context,
    CREDENTIAL_COMPLETE_PATH,
  );
};
