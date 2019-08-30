<template>
    <div id="OrderList">
        <yd-infinitescroll :callback="loadList" ref="infinitescrollDemo">
            <yd-list theme="1" slot="list">
                <div v-for="(item,index) in list" :key="index" class="OrderList">
                    <div class="listBox">
                        <router-link :to="{path:'/UserOrderDetail',query:{product_id:item.product_id}}">
                            <div class="top">
                                <img class="stateImg" v-if="item.status==1" src="/static/img/ic_completed.png" alt="">
                                <img class="stateImg" v-if="item.status==2" src="/static/img/ic_processing.png" alt="">
                                <img class="stateImg" v-if="item.status==3" src="/static/img/ic_cancel.png" alt="">
                                <div class="proName"><span class="label" v-if="item.classify_name">{{item.classify_name}}</span>{{item.product_name}}</div>
                                <div class="orderBox">
                                    <div class="Hospital">{{item.hospital_name}}提供</div>
                                    <div class="orderNum">訂單號：{{item.order_no}}</div>
                                    <img src="/static/img/iconR.png" alt="">
                                </div>
                            </div>
                        </router-link>
                        <div class="content">
                            <div class="box" :class="item.appoint_state==0?'oneLine':''">
                                <div class="L">
                                    <span class="L1">預約時間：</span>
                                    <span class="L2">
                                        <span class="appointTime" :class="(item.appoint_state==1||item.appoint_state==3)?'yyStateSuccess':'yyStateFail'" v-if="item.appoint_state!=0">{{item.appoint_time}}</span>
                                        <span  v-if="item.appoint_state==0"></span>
                                        <router-link :to="{path:'/UserAppointment',query:{type:2,id:item.id,product_id:item.product_id}}" v-if="(item.appoint_state==1||item.appoint_state==2)&&(item.is_modify=='y'&&item.status!=3)">
                                            <span class="editTime">修改時間</span>
                                        </router-link>
                                    </span>
                                </div>
                                <div class="R">
                                    <router-link :to="{path:'/UserAppointment',query:{type:1,id:item.id,product_id:item.product_id}}" v-if="item.appoint_state==0&&item.status!=3">
                                        <span class="yyStateOther" >未預約，去預約<img src="/static/img/ic_more_gray.png" alt=""></span>
                                    </router-link>
                                    <span class="yyStateSuccess" v-if="item.appoint_state==1">預約成功</span>
                                    <span class="yyStateFail" v-if="item.appoint_state==2">預約失敗</span>
                                    <span class="yyStateing" v-if="item.appoint_state==3">審核中</span>
                                </div>
                            </div>
                            <div class="box" :class="item.pay_state1==0?'oneLine':''">
                                <div class="L">
                                    <span class="L1">定金：HK$ {{item.earnest_money}}<span class="applyRefund" :data-id="item.id" @click="refundBtn" v-if="item.refund_status=='y'&&item.appoint_state==2&&item.pay_state1==1">申請退款</span></span>
                                    <span class="L2">{{item.pay_time1}}</span>
                                </div>
                                <div class="R">
                                    <span class="yyStateOther" v-if="item.pay_state1==0">未付款</span>
                                    <span class="yyStateSuccess" v-if="item.pay_state1==1">已付款</span>
                                    <span class="yyStateFail" v-if="item.pay_state1==2">已退款</span>
                                    <span class="yyStateing" v-if="item.pay_state1==3">退款中</span>
                                </div>
                            </div>
                            <div class="box">
                                <div class="L">
                                    <span class="L1">尾款：HK$ {{item.tail_money}} </span>
                                    <span class="L2">
                                        <span v-if="item.pay_state2==0">(就診前，請結清尾款)</span>
                                        <span v-if="item.pay_state2!=0">{{item.pay_time2}}</span>
                                    </span>
                                </div>
                                <div class="R" v-if="item.status!=3">
                                    <span class="yyStateOther" v-if="item.pay_state2==0" :data-id="item.id" :data-money="item.tail_money" @click="payTailMoney">未付款，去付款<img src="/static/img/ic_more_gray.png" alt=""></span>
                                    <span class="yyStateSuccess" v-if="item.pay_state2==1">已付款</span>
                                </div>
                            </div>
                            <div class="box" v-if="item.remind_item">
                                <div class="L">
                                    <span class="L1">注意事項：</span>
                                    <span class="L2 remark">{{item.remind_item}}</span>
                                </div>
                            </div>
                            <div class="box" v-if="item.address">
                                <div class="L">
                                    <span class="L1">地址：</span>
                                    <span class="L2 remark">{{item.address}}</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </yd-list>
            <!-- 数据全部加载完毕显示 -->
            <span slot="loadingTip">正在加載···</span>
            <span slot="doneTip" v-show="show_more">沒有更多數據了~~</span>
        </yd-infinitescroll>
        <div v-show="show_nodata" class="no_data">
            <!--<img src="/static/img/ic_apply_invalid.png" alt="">-->
            <div class="title">暫無數據</div>
        </div>

        <div v-transfer-dom>
            <confirm v-model="show"
                     title="申請退款"
                     content="如果預約失敗，建議修改預約時間，也可申請退款，退款需要5個工作日"
                     @on-cancel="onCancel"
                     @on-confirm="onConfirm"
                     confirm-text="確認"
                     cancel-text="取消">
            </confirm>
        </div>
        <payMent ref="showState" :payMoney="charge_money" :payType=2 @goCharge="paymentState"></payMent>
    </div>
</template>
<script>
  import {   Confirm,Tab, TabItem,Group,Cell, Toast, cookie, Flexbox, FlexboxItem,XButton,XTextarea ,XDialog ,TransferDomDirective as TransferDom } from 'vux'
  import payment from '../common/payment.vue'
  export default {
    directives: {
      TransferDom
    },
    components: {
      Tab,
      TabItem,
      Group,
      Cell,
      Toast,
      cookie,
      Flexbox,
      FlexboxItem,
      XButton,
      XTextarea,
      XDialog,
      Confirm,
      payMent: payment
    },
    data () {
      return {
        show:false,
        page: 1,
        pageSize: 10,
        show_nodata: false,
        show_more: true,
        list:[],
        charge_money:[],
        orderId:''
      }
    },
    mounted(){
//      this.getClassify()
//      this.$refs.infinitescrollDemo.$emit('ydui.infinitescroll.reInit')
    this.loadList()
    },
    methods: {
      refundBtn(el){
        this.orderId = el.target.dataset.id
        this.show=true
      },
      onCancel(){},
      onConfirm(){
        let that = this;
        that.$api.H5OrderRefund({
          id:that.orderId
        })
          .then(res=>{
            console.log(res)
            if(res.data.state==1){
              that.$dialog.toast({
                mes: '申請退款成功！',
                timeout: 1500,
                icon: 'success',
                callback: () => {
                  that.$router.go(0)
                }
              })
            }else{
              that.$dialog.toast({
                mes: res.data.msg,
                timeout: 1500,
                icon: 'error',
                callback: () => {
                  that.$router.go(0)
                }
              })
            }
          })
          .catch(res=>{
            that.$dialog.toast({
              mes: res.data.msg,
              timeout: 1500,
              icon: 'error',
              callback: () => {
                that.$router.go(0)
              }
            })
          })
      },
      loadList() {
        var that = this
        that.$dialog.loading.open('正在加載中···')
        that.$api.H5OrderIndex({
//          classify_id:that.classify_id,
          page: that.page,
        }).then(response => {
          console.log(response)
          var data = response.data.data.order;
          that.$dialog.loading.close()
          if(data.length!=0){
            for (var i = 0; i < data.length; i++) {
              that.list.push(data[i])
            }
            if (response.data.data.pages <= 1 && data.length == 0) {
              that.show_nodata = true
            }
            if (response.data.data.pages <= 1 && (data.length > 0&&data.length <= 10)) {
              that.show_more = false
            }
            if (response.data.data.current_page==response.data.data.pages || that.page == response.data.data.pages) {
                /* 所有数据加载完毕 */
              that.$refs.infinitescrollDemo.$emit('ydui.infinitescroll.loadedDone')
              if (response.data.data.pages >= 2) {
                that.show_more = true
              } else {
                that.show_more = false
              }
              return
            }

              /* 单次请求数据完毕 */
            that.$refs.infinitescrollDemo.$emit('ydui.infinitescroll.finishLoad')
            that.page++
          }else{
            that.show_nodata = true
          }

        }, response => {
          // error callback
          that.$dialog.loading.close()
          that.$dialog.toast({
            mes: response.data.msg,
            timeout: 1500,
            callback: () => {
            }
          })
        })
      },
      payTailMoney(el){
        let that = this;
        let id = el.target.dataset.id
        let money = el.target.dataset.money
        that.charge_money = [{id:parseInt(id),money:money}]
        that.$refs.showState.showChargeState()
      },
      paymentBtn(el){
        let that = this,val = el.target.dataset;
        that.note = val.note
        that.remarkValue = ''
        that.charge_money = [{id:parseInt(val.id),money:val.money}]
//        that.order_id =parseInt(val.id)
        that.remark = true
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
    },
    beforeCreate () {

    },
    beforeDestroy () {

    }
  }
</script>
<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="less" type="text/less">
    /*#app .weui-cell{*/
        /*padding: 10px 0;*/
    /*}*/
    #OrderList {

    }
</style>
<style scoped lang="less" type="text/less">
    #OrderList{
        background: #f5f5f5;
        .listBox{
            width: 94%;
            margin: 15px auto;
            box-shadow:0px 3px 10px rgba(0,0,0,0.1);
            .top{
                background: #fff;
                padding: 15px;
                position: relative;
                box-shadow:0px 3px 10px rgba(0,0,0,0.08);
                .stateImg{
                    width: 40px;
                    position: absolute;
                    right: 0;
                    top:0;
                }
                .proName{
                    font-weight: bold;
                    font-size: .3rem;
                    padding-bottom: 10px;
                    width: 90%;
                    .label{
                        border-radius:35px;
                        background: @themeColor;
                        color: #fff;
                        font-size: .2rem;
                        padding: 2px 6px;
                        position: relative;
                        top: -2px;
                        margin-right: 3px;
                    }
                }
                .orderBox{
                    /*display: flex;*/
                    /*justify-content: space-between;*/
                    /*align-items: center;*/
                    font-size: .24rem;
                    color: #666;
                    position: relative;
                    img{
                        width: 10px;
                        position: absolute;
                        right: 0px;
                        bottom: 10px;
                    }
                    .Hospital{
                        font-size: .24rem;
                        /*margin: 5px auto;*/

                    }
                    .orderNum{
                        padding-top: 5px;
                    }
                }
            }
            .content{
                padding: 5px 15px 0px 15px;
                background: #fdfdfd;
                .box{
                    display: flex;
                    justify-content: space-between;
                    align-items: center;
                    background: #fdfdfd;
                    border-bottom: 1px solid #e6e6e6;
                    color: #666;
                    padding: 10px 0px;
                    line-height: .44rem;
                    .applyRefund{
                        font-weight: 400;
                        padding-left: 10px;
                        font-size: .26rem;
                    }
                    .editTime{
                        font-size: .26rem;
                        padding-left: 5px;
                    }
                    .yyStateing{
                        color: @themeColor;
                    }
                    .yyStateSuccess{
                        color: #00A313;
                    }
                    .yyStateFail{
                        color: #999;
                    }
                    .yyStateOther{
                        color: #ff9315;
                    }
                    img{
                        width: 10px;
                        margin-left: 5px;
                        position: relative;
                        top:-1px;
                    }
                    .L{
                        width: 65%;
                        .L1{
                            display: block;
                            font-weight: bold;
                            font-size: .28rem;
                        }
                        .L2{
                            display: block;
                            font-size: .24rem;
                            &.remark{
                                line-height: .4rem;
                            }
                            .appointTime{
                                font-size: .26rem;
                                font-weight: bold;
                            }
                        }
                    }
                    .R{
                        font-weight: bold;
                        font-size: .26rem;
                    }
                    &.oneLine{
                        padding: 20px 0;
                    }
                }
            }
        }
    }
</style>
