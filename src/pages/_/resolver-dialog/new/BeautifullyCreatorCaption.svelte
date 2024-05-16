<script lang="ts">
  import { newBeautifullyCaption } from './state';
</script>

<textarea
  class="text-field"
  placeholder="キャプションを入力"
  bind:value={$newBeautifullyCaption}
></textarea>

<style scoped lang="scss">
  .text-field {
    box-sizing: border-box;
    flex-grow: 1;
    width: 100%;
    height: 100%;
    padding: 0;
    margin-bottom: 32px;
    font: inherit;
    font-size: 14px;
    resize: none;
    border: none;
    outline: none;

    @include pc {
      padding: 24px;
    }
  }
</style>
