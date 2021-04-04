<template>
  <div class="bottom-nav">
    <ul class="ui-flex">
      <li class="ui-flex-1" :class="{ 'is-active': activeIndex === 0 }">
        <div
          class="icon"
          :class="[isCommon ? 'icon-home' : 'icon-signin']"
        ></div>
        <div lang="name">{{ isCommon ? "首页" : "签到" }}</div>
      </li>
      <li v-if="show" class="ui-flex-1" :class="{ 'is-active': activeIndex === 1 }">
        <div class="icon icon-service"></div>
        <div lang="name">{{ isCommon ? "服务" : "工作台" }}</div>
      </li>
      <li v-if="show" class="ui-flex-1" :class="{ 'is-active': activeIndex === 2 }">
        <div
          class="icon"
          :class="[isCommon ? 'icon-dealt' : 'icon-complaint']"
        ></div>
        <div lang="name">{{ isCommon ? "待办" : "投诉处理" }}</div>
      </li>
      <li class="ui-flex-1" :class="{ 'is-active': activeIndex === 3 }">
<!--        <div class="icon icon-personal"></div>-->
        <div
          class="icon"
          :class="[isCommon ? 'icon-personal' : 'icon-check']"
        ></div>
        <div lang="name">{{ isCommon ? "我的" : "查询" }}</div>
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
      default: false
    }
  },
  data () {
    return {
      show: false
    }
  },
  methods: {}
};
</script>

<style scoped lang="scss">
@function px2rem($px, $base-font-size: 75px) {
  @return ($px / $base-font-size) * 1rem;
}
.bottom-nav {
  position: fixed;
  height: px2rem(110px);
  left: 0;
  right: 0;
  bottom: 0;
  border-top: 1px solid #ebebeb;
  box-shadow: 10px 0 10px 0 #ebebeb;
  background-color: #ffffff;
  li {
    text-align: center;
    color: #a7a3bb;
    font-size: px2rem(20px);
    .icon {
      height: px2rem(70px);
      padding: px2rem(15px) 0 px2rem(10px) 0;
      background: no-repeat center content-box;
      background-size: auto px2rem(45px);
    }
    .icon-home {
      background-image: url("../assets/bottomNav/home.png");
    }
    .icon-service {
      background-image: url("../assets/bottomNav/service.png");
    }
    .icon-dealt {
      background-image: url("../assets/bottomNav/dealt.png");
    }
    .icon-personal {
      background-image: url("../assets/bottomNav/personal.png");
    }
    .icon-complaint {
      background-image: url("../assets/bottomNav/complaint.png");
    }
    .icon-signin {
      background-image: url("../assets/bottomNav/icon-signin.png");
    }
    .icon-check {
      background-image: url("../assets/bottomNav/icon-check.png");
    }
    /*选中时的样式和图标*/
    &.is-active {
      color: #44abe5;
      .icon-home {
        background-image: url("../assets/bottomNav/home_active.png");
      }
      .icon-service {
        background-image: url("../assets/bottomNav/service.png");
      }
      .icon-dealt {
        background-image: url("../assets/bottomNav/dealt.png");
      }
      .icon-personal {
        background-image: url("../assets/bottomNav/personal.png");
      }
      .icon-complaint {
        background-image: url("../assets/bottomNav/complaint.png");
      }
      /*.icon-signin {*/
      /*  !*background-image: url("../assets/bottomNav/complaint.png");*!*/
      /*}*/
      /*.icon-check {*/
      /*  !*background-image: url("../assets/bottomNav/complaint.png");*!*/
      /*}*/
    }
  }
}
</style>
