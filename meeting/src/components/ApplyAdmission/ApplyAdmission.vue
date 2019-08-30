<template>
    <div class="apply_admission">
        <!--<img src="static/img/ic_apply_development.png" alt="">-->
        <div class="apply_head" v-if="cids==1">
            <group>
                <selector title="商會" v-model="value" :value-map="['cid', 'property_name']" :options="associationList"
                          @on-change="onChange"></selector>
            </group>
        </div>
        <div class="apply_head" v-if="cids!=1">
        </div>
        <div class="apply_con" :class="cids==1?'':'top40'">
            <div class="apply_no" v-if="apply_state==1">
                <div class="title"><h3>入會申請</h3></div>
                <div class="content">
                    <group>
                        <div class="xin"><span>*</span>
                            <x-input title="姓名中文" required v-model="username" class="pleft0" name="username"
                                     placeholder="請輸入姓名中文" type='text'></x-input>
                        </div>
                        <div class="xin"><span>*</span>
                            <x-input title="姓名英文" required v-model="username_en" class="pleft0" name="username_en"
                                     placeholder="請輸入姓名英文" type='text'></x-input>
                        </div>
                        <!--<x-input title="性別" v-model="sex" name="sex" placeholder="請輸入性別" type='text'></x-input>-->
                        <selector title="性別" v-model="sex" :options="sex_list" @on-change="Change_sex"></selector>
                        <div class="xin"><span>*</span>
                            <selector title="職  務" v-model="post_id" :value-map="['id', 'post_name']"
                                      :options="post_list" @on-change="onChange_post"></selector>
                        </div>
                        <div class="xin"><span>*</span>
                            <selector title="選  民" v-model="voter" :options="voter_list"
                                      @on-change="Change_voter"></selector>
                        </div>
                        <!--<x-input title="出身日期" v-model="address" name="address" placeholder="請輸入出身日期" type='text'></x-input>-->
                        <div class="xin"><span>*</span>
                            <datetime
                                    v-model="birth_date"
                                    @on-change="change_date"
                                    title="出生日期"
                                    :min-year="1900"
                                    :max-year="2050">
                            </datetime>
                        </div>
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
                            <x-input title="詳細地址" v-model="address" required class="pleft0" name="address"
                                     placeholder="請輸入詳細地址" type='text'></x-input>
                        </div>
                        <div class="xin"><span>*</span>
                            <x-input title="身份證號" v-model="ID_number" name="ID_number" :mask="ID_mask" :max="ID_length"
                                     :placeholder="ID_placeholder"
                                     type='text' required></x-input>
                        </div>
                        <!--<x-input title="*手提電話" v-model="address" class="pleft0"  name="address" placeholder="請輸入手提電話" type='text'></x-input>-->
                        <x-input title="住宅電話" v-model="address_phone" name="address_phone" placeholder="請輸入住宅電話"
                                 type='text'></x-input>
                        <x-input v-for="(item,index) in inputList" v-model="arr[index]" :key="index" :title='item'
                                 :placeholder="'請輸入'+item" type='text'>
                        </x-input>
                    </group>
                </div>
                <div class="submit_btn">
                    <x-button class="Btn_Login" @click.native="submit_btn" type="primary" :show-loading='loading_show'
                              :disabled="loading_show" text="提交申請"></x-button>
                    <div class="back_btn" @click="back_btn"><img src="/static/img/ic_return.png"
                                                                 alt=""><span>返回主頁</span></div>
                </div>
            </div>
            <div class="apply_yes" v-if="apply_state==2">
                <div class="examine_success" v-if="status==1">
                    <div class="charge" v-if="is_charge">
                        <h3>{{association_name}}</h3>
                        <div class="pay_tit">繳納會費：</div>
                        <div class="pay_money">
                            HK$&nbsp;{{charge_money}}
                        </div>
                        <div class="explain_tit">會費說明：</div>
                        <div class="explain_content">
                            {{charge_explain}}
                        </div>
                        <div class="pay_btn">
                            <x-button @click.native="pay_btn" type="primary" :show-loading='loading_show'
                                      :disabled="loading_show" text="繳    費"></x-button>
                        </div>
                        <payMent ref="showState" :payMoney="charge_money" @goCharge="payment"></payMent>
                    </div>
                    <div class="charge_no" v-else>
                        <img class="apply_img" src="/static/img/ic_apply_success.png" alt="">
                        <div class="examine_title">您已加入</div>
                        <div class="examine_title" style="color: #3D82D9">{{association_name}}</div>
                        <div class="examine_tit">(可在會議活動中查看商會相關活動)</div>
                    </div>
                </div>
                <div class="examine" v-if="status==2">
                    <img class="apply_img" src="/static/img/ic_apply_examination.png" alt="">
                    <div class="examine_title">您已提交申請表，請耐心等待審核</div>
                    <div class="examine_tit">（工作人員將於3個工作日內完成審核）</div>
                </div>
                <div class="examine_failed" v-if="status==3">
                    <h3>您提交的申請未能通過審核</h3>
                    <div class="no_through_tit">原因</div>
                    <div class="no_through_con">
                        {{reason}}
                    </div>
                    <div class="modify_btn">
                        <x-button @click.native="modify_btn" type="primary" :show-loading='loading_show'
                                  :disabled="loading_show" text="修改申請表"></x-button>
                    </div>
                </div>
                <div class="back_btn" @click="back_btn"><img src="/static/img/ic_return.png" alt=""><span>返回主頁</span>
                </div>
            </div>
            <div class="no_apply" v-if="apply_state==3">
                <img class="apply_img" src="/static/img/ic_apply_open.png" alt="">
                <div class="examine_title">您要加入的商會暫未開通入會申請</div>
                <div class="examine_tit">（請聯繫該商會相關負責人員）</div>
            </div>
            <div class="no_apply" v-if="apply_state==4"><!--已加入全部协会-->
                <img class="apply_img" src="/static/img/ic_apply_whole.png" alt="">
                <div class="examine_title">您已加入全部协会</div>
            </div>
        </div>
    </div>
</template>
<script>
  import { XInput, Group, XButton, Cell, Toast, cookie, Selector, Datetime, XAddress } from 'vux'
  import payment from '../common/payment.vue'
  import { Payconfig } from '../../../static/js/wxpay.js'
  import ChinaAddressData from '../../../static/ChinaAddress.json'
  import AddressGAData from '../../../static/AddressGA.json'
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
        ID_placeholder: '',
        ID_length: 18,
        ID_mask: '',
        birth_date: '2000-01-01',
        sex: '1',
        sex_list: [{key: '1', value: '男'}, {key: '2', value: '女'}],
        voter: '1',//是否選民
        voter_list: [{key: '1', value: '是'}, {key: '2', value: '否'}],
        arr: [],
//              post_show:false,
        post_list: [],
        post_id: 0,
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
//        addressvalue: ['香港', '香港島', '中西區'],
        addressvalue: [],
        area_value: [],
        addressData: [],
        addressDataGA: [],
        showAddress: false
      }
    },
    mounted () {
      document.querySelector('body').setAttribute('style', 'background:#fff')
      var that = this
      var url_pay_state = this.$route.query.pid, url_cid = this.$route.query.cids
      if (url_pay_state == 1) {
        that.$dialog.toast({
          mes: '支付成功！',
          timeout: 1500,
          icon: 'success',
          callback: () => {
            that.is_charge = false
          }
        })
      } else if (url_pay_state == 2) {
        that.$dialog.toast({
          mes: '支付失敗！',
          timeout: 1500,
          icon: 'error',
          callback: () => {
            that.is_charge = true
          }
        })
      }
      that.url_pay_state = url_pay_state
      that.url_cid = url_cid
      if (cookie.get('cid') == 1) {
        that.getAdmissionList(cookie.get('cid'))
      } else {
        that.cid = cookie.get('cid')
        that.getData(cookie.get('cid'))
      }
    },
    methods: {
      onShadowChange (ids, names) {
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
          that.ID_mask = '99999999999999999S'
        } else {
          that.addressData = AddressGAData
          that.addressvalue = ['香港', '香港島', '中西區']
          that.ID_placeholder = '1位英文+4位數字',
            that.ID_length = 5
          that.ID_mask = 'A9999'
        }
      },
      onChange_post(el){
        this.post_value = el
//              console.log(this.post_value)
      },
      onChange(el){
        var that = this
        if (cookie.get('cid') == 1) {
//                that.cid = el
          that.getData(el)
        } else {
          that.cid = cookie.get('cid')
        }

      },
      back_btn(){
        this.$router.push('/MyInfo')
      },
      getAdmissionList(cid){
        var that = this
        that.api.admissionList({
          cid: cid
        })
          .then(response => {
//            console.log(response.data.data)
            let list = response.data.data
            that.associationList = list
            if (list === undefined || list.length == 0) {
              that.apply_state = 4
            } else {
              that.cids = 1//显示选择协会
              if (that.url_cid == 0) {
                that.value = response.data.data[0].cid
              } else {
                that.value = that.url_cid
              }
            }

          })
          .catch(response => {

          })
      },
      getData(cid){
        this.$dialog.loading.open('正在加載中···')
        var that = this, cids
        that.cid = cid
        cids = cid
//        console.log(that.url_cid, cids)
        that.api.admissionIndex({
          cid: cids
        })
          .then(response => {
            that.$dialog.loading.close()
            console.log(response)
            const data = response.data
            if (data.state == 1) {//未申請入會
              if (data.data.subscription_apply == 1) {
                that.addressvalue = []
                that.apply_state = 1
                that.inputList = data.data.field//自定义字段
                that.address = data.data.address//地址
                that.arr = []//自定义字段名称
                that.username = data.data.username
                that.username_en = data.data.username_en
//                that.birth_date = data.data.birth_date
//                that.sex = data.data.sex
//                that.voter = data.data.is_voter
                that.addressvalue = data.data.area_value
                that.addressData = AddressGAData
                that.post_list = data.data.post
                that.post_id = data.data.post[0].id
                that.loading_show = false
                if (data.data.sex == '') {
                  that.sex = '1'
                } else {
                  that.sex = data.data.sex
                }
                if (data.data.is_voter == '') {
                  that.voter = '1'
                } else {
                  that.voter = data.data.is_voter
                }
                if (data.data.birth_date == '') {
                  that.birth_date = '2000-01-01'
                } else {
                  that.birth_date = data.data.birth_date
                }

              } else if (data.data.subscription_apply == 2) {
                that.apply_state = 3
              }
            } else if (data.state == 2) {//已申請入會
              that.apply_state = 2
              const status = data.data.status, is_charge = data.data.is_charge, is_payment = data.data.is_payment
//                    const status = data.data.status,is_charge =1,is_payment =data.data.is_payment
//                    var status = 3 , is_charge = 2
              that.status = status

              if (status == 1) {//審核通過
                that.association_name = data.data.association_name
                if (is_charge == 2) {
                  if (is_payment == 2) {//未支付
                    that.is_charge = true
                    that.charge_money = data.data.charge_money
                    that.charge_explain = data.data.charge_explain
                    that.post_id = data.data.post_id
                  } else {//已支付
                    that.is_charge = false
                  }
                } else {
                  that.is_charge = false
                }
              } else if (status == 2) {//待審核

              } else if (status == 3) {//審核未通過
                that.reason = data.data.reason
              }

            } else {
              that.$dialog.loading.close()
              that.$dialog.toast({
                mes: response.data.msg,
                timeout: 1500,
                icon: 'error',
                callback: () => {
                }
              })
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
        console.log(that.voter, that.area, that.area_value, that.address)
        console.log(that.cid, that.username_en, that.address_phone, that.ID_number, that.birth_date, that.sex, that.username, that.address, that.area, that.area_value)
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
        this.loading_show = true
        that.api.admissionApply({
          cid: that.cid,
          username_en: that.username_en,
          address_phone: that.address_phone,
          ID_number: that.ID_number,
          birth_date: that.birth_date,
          sex: that.sex,
          is_voter: that.voter,
          username: that.username,
          area: that.area,
          address: that.address,
          area_value: that.area_value,
          arr: that.arr,
          post_id: that.post_id
        })
          .then(response => {
            if (response.data.state == 1) {
              console.log(response)
              that.$dialog.toast({
                mes: response.data.msg,
                timeout: 1500,
                icon: 'success',
                callback: () => {
                  that.getData(that.cid)
                  that.loading_show = false
                }
              })
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
      pay_btn(){
        var that = this
//        console.log(that.cid, that.post_id)
        that.$refs.showState.showChargeState()
      },
      modify_btn(){
        var that = this
        this.loading_show = true
        that.api.admissionDetail({
            cid: that.cid
          })
          .then(response => {
            console.log(response)
            if (response.data.state == 1) {
              that.addressvalue = []
              var data = response.data.data
              that.apply_state = 1
              that.address = data.address
              that.address_phone = data.address_phone
              that.arr = data.value
              that.username = data.username
              that.username_en = data.username_en
              that.ID_number = data.ID_number
              that.birth_date = data.birth_date
              that.sex = data.sex
              that.voter = data.is_voter
              that.post_list = data.post
              that.post_id = data.post_id
              that.inputList = data.field
              that.addressvalue = data.area_value
              that.addressData = data.area_list
              that.loading_show = false
//              if (data.post === undefined || data.post.length == 0) {
//                that.post_show = false
//              } else {
//                that.post_show = true
//                that.post_list = data.post
//                that.post_id = data.post_id
//              }
            } else {
              that.$dialog.toast({
                mes: response.data.msg,
                timeout: 1500,
                icon: 'error',
                callback: () => {
                  that.$dialog.loading.close()
                  that.loading_show = false
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
                that.$dialog.loading.close()
                that.loading_show = false
              }
            })
          })
      },
      payment(el){
        let that = this, url = encodeURIComponent(location.href)
        that.loading_show = true
        that.api.rechargePay({
            type: el,
            url: url,
            payment_type: 2,
            cid: that.cid,
            post_id: that.post_id
          })
          .then(response => {
            let data = response.data
            console.log(response, data.data)
            if (data.state != 1) {
              that.$dialog.toast({
                mes: response.data.msg,
                timeout: 1500,
                callback: () => {
                  that.loading_show = false
                }
              })
            } else {
              if (el == '0') {
                window.location.href = data.data
              } else if (el == '1') {
                let payData = data.data.pay_info

                function onBridgeReady () {
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
                        that.$dialog.toast({
                          mes: '支付成功',
                          timeout: 1500,
                          icon: 'error',
                          callback: () => {
                            that.$router.go(0)
                            that.loading_show = false
                          }
                        })
                      }else{
                        that.$dialog.toast({
                          mes: '支付失敗',
                          timeout: 1500,
                          icon: 'error',
                          callback: () => {
                            that.loading_show = false
                          }
                        })
                      }
                    })
                }

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
              }
//              else {
//                let datas = data.data.sign
//                //香港微信钱包支付
//                Payconfig(datas.appId, datas.timestamp, datas.noncestr, datas.signature, payData)
//                wx.ready(() => {
//                  let payInfo = {
//                    'appId': datas.appId,// 公众号的唯一标识，
//                    'timestamp': datas.timeStamp,//生成签名的时间戳
//                    'nonceStr': datas.nonceStr, // 商户生成的随机字符串
//                    'package': datas.package,//统一下单接口返回的 prepay_id 参数值，并附加商户归属地信息
//                    'signType': 'MD5',//目前仅支持 SHA1
//                    'paySign': datas.paySign,//签名
//                    'success': function (res) {
//                      //支付成功后的回调函数
//                      console.log('成功')
//                    },
//                    'fail': function (res) {
//                      //支付失败时被调用 var msg = res.err_msg;
//                      console.log('失败', res.err_msg)
//                    }
//                  }
//                  wx.invoke('getH5PrepayRequest', payInfo)
//                })
//              }

            }
          }).catch(response => {
          that.$dialog.toast({
            mes: '請求失敗',
            timeout: 1500,
            icon: 'error',
            callback: () => {
              that.loading_show = false
            }
          })
        })
      }
    },
    beforeCreate () {
      document.body.setAttribute('class', '')
    },
    beforeDestroy () {
      document.querySelector('body').setAttribute('style', '')
    }
  }
</script>
<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="less" type="text/less">
    #app .apply_admission .vux-datetime {
        color: #333;
    }
    #app .apply_admission {

        .apply_head {

            .weui-cell__bd:after {
                content: " ";
                display: inline-block;
                border-top: 5px solid transparent;
                border-right: 5px solid #939393;
                border-bottom: 6px solid transparent;
                -webkit-transform: rotate(-90deg);
                transform: rotate(-90deg);

            }

            .weui-cell__hd:after {
                content: " ";
                display: inline-block;
                border-right: 1px solid #dcdcdc;
                position: absolute;
                top: 15px;
                left: 60px;
                height: 22px;
            }

            .weui-cell_select {
                padding: 5px 15px;
            }

        }
        .apply_con {

            .back_btn {
                text-align: center;
                color: #3D82D9;
                margin-top: 20px;
                font-size: .65rem;

                img {
                    width: 15px;
                    position: relative;
                    margin-right: 3px;
                    top: -1px;
                }

            }
        }
        .top40 {
            padding-top: 40px;
        }
    }
    #app .apply_admission .weui-cell:before {
        left: 0;
    }
    #app .apply_admission .vux-datetime-value {
        text-align: left;
        padding-left: 43px;
    }
    .apply_admission {
        /*padding-bottom: 200px;*/
    }
    #app .apply_admission .weui-input::placeholder {
        color: #c9c9c9;
    }
    #app .apply_admission .weui-input {
        color: #666;
        font: inherit;
        padding-left: 10px;
    }
    #app .apply_admission .content .weui-label {
        width: 5em;
    }
    #app .apply_admission .apply_head .weui-label {
        width: 55px;
    }
    #app .apply_admission .weui-select {
        color: #333;
    }
    #app .apply_admission .apply_con .weui-cell_select .weui-cell__bd:after {
        right: 5px;
    }
    #app .apply_admission .weui-cells {
        overflow: inherit;
    }
    #app .apply_admission .content .weui-select {
        padding-left: 10px;
        color: #666;
    }
    #app .apply_admission .content .vux-cell-value {
        color: #666;
    }
    #app .apply_admission select {
        font: inherit;
    }
    #app .apply_admission .content .weui-cell__hd {
        width: 6em;
    }
    #app .apply_admission .content .vux-cell-box {
        padding: 15px 0px;
        text-align: left;
    }
    #app .apply_admission .content .vux-cell-box:not(:first-child):before {
        left: 0;
    }
    #app .apply_admission .content .vux-cell-box .weui-cell_access {
        padding: 0px;
    }
    #app .apply_admission .content .vux-cell-box .weui-cell_access .vux-popup-picker-select {
        padding-left: 8px;
    }
    #app .weui-cell_access .weui-cell__ft:after {
        right: 5px;
    }
    /*body #app{*/
    /*background: #fff;*/
    /*}*/
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
    .apply_admission {
        background: #fff;

        .apply_img {
            width: 250px;
            position: relative;
            top: 30px;
        }

        .apply_head {
            position: fixed;
            width: 90%;
            z-index: 2;
            left: 5%;
            top: 12px;
            box-shadow: 0px 1px 6px rgba(0, 0, 0, 0.1);
        }

        .apply_con {
            padding-top: 100px;
            width: 83%;
            margin: 0 auto;
            color: #333;
        }

        .no_apply {
            text-align: center;

            /*margin: 2rem auto 3rem auto;*/
            .examine_tit {
                font-size: .6rem;
                color: #666;
                padding-top: 5px;
            }

            .examine_title {
                font-weight: 600;
            }

        }
        .apply_yes {
            margin: 0 auto;

            .examine {
                /*margin: 9rem auto 11rem auto;*/
                text-align: center;

                .examine_tit {
                    font-size: .6rem;
                    color: #666;
                }

                .examine_title {
                    font-weight: 600;
                }

            }
            .examine_success {
                margin-top: -30px;

                .charge {
                    padding: 1rem 0px;
                    font-size: .75rem;

                    h3 {
                        text-align: center;
                        font-size: 1rem;
                    }

                    .pay_tit {
                        margin: 40px auto 10px auto;
                    }

                    .explain_tit {
                        margin: 20px auto 10px auto;
                    }

                    .explain_content, .pay_money {
                        margin: 5px auto 10px auto;
                        /*padding-left: 30px;*/
                    }

                    .pay_money {
                        font-size: 1.3rem;
                        font-weight: bold;
                        color: #F7B500;
                        /*border-bottom: 1px solid #DCDCDC;*/
                    }

                    .explain_content {
                        font-size: .65rem;
                        color: #666;
                    }

                    .pay_btn {
                        padding-top: 20px;
                    }

                }
                .charge_no {
                    text-align: center;
                    /*margin: 9rem auto 11rem auto;*/
                    line-height: 30px;

                    .examine_tit {
                        font-size: .6rem;
                        color: #666;
                    }

                    .examine_title {
                        font-weight: 600;
                    }

                }
            }
            .examine_failed {
                margin: 3rem auto;

                h3 {
                    text-align: center;
                    font-size: .9rem;
                }

                .no_through_tit {
                    margin-top: 30px;
                    font-size: .7rem;
                    color: #333;
                }

                .no_through_con {
                    font-size: .6rem;
                    /*padding-left: 30px;*/
                    line-height: 30px;
                    color: #666;
                }

                .modify_btn {
                    margin-top: 60px;
                }

            }
        }
        .apply_no {
            text-align: center;
        }

        .title {
            padding-bottom: 1rem;
            font-size: 1rem;

            h3 {
                font-weight: bold;
            }

        }
        .content {

            /*border-top:1px solid #D9D9D9;*/
            .weui-cell {
                padding: 15px 0px;
                text-align: left;

                .weui-label {
                    color: #333;
                }

                .weui-input {
                    color: #666;
                }

            }
        ;
            .vux-selector {
                padding: 4px 0px;

                .weui-select {
                    padding-left: 40px;
                }

            }

            .weui-cell.pleft0 {
                /*padding-left: 3px;*/
            }

        }
        .submit_btn {
            padding: 20px 0px 60px 0px;
        }

    }
</style>
