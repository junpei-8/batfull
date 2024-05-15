import type { IdToken } from '@auth0/auth0-spa-js';
import { createVerifier } from 'fast-jwt';

export type AuthRequiredTokenBody = { sub: string };
export type AuthIdTokenBody = AuthRequiredTokenBody & IdToken;

let verify: ((token: string | Buffer) => any) | null = null;

const gettingVerifyAuth0 = fetch(
  `https://${import.meta.env.WEB_AUTH_DOMAIN}/pem`,
)
  .then((response) => response.text())
  .then((pem) => createVerifier({ key: pem }));

export async function getAuth(token: string) {
  return (verify ||= await gettingVerifyAuth0)(token) as AuthIdTokenBody;
}

export function getApiAuth(event: {
  headers: { get: (key: string) => string | null };
}) {
  const authHeader = event.headers.get('Authorization');

  if (!authHeader) throw new Error('Authentication is required');

  return getAuth(authHeader);
}
