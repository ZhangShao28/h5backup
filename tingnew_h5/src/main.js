// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import FastClick from 'fastclick'
import VueRouter from 'vue-router'
import App from './App'
import Home from './components/Home'
import Help from './components/Help'
import PayMent from './components/Payment'

Vue.use(VueRouter)

const routes = [
    {
    path: '/',
      name:'Home',
    component: Home
    },{
      path: '/Help',
      name:'Help',
      component: Help
    },{
      path: '/PayMent',
      name:'PayMent',
      component: PayMent
    }
]

const router = new VueRouter({
  routes
})

FastClick.attach(document.body)

Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  router,
  render: h => h(App)
}).$mount('#app-box')
