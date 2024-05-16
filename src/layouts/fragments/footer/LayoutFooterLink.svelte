<script lang="ts">
  import { loginUser, userQuery } from '@/stores/user';
  import { onMount } from 'svelte';
  import type { SvelteHTMLElements } from 'svelte/elements';

  type $$Props = SvelteHTMLElements['a'] & {
    href?: string;
    requiredLogin?: boolean;
  };

  let href = $$props.href;

  let isActive = false;

  $: isDisabled = $$props.requiredLogin && !$userQuery.data;

  function onClick(event: Event) {
    if (isDisabled) {
      event.preventDefault();
      return loginUser();
    }
  }

  onMount(() => {
    function checkActive() {
      isActive = window.location.pathname === href;
    }

    checkActive();
    document.addEventListener('swup:page:view', checkActive);
    return () => document.removeEventListener('swup:page:view', checkActive);
  });
</script>

<!-- svelte-ignore a11y-missing-attribute -->
<!-- svelte-ignore a11y-no-static-element-interactions -->
<a
  {...$$props}
  class={`link ${$$props.class ? $$props.class : ''}${isActive ? ' active' : ''}${isDisabled ? ' disabled' : ''}`}
  on:click={onClick}
>
  <slot />
</a>

<style scoped lang="scss">
  .link {
    display: flex;
    flex-grow: 1;
    align-items: center;
    justify-content: center;
    text-align: center;
    transition: transition((color, background), medium1, ease);

    &.active {
      color: $primary;
    }

    &:hover {
      background-color: rgba(black, 0.04);
      &.active {
        background-color: rgba($primary, 0.04);
      }
    }

    &:active {
      background-color: rgba(black, 0.08);
      &.active {
        background-color: rgba($primary, 0.08);
      }
    }

    &.disabled {
      color: white;
      background-color: rgba(black, 0.08);
      &:hover {
        background-color: rgba(black, 0.1);
      }
      &:active {
        background-color: rgba(black, 0.12);
      }
    }
  }
</style>
