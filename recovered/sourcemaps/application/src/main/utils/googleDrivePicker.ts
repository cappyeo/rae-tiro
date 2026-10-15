import { randomBytes } from 'node:crypto';

/**
 * Google Drive 폴더 선택(Picker)을 시스템 브라우저에서 띄우고 딥링크로 결과를 받는다.
 *
 * 패키징된 renderer 는 `file://`(origin `null`)이라 Google Picker 를 띄울 수 없다.
 * 그래서 web 의 `/google-drive/pick` 페이지가 Picker 를 띄우고
 * `<scheme>://google-drive/picked` 로 결과를 돌려준다.
 *
 * - clientNonce: 이 앱이 연 요청의 복귀만 받는다. 선택 창을 여러 번 열어도 어느 창에서
 *   고르든 받도록 만료 전 nonce 를 모두 대기시키고, 하나가 돌아오면 전부 버린다(재생 방지).
 * - 결과는 main 이 보관하고 renderer 가 가져간다(claim). 창 재로드·콜드 스타트 중에도
 *   남아 있어야 하기 때문이다(workflowConnectResult 와 같은 이유).
 */
export const GOOGLE_DRIVE_PICKER_TTL_MS = 10 * 60 * 1000;
export const GOOGLE_DRIVE_PICKED_ROUTE = 'google-drive/picked';

export type GoogleDrivePickerResult =
  | { status: 'picked'; folderId: string; folderName: string }
  | { status: 'cancelled' }
  | { status: 'failed' };

// Drive 파일 ID 는 URL-safe base64 문자만 쓴다.
const FOLDER_ID = /^[A-Za-z0-9_-]{1,128}$/;
const MAX_FOLDER_NAME_LENGTH = 255;
const MAX_TICKET_LENGTH = 2048;

// nonce → 만료 시각
const pending = new Map<string, number>();
let retained: { result: GoogleDrivePickerResult; expiresAt: number } | null =
  null;

export const isValidPickerTicket = (ticket: unknown): ticket is string =>
  typeof ticket === 'string' &&
  ticket.length > 0 &&
  ticket.length <= MAX_TICKET_LENGTH;

/** 새 요청을 시작한다. 아직 안 가져간 이전 결과는 버린다. */
export const beginGoogleDrivePick = (now: number = Date.now()): string => {
  const nonce = randomBytes(32).toString('base64url');
  for (const [key, expiresAt] of pending) {
    if (now > expiresAt) pending.delete(key);
  }
  pending.set(nonce, now + GOOGLE_DRIVE_PICKER_TTL_MS);
  retained = null;
  return nonce;
};

export const buildGoogleDrivePickerUrl = ({
  webBaseUrl,
  ticket,
  clientNonce,
  deepLinkProtocol,
}: {
  webBaseUrl: string;
  ticket: string;
  clientNonce: string;
  deepLinkProtocol: string;
}): string => {
  // fragment 는 서버로 가지 않아 접근 로그·Referer 에 ticket 이 남지 않는다.
  const url = new URL('/google-drive/pick', webBaseUrl);
  url.hash = new URLSearchParams({
    ticket,
    clientNonce,
    next: `${deepLinkProtocol}://${GOOGLE_DRIVE_PICKED_ROUTE}`,
  }).toString();
  return url.toString();
};

const parsePickedResult = (
  params: URLSearchParams,
): GoogleDrivePickerResult | null => {
  const error = params.get('error');
  if (error === 'cancelled') return { status: 'cancelled' };
  if (error !== null) return { status: 'failed' };

  const folderId = params.get('folderId') ?? '';
  const folderName = params.get('folderName')?.trim() ?? '';
  if (!FOLDER_ID.test(folderId) || !folderName) return null;
  return {
    status: 'picked',
    folderId,
    folderName: folderName.slice(0, MAX_FOLDER_NAME_LENGTH),
  };
};

/**
 * `google-drive/picked` 딥링크를 검증하고 결과를 보관한다.
 * 맞는 nonce 는 (payload 가 잘못돼도) 소모하고 — 재생 방지 — 결과를 받으면 대기 nonce 를 모두 버린다.
 */
export const acceptGoogleDrivePickedDeepLink = (
  params: URLSearchParams,
  now: number = Date.now(),
): { accepted: boolean; reason?: string } => {
  const clientNonce = params.get('clientNonce');
  const expiresAt = clientNonce ? pending.get(clientNonce) : undefined;
  if (!clientNonce || expiresAt === undefined) {
    return { accepted: false, reason: 'nonce_mismatch' };
  }
  // 만료·잘못된 복귀는 그 nonce 만 버린다. 다른 창의 유효한 요청은 남긴다.
  pending.delete(clientNonce);
  if (now > expiresAt) return { accepted: false, reason: 'expired' };

  const result = parsePickedResult(params);
  if (!result) return { accepted: false, reason: 'invalid_payload' };
  pending.clear();
  retained = { result, expiresAt: now + GOOGLE_DRIVE_PICKER_TTL_MS };
  return { accepted: true };
};

/** 보관된 결과를 한 번만 가져간다. 오래된 결과는 버린다. */
export const claimGoogleDrivePickerResult = (
  now: number = Date.now(),
): GoogleDrivePickerResult | null => {
  const current = retained;
  retained = null;
  if (!current || now > current.expiresAt) return null;
  return current.result;
};

/** 로그아웃 시 대기 중인 요청과 결과를 버려 다음 사용자에게 넘어가지 않게 한다. */
export const discardGoogleDrivePicker = (): void => {
  pending.clear();
  retained = null;
};
