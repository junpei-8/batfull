import { Auth0Client } from '@auth0/auth0-spa-js';
import { isClient } from './runtime';

export default new Auth0Client({
  domain: import.meta.env.WEB_AUTH_DOMAIN,
  clientId: import.meta.env.WEB_AUTH_CLIENT_ID,
  authorizationParams: {
    redirect_uri: isClient ? location.origin : undefined,
    audience: import.meta.env.WEB_AUTH_AUDIENCE,
  },
});
