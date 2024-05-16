<script lang="ts">
  import { getAuthHeader } from '@/utils/auth';
  import { newBadCaption, newBadSpot, newBadThumbnail } from './state';
  import type { PostRequest } from '@/pages/api/bads/json';
  import { createHistoryRecord } from 'swup';

  $: isValid = !!$newBadCaption;

  let posting = false;
  async function post() {
    if (!isValid) return;

    posting = true;

    try {
      await fetch('/api/bads/json', {
        method: 'POST',
        headers: await getAuthHeader(),
        body: JSON.stringify({
          thumbnail: $newBadThumbnail,
          caption: $newBadCaption,
          spot: $newBadSpot,
        } satisfies PostRequest),
      });

      createHistoryRecord('/');

      // ↓ エラーが発生した場合はアラートを表示する
    } catch {
      alert('投稿に失敗しました。');

      // 処理が終わったら投稿中フラグを解除
    } finally {
      posting = false;
    }
  }
</script>

<button class="button" on:click={post} disabled={!isValid || posting}>
  BAD を投下する 💣
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
    margin: 24px;
    margin-top: auto;
    font-weight: bold;
    color: $on-primary;
    background-color: rgba($primary, 0.8);
    border-radius: 8px;

    &:hover {
      background-color: rgba($primary, 0.9);
    }

    &:active {
      background-color: rgba($primary, 1);
    }

    &:disabled {
      background-color: gray;
    }
  }
</style>
