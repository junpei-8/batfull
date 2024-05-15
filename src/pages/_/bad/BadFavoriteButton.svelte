<script lang="ts">
  let active = false;
</script>

<button
  on:click={() => (active = !active)}
  class="button{active ? ' active' : ''}"
>
  <svg
    xmlns="http://www.w3.org/2000/svg"
    enable-background="new 0 0 24 24"
    viewBox="0 0 24 24"
    fill="currentColor"
    class="icon"
  >
    <path
      d="M8.4009,19.0845l3.0693,1.9185c0.1621,0.1011,0.3457,0.1519,0.5298,0.1519s0.3677-0.0508,0.5298-0.1519l3.0698-1.9185
		c3.4888-2.1812,5.7822-5.7734,6.2925-9.8555c0.2139-1.709-0.3623-3.3877-1.5801-4.606c-1.8018-1.8018-4.5854-2.144-6.769-0.833
		L12,4.7153L10.4575,3.79c-2.1855-1.3105-4.9683-0.9688-6.77,0.833C2.4702,5.8413,1.894,7.52,2.1079,9.229
		C2.6182,13.311,4.9116,16.9033,8.4009,19.0845z M5.1021,6.0371C5.7861,5.3535,6.6909,4.999,7.606,4.999
		c0.6255,0,1.2559,0.166,1.8228,0.5059l2.0571,1.2339c0.3164,0.1904,0.7119,0.1904,1.0283,0l2.0576-1.2339
		c1.396-0.8379,3.1743-0.6187,4.3257,0.5322c0.7788,0.7788,1.1465,1.8516,1.0103,2.9438c-0.4355,3.4824-2.3921,6.5469-5.3682,8.4072
		L12,18.9756l-2.5391-1.5874c-2.9766-1.8604-4.9331-4.9248-5.3687-8.4072C3.9561,7.8887,4.3237,6.8159,5.1021,6.0371z"
    ></path>
  </svg>
</button>

<style scoped lang="scss">
  .button {
    box-sizing: border-box;
    display: flex;
    padding: 4px;
    border-radius: 50%;
    transition: transition(background-color, short4, emphasized);

    &:hover {
      background-color: rgba(0, 0, 0, 0.06);
    }
    &:active {
      background-color: rgba(0, 0, 0, 0.12);
    }
  }

  .icon {
    width: 24px;
    height: 24px;

    .active & {
      fill: $primary;
    }
  }
</style>
