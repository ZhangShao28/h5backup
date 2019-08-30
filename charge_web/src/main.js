// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import FastClick from 'fastclick'
import VueRouter from 'vue-router'
import App from './App'
import echarts from 'echarts'
import axios from 'axios';
import qs from 'qs';
import Login from './components/pages/install/Login'//安装人员登陆
import MerLogin from './components/pages/Merchant/Login'//商户登陆
import Count from './components/pages/Merchant/Count'//商户统计
import OperLogin from './components/pages/operator/Login'//商户登陆
import OperCount from './components/pages/operator/Count'//商户统计
import DeviceListSuccess from './components/pages/install/DeviceListSuccess'
import DeviceListFail from './components/pages/install/DeviceListFail'
import AddDevice from './components/pages/install/AddDevice'
import {WechatPlugin, AjaxPlugin, LoadingPlugin, ToastPlugin, AlertPlugin,cookie} from 'vux'
import YDUI from 'vue-ydui'; /* 相当于import YDUI from 'vue-ydui/ydui.rem.js' */
import 'vue-ydui/dist/ydui.rem.css';
axios.defaults.headers.token =cookie.get('login_state') ;
axios.defaults.headers.mertoken =cookie.get('login_state_mer') ;
axios.defaults.headers.opertoken =cookie.get('login_state_oper') ;
axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded';
Vue.use(YDUI);
Vue.use(WechatPlugin)
Vue.use(AjaxPlugin)
Vue.use(LoadingPlugin)
Vue.use(ToastPlugin)
Vue.use(AlertPlugin)
Vue.use(cookie)
Vue.use(VueRouter)
var apiurl = 'https://c.ixmcd.com' ;//接口请求地址
Vue.prototype.$echarts = echarts; //图表
Vue.prototype.$http = axios;
Vue.prototype.$qs = qs;
Vue.prototype.apiurl = apiurl;
const routes = [
    {
        path: '/Login',
        component: Login
    },
    {
        path: '/AddDevice',
        name:'AddDevice',
        meta: {
            requireAuth: true
        },
        component: AddDevice
    },
    {
        path: '/DeviceListSuccess',
        name:'DeviceListSuccess',
        meta: {
            requireAuth: true
        },
        component: DeviceListSuccess
    },
    {
        path: '/DeviceListFail',
        name:'DeviceListFail',
        meta: {
            requireAuth: true
        },
        component: DeviceListFail
    },
    {
        path: '/MerLogin',
        name:'MerLogin',
        component: MerLogin
    },
    {
        path: '/Count',
        name:'Count',
        meta: {
            requireAuth: true
        },
        component: Count
    },
    {
        path: '/OperLogin',
        name:'OperLogin',
        component: OperLogin
    },
    {
        path: '/OperCount',
        name:'OperCount',
        meta: {
            requireAuth: true
        },
        component:OperCount
    },

]

const router = new VueRouter({
  routes
})
// 判断是否需要登录权限 以及是否登录
router.beforeEach((to, from, next) => {
    const loc_url = router.match(location).hash.split('/');
    const url = loc_url[1].toLowerCase();
    console.log(loc_url,url)
    if (to.matched.some(res => res.meta.requireAuth)) {// 判断是否需要登录权限
        if(url=='count'||url=='merlogin'){
            console.log(1)
            if (cookie.get('login_state_mer')==undefined||cookie.get('login_state_mer')=='') {// 判断是商户否登录
                next({// 没登录则跳转到登录界面
                    path: '/MerLogin',
                    // query: {redirect: to.fullPath}
                })
            } else {
                next()
            }
        }else if(url=='opercount'||url=='operlogin'){
            console.log(2)
            if (cookie.get('login_state_oper')==undefined||cookie.get('login_state_oper')=='') {// 判断运营商是否登录
                next({// 没登录则跳转到登录界面
                    path: '/OperLogin',
                    // query: {redirect: to.fullPath}
                })
            } else {
                next()
            }
        }else{
            console.log(3)
            if (cookie.get('login_state')==undefined||cookie.get('login_state')=='') {// 判断是否登录
                next({// 没登录则跳转到登录界面
                    path: '/Login',
                    // query: {redirect: to.fullPath}
                })
            } else {
                next()
            }
        }
    } else {
        next()
    }
})


FastClick.attach(document.body)

Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
