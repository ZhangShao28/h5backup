<template>
    <div id="wallet">
        <div class="head">
            <div class="headTop">
                <div class="title">錢包</div>
                <div>HK$ <span class="num">{{balance_money}}</span></div>
            </div>
            <div class="headBottom">
                <div class="box">
                    <div>累計佣金</div>
                    <div class="num">{{cumulate_money}}</div>
                </div>
                <div class="box">
                    <div>提現</div>
                    <div class="num">{{tixian_money}}</div>
                </div>
                <div class="box">
                    <div>餘額抵扣</div>
                    <div class="num">{{yue_deduction_money}}</div>
                </div>
            </div>
        </div>
        <div class="content">
            <group>
                <cell is-link :link="{path:'/CashRecord'}"><span slot="title"><img src="/static/img/ic_drawing.png" alt="">提款記錄</span></cell>
                <cell is-link :link="{path:'/ApplyCash'}"><span slot="title"><img src="/static/img/ic_apply.png" alt="">申請提現</span></cell>
                <cell is-link :link="{path:'/OrderCommission'}"><span slot="title"><img src="/static/img/ic_commission.png" alt="">訂單佣金</span></cell>
                <cell is-link :link="{path:'/AccountSetting'}"><span slot="title"><img src="/static/img/ic_install.png" alt="">銀行賬戶</span></cell>
                <cell is-link :link="{path:'/MyReward'}"><span slot="title"><img src="/static/img/ic_reward.png" alt="">我的獎勵</span></cell>
            </group>
            <!--<div class="tip">*每月15日恒高公司將本月佣金自動提現到個人賬戶，請及時填寫賬戶設置</div>-->
        </div>
    </div>
</template>
<script>
  import {  Group, Cell,  cookie } from 'vux'
  export default {
    components: {
      Group,
      Cell,
      cookie,
    },
    data () {
      return {
        balance_money:'0.00',
        cumulate_money:'0.00',
        tixian_money:'0.00',
        yue_deduction_money:'0.00',
      }
    },
    mounted(){
        this.getData()
    },
    methods: {
      getData(){
        let that = this
        that.$api.walletIndex({})
          .then(res => {
            var data = res.data.data
            console.log(res)
            if( res.data.state==1){
              that.balance_money = data.balance_money
              that.cumulate_money = data.cumulate_money
              that.tixian_money = data.tixian_money
              that.yue_deduction_money = data.yue_deduction_money
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
    },
    beforeCreate () {
      document.querySelector('body').setAttribute('style', 'background-color:#f5f5f5;')
    },

    beforeDestroy () {
      document.querySelector('body').removeAttribute('style')
    }
  }
</script>
<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="less" type="text/less">
    #wallet{
        .weui-cells{
            font-size: .28rem;
        }
    }
</style>
<style scoped lang="less" type="text/less">
    #wallet{
        .head{
            color: #fff;
            background:linear-gradient(151deg,rgba(24,100,255,1) 0%,rgba(54,209,254,1) 100%);
            .headTop{
                padding: 30px 0;
                text-align: center;
                font-size: .3rem;
                border-bottom: 1px solid rgba(255,255,255,.5);
                .num{
                    font-size: .5rem;
                    font-weight: 600;
                }
            }
            .headBottom{
                display: flex;
                justify-content: space-around;
                padding: 16px 0;
                .box{
                    text-align: center;
                    font-size: .26rem;
                    position: relative;
                    .num{
                        font-size: .3rem;
                    }
                    &:not(:last-child):after{
                        content: '';
                        border-right: 1px solid rgba(255,255,255,.5);
                        display: block;
                        height: .8rem;
                        position: absolute;
                        top: 0rem;
                        right: -1rem;
                    }
                }
            }
        }
        .content{
            margin-top: 10px;
            font-size: .28rem;
            img{
                width: 20px;
                height: 20px;
                margin-right: 5px;
            }
            .tip{
                font-size: .24rem;
                padding: 20px;
                color: #666;
            }
        }
    }
</style>
