import {
  LOGIN_ATTEMPT_ID_PARAM,
  LOGIN_HANDOFF_EVENT,
  LOGIN_HANDOFF_REPLAYED_ATTEMPT_ATTR,
  type LoginHandoffErrorKind,
  type LoginHandoffStage,
} from '@/shared/loginHandoff';

/** Same bound the backend applies — the value round-trips through a URL. */
const LOGIN_ATTEMPT_ID_PATTERN = /^[A-Za-z0-9_-]{1,64}$/;

const KNOWN_AUTH_PROVIDERS = ['google', 'microsoft', 'sso'];

/**
 * The deep link comes from the OS URL dispatcher, so its query is untrusted:
 * an unbounded value here would pollute log fields and Datadog facets.
 */
export const sanitizeLoginAttemptId = (
  value: string | null | undefined,
): string | undefined => {
  if (!value) return undefined;
  return LOGIN_ATTEMPT_ID_PATTERN.test(value) ? value : undefined;
};

/**
 * Reported only when known. This value is read — and logged — before the
 * auth-intent check has vouched for the callback, so it must not be able to
 * introduce arbitrary facet values.
 */
export const sanitizeAuthProvider = (
  value: string | null | undefined,
): string | undefined => {
  if (!value) return undefined;
  const normalized = value.toLowerCase();
  return KNOWN_AUTH_PROVIDERS.includes(normalized) ? normalized : undefined;
};

type LoginHandoffLogInput = {
  stage: LoginHandoffStage;
  loginAttemptId: string | undefined;
  provider: string | undefined;
  errorKind?: LoginHandoffErrorKind;
  elapsedMs: number;
  replayedAttempt?: boolean;
};

/**
 * Build the structured payload for one native handoff stage.
 *
 * - `login_attempt_id` is omitted rather than defaulted when the deep link
 *   carried none, so `cardinality(@login_attempt_id)` stays a true attempt
 *   count; find uninstrumented traffic with `-@login_attempt_id:*`.
 * - `platform` and the app version are deliberately absent: these payloads are
 *   re-emitted through the renderer's SDK, whose `initDatadog` already puts
 *   `platform` and `version` on every log as global context.
 * - `replayed_attempt` marks a rejected callback whose attempt id had already
 *   completed on this app (relay page re-run, manual link, delayed callback
 *   after a restart). Nobody is blocked by it, so monitors may exclude it.
 * - No token, authorization code or full callback URL is included.
 *
 * Pure so the emitted payload — the actual observability deliverable — is unit
 * testable without an Electron main process.
 */
export const buildLoginHandoffLog = (
  input: LoginHandoffLogInput,
): {
  message: string;
  context: Record<string, string | number | boolean>;
} => ({
  message: `[Auth] OAuth handoff ${input.stage}`,
  context: {
    event: LOGIN_HANDOFF_EVENT,
    ...(input.loginAttemptId
      ? { [LOGIN_ATTEMPT_ID_PARAM]: input.loginAttemptId }
      : {}),
    stage: input.stage,
    result: input.errorKind ? 'failed' : 'ok',
    ...(input.errorKind ? { error_kind: input.errorKind } : {}),
    ...(input.replayedAttempt
      ? { [LOGIN_HANDOFF_REPLAYED_ATTEMPT_ATTR]: true }
      : {}),
    ...(input.provider ? { provider: input.provider } : {}),
    elapsed_ms: input.elapsedMs,
  },
});
