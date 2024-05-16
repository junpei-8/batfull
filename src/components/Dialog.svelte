<script lang="ts">
  import type { SvelteHTMLElements } from 'svelte/elements';
  import { createEventDispatcher } from 'svelte';

  type $$Props = SvelteHTMLElements['div'] & {
    isOpen?: boolean;
    openClass?: string;
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
  <div
    {...$$props}
    class="drawer{isOpenAnimation ? ` open ${$$props.openClass}` : ''}"
  >
    <button
      class="overlay"
      on:click={() => dispatch('close')}
      on:transitionend={close}
      style={isOpenAnimation ? 'opacity: 1' : ''}
      aria-label="Close Dialog"
    ></button>
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

    &.open {
      pointer-events: auto;
    }
  }

  .overlay {
    position: absolute;
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, 0.64);
    opacity: 0;
    transition: transition(opacity, medium1, ease);
  }
</style>
