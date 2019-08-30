import Vue from 'vue'
import App from './App'
import VueRouter from 'vue-router'
import VueI18n from 'vue-i18n'
import Home from './components/home'
import Homepc from './components/home_pc'
// import axios from 'axios';
import qs from 'qs';
import {setCookie,delCookie,getCookie} from './cookie/cookie'
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import VueAwesomeSwiper from 'vue-awesome-swiper'
import 'swiper/dist/css/swiper.css'
Vue.use(VueI18n);
Vue.use(ElementUI);
Vue.use(VueAwesomeSwiper)
Vue.use(VueRouter)

// axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded';
const i18n = new VueI18n({
    locale: getCookie('PLAY_LANG','en'),// 语言标识
    messages: {
        'zh': require('./langs/zh'),
        'en': require('./langs/en')
    }
});
if(getCookie('langs')==='en'){
    i18n.locale ='en'
}else{
    i18n.locale ='zh'
}
const routes = [
    {
        path: '/Home',
        name:'Home',
        component: Home
    },{
        path: '/Homepc',
        name:'Homepc',
        component: Homepc
    },
]
const router = new VueRouter({
    routes,
    mode:'history'
})
router.beforeEach((to, from, next) => {
  const to_path = to.path.toLocaleLowerCase().split('/')[1].split('?')[0];
  console.log("sss",to_path)
    // const url = to_path[1].toLowerCase();
    var dynamicLoading = {
        css: function(path){
            if(!path || path.length === 0){
                throw new Error('argument "path" is required !');
            }
            var head = document.getElementsByTagName('head')[0];
            var link = document.createElement('link');
            link.href = path;
            link.rel = 'stylesheet';
            link.type = 'text/css';
            head.appendChild(link);
        },
        js: function(path){
            if(!path || path.length === 0){
                throw new Error('argument "path" is required !');
            }
            var head = document.getElementsByTagName('head')[0];
            var script = document.createElement('script');
            script.src = path;
            script.type = 'text/javascript';
            head.appendChild(script);
        }
    }
    function IsPC(){
        var userAgentInfo = navigator.userAgent;
        var Agents = new Array("Android", "iPhone", "SymbianOS", "Windows Phone", "iPad", "iPod");
        var flag = true;
        for (var v = 0; v < Agents.length; v++) {
            if (userAgentInfo.indexOf(Agents[v]) > 0) { flag = false; break; }
        }
        return flag;
    }
    if (/(phone|pad|pod|iPhone|iPod|ios|iPad|Android|Mobile|BlackBerry|IEMobile|MQQBrowser|JUC|Fennec|wOSBrowser|BrowserNG|WebOS|Symbian|Windows Phone)/i.test(navigator.userAgent)) {
        // alert(navigator.userAgent);
        /* 因为我们后面用的是rem布局，所以这里做下处理，根据不用设备分辨率更改跟字体大小。 rem相关布局[请参考](http://www.jianshu.com/p/65f80d4b44bb)*/
        (function(win,doc){
            change();
            function change(){
                doc.documentElement.style.fontSize = doc.documentElement.clientWidth *20/750+'px';
            }
            win.addEventListener('resize',change,false);
            win.addEventListener('orientationchange',change,false);  /* 这个是移动端设备横屏、竖屏转换时触发的事件处理函数 */
        })(window,document);
        // if(url==='home'){
        //     next()
        // }else{
        //     if(to.fullPath==='/Home'){
        //         next();
        //     }else{
        //         next({
        //             path:'/Home',
        //         })
        //     }
        // }

      if (to_path === 'home') {
        next()
      } else {
        next({
          path: '/Home',
        })
      }
    } else {
      console.log(222)
        dynamicLoading.js("../../static/script/jquery-1.11.3.min.js");
        dynamicLoading.js("../../static/script/skrollr.min.js");
        dynamicLoading.js("../../static/script/org.min.js");
        // dynamicLoading.js("../../static/script/layer.js");
        //动态加载 CSS 文件
        dynamicLoading.css("../../static/bootstrap-3.3.7-dist/css/bootstrap.min.css");
        dynamicLoading.css("../../static/bootstrap-3.3.7-dist/css/bootstrap-theme.min.css");
        dynamicLoading.css("../../static/css/lib.css");
        dynamicLoading.css("../../static/css/style.css");
        dynamicLoading.css("../../static/css/main.css");
    $(function () {
        skrollr.init();
        // if (!$("#mindex").length) {
        //     $('body').addClass('sscreen')
        // }
    })
        window.onresize = function(){
            skrollr.init();
        }
      if (to_path==='homepc'){
            next()
      }else{
        next({
          path: '/Homepc',
        })
      }
    };
})
// Vue.prototype.$http = axios;
Vue.prototype.$qs = qs;
Vue.prototype.$setCookie = setCookie;
Vue.prototype.$delCookie = delCookie;
Vue.prototype.$getCookie = getCookie;
Vue.config.productionTip = false
/* eslint-disable no-new */
new Vue({
  router,
  i18n,
  setCookie,
  delCookie,
  getCookie,
  render: h => h(App)
}).$mount('#app')

