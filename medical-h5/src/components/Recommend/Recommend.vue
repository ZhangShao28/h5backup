<template>
    <div id="recommend">
        <div class="title">我的推薦碼：{{qrcode}}</div>
        <div class="name">推薦人：{{username_zh}}</div>
        <div class="qrcode">
            <qrcode :value="qrcodeUrl" type="img"></qrcode>
        </div>
        <div class="tips">通過我的推薦碼，可邀請新會員加入</div>
    </div>
</template>
<script>
    import {Qrcode,cookie } from 'vux'
  export default {
    components: {
      Qrcode,
      cookie
    },
    data () {
      return {
        qrcodeUrl:'',
        qrcode:cookie.get('uid'),
        username_zh:''
      }
    },
    mounted(){
      let href = window.location.href.split('/')
      for(let i=0;i<href.length;i++){
        this.qrcodeUrl = href[0]+'//'+href[2]+'/Login?quid='+cookie.get('uid')
      }
      this.username_zh = cookie.get('username_zh')
    },
    methods: {},
    beforeCreate () {

    },
    beforeDestroy () {

    }
  }
</script>
<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="less" type="text/less">
    #recommend{
        text-align: center;
        padding: 40px 0;
        .name{
            font-size: .3rem;
            padding: 10px 0px 10px 0px;
        }
        .title{
            font-size: .4rem;
        }
        .qrcode{
            margin: 40px auto;
        }
        .tips{
            font-size: .3rem;
            color: #666;
        }
    }
</style>
