export type AuthSessionCleanupDeps = {
  removeAuthToken: () => void;
  clearObservabilityUser: () => void;
  clearAuthIntent: () => void;
  discardCredentialAttachResult: () => void;
  discardWorkflowConnectResults: () => void;
  discardGoogleDrivePicker: () => void;
  discardHeldUrl: () => void;
  removeRequestInterceptor: () => void;
};

export type AuthSessionCleanupFailure = {
  step: keyof AuthSessionCleanupDeps;
  error: unknown;
};

export const getBlockingAuthSessionCleanupFailure = (
  failures: AuthSessionCleanupFailure[],
): AuthSessionCleanupFailure | undefined =>
  failures.find(
    ({ step }) =>
      step === 'removeAuthToken' || step === 'removeRequestInterceptor',
  );

export const clearAuthSessionState = (
  deps: AuthSessionCleanupDeps,
): AuthSessionCleanupFailure[] => {
  const failures: AuthSessionCleanupFailure[] = [];
  const steps = Object.entries(deps) as [
    keyof AuthSessionCleanupDeps,
    () => void,
  ][];
  steps.forEach(([step, cleanup]) => {
    try {
      cleanup();
    } catch (error) {
      failures.push({ step, error });
    }
  });
  return failures;
};
