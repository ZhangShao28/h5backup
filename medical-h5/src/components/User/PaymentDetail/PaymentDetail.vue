<template>
    <div id="order">
        <div class="content">
            <yd-infinitescroll :callback="loadList" ref="infinitescrollDemo">
                <yd-list theme="1" slot="list">
                    <div v-for="(item,index) in list" :key="index" class="orderlist">
                        <!--<router-link :to="{path:'/MeetingDetail',query:{id:item.id}}">-->

                        <div class="listDiv">
                            <div><span class="title">訂單號：</span>{{item.order_no}}</div>
                            <div class="detailBox">
                                <div><span class="title">產品：</span> {{item.product_name}}</div>
                                <!--<div class="time">2019-04-01 15:30:20</div>-->
                            </div>
                            <div class="detailBox">
                                <div><span class="title">{{item.type_name}}：</span><span class="moneyNum">HK$ {{item.pay_money}}</span></div>
                                <div class="time">{{item.pay_time}}</div>
                            </div>
                        </div>
                        <!--</router-link>-->
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
        </div>
        <!--<div class="footer">-->
            <!--<group>-->
                <!--<cell>-->
                    <!--<span slot="title">累計佣金</span>-->
                    <!--<span slot class="totalMoney">HK$  {{total_money}}</span>-->
                <!--</cell>-->
            <!--</group>-->
        <!--</div>-->
    </div>
</template>
<script>
  import {  Group,Cell, Toast, cookie } from 'vux'
  export default {
    components: {
      Group,
      Cell,
      Toast,
      cookie,
    },
    data () {
      return {
        page: 1,
        pageSize: 10,
        list: [],
        show_nodata: false,
        show_more: true,
      }
    },
    mounted(){
        this.loadList()
    },
    methods: {
      loadList() {
        var that = this
        that.$dialog.loading.open('正在加載中···')
//                console.log(that.page)
        that.$api.H5OrderPaylog({
          page: that.page,
        }).then(response => {
          // sucess callback
          let data = response.data.data.paylog
          console.log(response)
          that.$dialog.loading.close()
          for (var i = 0; i < data.length; i++) {
            that.list.push(data[i])
          }
          if (response.data.data.pages <= 1 && data.length == 0) {
            that.show_nodata = true
          }
          if (response.data.data.pages <= 1 && data.length <= 10) {
            that.show_more = false
          }
//                    console.log(data.length,that.pageSize,that.page,response.data.data.pages)
          if (data.length < that.pageSize || that.page == response.data.data.pages) {
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
    },
    beforeCreate () {

    },
    beforeDestroy () {

    }
  }
</script>
<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="less" type="text/less">
    #order{
        .weui-cells{
            font-size: .28rem;
        }
        .weui-cell{
            padding: 15px;
        }
    }
</style>
<style scoped lang="less" type="text/less">
    #order{
        .content{
            /*margin-bottom: 60px;*/
            font-size: .28rem;
            padding-bottom: 60px;
            .orderlist{
                background: #fff;
                padding: 0px 15px 0px 15px;
                border-bottom: 1px solid #e6e6e6;
                .detailBox{
                    display: flex;
                    justify-content: space-between;
                    align-items: center;
                    .time{
                        color: #666;
                    }
                }
                .title{
                    color: #666;
                }
                .weui-cell{
                    padding: 13px 15px;
                }
                .moneyNum{
                    color: @themeColor;
                    font-weight: bold;
                }
                .listDiv{
                    /*border-bottom: 1px solid #e6e6e6;*/
                    padding-bottom: 10px;
                    padding-top: 15px;
                    line-height: 30px;
                }
            }
        }
        .footer{
            position: fixed;
            width: 100%;
            bottom: 0;
            left:0;
            border-top: 1px solid #f8f8f8;
            box-shadow:0px 2px 8px rgba(0,0,0,0.08);
            .totalMoney{
                font-weight: bold;
                color: @themeColor;
                font-size: .4rem;

            }

        }
    }
</style>
