<template>
    <div id="home">
       <div class="top">
           <img src="static/parking@2x.png" alt="">
       </div>
        <div class="select">
            <group>
                <popup-radio title="当前小区" :options="options" v-model="option"></popup-radio>
            </group>
        </div>
        <div class="content">
            <div class="box">
                <router-link :to="{name:'PayMent'}"> <div class="box_list" v-for="(item,index) in box_list" :key="index">
                   {{item.name}}
                </div>
                </router-link>
            </div>
            <div class="text">
                支持微信、支付宝支付
            </div>
        </div>
        <div class="footer">
            <h2>您的车开到停车场门口后，将会自动放行</h2>
            <div class="no_open" ><router-link :to="{name:'Help'}">道闸未开怎么办？</router-link></div>
        </div>
    </div>
</template>

<script>
  import { Group,PopupRadio } from 'vux'

  export default {
    components: {
      PopupRadio,
      Group
    },
    data () {
      return {
        options: ['小码社区', '万达广场', '中航紫金广场'],
        option:'小码社区',
        box_list:[
          {
            name:'临时停车,25元/次',
          },
          {
            name:'固定车位出租',
          },
        ]
      }
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style  lang="less">
    #home{
        .top img{
            width: 100%;
            height: 100%;
        }
        .weui-cells{
            margin: 0px;
        }
        .select{
            width: 100%;
            border-bottom: 1px solid #f8f8f8;
            position: relative;
            top: -20px;
        }
        .content{
            height: 200px;
            background: #fff;
            width: 96%;
            margin: 0 auto;
            .text{
                padding: 10px 25px;
                color: #666;
                font-size: .8rem;
            }
            .box{
                margin:0 auto;
                padding-top: 20px;
                width:90%;
                text-align: center;
                .box_list{
                    border: 1px solid #e6e6e6;
                    text-align: center;
                    width: 150px;
                    height: 80px;
                    line-height: 80px;
                    display: inline-block;
                    background: #fff;
                }
                .box_list:first-child{
                    margin-right: 10px;
                }
            }
        }
        .footer{
            background: #fff;
            position: fixed;
            bottom: 0px;
            width: 100%;
            margin:0 auto;
            h2{
                padding:20px;
                width: 80%;
                margin: 20px auto;
                text-align: center;
            }
            .no_open{
                padding-left: 20px;
                padding-bottom: 20px;
                a{
                    color: #0b8df4;
                }
            }
        }

    }
</style>
