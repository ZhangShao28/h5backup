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
      var that = this
      let ua = window.navigator.userAgent.toLowerCase()
//                console.log("是否授权",cookie.get('login_state'),ua,"DSDS",ua.match(/MicroMessenger/i))
      if (ua.match(/MicroMessenger/i) == 'micromessenger') {
//                    console.log('请求授权')
        // 跳转到微信授权页面
      //  cookie.set('login_id', 'yes', {
      //    expires: 30000,
      //    path: '/'
      //  })
      //  cookie.set('token', '9267JrLTy4oC6LcHz7FBKhVtb4swoMCkHqq4WpDdXfhv9C5Fl1Y', {
      //    expires: 30000,
      //    path: '/'
      //  })
        window.location.href = process.env.API_ROOT+'/oauth?domain='+cookie.get('domainName')
      }
    },
    methods: {}
  }
</script>
<!-- Add "scoped" attribute to limit CSS to this component only -->
<style>
</style>
