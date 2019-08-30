<template>
    <div id="MyTeam">
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
            <yd-infinitescroll v-if="select_id==0" :callback="loadList1" ref="infinitescrollDemo">
                <yd-list theme="1" slot="list">
                    <div v-for="(item,index) in list1" :key="index">
                        <!--<router-link :to="{path:'/MeetingDetail',query:{id:item.id}}">-->
                        <group class="box">
                            <cell>
                                <span slot="title">
                                    <div><span class="tit">{{item.username_zh}}</span>(ID:{{item.uid}}) <span class="expireStateFail" v-if="item.expire_state==2">已過期</span></div>
                                    <div class="title">{{item.post_name}}</div>
                                    <div class="title">個人銷售總額：</div>
                                    <div class="title">個人帶來佣金：</div>
                                </span>
                                <span slot>
                                    <div class="tit">有效期至：{{item.expire_date}}</div>
                                    <div class="time">會費：HK$ {{item.member_fee}}</div>
                                    <div class="time">HK$ {{item.sale_money}}</div>
                                    <div class="time">HK$ {{item.money}}</div>
                                </span>
                            </cell>
                            <router-link :to="{path:'/MyTeams',query:{uid:item.uid}}">
                                <div class="subordinate">
                                    <div><span class="_color">{{item.lower_level_num}}</span>個下級成員</div>
                                    <div><img src="/static/img/iconR.png" alt=""></div>
                                </div>
                            </router-link>
                        </group>
                        <!--</router-link>-->
                    </div>
                </yd-list>
                <!-- 数据全部加载完毕显示 -->
                <span slot="loadingTip">正在加載···</span>
                <span slot="doneTip" v-show="show_more">沒有更多數據了~~</span>
            </yd-infinitescroll>
            <div v-if="select_id==1" :class="superior?'':'display-none'">
                <!--<router-link :to="{path:'/MeetingDetail',query:{id:item.id}}">-->
                <group>
                    <cell>
                        <span slot="title">
                            <div>{{superior}}</div>
                        </span>
                        <span slot>
                            <div class="time">{{time}}</div>
                        </span>
                    </cell>
                </group>
                <!--</router-link>-->
            </div>
            <!--<yd-infinitescroll v-if="select_id==1" :callback="loadList2" ref="infinitescrollDemo">-->
                <!--<yd-list theme="1" slot="list">-->
                    <!--&lt;!&ndash;<div v-for="(item,index) in list2" :key="index" class="AuditList">&ndash;&gt;-->
                    <!--<div class="AuditList">-->
                        <!--&lt;!&ndash;<router-link :to="{path:'/MeetingDetail',query:{id:item.id}}">&ndash;&gt;ddd-->
                        <!--<group>-->
                            <!--<cell>-->
                                <!--<span slot="title">-->
                                    <!--<div>{{superior}}</div>-->
                                <!--</span>-->
                                <!--<span slot>-->
                                    <!--<div class="time">{{time}}</div>-->
                                <!--</span>-->
                            <!--</cell>-->
                        <!--</group>-->
                        <!--&lt;!&ndash;</router-link>&ndash;&gt;-->
                    <!--</div>-->
                <!--</yd-list>-->
                <!--&lt;!&ndash; 数据全部加载完毕显示 &ndash;&gt;-->
                <!--<span slot="loadingTip">正在加載···</span>-->
                <!--<span slot="doneTip" v-show="show_more">沒有更多數據了~~</span>-->
            <!--</yd-infinitescroll>-->
            <div v-show="show_nodata" class="no_data">
                <!--<img src="/static/img/ic_apply_invalid.png" alt="">-->
                <div class="title">暫無數據</div>
            </div>
        </div>
    </div>
    </div>
</template>
<script>
  import { Tab, TabItem, cookie, Sticky, Loading, LoadMore, Cell, Group } from 'vux'
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
        list1: [ ],
        show_nodata: false,
        show_more: true,
        superior:'',
        time:'',
        tabList: [
          {
            title: '下級'
          },
          {
            title: '上級'
          }
        ],
        select_id: 1,
      }
    },
    mounted(){
      let that = this,ids;
      if (ids == 0 || ids == undefined) {
//        that.$refs.infinitescrollDemo.$emit('ydui.infinitescroll.reInit')
        that.show_nodata = false
        that.show_more = false
        that.list1 = []
        that.list2 = []
        that.page = 1
        that.select_id = 0
        that.loadList1()
      } else if (ids == 1) {
        that.select_id = 1
        that.loadList2()
      }
    },
    methods: {
      handler(el){
//                console.log('id',el)
        var that = this
        cookie.set('select_id', el, {expires: 30000, path: '/'})
        that.select_id = el
        if (el == 0) {
          that.show_nodata = false
          that.show_more = false
          that.list1 = []
          that.list2 = []
          that.page = 1
          that.loadList1()
        } else if (el == 1) {
          that.loadList2()
        }
      },
      loadList1() {
        console.log('下级')
        var that = this
        this.$dialog.loading.open('正在加載中···')
//                console.log(this.page)
        that.$api.userMyteam({
          page: this.page,
          type:1
        }).then(response => {
          // sucess callback
          var data = response.data.data.team
//                    var data = this.active_list;
          console.log(response)
          this.$dialog.loading.close()
          for (var i = 0; i < data.length; i++) {
            this.list1.push(data[i])
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
      loadList2() {
        var that = this
        that.$dialog.loading.open('正在加載中···')
//                console.log(this.page)
        that.$api.userMysuperior({
        }).then(response => {
          that.$dialog.loading.close()
          // sucess callback
          let data = response.data.data
          console.log(response)
          if (response.data.state == 1) {
            if(data.superior){
              that.superior = data.superior
              that.time = data.time
              this.show_nodata = false
            }else{
              this.show_nodata = true
            }
          }else{
            that.$dialog.toast({
              mes: response.data.msg,
              timeout: 1500,
              icon: 'error'
            })
          }
        })
          .catch(response=>{
            that.$dialog.loading.close()
            that.$dialog.toast({
              mes: response.data.msg,
              timeout: 1500,
              icon: 'error'
            })
          })
      }
    },
    beforeCreate () {

    },
    beforeDestroy () {

    }
  }
</script>
<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="less" type="text/less">
    #MyTeam{
        .weui-cells{
            font-size: .28rem;
        }
    }
</style>
<style scoped lang="less" type="text/less">
    #MyTeam {
        .content {
            padding-top: 50px;
            color: #333;
            .box{
                .subordinate{
                    padding: 10px 15px 14px 15px;
                    display: flex;
                    justify-content: space-between;
                    align-items: center;
                    position: relative;
                    &::before{
                        content: '';
                        display: inline-block;
                        width: 100%;
                        border-top: 1px solid #e8e8e8;
                        position: absolute;
                        top:-5px;
                        left: 0px;
                    }
                }
                img{
                    width: 10px;
                }
                .tit{
                    color: #333;
                }
                .time{
                    padding-top: 10px;
                    color: #666;
                }
                .title{
                    padding-top: 10px;
                    .expireStateFail{
                        color: #FF9315;
                    }
                }
                .moneyNum{
                    font-weight: bold;
                }
                .display-none{
                    display: none;
                }
            }
        }
    }
</style>
