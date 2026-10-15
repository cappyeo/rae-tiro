const COMPLETED_LOGIN_ATTEMPTS_KEY = 'completed_login_attempt_ids';
const MAX_REMEMBERED_ATTEMPTS = 10;

export type LoginAttemptHistoryStore = {
  get: (key: string) => unknown;
  set: (key: string, value: string[]) => void;
};

const readCompletedAttemptIds = (store: LoginAttemptHistoryStore): string[] => {
  const value = store.get(COMPLETED_LOGIN_ATTEMPTS_KEY);
  if (!Array.isArray(value)) return [];
  return value.filter((id): id is string => typeof id === 'string');
};

/**
 * 성공한 로그인 콜백이 다시 배달되는 일은 흔하다(릴레이 페이지 새로고침, "앱에서 열기"
 * 재클릭, 재시작된 앱으로 오는 지연 콜백). 그 거부는 아무도 막지 않으므로 모니터가
 * 진짜 실패와 구분할 수 있게 완료된 attempt id 를 프로세스 밖에 남긴다. 토큰 보유
 * 여부는 신호로 쓰지 않는다: 토큰이 남은 채 로그인 화면으로 밀려난 사용자의 실패까지
 * 무해로 분류된다.
 */
export const rememberCompletedLoginAttempt = (
  store: LoginAttemptHistoryStore,
  attemptId: string | undefined,
): void => {
  if (!attemptId) return;
  const ids = readCompletedAttemptIds(store).filter((id) => id !== attemptId);
  ids.push(attemptId);
  store.set(COMPLETED_LOGIN_ATTEMPTS_KEY, ids.slice(-MAX_REMEMBERED_ATTEMPTS));
};

export const wasLoginAttemptCompleted = (
  store: LoginAttemptHistoryStore,
  attemptId: string | undefined,
): boolean => {
  if (!attemptId) return false;
  return readCompletedAttemptIds(store).includes(attemptId);
};
