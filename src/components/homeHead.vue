<template>
  <div class="home-head ui-flex">
    <img class="weather-icon" src="../../assets/home/weather-icon.png" />
    <div class="weather-num">26</div>
    <div class="ui-flex-1"></div>
    <img class="search-icon" src="../../assets/pub/search.png" />
    <img class="message-icon" src="../../assets/pub/message.png" />
  </div>
</template>

<script>
export default {
  name: 'homeHead',
  props: {}
};
</script>

<style scoped lang="scss">
@function px2rem($px, $base-font-size: 75px) {
  @return ($px / $base-font-size) * 1rem;
}
.home-head {
  padding: px2rem(30px);
  padding-bottom: px2rem(16px);
  height: px2rem(110px);
  background-color: #6bc7ff;
  img {
    display: inline-block;
  }
  .weather-icon {
    height: px2rem(64px);
    width: auto;
  }
  .weather-num {
    background: url("../assets/home/oc.png") no-repeat right top;
    background-size: px2rem(12px) auto;
    padding: 0 px2rem(12px) 0 px2rem(16px);
    font-size: px2rem(70px);
    color: #ffffff;
  }
  .search-icon,
  .message-icon {
    height: px2rem(40px);
    width: auto;
    margin-top: px2rem(12px);
  }
  .message-icon {
    margin-left: px2rem(28px);
  }
}
</style>
