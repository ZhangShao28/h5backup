/**
 * Created by admin on 2018/12/6.
 */
// function payconfig (MappId,Mtimestamp) {
function Payconfig (MappId,Mtimestamp,MnonceStr,Msignature) {
  if(MappId==''||Mtimestamp==''||MnonceStr==''||Msignature==''){
  }else{
    wx.config({
      beta: true,
      debug: false, // 开启调试模式,调用的所有api的返回值会在客户端alert出来，若要查看传入的参数，可以在pc端打开，参数信息会通过log打出，仅在pc端时才会打印。
      appId: MappId, // 必填，公众号的唯一标识
      timestamp: Mtimestamp, // 必填，生成签名的时间戳
      nonceStr: MnonceStr, // 必填，生成签名的随机串
      signature: Msignature,// 必填，签名
      jsApiList: ['getH5PrepayRequest'] // 必填，需要使用的JS接口列表
    })
    // console.log('paydata',payData)

  }
}
export {
  Payconfig
}