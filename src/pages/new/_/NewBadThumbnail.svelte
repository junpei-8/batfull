<script lang="ts">
  import { getFileEvent } from '@/utils/file';
  import { newBadThumbnail } from './state';

  let selectedFile: File | null = null;
  $: selectedFileUrl = selectedFile ? URL.createObjectURL(selectedFile) : '';

  async function selectFile() {
    const event = await getFileEvent({ accept: 'image/*' });
    const input = event.target as HTMLInputElement;
    const file = input.files?.[0];
    selectedFile = file || null;

    // photo-1.jpg 〜 photo-3.jpg までの差し替え画像を使用
    newBadThumbnail.set(`/demo/photo-${Math.floor(Math.random() * 3) + 1}.jpg`);
  }
</script>

<button class="frame" on:click={selectFile}>
  {#if selectedFile}
    <img src={selectedFileUrl} alt="" />
  {:else}
    <span>
      画像を選択してください
      <br />
      ＊デモ版なので画像はアップロードされず、差し替え画像が使用されます orz.
    </span>
  {/if}
</button>

<style scoped lang="scss">
  .frame {
    box-sizing: border-box;
    width: 100%;
    max-width: 320px;
    aspect-ratio: 1;
    padding: 16px;
    margin: 0 auto;
    margin-bottom: 24px;
    border: 2px solid $outline-variant;
    border-radius: 32px;
  }
</style>
