<template>
    <div id="active_detail">
        <!--<div class="no_back">-->
        <!--<x-header :left-options="{preventGoBack: true}" @on-click-back="go_back"></x-header>-->
        <!--</div>-->
        <div class="content">
            <p class="html_con" v-html="content">
                {{content}}
            </p>
            <div v-if="status==1&&is_charge==2" class="content_bottom">
                <!--<h4>回   執</h4>-->
                <div class="content_bottom_left">
                    <yd-radio-group color='#4285F4' v-model="is_attend" size="15" class="charge_box">
                        <yd-radio val="1">出席并繳納<span class="money_color">HK${{charge_money}}</span></yd-radio>
                        <yd-radio val="2">無暇出席</yd-radio>
                    </yd-radio-group>
                    <p class="p" :style="{'display':receipt_time==''? 'none':'inline-block'}">
                        （請於{{receipt_time}}之前提交信息）</p>
                </div>
                <x-button class="content_bottom_right" mini :data-value="is_attend" :data-charge="is_charge"
                          :data-logid="log_id" :disabled="loading_show" :data-id="active_id" @click.native="submit">提 交
                </x-button>
                <payMent ref="state" :payMoney="charge_money" @goCharge="payment"></payMent>
            </div>
            <div v-if="status==1&&is_charge==1" class="content_bottom">
                <!--<h4>回   執</h4>-->
                <div class="content_bottom_left">
                    <yd-radio-group color='#4285F4' v-model="is_attend">
                        <yd-radio val="1">出席</yd-radio>
                        <yd-radio val="2">無暇出席</yd-radio>
                    </yd-radio-group>
                    <p class="p" :style="{'display':receipt_time==''? 'none':'inline-block'}">
                        （請於{{receipt_time}}之前提交信息）</p>
                </div>
                <x-button class="content_bottom_right" mini :data-value="is_attend" :data-logid="log_id"
                          :data-id="active_id" :disabled="loading_show" @click.native="submit">提 交
                </x-button>
            </div>
            <div v-if="status==2&&is_charge==2&&is_attend==1" class="content_bottom">
                <!--<h4>回   執</h4>-->
                <div class="confirm_txt">確認出席已支付<span class="money_color">HK${{charge_money}}</span></div>
            </div>
            <div v-if="status==2&&is_charge==2&&is_attend==2" class="content_bottom">
                <!--<h4>回   執</h4>-->
                <div class="content_bottom_left">
                    <div v-if="is_attend==1">出席并繳納<span class="money_color">HK${{charge_money}}</span></div>
                    <div v-if="is_attend==2">無暇出席</div>
                    <p class="p" :style="{'display':receipt_time==''? 'none':'inline-block'}">
                        （請於{{receipt_time}}之前提交信息）</p>
                </div>
                <x-button class="modify_btn content_bottom_right" mini :data-value="is_attend" :data-logid="log_id"
                          :data-id="active_id" :disabled="loading_show" @click.native="modify">修 改
                </x-button>
            </div>
            <div v-if="status==2&&is_charge==1" class="content_bottom">
                <!--<h4>回   執</h4>-->
                <div class="content_bottom_left">
                    <div v-if="is_attend==1">确认出席</div>
                    <div v-if="is_attend==2">無暇出席</div>
                    <p class="p" :style="{'display':receipt_time==''? 'none':'inline-block'}">
                        （請於{{receipt_time}}之前提交信息）</p>
                </div>
                <x-button class="modify_btn content_bottom_right" mini :data-value="is_attend" :data-logid="log_id"
                          :data-id="active_id" @click.native="modify">修 改
                </x-button>
            </div>
        </div>
    </div>
</template>
<script>
  import { XHeader, cookie, Checklist, XButton, Loading, } from 'vux'
  import payment from '../common/payment.vue'
  import { Payconfig } from '../../../static/js/wxpay.js'
  export default {
    components: {
      XHeader,
      cookie,
      Checklist,
      XButton,
      payMent: payment
    },
    data () {
      return {
        active_id: 0,
        content: '',
        is_attend: '',
        status: 3,
        log_id: '',
        receipt_time: '',
        is_charge: 0,
        charge_money: '',
        loading_show: false,
        payId: null,
        cid:''
      }
    },
    mounted(){
      console.log('id', this.$route.query.id)
      var that = this, active_id = this.$route.query.id,cid = this.$route.query.cid
      that.active_id = active_id
      that.cid = cid
      that.content_list(active_id)
    },
//      beforeRouteLeave(to, from, next) {
//        var to_path = to.path.toLocaleLowerCase().split('/')[1]
//          console.log(to_path)
//        if (to_path == "meetingactive") {
//          to.meta.keepAliveList = true;
//        } else {
//          to.meta.keepAliveList = false;
//        }
//        next();
//      },
    methods: {
      content_list(id){
        var that = this
        this.$dialog.loading.open('正在加載中···')
        that.api.meetingDetail({
            id: id
          }).then(function (response) {
          that.$dialog.loading.close()
          console.log(response)
          var data = response.data.data
          if (response.data.state == 1) {
            that.content = data.content
            that.is_attend = data.is_attend
            that.status = data.status
            that.log_id = data.log_id
            that.receipt_time = data.receipt_time
            that.is_charge = data.is_charge
            that.charge_money = data.charge_money
//                        that.$dialog.toast({
//                            mes: response.data.msg,
//                            timeout: 1500,
//                            icon: 'success'
//                        });
          } else {
            that.$dialog.toast({
              mes: response.data.msg,
              timeout: 1500,
              icon: 'error'
            })
          }

        })
          .catch(function (response) {
            that.$dialog.loading.close()
            that.$dialog.toast({
              mes: response.data.msg,
              timeout: 1500,
              icon: 'error'
            })
          })
      },
      change (val, label) {
        console.log('change', val, label)
        this.radioValue = val
      },
      submit(el){
        var that = this, data = el.target.dataset, id = data.id, is_attend = data.value, log_id = data.logid,
          charge = data.charge
//              console.log(el.target.dataset.value,el.target.dataset.id,el.target.dataset.logid,el.target.dataset.charge)
        if (is_attend == 1 && charge == 2) {
          that.payId = el.target.dataset.id
          that.$refs.state.showChargeState()
        } else {
          that.api.meetingModify({
              id: el.target.dataset.id,
              log_id: el.target.dataset.logid,
              is_attend: el.target.dataset.value
            }).then(response => {
            console.log(response)
            that.loading_show = false
            if (response.data.state == 1) {
              that.$dialog.toast({
                mes: response.data.msg,
                timeout: 1500,
                icon: 'success',
                callback: () => {
//                            that.$router.back(-1)
                  that.$router.push('/MeetingActive')
                }
              })
            } else {
              that.$dialog.toast({
                mes: response.data.msg,
                timeout: 1500,
                icon: 'error'
              })
            }
          }, response => {
            that.$dialog.toast({
              mes: response.data.msg,
              timeout: 1500,
              icon: 'error'
            })
            that.loading_show = false
          })
        }
      },
      modify(el){
        var that = this
        that.status = 1
      },
//          go_back(){
//              this.$router.push('/MeetingActive/0')
//          }
      payment(el){
        let that = this, url = encodeURIComponent(location.href)
        that.loading_show = true
        that.api.rechargePay({
            type: el,
            id: that.payId,
            cid: that.cid,
            url: url
          })
          .then(response => {
            let data = response.data
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
                            that.$router.push('/MeetingActive')
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
    destroyed () {
      if (cookie.get('select_id') == 1) {

      } else {
        cookie.remove('select_id')
      }
    },
    beforeRouteEnter (to, from, next) {
      var u = navigator.userAgent
      var isiOS = !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/) //ios终端
      // XXX: 修复iOS版微信HTML5 History兼容性问题
      if (isiOS && to.path !== location.pathname) {
        // 此处不可使用location.replace
        location.assign(to.fullPath)
      } else {
        next()
      }
    }
  }
</script>
<style scoped>
    .html_con >>> img {
        max-width: 100%;
        height: auto;
    }
</style>
<style lang="less" type="text/less">
    body #app #active_detail {
        background: #f5f5f5;
        height: 100%;
    }
    #active_detail {
        .money_color {
            color: #EBAC00;
        }
        .no_back {
            position: fixed;
            width: 100%;
            top: 0;
            background: #fff;
            .vux-header {
                background: transparent;
            }
            .vux-header .vux-header-left a {
                color: #666;
            }
            .vux-header .vux-header-left .left-arrow:before {
                content: "";
                position: absolute;
                width: 12px;
                height: 12px;
                border: 1px solid #333;
                border-width: 1px 0 0 1px;
                -webkit-transform: rotate(315deg);
                transform: rotate(315deg);
                top: 9px;
                left: 7px;
            }
            .vux-header .vux-header-left, .vux-header .vux-header-right {
                top: 13px;
                left: 20px;
                font-size: .7rem;
            }
        }
        .content {
            padding: 20px 10px 100px 10px;
            font-size: inherit;
            .html_con {
                font-size: 14px;
                text-align: justify;
            }
        }
        .content_title {
            text-align: center;
        }
        .content_con {

            .tit {
                padding: 10px 0px;
                font-size: .7rem;
            }
        }
        .content_con .con .p {
            text-indent: 2em;
            font-size: .65rem;
            line-height: 30px;
            color: #666;
        }
        .content_bottom {
            /*text-align: center;*/
            padding: 10px 20px 6px 20px;
            border-top: 1px solid #e6e6e6;
            position: fixed;
            width: 100%;
            bottom: 0;
            left: 0;
            background: #fff;
            .content_bottom_left {
                display: inline-block;
            }
            .content_bottom_right {
                position: absolute;
                right: 20px;
            }
            .confirm_txt {
                text-align: center;
                padding: 10px 20px 20px 20px;
            }
            .charge_box .yd-radio-text {
                font-size: .6rem;
            }
            .charge_box .yd-radio-icon {
                top: -6px;
                right: -2px;
            }
            .p {
                font-size: .5rem;
                line-height: 30px;
                position: relative;
                top: -7px;
                left: -4px;
                color: #666;
            }
            .weui-check_label {
                display: inline-flex;
                font-size: .8rem;
            }
            .yd-radio-icon {
                top: -4px;
            }
            .weui-cells_checkbox .weui-icon-checked:before {
                font-size: .9rem;
                position: relative;
                top: -3px;
                margin-left: 0;
                margin-right: 0;
            }
            .weui-cell:before {
                border: none;
            }
            .weui-cells:after {
                border: none;
            }
            .weui-btn_mini {
                font-size: .7rem;
                /*background: #f8f8f8;*/
                /*color: #333;*/
                /*border: 1px solid #f0f0f0;*/
                display: inline-block;
                padding: 0 16px;
                top: 20px;
            }
        }
    }
</style>
