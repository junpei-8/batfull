<script lang="ts">
  import type { SvelteHTMLElements } from 'svelte/elements';
  import { createEventDispatcher } from 'svelte';

  type $$Props = SvelteHTMLElements['div'] & {
    isOpen?: boolean;
  };

  const dispatch = createEventDispatcher<{ close: void }>();

  let isOpen = $$props.isOpen;
  let isOpenAnimation = false;

  $: {
    if ($$props.isOpen === true) {
      isOpen = true;
      setTimeout(() => (isOpenAnimation = true));
    } else {
      isOpenAnimation = false;
    }
  }

  function close() {
    if ($$props.isOpen === false) {
      isOpen = false;
    }
  }
</script>

{#if isOpen}
  <!-- svelte-ignore a11y_click_events_have_key_events -->
  <!-- svelte-ignore a11y_no_static_element_interactions -->
  <div
    {...$$props}
    class="drawer{isOpenAnimation ? ' open' : ''}"
    on:click={() => dispatch('close')}
    on:transitionend={close}
  >
    <slot />
  </div>
{/if}

<style scoped lang="scss">
  .drawer {
    position: fixed;
    top: 0;
    left: 0;
    z-index: 16;
    box-sizing: border-box;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    width: 100%;
    height: 100%;
    pointer-events: none;
    background-color: rgba(0, 0, 0, 0.64);
    opacity: 0;
    transition: transition(opacity, medium1, ease);

    &.open {
      pointer-events: auto;
      opacity: 1;
    }
  }
</style>
