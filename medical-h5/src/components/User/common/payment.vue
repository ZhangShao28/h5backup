<template>
    <div id="payment">
        <yd-popup v-model="showCharge" position="bottom"  masker-opacity=".2">
            <div class="chargeBox">
                <div class="chargeTitle" v-if="payType==1">
                    支付定金
                </div>
                <div class="chargeTitle" v-else-if="payType==3">
                    修改預約費用
                </div>
                <div class="chargeTitle" v-else>
                    支付尾款
                </div>
                <div class="chargeRadio">
                    <div class="proMoney">
                        HK$ {{proMoney}}
                    </div>
                </div>
                <div class="chargeBtn">
                    <!--<div class="moneyBtn">-->
                        <x-button class="bigBtn userBtn"  text="去支付" @click.native="goCharge"></x-button>
                    <!--</div>-->

                </div>
            </div>
        </yd-popup>
    </div>
</template>
<script>
  import { XButton} from 'vux'
  export default {
//    props:['payMoney'],
    props: {
      payMoney: {//缴费数组
        default: []
      },
      payType:{//缴费类型0定金1 修改費用，2定金尾款
        default:0
      },
      appoint_date:{//缴费类型0定金1 修改費用，2定金尾款
        default:''
      }
    },
    components: {
      XButton
    },
    data(){
      return {
        radioCharge: 0,
        checked:['1'],
        showCharge: false,
        payState:'1',
        paymoney:0,
        payid:'',
        loading_show:false,
        id:'',//支付moneyId
        proMoney:'',
        appoint_id:''
      }
    },
    mounted () {
    },
    methods: {
      checkBtn(el){
//        console.log(el.true-value)
//        console.log(el[0])
        let that = this,paymoney = parseFloat(that.paymoney),totalmoney = parseFloat(that.totalMoney),Money = that.Money;
        console.log(Money,paymoney,totalmoney)
        if(that.payType==2){
          if(el[0]==1){
            if(parseFloat(Money-totalmoney).toFixed(2)<0){
              that.paymoney ='0.00'
              that.relMoney=parseFloat(paymoney).toFixed(2)
            }else{
              that.paymoney =parseFloat(paymoney-totalmoney).toFixed(2)
              that.relMoney=parseFloat(totalmoney).toFixed(2)
            }

          }else{
            if(parseFloat(Money-totalmoney).toFixed(2)<0){
              that.paymoney =parseFloat(that.relMoney).toFixed(2)
            }else{
              that.paymoney = parseFloat(Money).toFixed(2)
            }
            that.relMoney='0.00'
          }
        }else{
          if(el[0]==1){
            if(parseFloat(Money-totalmoney).toFixed(2)<0){
              that.paymoney ='0.00'
              that.relMoney=parseFloat(paymoney).toFixed(2)
            }else{
              that.paymoney =parseFloat(paymoney-totalmoney).toFixed(2)
              that.relMoney=parseFloat(totalmoney).toFixed(2)
            }

          }else{
            if(parseFloat(Money-totalmoney).toFixed(2)<0){
              that.paymoney =parseFloat(that.relMoney).toFixed(2)
            }else{
              that.paymoney = parseFloat(paymoney+totalmoney).toFixed(2)
            }
            that.relMoney='0.00'
          }
        }

      },
      select(el){
        let that= this
//        console.log(that.totalmoney,that.type,that.is_use_yue)
        if(el==0){
          that.ActualPay(el)
          that.payid=that.payMoney[0].id
        }else if(el==1){
          that.ActualPay(el)
          that.payid=that.payMoney[1].id
        }else{
          that.ActualPay(el)
          that.payid=that.payMoney[2].id
        }
      },
      ActualPay(num){
        let that = this;
        that.remark = that.payMoney[num].remark
        that.Money = parseFloat(that.payMoney[num].patch_money)
        if(this.payType==2){
          if(that.checked[0]==1){
            if(parseFloat(that.payMoney[num].patch_money-that.totalMoney).toFixed(2)<0){
              that.paymoney =parseFloat(0.00).toFixed(2)
              that.relMoney=parseFloat(that.payMoney[num].patch_money).toFixed(2)
            }else{
              that.paymoney =parseFloat(that.payMoney[num].patch_money-that.totalMoney).toFixed(2)
              that.relMoney=parseFloat(that.totalMoney).toFixed(2)
            }
          }else{
            that.paymoney =parseFloat(that.payMoney[num].patch_money).toFixed(2)
          }
        }else{
          if(that.checked[0]==1){
            if(parseFloat(that.payMoney[num].money-that.totalMoney).toFixed(2)<0){
              that.paymoney =parseFloat(0.00).toFixed(2)
              that.relMoney=parseFloat(that.payMoney[num].money).toFixed(2)
            }else{
              that.paymoney =parseFloat(that.payMoney[num].money-that.totalMoney).toFixed(2)
              that.relMoney=parseFloat(that.totalMoney).toFixed(2)
            }
          }else{
            that.paymoney =parseFloat(that.payMoney[num].money).toFixed(2)
          }
        }

      },
      showChargeState(){
        this.showCharge = true
      },
      goCharge(){
        let that = this,url = encodeURIComponent(location.href);
        that.loading_show = true
        console.log('支付信息',that.payType,this.payid,that.appoint_id,that.appoint_date)
//        return false;
        that.$api.H5RechargePay({
          type:that.payType,//1定金2 尾款，3修改預約
          id: that.payid,//繳費id
          appoint_id:that.appoint_id,
          appoint_date:that.appoint_date
        })
          .then(response => {
            console.log(response)
            let data = response.data;
            let payData = data.data.pay_info;
            if(data.state==1){
              function onBridgeReady () {//境外支付不需要config注入
                WeixinJSBridge.invoke(
                  'getBrandWCPayRequest', {
                    'appId': payData.appId,     //公众号名称，由商户传入
                    'timeStamp': payData.timeStamp,         //时间戳，自1970年以来的秒数
                    'nonceStr': payData.nonceStr, //随机串
                    'package': payData.package,
                    'signType': 'MD5',         //微信签名方式：
                    'paySign': payData.paySign //微信签名
                  },
                  function (res) {
                    if (res.err_msg == 'get_brand_wcpay_request:ok') {
                      // 使用以上方式判断前端返回,微信团队郑重提示：
                      //res.err_msg将在用户支付成功后返回ok，但并不保证它绝对可靠。
                      that.loading_show = false
                      that.$emit('goCharge', '1')
                    }else{
                      that.loading_show = false
                      that.$emit('goCharge', '2','支付失敗')
                    }
                  })
              }
//
              if (typeof WeixinJSBridge == 'undefined') {
                if (document.addEventListener) {
                  document.addEventListener('WeixinJSBridgeReady', onBridgeReady, false)
                } else if (document.attachEvent) {
                  document.attachEvent('WeixinJSBridgeReady', onBridgeReady)
                  document.attachEvent('onWeixinJSBridgeReady', onBridgeReady)
                }
              } else {
                onBridgeReady()
              }
            }else if(data.state==10){
              that.loading_show = false
              that.$emit('goCharge', '1')
            }else{
              that.loading_show = false
              that.$emit('goCharge', '2',data.msg)
            }
          })
          .catch(response => {
          that.$dialog.toast({
            mes: '請求失敗',
            timeout: 1500,
            icon: 'error',
            callback: () => {
              that.loading_show = false
            }
          })
        })
        this.showCharge = false
      }
    },
    watch: {
      payMoney(payMoney) {
        this.payid =payMoney[0].id
        this.proMoney = parseFloat(payMoney[0].money).toFixed(2)
        this.appoint_id = payMoney[0].appoint_id
      },
      payType(payType){
        let that = this;
      },
      appoint_date(appoint_date){
        let that = this;
      }

    }
  }
</script>
<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="less" type="text/less">
    #payment {
        /*.yd-radio-icon {*/
            /*vertical-align: sub;*/
        /*}*/
        .yd-radio-icon {
            vertical-align: sub;
        }
        .yd-radio-text {
            font-size: .3rem;
            color: #666;
        }
        .yd-radio {
            padding-right: 0px;
            float: left;
        }
        .balance{
            .yd-checkbox-icon{
                vertical-align: sub;
            }
            .yd-checkbox-text{
                color: #666;
                font-size: .24rem;
            }
            .yd-checkbox{
                width: 100%;
                padding-right: 0px;
            }
        }
    }
</style>
<style lang="less" scoped type="text/less">
    #payment {
        .yd-radio-icon{
            vertical-align: sub;
        }
        .chargeBox {
            padding: 30px 30px 0px 30px;
            .chargeTitle {
                text-align: center;
                font-size: .36rem;
                font-weight: bold;
                .money_color {
                    font-weight: bold;
                    font-size: .5rem;
                    color: #F7B500;
                }
            }
            .chargeRadio {
                margin: 10px 0 20px 0;
                .proMoney{
                    padding-bottom: 15px;
                    text-align: center;
                    font-size: .42rem;
                    font-weight: bold;
                    color: @themeColor;
                }
                .box{
                    display: flex;
                    justify-content: space-around;
                    flex-direction: column;
                    align-items: flex-start;
                    font-size: .3rem;
                    font-weight: bold;
                    color: #666;
                    .patch{
                        font-size: .24rem;
                        padding-left: 20px;
                        color: #666;
                        font-weight: 400;
                    }
                    .color{
                        color: @themeColor;
                    }
                    .boxList{
                        padding: 10px 0;
                        position: relative;
                        width: 100%;
                    }
                    .box0{
                        padding: 0;
                    }
                    .money{
                    }
                    .name{
                        position: absolute;
                        display: inline-block;
                        right: 0;
                    }
                    .explain{
                        font-size: .24rem;
                        font-weight: 400;
                        max-height: 55px;
                        overflow-y: auto;
                        display: inline-block;
                    }
                }
            }
            .balance{
                font-size: .22rem;
                font-weight: bold;
                margin-top: 20px;
                padding-top: 6px;
                position: relative;
                .checkBox{
                    display: inline-block;
                    float: right;
                }
                .money{
                    color: @themeColor;
                    float: right;
                }
                &::before{
                    /*content: '';*/
                    /*display: inline-block;*/
                    /*width: 116%;*/
                    /*position: absolute;*/
                    /*border-top: 1px solid #e5e5e5;*/
                    /*left: -30px;*/
                    /*right: 30px;*/
                    /*top: -8px;*/
                }
                /*&::after{*/
                    /*content: '';*/
                    /*display: inline-block;*/
                    /*width: 116%;*/
                    /*position: absolute;*/
                    /*border-top: 1px solid #e5e5e5;*/
                    /*left: -30px;*/
                    /*right: 30px;*/
                    /*bottom: -15px;*/
                /*}*/
                .box{
                    display: flex;
                    justify-content: space-between;
                    color: #666;
                    font-size: .24rem;
                    padding: 6px 0;
                    .title{
                        padding-left: 22px;
                    }
                }
            }

            .chargeBtn {
                padding-bottom: 28px;
                position: relative;
                &::before{
                    /*content: '';*/
                    /*display: inline-block;*/
                    /*width: 116%;*/
                    /*position: absolute;*/
                    /*border-top: 1px solid #e5e5e5;*/
                    /*left: -30px;*/
                    /*right: 30px;*/
                    /*top: -30px;*/
                }
                .moneyNum{
                    width: 60%;
                    display: inline-block;
                }
                .moneyNum{
                    font-size: .4rem;
                    color: @themeColor;
                    font-weight: bold;
                }
                .moneyBtn{
                    width: 38%;
                    display: inline-block;
                    position: relative;
                }
            }
        }
    }
</style>
