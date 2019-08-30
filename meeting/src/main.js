// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import FastClick from 'fastclick'
import VueRouter from 'vue-router'
import App from './App'
import Api from './api'
import Axios from './axios/ajax'
import {cookie, Tabbar, TabbarItem } from 'vux'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import YDUI from 'vue-ydui'
/* 相当于import YDUI from 'vue-ydui/ydui.rem.js' */
import 'vue-ydui/dist/ydui.rem.css'
import 'vue-ydui/dist/ydui.base.css'
import '../static/font-awesome/css/font-awesome.min.css'
import Login from './components/Login/Login'
import Clause from './components/Login/clause'
import Author from './components/Author/author'
import AuthorTwo from './components/Author/author_two'
import MyInfo from './components/MyInfo/MyInfo'
import NoAssociation from './components/MyInfo/NoAssociation'
import AssociationList from './components/MyInfo/AssociationList'
import MyInformation from './components/MyInfo/MyInformation'
import InfoModify from './components/MyInfo/InfoModify'
import ModifyPhone from './components/MyInfo/ModifyPhone'
import MeetingActive from './components/MeetingActive/MeetingActive'
import MeetingDetail from './components/MeetingActive/MeetingDetail'
import ApplyAdmission from './components/ApplyAdmission/ApplyAdmission'
import ApplyAdmissionList from './components/ApplyAdmission/ApplyAdmissionList'
import NewsList from './components/News/NewsList'
import NewsDetail from './components/News/NewsDetail'
import NewsDetails from './components/News/NewsDetails'
Vue.use(VueRouter)
Vue.use(YDUI)
// Vue.component(InfiniteScroll.name, InfiniteScroll);
Vue.use(cookie)
Vue.use(ElementUI)
Vue.component('tabbar', Tabbar)
Vue.component('tabbar-item', TabbarItem)
Vue.prototype.api = Api;
Vue.prototype.$axios = Axios;
import './axios/ajax'
// Axios.defaults.headers.token = cookie.get('token')
// Axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded'

const routes = [
  {
    path: '/Login',
    name: 'Login',
    component: Login,
    meta: {
      keepAlive: false,
      keepAliveList: false,
      requireAuth: true
    }
  },
  {
    path: '/Clause',//条款
    name: 'Clause',
    component: Clause,
    meta: {
      requireAuth: false,
      keepAliveList: false
    }
  },
  {
    path: '/Author',//检查授权
    name: 'Author',
    component: Author,
    meta: {
      requireAuth: true,
      keepAliveList: false
    }
  },
  {
    path: '/AuthorTwo',//检查授权
    name: 'AuthorTwo',
    component: AuthorTwo,
    meta: {
      requireAuth: true,
      keepAliveList: false
    }
  },
  {
    path: '/MyInfo',
    name: 'MyInfo',
    component: MyInfo,
    meta: {
      keepAlive: true,
      requireAuth: true,
      keepAliveList: false
    }
  },
  {
    path: '/NoAssociation',
    name: 'NoAssociation',
    component: NoAssociation,
    meta: {
      keepAlive: false,
      requireAuth: true,
      keepAliveList: false
    }
  },
  {
    path: '/AssociationList',
    name: 'AssociationList',
    component: AssociationList,
    meta: {
      keepAlive: false,
      requireAuth: true,
      keepAliveList: false
    }
  },
  {
    path: '/MeetingActive',//會議活動
    name: 'MeetingActive',
    component: MeetingActive,
    meta: {
      keepAlive: true,
      requireAuth: true,
      keepAliveList: false
    }
  },
  {
    path: '/MeetingDetail',//會議活動详情
    name: 'MeetingDetail',
    component: MeetingDetail,
    meta: {
      keepAlive: false,
      requireAuth: true,
      keepAliveList: false
    }
  },
  {
    path: '/ApplyAdmission',//入會申請
    name: 'ApplyAdmission',
    component: ApplyAdmission,
    meta: {
      keepAlive: false,
      requireAuth: true,
      keepAliveList: false
    }
  },
  {
    path: '/ApplyAdmissionList',//入會申請列表
    name: 'ApplyAdmissionList',
    component: ApplyAdmissionList,
    meta: {
      keepAlive: false,
      requireAuth: true,
      keepAliveList: false
    }
  },
  {
    path: '/NewsList',//新闻列表
    name: 'NewsList',
    component: NewsList,
    meta: {
      keepAlive: true,
      requireAuth: true,
      keepAliveList: true
    }
  },
  {
    path: '/NewsDetail',//新闻详情
    name: 'NewsDetail',
    component: NewsDetail,
    meta: {
      keepAlive: false,
      requireAuth: true,
      keepAliveList: false
    }
  },
  {
    path: '/NewsDetails',//新闻详情单独页
    name: 'NewsDetails',
    component: NewsDetails,
    meta: {
      keepAlive: false,
      requireAuth: false,
      keepAliveList: false
    }
  },
  {
    path: '/MyInformation',//我的资料
    name: 'MyInformation',
    component: MyInformation,
    meta: {
      keepAlive: false,
      requireAuth: true,
      keepAliveList: false
    }
  },
  {
    path: '/InfoModify',//修改我的资料
    name: 'InfoModify',
    component: InfoModify,
    meta: {
      keepAlive: false,
      requireAuth: true,
      keepAliveList: false
    }
  },
  {
    path: '/ModifyPhone',//修改手機號
    name: 'ModifyPhone',
    component: ModifyPhone,
    meta: {
      keepAlive: false,
      requireAuth: true,
      keepAliveList: false
    }
  }
]
const scrollBehavior = (to, from, savedPosition) => {
  var to_path = to.name.toLocaleLowerCase()
  var from_path = from.name.toLocaleLowerCase()
   // console.log(to_path+'----'+from_path)
  if (to_path == 'newsdetail' && from_path == 'newslist') {
    from.meta.keepAliveList = true
  } else if (to_path == 'newslist' && from_path == 'newsdetail') {
    to.meta.keepAliveList = false
  } else {
    to.meta.keepAliveList = false
    from.meta.keepAliveList = false
  }
  if (savedPosition) {
    return savedPosition
  } else {
    if (from.meta.keepAliveList) {
      from.meta.savedPosition = document.documentElement.scrollTop || document.body.scrollTop
    }
    return {x: 0, y: to.meta.savedPosition || 0}
  }
}
const router = new VueRouter({
  routes,
  mode: 'history',
  scrollBehavior
})

// 判断是否需要登录权限 以及是否登录
router.beforeEach((to, from, next) => {
  // var u = navigator.userAgent;
  // var isiOS = !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/); //ios终端
  // // XXX: 修复iOS版微信HTML5 History兼容性问题
  // if (isiOS && to.path !== location.pathname) {
  //   // 此处不可使用location.replace
  //   location.assign(to.fullPath)
  // } else {
  //   next()
  // }
  if (to.meta.requireAuth) {
    function GetQueryString (name) {//获取地址栏参数
      var reg = new RegExp('(^|&)' + name + '=([^&]*)(&|$)')
      var r = window.location.search.substr(1).match(reg)
      if (r != null)return unescape(r[2])
      return null
    }

    var l_state = document.cookie.indexOf('login_state='),//登陆状态
      c_state = document.cookie.indexOf('login_id='),//授权状态
      t_state = document.cookie.indexOf('token='),//token状态
      cookie_cid = document.cookie.indexOf('cid='),//token状态
      split_url = window.location.href.split('/'),
      to_path = to.path.toLocaleLowerCase().split('/')[1].split('?')[0],//路由去往
      from_path = from.path.toLocaleLowerCase().split('/')[1],//路由來自
      cid, url_cid = GetQueryString('cid')//获取cid
    if ((to_path=='login')&&url_cid&&(url_cid!=cookie.get('cid'))) {
      cookie.remove('login_id')
      cookie.remove('login_state')
      cookie.remove('token')
      cookie.remove('cid')
      cookie.remove('code')
      cid = url_cid
    } else {
      cid = cookie.get('cid')
    }
    cookie.set('cid', cid, {expires: 30000, path: '/'})
    //保留开始
    if (to_path == 'meetingdetail' || from_path == 'meetingdetail') {
    } else {
      cookie.remove('select_id')
    }
    if (to_path == 'newsdetail' || from_path == 'newsdetail') {

    } else {
      cookie.remove('news_select_id')
    }
    if (to_path == 'applyadmission' || from_path == 'applyadmission' || to_path == 'applyadmissionlist' || from_path == 'applyadmissionlist') {
    } else {
      cookie.remove('myinfo_id')
    }

    // if(to_path=='meetingactive'||to_path=='myinfo'){
    //   console.log(1111111)
    //   cookie.remove('scrollTop')
    // }
    //保留结束
    // console.log('授权状态+', c_state, '要前往的路由+', to_path, '要离开的路由+', from_path)
    //新增begin
    if (to_path == 'login' || to_path == 'newslist' || to_path == 'meetingactive') {
      cookie.set('beforeLoginUrl', to.fullPath, {expires: 30000, path: '/'}) // 保存用户进入的url
    } else {

    }
    if (t_state == -1) {//未登录
      if (to_path != 'login') {
        next({path: '/Login', query: {cid: url_cid}})
      } else {
        next()
      }
    } else {//已登录
      if (c_state == -1) {//未授权
        if (to_path != 'author' && to_path != 'authortwo') {
          next('/Author?t=' + (new Date().getTime()))
        } else if ((to_path == 'author' && to_path != 'authortwo') || (to_path != 'author' && to_path == 'authortwo')) {
          next()
        } else {
          next()
        }
      } else {//已授权
        // console.log('已授权已登录')
        if(to_path=='login'){
          next('/NewsList?cid='+cookie.get('cid'))
        }else{
          next()
        }
      }
    }
    //新增end
  } else {
    next()
  }
})
Vue.prototype.goBeforeLoginUrl = () => {
  let url = cookie.get('beforeLoginUrl')
  // alert("跳回原地址"+url)
  router.push(url)
}
FastClick.attach(document.body)
Vue.config.productionTip = false

new Vue({
  router,
  render: h => h(App)
}).$mount('#app-box')
