<template>
    <div id="MyInformation">
        <div class="head">
            <flexbox :gutter="0">
                <flexbox-item :span="2">
                    <img :src="u_logo" alt="">
                </flexbox-item>
                <flexbox-item :span="6">
                    <div class="name">{{u_nickname}}</div>
                    <!--<div class="phone">+{{country_code}} {{u_mobilephone}}</div>-->
                </flexbox-item>
                <flexbox-item :span="4" >
                    <!--<div class="myinfo" @click="goMyInfo">我的資料</div>-->
                </flexbox-item>
            </flexbox>
        </div>
        <div class="content">
            <div class="tit">
                我的訂單
            </div>
            <div class="proList">
                <yd-infinitescroll :callback="loadList" ref="infinitescrollDemo">
                    <yd-list theme="1" slot="list">
                        <div v-for="item, key in list" :key="key" >
                            <div class="listBox">
                                <flexbox class="con" :gutter="0">
                                    <flexbox-item :span="12">
                                        <div class="proNo">訂單編號：{{item.order_no}}</div>
                                        <div class="proName" v-if="item.appoint_time">預約時間：{{item.appoint_time}}</div>
                                        <div class="proName">{{item.product_name}}</div>
                                        <div> <span class="proMoney">HK$ {{item.pay_money}} </span><span class="orderTime">{{item.order_time}}</span></div>
                                        <div class="userInfo">{{item.username_zh}}<span v-if="item.username_en">({{item.username_en}})</span><span class="orderTime" v-if="item.mobile_phone">+{{item.country_code}}  {{item.mobile_phone}}</span></div>
                                    </flexbox-item>
                                </flexbox>
                            </div>
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
    </div>
</template>
<script>
  import { Cell, Flexbox, FlexboxItem} from 'vux'
  export default {
    components: {
      Cell,
      Flexbox,
      FlexboxItem
    },
    data () {
      return {
        page: 1,
        pageSize: 10,
        show_nodata: false,
        show_more: true,
        list:[],
        u_logo:'',
        u_nickname:'',
        u_mobilephone:'',
        country_code:'',
      }
    },
    mounted(){
      this.loadList()
    },
    methods: {
      goMyInfo(){
        this.$router.push('MyInformation')
      },
      loadList() {
        let that = this
        that.$dialog.loading.open('正在加載中···')
        that.$api.userInfo({
          page: that.page,
        }).then(response => {
          that.$dialog.loading.close()
          // sucess callback
            var data = response.data.data.listdata;
//            var data = [];
              that.u_logo=response.data.data.u_logo,
              that.u_nickname=response.data.data.u_nickname,
              that.u_mobilephone=response.data.data.u_mobilephone,
              that.country_code=response.data.data.country_code,
              console.log(response)
            if(data.length!=0){
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
            }else{
              that.show_nodata = true
            }
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
<style lang="less" type="text/less">
    #MyInformation {

    }


</style>
<style scoped lang="less" type="text/less">
    #MyInformation {
        background: #f5f5f5;
        padding-bottom: 55px;
        .head{
            background: #fff;
            padding: 15px 20px;
            box-shadow:0px 2px 10px rgba(0,0,0,0.06);
            position: fixed;
            z-index:2;
            top:0;
            left: 0;
            width: 100%;
            img{
                width: 50px;
                height: 50px;
                border-radius: 50%;
            }
            .name{
                font-size: .3rem;
                font-weight: bold;
                color: #333;
                text-overflow: ellipsis;
                overflow: hidden;
                white-space: nowrap;
            }
            .myinfo{
                text-align: right;
                border: 1px solid #d8d8d8;
                display: inline-block;
                border-radius: 30px;
                float: right;
                padding: 4px 10px;
                color: #666;
            }
        }
        .content{
            margin-top: 90px;
            .proList{
                height: 100%;
            }
            .tit{
                padding: 15px 20px;
                font-size: .28rem;
                color: #333;
                font-weight: bold;
                box-shadow:0px 2px 10px rgba(0,0,0,0.08);
                background: #fff;
                position: relative;
                z-index: 1;
            }
            .listBox{
                padding: 15px 20px 0px 20px;
                color: #232323;
                font-size: .26rem;
                background: #fff;
                .con{
                    border-bottom: 1px solid #dedede;
                    padding-bottom: 10px;
                    .proName{
                        margin: 5px 0;
                    }
                    .proMoney{
                        font-weight: bold;
                        color: #FF9E02;
                    }
                    .userInfo{
                        padding-top: 5px;
                    }
                    .orderTime{
                        color: #999;
                        float: right;
                    }
                }
            }
        }
    }
</style>
