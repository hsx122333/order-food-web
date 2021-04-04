<template>
  <div class="head">
    <div class="back"></div>
    <span class="name">{{ name }}</span>
    <div class="close" v-if="showClose">关闭</div>
  </div>
</template>

<script>
export default {
  name: 'commonHead',
  props: {
    showClose: {
      type: Boolean,
      default: false
    },
    name: {
      required: true
    }
  }
};
</script>

<style scoped lang="scss">
@function px2rem($px, $base-font-size: 75px) {
  @return ($px / $base-font-size) * 1rem;
}
.head {
  color: #ffffff;
  position: relative;
  text-align: center;
  height: px2rem(90px);
  line-height: px2rem(90px);
  background-color: #44bbfe;
  .back {
    position: absolute;
    left: px2rem(40px);
    top: px2rem(26px);
    height: px2rem(38px);
    width: px2rem(38px);
    background: url("../assets/pub/back.png") no-repeat center;
    background-size: cover;
  }
  .close {
    position: absolute;
    right: px2rem(40px);
    top: px2rem(25px);
    height: px2rem(40px);
    line-height: px2rem(40px);
    font-size: px2rem(24px);
  }
  span.name {
    font-size: px2rem(36px);
  }
}
</style>
