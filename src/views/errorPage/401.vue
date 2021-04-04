<template>

  <div class="flex-justify-around align-center" style="height: 100%">
    <div>
      <!-- <img src="../../assets/images/pic/404.png"> -->
      <div class="mgt-20 tc" style="width: 15rem;">很抱歉。{{msg}}</div>
    </div>
  </div>
</template>
<script>

export default {
  name: '401',
  data() {
    return {
      msg: "您还未登录呢。"

    }

  },
  beforeRouteLeave(to, from, next) {
    next(false)
  },
  mounted() {
    const pageMsg = {
      "logout": "登出成功！",
      "unauth": "您还没登录或者登录已经失效，请尝试重新登录。",
      "stop": "'服务器维护中，请稍候再试。",
    }
    const msg = this.$route.query.msg;
    this.msg = msg ? pageMsg[msg] : pageMsg["unauth"];

  }
}
</script>

<style scoped>
body {
  margin: 0;
  padding: 0;
  width: 100%;
  height: 100%;
  color: #b0bec5;
  display: table;
  font-weight: 100;
  font-family: "Lato";
}

.container {
  text-align: center;
  display: table-cell;
  vertical-align: middle;
}

.content {
  text-align: center;
  display: inline-block;
}

.title {
  font-size: 42px;
  margin-bottom: 40px;
}
</style>
