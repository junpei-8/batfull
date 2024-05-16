<script lang="ts">
  import { newBadCaption } from './state';
</script>

<textarea
  class="text-field"
  placeholder="キャプションを入力"
  bind:value={$newBadCaption}
></textarea>

<style scoped lang="scss">
  .text-field {
    flex-grow: 1;
    width: 100%;
    margin-bottom: 32px;
    font: inherit;
    font-size: 14px;
    resize: none;
    border: none;
    outline: none;
  }
</style>
