<template>
    <div id="association_list">
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
                    ref="search"
                    right="dfdsf"></search>
        </div>
        <div class="search_con">
            <div class="title" v-show="show_title">港澳商會通支持以下商會</div>
            <div class="search_result" v-for="item in association_list">
                {{item.property_name}}
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
        association_list: [],
        results: []
      }
    },
    mounted(){
      document.querySelector('body').setAttribute('style', 'background:#fff')
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
        that.api.userProperty({
          search_name: el
        })
          .then(function (response) {
            that.$dialog.loading.close()
            console.log(response)
            that.association_list = []
            var data = response.data.data
            if (response.data.state == 1) {
              that.association_list = data
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
          .catch(function (response) {
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
    #association_list .weui-search-bar__box .weui-icon-search {
        top: 2px;
    }
</style>
<style scoped lang="less" type="text/less">
    #association_list {
        .search_head {
            position: fixed;
            width: 100%;
        }
        .search_con {
            color: #666;
            font-size: .75rem;
            padding-top: 55px;
            padding-bottom: 10px;
            padding-left: 1rem;
            margin: 0 auto;
            .title {
                border-bottom: 1px solid #f1f1f1;
                margin-bottom: 10px;
                margin-top: 10px;
            }
            .search_result {
                font-size: .65rem;
                margin-top: 10px;
                padding-right: 10px;
                border-bottom: 1px solid #f1f1f1;
            }
        }
    }
</style>
