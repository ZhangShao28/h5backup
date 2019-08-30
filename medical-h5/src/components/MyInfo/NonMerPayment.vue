<template>
    <div id="NonMerPayment">
        <div class="head">
            <div class="img">
                <!--<img src="/static/img/ic_card.png" alt="">-->
                <div class="text">
                    <div class="vipNum">會員ID:{{uid}}</div>
                    <div class="userName">{{username_zh}}<span>({{post_name}})</span></div>
                    <div class="time">已於{{expire_date}}日到期</div>
                </div>
            </div>
        </div>
        <div class="content">
            <div class="rule">
                續費后，佣金可提現；斷繳超過3個月，将不可繼續銷售產品，會員的推薦碼失效，不可增加下級，用戶購買的商品不計入佣金。請及時續費
            </div>
            <x-button class="bigBtn" @click.native="goPayment" text="續    費"></x-button>
        </div>
        <payMent ref="showState" :payMoney="charge_money" :payId="order_id" :payType=1
                 @goCharge="paymentState"></payMent>
    </div>
</template>
<script>
    import {XButton, cookie} from 'vux'
    import payment from '../common/payment.vue'
  export default {
    components: {
      XButton,
      cookie,
      payMent: payment
    },
    data () {
      return {
        charge_money:'',
        order_id:0,
        username_zh:'',
        expire_date:'',
        uid:'',
      }
    },
    mounted(){
        this.getData()
    },
    methods: {
      getData(){
        let that = this
        that.$api.userMy({})
          .then(res => {
            var data = res.data.data
            console.log(res)

            that.username_zh = data.username_zh
            that.expire_date = data.expire_date
            that.money = data.money
            that.uid=data.uid
            that.uid=data.uid
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
      getMoney(){
        let that = this;
        that.$api.orderIndex({

        }).then(response=>{
          console.log(response)
          if (response.data.state == 1) {
            that.charge_money = response.data.data.money
            that.order_id = response.data.data.order_id
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
      goPayment(){
        var that = this
        that.getMoney()
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
      document.querySelector('body').setAttribute('style', 'background-color:#fff;')
    },

    beforeDestroy () {
      document.querySelector('body').removeAttribute('style')
    }
  }
</script>
<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="less" type="text/less">
</style>
<style scoped lang="less" type="text/less">
    #NonMerPayment{
        padding-top: 10px;
        .head{
            color: #fff;
            font-size: .24rem;
            .img{
                background: url("/static/img/ic_card_overdue.png") no-repeat;
                width: 100%;
                height: 100%;
                background-size: contain;
                position: absolute;
                filter:progid:DXImageTransform.Microsoft.AlphaImageLoader(src='/static/img/ic_card_overdue.png',sizingMethod='scale');
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
        }
        .content{
            .rule{
                color: #666;
                font-size: .26rem;
                padding: 4.3rem 28px 28px 28px;
            }
        }
    }
</style>
