<template>
    <div id="applyMember">
        <div class="apply_con">
            <!--<div class="title">入會申請</div>-->
            <div class="content">
                <group>
                    <div class="xin phone"><span>*</span>
                        <x-input label-width="105" title="手提電話" v-model="u_mobilephone" name="u_mobilephone"
                                 type='text' disabled=""></x-input>
                    </div>
                    <div class="xin"><span>*</span>
                        <x-input label-width="105" title="姓名中文" required v-model="username" class="pleft0" name="username"
                                 placeholder="請輸入姓名中文" type='text'></x-input>
                    </div>
                    <div class="xin"><span>*</span>
                        <x-input label-width="105" title="姓名英文" required v-model="username_en" class="pleft0" name="username_en"
                                 placeholder="請輸入姓名英文" type='text'></x-input>
                    </div>
                    <selector title="性別" v-model="sex" :options="sex_list" @on-change="Change_sex"></selector>
                    <!--<div class="xin"><span>*</span>-->
                        <!--<selector title="職  務" v-model="post_id" :value-map="['id', 'post_name']"-->
                                  <!--:options="post_list" @on-change="onChange_post"></selector>-->
                    <!--</div>-->
                    <!--<div class="xin"><span>*</span>-->
                        <!--<selector title="選  民" v-model="voter" :options="voter_list"-->
                                  <!--@on-change="Change_voter"></selector>-->
                    <!--</div>-->
                    <div class="xin"><span>*</span>
                        <datetime
                                v-model="birth_date"
                                @on-change="change_date"
                                title="出生日期"
                                :min-year="1900"
                                :max-year="2050">
                        </datetime>
                    </div>
                    <!--<x-input label-width="105" title="年齡" required v-model="age" class="pleft0" name="age"-->
                             <!--placeholder="請輸入年齡" type='number'></x-input>-->
                    <div class="xin"><span>*</span>
                        <selector title="區  域" v-model="area" :options="area_list"
                                  @on-change="Change_area"></selector>
                    </div>
                    <div class="xin"><span>*</span>
                        <x-address @on-hide="logHide" raw-value value-text-align="left" :show.sync="showAddress"
                                   :title="title" v-model="addressvalue" :list="addressData"
                                   @on-shadow-change="onShadowChange" placeholder="請選擇區域"></x-address>
                    </div>
                    <div class="xin"><span>*</span>
                        <x-input label-width="105" title="詳細地址" v-model="address" required class="pleft0" name="address"
                                 placeholder="請輸入詳細地址" type='text'></x-input>
                    </div>
                    <div class="xin"><span>*</span>
                        <x-input label-width="105" title="身份證號" v-model="ID_number" name="ID_number" :is-type="isNum" :mask="ID_mask" :max="ID_length"
                                 :placeholder="ID_placeholder"
                                 type='text' required></x-input>
                    </div>
                    <x-input label-width="105" title="推薦會員編號" required v-model="upper_level_id" class="pleft0" name="upper_level_id"
                             placeholder="請輸入推薦會員編號" type='number' :disabled="disabled"></x-input>
                    <!--<x-input title="*手提電話" v-model="address" class="pleft0"  name="address" placeholder="請輸入手提電話" type='text'></x-input>-->
                    <!--<x-input label-width="105" title="住宅電話" v-model="address_phone" name="address_phone" placeholder="請輸入住宅電話"-->
                             <!--type='text'></x-input>-->
                    <x-input label-width="105" title="電郵" v-model="email" name="email" placeholder="請輸入電郵"
                             is-type='email'></x-input>
                    <x-input label-width="105" title="微信號" v-model="wechat" name="wechat" placeholder="請輸入微信號"></x-input>
                    <x-input label-width="105" v-for="(item,index) in inputList" v-model="arr[index]" :key="index" :title='item'
                             :placeholder="'請輸入'+item" type='text'>
                    </x-input>
                </group>
                <div class="tips"><span class="red">*</span>請填寫正確的郵箱地址，以便接收恒高的重要郵件；港澳身份證號碼注意為英文括號</div>
            </div>
            <div class="submit_btn">
                <x-button class="Btn_Login bigBtn" @click.native="submit_btn" type="primary" text="下一步"></x-button>
                <!--<x-button class="Btn_Login bigBtn" @click.native="paybtns" type="primary" text="下一步"></x-button>-->
            </div>
            <!--<payMent ref="showState" :payMoney="charge_money" :payId="order_id" :payType=1 @goCharge="paymentState"></payMent>-->
            <payMent ref="showState" :payMoney="charge_money" :totalMoney="total_money" :payType=3 @goCharge="paymentState"></payMent>
        </div>
    </div>
</template>
<script>
  import { XInput, Group, XButton, Cell, Toast, cookie, Selector, Datetime, XAddress } from 'vux'
  import payment from '../common/payment.vue'
  import { Payconfig } from '@/config/wxpay.js'
  import ChinaAddressData from '../../../static/addressData/ChinaAddress.json'
  import AddressGAData from '../../../static/addressData/AddressGA.json'
//  var datas = [
//    {
//      id:'1',
//      money:2450.00,
//      name:'董事长',
//      explain:'后台能获得不同等级的会员说明，111'
//    },{
//      id:'2',
//      money:1350.00,
//      name:'经理',
//      explain:'后台能获得不同等级的会员说明，222'
//    },{
//      id:'3',
//      money:520.00,
//      name:'会员',
//      explain:''
//    },
//  ],totalMoney=350.23
  export default {
    name: '',
    components: {
      XInput,
      Group,
      XButton,
      Cell,
      Toast,
      cookie,
      Selector,
      Datetime,
      XAddress,
      payMent: payment
    },
    data () {
      return {
        isNum:function (value) {
          let reg = /([A-Za-z](\d{6})(\(|\（)\w(\)|\）))|(\d{6})(\d{4})(\d{2})(\d{2})(\d{3})([0-9]|X|x)/g
          let valid = reg.test(value)
          return{
            valid:valid,
            msg:'身份證格式有誤，港澳請注意英文括號'
          }
        },
        disabled:false,
        Updata:'',
        charge_money:'',//繳費金額
        total_money:'',
        order_id:0,//繳費id
        u_mobilephone:'',
        cid: '',
        cids: '',
        associationList: [],
        value: 0,
        loading_show: false,
        inputList: [],
        username: '',
        username_en: '',
        address: '',
        address_phone: '',
        ID_number: '',
        ID_placeholder: '請輸入身份證號碼',
        ID_length: 18,
        ID_mask: '',
        age:'',
        birth_date: '1991-01-01',
        email:'',
        wechat:'',//微信號
        upper_level_id:'',//推荐会员编号
        sex: '1',
        sex_list: [{key: '1', value: '男'}, {key: '2', value: '女'}],
        voter: '1',//是否選民
        voter_list: [{key: '1', value: '是'}, {key: '2', value: '否'}],
        arr: [],
        post_list: [{id: '1', post_name: '董事长'}, {id: '2', post_name: 'CEO'}],
        post_id: '1',
        apply_state: 0,//1未申請過，2已經申請過，3本协会未开通入会申请，4已加入全部协会
        status: '',//審核狀態 1審核通過2待審核 3審核失敗
        is_charge: false,//是否收费
        charge_money: '0',//收费金额
        association_name: '',//協會名稱
        charge_explain: '',//会费说明
        reason: '',//不通過原因
        url_pay_state: 0,
        url_cid: 0,
        area: '2',//區域，默認港澳
        area_list: [{key: '1', value: '中國大陸'}, {key: '2', value: '港澳地區'}],
        title: '地址選擇',
        addressvalue: [],
        area_value: [],
        addressData: [],
        addressDataGA: [],
        showAddress: false
      }
    },
    mounted () {
      let that = this, quid = document.cookie.indexOf('quid=')
        that.getData()
      if(quid==-1){
        that.disabled=false
      }else{
        that.upper_level_id=cookie.get('quid')
        that.disabled=true
      }
    },
    methods: {
//      paybtns(){
//        this.pay_btn()
//      },
      onShadowChange (ids, names) {
        console.log(names)
        this.area_value = names
      },
      logHide () {
      },
      change_date(el){
        this.birth_date = el
      },
      Change_sex(el){
        this.sex = el
      },
      Change_voter(el){
        this.voter = el
      },
      Change_area(el){
        var that = this
        this.area = el
        if (el == '1') {
          that.addressData = ChinaAddressData
          that.addressvalue = ['北京市', '市轄區', '東城區']
          that.ID_placeholder = '請輸入身份證號碼',
          that.ID_length = 18
          that.ID_number=''
          that.ID_mask = '99999999999999999S'
        } else {
          that.addressData = AddressGAData
          that.addressvalue = ['香港', '香港島', '中西區']
//          that.ID_placeholder = '1位英文+4位數字',
          that.ID_placeholder = '如E123456(S)'
          that.ID_length = 10
          that.ID_number=''
//          that.ID_mask = 'A999999(S)'
        }
      },
      onChange_post(el){
        this.post_value = el
      },
      onChange(el){
//        var that = this
//        if (cookie.get('cid') == 1) {
//          that.getData(el)
//        } else {
//          that.cid = cookie.get('cid')
//        }

      },
      getData(){
        var that = this;
        that.$api.userRegister({

        })
          .then(response => {
            that.$dialog.loading.close()
            let data = response.data.data
            console.log(response)
            if (response.data.state == 1) {
                that.u_mobilephone = data.u_mobilephone
                that.charge_money = data.renew
            }

          })
          .catch(response => {
            that.$dialog.loading.close()
            that.$dialog.toast({
              mes: response.data.msg,
              timeout: 1500,
              icon: 'error',
              callback: () => {
              }
            })
          })
      },
      submit_btn(){
        var that = this
        if (that.username == '') {
          that.$dialog.toast({
            mes: '姓名中文不能爲空！',
            timeout: 1500,
            icon: 'error'
          })
          return false
        }
        if (that.username_en == '') {
          that.$dialog.toast({
            mes: '姓名英文不能爲空！',
            timeout: 1500,
            icon: 'error'
          })
          return false
        }
        if (that.ID_number == '') {
          that.$dialog.toast({
            mes: '身份證號碼不能爲空！',
            timeout: 1500,
            icon: 'error'
          })
          return false
        }
        if (that.address == '') {
          that.$dialog.toast({
            mes: '通訊地址不能爲空！',
            timeout: 1500,
            icon: 'error'
          })
          return false
        }
        let reg = /([A-Za-z](\d{6})(\(|\（)\w(\)|\）))|(\d{6})(\d{4})(\d{2})(\d{2})(\d{3})([0-9]|X|x)/g
        if(!reg.test(that.ID_number)){
          that.$dialog.toast({
            mes: '身份證格式有誤',
            timeout: 1500,
            icon: 'error'
          })
          return false
        }
        if (that.upper_level_id == '') {
          that.$dialog.toast({
            mes: '推薦會員編號不能爲空！',
            timeout: 1500,
            icon: 'error'
          })
          return false
        }
        this.loading_show = true
        that.$api.userRegister({
          upper_level_id:that.upper_level_id,
          username_en: that.username_en,
          username_zh: that.username,
          sex: that.sex,
          birth_date: that.birth_date,
          ID_number: that.ID_number,
          email:that.email,
          area: that.area,
          address: that.address,
          area_value: that.area_value,
          wechat_number:that.wechat
//          tel_phone:that.address_phone
        })
          .then(response => {
            if (response.data.state == 1) {
              console.log(response)
              that.loading_show = false
//              that.pay_btn(response.data.data.money)=
              that.pay_btn()
            } else {
              that.$dialog.toast({
                mes: response.data.msg,
                timeout: 1500,
                icon: 'error',
                callback: () => {
                  this.loading_show = false
                }
              })
            }

          })
          .catch(response => {
            that.$dialog.toast({
              mes: '請求失敗',
              timeout: 1500,
              icon: 'error',
              callback: () => {
                this.loading_show = false
              }
            })
          })
      },
      getMoney(){
        let that = this;
        that.$api.orderIndex({

        }).then(response=>{
          console.log(response)
          if (response.data.state == 1) {
            that.charge_money = response.data.data.money
            that.order_id = response.data.data.order_id
            that.pay_btn()
          }else{
            that.$dialog.toast({
              mes: response.data.msg,
              timeout: 1500,
              icon: 'error'
            })
          }
        })
          .catch(response=>{
            that.$dialog.toast({
              mes: '請求失敗',
              timeout: 1500,
              icon: 'error'
            })
          })
      },
      pay_btn(){
        var that = this
//        console.log(that.cid, that.post_id)
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
               that.$router.push('/Home')
            }
          })
        }else if(el==2){
          that.$dialog.toast({
            mes: '支付失敗',
            timeout: 1500,
            icon: 'error',
            callback: () => {

            }
          })
        }else{
          that.$router.push('/Home')
        }

      },
    },
    beforeCreate () {
      document.querySelector('body').setAttribute('style', 'background-color:#fff;')
    },
    beforeDestroy () {
      document.querySelector('body').removeAttribute('style')
    }
  }
</script>
<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="less" type="text/less">
    #applyMember {
        background: #fff;
        .vux-x-input.disabled .weui-input{
            text-fill-color: #333;
            -webkit-text-fill-color: #333;
            opacity: 1;
        }
        .phone {
            .vux-x-input.disabled .weui-input{
                text-fill-color: #333;
                -webkit-text-fill-color: #333;
                opacity: 1;
            }
        }
        input {
            font-size: .3rem;
        }
        .weui-select{
            height: auto;
            line-height: normal;
            font-size: .3rem;
        }
        select{
            color: #333;
        }
        .weui-cells p{
            font-size: .32rem;
            width: 120px;
        }
        .vux-datetime{
            color: #333;
        }
        .vux-cell-value{
            color: #333;
            font-size: .3rem;
        }
        .weui-cell__hd .weui-label{
              width: 120px;
          }
        .weui-label{
            font-size: .34rem;
        }
        .weui-cell__ft{
            text-align: left;
        }
        .vux-popup-picker-select-box{
            padding-left: 45px;
        }
        .vux-cell-placeholder{
            font-size: .3rem;
        }
    }
</style>
<style scoped lang="less" type="text/less">
    .xin {
        position: relative;

        span {
            position: absolute;
            left: -10px;
            top: 15px;
            color: #ff0000;
        }

    }
    #app .weui-cell{
        padding: 15px;
    }
    #applyMember {
        .tips{
            font-size: .23rem;
            padding-top: 6px;
            padding-left: 10px;
            .red{
                color: #ff0000;
            }
        }
        .apply_con {
            padding: 0px 0px 40px 0;
            .title {
                font-size: .4rem;
                padding: 0 15px 40px 15px;
                text-align: center;
                color: #333;
                font-weight: 600;
            }
            .content{
                /*.pleft0{*/
                    /*padding-left: 0px;*/
                /*}*/
                padding: 0 15px;
            }

        }
        input {
            font-size: .30rem;
        }
        .submit_btn{
            margin: 30px auto 0 auto;
        }
    }
</style>
