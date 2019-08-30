/**
 * Created by admin on 2018/12/24.
 */
import Vue from 'vue'
import Api from '../../src/api'
import {cookie} from 'vux'
Vue.use(cookie)
// 微信验证
export function requireConfig(url) {
  Api.newsShare({
    cid: cookie.get('cid'),
    url: encodeURIComponent(url)
  })
    .then(function (res){
      var data = res.data.data
      wx.config({
        debug: false, // 开启调试模式,调用的所有api的返回值会在客户端alert出来，若要查看传入的参数，可以在pc端打开，参数信息会通过log打出，仅在pc端时才会打印。
        appId: data.appId, // 必填，公众号的唯一标识
        timestamp: data.timestamp, // 必填，生成签名的时间戳
        nonceStr: data.noncestr, // 必填，生成签名的随机串
        signature: data.signature,// 必填，签名
        jsApiList: [
          'onMenuShareTimeline',
          'onMenuShareAppMessage'
        ] // 必填，需要使用的JS接口列表
      })
    })
    .catch(function (err) {
      console.log(err)
    })
}

// 验证分享
export function requireShare(title, desc, shareUrl, imgUrl,url) {
  // 安卓需要重新验证
  if (navigator.userAgent.indexOf('Android') > -1) {
    requireConfig(url)
  }

  wx.ready(function() {
    // 分享给朋友
    wx.onMenuShareAppMessage({
      title: title,
      desc: desc,
      link: shareUrl,//域名必须和安全域名保持一致
      imgUrl: imgUrl,//域名必须和安全域名保持一致
      trigger: function (res) {
        // 不要尝试在trigger中使用ajax异步请求修改本次分享的内容，因为客户端分享操作是一个同步操作，这时候使用ajax的回包会还没有返回
      },
      success: function (res) {
        console.log('分享给朋友成功')
      },
      cancel: function (res) {
        console.log('你没有分享给朋友')
      },
      fail: function (res) {
//                  alert(JSON.stringify(res))
      }
    })
    // 分享给朋友圈
    wx.onMenuShareTimeline({
      title: title,
      link: shareUrl,//域名必须和安全域名保持一致
      imgUrl: imgUrl,//域名必须和安全域名保持一致
      success: function () {
        console.log('分享到朋友圈成功')
      },
      cancel: function () {
        console.log('你没有分享到朋友圈')
      }
    })
  })
}