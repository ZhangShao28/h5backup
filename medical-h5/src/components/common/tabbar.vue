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
            title: '通告',
            icon: 'bt_notice_meeting_unchecked',
            icon_s: 'bt_notice_meeting_select',
            url: '/MeetingActive',
            activing: false
          },
          {
            title: '新聞',
            icon: 'bt_notice_news_unchecked',
            icon_s: 'bt_notice_news_select',
//            url:'/ApplyAdmission/0/0',
            url: '/NewsList',
            activing: false
          },
          {
            title: '我',
            icon: 'bt_notice_my_unchecked',
            icon_s: 'bt_notice_my_select',
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
//        console.log("evel",el)
      },
      url_change(){
        var that = this, url = window.location.href.split('/')[3].split('?')
        if (url[0] === 'MeetingActive') {
          that.isSelected = 0
        } else if (url[0] === 'MyInfo') {
          that.isSelected = 2
        } else if (url[0] === 'NewsList') {
          that.isSelected = 1
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
<style scoped>
</style>
