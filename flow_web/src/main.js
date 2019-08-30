// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import FastClick from 'fastclick'
import VueRouter from 'vue-router'
import App from './App'
// import axios from './axios'
import axios from 'axios'
import qs from 'qs';
import YDUI from 'vue-ydui'; /* 相当于import YDUI from 'vue-ydui/ydui.rem.js' */
import 'vue-ydui/dist/ydui.rem.css';
import {cookie} from 'vux'
import Author from './components/Author/author'
import Demand from './components/Demand/demand'
import DemandBind from './components/DemandBind/demandbind'
import Login from './components/Login/login'
import DemandResult from './components/DemandResult/demandresult'
import ChargeList from './components/ChargeList/chargelist'
import ChargePayLog from './components/ChargePayLog/chargepaylog'
import MyInfo from './components/MyInfo/myinfo'
import Store from './components/Store/store'
var apiurl = 'http://flow.ixmcd.com'//接口请求地址
// cookie.set('token', 'd041adNGCqzaVfH5trxwAB80ZnTN3DZm1BNYFv1cgGLVwwq6Lac', {
//     expires: 30
// })
axios.defaults.headers.token =cookie.get('token') ;
axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded';
Vue.use(VueRouter)
Vue.use(YDUI);
Vue.use(cookie)
Vue.prototype.$http = axios
Vue.prototype.$qs = qs
Vue.prototype.apiurl = apiurl
const routes = [
      {
        path: '/Login',
        name:'Login',
        component: Login,
      },
      {
        path: '/Author',//检查授权
        name:'Author',
        component: Author,
        meta: {
            requireAuth: true
        }
      },
    {
        path: '/Demand',//查询
        name:'Demand',
        component: Demand,
        meta: {
            requireAuth: true
        }
      },
        {
        path: '/DemandResult',//查询结果
        name:'DemandResult',
        component: DemandResult,
        meta: {
            requireAuth: true
        }
      },
        {
        path: '/DemandBind',//查询未绑定
        name:'DemandBind',
        component: DemandBind,
        meta: {
            requireAuth: true
        }
      },
      {
        path: '/ChargeList',//充值列表
        name:'ChargeList',
        component: ChargeList,
        meta: {
            requireAuth: true
        }
      },
      {
        path: '/ChargePayLog',//充值记录
        name:'ChargePayLog',
        component: ChargePayLog,
        meta: {
            requireAuth: true
        }
      },
    {
        path: '/MyInfo',//我的信息
        name:'MyInfo',
        component: MyInfo,
        meta: {
            requireAuth: true
        }
    },
    {
        path: '/Store',//商城
        name:'Store',
        component: Store,
        meta: {
            requireAuth: true
        }
    }
]

const router = new VueRouter({
    routes
})
//
// function setDocumentTitle (title) {
//     title = title || ''
//     document.title = title
//     if (/ip(hone|od|ad)/i.test(navigator.userAgent)) {
//         let iframe = document.createElement('iframe')
//         iframe.src = '/MP_verify_zxjwxCcP80t475ww.txt'
//         iframe.style.display = 'none'
//         iframe.onload = function () {
//             setTimeout(function () {
//                 iframe.remove()
//             }, 0)
//             document.body.appendChild(iframe)
//         }
//     }
// },

router.beforeEach((to, from, next) => {
    var c_state = document.cookie.indexOf("login_id=")//授权状态
    var t_state = document.cookie.indexOf("token=")//token状态
    var l_state = document.cookie.indexOf("login_state=")//登陆状态
    console.log(to.path)
    // console.log("授权页面地址1"+window.location.href)
        var url = window.location.href.split("/")[4].split('?')
    if(t_state!=-1){//存在token
        console.log('存在token')
        if(l_state!=-1){//存在登陆状态
            console.log('存在登陆状态')
            next()
        }else{//不存在登陆状态
            console.log('未登陆跳转登陆')
            axios.post(apiurl+'/user/judgemobile', qs.stringify(
            // axios.post('/api/user/judgemobile', qs.stringify(
                { }
            ))
                .then(function (response) {
                    console.log(response);
                    if(response.data.err==1){
                        cookie.set('login_state', 'yes', {
                            expires: 30
                        })
                    }else{
                        console.log('跳转登陆')
                        next('/Login')
                    }
                })
                .catch(function (response) {

                });
        }
    }else{
        if(url[0]=='Author' && url.length > 1){
            var  Request=undefined;
            var getUrlStr=function(name){
                /**
                 * 获取地址栏参数
                 */
                console.log("授权页面地址2"+window.location.href)
                let reg = new RegExp("(^|\\?|&)" + name + "=([^&]*)(\\s|&|$)","i");
                if(reg.test(window.location.href)){
                    return unescape(RegExp.$2.replace(/\+/g," "))
                }
                return undefined
            }
            Request=getUrlStr('code');
            console.log("授权页面code"+Request)
            if(Request!=undefined){
                cookie.set('code', Request, {
                    expires: 30
                })
            }
        }else if(to.path != '/Author'){
            if((c_state==-1)){//不存在授权信息
                console.log(2,cookie.get('login_id'),to.path,to.fullPath)
                // 第一次进入项目
                console.log('进入授权')
                cookie.set('beforeLoginUrl', to.fullPath) // 保存用户进入的url
                next('/Author')
                return false
            }else{
                next()
            }
        }
    }
    next()
})
Vue.prototype.goBeforeLoginUrl = () => {
    let url =cookie.get('beforeLoginUrl')
    console.log("跳回原地址"+url)
    router.push(url)
    // cookie.set('beforeLoginUrl', '')
}


FastClick.attach(document.body)

Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  router,
  render: h => h(App)
}).$mount('#app')