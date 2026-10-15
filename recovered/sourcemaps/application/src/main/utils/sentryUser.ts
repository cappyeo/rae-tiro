import * as Sentry from '@sentry/electron/main';

export const setSentryUser = (userGuid: string | null): void => {
  const user = userGuid ? { id: userGuid } : null;
  Sentry.setUser(user);
  Sentry.getCurrentScope().setUser(user);
};
