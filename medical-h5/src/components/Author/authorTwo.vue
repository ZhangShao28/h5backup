<template>
    <div class="login_box">
    </div>
</template>
<script>
  import { cookie } from 'vux'
  export default {
    components: {
      cookie
    },
    data () {
      return {
        code: '',
        login_id: ''
      }
    },
    created () {
      var that = this,login_state = cookie.get('loginState');
      var Request = undefined
      var getUrlStr = function (name) {
        /**
         * 获取地址栏参数
         */
          // console.log("授权页面地址2"+window.location.href)
        let reg = new RegExp('(^|\\?|&)' + name + '=([^&]*)(\\s|&|$)', 'i')
        if (reg.test(window.location.href)) {
          return unescape(RegExp.$2.replace(/\+/g, ' '))
        }
        return undefined
      }
      Request = getUrlStr('code')
      if(login_state=='login'){
        if (Request != undefined) {
          cookie.set('code', Request, {
            expires: 30000,
            path: '/'
          })
        }
        that.$api.authIndex({
          code: cookie.get('code'),
//          cid: cookie.get('cid')
        })
          .then(function (response) {
            if (response.data.state == 1) {//授权成功
              cookie.set('login_id', 'yes', {
                expires: 30000,
                path: '/'
              })
              that.$router.push({path: '/Login'})
            } else {//授权失败进入登录页面
              that.$dialog.toast({
                mes: response.data.msg,
                timeout: 1500,
                icon: 'error',
                callback: () => {
                  that.$router.push({path: '/Login'})
                }
              })
            }
          })
          .catch(function (response) {
            console.log(response)
            that.$dialog.toast({
              mes: response.data.msg,
              timeout: 1500,
              icon: 'error'
            })
          })
      }else{//用户端
        if (Request != undefined) {
          cookie.set('user_code', Request, {
            expires: 30000,
            path: '/'
          })
        }
        that.$api.H5AuthIndex({
          code: cookie.get('user_code'),
//          cid: cookie.get('cid')
        })
          .then(function (response) {
            if (response.data.state == 1) {//授权成功
              cookie.set('user_login_id', 'yes', {
                expires: 30000,
                path: '/'
              })
              that.$router.push({path: '/UserLogin'})
            } else {//授权失败进入登录页面
              that.$dialog.toast({
                mes: response.data.msg,
                timeout: 1500,
                icon: 'error',
                callback: () => {
                  that.$router.push({path: '/UserLogin'})
                }
              })
            }
          })
          .catch(function (response) {
            console.log(response)
            that.$dialog.toast({
              mes: response.data.msg,
              timeout: 1500,
              icon: 'error'
            })
          })
      }

    },
    methods: {}
  }
</script>
<!-- Add "scoped" attribute to limit CSS to this component only -->
<style>
</style>
