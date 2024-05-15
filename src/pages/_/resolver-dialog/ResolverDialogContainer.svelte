<script lang="ts">
  import { isOpenResolverDialog } from './state';

  import Dialog from '@/components/Dialog.svelte';
</script>

<Dialog
  isOpen={$isOpenResolverDialog}
  on:close={() => ($isOpenResolverDialog = false)}
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
    height: 80%;
    padding: 24px;
    margin-top: auto;
    overflow-y: auto;
    background-color: white;
    border-top-left-radius: 32px;
    border-top-right-radius: 32px;
    transition: transition(transform, medium2, ease);
    transform: translateY(100%);
    scrollbar-width: none;
    -webkit-scrollbar {
      display: none;
    }

    :global(.open) & {
      transform: translateY(0);
    }
  }
</style>
