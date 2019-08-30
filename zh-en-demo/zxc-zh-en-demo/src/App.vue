<template>
  <div id="app">
    <router-view/>
  </div>
</template>

<script>
export default {
  name: 'App'
}
</script>

<style>
#app {
  /*font-family:  "PingFang SC";*/
  font-family: PingFangSC-Regular, Verdana, Arial, 微软雅黑, 宋体;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  font-size: 1.2rem;
  color: #666;
}
.el-message-box{
  width: 13rem;
}
</style>
