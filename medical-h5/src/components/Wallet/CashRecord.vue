<template>
    <div id="cashRecord">
        <div class="tabBox">
            <!--<sticky  scroll-box="vux_view_box_body">-->
            <tab :line-width="2">
                <tab-item :selected="select_id === index" v-for="(item, index) in tabList"
                           @on-item-click="handler" :key="index">{{item.title}}
                </tab-item>
            </tab>
            <!--</sticky>-->
        </div>
        <div class="content">
            <yd-infinitescroll  :callback="loadList" ref="infinitescrollDemo">
                <yd-list theme="1" slot="list">
                    <div v-if="select_id==0" v-for="(item,index) in list" :key="index" class="recordList">
                        <!--<router-link :to="{path:'/MeetingDetail',query:{id:item.id}}">-->
                        <group>
                            <cell>
                                <span slot="title">
                                    <div class="moneyNum">HK$   {{item.tx_money}}</div>
                                </span>
                                <span slot>
                                      <div class="time">{{item.create_time}}</div>
                                </span>
                            </cell>
                        </group>

                        <!--</router-link>-->
                    </div>
                    <div v-if="select_id==1" v-for="(item,index) in list" :key="index" class="recordList AuditList">
                        <!--<router-link :to="{path:'/MeetingDetail',query:{id:item.id}}">-->
                        <group>
                            <cell>
                                <span slot="title">
                                    <div class="moneyNum">HK$   {{item.tx_money}}</div>
                                    <div class="moneyTips">(含手續費{{item.man_work_fee}})</div>
                                </span>
                                <span slot>
                                      <div class="time">{{item.create_time}}</div>
                                    <div class="title " :class="item.audit_state==2?'success':'error'">{{item.audit_state_name}}</div>
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
    </div>
</template>
<script>
  import {Tab, TabItem, cookie, Sticky, Loading, LoadMore,Cell,Group } from 'vux'
  export default {
    components: {
      Tab,
      TabItem,
      cookie,
      Sticky,
      Loading,
      LoadMore,
      Group,
      Cell
    },
    data () {
      return {
        page: 1,
        pageSize: 10,
        list:[],
        show_nodata: false,
        show_more: true,
        tabList: [
          {
            title: '已提現'
          },
          {
            title: '審核中'
          }
        ],
        select_id: 0,
      }
    },
    mounted(){
      let that = this,ids;
      that.$refs.infinitescrollDemo.$emit('ydui.infinitescroll.reInit')
      that.show_nodata = false
      that.show_more = false
      that.list = []
      that.page = 1
      if (ids == 0 || ids == undefined) {
        that.select_id = 0
        that.loadList(1)
      } else{
        that.select_id = 1
        that.loadList(2)
      }
    },
    methods: {
      handler(el){
        var that = this
        that.$refs.infinitescrollDemo.$emit('ydui.infinitescroll.reInit')
        cookie.set('select_id', el, {expires: 30000, path: '/'})
        that.select_id = el
        that.show_nodata = false
        that.show_more = false
        that.list = []
        that.page = 1
        that.loadList(el+1)

      },
      loadList(type) {
        var that = this
        that.$dialog.loading.open('正在加載中···')
//                console.log(that.page)
        that.$api.walletTixianlog({
          page: that.page,
          type:type
        }).then(response => {
          that.$dialog.loading.close()
          // sucess callback
          var data = response.data.data.tixian
//                    var data = that.active_list;
          console.log(response,data)
          for (var i = 0; i < data.length; i++) {
            that.list.push(data[i])
          }
          if (response.data.data.pages <= 1 && data.length == 0) {
            that.show_nodata = true
          }
          if (response.data.data.pages <= 1 && data.length <= 10) {
            that.show_more = false
          }
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
<style scoped lang="less" type="text/less">
    #cashRecord{
        .content{
            padding-top: 50px;
            .recordList{
                .moneyNum{
                    font-size: .3rem;
                    color: @themeColor;
                    font-weight: bold;
                }
                .time{
                    font-size: .28rem;
                    color: #666;
                }
            }
            .AuditList{
                .weui-cell{
                    padding:15px;
                }
                .moneyTips{
                    font-size: .24rem;
                    color: #999;
                    padding-top: 5px;
                }
                .title{
                    font-size: .24rem;
                    padding-top: 5px;
                    &.success{
                        color: @themeColor;
                    }
                    &.error{
                        color: #FF5623;
                    }
                }
            }
            .title{
                font-size: .24rem;
            }
        }
    }
</style>
