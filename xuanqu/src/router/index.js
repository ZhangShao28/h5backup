import Vue from 'vue'
import VueRouter from 'vue-router'
import { cookie } from 'vux'
import Login from '@/components/Login/Login'
import Author from '@/components/Author/author'
import AuthorTwo from '@/components/Author/authorTwo'
import Home from '@/components/Home/Home'
import Detail from '@/components/Home/Detail'
import Introduce from '@/components/Home/Introduce'
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
      keepTab: false,
      keepAliveList: false,
      requireAuth: true
    }
  },
  {
    path: '/Introduce',
    name: 'Introduce',
    component: Introduce,
    meta: {
      keepTab: false,
      keepAliveList: false,
      requireAuth: true
    }
  },
  {
    path: '/Detail',
    name: 'Detail',
    component: Detail,
    meta: {
      keepTab: false,
      keepAliveList: false,
      requireAuth: true
    }
  }
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
  let l_state = getCookie('login_state'),//token状态
  to_path = to.path.toLocaleLowerCase().split('/')[1].split('?')[0]//路由去往
  console.log(to_path,l_state)
  if(l_state==null){
    if(to_path!='login'){
      next('/Login')
    }else{
      next()
    }
  }else{
    if((to_path!='home')&&(to_path!='detail')&&(to_path!='introduce')){
      next('/Home')
    }else{
      next()
    }
  }
})
Vue.prototype.goBeforeLoginUrl = () => {
  let url = cookie.get('beforeLoginUrl')
  // alert("跳回原地址"+url)
  router.push(url)
}
export default router