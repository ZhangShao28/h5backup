<template>
    <div id="payment">
        <yd-popup v-model="showCharge" position="bottom" height="45%" masker-opacity=".2">
            <div class="chargeBox">
                <div class="chargeTitle">
                    需繳納：<span class="money_color">HK${{payMoney}}</span>
                </div>
                <div class="chargeRadio">
                    <yd-radio-group v-model="radioCharge" color="#4285F4" class="box">
                        <!--<yd-radio val="0">香港用戶支付</yd-radio>-->
                        <yd-radio val="1">微信支付</yd-radio>
                    </yd-radio-group>
                </div>
                <div class="chargeBtn">
                    <yd-button size="large" type="primary" @click.native="goCharge">去支付</yd-button>
                </div>
            </div>
        </yd-popup>
    </div>
</template>
<script>
  export default {
    props: {
      payMoney: this.payMoney
    },
    components: {},
    data(){
      return {
        radioCharge: '1',
        showCharge: false
      }
    },
    mounted () {
    },
    methods: {
      showChargeState(){
        this.showCharge = true
      },
      goCharge(){
        this.$emit('goCharge', this.radioCharge)
        this.showCharge = false
      }
    },
    watch: {}
  }
</script>
<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="less" type="text/less">
    #payment {

        .chargeBox {
            padding: 40px 30px;
            text-align: center;
            .chargeTitle {
                text-align: center;
                font-size: .8rem;
                .money_color {
                    font-weight: bold;
                    font-size: 1.2rem;
                    color: #F7B500;
                }
            }
            .chargeRadio {
                margin: 35px 0px;
                .yd-radio-icon {
                    top: -3px;
                }
                .yd-radio-text {
                    font-size: .7rem;
                    /*font-size: .55rem;*/
                }
                .yd-radio {
                    /*padding-right: 20px;*/
                    padding-right: 0px;
                }
                .box{
                    display: flex;
                    justify-content: space-around;
                }
            }
            .chargeBtn {
                button {
                    font-size: .7rem;
                    height: 1.8rem;
                    background: #3D82D9;
                }
            }
        }
    }
</style>
