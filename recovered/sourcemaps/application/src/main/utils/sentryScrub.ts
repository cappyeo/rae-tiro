// Sentry `beforeSend` scrubber for the desktop main process.
//
// Sentry events include the full exception payload, breadcrumbs, request data,
// and Electron app context. Without scrubbing, a single unexpected error in
// the auth path could ship the user's bearer token / transcript text / IPC
// payloads to Sentry. This filter walks the event and replaces values whose
// keys look sensitive with `[Filtered]`. See TIRO-SEC-21.
//
// The match is intentionally conservative: rather than block-listing keys, we
// match a small set of well-known token / secret names case-insensitively. The
// scrubber is recursive but bounded in depth so a pathological event cannot
// stall the main thread.

import { isNoUpdateAvailableMessage } from './updateErrors';

const SENSITIVE_KEY_PATTERNS = [
  /auth.?token/i,
  /authorization/i,
  /bearer/i,
  /api.?key/i,
  /secret/i,
  /password/i,
  /access.?token/i,
  /refresh.?token/i,
  /session.?id/i,
];

const REDACTED = '[Filtered]';
const MAX_DEPTH = 6;

const isSensitiveKey = (key: string): boolean =>
  SENSITIVE_KEY_PATTERNS.some((re) => re.test(key));

const scrubValue = (value: unknown, depth: number): unknown => {
  if (depth > MAX_DEPTH) return value;
  if (value === null || value === undefined) return value;
  if (Array.isArray(value)) {
    return value.map((entry) => scrubValue(entry, depth + 1));
  }
  if (typeof value === 'object') {
    const out: Record<string, unknown> = {};
    for (const [k, v] of Object.entries(value as Record<string, unknown>)) {
      out[k] = isSensitiveKey(k) ? REDACTED : scrubValue(v, depth + 1);
    }
    return out;
  }
  return value;
};

/**
 * Public entry point. Accepts a Sentry event (shape kept loose to avoid
 * pulling Sentry types into utility code) and returns a scrubbed copy.
 */
export const scrubSentryEvent = <T>(event: T): T => {
  return scrubValue(event, 0) as T;
};

type SentryLikeEvent = {
  message?: unknown;
  exception?: { values?: Array<{ value?: unknown }> };
  user?: unknown;
};

/**
 * Drops the exact Electron/Squirrel "no staged update" control-flow error and
 * scrubs every other event. Runtime updater handlers also classify this error,
 * but this final boundary prevents an unhandled promise path in an older flow
 * from recreating the same Sentry group.
 */
export const prepareDesktopSentryEvent = <T>(event: T): T | null => {
  const sentryEvent = event as SentryLikeEvent;
  const isExpectedUpdaterState =
    isNoUpdateAvailableMessage(sentryEvent?.message) ||
    sentryEvent?.exception?.values?.some((value) =>
      isNoUpdateAvailableMessage(value.value),
    );
  if (isExpectedUpdaterState) return null;

  const scrubbed = scrubSentryEvent(event) as SentryLikeEvent;
  const user = scrubbed.user as { id?: unknown } | undefined;
  if (typeof user?.id === 'string' && user.id) {
    scrubbed.user = { id: user.id };
  } else {
    delete scrubbed.user;
  }
  return scrubbed as T;
};
