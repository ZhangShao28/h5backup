<template>
    <div id="payment">
        <x-header></x-header>
        <div class="content">
            <div><h2>购买固定车位</h2> </div>
            <div class="box">
                <div class="box_list" :class="selected==index?'box_list_selected':' '" @click="click_select(index,item.id)" v-for="(item,index) in box_list" :key="index">
                    <div class="num">{{item.num}}个月</div>
                    <div class="money">{{item.money}}元</div>
                    <img v-show="selected==index" src="static/Selectionstate.png" alt="">
                </div>
            </div>
            <div class="radio">
                <div>请选择支付方式：</div>
                <div>
                    <checklist :options="commonList"  v-model="radioValue" :max="1" :min="1" @on-change="change"></checklist>
                </div>
            </div>
            <div class="btn">
                <x-button type="primary" @click.native="submit_btn">支     付</x-button>
            </div>
        </div>
    </div>
</template>

<script>
  import { XHeader,Checklist,XButton } from 'vux'

  export default {
    components: {
      XHeader,
      Checklist,
      XButton,
    },
    data () {
      return {
        selected:0,
        pay_id:'',
        box_list:[
          {
            id:1,
            num:'1',
            money:100
          },
          {
            id:2,
            num:'3',
            money:300
          },
          {
            id:3,
            num:'6',
            money:600
          },
          {
            id:4,
            num:'12',
            money:1200
          },
        ],
        commonList:[
          {key:1,value:'微信支付'},
          {key:2,value:'支付宝支付'},
          {key:3,value:'银行卡支付'}
          ],
        radioValue:[1]
      }
    },
    methods:{
      click_select(index,id){
        this.selected = index
        this.pay_id = id
        console.log(index,id)
      },
      change(el){
        console.log(el)
      },
      submit_btn(){
        console.log(this.radioValue)
      }
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style  lang="less">
    #payment{
        .vux-header{
            background: #fff;
            border-bottom: 1px solid #e6e6e6;
        }
        .vux-header .vux-header-left a, .vux-header .vux-header-right a{
            color: #999;
        }
        .vux-header .vux-header-left .left-arrow:before{
            border-color: #999;
        }
        .content {
            background: #fff;
            padding:40px 20px;
            h2{
                text-align: center;
            }
            .radio{
                 .weui-cells_checkbox .weui-check:checked + .vux-checklist-icon-checked:before{
                    color: #ffa800;
                }
                 .weui-cells:before, .weui-cell:before, .weui-cells:after, .weui-cell:after{
                     border: none;
                 }

            }
            .btn{
                margin-top: 40px;
                .weui-btn_primary{
                    background: #ffa800;
                }
            }
            .box{
                margin:0 auto;
                padding-top: 20px;
                text-align: center;
                .box_list{
                    position: relative;
                    border: 1px solid #e6e6e6;
                    text-align: center;
                    width: 150px;
                    height: 70px;
                    padding-top: 15px;
                    display: inline-block;
                    background: #fff;
                    margin-bottom: 20px;
                    /*img{*/
                        /*position: absolute;*/
                        /*right: 0;*/
                        /*bottom: 0;*/
                    /*}*/
                }
                .box_list_selected{
                    border: 1px solid #FFAF05;
                        img{
                            position: absolute;
                            right: 0;
                            bottom: 0;
                        }
                    }
                .box_list:nth-child(n+1){
                    margin-right: 10px;
                }
            }

        }
    }
</style>
