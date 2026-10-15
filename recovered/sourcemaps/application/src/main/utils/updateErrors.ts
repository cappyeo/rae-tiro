const NO_UPDATE_AVAILABLE_MESSAGE =
  "No update available, can't quit and install";

const getErrorMessage = (error: unknown): string => {
  if (error instanceof Error) return error.message;
  return typeof error === 'string' ? error : '';
};

/**
 * Electron/Squirrel emits this when quitAndInstall is called without an
 * update staged in the current process. This is a recoverable updater state:
 * the normal check/download loop can stage the update again.
 */
export const isNoUpdateAvailableError = (error: unknown): boolean =>
  getErrorMessage(error).includes(NO_UPDATE_AVAILABLE_MESSAGE);

export const isNoUpdateAvailableMessage = (message: unknown): boolean =>
  typeof message === 'string' && message.includes(NO_UPDATE_AVAILABLE_MESSAGE);
