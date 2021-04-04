<template>
  <div class="dealt-search">
    <div class="search-input ui-flex">
      <div class="ui-flex-1">
        <input type="text" placeholder="输入工单主题" v-model="key">
      </div>
      <div class="search-btn" @click="search"></div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'dealtSearch',
  data () {
    return {
      key: ''
    }
  },
  methods: {
    search () {
      this.$emit('search', this.key)
    }
  }
}
</script>

<style scoped lang="scss">
  @import "../styles/mixin";
  @function px2rem($px, $base-font-size: 75px) {
    @return ($px / $base-font-size) * 1rem;
  }
  .dealt-search{
    height: px2rem(100px);
    background-color: #ffffff;
    padding: px2rem(15px) px2rem(30px);
    margin-bottom: px2rem(20px);
    .search-input{
      position: relative;
      height: px2rem(70px);
      border-radius: px2rem(35px);
      background-color: #eeeeee;
      padding: px2rem(10px) px2rem(30px) px2rem(10px) px2rem(40px);
      input{
        width: 100%;
        height: px2rem(50px);
        line-height: px2rem(50px);
        background-color: transparent;
        border: none;
        outline: none;
        font-size: px2rem(24px);
        color: #000000;
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
</style>
