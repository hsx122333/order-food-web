<template>
  <div class="index-search">
    <div class="search-input ui-flex">
      <div class="search-btn"></div>
      <div class="ui-flex-1">
        <input type="text" placeholder="请输入菜单关键字搜索" @input="query" v-model="key">
      </div>
    </div>
    <span class="cancel-btn ">取消</span>
    <ul class="search-list" v-if="show">
      <template v-for="(item,index) in search">
        <li :key="index">
         {{item.value}}
        </li>
      </template>
    </ul>
  </div>
</template>

<script>
export default {
  name: 'indexSearch',
  data () {
    return {
      key: '',
      search: [
        {value: '集团业务办理'},
        {value: '新建集团'},
        {value: '旺铺套餐'},
        {value: '签到'},
        {value: '拜访日志'},
        {value: '政企实名认证'},
        {value: '签到'},
        {value: '拜访日志'},
        {value: '政企实名认证'},
        {value: '订单查询'}
      ]
    };
    show: true
  },
  methods: {
    query () {
      var length = this.key.length;
      this.show = length !== 0;
    }
  }
}
</script>

<style scoped lang="scss">
  @import "../styles/mixin";
  @function px2rem($px, $base-font-size: 75px) {
    @return ($px / $base-font-size) * 1rem;
  }
  .index-search{
    height: px2rem(100px);
    background-color: #ffffff;
    padding: px2rem(15px) px2rem(30px);
    margin-bottom: px2rem(20px);
    .search-input{
      width: 85%;
      position: relative;
      height: px2rem(70px);
      border-radius: px2rem(35px);
      background-color: #eeeeee;
      padding: px2rem(10px) px2rem(30px);
      input{
        width: 100%;
        height: px2rem(50px);
        line-height: px2rem(50px);
        background-color: transparent;
        border: none;
        outline: none;
        font-size: px2rem(24px);
        color: #000000;
        padding: 0 px2rem(15px);
        @include placeholder{
          color: #9b9b9b;
        }
      }
      .search-btn{
        width: px2rem(45px);
        background: url("../assets/pub/search-gray.png") no-repeat center;
        background-size: px2rem(42px) auto;
      }
    }
  }
  .cancel-btn{
    position: absolute;
    right: px2rem(30px);
    top: px2rem(15px);
    height: px2rem(70px);
    width: 15%;
    color: #3bb6f9;
    line-height: px2rem(70px);
    text-align: right;
  }
  .search-list{
    position: absolute;
    left: 0;
    right: 0;
    top: px2rem(100px);
    bottom: 0;
    background: #fff;
    li{
      height: px2rem(100px);
      line-height: px2rem(100px);
      border-bottom: 1px solid #eeeeee;
      padding: 0 px2rem(30px);
    }
  }
</style>
