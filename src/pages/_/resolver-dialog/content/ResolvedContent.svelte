<script lang="ts">
  export let thumbnail: string | undefined;
  export let caption: string;
  export let resolver: string;
</script>

<div class="container">
  <div class="thumbnail-frame">
    <img class="thumbnail" src={thumbnail} alt="" />
  </div>

  <div class="content">
    <p class="caption">{caption}</p>
    <button class="button">解決</button>
  </div>
</div>

<style scoped lang="scss">
  .container {
    box-sizing: border-box;
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(400px, 1fr));
    gap: 24px;
    justify-content: center;
    padding: 24px;
    margin-bottom: 24px;
    border-bottom: 1px solid $outline-variant;

    &:last-child {
      border-bottom: none;
    }
  }

  .resolver {
    font-size: 12px;
    color: #666;
  }

  .thumbnail-frame {
    display: flex;
    flex-grow: 1;
    align-items: center;
    justify-content: center;
    margin-bottom: 16px;
  }

  .thumbnail {
    max-width: 400px;
    border-radius: 8px;
  }

  .content {
    display: flex;
    flex-direction: column;
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
