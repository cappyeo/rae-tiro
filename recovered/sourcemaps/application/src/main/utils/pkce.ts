import { createHash, randomBytes } from 'node:crypto';

type PkcePair = {
  codeChallenge: string;
  codeVerifier: string;
};

const PKCE_VERIFIER = /^[A-Za-z0-9._~-]{43,128}$/;

export const createPkceChallenge = (codeVerifier: string): string => {
  return createHash('sha256').update(codeVerifier).digest('base64url');
};

export const createPkcePair = (
  codeVerifier = randomBytes(32).toString('base64url'),
): PkcePair => {
  return {
    codeChallenge: createPkceChallenge(codeVerifier),
    codeVerifier,
  };
};

export const appendPkceParameters = (
  authUrl: string,
  codeChallenge: string,
): string => {
  const url = new URL(authUrl);
  url.searchParams.set('code_challenge', codeChallenge);
  url.searchParams.set('code_challenge_method', 'S256');
  return url.toString();
};

export const isPkceVerifier = (value: string): boolean => {
  return PKCE_VERIFIER.test(value);
};
