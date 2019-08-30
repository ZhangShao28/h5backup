<template>
    <div id="news">
        <div style="height: 44px;position: fixed;width: 100%;z-index: 100">
            <!--<sticky  scroll-box="vux_view_box_body">-->
            <!--<tab :line-width="2">-->
                <!--<tab-item :selected="news_select_id === index" v-for="(item, index) in list"-->
                          <!--:class="{'vux-1px-r': index===0}" @on-item-click="handler" :key="index">{{item.title}}-->
                <!--</tab-item>-->
            <!--</tab>-->
            <!--</sticky>-->
        </div>
        <div class="news_content">
            <!--<yd-infinitescroll v-if="news_select_id==0" :callback="loadList1" ref="infinitescrollDemo">-->
                <!--<yd-list theme="1" slot="list">-->
                    <!--<div v-for="(item,index) in news_list1" :key="index" class="news_list">-->
                        <!--&lt;!&ndash;<a :href="aurl+item.id">&ndash;&gt;-->
                        <!--<router-link :to="{path:'/NewsDetail',query:{id:item.id}}">-->
                            <!--<div v-if="(index+1)%5==0">-->
                                <!--<div class="news_con1">-->
                                    <!--<div class="title">-->
                                        <!--{{item.title}}-->
                                    <!--</div>-->
                                    <!--<div class="news_img">-->
                                        <!--<img :src="item.img" alt="">-->
                                    <!--</div>-->
                                <!--</div>-->
                                <!--<div class="news_title1">-->
                                    <!--<div class="tit">{{item.property_name}}</div>-->
                                    <!--<div class="">{{item.pub_time}}</div>-->
                                <!--</div>-->
                            <!--</div>-->
                            <!--<div v-else>-->
                                <!--<div class="news_con2">-->
                                    <!--<div class="title">-->
                                        <!--{{item.title}}-->
                                    <!--</div>-->
                                    <!--<div class="news_img" v-if="item.img!=''">-->
                                        <!--<img :src="item.img" alt="">-->
                                    <!--</div>-->
                                <!--</div>-->
                                <!--<div class="news_title2">-->
                                    <!--<div class="tit">{{item.property_name}}</div>-->
                                    <!--<div class="">{{item.pub_time}}</div>-->
                                <!--</div>-->
                            <!--</div>-->
                        <!--</router-link>-->
                        <!--&lt;!&ndash;</a>&ndash;&gt;-->
                    <!--</div>-->
                <!--</yd-list>-->
                <!--<span slot="loadingTip">正在加載···</span>-->
                <!--<span slot="doneTip" v-show="show_more">沒有更多數據了~~</span>-->
            <!--</yd-infinitescroll>-->
            <yd-infinitescroll v-if="news_select_id==1" :callback="loadList2" ref="infinitescrollDemo">
                <yd-list theme="1" slot="list">
                    <div v-for="(item,index) in news_list2" :key="index" class="news_list">
                        <router-link :to="{path:'/NewsDetail',query:{id:item.id}}">
                            <div>
                                <div class="news_title">
                                    <div class="logo"><img :src="item.c_logo" alt=""></div>
                                    <div class="title">
                                        <div class="tit">{{item.property_name}}</div>
                                        <div class="">{{item.pub_time}}</div>
                                    </div>
                                </div>
                                <div class="news_con">
                                    <div class="title">
                                        {{item.title}}
                                    </div>
                                    <div class="news_img">
                                        <img :src="item.img" alt="">
                                    </div>
                                </div>
                            </div>
                        </router-link>
                    </div>
                </yd-list>
                <span slot="loadingTip">正在加載···</span>
                <span slot="doneTip" v-show="show_more">沒有更多數據了~~</span>
            </yd-infinitescroll>
            <div v-show="show_nodata" class="no_data">
                <img src="/static/img/ic_apply_invalid.png" alt="">
                <div class="title">暫無數據</div>
            </div>
        </div>
    </div>
</template>
<script>
  import { Tab, TabItem, Checklist, Sticky, cookie, Loading, LoadMore, Panel } from 'vux'
  export default {
    components: {
      Tab,
      TabItem,
      Checklist,
      Sticky,
      Panel,
      cookie,
      Loading,
      LoadMore,
    },
    data () {
      return {
//        aurl:'',
        scrollTop:'',
        page: 1,
        pageSize: 10,
        news_list1: [],
        news_list2: [],
        show_nodata: false,
        show_more: true,
        loading_show: false,//按钮禁用
        list: [
          {
            title: '全部新聞'
          },
          {
            title: '我的新聞'
          }
        ],
        news_select_id: 1,//默認為會議通知
      }
    },
    mounted(){
      console.log('title',document.title)
      document.title=cookie.get('xh_name')
//      document.addEventListener('scroll',this.handelscroll)
//      let  htp = location.href.split('//')[0], host = window.location.host
//      this.aurl = htp + '//' + host + '/NewsDetail?id='
      document.getElementsByTagName('body')[0].setAttribute('style', 'background:#f5f5f5')
      var that = this, ids = cookie.get('news_select_id'), pid = this.$route.params.pid
      that.$refs.infinitescrollDemo.$emit('ydui.infinitescroll.reInit')
      that.show_nodata = false
      that.show_more = false
      that.news_list1 = []
      that.news_list2 = []
      that.page = 1
//      if (ids == 0 || ids == undefined) {
//        that.news_select_id = 0
//          that.loadList1()
//      } else if (ids == 1) {
//        that.news_select_id = 1
//        that.loadList2()
//      }
      that.loadList2()
    },
    methods: {
//      handelscroll() {
//        this.scrollTop = document.body.scrollTop|| document.documentElement.scrollTop || window.pageYOffset
////        sessionStorage.setItem('scrollTop',this.scrollTop)
//        cookie.set('scrollTop', this.scrollTop, {expires: 30000, path: '/'})
//      },
      onImgError (item, $event) {
        console.log(item, $event)
      },
      loadList1() {
        var that = this
        that.$dialog.loading.open('正在加載中···')
          that.api.newsIndex({
            page: this.page,
            type: '2',
            cid: cookie.get('cid')
          }).then(response => {
          console.log(response)
          if (response.data.state == 1) {
            // sucess callback
            var data = response.data.data.news
            document.title = response.data.data.title
            cookie.set('xh_name', response.data.data.title, {expires: 30000, path: '/'})
            that.$dialog.loading.close()
            for (var i = 0; i < data.length; i++) {
              that.news_list1.push(data[i])
            }
            if (response.data.data.pages <= 2 && data.length == 0) {
              that.show_nodata = true
            }
            if (response.data.data.pages <= 2 && data.length <= 10) {
              that.show_more = false
            }
            if (data.length < that.pageSize || that.page == response.data.data.pages) {
                /* 所有数据加载完毕 */
              that.$refs.infinitescrollDemo.$emit('ydui.infinitescroll.loadedDone')
              if (response.data.data.pages >= 3) {
                that.show_more = true
              } else {
                that.show_more = false
              }
              return
            }

              /* 单次请求数据完毕 */
            this.$refs.infinitescrollDemo.$emit('ydui.infinitescroll.finishLoad')
            that.page++
          } else {
            that.$dialog.loading.close()
            that.$dialog.toast({
              mes: response.data.msg,
              timeout: 1500,
              callback: () => {
              }
            })
          }

        }, response => {
          // error callback
          that.$dialog.loading.close()
            console.log(response)
//                that.$dialog.toast({
//                  mes: response.data.msg,
//                  timeout: 1500,
//                  callback:()=>{
//                  }
//                });
        })
      },
      loadList2() {
        var that = this
        that.$dialog.loading.open('正在加載中···')
        that.api.newsIndex({
            page: this.page,
            type: '1',
            cid: cookie.get('cid')
          }).then(response => {
          console.log(response)
          if (response.data.state == 1) {
            // sucess callback
            var data = response.data.data.news
            that.$dialog.loading.close()
            for (var i = 0; i < data.length; i++) {
              that.news_list2.push(data[i])
            }
            if (response.data.data.pages <= 2 && data.length == 0) {
              that.show_nodata = true
            }
            if (response.data.data.pages <= 2 && data.length <= 10) {
              that.show_more = false
            }
            if (data.length < that.pageSize || that.page == response.data.data.pages) {
                /* 所有数据加载完毕 */
              that.$refs.infinitescrollDemo.$emit('ydui.infinitescroll.loadedDone')
              if (response.data.data.pages >= 3) {
                that.show_more = true
              } else {
                that.show_more = false
              }
              return
            }

              /* 单次请求数据完毕 */
            this.$refs.infinitescrollDemo.$emit('ydui.infinitescroll.finishLoad')
            that.page++
          } else {
            that.$dialog.loading.close()
            that.$dialog.toast({
              mes: response.data.msg,
              timeout: 1500,
              callback: () => {
              }
            })
          }

        }, response => {
          // error callback
          that.$dialog.loading.close()
//                that.$dialog.toast({
//                  mes: response.data.msg,
//                  timeout: 1500,
//                  callback:()=>{
//                  }
//                });
        })
      },
      handler(el){
        var that = this
        that.$refs.infinitescrollDemo.$emit('ydui.infinitescroll.reInit')
        cookie.set('news_select_id', el, {expires: 30000, path: '/'})
        that.news_select_id = el
        that.show_nodata = false
        that.show_more = false
        that.news_list1 = []
        that.news_list2 = []
        that.page = 1
        if (el == 0) {
          that.loadList1()
        } else if (el == 1) {
          that.loadList2()
        }
      },
    },
//    deactivated (){
////      sessionStorage.setItem('scrollTop',this.scrollTop)
//      cookie.set('scrollTop', this.scrollTop, {expires: 30000, path: '/'})
//    },
//    activated () {
//
//        setTimeout(function () {
////        document.body.scrollTop =document.documentElement.scrollTop = window.pageYOffset =sessionStorage.getItem('scrollTop')
//          document.body.scrollTop =document.documentElement.scrollTop = window.pageYOffset =cookie.get('scrollTop')
//        },500)
//    },
    beforeCreate () {
      document.body.setAttribute('class', '')
    },
    beforeDestroy () {
      document.getElementsByTagName('body')[0].setAttribute('style', '')
    }
  }
</script>
<style lang="less" type="text/less">
    #news {
        .vux-tab-wrap {
            box-shadow: 0px 1px 3px rgba(0, 0, 0, 0.1);
            .vux-tab .vux-tab-item.vux-tab-selected {
                color: #3D82D9;
                border-bottom: 3px solid #3D82D9;
            }
            .vux-tab-ink-bar {
                background-color: #3D82D9;
                width: 70px;
                margin: 0 auto;
            }
            .vux-tab .vux-tab-item {
                font-size: 16px;
            }
        }
        .yd-list {
            border-radius: 8px;
        }
        .yd-list-donetip {
            padding: 0 0 .4rem 0;
            font-size: .6rem;
            color: #999;
        }

        .yd-list-loading {
            padding: 0 0 .5rem 0;
            font-size: .6rem;
        }
    }
    #news .news_content {

        .no_data {
            text-align: center;
            padding-top: 1.5rem;
            color: #999;
            width: 100%;
            font-size: 0.65rem;
            .title {
                position: relative;
                top: -40px;
            }

            img {
                width: 100%;
            }
        }
    }
</style>
<style scoped lang="less" type="text/less">
    #news {

        .news_content {
            /*padding: 55px 15px 70px 15px;*/
            padding: 15px 15px 70px 15px;

            .news_list {
                border-radius: 8px;
                box-shadow: 0px -1px 10px rgba(0, 0, 0, 0.1);
                background: #fff;
                margin: 0 auto 12px auto;
                padding: 18px 13px;
                color: #333;
                .news_con1 {
                    .title {
                        color: #000000;
                        font-size: .7rem;
                        margin-bottom: 4px;
                    }
                    .news_img {
                        width: 100%;
                        height: 100%;
                        img {

                            width: 100%;
                            border-radius: 4px;
                            /*height: 6.6133rem;*/
                        }
                    }
                }
                .news_title1 {
                    font-size: .5rem;
                    color: #888888;
                    display: flex;
                    justify-content: space-between;
                    position: relative;
                    top: 10px;
                    .tit {
                        font-size: .55rem;
                    }
                }
                .news_con2 {
                    display: flex;
                    justify-content: space-between;
                    .title {
                        color: #000000;
                        font-size: .7rem;
                        /*height: 2.7rem;*/
                        overflow: hidden;
                        text-overflow: ellipsis;
                        display: -webkit-box;
                        -webkit-line-clamp: 3;
                        -webkit-box-orient: vertical;
                        width: 8rem;
                    }
                    .news_img {
                        width: 5rem;
                        height: 3rem;
                        overflow: hidden;
                        img {
                            width: 6rem;
                            border-radius: 4px;
                            vertical-align: middle;
                        }
                    }
                }
                .news_title2 {
                    font-size: .5rem;
                    color: #888888;
                    display: flex;
                    justify-content: space-between;
                    position: relative;
                    top: 10px;
                    .tit {
                        font-size: .55rem;
                    }
                }
                .news_title {
                    margin-bottom: 10px;

                    .logo {
                        float: left;
                        width: 40px;
                        height: 40px;
                        background: #ccc;
                        border-radius: 25px;
                        margin-right: 10px;

                        img {
                            width: 40px;
                            height: 40px;
                            border-radius: 25px;
                        }

                    }
                    .title {
                        font-size: .50rem;
                        color: #999;

                        .tit {
                            font-size: .65rem;
                            color: #666;
                            position: relative;
                            top: 3px;
                        }

                    }
                }
                .news_con {
                    width: 13.2266rem;
                    margin: 0 auto;

                    .title {
                        /*font-weight: bold;*/
                        font-size: .72rem;
                        line-height: 1.2rem;
                        color: #333;
                        margin: 8px 0;
                        text-align: justify;
                        width: 100%;
                    }

                    /*.title i{*/
                    /*display:inline-block;*/
                    /*width:100%;*/
                    /*}*/
                    .news_img {
                        /*width: 13.2266rem;*/
                        width: 100%;
                        height: 100%;
                        /*height: 155px;*/
                        overflow: hidden;

                        img {

                            width: 100%;
                            border-radius: 4px;
                            /*height: 6.6133rem;*/
                        }

                    }
                }

            }
        }

    }
</style>
