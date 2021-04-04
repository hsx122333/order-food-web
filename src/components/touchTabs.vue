<template>
  <div class="touch-tabs">
    <ul class="ui-flex nav">
      <template v-for="(item, index) in nav">
        <li
          class="ui-flex-1"
          :key="index"
          :class="{ 'is-active': index === currentIndex }"
          @click="setIndex(index)"
        >
          {{ item }}
        </li>
      </template>
    </ul>
  </div>
</template>
<script>
export default {
  name: 'touchTabs',
  props: {
    nav: {
      type: Array,
      required: true
    }
  },
  data () {
    return {
      currentIndex: 0
    };
  },
  methods: {
    setIndex (index) {
      this.currentIndex = index;
      this.$emit('change', index);
    }
  }
};
</script>

<style scoped lang="scss">
@function px2rem($px, $base-font-size: 75px) {
  @return ($px / $base-font-size) * 1rem;
}
.touch-tabs {
  height: 100%;
  .nav {
    border-bottom: 2px solid #e1e4e6;
    background-color: #ffffff;
    li {
      text-align: center;
      color: #333333;
      font-size: px2rem(28px);
      padding-top: px2rem(4px);
      height: px2rem(94px);
      line-height: px2rem(88px);
    }
    .is-active {
      color: #44bbfe;
      border-bottom: px2rem(4px) solid #44bbfe;
    }
  }
}
</style>
