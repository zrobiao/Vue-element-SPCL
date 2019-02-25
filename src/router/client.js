import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

import Client from '@/client/index'
import Landing from '@/client/view/landing.vue'
import Main from '@/client/view/main.vue'
import Enroll from '@/client/view/enroll.vue'

const clientRouters = [
  {
    path: '/client',
    component: Client,
    name: 'client',
    meta: { titile: '客户端' }
  },
  {
    path: '/landing',
    component: Landing,
    name: 'landing',
    meta: { titile: '测试客户端_登陆' }
  },
  {
    path: '/enroll',
    component: Enroll,
    name: 'enroll',
    meta: { titile: '测试客户端_注册' }
  },
  {
    path: '/main',
    component: Main,
    name: 'main',
    meta: { titile: '测试客户端_主页' },
    children: [{
      path: 'enroll',
      component: () => import('@/client/view/enroll.vue'),
      name: 'enroll'
    }]
  }
]

const router = new Router({
  // mode: 'history', //后端支持可开
  routes: clientRouters
})

export default router
