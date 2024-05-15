<script lang="ts">
  import { newBat } from './state';

  let gettingLocation = false;

  function getLocation() {
    navigator.geolocation
      ? navigator.geolocation.getCurrentPosition(showPosition, showError)
      : alert('このブラウザは位置情報APIをサポートしていません。');
  }

  async function showPosition(position: GeolocationPosition) {
    gettingLocation = true;

    const latitude = position.coords.latitude;
    const longitude = position.coords.longitude;

    try {
      const response = await fetch(
        `https://nominatim.openstreetmap.org/reverse?format=json&lat=${latitude}&lon=${longitude}&accept-language=ja`,
      );

      const data = await response.json();

      data && data.display_name
        ? newBat.setKey('spot', data.display_name)
        : alert('逆ジオコーディングに失敗しました。');

      // エラー時はエラーメッセージを表示
    } finally {
      gettingLocation = false;
    }
  }

  function showError(error: GeolocationPositionError) {
    switch (error.code) {
      case error.PERMISSION_DENIED:
        alert('ユーザーが位置情報の取得を拒否しました。');
        break;
      case error.POSITION_UNAVAILABLE:
        alert('位置情報を利用できません。');
        break;
      case error.TIMEOUT:
        alert('位置情報の取得がタイムアウトしました。');
        break;
      default:
        alert('不明なエラーが発生しました。');
    }
  }
</script>

<div class="text-field">
  <svg
    class="icon"
    xmlns="http://www.w3.org/2000/svg"
    enable-background="new 0 0 24 24"
    viewBox="0 0 24 24"
  >
    <path
      d="M2.6685,18.0132c0.4429,1.1357,1.4087,1.9702,2.5811,2.2324c2.2085,0.498,4.48,0.7471,6.751,0.7471
			c2.2705,0,4.541-0.249,6.748-0.7466c1.1743-0.2627,2.1401-1.0972,2.5811-2.228C21.7744,16.895,22,15.7114,22,14.5
			c0-0.9943-0.1609-1.9631-0.4612-2.8926C21.8349,11.1422,22,10.6022,22,10.0298C22,6.7051,19.2949,4,15.9697,4H8.0303
			C6.4155,4,4.8999,4.626,3.7622,5.7627C2.626,6.8999,2,8.4155,2,10.0298c0,0.577,0.1666,1.1212,0.4598,1.5815
			C2.1603,12.5397,2,13.5071,2,14.5C2,15.7114,2.2256,16.895,2.6685,18.0132z M19.4683,17.2866
			c-0.2007,0.5137-0.6328,0.8906-1.1582,1.0078c-4.1279,0.9312-8.4922,0.9316-12.6221-0.0005
			c-0.5234-0.1167-0.9556-0.4937-1.1582-1.0122C4.1782,16.394,4,15.458,4,14.5c0-0.5469,0.0581-1.084,0.1729-1.6069
			c0.026,0.0072,0.0549,0.0044,0.0811,0.0109C4.4858,12.9611,4.7234,13,4.9697,13h3.1089c0.0004,0.0023,0.0013,0.0046,0.0016,0.0068
			c0.0541,0.3392,0.1351,0.6762,0.2449,1.0107c0.0677,0.1956,0.1563,0.3799,0.2635,0.5509c0.3217,0.5129,0.8112,0.9045,1.4103,1.1122
			c0.3262,0.1067,0.657,0.1868,0.9905,0.2402c0.3145,0.0505,0.6315,0.0728,0.949,0.0756c0.0191,0.0002,0.038,0.0045,0.0571,0.0045
			c0.0001,0,0.0001,0,0.0002,0c0.3325,0,0.6653-0.0275,0.9969-0.08c0.0062-0.001,0.0124-0.0005,0.0186-0.0015
			c0.3376-0.0544,0.6737-0.1358,1.0063-0.2448c0.7822-0.271,1.3862-0.875,1.6626-1.6733c0.1069-0.3258,0.1866-0.6583,0.2401-0.9948
			c0.0004-0.0023,0.0013-0.0045,0.0016-0.0067h3.1084c0.2479,0,0.4866-0.0393,0.7191-0.0965
			c0.0251-0.0062,0.0529-0.0035,0.0778-0.0104C19.9419,13.416,20,13.9531,20,14.5C20,15.458,19.8218,16.394,19.4683,17.2866z
			 M13.3623,10.2148c0.1997,0.0693,0.3535,0.2231,0.4175,0.4067C13.9258,11.0674,14,11.5313,14,12s-0.0742,0.9326-0.2148,1.3623
			c-0.0693,0.1997-0.2231,0.3535-0.4063,0.417c-0.1505,0.0493-0.3038,0.0779-0.4565,0.1108
			c-0.7638,0.1635-1.5478,0.136-2.2847-0.1049c-0.1997-0.0693-0.3535-0.2231-0.4175-0.4067C10.0742,12.9326,10,12.4688,10,12
			s0.0742-0.9326,0.2148-1.3623c0.0693-0.1997,0.2231-0.3535,0.4067-0.4175C11.5132,9.9282,12.5029,9.9336,13.3623,10.2148z
			 M5.1768,7.1772C5.936,6.418,6.9497,6,8.0303,6h7.9395C18.1919,6,20,7.8076,20,10.0298c0,0.2603-0.0981,0.4995-0.2969,0.6929
			C19.5293,10.9014,19.29,11,19.0303,11h-3.1089c-0.0004-0.0023-0.0013-0.0046-0.0016-0.0068
			c-0.0541-0.3392-0.1351-0.6762-0.2449-1.0107c-0.271-0.7822-0.875-1.3862-1.6733-1.6626c-1.2949-0.4248-2.6919-0.4302-4.019,0.0054
			c-0.7822,0.271-1.3862,0.875-1.6626,1.6733c-0.1069,0.3258-0.1866,0.6583-0.2401,0.9948C8.0794,10.9955,8.0785,10.9977,8.0781,11
			H4.9697c-0.2598,0-0.499-0.0986-0.6929-0.2974C4.0981,10.5293,4,10.29,4,10.0298C4,8.9492,4.418,7.936,5.1768,7.1772z"
    ></path>
  </svg>

  <input
    class="input"
    type="text"
    placeholder="場所を追加"
    bind:value={$newBat.spot}
  />

  <button class="action" on:click={getLocation} disabled={gettingLocation}>
    {#if gettingLocation}
      ...
    {:else}
      現在地
    {/if}
  </button>
</div>

<style scoped lang="scss">
  .text-field {
    display: grid;
    grid-template-columns: auto 1fr auto;
    gap: 8px;
    align-items: center;
    width: 100%;
    padding: 8px;
    margin-bottom: 24px;
  }

  .icon {
    width: 24px;
    height: 24px;
  }

  .input {
    width: 100%;
    height: 100%;
    padding: 4px;
    font: inherit;
    font-size: 14px;
    font-weight: 600;
    border: none;
    outline: none;
  }

  .action {
    min-width: 80px;
    padding: 8px 16px;
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
