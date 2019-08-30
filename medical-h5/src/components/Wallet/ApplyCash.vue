<template>
    <div id="ApplyCash">
        <div class="apply"  v-if="state==1">
            <div class="head">
                <div class="title" v-if="expire_state==1">可提現佣金</div>
                <div class="title" v-if="expire_state!=1">剩餘佣金(不可提現)</div>
                <div>HK$ <span class="money">{{balance_money}}</span></div>
            </div>
            <div class="content" :class="expire_state!=1?'content2':''">
                <div class="inputBox">
                    <group>
                        <x-input ref="focus" label-width="auto" title="HK$" v-model="inputMoney" type="number"
                                 placeholder="請輸入提現金額" :disabled="disabled"></x-input>
                    </group>
                    <div class="focusBtn" @click="focusInput" :class="dis?'disnone':''" >去繳費</div>
                </div>
                <div class="rule">輸入金額需為{{money}}的倍數，若非{{money}}的倍數，則需要另外扣除{{man_work_fee}}港幣人工費用</div>
            </div>
            <div class="footer">
                <div class="btnBox">
                    <x-button class="bigBtn" @click.native="ApplyBtn" text="申    請" :class="expire_state!=1?'dis':''" :disabled="disabled"></x-button>
                    <x-button class="bigBtn payBtn" @click.native="paymentBtn" text="去繳費" v-if="expire_state==2"></x-button>
                </div>
                <div class="text" v-if="expire_state==1">
                    佣金提現，需要佣金提現申請后，工作人員將在5個工作日內進行審核，并轉賬。
                </div>
                <div class="text errorText" >
                    <span v-if="expire_state==2">會員已到期，請及時繳納會費，即可提現</span>
                    <span v-if="expire_state==3">當前佣金不足以支付人工費用HK$ {{man_work_fee}}，暫時不可申請提現</span>
                </div>
            </div>
        </div>
        <div class="applySuccess" v-if="state==2">
            <!--<div class="title">申請提交成功</div>-->
            <!--<div class="money">提現佣金：HK$<span class="num">   2000.00</span></div>-->
            <!--<div class="tips">佣金提現申請后，工作人員將在3個工作日內進行審核，并轉賬</div>-->
            <msg title="申請提交成功"  icon="success">
                <span slot="description">
                    佣金提現申請后，工作人員將在5個工作日內進行審核，并轉賬
                </span>
                <span slot="buttons">
                     <x-button class="bigBtn" @click.native="successBtn" text="完  成"></x-button>
                </span>
            </msg>
        </div>
        <div v-transfer-dom>
            <confirm v-model="show"
                     :title="title"
                     @on-cancel="onCancel"
                     @on-confirm="onConfirm"
                     confirm-text="確認申請"
                     cancel-text="重新修改金額">
                <p>當前提現佣金：HK$ {{inputMoney}}</p>
                <p>金額非{{money}}的倍數，將從提現款中扣除HK${{man_work_fee}}人工費用。</p>
            </confirm>
        </div>
        <payMent ref="showState" :payMoney="charge_money" :totalMoney="balance_money" :payType=1 @goCharge="paymentState"></payMent>
    </div>
</template>
<script>
  import { XInput, XButton, Group,cookie, Confirm, TransferDomDirective as TransferDom,Msg  } from 'vux'
  import payment from '../common/payment.vue'
  export default {
    directives: {
      TransferDom
    },
    components: {
      XInput,
      XButton,
      Group,
      Confirm,
      Msg,
      cookie,
      payMent: payment
    },
    data () {
      return {
        charge_money:[],
        total_money:'',//余额
        order_id:0,
        inputMoney: '',
        balance_money: '',
        man_work_fee: '',
        money: '',
        is_have_account:'',//是否填寫了賬戶信息
        show: false,
        title: '溫馨提示',
        state: '1',//提現狀態
        expire_state:'1',//會員狀態
        tips:'',
        disabled:false,
        dis:true

      }
    },
    mounted(){
      let that = this;
      that.getData()
    },
    methods: {
      getData(tx_money){
        var that = this
        this.$dialog.loading.open('正在加載中···')
//                console.log(this.page)
        that.$api.walletTixian({
          tx_money:tx_money
        }).then(response => {
            that.$dialog.loading.close()
            // sucess callback
            let data = response.data.data
          console.log(response)
          if(response.data.state==1){
          that.balance_money = data.balance_money
          that.man_work_fee = data.man_work_fee
          that.is_have_account = data.is_have_account
          that.money = data.money
          that.expire_state = data.expire_state//會員狀態1正常2過期
//          that.expire_state =2
              if(tx_money!=undefined){
                    this.state='2'
              }else{
                if(that.expire_state==1){
                    that.disabled=false
                }else{
                    that.disabled=true
                }
              }
          }else{
            that.$dialog.toast({
              mes: response.data.msg,
              timeout: 2000,
              icon: 'error'
            })
          }
        })
          .catch(response=>{
            that.$dialog.toast({
              mes: response.data.msg,
              timeout: 1500,
              icon: 'error'
            })
          })
      },
      focusInput(){
        this.dis=true
        this.$refs['focus'].focus()
      },
      getRenew(){
        let that = this;
        that.$api.walletRenew({
          type:1
        }).then(response => {
            console.log(response)
          that.charge_money = response.data.data.renew
        })
          .catch(response=>{

          })
      },
      ApplyBtn(){
        let that = this,val = parseFloat(that.inputMoney);
        let reg = /(^[1-9]([0-9]+)?(\.[0-9]{1,2})?$)|(^(0){1}$)|(^[0-9]\.[0-9]([0-9])?$)/;
        if (!reg.test(val)){
          that.$dialog.toast({
            mes: '提現金額有誤',
            timeout: 1500,
            icon: 'error'
          })
          that.focusInput();
          return false;
        }
        console.log(val,typeof val)
        if(val==''){
          that.$dialog.toast({
            mes: '提現金額不能為空',
            timeout: 1500,
            icon: 'error'
          })
          that.focusInput();
          return false
        }else{
          if(that.is_have_account==0){
            that.$dialog.toast({
              mes: '您還未填寫賬戶信息，請前往銀行賬戶頁面填寫！',
              timeout: 1500,
            })
          }else{
            if(val>parseFloat(that.balance_money)){
              that.$dialog.toast({
                mes: '提現金額大於可提現佣金',
                timeout: 1500,
                icon: 'error'
              })
            }else{
              if(val%(that.money)===0){
                console.log('提现成功')
                that.getData(val)
              }else{
                if(val<parseFloat(that.man_work_fee)||val==parseFloat(that.man_work_fee)){
                  that.$dialog.toast({
                    mes: '提現金額不能小於等於手續費！',
                    timeout: 1500,
                  })
                }else{
                  that.show = true
                }
              }
            }

          }
        }
      },
      successBtn(){
        this.$router.go(-1)
      },
      paymentBtn(el){
        var that = this,val = el.target.dataset;
        that.getRenew()
        that.$refs.showState.showChargeState()
      },
      paymentState(el){
        console.log('支付狀態',el)
        let that = this;
        if(el==1){
          that.$dialog.toast({
            mes: '支付成功',
            timeout: 1500,
            icon: 'success',
            callback: () => {
              that.$router.go(0)
            }
          })
        }else{
          that.$dialog.toast({
            mes: '支付失敗',
            timeout: 1500,
            icon: 'error',
            callback: () => {
            }
          })
        }
      },
      onCancel () {
        let that = this;
        that.$refs['focus'].focusInput()
      },
      onConfirm (el) {
        console.log()
        this.getData(this.inputMoney)
      },
    },
    beforeCreate () {

    },
    beforeDestroy () {

    }
  }
</script>
<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="less" type="text/less">
    #ApplyCash {
        .weui-msg{
            .weui-btn-area{
                margin: 0px;
            }
        }
        .weui-label {
            font-size: .6rem;
            margin-right: 10px;
            font-weight: 400;
        }
        input {
            font-size: .7rem;
        }
        input::placeholder {
            font-size: .3rem;
            font-weight: 400;
            padding-top: 20px;
        }
        .weui-cell {
            padding: 18px 0 0 0;
        }
        .content2{
            .vux-x-input.disabled .weui-input{
                text-fill-color: #BCBABA;
                -webkit-text-fill-color: #BCBABA;
                opacity: 1;
            }
        }
    }
</style>
<style scoped lang="less" type="text/less">
    #ApplyCash {
        .apply {
            .head {
                color: #fff;
                font-size: .3rem;
                padding: 30px 0;
                text-align: center;
                background: linear-gradient(151deg, rgba(24, 100, 255, 1) 0%, rgba(54, 209, 254, 1) 100%);
                .title {
                    padding-bottom: 10px;
                }
                .money {
                    font-size: .5rem;
                    font-weight: bold;
                }
            }
            .content {
                margin-top: 10px;
                background: #fff;
                .inputBox {
                    font-size: .7rem;
                    font-weight: bold;
                    /*border-bottom: 1px solid #e5e5e5;*/
                    width: 90%;
                    margin: 0 auto;
                    position: relative;
                    .focusBtn{
                        position: absolute;
                        top: 12px;
                        width: 100%;
                    }
                    .disnone{
                        display: none;
                    }
                }
                .rule {
                    font-size: .24rem;
                    color: #666;
                    width: 90%;
                    margin: 0 auto;
                    padding: 10px 0;
                }
            }
            .content2{
                color: #BCBABA;
                .rule{
                    color:#BCBABA ;
                }
            }
            .footer {
                margin: 30px 0;
                .text {
                    color: #666;
                    width: 90%;
                    margin: 20px auto;
                }
                .errorText{
                    color: @red;
                    text-align: center;
                }
                .dis{
                    background: #c7c7c7;
                }
                .payBtn{
                    margin-top: 20px;
                }
            }
        }
        .applySuccess{
            text-align: center;
            padding-top: 60px;
            .bigBtn{
                margin-top: 60px;
            }
            .title{
                font-size: .5rem;
            }
            .money{
                font-size: .32rem;
                padding: 40px 0;
                .num{
                    font-size: .4rem;
                    font-weight: bold;
                    color: @themeColor;
                }
            }
            .tips{
                font-size: .26rem;
            }
        }
    }
</style>
