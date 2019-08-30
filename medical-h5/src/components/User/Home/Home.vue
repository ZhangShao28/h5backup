<template>
    <div id="home">
        <div class="top">
            <div class="userInfo">
                <div class="userLogo"><img :src="userImg" alt=""></div>
                <div class="userName"><span class="userName">{{userName}}</span></div>
                <!--<div class="userVipNum">會員ID：{{custom_id}}</div>-->
            </div>
        </div>
        <div class="content">
            <div v-for="item,index in list">
                <div class="listBox">
                    <a :href="'tel:'+phone_number" v-if="item.tel">
                        <div class="listInfo" >
                            <div class="listL">
                                <img :src="item.imgSrc" alt=""><span class="text">{{item.text}}</span>
                            </div>
                            <div class="listR"><img src="/static/img/iconR.png" alt=""></div>
                        </div>
                    </a>
                    <router-link :to="item.url" v-if="!item.tel">
                        <div class="listInfo">
                            <div class="listL">
                            <img :src="item.imgSrc" alt=""><span class="text">{{item.text}}</span>
                            </div>
                            <div class="listR"><img src="/static/img/iconR.png" alt=""></div>
                        </div>
                        <div class="orderBox" v-if="item.orderState=='yes'">
                            <div class="orderInfo">
                                <div>{{proList.product_name}}</div>
                                <div>
                                    <span class="yyStateSuccess" v-if="proList.status==1">已完成</span>
                                    <span class="yyStateing" v-if="proList.status==2">進行中</span>
                                    <span class="yyStateFail" v-if="proList.status==3">已取消</span>
                                </div>
                            </div>
                            <div class="orderInfo">
                                <div>預約時間</div>
                                <div :class="proList.appoint_time=='未預約'?'yyStateOther':''">{{proList.appoint_time}}</div>
                            </div>
                            <div class="orderInfo">
                                <div>定金：HK$ {{proList.earnest_money}}</div>
                                <div>
                                    <span class="yyStateOther" v-if="proList.pay_state1==0">未付款</span>
                                    <span class="yyStateSuccess" v-if="proList.pay_state1==1">已付款</span>
                                    <span class="yyStateFail" v-if="proList.pay_state1==2">已退款</span>
                                    <span class="yyStateing" v-if="proList.pay_state1==3">退款中</span>
                                </div>
                            </div>
                            <div class="orderInfo">
                                <div>尾款：HK$ {{proList.tail_money}}</div>
                                <div>
                                    <span class="yyStateOther" v-if="proList.pay_state2==0">未付款</span>
                                    <span class="yyStateSuccess" v-if="proList.pay_state2==1">已付款</span>
                                </div>
                            </div>
                        </div>
                    </router-link>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
  import {
    Cell,
    XButton,
    Tab,
    TabItem,
    Flexbox,
    FlexboxItem,
    cookie,
    Confirm,
    TransferDomDirective as TransferDom,
    Group,
    Badge,
    AlertModule
  } from 'vux'
  export default {
    directives: {
      TransferDom
    },
    components: {
      Flexbox,
      FlexboxItem,
      cookie,
      Cell,
      XButton,
      Tab,
      TabItem,
      Confirm,
      Group,
      Badge,
      AlertModule
    },
    data () {
      return {
        list:[
          {
            text:'預約與訂單',
            imgSrc:'/static/img/ic_home_reservation.png',
            url:'/UserOrderList',
            orderState:'no'
          },
          {
            text:'支付明細',
            imgSrc:'/static/img/ic_home_pay.png',
            url:'/UserPaymentDetail'
          },
          {
            text:'我的基本信息',
            imgSrc:'/static/img/ic_home_my.png',
            url:'/UserMyInfo'
          },
          {
            text:'聯係客服',
            imgSrc:'/static/img/ic_home_phone.png',
            url:'',
            tel:true
          },
        ],
        proList:[],
        custom_id:'',
        userName:'',
        userImg: '/static/img/ic_default.png',
        phone_number:''
      }
    },
    mounted(){
      window.scrollTo(0, 0);
      var that = this
//      that.getName()
      that.getData()
    },
    methods: {
//      renderVChart({ chart }){
//        console.log(this)
//      },
      getName(){
        let that = this;
        that.$api.H5UserSystem({

        })
          .then(res=>{
            if(res.data.state==1){
              that.system_type = res.data.data.system_type
              if(res.data.data.system_type==1){
                document.title='智康醫療直銷平臺'
                cookie.set('h5_name', '智康醫療直銷平臺', {expires: 30000, path: '/'})
              }else{
                document.title='恒高尊尚會'
                cookie.set('h5_name', '恒高尊尚會', {expires: 30000, path: '/'})
              }
            }
          })
          .catch(res=>{

          })
      },
      submitBtn(){
        this.$router.push('/ProductList')
      },
      getData(){
        this.$dialog.loading.open('正在加載中···')
        let that = this
        that.$api.H5IndexIndex({
        })
          .then(function (response) {
            that.$dialog.loading.close()
            var data = response.data.data
            console.log(response)
            if( response.data.state==1){
              cookie.set('custom_id', data.custom_id, {expires: 30000, path: '/'})
              cookie.set('username', data.username, {expires: 30000, path: '/'})
              that.custom_id=data.custom_id
              that.userImg=data.logo
              that.userName=data.username
              that.phone_number=data.phone_number
              that.proList = data.subscribe
              if(data.subscribe.length==0){
                that.list[0].orderState='no'
              }else{
                that.list[0].orderState='yes'
              }
            }
          })
          .catch(function (response) {
            that.$dialog.loading.close()
            console.log(response)
            that.$dialog.toast({
              mes: response.data.msg,
              timeout: 1500,
              icon: 'error'
            })
          })
      },
      go_myinformaction(){
        this.$router.push('/MyInformation')
      },
    },
    beforeCreate () {
      document.querySelector('body').setAttribute('style', 'height:auto;')
      document.querySelector('html').setAttribute('style', 'background:#f5f5f5;')
    },
    beforeDestroy () {
      document.querySelector('body').removeAttribute('style')
      document.querySelector('html').setAttribute('style', 'background:#f5f5f5;')
    }
  }
</script>
<style  lang="less" type="text/less">
    /*html,body{*/
        /*background: #f5f5f5;*/
    /*}*/
    #home{
        .vux-no-group-title{
            box-shadow:0px 4px 8px rgba(0,0,0,0.08);
            border-radius:6px;
        }
        .weui-cells{
            font-size: .28rem;
        }
        .weui-cell__ft span{
            color: #333;
        }
    }
</style>
<style lang="less" type="text/less" scoped>

    #home {
        background: #f5f5f5;
        .badgeSize{
            padding: 3px;
            position: relative;
            top: -5px;
        }
        .m-35{
            margin-top: 35px;
        }
        .top {
            /*background:linear-gradient(151deg,rgba(24,100,255,1) 0%,rgba(54,209,254,1) 100%);*/
            /*height: 3.4rem;*/
            background: url("/static/img/bg.png") no-repeat;
            width: 100%;
            /*height: 100%;*/
            background-size: contain;
            position: absolute;
            filter:progid:DXImageTransform.Microsoft.AlphaImageLoader(src='/static/img/ic_card.png',sizingMethod='scale');
            top:0;
            padding: 15px;
            font-size: .32rem;
            /*border-bottom: 1px solid #e5e5e5;*/
            .userInfo{
                width: 98%;
                margin: 1.5rem auto 0 auto;
                background: #fff;
                box-shadow:0px 5px 15px rgba(0,0,0,0.08);
                border-radius:4px;
                text-align: center;
                position: relative;
                height: 117px;
                .userLogo{
                    width: 94px;
                    height: 94px;
                    border-radius: 50%;
                    position: absolute;
                    top: -1rem;
                    left: 50%;
                    margin: 0 auto 0 -47px;
                    border: 2px solid #fff;
                    box-shadow:0px 2px 14px rgba(0,27,47,0.3);
                    img{
                        width: 90px;
                        height: 90px;
                        border-radius: 50%;
                    }
                }
                .userName{
                    padding-top: 55px;
                    font-weight: bold;
                    font-size: .32rem;
                    color: #333;
                }
                .userVipNum{
                    padding-top: 5px;
                    padding-bottom: 15px;
                    font-size: .24rem;
                    color: #666;
                }
            }
        }
        .content{
            width: 98%;
            padding: 15px;
            margin: 4.1rem auto 20px auto;
            .listBox{
                margin-bottom: 10px;
                box-shadow:0px 3px 10px rgba(0,0,0,0.08);
                border-radius: 4px;
                background: #fff;
                padding: 15px;
                .listInfo{
                    display: flex;
                    justify-content: space-between;
                    align-items: center;
                    color: #333;
                    font-size: .3rem;
                    /*font-weight: bold;*/
                    .listL{
                        img{
                            width: 25px;
                            height: 25px;
                            margin-right: 10px;
                        }
                        .text{
                            position: relative;
                            top:2px;
                        }
                    }
                    .listR{
                        img{
                            width: 10px;
                        }
                    }
                }
            }
            .orderBox{
                background: #fff;
                /*border-radius: 4px;*/
                padding: 10px 0 0 0;
                margin-top: 10px;
                border-top: 1px solid #e2e2e2;
                .orderInfo{
                    display: flex;
                    justify-content: space-between;
                    align-items: center;
                    padding-bottom: 5px;
                    color: #666;
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
                }
            }
        }
    }
</style>
