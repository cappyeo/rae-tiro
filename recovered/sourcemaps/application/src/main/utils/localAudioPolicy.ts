export type SecurityPolicySnapshot = {
  deleteLocalAudioAfterProcessing: boolean;
};

type PolicyStore = {
  get(key: 'security_policy'): SecurityPolicySnapshot | undefined;
  set(key: 'security_policy', value: SecurityPolicySnapshot): void;
  delete(key: 'security_policy'): void;
};

/**
 * 서버 org 정책의 main-side 캐시.
 *
 * 마지막으로 성공 수신한 값을 유지한다 — 결측·네트워크 오류로 값을 못 받아도 이전 상태로
 * 동작하고, 캐시가 없으면 false (삭제·차단하지 않음. 오판 삭제는 비가역).
 */
export const isLocalAudioDeletionEnforced = (store: PolicyStore) =>
  store.get('security_policy')?.deleteLocalAudioAfterProcessing === true;

/**
 * renderer 가 보낸 정책을 캐시에 반영하고, 값이 실제로 바뀌었는지 알려준다
 * (호출부가 전환 시점에만 감사 로그를 남기기 위해).
 */
export const applySecurityPolicyUpdate = (
  store: PolicyStore,
  policy: { deleteLocalAudioAfterProcessing?: unknown } | null | undefined,
): { applied: boolean; previous: boolean; next: boolean } => {
  const previous = isLocalAudioDeletionEnforced(store);
  const next = policy?.deleteLocalAudioAfterProcessing;
  if (typeof next !== 'boolean') {
    return { applied: false, previous, next: previous };
  }
  store.set('security_policy', { deleteLocalAudioAfterProcessing: next });
  return { applied: true, previous, next };
};

/**
 * 로그아웃·계정 전환 시 캐시를 버린다.
 *
 * "결측이면 마지막 값 유지" 는 네트워크 결측을 위한 규칙이지, 다른 사용자에게까지 물려줄
 * 규칙이 아니다. 남기면 다음 로그인 유저가 이전 org 정책으로 녹음을 차단당한다.
 */
export const clearSecurityPolicy = (store: PolicyStore): void => {
  store.delete('security_policy');
};

/**
 * 정책 org 는 deleteAfterUpload 를 강제한다. 저장된 유저 설정은 건드리지 않고 읽기에서만
 * 합성해, 정책이 꺼지면 유저 원래 설정으로 자동 원복되게 한다.
 */
export const composeDeleteAfterUpload = <
  T extends { deleteAfterUpload: boolean },
>(
  settings: T,
  enforced: boolean,
): T => (enforced ? { ...settings, deleteAfterUpload: true } : settings);
