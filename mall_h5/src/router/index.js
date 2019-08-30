import Vue from 'vue'
import VueRouter from 'vue-router'
import { cookie } from 'vux'
import Login from '@/components/Login/Login'
import Author from '@/components/Author/author'
import AuthorTwo from '@/components/Author/authorTwo'
import Home from '@/components/Home/Home'
import ProductDetail from '@/components/Home/ProductDetail'
import MyInfo from '@/components/MyInfo/MyInfo'
import MyInformation from '@/components/MyInfo/MyInformation'
import InfoModify from '@/components/MyInfo/InfoModify'
import BindPhone from '@/components/bindPhone/bindPhone'
Vue.use(VueRouter)
Vue.use(cookie)
const routes = [
  {
    path: '/Login',
    name: 'Login',
    component: Login,
    meta: {
      keepTab: false,
      keepAliveList: false,
      requireAuth: true
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
    path: '/AuthorTwo',//检查授权2
    name: 'AuthorTwo',
    component: AuthorTwo,
    meta: {
      requireAuth: true,
      keepAliveList: false
    }
  },
  {
    path: '/Home',
    name: 'Home',
    component: Home,
    meta: {
      keepTab: true,
      keepAliveList: false,
      requireAuth: true
    }
  },
  {
    path: '/MyInfo',
    name: 'MyInfo',
    component: MyInfo,
    meta: {
      keepTab: true,
      keepAliveList: false,
      requireAuth: true
    }
  },
  {
    path: '/MyInformation',
    name: 'MyInformation',
    component: MyInformation,
    meta: {
      keepTab: false,
      keepAliveList: false,
      requireAuth: true
    }
  },
  {
    path: '/InfoModify',
    name: 'InfoModify',
    component: InfoModify,
    meta: {
      keepTab: false,
      keepAliveList: false,
      requireAuth: true
    }
  },
  {
    path: '/ProductDetail',
    name: 'ProductDetail',
    component: ProductDetail,
    meta: {
      keepTab: false,
      keepAliveList: false,
      requireAuth: true
    }
  },
  {
    path: '/BindPhone',
    name: 'BindPhone',
    component: BindPhone,
    meta: {
      keepTab: false,
      keepAliveList: false,
      requireAuth: true
    }
  },
]
const scrollBehavior = (to, from, savedPosition) => {
  var to_path = to.name.toLocaleLowerCase()
  var from_path = from.name.toLocaleLowerCase()
  if ((to_path == 'productdetail' && from_path == 'home')) {
    from.meta.keepAliveList = true
  }else {
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
//判断是否需要登录权限 以及是否登录
router.beforeEach((to, from, next) => {
  function getCookie(name) {
    var arr = document.cookie.match(new RegExp("(^| )" + name + "=([^;]*)(;|$)"));
    if (arr != null) return (arr[2]);
    return null;
  }
  let l_state = document.cookie.indexOf('login_state='),//登陆状态
    mall_name = getCookie('mall_name'),//登陆状态
    c_state = getCookie('login_id'),//token状态
    t_state = getCookie('token'),//token状态
    vip_state = document.cookie.indexOf('isvip='),//是否是vip状态
    to_path = to.path.toLocaleLowerCase().split('/')[1].split('?')[0],//路由去往
    from_path = from.path.toLocaleLowerCase().split('/')[1].split('?')[0],//路由去往
    domainName = window.location.href.split('?domain=')[1]
    console.log('domainName',domainName,cookie.get('domainName'))
    if(domainName){
      if((cookie.get('domainName')!=undefined)&&(domainName!=cookie.get('domainName'))){
        cookie.remove('c_state')
        cookie.remove('login_id')
        cookie.remove('mall_name')
        cookie.remove('domainName')
        cookie.remove('token')
        next('/Home?domain='+domainName)
      }else{
  
      }
    if(to_path=='home'){
      cookie.set('domainName',domainName,{expires: 30000, path: '/'})
    }else{
    }
    }
    if(mall_name==null||mall_name==undefined){
      console.log(11)
    }else{
      document.title = cookie.get('mall_name')
    }
    if(to_path=='home'&&!from_path){
      cookie.remove('SelectId')
      cookie.remove('proSelectId')
    }else{
    }
   

    cookie.set('beforeLoginUrl', to.fullPath, {expires: 30000, path: '/'}) // 保存用户进入的url
    if (to.meta.requireAuth) {
      if (c_state == null) {//未授权
        if (to_path != 'author' && to_path != 'authortwo') {
          next('/Author?t=' + (new Date().getTime()))
        } else if ((to_path == 'author' && to_path != 'authortwo') || (to_path != 'author' && to_path == 'authortwo')) {
          next()
        } else {
          next()
        }
      } else {//已授权
        next()
      }
    }else{
      next()
    }
})
Vue.prototype.goBeforeLoginUrl = () => {
  let url = cookie.get('beforeLoginUrl')
  // alert("跳回原地址"+url)
  router.push(url)
}
export default router