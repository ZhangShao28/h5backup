<template>
    <div id="home">
        <div class="head">
            <div class="banner">
                <swiper :list="bannerList" @on-index-change="onIndexChange" dots-position="center" loop auto></swiper>
            </div>
            <div class="tabItem" id="tab" :class="tabBarFixed?'fixedTab':''">
                <tab>
                    <tab-item v-for="(item,index) in itemList" :key="index" :selected="selectedId===index" @on-item-click="classifyItem(index,item.classify_id)">{{ item.classify_name }}</tab-item>
                </tab>
            </div>
        </div>
        <div class="content">
            <div class="proList">
                <yd-infinitescroll :callback="loadList" ref="infinitescrollDemo">
                    <yd-list theme="3" slot="list">
                        <yd-list-item v-for="item, key in list" :key="key" type="link" :href="{path:'/ProductDetail',query:{id:item.id}}">
                            <img slot="img" v-lazy="item.img">
                            <span slot="title" class="title">{{item.product_name}}</span>
                            <yd-list-other slot="other">
                                <div class="priceBox">
                                    <span class="price">HK$ {{item.sales_price}}</span>
                                </div>
                            </yd-list-other>
                        </yd-list-item>
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
    </div>
</template>
<script>
  import {Swiper, SwiperItem,Tab, TabItem ,cookie } from 'vux'
  export default {
    components: {
      Swiper,
      SwiperItem,
      Tab,
      TabItem,
      cookie
    },
    data () {
      return {
        tabBarFixed:false,
        bannerList:[],
        itemList:[],
        list:[],
        page: 1,
        pageSize: 10,
        show_nodata: false,
        show_more: true,
        classify_id:'',
        itemList:[],
        selectedId:0,//默認第一分類
        scrollTops:0
      }
    },
    mounted(){
      var that = this
      this.getBanner()
      this.getClassify()
//      window.addEventListener('scroll', this.handleScroll)
    },
    methods: {
      handleScroll () {
        let scrollTop = window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop
        if(scrollTop>=210){
          cookie.set('scrollTops', scrollTop, {expires: 30000, path: '/'})
        }else{
          cookie.remove('scrollTops')
        }
        let offsetTop = document.querySelector('#tab').offsetTop
        scrollTop > offsetTop ? this.tabBarFixed = true : this.tabBarFixed = false
      },
      onIndexChange(el){
//        console.log(el)
      },
      classifyItem(index,id){
        cookie.set('SelectId', index, {expires: 30000, path: '/'})
        cookie.set('proSelectId', id, {expires: 30000, path: '/'})
        let that = this;
        that.classify_id = id
        that.$refs.infinitescrollDemo.$emit('ydui.infinitescroll.reInit')
        that.list=[]
        that.page=1
        that.show_nodata= false
        that.show_more= false
        that.loadList(this.classify_id)
//        window.scrollTo(0, cookie.get('scrollTops'));
      },
      getBanner(){
        let that = this;
        that.$api.productBanner({
        })
          .then(res=>{
            console.log(res)
            if(res.data.state==1){
              let bannerList = res.data.data.banner
              let newArr = bannerList.map((item,index) =>{
                let url = '/ProductDetail?id='+item.product_id
                return Object.assign(item,{url:url})
              })
              that.bannerList = newArr
                document.title = res.data.data.mall_name
                  cookie.set('mall_name', res.data.data.mall_name, {
                    expires: 30000,
                    path: '/'
                  })
            }else{
              that.$dialog.toast({
                mes: res.data.msg,
                timeout: 1000,
                icon: 'error',
                callback: () => {
                }
              })
            }
          })
          .catch(res=>{
            that.$dialog.toast({
              mes: res.data.msg,
              timeout: 1000,
              icon: 'error',
              callback: () => {
              }
            })
          })
      },
      getClassify(){
        let that = this;
        that.$api.productClassify({
        })
          .then(res=>{
            console.log(res)
            if(res.data.state==1){
              that.itemList = res.data.data.classify
              that.classify_id = res.data.data.classify[0].classify_id
              that.$refs.infinitescrollDemo.$emit('ydui.infinitescroll.reInit')
              that.list=[]
              that.page=1
              that.show_nodata= false
              that.show_more= false
              if(document.cookie.indexOf('SelectId=')==-1){
                that.selectedId=0
                that.classify_id = res.data.data.classify[0].classify_id
              }else{
                that.selectedId=parseInt(cookie.get('SelectId'))
                that.classify_id = cookie.get('proSelectId')
              }
              that.loadList(that.classify_id)
            }else{
              that.$dialog.toast({
                mes: res.data.msg,
                timeout: 1000,
                icon: 'error',
                callback: () => {
                }
              })
            }
          })
          .catch(res=>{
            that.$dialog.toast({
              mes: res.data.msg,
              timeout: 1000,
              icon: 'error',
              callback: () => {
              }
            })
          })
      },
      loadList(classify_id) {
        var that = this
        console.log(this.classify_id,this.page)
        that.$dialog.loading.open('正在加載中···')
        that.$api.productIndex({
          classify_id:that.classify_id,
          page: that.page,
        }).then(response => {
          // sucess callback
          var data = response.data.data.product;
          console.log(response)
          that.$dialog.loading.close()
          for (var i = 0; i < data.length; i++) {
            that.list.push(data[i])
          }
          if (response.data.data.pages <= 1 && data.length == 0) {
            that.show_nodata = true
          }
          if (response.data.data.pages <= 1 && (data.length > 0&&data.length <= 10)) {
            that.show_more = false
          }
          if (response.data.data.current_page==response.data.data.pages || that.page == response.data.data.pages) {
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
<style  lang="less" type="text/less">
    /*html,body{*/
        /*background: #f5f5f5;*/
    /*}*/
    #home{
        .head{
            .vux-swiper .vux-swiper-item .vux-img{
                border-radius: 5px;
            }
            .vux-slider{
                box-shadow:0px 3px 9px rgba(0, 0, 0, 0.16);
                border-radius: 5px;
            }
        }
    }
</style>
<style lang="less" type="text/less" scoped>

    #home {
        padding-bottom: 55px;
        background: #f5f5f5;
        .head{
            .banner{
                padding: 15px;
                background: #fff;
            }
            .tabItem{
                background: #fff;
            }
            .fixedTab{
                position: fixed;
                top:0;
                left: 0;
                width: 100%;
                z-index: 100;
            }
        }
        .content{
            padding: 8px 10px;
            .proList{
                .yd-list-theme3 .yd-list-item::before,.yd-list-theme3 .yd-list-item::after{
                    height: 0;
                    width: 0;
                }
                .yd-list-item{
                    width: 49.2%;
                    /*box-shadow:0px 2px 10px rgba(0,0,0,0.06);*/
                    border-radius:4px;
                    border: none;
                }
                .yd-list-item:nth-child(odd){
                    /*margin: 0px 5px 5px 0px;*/
                    margin: 0px 1.5% 1.5% 0px;
                }
                .yd-list-item:nth-child(even){
                    margin: 0px 0px 1.5% 0px;
                }
                .yd-list-title{
                    margin-bottom: 5px;
                    .yd-list-other{
                        margin-bottom: 5px;
                    }
                }
                .title{
                     font-size: .26rem;
                 }
                .priceBox{
                    margin-top: 3px;
                    .price{
                        font-size: .3rem;
                        color: @themeColor2;
                    }
                }
            }
        }
    }
</style>
