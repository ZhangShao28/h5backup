<template>
    <div id="MyReward">
        <div class="content">
            <yd-infinitescroll :callback="loadList" ref="infinitescrollDemo">
                <yd-list theme="1" slot="list">
                    <div v-for="(item,index) in list" :key="index" class="orderlist">
                        <!--<router-link :to="{path:'/MeetingDetail',query:{id:item.id}}">-->
                        <group>
                            <cell>
                                <span slot="title" class="listDiv">
                                    <div class="month">{{item.award_month}}推薦獎勵</div>
                                </span>
                                <span slot class="listDiv">
                                    <div class="time">{{item.award_date}}</div>
                                    <div class="moneyNum">+ HK$ {{item.award_money}}</div>
                                </span>
                            </cell>
                        </group>
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
                    <!--<span slot class="totalMoney">HK$  {{totalMoney}}</span>-->
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
        totalMoney:'0.00',
        list: [ ],
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
        this.$dialog.loading.open('正在加載中···')
//                console.log(this.page)
        that.$api.walletAward({
          page: this.page,
        }).then(response => {
          // sucess callback
          var data = response.data.data.award
//                    var data = this.active_list;
          console.log(response)
          this.$dialog.loading.close()
          for (var i = 0; i < data.length; i++) {
            this.list.push(data[i])
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
    },
    beforeCreate () {

    },
    beforeDestroy () {

    }
  }
</script>
<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="less" type="text/less">
    #MyReward{
        .weui-cells{
            font-size: .28rem;
        }
        .weui-cell{
            padding: 15px;
        }
    }
</style>
<style scoped lang="less" type="text/less">
    #MyReward{
        .content{
            /*margin-bottom: 60px;*/
            font-size: .28rem;
            padding-bottom: 60px;
            .orderlist{
                .month{
                    font-size: .3rem;
                }
                .weui-cell{
                    padding: 13px 15px;
                }
                .moneyNum{
                    color: @themeColor;
                    font-weight: bold;
                }
                .listDiv{
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
