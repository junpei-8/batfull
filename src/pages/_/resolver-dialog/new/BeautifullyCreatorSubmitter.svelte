<script lang="ts">
  import { getAuthHeader } from '@/utils/auth';
  import { newBeautifullyCaption, newBeautifullyThumbnail } from './state';
  import type { PostRequest } from '@/pages/api/bads/[badId]/beautifully/json';
  import {
    isOpenBeautifyCreatorDialog,
    resolverReFetcher,
    resolverTargetBadId,
  } from '../state';

  $: isValid = !!$newBeautifullyCaption;

  let posting = false;
  async function post() {
    if (!isValid) return;

    posting = true;

    const response = await fetch(
      `/api/bads/${resolverTargetBadId.get()}/beautifully/json`,
      {
        method: 'POST',
        headers: await getAuthHeader(),
        body: JSON.stringify({
          thumbnail: $newBeautifullyThumbnail || void 0,
          caption: $newBeautifullyCaption,
        } satisfies PostRequest),
      },
    );

    posting = false;

    if (!response.ok) {
      alert('投稿に失敗しました。');
    }

    $isOpenBeautifyCreatorDialog = false;
    resolverReFetcher.value?.();
  }
</script>

<button class="button" on:click={post} disabled={!isValid || posting}>
  君、Beautiful を受け入れたまえよ ⭐️
</button>

<style scoped lang="scss">
  .button {
    position: sticky;
    bottom: 0;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    width: 100%;
    padding: 12px;
    margin-top: auto;
    font-weight: bold;
    color: $on-primary;
    color: #222;
    background-color: rgba(#ffde03, 0.8);
    border-radius: 8px;

    &:hover {
      background-color: rgba(#ffde03, 0.9);
    }

    &:active {
      background-color: rgba(#ffde03, 1);
    }

    &:disabled {
      color: white;
      background-color: gray;
    }
  }
</style>
