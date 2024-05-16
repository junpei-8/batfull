import type {
  PopupConfigOptions,
  PopupLoginOptions,
} from '@auth0/auth0-spa-js';
import type { GetResponse, PostRequest } from '@/pages/api/users/json';
import { getAuthHeader } from '@/utils/auth';
import auth0 from '@/utils/auth0';
import { createFetcherStore } from './nanostore';

export const userCoreQuery = createFetcherStore(`/user-core`, {
  fetcher: () => auth0.getTokenSilently().then(() => auth0.getUser()),
});

export const userQuery = createFetcherStore(`/user`, {
  fetcher: () =>
    getAuthHeader()
      .then((headers) => fetch('/api/users/json', { headers }))
      .then((res) => res.json()) as Promise<GetResponse>,
});

export async function loginUser(
  // body: UsersPostRequestBody = {},
  options?: PopupLoginOptions,
  config?: PopupConfigOptions,
) {
  try {
    // ポップアップと共にログインする
    await auth0.loginWithPopup(options, config);

    const [authHeader, userCore] = await Promise.all([
      getAuthHeader(),
      auth0.getUser(),
    ]);

    if (!authHeader || !userCore) {
      throw new Error('正常に Auth0 からユーザー情報を取得できませんでした。');
    }

    userCoreQuery.setKey('data', userCore);

    const user: GetResponse = await fetch('/api/users/json', {
      method: 'POST',
      headers: authHeader,
      body: JSON.stringify({
        id: userCore.sub!,
        name: userCore.nickname || userCore.name || 'unknown',
        picture: userCore.picture,
      } satisfies PostRequest),
    }).then((res) => res.json());

    userQuery.setKey('data', user);

    return user;

    // ↓ ログイン処理でエラーが発生した時の処理
  } catch (error) {
    console.error('ログインに失敗しました。', error);
    throw error;

    // ↓ ログイン処理が終了した時の処理
  } finally {
    userQuery.setKey('loading', false);
  }
}
