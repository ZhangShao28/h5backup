// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import FastClick from 'fastclick'
// import VueRouter from 'vue-router'
import App from './App'
import Api from './api'
import Axios from './axios/ajax'
import router from './router/index'
import { cookie, Tabbar, TabbarItem } from 'vux'
import {Select,Input,Option} from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import YDUI from 'vue-ydui'
/* 相当于import YDUI from 'vue-ydui/ydui.rem.js' */
import 'vue-ydui/dist/ydui.rem.css'
import 'vue-ydui/dist/ydui.base.css'
// import '../static/font-awesome/css/font-awesome.min.css'
import '../static/style/reset.css'
import '../static/style/border.css'
// Vue.use(VueRouter)
Vue.use(YDUI)
Vue.use(cookie)
Vue.use(Select)
Vue.use(Input)
Vue.use(Option)
Vue.component('tabbar', Tabbar)
Vue.component('tabbar-item', TabbarItem)
Vue.prototype.$api = Api;
Vue.prototype.$axios = Axios;
// import './axios/ajax'


FastClick.attach(document.body)
Vue.config.productionTip = false
Vue.prototype.$devicePixelRatio = 2
Vue.directive('focus', {
  // 当绑定元素插入到 DOM 中。

  inserted: function (el) {
    // 聚焦元素
    el.focus()
  },
  //也可以用update,update就是当页面有操作的时候就触发，比如点击按钮，输入框输入都算。
  //有一个要注意的就是，就是你页面有几个input,比如一个input绑定了v-focus,一个没有绑定。你在没绑定v-focus的input输入时，绑定了v-focus的input就是自动获取焦点，这是个bug.
  //update: function (el) {
  //el.focus()
  //}
});
new Vue({
  router,
  render: h => h(App)
}).$mount('#app-box')
