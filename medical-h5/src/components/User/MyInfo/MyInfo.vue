<template>
    <div id="MyInformation">
            <div class="content">
                <group>
                    <cell title="姓名" :value="username" :link="{path:'/UserInfoModify',query:{type:1,username:username}}"></cell>
                </group>
                <div class="groupBox">
                    <group>
                        <cell title="手提電話" :value="mobile_phone" :link="{path:'/UserModifyPhone',query:{mobile_phone:mobile_phone}}"
                        is-link></cell>
                        <cell title="性  別" :value="sex" :link="{path:'/UserInfoModify',query:{type:2,sex:sex_id}}"></cell>
                        <cell title="出生日期" :link="{path:'/UserInfoModify',query:{type:3,birth_date:birth_date}}" :value="birth_date"
                              is-link></cell>
                        <cell title="年  齡" :value="age"></cell>
                    </group>
                </div>
                <div class="groupBox">
                    <group>
                        <cell title="區  域" :value="area1"></cell>
                        <cell title="身份証號碼" :value="ID_number"></cell>
                        <cell title="護照號碼" :value="passport" :link="{path:'/UserInfoModify',query:{type:4,passport:passport}}" is-link></cell>
                        <cell title="通行證號碼" :value="permit_number" :link="{path:'/UserInfoModify',query:{type:5,permit_number:permit_number}}" is-link></cell>
                        <cell title="推薦會員編號" :value="referee_uid"></cell>
                        <cell title="微信號" :value="wechat_number" :link="{path:'/UserInfoModify',query:{type:6,wechat_number:wechat_number}}" is-link></cell>
                    </group>
                </div>
                <div class="groupBox">
                    <group>
                        <cell :title="passwordText" :value="phonePassword"  :link="{path:'/UserInfoModify',query:{type:8}}"
                              is-link></cell>
                    </group>
                </div>
                <!--<div class="protocol">-->
                    <!--<router-link to="/Clause"><div class="colorB">《注冊條款》</div></router-link>-->
                    <!--及-->
                    <!--<router-link to="/ClauseTwo"><div class="colorB">《隱私政策聲明》</div></router-link>-->
                <!--</div>-->
                <div class="btnBox">
                    <x-button class="bigBtn outBtn" @click.native="exit_login"  text="登     出"></x-button>
                </div>
            </div>

            <!--<x-button class="outBtn" type="warn" @click.native="exit_login">登 出</x-button>-->
            <div v-transfer-dom>
                <confirm v-model="show"
                         :title="title"
                         @on-cancel="onCancel"
                         @on-confirm="onConfirm"
                         confirm-text="確認"
                         cancel-text="取消">
                </confirm>
            </div>
        <!--</div>-->
        <!--<payMent ref="showState" :payMoney="charge_money" :payType="payType" :totalMoney="total_money" @goCharge="paymentState"></payMent>-->
    </div>
</template>
<script>
  import { Cell,Flexbox,FlexboxItem, Group, XButton, Confirm, cookie, TransferDomDirective as TransferDom } from 'vux'
  import payment from '../../common/payment.vue'
  export default {
    directives: {
      TransferDom
    },
    components: {
      Flexbox,
      FlexboxItem,
      Group,
      Cell,
      XButton,
      Confirm,
      cookie,
      payMent: payment
    },
    data () {
      return {
        passwordText:'修改密碼',
        phonePassword:'',
        show: false,
        title: '確認登出？',
        ID_number:'',
        age:'',
        area:'',
        area1:'',
        birth_date:'',
        mobile_phone:'',
        passport:'',
        permit_number:'',
        referee_uid:'',
        sex:'',
        sex_id:'',
        username:'',
        wechat_number:'',
      }
    },
    mounted(){
      this.getData()
    },
    methods: {
      getData(){
        var that = this
        that.$api.H5UserMy({})
          .then(res => {
            let data = res.data.data
            console.log(res)
            that.ID_number = data.ID_number
            that.age = data.age
            that.area = data.area
            that.birth_date = data.birth_date
            that.mobile_phone = data.mobile_phone
            that.passport = data.passport
            that.permit_number = data.permit_number
            that.referee_uid = data.referee_uid
            that.sex = data.sex
            that.username = data.username
            that.wechat_number = data.wechat_number
            if(that.area==2){
              that.area1 = '港澳地區'
            }else{
              that.area1 = '中國大陸'
            }
            if(data.sex=='男'){
              that.sex_id = 1
            }else{
              that.sex_id = 2
            }
          })
          .catch(res => {
            that.$dialog.toast({
              mes: '請求失敗！',
              timeout: 500,
              icon: 'error',
              callback: () => {
              }
            })

          })
      },
      goPayment(type){
        var that = this
        that.$api.walletRenew({
          type:type
        })
          .then(response => {
            console.log(response)
            if (response.data.state == 1) {
              that.charge_money = response.data.data.renew
              that.total_money = response.data.data.balance_money
              that.payType = type
              that.$refs.showState.showChargeState()
            }
          })
          .catch(response=>{

          })
//        that.$refs.showState.showChargeState()
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
              that.$router.push('/Home')
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

      },
      onConfirm (el) {
        cookie.remove('user_login_id')
        cookie.remove('user_login_state')
        cookie.remove('ctoken')
        cookie.remove('user_isvip')
        setTimeout(() => {
          this.$router.push({path: '/UserLogin'})
        }, 500)
      },
      exit_login(){
        this.show = true
      }
    },
    beforeCreate () {

    },
    beforeDestroy () {
    }
  }
</script>
<style lang="less" type="text/less">
    #MyInformation {
        .vux-cell-bd {
            min-width: 90px;
        }
        .weui-cell .weui-cell__ft{
            color: #333;
            padding-right: 10px;
        }
        .weui-cell_access {
            padding-right: 17px;
        }
    }


</style>
<style scoped lang="less" type="text/less">
    #MyInformation {
        background: #f5f5f5;
        .head{
            color: #fff;
            font-size: .24rem;
            .img{
                background: url("/static/img/ic_card.png") no-repeat;
                width: 100%;
                height: 100%;
                background-size: contain;
                position: absolute;
                filter:progid:DXImageTransform.Microsoft.AlphaImageLoader(src='/static/img/ic_card.png',sizingMethod='scale');
                margin-top: 10px;
                .text{
                    padding: .8rem .9rem;
                    .vipNum{

                    }
                    .userName{
                        font-size: .3rem;
                        font-weight: bold;
                        padding-top: .4rem;
                        text-overflow: ellipsis;
                        overflow: hidden;
                        white-space: nowrap;
                        width: 4rem;
                        span{
                            font-size: .26rem;
                        }
                    }
                    .time{
                        padding-top: 5px;
                    }
                }
            }
            .img2{
                background: url("/static/img/ic_card_overdue.png") no-repeat;
                width: 100%;
                height: 100%;
                background-size: contain;
                position: absolute;
                filter:progid:DXImageTransform.Microsoft.AlphaImageLoader(src='/static/img/ic_card.png',sizingMethod='scale');
            }
        }
        .goPayment{
            padding-top: 4rem;
            background: #fff;
            padding-bottom: 20px;
            .wid50{
                width: 49%;
                display: inline-block;
            }
            .payBox{
                width: 90%;
                margin: 0 auto;
            }
            .payBtn{
                background: #fff;
                color: @themeColor;
                border: 1px solid @themeColor;
                margin-top: 12px;
            }
        }
        .content{
            /*padding-top: 10px;*/
            .groupBox{
                padding-top: 5px;
            }
            .btnBox {
                padding-top: 15px;
                padding-bottom: 25px;
                .outBtn{
                    background: #f86c6c;
                }
            }
            .protocol {
                display: flex;
                justify-content: flex-start;
                align-items: center;
                padding: 10px 15px;
                font-size: .26rem;
                .colorB{
                    color: @themeColor;
                }
            }
            .rule{
                color: #666;
                font-size: .26rem;
                padding: 4.3rem 28px 28px 28px;
            }
        }
    }
</style>
