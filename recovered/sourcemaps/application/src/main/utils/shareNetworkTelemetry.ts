import {
  type OnBeforeRedirectListenerDetails,
  type OnCompletedListenerDetails,
  type OnErrorOccurredListenerDetails,
  type WebRequestFilter,
} from 'electron';

type ShareRequestMethod = 'POST' | 'PUT';
type ShareRequestPhase = 'actual' | 'preflight';
type ShareRouteVariant = 'alias' | 'canonical';
type TelemetryLevel = 'info' | 'warn';

type ShareNetworkRoute = {
  operation: string;
  routeTemplate: string;
  routeVariant: ShareRouteVariant;
  expectedMethod: ShareRequestMethod;
};

type ShareNetworkRouteDefinition = ShareNetworkRoute & {
  preflightOperation?: string;
  pathPattern: RegExp;
};

type ShareNetworkCompletedDetails = Pick<
  OnCompletedListenerDetails,
  | 'fromCache'
  | 'id'
  | 'method'
  | 'resourceType'
  | 'responseHeaders'
  | 'statusCode'
  | 'url'
>;

type ShareNetworkErrorDetails = Pick<
  OnErrorOccurredListenerDetails,
  'error' | 'fromCache' | 'id' | 'method' | 'resourceType' | 'url'
>;

type ShareNetworkWebRequest = {
  onBeforeRedirect(
    filter: WebRequestFilter,
    listener: (details: OnBeforeRedirectListenerDetails) => void,
  ): void;
  onCompleted(
    filter: WebRequestFilter,
    listener: (details: OnCompletedListenerDetails) => void,
  ): void;
  onErrorOccurred(
    filter: WebRequestFilter,
    listener: (details: OnErrorOccurredListenerDetails) => void,
  ): void;
};

export type ShareNetworkTelemetryEvent = {
  level: TelemetryLevel;
  message:
    | '[ShareNetwork] Request completed'
    | '[ShareNetwork] Request failed before response'
    | '[ShareNetwork] Request redirected';
  context: Record<string, string | number | boolean>;
};

export type RegisterShareNetworkTelemetryOptions = {
  webRequest: ShareNetworkWebRequest;
  apiBaseUrl?: string;
  onEvent: (event: ShareNetworkTelemetryEvent) => void;
};

const MAX_MIME_TYPE_LENGTH = 127;
const MAX_NET_ERROR_CODE_LENGTH = 64;
const MIME_TYPE_PATTERN = /^[a-z0-9!#$&^_.+-]+\/[a-z0-9!#$&^_.+-]+$/;
const NET_ERROR_PATTERN = /^NET::(ERR_[A-Z0-9_]+)$/;

const SHARE_NETWORK_ROUTES: readonly ShareNetworkRouteDefinition[] = [
  {
    operation: 'share_note',
    routeTemplate: '/notes/:noteId/share',
    routeVariant: 'canonical',
    expectedMethod: 'POST',
    pathPattern: /^\/v1\/notes\/\d+\/share\/?$/,
  },
  {
    operation: 'share_note',
    routeTemplate: '/notes/:noteId/send',
    routeVariant: 'alias',
    expectedMethod: 'POST',
    pathPattern: /^\/v1\/notes\/\d+\/send\/?$/,
  },
  {
    operation: 'share_note',
    routeTemplate: '/notes/:noteId/pub-config',
    routeVariant: 'alias',
    expectedMethod: 'POST',
    pathPattern: /^\/v1\/notes\/\d+\/pub-config\/?$/,
  },
  {
    operation: 'unshare_note',
    routeTemplate: '/notes/:noteId/unshare',
    routeVariant: 'canonical',
    expectedMethod: 'POST',
    pathPattern: /^\/v1\/notes\/\d+\/unshare\/?$/,
  },
  {
    operation: 'unshare_note',
    routeTemplate: '/notes/:noteId/pub-config/revoke',
    routeVariant: 'alias',
    expectedMethod: 'POST',
    pathPattern: /^\/v1\/notes\/\d+\/pub-config\/revoke\/?$/,
  },
  {
    operation: 'get_shared_note',
    routeTemplate: '/notes/share/:shareId',
    routeVariant: 'canonical',
    expectedMethod: 'POST',
    pathPattern: /^\/v1\/notes\/share\/[^/]+\/?$/,
  },
  {
    operation: 'get_shared_note',
    routeTemplate: '/notes/pub/:shareId',
    routeVariant: 'alias',
    expectedMethod: 'POST',
    pathPattern: /^\/v1\/notes\/pub\/[^/]+\/?$/,
  },
  {
    operation: 'share_note_document_template',
    routeTemplate: '/notes/documents/templates/:templateId/share',
    routeVariant: 'canonical',
    expectedMethod: 'POST',
    pathPattern: /^\/v1\/notes\/documents\/templates\/\d+\/share\/?$/,
  },
  {
    operation: 'share_note_document_template',
    routeTemplate: '/notes/documents/templates/:templateId/pub-config',
    routeVariant: 'alias',
    expectedMethod: 'POST',
    pathPattern: /^\/v1\/notes\/documents\/templates\/\d+\/pub-config\/?$/,
  },
  {
    operation: 'unshare_note_document_template',
    routeTemplate: '/notes/documents/templates/:templateId/unshare',
    routeVariant: 'canonical',
    expectedMethod: 'POST',
    pathPattern: /^\/v1\/notes\/documents\/templates\/\d+\/unshare\/?$/,
  },
  {
    operation: 'unshare_note_document_template',
    routeTemplate: '/notes/documents/templates/:templateId/pub-config/revoke',
    routeVariant: 'alias',
    expectedMethod: 'POST',
    pathPattern:
      /^\/v1\/notes\/documents\/templates\/\d+\/pub-config\/revoke\/?$/,
  },
  {
    operation: 'update_default_share_visibility',
    routeTemplate: '/users/me/preferences/default-share-visibility',
    routeVariant: 'canonical',
    expectedMethod: 'PUT',
    pathPattern: /^\/v1\/users\/me\/preferences\/default-share-visibility\/?$/,
  },
  {
    operation: 'update_default_share_visibility',
    routeTemplate: '/users/me/preferences/default-pub-visibility',
    routeVariant: 'alias',
    expectedMethod: 'PUT',
    pathPattern: /^\/v1\/users\/me\/preferences\/default-pub-visibility\/?$/,
  },
  {
    operation: 'update_workspace_share_policy',
    routeTemplate: '/workspaces/:workspaceGuid/share-policy',
    routeVariant: 'canonical',
    expectedMethod: 'PUT',
    preflightOperation: 'workspace_share_policy_request',
    pathPattern: /^\/v1\/workspaces\/[^/]+\/share-policy\/?$/,
  },
  {
    operation: 'update_workspace_share_policy',
    routeTemplate: '/workspaces/:workspaceGuid/pub-policy',
    routeVariant: 'alias',
    expectedMethod: 'PUT',
    pathPattern: /^\/v1\/workspaces\/[^/]+\/pub-policy\/?$/,
  },
  {
    operation: 'revoke_workspace_share_links',
    routeTemplate: '/workspaces/:workspaceGuid/shared-notes/revoke',
    routeVariant: 'canonical',
    expectedMethod: 'POST',
    pathPattern: /^\/v1\/workspaces\/[^/]+\/shared-notes\/revoke\/?$/,
  },
  {
    operation: 'revoke_workspace_share_links',
    routeTemplate: '/workspaces/:workspaceGuid/pub-notes/revoke',
    routeVariant: 'alias',
    expectedMethod: 'POST',
    pathPattern: /^\/v1\/workspaces\/[^/]+\/pub-notes\/revoke\/?$/,
  },
];

const ALLOWED_RESOURCE_TYPES = new Set([
  'xhr',
  'other',
  'ping',
  'mainFrame',
  'subFrame',
]);

const getApiOrigin = (apiBaseUrl?: string): string | undefined => {
  if (!apiBaseUrl) return undefined;

  try {
    const url = new URL(apiBaseUrl);
    if (url.protocol !== 'https:' && url.protocol !== 'http:') {
      return undefined;
    }
    return url.origin;
  } catch {
    return undefined;
  }
};

const getRequestPhase = (
  method: string,
  expectedMethod: ShareRequestMethod,
): ShareRequestPhase | undefined => {
  const normalizedMethod = method.toUpperCase();
  if (normalizedMethod === 'OPTIONS') return 'preflight';
  if (normalizedMethod === expectedMethod) return 'actual';
  return undefined;
};

const getResourceType = (resourceType: string): string =>
  ALLOWED_RESOURCE_TYPES.has(resourceType) ? resourceType : 'unknown';

const normalizeContentType = (contentType: string | undefined): string => {
  if (!contentType) return 'unknown';

  const mimeType = contentType.split(';', 1)[0]?.trim().toLowerCase() ?? '';
  if (
    !mimeType ||
    mimeType.length > MAX_MIME_TYPE_LENGTH ||
    !MIME_TYPE_PATTERN.test(mimeType)
  ) {
    return 'unknown';
  }
  return mimeType;
};

const getResponseContentType = (headers?: Record<string, string[]>): string => {
  if (!headers) return 'unknown';

  const contentTypeEntry = Object.entries(headers).find(
    ([name]) => name.toLowerCase() === 'content-type',
  );
  return normalizeContentType(contentTypeEntry?.[1]?.[0]);
};

const getResponseKind = (
  contentType: string,
): 'html' | 'json' | 'other' | 'unknown' => {
  if (contentType === 'unknown') return 'unknown';
  if (contentType === 'application/json' || contentType.endsWith('+json')) {
    return 'json';
  }
  if (contentType === 'text/html' || contentType === 'application/xhtml+xml') {
    return 'html';
  }
  return 'other';
};

const getHttpStatusClass = (statusCode: number): string =>
  statusCode >= 100 && statusCode <= 599
    ? `${Math.floor(statusCode / 100)}xx`
    : 'unknown';

export const normalizeNetErrorCode = (error: string): string => {
  const match = NET_ERROR_PATTERN.exec(error.trim().toUpperCase());
  const errorCode = match?.[1];
  if (!errorCode || errorCode.length > MAX_NET_ERROR_CODE_LENGTH) {
    return 'ERR_OTHER';
  }
  return errorCode;
};

export const classifyNetErrorCode = (
  errorCode: string,
):
  | 'aborted'
  | 'blocked_or_denied'
  | 'connection'
  | 'dns'
  | 'other'
  | 'proxy'
  | 'timeout'
  | 'tls' => {
  if (errorCode.includes('BLOCKED') || errorCode.includes('ACCESS_DENIED')) {
    return 'blocked_or_denied';
  }
  if (errorCode.startsWith('ERR_CERT_') || errorCode.startsWith('ERR_SSL_')) {
    return 'tls';
  }
  if (
    errorCode.includes('DNS') ||
    errorCode === 'ERR_NAME_NOT_RESOLVED' ||
    errorCode === 'ERR_NAME_RESOLUTION_FAILED'
  ) {
    return 'dns';
  }
  if (
    errorCode.includes('PROXY') ||
    errorCode.includes('PROXIES') ||
    errorCode.includes('SOCKS') ||
    errorCode === 'ERR_TUNNEL_CONNECTION_FAILED'
  ) {
    return 'proxy';
  }
  if (errorCode.includes('TIMED_OUT')) return 'timeout';
  if (
    errorCode.startsWith('ERR_CONNECTION_') ||
    errorCode === 'ERR_ADDRESS_UNREACHABLE' ||
    errorCode === 'ERR_INTERNET_DISCONNECTED' ||
    errorCode === 'ERR_NETWORK_CHANGED'
  ) {
    return 'connection';
  }
  if (errorCode === 'ERR_ABORTED') return 'aborted';
  return 'other';
};

export const matchShareNetworkRoute = (
  requestUrl: string,
  apiOrigin: string,
): ShareNetworkRoute | undefined => {
  const route = findShareNetworkRoute(requestUrl, apiOrigin);
  if (!route) return undefined;

  const {
    pathPattern: _pathPattern,
    preflightOperation: _preflightOperation,
    ...metadata
  } = route;
  return metadata;
};

const findShareNetworkRoute = (
  requestUrl: string,
  apiOrigin: string,
): ShareNetworkRouteDefinition | undefined => {
  try {
    const url = new URL(requestUrl);
    if (url.origin !== apiOrigin) return undefined;

    return SHARE_NETWORK_ROUTES.find(({ pathPattern }) =>
      pathPattern.test(url.pathname),
    );
  } catch {
    return undefined;
  }
};

const getCommonContext = (
  details: ShareNetworkCompletedDetails | ShareNetworkErrorDetails,
  route: ShareNetworkRouteDefinition,
  requestPhase: ShareRequestPhase,
): Record<string, string | number | boolean> => {
  const hasAmbiguousPreflight =
    requestPhase === 'preflight' && route.preflightOperation;

  return {
    type: 'share_network_request',
    operation: hasAmbiguousPreflight
      ? route.preflightOperation
      : route.operation,
    routeTemplate: route.routeTemplate,
    routeVariant: route.routeVariant,
    expectedMethod: hasAmbiguousPreflight ? 'unknown' : route.expectedMethod,
    requestMethod:
      requestPhase === 'preflight' ? 'OPTIONS' : route.expectedMethod,
    requestPhase,
    resourceType: getResourceType(details.resourceType),
    networkRequestId: details.id,
    fromCache: details.fromCache,
  };
};

export const buildShareNetworkCompletedEvent = (
  details: ShareNetworkCompletedDetails,
  apiOrigin: string,
): ShareNetworkTelemetryEvent | undefined => {
  const route = findShareNetworkRoute(details.url, apiOrigin);
  if (!route) return undefined;

  const requestPhase = getRequestPhase(details.method, route.expectedMethod);
  if (!requestPhase) return undefined;

  const responseContentType = getResponseContentType(details.responseHeaders);
  return {
    level:
      details.statusCode >= 200 && details.statusCode < 400 ? 'info' : 'warn',
    message: '[ShareNetwork] Request completed',
    context: {
      ...getCommonContext(details, route, requestPhase),
      transportOutcome: 'completed',
      httpStatus: details.statusCode,
      httpStatusClass: getHttpStatusClass(details.statusCode),
      responseContentType,
      responseKind: getResponseKind(responseContentType),
    },
  };
};

export const buildShareNetworkRedirectEvent = (
  details: ShareNetworkCompletedDetails,
  apiOrigin: string,
): ShareNetworkTelemetryEvent | undefined => {
  const route = findShareNetworkRoute(details.url, apiOrigin);
  if (!route) return undefined;

  const requestPhase = getRequestPhase(details.method, route.expectedMethod);
  if (!requestPhase) return undefined;

  const responseContentType = getResponseContentType(details.responseHeaders);
  return {
    level: 'warn',
    message: '[ShareNetwork] Request redirected',
    context: {
      ...getCommonContext(details, route, requestPhase),
      transportOutcome: 'redirected',
      httpStatus: details.statusCode,
      httpStatusClass: getHttpStatusClass(details.statusCode),
      responseContentType,
      responseKind: getResponseKind(responseContentType),
    },
  };
};

export const buildShareNetworkErrorEvent = (
  details: ShareNetworkErrorDetails,
  apiOrigin: string,
): ShareNetworkTelemetryEvent | undefined => {
  const route = findShareNetworkRoute(details.url, apiOrigin);
  if (!route) return undefined;

  const requestPhase = getRequestPhase(details.method, route.expectedMethod);
  if (!requestPhase) return undefined;

  const netErrorCode = normalizeNetErrorCode(details.error);
  return {
    level: 'warn',
    message: '[ShareNetwork] Request failed before response',
    context: {
      ...getCommonContext(details, route, requestPhase),
      transportOutcome: 'network_error',
      netErrorCode,
      networkErrorClass: classifyNetErrorCode(netErrorCode),
    },
  };
};

export const registerShareNetworkTelemetry = (
  options: RegisterShareNetworkTelemetryOptions,
): boolean => {
  const apiOrigin = getApiOrigin(options.apiBaseUrl);
  if (!apiOrigin) return false;

  const filter: WebRequestFilter = {
    urls: [`${apiOrigin}/v1/*`],
  };
  const emitSafely = (event: ShareNetworkTelemetryEvent | undefined): void => {
    if (!event) return;
    try {
      options.onEvent(event);
    } catch {
      // Observability must never affect application network behavior.
    }
  };

  options.webRequest.onBeforeRedirect(filter, (details) => {
    emitSafely(buildShareNetworkRedirectEvent(details, apiOrigin));
  });
  options.webRequest.onCompleted(filter, (details) => {
    emitSafely(buildShareNetworkCompletedEvent(details, apiOrigin));
  });
  options.webRequest.onErrorOccurred(filter, (details) => {
    emitSafely(buildShareNetworkErrorEvent(details, apiOrigin));
  });
  return true;
};
