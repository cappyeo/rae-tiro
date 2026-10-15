import { safeStorage } from 'electron';
import log from 'electron-log';

// Persists the user's Bearer auth_token via OS keychain when available
// (macOS Keychain, Windows DPAPI). Falls back to plaintext electron-store on
// platforms where `safeStorage.isEncryptionAvailable()` is false.
//
// Background: previously `auth_token` was stored as a plaintext value in
// ~/Library/Application Support/<app>/config.json. Any local process the user
// runs (a curious npm package, a stolen backup, …) could read the file and
// recover a long-lived API bearer. See TIRO-SEC-18.
//
// On startup `initAuthTokenStorage` migrates an existing plaintext entry into
// the encrypted slot so existing sessions are not broken by the upgrade.

const PLAINTEXT_KEY = 'auth_token';
const ENCRYPTED_KEY = 'auth_token_encrypted';

// Loose store shape — we don't pull the full electron-store generic into
// every consumer just to read/write two keys.
type AnyStore = {
  get: (key: string) => unknown;
  set: (key: string, value: unknown) => void;
  delete: (key: string) => void;
};

const isEncryptionAvailable = (): boolean => {
  try {
    return safeStorage.isEncryptionAvailable();
  } catch (error) {
    log.warn(
      '[auth] safeStorage.isEncryptionAvailable threw, falling back',
      error,
    );
    return false;
  }
};

export const protectAuthSecret = (secret: string): string | null => {
  if (!isEncryptionAvailable()) return null;
  try {
    return safeStorage.encryptString(secret).toString('base64');
  } catch (error) {
    log.warn('[auth] protectAuthSecret failed', error);
    return null;
  }
};

export const unprotectAuthSecret = (encrypted: string): string | null => {
  if (!isEncryptionAvailable()) return null;
  try {
    return safeStorage.decryptString(Buffer.from(encrypted, 'base64'));
  } catch (error) {
    log.warn('[auth] unprotectAuthSecret failed', error);
    return null;
  }
};

export const getAuthToken = (store: AnyStore): string => {
  const encrypted = store.get(ENCRYPTED_KEY) as string | undefined;
  const encAvailable = isEncryptionAvailable();

  if (encrypted && encAvailable) {
    try {
      return safeStorage.decryptString(Buffer.from(encrypted, 'base64'));
    } catch (error) {
      log.warn(
        '[auth] getAuthToken: decrypt failed; treating as logged out',
        error,
      );
      return '';
    }
  }

  if (encrypted && !encAvailable) {
    log.warn(
      '[auth] getAuthToken: encrypted token present but encryption unavailable → treating as logged out',
    );
  }

  return (store.get(PLAINTEXT_KEY) as string | undefined) ?? '';
};

export const setAuthToken = (store: AnyStore, token: string): void => {
  if (isEncryptionAvailable()) {
    try {
      const encrypted = safeStorage.encryptString(token).toString('base64');
      store.set(ENCRYPTED_KEY, encrypted);
      store.delete(PLAINTEXT_KEY);
    } catch (error) {
      log.error(
        '[auth] setAuthToken: encryptString failed — token NOT persisted',
        error,
      );
      throw error;
    }
  } else {
    store.set(PLAINTEXT_KEY, token);
    store.delete(ENCRYPTED_KEY);
  }
};

export const removeAuthToken = (store: AnyStore): void => {
  log.info('[auth] removeAuthToken: clearing stored auth token (logout/leave)');
  store.delete(PLAINTEXT_KEY);
  store.delete(ENCRYPTED_KEY);
};

/**
 * One-time migration: if a plaintext `auth_token` exists and encryption is
 * available, re-encrypt and delete the plaintext slot. Safe to call on every
 * boot; no-op when state is already in the desired shape.
 */
export const initAuthTokenStorage = (store: AnyStore): void => {
  if (!isEncryptionAvailable()) return;
  const plain = store.get(PLAINTEXT_KEY) as string | undefined;
  if (!plain) return;
  if (store.get(ENCRYPTED_KEY)) {
    // Both present — keep encrypted, drop plaintext.
    store.delete(PLAINTEXT_KEY);
    return;
  }
  try {
    const encrypted = safeStorage.encryptString(plain).toString('base64');
    store.set(ENCRYPTED_KEY, encrypted);
    store.delete(PLAINTEXT_KEY);
    log.info('[auth] migrated plaintext auth_token to encrypted slot');
  } catch (error) {
    log.warn('[auth] failed to migrate plaintext auth_token', error);
  }
};
