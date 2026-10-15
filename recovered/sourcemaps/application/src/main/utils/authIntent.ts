// Short-lived authorization marker for desktop auth callbacks.
//
// `tiro://auth/callback?code=...` is attacker-controllable input from the OS
// URL dispatcher, so the main process must only accept it after an in-app
// login click. The marker is persisted in electron-store instead of process
// memory so Windows cold-start callbacks still work after the browser relaunches
// the app via the protocol handler.

const AUTH_INTENT_KEY = 'auth_intent';
const AUTH_INTENT_TTL_MS = 5 * 60 * 1000;

export type AuthIntentRecord = {
  expiresAt: number;
  provider: string | null;
  protectedCodeVerifier?: string;
  credentialAttachNonce?: string;
};

export type AuthIntentStore = {
  get: (key: string) => unknown;
  set: (key: string, value: AuthIntentRecord) => void;
  delete: (key: string) => void;
};

const normalizeProvider = (
  provider: string | null | undefined,
): string | null => {
  const normalized = provider?.trim().toLowerCase();
  return normalized ? normalized : null;
};

const isAuthIntentRecord = (value: unknown): value is AuthIntentRecord => {
  return (
    value != null &&
    typeof value === 'object' &&
    typeof (value as AuthIntentRecord).expiresAt === 'number' &&
    ((value as AuthIntentRecord).provider === null ||
      typeof (value as AuthIntentRecord).provider === 'string') &&
    ((value as AuthIntentRecord).protectedCodeVerifier === undefined ||
      (typeof (value as AuthIntentRecord).protectedCodeVerifier === 'string' &&
        (value as AuthIntentRecord).protectedCodeVerifier!.length > 0)) &&
    ((value as AuthIntentRecord).credentialAttachNonce === undefined ||
      (typeof (value as AuthIntentRecord).credentialAttachNonce === 'string' &&
        (value as AuthIntentRecord).credentialAttachNonce!.length > 0))
  );
};

const isSupportedAuthProvider = (provider: string | null): boolean => {
  return [
    'confluence',
    'google',
    'google-drive',
    'hubspot',
    'microsoft',
    'microsoft-teams',
    'notion',
    'slack',
    'sso',
  ].includes(provider ?? '');
};

const isProviderCompatible = (
  expectedProvider: string | null,
  callbackProvider: string | null,
): boolean => {
  if (!isSupportedAuthProvider(expectedProvider)) return false;
  if (expectedProvider === 'sso') {
    return callbackProvider === null || callbackProvider === 'sso';
  }

  return callbackProvider === expectedProvider;
};

export const markAuthIntent = (
  store: AuthIntentStore,
  provider: string | null | undefined,
  protectedCodeVerifier?: string,
  credentialAttachNonce?: string,
): void => {
  store.set(AUTH_INTENT_KEY, {
    expiresAt: Date.now() + AUTH_INTENT_TTL_MS,
    provider: normalizeProvider(provider),
    ...(protectedCodeVerifier ? { protectedCodeVerifier } : {}),
    ...(credentialAttachNonce ? { credentialAttachNonce } : {}),
  });
};

/**
 * `authorize` IPC 는 로그인/SSO/credential attach/workflow 연동뿐 아니라 Calendar 처럼
 * 콜백이 auth intent 를 읽지 않는 흐름에서도 쓰인다. 그런 흐름까지 intent 를 기록하면
 * 단일 `auth_intent` 슬롯을 덮어써 먼저 진행 중이던 흐름의 nonce·verifier 가 사라진다.
 * 그래서 콜백이 실제로 intent 를 소비하는 흐름만 `bindsAuthCallback` 으로 기록한다.
 */
export const markAuthCallbackIntent = (
  store: AuthIntentStore,
  provider: string | null | undefined,
  options: {
    bindsAuthCallback?: boolean;
    protectedCodeVerifier?: string;
    credentialAttachNonce?: string;
  },
): void => {
  if (!options.bindsAuthCallback) return;
  markAuthIntent(
    store,
    provider,
    options.protectedCodeVerifier,
    options.credentialAttachNonce,
  );
};

export const consumeAuthIntentRecord = (
  store: AuthIntentStore,
  callbackProvider: string | null | undefined,
): AuthIntentRecord | null => {
  const intent = getAuthIntentRecord(store, callbackProvider);
  if (!intent) return null;
  store.delete(AUTH_INTENT_KEY);
  return intent;
};

export const getLoginAuthIntentRecord = (
  store: AuthIntentStore,
  callbackProvider: string | null | undefined,
): AuthIntentRecord | null => {
  const intent = getAuthIntentRecord(store, callbackProvider);
  if (!intent || intent.credentialAttachNonce) return null;
  return intent;
};

export const consumeLoginAuthIntentRecord = (
  store: AuthIntentStore,
  callbackProvider: string | null | undefined,
): AuthIntentRecord | null => {
  const intent = getLoginAuthIntentRecord(store, callbackProvider);
  if (!intent) return null;
  store.delete(AUTH_INTENT_KEY);
  return intent;
};

export const clearAuthIntent = (store: AuthIntentStore): void => {
  store.delete(AUTH_INTENT_KEY);
};

export const restoreAuthIntent = (
  store: AuthIntentStore,
  record: AuthIntentRecord,
): void => {
  store.set(AUTH_INTENT_KEY, record);
};

export const getAuthIntentRecord = (
  store: AuthIntentStore,
  callbackProvider: string | null | undefined,
): AuthIntentRecord | null => {
  if (!isAuthIntentValid(store, callbackProvider)) return null;
  return store.get(AUTH_INTENT_KEY) as AuthIntentRecord;
};

export const isAuthIntentValid = (
  store: AuthIntentStore,
  callbackProvider: string | null | undefined,
): boolean => {
  const intent = store.get(AUTH_INTENT_KEY);
  if (!isAuthIntentRecord(intent)) {
    store.delete(AUTH_INTENT_KEY);
    return false;
  }

  if (intent.expiresAt <= Date.now()) {
    store.delete(AUTH_INTENT_KEY);
    return false;
  }

  return isProviderCompatible(
    normalizeProvider(intent.provider),
    normalizeProvider(callbackProvider),
  );
};

export const hasAuthIntent = (store: AuthIntentStore): boolean => {
  const intent = store.get(AUTH_INTENT_KEY);
  if (!isAuthIntentRecord(intent)) {
    store.delete(AUTH_INTENT_KEY);
    return false;
  }

  if (intent.expiresAt <= Date.now()) {
    store.delete(AUTH_INTENT_KEY);
    return false;
  }

  return true;
};

/**
 * attach·workflow(nonce) 흐름끼리만 pending 중 새 시작을 거부한다. 덮어쓰면 먼저 시작한
 * 흐름의 콜백이 거부돼 렌더러 진행 표시가 풀리지 않는다. 그 밖의 조합은 교체한다:
 * 로그인·SSO 는 로그아웃 상태에서만 시작되므로 남아 있는 nonce intent 는 완료될 수 없고,
 * 로그인 intent 는 로그인 상태에서 소비될 수 없다. 딥링크가 유실된 뒤 TTL 동안
 * 재로그인이 막히면 사용자는 원인을 볼 길이 없다.
 */
export const hasBlockingAuthIntent = (
  store: AuthIntentStore,
  options: { bindsAuthCallback?: boolean; credentialAttachNonce?: string },
): boolean => {
  const bindsNonce = Boolean(
    options.bindsAuthCallback && options.credentialAttachNonce,
  );
  if (!bindsNonce) return false;
  const pending = getPendingAuthIntentRecord(store);
  return pending?.credentialAttachNonce !== undefined;
};

export const getPendingAuthIntentRecord = (
  store: AuthIntentStore,
): AuthIntentRecord | null => {
  if (!hasAuthIntent(store)) return null;
  return store.get(AUTH_INTENT_KEY) as AuthIntentRecord;
};

export const matchesCredentialAttachNonce = (
  intent: AuthIntentRecord,
  callbackNonce: string | null,
): boolean =>
  intent.credentialAttachNonce !== undefined &&
  callbackNonce === intent.credentialAttachNonce;
