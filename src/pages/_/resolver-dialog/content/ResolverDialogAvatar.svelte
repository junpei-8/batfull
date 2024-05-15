<script lang="ts">
  import { userCoreQuery, loginUser } from '@/stores/user';

  $: userThumbnail = $userCoreQuery.data?.picture;

  function login() {
    if (userThumbnail) return;
    return loginUser();
  }
</script>

<button class="avatar" on:click={login}>
  <img
    src={userThumbnail ||
      'https://avatars.githubusercontent.com/u/47259774?v=4'}
    alt="avatar"
  />
</button>

<style scoped lang="scss">
  .avatar {
    width: 64px;
    height: 64px;
    overflow: hidden;
    border-radius: 50%;
  }
</style>
