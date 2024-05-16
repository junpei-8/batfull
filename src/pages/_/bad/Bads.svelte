<script lang="ts">
  import { createFetcherStore } from '@/stores/nanostore';
  import BadFavoriteButton from './BadFavoriteButton.svelte';
  import BadResolverOpener from './BadResolverOpener.svelte';
  import type { GetResponse } from '@/pages/api/bads/json';
  import BadDeleteButton from './BadDeleteButton.svelte';
  import { userQuery } from '@/stores/user';

  const badsQuery = createFetcherStore('/api/bads.json', {
    fetcher: () =>
      fetch('/api/bads/json').then(
        (res) => res.json() as unknown as GetResponse,
      ),
    dedupeTime: 8000,
    revalidateInterval: 8000,
  });

  $: isLoading = $badsQuery.loading && !$badsQuery.data;

  $: console.log(userQuery.get().data);
</script>

{#if isLoading}
  <p class="not-post">Loading...</p>
{:else if $badsQuery.error}
  <p class="not-post">Error: {$badsQuery.error.message}</p>
{:else if !$badsQuery.data?.length}
  <p class="not-post">投稿がありません</p>
{:else if $badsQuery.data}
  {#each $badsQuery.data as bad}
    <section class="post">
      <header class="header">
        <img class="avatar" alt="" src={bad.badder.picture} />
        <span class="name">{bad.badder.name}</span>
        {#if bad.badder.id === $userQuery.data?.id}
          <BadDeleteButton badId={bad.id} />
        {/if}
      </header>

      {#if bad.thumbnail}
        <div class="thumbnail-frame">
          <img class="thumbnail" alt="" src={bad.thumbnail} />
        </div>
      {/if}

      <div class="caption">{bad.caption}</div>

      <nav class="nav">
        <BadFavoriteButton />
        <BadResolverOpener badId={bad.id} />
      </nav>

      <footer>
        <div class="spot">{bad.spot}</div>
      </footer>
    </section>
  {/each}
{/if}

<style scoped lang="scss">
  .not-post {
    margin-top: 24px;
    font-size: 16px;
    text-align: center;
  }

  .post {
    box-sizing: border-box;
    width: 100%;
    max-width: 600px;
    padding-top: 24px;
    padding-bottom: 24px;
    border-bottom: 2px solid $outline-variant;
  }

  .header {
    display: flex;
    gap: 8px;
    align-items: center;
    padding: 0 8px 4px;
    margin-bottom: 8px;
    font-size: 14px;
  }

  .avatar {
    width: 32px;
    border-radius: 50%;
  }

  .name {
    padding-bottom: 4px;
  }

  .thumbnail-frame {
    box-sizing: border-box;
    display: flex;
    justify-content: center;
    width: 100%;
    min-height: 200px; // あとで消す
    max-height: 400px;
    margin: 0 8px;
    margin-bottom: 12px;
    border: 1px solid $outline-variant;
  }

  .thumbnail {
    object-fit: contain;
  }

  .nav {
    box-sizing: border-box;
    display: flex;
    gap: 4px;
    padding: 0 2px;
  }

  .caption {
    padding-left: 8px;
    margin-bottom: 8px;
    font-size: 14px;
  }

  .spot {
    box-sizing: border-box;
    padding: 0 4px;
    margin-top: 4px;
    margin-left: 24px;
    font-size: 12px;
    font-weight: 500;
    color: $surface-variant;
    text-align: right;
  }
</style>
