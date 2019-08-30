<template>
    <div id="payment">
        <yd-popup v-model="showCharge" position="bottom"  masker-opacity=".2">
            <div class="chargeBox">
                <div class="chargeTitle">
                    金額
                </div>
                <div class="chargeRadio">
                    <div class="proMoney">
                        HK$ {{proMoney}}<span class="service_money">+手續費HK$ {{service_money}}</span>
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
      }
    },
    components: {
      XButton
    },
    data(){
      return {
        showCharge: false,
        payState:'1',
        loading_show:false,
        payid:'',//支付moneyId
        proMoney:'',
        service_money:'',
      }
    },
    mounted () {
    },
    methods: {
      showChargeState(){
        this.showCharge = true
      },
      goCharge(){
        let that = this,url = encodeURIComponent(location.href);
        that.loading_show = true
        console.log('支付信息',this.payid)
//        return false;
        that.$api.rechargePay({
          order_no: that.payid,//繳費id
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
        this.service_money = parseFloat(payMoney[0].service_money).toFixed(2)
        console.log(payMoney)
      },

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
                    .service_money{
                        font-size: .3rem;
                    }
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
                padding-bottom: 50px;
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
