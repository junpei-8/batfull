<script lang="ts">
  import { userCoreQuery, loginUser } from '@/stores/user';

  $: userCore = $userCoreQuery.data;

  function login() {
    return loginUser();
  }
</script>

<button class="avatar" on:click={login}>
  <img
    src={userCore?.picture ||
      'https://avatars.githubusercontent.com/u/47259774?v=4'}
    alt="avatar"
  />
</button>

<style scoped lang="scss">
  .avatar {
    width: 40px;
    height: 40px;
    overflow: hidden;
    border-radius: 50%;
  }
</style>
