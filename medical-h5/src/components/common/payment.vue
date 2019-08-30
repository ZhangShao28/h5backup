<template>
    <div id="payment">
        <yd-popup v-model="showCharge" position="bottom"  masker-opacity=".2">
            <div class="chargeBox">
                <div class="chargeTitle" v-if="payType==2">
                    升      級
                </div>
                <div class="chargeTitle" v-else-if="payType==0">
                    金      額
                </div>
                <div class="chargeTitle" v-else>
                    繳     費
                </div>
                <div class="chargeRadio">
                    <div v-if="payType==0" class="proMoney">
                        HK$ {{proMoney}}
                    </div>
                    <yd-radio-group v-model="radioCharge" color="#4285F4" size="16" class="box" :callback="select" v-else>
                        <div v-for="(item,index) in payMoney" :key="index" class="boxList" :class="payType==2?'':''">
                        <yd-radio  :val="index">
                          <span class="money">HK$ {{item.money}}/年</span>
                            <div class="patch"  v-if="payType==2">實際需繳納：<span class="color">HK$ {{item.patch_money}}</span>(補{{item.month}}個月)</div>
                        </yd-radio>
                            <span class="name">{{item.post_name}}</span>
                        </div>
                        <!--<yd-radio val="1">内地用戶支付</yd-radio>-->
                    </yd-radio-group>
                </div>
                <div v-if="payType!=0">
                    <span class="explain" v-if="remark!=''">說明：{{remark}}</span>
                </div>
               <div class="balance" v-if="payType!=3&&isShowYue==1">
                     <span>
                         <yd-checkbox-group v-model="checked" color="#4285F4" size="16" class="box" :callback="checkBtn">
                             <yd-checkbox val="1">
                                 使用餘額進行抵扣<span class="money">-HK$ {{relMoney}}</span>
                             </yd-checkbox>
                         </yd-checkbox-group>
                        <div class="box">
                            <div class="title">賬戶餘額</div>
                            <div>HK$ {{totalMoney}}</div>
                        </div>
                   </span>
               </div>
                <div class="chargeBtn">
                    <div class="moneyNum">
                        HK$ {{paymoney}}
                    </div>
                    <div class="moneyBtn">
                        <yd-button size="large" type="primary" :disabled="loading_show" @click.native="goCharge">去支付</yd-button>
                    </div>

                </div>
            </div>
        </yd-popup>
    </div>
</template>
<script>
  export default {
//    props:['payMoney'],
    props: {
      payMoney: {//缴费数组
        default: []
      },
      totalMoney:{//钱包余额
        default:0.00
      },
      payType:{//缴费类型1續費、斷交2 升級，3新會員，0購買商品
        default:0
      },
      Remark:{
        default:''
      }
    },
    components: {},
    data(){
      return {
        title:'繳    費',
        radioCharge: 0,
        checked:['1'],
        remark:'',
        remarks: '',
        types:'',//缴费类型
        showCharge: false,
        payState:'1',
        paymoney:0,
        payid:'',
        paytype:0,//是否是购买商品
        totalmoney:0,
        loading_show:false,
        is_use_yue:'',//是否使用余额支付
        id:'',//支付moneyId
        upType:0,
        relMoney:'',
        proMoney:'',
        isShowYue:'',//1显示2不显示余额
        Money:''
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
//      goCharges(){
//        let that = this;
//        if(that.payType==3){//新会员
//          that.is_use_yue=2
//          that.checked[0]=0
//          that.totalmoney=0
//        }
//        if(that.payType!=0){
//          that.paytype=1//1缴费2购买商品
//        }else{
//          that.paytype=2//1缴费2购买商品
//        }
//        if(that.checked[0]==1){
//          console.log('選用餘額支付',that.paymoney)
//          that.is_use_yue=1
//        }else{
//          console.log('不選用餘額支付',that.paymoney)
//          that.is_use_yue=2
//        }
//        console.log('支付信息',this.paytype,that.payType,this.payid,that.is_use_yue)
//
//      },
      goCharge(){
        let that = this,url = encodeURIComponent(location.href);
        that.loading_show = true
        if(that.payType==3){//新会员
          that.is_use_yue=2
          that.checked[0]=0
          that.totalmoney=0
        }
        if(that.payType!=0){
          that.paytype=1//1缴费2购买商品
        }else{
          that.paytype=2//1缴费2购买商品
        }
        if(that.checked[0]==1){
          that.is_use_yue=1
        }else{
          that.is_use_yue=2
        }
        console.log('支付信息',this.paytype,that.payType,this.payid,that.is_use_yue,that.remarks)
//        return false;
        that.$api.rechargePay({
          payment_type: that.paytype,//是否是1繳費或者2購買商品
          type:that.payType,//1續費、斷交2 升級，3新會員，0購買商品
          id: that.payid,//繳費id
          is_use_yue:that.is_use_yue,//1使用餘額，2不使用
          remark:that.remarks
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
                      that.$emit('goCharge', '2')
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
              that.$emit('goCharge', '2')
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
//        this.checked[0]=1
        this.checked=['1']
        this.radioCharge=0
        this.remark =payMoney[0].remark
        this.payid =payMoney[0].id
        this.proMoney = parseFloat(payMoney[0].money).toFixed(2)

//        if((this.totalmoney==0)&&(parseFloat(payMoney[0].money).toFixed(2)=='0.00')){
//          this.isShowYue=2
//          this.checked[0]=2
//        }else{
//          this.isShowYue=1
//          this.checked[0]=1
//        }
        if(this.payType==2){
          this.relMoney = parseFloat(payMoney[0].patch_money).toFixed(2)
          this.Money = parseFloat(payMoney[0].patch_money).toFixed(2)
          if(parseFloat(payMoney[0].patch_money-this.totalMoney).toFixed(2)<0){
            this.paymoney =parseFloat(0.00).toFixed(2)
            this.relMoney=parseFloat(payMoney[0].patch_money).toFixed(2)
          }else{
            this.paymoney =parseFloat(payMoney[0].patch_money-this.totalMoney).toFixed(2)
            this.relMoney=parseFloat(this.totalMoney).toFixed(2)
          }
        }else{
          this.relMoney = parseFloat(payMoney[0].money).toFixed(2)
          this.Money = parseFloat(payMoney[0].money).toFixed(2)
          if(parseFloat(payMoney[0].money-this.totalMoney).toFixed(2)<0){
            this.paymoney =parseFloat(0.00).toFixed(2)
            this.relMoney=parseFloat(payMoney[0].money).toFixed(2)
          }else{
            this.paymoney =parseFloat(payMoney[0].money-this.totalMoney).toFixed(2)
            this.relMoney=parseFloat(this.totalMoney).toFixed(2)
          }
        }
      },
      totalMoney(totalMoney){
        console.log(totalMoney)
//        this.checked[0]=1
        this.checked=['1']
        this.radioCharge=0
        this.totalmoney =totalMoney
        console.log(this.proMoney)
        if(totalMoney=='0.00'){
          this.isShowYue=2
          this.checked[0]=2
        }else{
          this.isShowYue=1
          this.checked[0]=1
        }
      },
      payType(payType){
        let that = this;
//        this.checked[0]=1
        this.checked=['1']
        this.radioCharge=0
        that.upType=0
        if(payType=='2'){//續費
          that.upType=2
        }else{//升級
          that.upType=1
        }
      },
      Remark(Remark){
        this.remarks = Remark
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
                font-size: .4rem;
                font-weight: bold;
                .money_color {
                    font-weight: bold;
                    font-size: .5rem;
                    color: #F7B500;
                }
            }
            .chargeRadio {
                margin: 20px 0px;
                .proMoney{
                    padding-bottom: 15px;
                    text-align: center;
                    font-size: .36rem;
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
                    content: '';
                    display: inline-block;
                    width: 116%;
                    position: absolute;
                    border-top: 1px solid #e5e5e5;
                    left: -30px;
                    right: 30px;
                    top: -8px;
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
                    content: '';
                    display: inline-block;
                    width: 116%;
                    position: absolute;
                    border-top: 1px solid #e5e5e5;
                    left: -30px;
                    right: 30px;
                    top: 15px;
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
                button {
                    font-size: .3rem;
                    background: @themeColor;
                    height: 0.75rem;
                    width: 50%;
                    float: right;
                    position: relative;
                    top: 10px;
                }
            }
        }
    }
</style>
