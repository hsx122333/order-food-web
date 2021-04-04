<template>
  <div class="weui-div" @click.stop="toggle">
    <span class="weui-switch" :class="{'weui-switch-on' : !me_checked}" :value="value" ></span>
    <div class="weui-div-2" :class="{'colorFFF': !me_checked }">否</div>
    <div class="weui-div-1" :class="{'colorFFF': me_checked }">是</div>
  </div>
</template>
<script>
  export default {
    props: {
      value: {
        type: Boolean,
        default: true
      },
      FId: {
        type: String,
        default: '',
      },
      index: {
        type: Number,
        default:11090,
      },
      handle: {
        type: Boolean,
        default: true
      },
    },
    data() {
      return {
        me_checked: this.value
      }
    },
    watch: {
      value(){
        this.me_checked = this.value;
      }
    },
    methods: {
      toggle() {
        // 是否可点击
        if(this.handle === true){
          this.me_checked = !this.me_checked;
          this.$emit('changeSwitch', this.me_checked,this.FId,this.index);
        }

      }
    }
  }
</script>
<style lang="scss" scoped>
@function px2rem($px, $base-font-size: 75px) {
  @return ($px / $base-font-size) * 1rem;
}
  .weui-div{
    position:relative;
    font-weight: bold;
    cursor:pointer;
    width: px2rem(154px);
    height: px2rem(56px);
  }
  .weui-div-1{
    position:absolute;
    left:13px;
    top:0;
    line-height:32px;
    font-size:12px;
    color:#999;
  }
  .weui-div-2{
    position:absolute;
    right:11px;
    top:0;
    line-height:32px;
    font-size:12px;
    color:#999999;
  }
  .weui-switch {
    display: block;
    position: relative;
    width: 82px;
    height: 30px;
    // border: 1px solid #DFDFDF;
    outline: 0;
    border-radius: 16px;
    box-sizing: border-box;
    // background-color: #DFDFDF;
    transition: background-color 0.1s, border 0.1s;
    cursor: pointer;
  }
  .weui-switch:before {
    content: " ";
    position: absolute;
    top: 0;
    left: 0;
    width: 80px;
    height: 30px;
    border-radius: 15px;
    background-color: #EFF3F4;
    transition: transform 0.35s cubic-bezier(0.45, 1, 0.4, 1);
  }
  .weui-switch:after {
    content: " ";
    position: absolute;
    top: 3px;
    left: 3px;
    width: 34px;
    height:24px;
    background: #44BBFE;
    border-radius: px2rem(35px);
    transition: transform 0.35s cubic-bezier(0.4, 0.4, 0.25, 1.35);
  }
  .weui-switch-on {
    border-color: #EFF3F4;
    background-color: #EFF3F4;
  }
  .weui-switch-on:before {
    border-color: #EFF3F4;
    background-color: #EFF3F4;
  }
  .weui-switch-on:after {
    transform: translateX(40px);
  }
  .colorFFF{
    color: #fff !important;
  }
</style>