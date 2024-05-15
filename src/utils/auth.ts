import auth0 from './auth0';
import { isClient } from './runtime';

export async function getAuthHeader() {
  if (!isClient) return {};

  const token = await auth0.getTokenSilently();

  return (token ? { Authorization: token } : {}) as HeadersInit;
}
