<template>
  <div class="dealt-item ui-flex" @click="$emit('click')">
    <div class="icon">
      <div class="msg-num" v-if="messageNum">{{messageNum}}</div>
    </div>
    <div class="ui-flex-1 ui-over-hidden">
      <div class="text ui-flex">
        <div class="ui-flex-1 ui-over-hidden">
          <div class="ui-ellipsis">{{title}}</div>
        </div>
        <div class="time">{{time}}</div>
      </div>
      <div class="sub-text ui-flex">
        <template v-if="isContent">
          <div class="sub-text-child">任务类型：&nbsp;{{taskType}}</div>
          <div class="sub-text-child">申请人：&nbsp;{{person}}</div>
        </template>
        <template v-else>
          <div class="ui-ellipsis">{{subTitle}}</div>
        </template>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'needDealt',
  props: {
    isContent: {
      type: Boolean,
      default: false
    },
    title: {
      required: true
    },
    time: {
      required: true
    },
    subTitle: {
      default: ''
    },
    taskType: {
      default: ''
    },
    person: {
      default: ''
    },
    messageNum: {
      default: ''
    },
    handler: {
      default: () => {},
      type: Function
    }
  }
};
</script>

<style scoped lang="scss">
  @function px2rem($px, $base-font-size: 75px) {
    @return ($px / $base-font-size) * 1rem;
  }
  .dealt-item{
    padding: px2rem(16px) px2rem(40px) px2rem(18px) px2rem(30px);
    border-bottom: px2rem(2px) solid #e7e7e7;
    background: url("../assets/pub/arrow-right.png") no-repeat right center content-box;
    background-size: auto px2rem(30px);
    .icon{
      width: px2rem(78px);
      background: url("../assets/pub/mail.png") no-repeat left center;
      background-size: px2rem(48px) px2rem(40px);
      position: relative;
      flex-shrink: 0;
      .msg-num{
        width: px2rem(33px);
        height: px2rem(33px);
        border-radius: 100%;
        background-color: #ff0000;
        color: #ffffff;
        line-height: px2rem(33px);
        font-size: px2rem(24px);
        position: absolute;
        left: px2rem(30px);
        top: 0;
        text-align: center;
      }
    }
    .text{
      color: #333333;
      padding-right: px2rem(30px);
      >div:first-child{
        font-size: px2rem(28px);
        // font-weight: 600;
        padding-right: px2rem(30px);
      }
      >div:last-child{
        font-size: px2rem(24px);
      }
    }
    .time{
      padding-top: px2rem(3px);
      flex-shrink: 0;
    }
    .sub-text{
      padding-top: px2rem(12px);
      padding-right: px2rem(50px);
      color: #9b9b9b;
      font-size: px2rem(24px);
      .sub-text-child+.sub-text-child{
        margin-left: px2rem(36px);
      }
    }
  }
</style>
