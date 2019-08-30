<template>
    <div id="home">
        <my-marquee :lists="'溫馨提示:會員將在'+days+'天后到期，斷繳后會費將會翻倍，並影響佣金處理，請及時處理.'" v-if="tip_show==1"></my-marquee>
        <div class="top" :class="tip_show==1?'m-35':''">
            <flexbox justify="space-around" class="userInfo">
                <flexbox-item :span="8">
                    <span class="userLogo"><img :src="userImg" alt=""></span>
                    <span class="userName">{{userName}}</span>
                </flexbox-item>
                <flexbox-item :span="4">
                    <router-link :to="{path:'/MyInfo'}" >
                    <div class="checkData" v-if="userState==1">我的資料</div>
                    <div class="checkData" v-if="userState==2">會員繳費</div>
                    </router-link>
                </flexbox-item>
            </flexbox>
            <flexbox justify="space-around" class="vipInfo">
                <flexbox-item :span="5" v-if="userState==1">
                    <div><img class="vipImg" src="/static/img/ic_home_vip.png" alt="">會員ID：{{uid}}</div>
                </flexbox-item>
                <flexbox-item :span="7" v-if="userState==1">
                    <div class="userState ">
                        <div>{{post_name}}（{{expire_date}}到期）</div>
                    </div>
                </flexbox-item>
                <flexbox-item :span="12" v-if="userState==2">
                    <div class="userState noMember">
                        <div>非會員,請先繳費</div>
                    </div>
                </flexbox-item>
            </flexbox>
        </div>
        <div class="content">
            <div class="walletBox">
                <router-link :to="{path:'/OrderCommission'}">
                    <div class="box borderR">
                        <div class="imgBox">
                            <img class="walletImg" src="/static/img/ic_home_commission.png" alt="">
                        </div>
                        <div class="numBox">
                            <div>累計佣金</div>
                            <div class="_color moneyNum">HK$ {{cumulate_money}}</div>
                        </div>
                        <img class="iconR" src="/static/img/iconR.png" alt="">
                    </div>
                </router-link>
                <router-link :to="{path:'/Wallet'}">
                    <div class="box">
                        <div class="imgBox">
                            <img class="walletImg" src="/static/img/ic_home_wallet.png" alt="">
                        </div>
                        <div class="numBox">
                            <div>我的錢包</div>
                            <div class="_color moneyNum">HK$ {{balance_money}}</div>
                        </div>
                            <img class="iconR" src="/static/img/iconR.png" alt="">
                    </div>
                </router-link>
            </div>
            <div id='myChart' :style="{width:'100%',height:'300px'}"></div>
            <!--<div class="VChart">-->
                <!--<v-chart style="border-radius: 6px;"-->
                        <!--ref="demo"-->
                        <!--:data="month_arr">-->
                    <!--<v-bar/>-->
                <!--</v-chart>-->
            <!--</div>-->
            <!--<div class="groupBox">-->
                <!--<group>-->
                    <!--<cell title="客户推薦" link="/component/radio" ><p >500000</p></cell>-->
                    <!--<cell title="本月新增" :link="{path:'/demo'}" ><p>500</p></cell>-->
                <!--</group>-->
            <!--</div>-->
            <div class="groupBox">
                <!--<router-link :to="{path:'/OrderCommission'}">-->
                <router-link :to="{path:'/OrderList'}">
                    <group>
                        <cell title="有效訂單" is-link><span>{{effective_order}}</span></cell>
                        <cell title="本月新增"><span class="no-link">{{added_order}}</span></cell>
                    </group>
                </router-link>
            </div>
            <div class="groupBox">
                <group>
                    <router-link :to="{path:'/MyUser'}">
                        <cell title="我的客戶" is-link><span>{{my_customer_num}}</span></cell>
                        <cell><span slot="title" class="no-link">本月新增
                            <!--<badge class="badgeSize"></badge>-->
                        </span><span>{{my_customer_add}}</span>
                        </cell>
                    </router-link>
                    <cell title="推薦客戶" :link="{path:'/UserRecommend'}" ></cell>
                </group>
            </div>
            <div class="groupBox">
                <group>
                    <router-link :to="{path:'/MyTeam'}">
                    <cell title="我的團隊" is-link><span>{{my_member_num}}</span></cell>
                    <cell><span slot="title" class="no-link">本月新增
                        <!--<badge class="badgeSize"></badge>-->
                    </span><span>{{new_member_num}}</span>
                    </cell>
                    </router-link>
                    <cell title="推薦代理" :link="{path:'/Recommend'}" ></cell>
                </group>
            </div>
        </div>
        <div class="footer fixedBtn">
            <x-button class="bigBtn subBtn" @click.native="submitBtn" type="primary" :text="goBtnText"></x-button>
        </div>
    </div>
</template>
<script>
    import myMarquee from '../common/marquee'//提示消息滾動
    import echarts from 'echarts'
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
    VChart,
    VBar,
    VTooltip,
    Group,
    Badge
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
      VChart,
      VBar,
      Group,
      Badge,
      myMarquee
    },
    data () {
      return {
        uid:'',
        userName:'',
        balance_money:"0", //余额
        cumulate_money:"0", //累计佣金
        expire_date:null, //过期时间
        expire_status:2, //是否过期状态,1没过期,2过期
        effective_order:"", //有效订单数
        added_order:"", //本月新增订单数
        new_member_num:"", //新加成员数
        my_member_num:"", //成员数
        tip_show:2, //1显示溫馨提示,2不显示
        days:null, //天数
        post_name:'',
        userImg: '/static/img/ic_default.png',
        month_arr: [],
        money_arr: [],
        goBtnText:'去購買',
        userState:1,//會員狀態
        my_customer_add:'',
        my_customer_num:'',

      }
    },
    mounted(){
      var that = this
      that.getName()
      that.getData()
    },
    methods: {
//      renderVChart({ chart }){
//        console.log(this)
//      },
      getName(){
        let that = this;
        that.$api.userSystem({

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
      drawBar(month,money){
        // 基于准备好的dom，初始化echarts实例
        let myChart = echarts.init(document.getElementById('myChart'));
        // 绘制图表
        myChart.setOption({
          color: ['#238BFF'],
          tooltip : {
            trigger: 'axis',
            axisPointer : {            // 坐标轴指示器，坐标轴触发有效
              type : 'shadow'        // 默认为直线，可选为：'line' | 'shadow'
            }
          },
          grid: {
            left: '3%',
            right: '4%',
            bottom: '6%',
            top: '10%',
            containLabel: true
          },
          xAxis : [
            {
              type : 'category',
              data :month,
              axisTick: {
                alignWithLabel: true,
                lineStyle:{
                  color:'#999'
                }
              },
              axisLine:{
                lineStyle:{
                  color:'#999'
                }
              },
              axisLabel:{
                color:'#666'
              }
            }
          ],
          yAxis : [
            {
              type : 'value',
              axisTick: {
                  alignWithLabel: true,
                  lineStyle:{
                    color:'#999'
                  }
               },
              axisLine:{
                  lineStyle:{
                    color:'#999'
                  }
              },
              axisLabel:{
                color:'#666'
              }
            }
          ],
          series : [
            {
              name:'金额',
              type:'bar',
              barWidth: '60%',
              itemStyle: {
                normal: {
                  color: new echarts.graphic.LinearGradient(
                    0, 0, 0, 1,
                    [
                      {offset: 0, color: '#83bff6'},
                      {offset: 1, color: '#238BFF'}
                    ]
                  )
                },

              },
              data:money
            }
          ]
        });
      },
      getData(){
        this.$dialog.loading.open('正在加載中···')
        let that = this
        that.$api.indexIndex({
        })
          .then(function (response) {
            that.$dialog.loading.close()
            var data = response.data.data
            console.log(response)
            if( response.data.state==1){
              that.uid=data.uid
              cookie.set('uid', data.uid, {expires: 30000, path: '/'})
              cookie.set('username_zh', data.username_zh, {expires: 30000, path: '/'})
//              that.userName=data.username_zh
              that.userImg=data.u_logo
              that.userName=data.u_nickname
              that.balance_money=data.balance_money
              that.cumulate_money=data.cumulate_money
              that.expire_date=data.expire_date
              that.effective_order=data.effective_order
              that.added_order=data.added_order
              that.new_member_num=data.new_member_num
              that.my_member_num=data.my_member_num
              that.tip_show=data.tip_show
              that.days=data.days
              let month = data.month_arr,money = data.money_arr
              that.drawBar(month,money)
              that.userState = data.expire_status
              that.post_name = data.post_name
              that.my_customer_add = data.my_customer_add
              that.my_customer_num = data.my_customer_num
//              that.userState = 2
              if(data.expire_status==2){
                that.goBtnText='去購買'
              }
//              if(data.sex=='1'){
//                that.sex_id = 1
//                that.userImg='/static/img/man.png'
//              }else{
//                that.sex_id = 2
//                that.userImg='/static/img/woman.png'
//              }
            }else if(response.data.state==110){
              cookie.remove('login_id')
              cookie.remove('login_state')
              cookie.remove('token')
              cookie.remove('isvip')
              cookie.remove('quid')
              setTimeout(() => {
                that.$router.push({path: '/Login'})
              }, 500)
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

    },

    beforeDestroy () {

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

        .badgeSize{
            padding: 3px;
            position: relative;
            top: -5px;
        }
        background: #f5f5f5;
        .m-35{
            margin-top: 35px;
        }
        .top {
            /*background:linear-gradient(151deg,rgba(24,100,255,1) 0%,rgba(54,209,254,1) 100%);*/
            /*height: 3.4rem;*/
            background: url("/static/img/bg.png") no-repeat;
            width: 100%;
            height: 100%;
            background-size: contain;
            position: absolute;
            filter:progid:DXImageTransform.Microsoft.AlphaImageLoader(src='/static/img/ic_card.png',sizingMethod='scale');
            top:0;
            padding: 20px;
            font-size: .32rem;
            /*border-bottom: 1px solid #e5e5e5;*/
            .userInfo{
                border-bottom: .5px solid rgba(255,255,255,0.5);
                padding-bottom: .3rem;

                .userLogo {
                    width: 1.12rem;
                    height: 1.12rem;
                    border-radius: 50%;
                    /*border: 1px solid #fff;*/
                    display: inline-block;
                    img {
                        width: 1.1rem;
                        height: 1.1rem;
                        border-radius: 50%;
                    }
                }
                .userName{
                    font-weight: 600;
                    text-overflow: ellipsis;
                    overflow: hidden;
                    white-space: nowrap;
                    width: 3rem;
                    display: inline-block;
                    color: #fff;
                    padding-left: 5px;
                }
                .checkData{
                    font-size: .24rem;
                    color: #fff;
                    text-align: center;
                    border: 1px solid #fff;
                    width: 1.6rem;
                    height: .52rem;
                    line-height: .52rem;
                    border-radius: 30px;
                    float: right;
                }
            }
            .vipInfo{
                font-size: .24rem;
                color: #fff;
                padding-top: .24rem;
                .vipImg{
                    width: 19px;
                    height: 19px;
                }
                .userState{
                    position: relative;
                    text-align: right;
                }
                .noMember{
                    text-align: left;
                }
            }
        }
        .content{
            width: 90%;
            margin: 2.7rem auto 0 auto;
            padding-bottom: 1.2rem;
            /*margin-top: 2.8rem;*/
            position: relative;
            z-index: 2;
            #myChart{
                background: #fff;
                box-shadow:0px 4px 8px rgba(0,0,0,0.08);
                border-radius: @borderR;
                margin: 10px auto;
            }
            .groupBox{
                /*background: #fff;*/
                margin: 10px auto;
                font-size: .28rem;
                .no-link{
                    padding-right: 13px;
                }
            }
            .walletBox{
                font-size: .24rem;
                text-align: center;
                background: #fff;
                box-shadow:0px 4px 8px rgba(0,0,0,0.08);
                height: 1.3rem;
                position: relative;
                border-radius: @borderR;
                padding-top: 6px;
                .box{
                    width: 49%;
                    display: inline-block;
                    position: relative;
                    text-align: left;
                    padding-left: 5px;
                    .iconR{
                        width: 10px;
                        position: absolute;
                        right: 10px;
                        top: 20px;
                    }
                    &:not(:last-child):after{
                        content: '';
                        border-right: 1px solid #e5e5e5;
                        display: block;
                        height: .8rem;
                        position: absolute;
                        top: .2rem;
                        right: -5px;
                    }
                    .moneyNum{
                        font-weight: 600;
                        font-size: .24rem;
                    }
                    .imgBox,.numBox{
                        display: inline-block;
                    }
                    .imgBox{

                    }
                    .numBox{
                        position: relative;
                        top: .2rem;
                        left: -6px;
                    }
                    .walletImg{
                        width: 55px;
                        height: 55px;
                    }
                }
                .box.borderR::after{
                    content: '';
                    display: inline-block;
                    height: 40px;
                    position: absolute;
                    right: 0;
                    top: 9px;
                    border-right: 1px solid #e5e5e5;
                }
            }
            .VChart{
                margin: 10px auto;
                box-shadow:0px 4px 8px rgba(0,0,0,0.08);
                border-radius:6px;
            }
        }
        .contentHtml{
            padding: 15px;
        }
        .footer{
           .subBtn{
               margin: 10px auto;
           }
        }
    }
</style>
