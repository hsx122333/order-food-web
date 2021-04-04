<template>
  <div class="commonBottom">
    <ul class="ui-flex">
      <li class="ui-flex-1" :class="{ 'is-active': activeIndex === 0 }">
        <div
          class="icon"
          :class="[isCommon ? 'icon-home' : 'icon-signin']"
        ></div>
        <div lang="name">{{ isCommon ? '首页' : '签到' }}</div>
      </li>
      <li
        v-if="show"
        class="ui-flex-1"
        :class="{ 'is-active': activeIndex === 1 }"
      >
        <div class="icon icon-service"></div>
        <div lang="name">{{ isCommon ? '工作台' : '工作台' }}</div>
      </li>
      <li
        v-if="show"
        class="ui-flex-1"
        :class="{ 'is-active': activeIndex === 2 }"
      >
        <div
          class="icon"
          :class="[isCommon ? 'icon-dealt' : 'icon-complaint']"
        ></div>
        <div lang="name">{{ isCommon ? '待办' : '投诉处理' }}</div>
      </li>
      <li class="ui-flex-1" :class="{ 'is-active': activeIndex === 3 }">
        <!--        <div class="icon icon-personal"></div>-->
        <div
          class="icon"
          :class="[isCommon ? 'icon-personal' : 'icon-check']"
        ></div>
        <div lang="name">{{ isCommon ? '个人' : '查询' }}</div>
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  name: 'BottomNav',
  props: {
    activeIndex: {
      type: Number,
      default: 1
    },
    isCommon: {
      type: Boolean,
      default: true
    }
  },
  data () {
    return {
      show: true
    }
  },
  methods: {}
};
</script>

<style scoped lang="scss">
@function px2rem($px, $base-font-size: 75px) {
  @return ($px / $base-font-size) * 1rem;
}
</style>
