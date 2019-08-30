<template>
    <div id="MyInformation">
        <div v-if="expire_state==2">
            <div class="head">
                <div class="img img2">
                    <!--<img src="/static/img/ic_card.png" alt="">-->
                    <div class="text">
                        <div class="vipNum">原會員ID:{{uid}}</div>
                        <div class="userName">{{username_zh}}<span>({{post_name}})</span></div>
                        <div class="time">已於{{expire_date}}日到期</div>
                    </div>
                </div>
            </div>
            <div class="content">
                <div class="rule">
                    續費后，佣金可提現；斷繳超過3個月，将不可繼續銷售產品，會員的推薦碼失效，不可增加下級，用戶購買的商品不計入佣金。請及時續費
                </div>
                <x-button class="bigBtn" @click.native="goPayment(1)" text="續    費"></x-button>
            </div>
        </div>
        <div v-else>
            <div class="head">
                <div class="img">
                    <!--<img src="/static/img/ic_card.png" alt="">-->
                    <div class="text">
                        <div class="vipNum">會員ID:{{uid}}</div>
                        <div class="userName">{{username_zh}} <span>({{post_name}})</span></div>
                        <div class="time">{{expire_date}}日到期</div>
                    </div>
                </div>
            </div>
            <div class="goPayment">
                <div class="payBox">
                    <x-button class="bigBtn payBtn" :class="xfState=='y'?'wid50':''" v-if="levelState=='n'" @click.native="goPayment(2)" text="升   級"></x-button>
                    <x-button class="bigBtn payBtn" :class="levelState=='n'?'wid50':''" v-if="xfState=='y'" @click.native="goPayment(1)" text="續   費"></x-button>
                </div>
            </div>
            <div class="content">
                <group>
                    <cell title="中文名" :value="username_zh" :link="{path:'/InfoModify',query:{type:1,username_zh:username_zh}}"></cell>
                    <cell title="英文名" :link="{path:'/InfoModify',query:{type:2,username_en:username_en}}" :value="username_en"
                          is-link></cell>
                </group>
                <div class="groupBox">
                    <group>
                        <cell title="手提電話" :value="u_mobilephone" :link="{path:'/ModifyPhone',query:{u_mobilephone:u_mobilephone}}"
                        is-link></cell>
                        <cell title="性  別" :value="sex" :link="{path:'/InfoModify',query:{type:3,sex:sex_id}}"></cell>
                        <cell title="出生日期" :link="{path:'/InfoModify',query:{type:4,birth_date:birth_date}}" :value="birth_date"
                              is-link></cell>
                        <cell title="年  齡" :value="age"></cell>
                    </group>
                </div>
                <div class="groupBox">
                    <group>
                        <cell title="區  域" :link="{path:'/InfoModify',query:{type:7,area1:area1,area2:area2}}"
                              :value="country+'-'+big_area+'-'+small_area"
                              is-link></cell>
                        <cell title="詳細地址" :link="{path:'/InfoModify',query:{type:5,address:address}}" :value="address"
                              is-link></cell>
                        <cell title="證件號碼" :value="ID_number"></cell>
                        <cell title="推薦會員編號" :value="pid"></cell>
                        <!--<cell title="選  民" :value="is_voter" :link="{path:'/InfoModify',query:{type:5,is_voter:is_voter}}" is-link></cell>-->
                        <!--<cell title="電話" :value="tel_phone" :link="{path:'/ModifyPhone',query:{tel_phone:tel_phone}}"-->
                              <!--is-link></cell>-->
                        <cell title="郵箱" :value="email"  :link="{path:'/InfoModify',query:{type:6,email:email}}"
                              is-link></cell>
                        <cell title="微信號" :value="wechat_number" :link="{path:'/InfoModify',query:{type:9,wechat_number:wechat_number}}"
                              is-link></cell>
                    </group>
                </div>
                <div class="groupBox">
                    <group>
                        <cell :title="passwordText" :value="phonePassword"  :link="{path:'/InfoModify',query:{type:8}}"
                              is-link></cell>
                    </group>
                </div>
                <div class="protocol">
                    <router-link to="/Clause"><div class="colorB">《注冊條款》</div></router-link>
                    及
                    <router-link to="/ClauseTwo"><div class="colorB">《隱私政策聲明》</div></router-link>
                </div>
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
        </div>
        <payMent ref="showState" :payMoney="charge_money" :payType="payType" :totalMoney="total_money" @goCharge="paymentState"></payMent>
    </div>
</template>
<script>
  import { Cell,Flexbox,FlexboxItem, Group, XButton, Confirm, cookie, TransferDomDirective as TransferDom } from 'vux'
  import payment from '../common/payment.vue'
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
        passwordText:'設置密碼',
        phonePassword:'',
        levelState:'',//是否是最高級別y/n
        xfState:'',//是否需要續費y/n
        charge_money:[],
        total_money:'',//余额
        payType:0,
        order_id:0,
        userState:1,
        userImg: '',
        uid:'',
        pid:'',
        expire_date:'',
        ID_number: '',
        username_zh: '',
        username_en: '',
        age:'',
        sex: '',
        sex_id: '',
        birth_date: '',
        email: '',
        wechat_number: '',
        address: '',
        u_mobilephone:'',
//        tel_phone: '',
        show: false,
        title: '確認登出？',
        area1:'',
        area2:'',
        country:'',
        big_area:'',
        small_area:'',
        post_name:'',
        expire_state:''
      }
    },
    mounted(){
      this.getData()
    },
    methods: {
      getData(){
        var that = this
        that.$api.userMy({})
          .then(res => {
            let data = res.data.data
            console.log(res)
            that.ID_number = data.ID_number
            that.address = data.address
            this.area1 = data.area//大區
            this.area2 = data.area_arr//大區
            this.country = data.country//大區
            this.big_area = data.big_area//大區
            this.small_area = data.small_area//大區
            that.birth_date = data.birth_date
            that.username_zh = data.username_zh
            that.username_en = data.username_en
            that.post_name = data.post_name
            that.age = data.age
            that.email = data.email
            that.wechat_number = data.wechat_number
            that.sex = data.sex
            that.expire_date = data.expire_date
            that.u_mobilephone = data.u_mobilephone
            that.uid = data.uid
            that.pid = data.pid
            that.money = data.money
            that.levelState = data.is_high_level
            that.xfState = data.is_can_renew
            that.expire_state = data.expire_state//是否過期1no2yes
            that.is_have_password = data.is_have_password//是否有設置密碼1yes2no
            if(that.is_have_password==1){
              that.passwordText='修改密碼'
            }else{
              that.passwordText='設置密碼'
            }
            if(data.sex=='男'){
              that.sex_id = 1
              that.userImg='/static/img/man.png'
            }else{
              that.sex_id = 2
              that.userImg='/static/img/woman.png'
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
        cookie.remove('login_id')
        cookie.remove('login_state')
        cookie.remove('token')
        cookie.remove('isvip')
        cookie.remove('quid')
        setTimeout(() => {
          this.$router.push({path: '/Login'})
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
            padding-top: 10px;
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
