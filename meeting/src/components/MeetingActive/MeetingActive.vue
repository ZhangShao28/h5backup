<template>
    <div id="active">
        <div style="height: 44px;position: fixed;width: 100%;z-index: 100">
            <!--<sticky  scroll-box="vux_view_box_body">-->
            <tab :line-width="2">
                <tab-item :selected="select_id === index" v-for="(item, index) in list"
                          :class="{'vux-1px-r': index===0}" @on-item-click="handler" :key="index">{{item.title}}
                </tab-item>
            </tab>
            <!--</sticky>-->
        </div>
        <div class="active_content">
            <yd-infinitescroll v-if="select_id==0" :callback="loadList1" ref="infinitescrollDemo">
                <yd-list theme="1" slot="list">
                    <div v-for="(item,index) in active_list1" :key="index" class="active_list">
                        <router-link :to="{path:'/MeetingDetail',query:{id:item.id,cid:item.cid}}">
                            <div class="active_list_top">
                                <div><span class="active_list_tit">主題：</span><span class="active_list_con">{{item.title}}</span>
                                </div>
                                <div><span class="active_list_tit">開始日期：</span><span class="active_list_con">{{item.start_time2}}（{{item.start_time1}}）{{item.start_time3}}</span>
                                </div>
                                <div :style="{'display':item.end_time1==''? 'none':'inline-block'}"><span
                                        class="active_list_tit">結束日期：</span><span class="active_list_con">{{item.end_time2}}（{{item.end_time1}}）{{item.end_time3}}</span>
                                </div>
                                <div><span class="active_list_tit">地點：</span><span class="active_list_con">{{item.address}}</span>
                                </div>
                                <div class="association_name"><img src="/static/img/ic_meeting_association.png" alt="">{{item.property_name}}&nbsp;&nbsp;&nbsp;&nbsp;{{item.type_name}}
                                </div>
                                <div class="arrow_right">
                                    <x-icon type="ios-arrow-right" size="30" class="icon_color"></x-icon>
                                </div>
                            </div>
                        </router-link>
                        <div class="active_radio">
                            <!--<checklist style="display: inline-block" :options="radio_item" v-model="item.radioValue" required :max="1" @on-change="change"></checklist>-->
                            <div v-if="item.is_modify=='y'">
                                <div v-if="item.is_submit==1&&item.is_charge==2" class="submit_btn1">
                                    <yd-radio-group class="meetingRadio" color='#4285F4' v-model="item.is_attend" size="15">
                                        <yd-radio val="1">出席并繳納<span class="money_color">HK${{item.charge_money}}</span>
                                        </yd-radio>
                                        <yd-radio val="2">無暇出席</yd-radio>
                                    </yd-radio-group>
                                    <x-button mini class="tj_btn" :data-value="item.is_attend"
                                              :data-charge="item.is_charge" :data-logid="item.log_id" :data-id="item.id"
                                              :disabled="loading_show" :data-cid="item.cid" @click.native="submit">提交
                                    </x-button>
                                    <span class="tj_tit"
                                          :style="{'display':item.receipt_time==''? 'none':'inline-block'}">（{{item.receipt_time}}之前提交信息）</span>
                                    <payMent ref="showState" :payMoney="item.charge_money"
                                             @goCharge="payment"></payMent>
                                </div>
                                <div v-if="item.is_submit==1&&item.is_charge==1" class="submit_btn2">
                                    <yd-radio-group color='#4285F4' v-model="item.is_attend" size="17">
                                        <yd-radio val="1">出席</yd-radio>
                                        <yd-radio val="2">無暇出席</yd-radio>
                                    </yd-radio-group>
                                    <x-button mini :data-value="item.is_attend" :data-logid="item.log_id"
                                              :data-id="item.id" :data-cid="item.cid" :disabled="loading_show" @click.native="submit">提交
                                    </x-button>
                                    <span class="tj_tit"
                                          :style="{'display':item.receipt_time==''? 'none':'inline-block'}">（{{item.receipt_time}}之前提交信息）</span>
                                </div>
                                <div v-if="item.is_submit==2" class="modify_btn">
                                    <span v-if="item.is_attend==1">确认出席</span>
                                    <span v-if="item.is_attend==2">無暇出席</span>
                                    <x-button class="modify_btn" mini :data-itemid="item.id" :data-logid="item.log_id"
                                              :data-cid="item.cid" :data-val="item.is_attend" @click.native="modify">修改
                                    </x-button>
                                </div>
                            </div>
                            <div v-if="item.is_modify=='n'">
                                <div v-if="item.is_submit==2&&item.is_charge==2&&item.is_attend==1" class="modify_btn">
                                    <div class="inline-block">
                                        <span>確認出席已支付<span style="color: #EBAC00">HK${{item.charge_money}}</span></span>
                                    </div>
                                </div>
                                <div v-else class="modify_btn">
                                    <div class="inline-block">
                                        <span v-if="item.is_attend==1">已出席</span>
                                        <span v-if="item.is_attend==0 ||item.is_attend==2">未出席</span>
                                    </div>
                                    <div class="inline-block floatR finished" v-if="item.is_attend==1">已完成</div>
                                </div>
                            </div>
                        </div>
                    </div>
                </yd-list>
                <!-- 数据全部加载完毕显示 -->
                <!--<span v-show="show_more" slot="doneTip">沒有更多數據了~~</span>-->
                <!--<span v-show="show_more" >沒有更多數據了~~</span>-->
                <span slot="loadingTip">正在加載···</span>
                <span slot="doneTip" v-show="show_more">沒有更多數據了~~</span>
            </yd-infinitescroll>
            <yd-infinitescroll v-if="select_id==1" :callback="loadList2" ref="infinitescrollDemo">
                <yd-list theme="1" slot="list">
                    <div v-for="(item,index) in active_list2" :key="index" class="active_list">
                        <router-link :to="{path:'/MeetingDetail',query:{id:item.id,cid:item.cid}}">
                            <div class="active_list_top">
                                <div><span class="active_list_tit">主題：</span><span class="active_list_con">{{item.title}}</span>
                                </div>
                                <div><span class="active_list_tit">開始日期：</span><span class="active_list_con">{{item.start_time2}}（{{item.start_time1}}）{{item.start_time3}}</span>
                                </div>
                                <div :style="{'display':item.end_time1==''? 'none':'inline-block'}"><span
                                        class="active_list_tit">結束日期：</span><span class="active_list_con">{{item.end_time2}}（{{item.end_time1}}）{{item.end_time3}}</span>
                                </div>
                                <div><span class="active_list_tit">地點：</span><span class="active_list_con">{{item.address}}</span>
                                </div>
                                <div class="association_name"><img src="/static/img/ic_meeting_association.png" alt="">{{item.property_name}}&nbsp;&nbsp;&nbsp;&nbsp;{{item.type_name}}
                                </div>
                                <div class="arrow_right">
                                    <x-icon type="ios-arrow-right" size="30" class="icon_color"></x-icon>
                                </div>
                            </div>
                        </router-link>
                        <div class="active_radio active_finish">
                            <!--<div class="inline-block">已出席</div>-->
                            <div class="inline-block finished" v-if="item.is_finish==1">已完成</div>
                            <div class="inline-block finished" v-if="item.is_finish==2">未完成</div>
                        </div>
                    </div>
                </yd-list>
                <!-- 数据全部加载完毕显示 -->
                <!--<span v-show="show_more">沒有更多數據了~~</span>-->
                <span slot="loadingTip">正在加載···</span>
                <span slot="doneTip" v-show="show_more">沒有更多數據了~~</span>
            </yd-infinitescroll>
            <div v-show="show_nodata" class="no_data">
                <img src="/static/img/ic_apply_invalid.png" alt="">
                <div class="title">暫無數據</div>
            </div>
        </div>
    </div>
</template>
<script>
  import { XButton, Tab, TabItem, cookie, Checklist, Sticky, Loading, LoadMore, } from 'vux'
  import payment from '../common/payment.vue'
  import { Payconfig } from '../../../static/js/wxpay.js'
  export default {
    components: {
      XButton,
      Tab,
      TabItem,
      Checklist,
      cookie,
      Sticky,
      Loading,
      LoadMore,
      payMent: payment
    },
    data () {
      return {
        page: 1,
        pageSize: 10,
        active_list1: [],
        active_list2: [],
        show_nodata: false,
        show_more: true,
        list: [
          {
            title: '會議通告'
          },
          {
            title: '已出席'
          }
        ],
        select_id: 0,//默認為會議通知
        loading_show: false,//按钮禁用
        payId: null,
        cid:''
      }
    },
    mounted(){
      document.title=cookie.get('xh_name')
      var that = this, ids = cookie.get('select_id'), pid = this.$route.query.pid
      console.log('pid', pid)
      if (pid == 1) {
        that.$dialog.toast({
          mes: '支付成功！',
          timeout: 1500,
          icon: 'success',
          callback: () => {
            that.is_charge = true
          }
        })
      } else if (pid == 2) {
        that.$dialog.toast({
          mes: '支付失敗！',
          timeout: 1500,
          icon: 'error',
          callback: () => {
            that.is_charge = true
          }
        })
      }
      that.$refs.infinitescrollDemo.$emit('ydui.infinitescroll.reInit')
      that.show_nodata = false
      that.show_more = false
      that.active_list1 = []
      that.active_list2 = []
      that.page = 1
      if (ids == 0 || ids == undefined) {
        that.select_id = 0
        that.loadList1()
      } else if (ids == 1) {
        that.select_id = 1
        that.loadList2()
      }
    },
    methods: {
      loadList1() {
        var that = this
        this.$dialog.loading.open('正在加載中···')
//                console.log(this.page)
        that.api.meetingIndex({
            page: this.page,
            cid: cookie.get('cid')
          }).then(response => {
          // sucess callback
          var data = response.data.data.meeting
//                    var data = this.active_list;
          console.log(response)
          this.$dialog.loading.close()
          for (var i = 0; i < data.length; i++) {
            this.active_list1.push(data[i])
          }
          if (response.data.data.pages <= 1 && data.length == 0) {
            this.show_nodata = true
          }
          if (response.data.data.pages <= 1 && data.length <= 10) {
            this.show_more = false
          }
//                    console.log(data.length,that.pageSize,that.page,response.data.data.pages)
          if (data.length < this.pageSize || this.page == response.data.data.pages) {
              /* 所有数据加载完毕 */
            this.$refs.infinitescrollDemo.$emit('ydui.infinitescroll.loadedDone')
            if (response.data.data.pages >= 2) {
              that.show_more = true
            } else {
              that.show_more = false
            }
            return
          }

            /* 单次请求数据完毕 */
          this.$refs.infinitescrollDemo.$emit('ydui.infinitescroll.finishLoad')
          this.page++

        }, response => {
          // error callback
          this.$dialog.loading.close()
          that.$dialog.toast({
            mes: response.data.msg,
            timeout: 1500,
            callback: () => {
            }
          })
        })
      },
      loadList2() {
        var that = this
        this.$dialog.loading.open('正在加載中···')
//                console.log(this.page)
        that.api.meetingAttended({
            page: this.page,
            cid: cookie.get('cid')
          }).then(response => {

          // sucess callback
          var data = response.data.data.meeting
//                    var data = this.active_list2;
          console.log(response)
          this.$dialog.loading.close()
          for (var i = 0; i < data.length; i++) {
            this.active_list2.push(data[i])
          }
          if (response.data.data.pages <= 1 && data.length == 0) {
            this.show_nodata = true
          }
          if (response.data.data.pages <= 1 && data.length <= 10) {
            this.show_more = false
          }
          if (data.length < this.pageSize || this.page == response.data.data.pages) {
              /* 所有数据加载完毕 */
            this.$refs.infinitescrollDemo.$emit('ydui.infinitescroll.loadedDone')
            if (response.data.data.pages >= 2) {
              that.show_more = true
            } else {
              that.show_more = false
            }
            return
          }

            /* 单次请求数据完毕 */
          this.$refs.infinitescrollDemo.$emit('ydui.infinitescroll.finishLoad')
          this.page++

        }, response => {
          // error callback
          this.$dialog.loading.close()
          that.$dialog.toast({
            mes: response.data.msg,
            timeout: 1500,
            callback: () => {
            }
          })
        })
      },
      handler(el){
//                console.log('出席id',el)
        var that = this
        that.$refs.infinitescrollDemo.$emit('ydui.infinitescroll.reInit')
        cookie.set('select_id', el, {expires: 30000, path: '/'})
        that.select_id = el
        that.show_nodata = false
        that.show_more = false
        that.active_list1 = []
        that.active_list2 = []
        that.page = 1
        if (el == 0) {
          that.loadList1()
        } else if (el == 1) {
          that.loadList2()
        }
      },
      submit(el){
//                console.log(el.target.dataset.value,el.target.dataset.id,el.target.dataset.logid,el.target.dataset.charge)
        var that = this, data = el.target.dataset, id = data.id,cid = data.cid, is_attend = data.value, log_id = data.logid,
          charge = data.charge

        if (is_attend == 1 && charge == 2) {//支付调用组件
          that.payId = el.target.dataset.id
          that.cid = el.target.dataset.cid
          that.$refs.showState[0].showChargeState()
        } else {
          that.loading_show = true
          that.api.meetingModify({
              id: el.target.dataset.id,
              log_id: el.target.dataset.logid,
              is_attend: el.target.dataset.value
            }).then(response => {
            that.loading_show = false
            console.log(response)
            if (response.data.state == 1) {
              that.$dialog.toast({
                mes: response.data.msg,
                timeout: 1500,
                icon: 'success',
                callback: () => {
                  that.handler(that.select_id)
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
//                console.log(el.target.dataset.itemid,el.target.dataset.val)
        var list = this.active_list1, val = el.target.dataset.val, item_id = el.target.dataset.itemid
        for (let i = 0; i < list.length; i++) {
          if (list[i].id == item_id) {
            list[i].is_submit = 1
            list[i].is_attend = val
          }
        }
      },
      payment(el){
        console.log('el',el)
        let that = this, url = encodeURIComponent(location.href)
        that.loading_show = true
        that.api.rechargePay({
            type: el,
            id: that.payId,
            cid:that.cid,
            url: url
          })
          .then(response => {
            let data = response.data
            console.log(response, data.state)
            if (data.state != 1) {
              that.$dialog.toast({
                mes: response.data.msg,
                timeout: 1500,
                callback: () => {
                  that.loading_show = false
                }
              })
            } else {
              if(el == '0'){
                window.location.href = data.data
              }else if (el == '1') {
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
//              else{
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
      }
    },
    created(){
      document.body.setAttribute('class', '')
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
<style lang="less" type="text/less" >
    body #app #active {
        background: #f5f5f5;
        height: 100%;

        .vux-tab-wrap {
            box-shadow: 0px 1px 3px rgba(0, 0, 0, 0.1);

            .vux-tab .vux-tab-item.vux-tab-selected {
                color: #3D82D9;
                border-bottom: 3px solid #3D82D9;
            }

            .vux-tab-ink-bar {
                background-color: #3D82D9;
                width: 70px;
                margin: 0 auto;
            }

            .vux-tab .vux-tab-item {
                font-size: 16px;
            }

        }

    }
    #active .active_content {
        padding: 45px 15px 60px 15px;
        font-size: .65rem;

        span.money_color {
            color: #EBAC00;
        }

        .yd-list-donetip {
            padding: 0 0 .5rem 0;
            font-size: .6rem;
            color: #999;
        }

        .yd-list-loading {
            padding: 0 0 .5rem 0;
            font-size: .6rem;
        }

        .active_list:last-child {
            margin: 20px 0px 10px 0px;
        }

        .active_list {
            position: relative;
            line-height: 24px;
            border-radius: 8px;
            box-shadow: 0px 1px 10px rgba(0, 0, 0, 0.1);
            /*padding: 10px 10px 0px 10px;*/
            margin: .7rem 0px;
            background: #fff;

            .active_list_top {
                padding: 15px 20px 8px 20px;
                line-height: 28px;
            }

            .active_list_con {
                font-size: .6rem;
                color: #666;
            }

            .association_name {
                font-size: .55rem;
                color: #4788F5;

                img {
                    width: 14px;
                    height: 14px;
                    position: relative;
                    top: -1px;
                    margin-right: 5px;
                }

            }
            .active_radio {
                border-top: 1px solid #f1f1f1;
                position: relative;
                padding: 10px 20px;

                .submit_btn1 {
                    /*margin-left: -.5rem;*/
                }

                .submit_btn1 .meetingRadio .yd-radio-text {
                    font-size: .55rem;
                }

                .submit_btn1 .meetingRadio .yd-radio-icon {
                    top: -5px;
                }

                .submit_btn2 .weui-btn_mini {
                    padding: 0.1rem 0.8rem;
                }

                .finished {
                    color: #3D82D9;
                }

                .tj_tit {
                    font-size: .5rem;
                }

                .modify_btn span {
                    font-size: .6rem;
                    color: #666;
                }

                .yd-radio-icon {
                    top: -4px;
                }

                .weui-check_label {
                    display: inline-flex;
                    font-size: .65rem;
                }

                .weui-cells_checkbox .weui-icon-checked:before {
                    font-size: .8rem;
                }

                .weui-cell:before {
                    border: none;
                }

                .weui-cells:after {
                    border: none;
                }

                .weui-btn_mini.tj_btn {
                    border-radius: 4px;
                    box-shadow: 0px 3px 6px rgba(0, 0, 0, 0.16);
                }

                .weui-btn_mini {
                    font-size: .6rem;
                    line-height: 1.2rem;
                    /*border: 1px solid #f0f0f0;*/
                    display: inline-block;
                    position: absolute;
                    top: 20px;
                    right: 20px;
                    /*position: relative;*/
                    /*right: 10px;*/
                    /*top: 4px;*/
                    /*float: right;*/
                }

                .weui-btn_mini.modify_btn {
                    font-size: .6rem;
                    background: rgba(248, 248, 248, 0.5);
                    color: #333;
                    line-height: 22px;
                    border: 1px solid #f0f0f0;
                    display: inline-block;
                    position: absolute;
                    top: 7px;
                    right: 20px;
                    /*position: relative;*/
                    /*right: 10px;*/
                    /*top: 4px;*/
                    /*float: right;*/
                }

            }
            .active_radio.active_finish {
                text-align: right;
                color: #999;
                padding: 10px 20px;
            }

            .arrow_right {
                position: absolute;
                top: 55px;
                right: 10px;

                .vux-x-icon {
                    fill: #999;
                }

            }
        }
        .no_data {
            text-align: center;
            padding-top: 1.5rem;
            color: #999;
            width: 100%;
            font-size: 0.65rem;

            .title {
                position: relative;
                top: -40px;
            }

            img {
                width: 100%;
            }

        }

    }
</style>
