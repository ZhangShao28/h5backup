<template>
    <div id="tabbar">
        <tabbar>
            <tabbar-item :selected="isSelected==index" v-for="(item,index) in tar_list" :key="index" :link="item.url"
                         @on-item-click="click">
                <img slot="icon" v-if="isSelected==index" :src="'/static/img/'+item.icon_s+'.png'">
                <img slot="icon" v-else :src="'/static/img/'+item.icon+'.png'">
                <span slot="label">{{item.title}}</span>
            </tabbar-item>
        </tabbar>
    </div>
</template>
<script>
  import { Tabbar, TabbarItem, Group, Cell,cookie } from 'vux'

  export default {
    components: {
      Tabbar,
      TabbarItem,
      Group,
      Cell,
      cookie
    },
    data(){
      return {
        isSelected: 2,
        tar_list: [
          {
            title: '首頁',
            icon: 'ic_home_unchecked',
            icon_s: 'ic_home_selection',
//            url:'/ApplyAdmission/0/0',
            url: '/Home',
            activing: false
          },
          {
            title: '我的',
            icon: 'ic_my_unchecked0',
            icon_s: 'ic_my_selection',
            url: '/MyInfo',
            activing: false
          }
        ]
      }
    },
    mounted () {
      this.url_change()
    },
    methods: {
      click(el){
        console.log("evel",el)
      },
      url_change(){
        var that = this, url = window.location.href.split('/')[3].split('?')
         if (url[0] === 'MyInfo') {
          that.isSelected = 1
        } else if (url[0] === 'Home') {
          that.isSelected = 0
        }
      }
    },
    watch: {      //监听路由变化
      $route(to, from){
        this.url_change()
      }

    }
  }
</script>
<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped type="text/less" lang="less">
    #tabbar{
        position: fixed;
        bottom: 0px;
        width: 100%;
        left: 0px;
        .weui-tabbar:before{
            display: none;
        }
        .weui-tabbar{
            box-shadow: 0px -2px 10px rgba(0,0,0,0.06);
            background: #fff;
            padding: 2px 0;
        }
    }
</style>
