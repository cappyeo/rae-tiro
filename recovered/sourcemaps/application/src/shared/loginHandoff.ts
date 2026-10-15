// Shared contract for tracking one OAuth login handoff (backend callback →
// web relay → this app) as a single attempt in Datadog (PLT-6097).
//
// These strings are a cross-surface contract: the same values live in the web
// relay (`services/web/src/usecases/loginHandoffObservability.ts`), the backend
// (`LoginHandoffLog.kt`) and the mobile app. Dashboards/monitors join on them,
// so changing one copy without the others silently breaks correlation. Desktop
// keeps its own copy because it does not consume `packages/core`.

export const LOGIN_HANDOFF_EVENT = 'oauth_login_handoff';

export const LOGIN_ATTEMPT_ID_PARAM = 'login_attempt_id';

export type LoginHandoffStage =
  | 'protocol_received'
  | 'intent_validation_failed'
  | 'exchange_started'
  | 'exchange_succeeded'
  | 'exchange_failed'
  | 'token_saved';

/**
 * Low-cardinality failure classes. These are the distinctions the ticket needs:
 * protocol received but rejected (`intent_*`), exchange refused vs unreachable
 * vs timed out (`exchange_*`), and token save itself failing
 * (`token_save_failed`).
 */
export type LoginHandoffErrorKind =
  | 'missing_code'
  | 'intent_invalid'
  | 'api_base_url_missing'
  | 'exchange_http_4xx'
  | 'exchange_http_5xx'
  | 'exchange_network'
  | 'exchange_timeout'
  | 'exchange_invalid_body'
  | 'exchange_no_token'
  | 'token_save_failed'
  | 'unknown';

/**
 * Desktop-only optional attribute on an `intent_validation_failed` log. `true`
 * means this attempt id had already completed (`token_saved`) on this app and
 * the callback is a re-delivery (relay page re-run, manual link, or a delayed
 * callback after a restart), so nobody was blocked. Not part of the
 * cross-surface contract above; monitors may exclude it.
 */
export const LOGIN_HANDOFF_REPLAYED_ATTEMPT_ATTR = 'replayed_attempt';
