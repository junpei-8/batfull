import type { IdToken } from '@auth0/auth0-spa-js';

export type AuthRequiredTokenBody = { sub: string };
export type AuthIdTokenBody = AuthRequiredTokenBody & IdToken;

function base64UrlDecode(str: string) {
  // Base64Url の - と _ を + と / に置き換え、Base64 に変換します
  let base64 = str.replace(/-/g, '+').replace(/_/g, '/');

  // パディングを追加します（必要な場合）
  while (base64.length % 4) {
    base64 += '=';
  }

  // Base64 デコードして文字列を返します
  return decodeURIComponent(
    atob(base64)
      .split('')
      .map(function (c) {
        return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
      })
      .join(''),
  );
}

function decodeJWT(token: string) {
  // JWT を分割してペイロード部分を取得します
  const parts = token.split('.');
  if (parts.length !== 3) {
    throw new Error('Invalid JWT token');
  }

  const payload = parts[1];
  const decodedPayload = base64UrlDecode(payload);

  // JSON オブジェクトに変換して返します
  return JSON.parse(decodedPayload);
}

export async function getAuth(token: string) {
  // return (verify ||= await gettingVerifyAuth0)(token) as AuthIdTokenBody;
  // return jwt.verify(token, await pem) as AuthIdTokenBody;
  return decodeJWT(token);
}

export function getApiAuth(event: {
  headers: { get: (key: string) => string | null };
}) {
  const authHeader = event.headers.get('Authorization');

  if (!authHeader) throw new Error('Authentication is required');

  return getAuth(authHeader);
}
