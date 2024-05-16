<script lang="ts">
  import { createFetcherStore } from '@/stores/nanostore';
  import type { GetResponse } from '@/pages/api/bads/[badId]/beautifully/json';
  import { resolverReFetcher, resolverTargetBadId } from '../state';
  import { userQuery } from '@/stores/user';

  const beautifullyQueryEndpoint = `/api/bads/${resolverTargetBadId.get()}/beautifully/json`;
  const beautifullyQuery = createFetcherStore(beautifullyQueryEndpoint, {
    fetcher: () =>
      fetch(beautifullyQueryEndpoint).then(
        (res) => res.json() as Promise<GetResponse>,
      ),
    dedupeTime: 8000,
    revalidateInterval: 8000,
  });

  // NOTE: あんま良くないけど
  resolverReFetcher.value = beautifullyQuery.invalidate;
</script>

{#if $beautifullyQuery.loading && !$beautifullyQuery.data}
  <p class="not-content">Loading...</p>
{:else if $beautifullyQuery.error}
  <p class="not-content">Error: {$beautifullyQuery.error.message}</p>
{:else if !$beautifullyQuery.data?.length}
  <p class="not-content">投稿がありません</p>
{:else if $beautifullyQuery.data}
  {#each $beautifullyQuery.data as beautifully}
    <div class="contents">
      <section class="content">
        <div class="thumbnail-frame">
          <div class="beautifuller">
            <img
              class="beautifuller-avatar"
              alt=""
              src={beautifully.beautifuller.picture}
            />
            <span class="beautifuller-name">
              {beautifully.beautifuller.name}
            </span>
          </div>
          <img class="thumbnail" src={beautifully.thumbnail} alt="" />
        </div>

        <div class="text">
          <p class="caption">{beautifully.caption}</p>
          <button
            class="button"
            disabled={beautifully.beautifuller.id !== $userQuery.data?.id}
          >
            Beautiful
          </button>
        </div>
      </section>
    </div>
  {/each}
{/if}

<style scoped lang="scss">
  .not-content {
    margin-top: 24px;
    font-size: 16px;
    text-align: center;
  }

  .content {
    box-sizing: border-box;
    padding: 24px 0;
    border-bottom: 1px solid $outline-variant;

    @include pc {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(400px, 1fr));
      gap: 16px 24px;
      justify-content: center;
    }
  }

  .beautifuller {
    display: flex;
    gap: 16px;
    align-items: center;
    width: 100%;
    margin-bottom: 16px;
  }

  .beautifuller-avatar {
    width: 32px;
    border-radius: 50%;
  }

  .beautifuller-name {
    box-sizing: border-box;
    padding-bottom: 4px;
  }

  .thumbnail-frame {
    display: flex;
    flex-direction: column;
    flex-grow: 1;
    align-items: center;
    justify-content: center;
    margin-bottom: 16px;
  }

  .thumbnail {
    max-width: 400px;
    border-radius: 8px;
  }

  .text {
    display: flex;
    flex-direction: column;

    @include pc {
      margin-top: 40px;
    }
  }

  .caption {
    margin-bottom: 8px;
    font-size: 16px;
  }

  .button {
    padding: 8px 16px;
    margin-top: auto;
    margin-left: auto;
    color: white;
    background-color: rgba(#008dbd, 0.8);
    border-radius: 8px;

    &:hover {
      background-color: rgba(#008dbd, 0.9);
    }

    &:active {
      background-color: rgba(#008dbd, 1);
    }
  }
</style>
