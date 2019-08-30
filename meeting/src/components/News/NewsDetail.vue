<template>
    <div id="news_detail">
        <div>
            <div class="news_title">
                <div class="logo"><img :src="c_logo" alt=""></div>
                <div class="title">
                    <div class="tit">{{property_name}}</div>
                    <div class="">{{pub_time}}</div>
                </div>
            </div>
            <div class="title">
                {{title}}
            </div>
            <div class="news_detail_con" id="news_detail_con" v-html="content">
                {{content}}
            </div>
        </div>
    </div>
</template>
<script>
  import { cookie, Loading, } from 'vux'
  import {requireShare} from '../../../static/js/wxshare'
  export default {
    components: {
      cookie,
      Loading
    },
    data () {
      return {
        c_logo: '',
        img: '',
        content: '',
        property_name: '',
        pub_time: '',
        title: '',
        appId: '', // 必填，公众号的唯一标识
        timestamp: '', // 必填，生成签名的时间戳
        nonceStr: '', // 必填，生成签名的随机串
        signature: '',// 必填，签名
      }
    },
    created(){
      var id = this.$route.query.id
      this.content_list(id)
    },
    mounted(){
      document.querySelector('body').setAttribute('style', 'background:#fff')
//          console.log('id',this.$route.params.id)
//      var id = this.$route.query.id
//      this.content_list(id)
//      this.getinfo(id)
    },
    methods: {
      content_list(id){
        var that = this
        let htp = location.href.split('//')[0], host = window.location.host
        let shareUrl = htp + '//' + host + '/NewsDetails?id=' + id
        this.$dialog.loading.open('正在加載中···')
        that.api.newsDetail({
          news_id: id
        }).then(function (response) {
          that.$dialog.loading.close()
//          console.log(response.data.data)
          var data = response.data.data
          if (response.data.state == 1) {
            that.c_logo = data.c_logo
            that.img = data.img
            that.content = data.content
            that.property_name = data.property_name
            that.pub_time = data.pub_time
            that.title = data.title
            let url = window.location.href
            requireShare(data.title,'您的朋友向您推薦這篇文章',shareUrl,data.img,url )
          } else {
            that.$dialog.toast({
              mes: response.data.msg,
              timeout: 1500,
              icon: 'error'
            })
          }
        })
          .catch(function (response) {
            that.$dialog.loading.close()
            that.$dialog.toast({
              mes: response.data.msg,
              timeout: 1500,
              icon: 'error'
            })
          })
      },
      getinfo(id){
        let that = this, htp = location.href.split('//')[0], host = window.location.host
        let url = encodeURIComponent(location.href)
        let shareUrl = htp + '//' + host + '/NewsDetails?id=' + id
        that.api.newsShare({
            cid: cookie.get('cid'),
            url: url
          })
          .then(function (res) {
            var data = res.data.data
//            console.log(res.data.data)
            wx.config({
              debug: true, // 开启调试模式,调用的所有api的返回值会在客户端alert出来，若要查看传入的参数，可以在pc端打开，参数信息会通过log打出，仅在pc端时才会打印。
              appId: data.appId, // 必填，公众号的唯一标识
              timestamp: data.timestamp, // 必填，生成签名的时间戳
              nonceStr: data.noncestr, // 必填，生成签名的随机串
              signature: data.signature,// 必填，签名
              jsApiList: [
                'onMenuShareTimeline',
                'onMenuShareAppMessage'
              ] // 必填，需要使用的JS接口列表
            })
            wx.ready(function () {
              wx.onMenuShareTimeline({
                title: that.title,
                link: shareUrl,//域名必须和安全域名保持一致
                imgUrl: that.img,//域名必须和安全域名保持一致
                success: function () {
                  // 用户确认分享后执行的回调函数
//                  alert('分享到朋友圈成功')
                },
                cancel: function () {
                  that.$dialog.toast({
                    mes: '取消分享',
                    timeout: 1500,
                    icon: 'error'
                  })
                  // 用户取消分享后执行的回调函数
//                  alert('你没有分享到朋友圈')
                }
              })
              wx.onMenuShareAppMessage({
                title: that.title,
                desc: '您的朋友向您推薦這篇文章',
                link: shareUrl,//域名必须和安全域名保持一致
                imgUrl: that.img,//域名必须和安全域名保持一致
                trigger: function (res) {
                  // 不要尝试在trigger中使用ajax异步请求修改本次分享的内容，因为客户端分享操作是一个同步操作，这时候使用ajax的回包会还没有返回
                },
                success: function (res) {
//                  alert('分享给朋友成功')
                },
                cancel: function (res) {
                  that.$dialog.toast({
                    mes: '取消分享',
                    timeout: 1500,
                    icon: 'error'
                  })
//                  alert('你没有分享给朋友')
                },
                fail: function (res) {
//                  alert(JSON.stringify(res))
                }
              })
              wx.error(function (res) {
                console.log(res)
              })
            })
          })
          .catch(function (res) {

          })
      },
//      content_list(id){
//        var that = this
//        this.$dialog.loading.open('正在加載中···')
//        that.api.newsDetail({
//            news_id: id
//          }).then(function (response) {
//          that.$dialog.loading.close()
////          console.log(response.data.data)
//          var data = response.data.data
//          if (response.data.state == 1) {
//            that.c_logo = data.c_logo
//            that.img = data.img
//            that.content = data.content
//            that.property_name = data.property_name
//            that.pub_time = data.pub_time
//            that.title = data.title
//
//          } else {
//            that.$dialog.toast({
//              mes: response.data.msg,
//              timeout: 1500,
//              icon: 'error'
//            })
//          }
//        })
//          .catch(function (response) {
//            that.$dialog.loading.close()
//            that.$dialog.toast({
//              mes: response.data.msg,
//              timeout: 1500,
//              icon: 'error'
//            })
//          })
//      },
    },
    beforeCreate () {
      document.body.setAttribute('class', '')
//        document.querySelector('body').setAttribute('style', 'background:#fff')
    },
    beforeDestroy () {
      document.querySelector('body').setAttribute('style', '')
    },
//    beforeRouteEnter (to, from, next) {
//      var u = navigator.userAgent
//      var isiOS = !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/) //ios终端
//      // XXX: 修复iOS版微信HTML5 History兼容性问题
//      if (isiOS && to.path !== location.pathname) {
//        // 此处不可使用location.replace
//        location.assign(to.fullPath)
//      } else {
//        next()
//      }
//    },
  }
</script>
<style scoped>
    .news_detail_con >>> img {
        max-width: 100%;
        height: auto;
    }
</style>
<style scoped lang="less" type="text/less">
    #news_detail {
        background: #fff;
        height: 100%;
        padding: 20px;

        .title {
            color: #333;
            font-size: .9rem;
            padding: 0 0 10px 0;
        }

        .news_title {
            margin: 0 auto 10px auto;
            border-bottom: 1px solid #f2f2f2;
            padding-bottom: 5px;

            .logo {
                float: left;
                width: 45px;
                height: 45px;
                background: #ccc;
                border-radius: 25px;
                margin-right: 10px;

                img {
                    width: 45px;
                    height: 45px;
                    border-radius: 25px;
                }

            }
            .title {
                font-size: .55rem;
                color: #999;

                .tit {
                    font-size: .7rem;
                    color: #666;
                    position: relative;
                    top: 3px;
                }

            }
        }
        .title {
            text-align: justify;
        }

        .news_detail_con {
            text-align: justify;
            font-size: 14px;
            color: #666;
            padding-bottom: 20px;
        }

    }
</style>
