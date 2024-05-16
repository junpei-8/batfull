<script lang="ts">
  import Dialog from '@/components/Dialog.svelte';
  import { isOpenBeautifyCreatorDialog } from '../state';
</script>

<Dialog
  openClass="nest-open"
  isOpen={$isOpenBeautifyCreatorDialog}
  on:close={() => ($isOpenBeautifyCreatorDialog = false)}
>
  <!-- svelte-ignore a11y-click-events-have-key-events -->
  <!-- svelte-ignore a11y-no-static-element-interactions -->
  <div class="container" on:click|stopPropagation>
    <slot />
  </div>
</Dialog>

<style scoped lang="scss">
  .container {
    box-sizing: border-box;
    display: flex;
    flex-direction: column;
    width: 100%;
    height: 88%;
    padding: 24px;
    margin-top: auto;
    overflow-y: auto;
    background-color: white;
    border-top-left-radius: 32px;
    border-top-right-radius: 32px;
    transition: transition(transform, medium2, ease);
    transform: translateY(100%);
    scrollbar-width: none;
    ::-webkit-scrollbar {
      display: none;
    }

    :global(.nest-open) & {
      transform: translateY(0);
    }
  }
</style>
