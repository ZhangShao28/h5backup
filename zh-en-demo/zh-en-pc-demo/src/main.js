// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import Home from './components/home'//商户统计
import VueRouter from 'vue-router'
import VueI18n from 'vue-i18n'
import axios from 'axios';
import qs from 'qs';
import { setCookie, delCookie, getCookie } from './cookie/cookie'
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
Vue.use(ElementUI);
axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded';
Vue.use(VueI18n);
Vue.prototype.$http = axios;
Vue.prototype.$qs = qs;
Vue.prototype.$setCookie = setCookie;
Vue.prototype.$delCookie = delCookie;
Vue.prototype.$getCookie = getCookie;
Vue.use(VueRouter)

const i18n = new VueI18n({
  locale: getCookie('PLAY_LANG', 'en'),// 语言标识
  messages: {
    'zh': require('./langs/zh'),
    'en': require('./langs/en')
  }
});
if (getCookie('langs') === 'en') {
  i18n.locale = 'en'
} else {
  i18n.locale = 'zh'
}

const routes = [
  {
    path: '/Home',
    name: 'Home',
    component: Home
  }
]
const router = new VueRouter({
  routes
})


router.beforeEach((to, from, next) => {
  const loc_url = router.match(location).hash.split('/');
  const url = loc_url[1].toLowerCase();
  if (url === 'home') {
    next()
  } else {
    if (to.fullPath === '/Home') {
      next();
    } else {
      next({
        path: '/Home',
      })
    }
  }
})
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

