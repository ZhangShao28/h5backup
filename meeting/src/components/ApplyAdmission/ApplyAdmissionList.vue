<template>
    <div id="applyadmission_list">
        <div class="search_head">
            <search
                    @on-result-click="resultClick"
                    @on-change="getResult"
                    :results="results"
                    v-model="value"
                    position="absolute"
                    auto-scroll-to-top
                    top="0"
                    @on-submit="load_list"
                    ref="search">
            </search>
        </div>
        <div class="search_con">
            <div class="tips">請選擇或搜索您要申請的商會</div>
            <div v-for="(item,index) in applyadminssion_list" :key="index">
                <router-link :to="{path:'/ApplyAdmission',query:{pid:0,cids:item.cid}}">
                    <div class="search_result">
                        <span class="xh_logo"><img :src="item.c_logo" alt=""
                                                   onerror="this.src='/static/img/ic_default.png'"></span>
                        &nbsp;{{item.property_name}}
                        <div class="ic_more">
                            <img src="/static/img/ic_more.png" alt="">
                        </div>
                    </div>
                </router-link>
            </div>
        </div>
    </div>
</template>
<script>
  import { XHeader, Toast, cookie, Search } from 'vux'
  export default {
    components: {
      Search,
      cookie,
      XHeader,
      Toast
    },
    data () {
      return {
        value: '',
        show_title: true,
        applyadminssion_list: [],
        results: [],
        cid: 1
      }
    },
    mounted(){
      document.querySelector('body').setAttribute('style', 'background:#fff')
      var  url_cid = this.$route.query.acid
      this.cid = url_cid
      this.load_list()
    },
    methods: {
      resultClick (item) {
        console.log(222)
        window.alert('you click the result item: ')
      },
      getResult (val) {
        console.log('on-change', val)
        this.results = this.getResult()
      },

      getResult (val) {
        console.log(val)
        var that = this
        this.load_list(val)
        if (val == '') {
          that.show_title = true
        } else {
          that.show_title = false
        }
      },

      load_list(el){
        var that = this
        that.$dialog.loading.open('正在加載中···')
        that.api.admissionList({
            cid: that.cid,
            search_name: el
          })
          .then(response => {
            that.$dialog.loading.close()
            console.log(response)
            that.applyadminssion_list = []
            var data = response.data.data
            if (response.data.state == 1) {
              that.applyadminssion_list = data
              return data
            } else {
              that.$dialog.toast({
                mes: response.data.msg,
                timeout: 1500,
                icon: 'error',
                callback: () => {
                }
              })
            }

          })
          .catch(response => {
            that.$dialog.loading.close()
            that.$dialog.toast({
              mes: response.data.msg,
              timeout: 1500,
              icon: 'error'
            })
          })
      },
    },
    beforeCreate () {
      document.body.setAttribute('class', '')
    },
    beforeDestroy () {
      document.querySelector('body').setAttribute('style', '')
    }
  }
</script>
<style>
    #applyadmission_list .weui-search-bar__box .weui-icon-search {
        top: 2px;
    }
</style>
<style scoped lang="less" type="text/less">
    #applyadmission_list {
        .search_head {
            position: fixed;
            width: 100%;
            z-index: 1;
        }
        .search_con {
            color: #666;
            font-size: .75rem;
            padding: 47px 20px;
            margin: 0 auto;
            .tips {
                color: #1F8CEB;
                height: 35px;
                line-height: 35px;
                background: rgba(240, 248, 255, 1);
                margin: 0px -20px;
                font-size: .6rem;
                text-align: center;
            }
            .title {
                border-bottom: 1px solid #f1f1f1;
                margin-bottom: 10px;
                margin-top: 10px;
            }
            .search_result {
                font-size: .65rem;
                padding: 13px 0px;
                border-bottom: 1px solid #e8e8e8;
                position: relative;
                .xh_logo {
                    width: 42px;
                    height: 42px;
                    border: 1px solid rgba(221, 221, 221, 1);
                    border-radius: 50%;
                    display: inline-block;
                    vertical-align: middle;
                    img {
                        width: 40px;
                        height: 40px;
                        border-radius: 50%;
                    }
                }
                .ic_more {
                    width: 20px;
                    height: 20px;
                    position: absolute;
                    right: 0px;
                    top: 21px;
                    img {
                        width: 20px;
                        height: 20px;
                    }
                }
            }
        }
    }
</style>
