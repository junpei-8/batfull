import type {
  PopupConfigOptions,
  PopupLoginOptions,
} from '@auth0/auth0-spa-js';
import { getAuthHeader } from '@/utils/auth';
import auth0 from '@/utils/auth0';
import { createFetcherStore } from './nanostore';

export const userCoreQuery = createFetcherStore(`/user`, {
  fetcher: () => getAuthHeader().then(() => auth0.getUser()),
});

export const userQuery = createFetcherStore(`/user`, {
  fetcher: async () => {
    console.log('ユーザーとってくるよ', await getAuthHeader());
  },
});

export async function loginUser(
  // body: UsersPostRequestBody = {},
  options?: PopupLoginOptions,
  config?: PopupConfigOptions,
) {
  try {
    // ポップアップと共にログインする
    await auth0.loginWithPopup(options, config);

    const [userCore] = await Promise.all([auth0.getUser()]);

    userCoreQuery.setKey('data', userCore);

    // ログインをする
    // const userResponse = await $fetch('/api/users', {
    //   method: 'POST',
    //   headers: getAuthHeader(),
    //   body: JSON.stringify(body),
    // });

    // const user = userResponse.value;

    // data.value = user;

    // return user;

    // ↓ ログイン処理でエラーが発生した時の処理
  } catch (error) {
    console.error('ログインに失敗しました。', error);
    throw error;

    // ↓ ログイン処理が終了した時の処理
  } finally {
    userQuery.setKey('loading', false);
  }
}
