import Vue from 'vue'
import VueRouter from 'vue-router'
import Login from '../components/Login.vue'
import Register from '../components/Register.vue'
import Detail from '../components/Detail.vue'
import Logger from '../components/Logger.vue'
import Summary from '../components/Summary.vue'

Vue.use(VueRouter)

const routes = [
  { // * 用于匹配不存在于路由里的url，使其跳转到主页
    path: '*',
    redirect: '/detail'
  },
  {
    path: '/login',
    name: 'Login',
    component: Login,
    beforeEnter: (to, from, next) => {  // 避免重复登陆
      if (!sessionStorage.getItem('username') && !localStorage.getItem('username')) {
        next()
      } else {
        next('/detail');
      }
    }
  },
  {
    path: '/register',
    name: 'Register',
    meta: {
      requiresAuth: true
    },
    component: Register
  },
  {
    path: '/detail',
    name: 'Detail',
    meta: {
      requiresAuth: true
    },
    component: Detail
  },
  {
    path: '/logger',
    name: 'Logger',
    meta: {
      requiresAuth: true
    },
    component: Logger,
    // beforeEnter: (to, from, next) => {  // 路由独享的守卫
    //   if (!sessionStorage.getItem('username') && !localStorage.getItem('username')) {
    //     next({
    //       path: '/login',
    //       query: { redirect: to.fullPath }  // 将跳转的路由path作为参数，登录成功后跳转到该路由
    //     })
    //   } else {
    //     next();
    //   }
    // }
  },
  {
    path: '/summary',
    name: 'Summary',
    meta: {
      requiresAuth: true
    },
    component: Summary
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
