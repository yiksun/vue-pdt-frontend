import Vue from 'vue'
import App from './App.vue'
import router from './router'
// element-ui
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
// echarts
// import echarts from 'echarts'

import 'babel-polyfill'
import axios from 'axios'
import global_ from './utils/utils.js'

Vue.config.productionTip = false
axios.defaults.baseURL = global_.BASE_URL
Vue.prototype.axios = axios
// Vue.prototype.echarts = echarts

Vue.use(ElementUI)

// 全局守卫
router.beforeEach((to, from, next) => {
  if (to.matched.some(res => res.meta.requiresAuth)) {
    if (!sessionStorage.getItem('username') && !localStorage.getItem('username')) {
      next({
        path: '/login',
        query: { redirect: to.fullPath }  // 将跳转的路由path作为参数，登录成功后跳转到该路由
      })
    } else {
      next()
    }
  } else {
    next()
  }
})

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')

// index.html ----> main.js ----> App.vue