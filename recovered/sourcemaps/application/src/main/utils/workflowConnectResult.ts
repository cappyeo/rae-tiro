/**
 * 연동(workflow) OAuth 복귀 결과를 renderer 가 가져갈 때까지 보관한다.
 *
 * 딥링크 복귀는 창을 다시 로드하거나 콜드 스타트 중일 수 있어, 결과를 이벤트로만
 * 보내면 renderer 리스너가 붙기 전에 사라진다. credential-attach 처럼 main 이 결과를
 * 보관하고, renderer 가 마운트되거나 알림을 받을 때 가져간다(claim).
 * 여러 연동 콜백이 renderer 준비 전에 겹칠 수 있어(예: Teams + Salesforce) 큐로 둔다.
 */
export type WorkflowConnectResult = {
  type: 'complete' | 'failed';
  detail: {
    provider: string;
    errorCode?: string;
    salesforceOAuthReason?: string | null;
  };
};

let pendingResults: WorkflowConnectResult[] = [];
// 로그아웃(세션 정리)마다 올라간다. 콜백 처리 시작 시점의 값과 다르면 그 결과는
// 이전 세션 것이므로 보관하지 않는다(finalize 대기 중 로그아웃 등).
let sessionEpoch = 0;

// provider(slug)별 OAuth 를 시작한 세션. 콜백 처리 시점이 아니라 시작 시점으로 묶어야
// 로그아웃 뒤 도착한 콜백(Salesforce 는 auth intent 를 쓰지 않음)을 걸러낸다.
const authorizeEpochs = new Map<string, number>();

export const markWorkflowAuthorizeEpoch = (provider: string): void => {
  authorizeEpochs.set(provider, sessionEpoch);
};

/** 앱 재시작 등으로 시작 기록이 없으면 현재 세션으로 본다. */
export const getWorkflowAuthorizeEpoch = (provider: string): number =>
  authorizeEpochs.get(provider) ?? sessionEpoch;

export const retainWorkflowConnectResult = (
  result: WorkflowConnectResult,
  startedEpoch: number = sessionEpoch,
): void => {
  if (startedEpoch !== sessionEpoch) return;
  pendingResults.push(result);
};

/** 보관된 결과를 도착 순서대로 모두 가져가고 비운다. */
export const claimWorkflowConnectResults = (): WorkflowConnectResult[] => {
  const results = pendingResults;
  pendingResults = [];
  return results;
};

/** 로그아웃·세션 정리 시 이전 사용자의 결과가 다음 사용자에게 넘어가지 않게 비운다. */
export const discardWorkflowConnectResults = (): void => {
  pendingResults = [];
  sessionEpoch += 1;
};
