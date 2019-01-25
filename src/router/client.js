import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

import Client from '../client/index'

const clientRouters = [
  {
    path: '/client',
    component: Client,
    name: 'client',
    meta: { titile: '客户端' }
  }
]

const router = new Router({
  // mode: 'history', //后端支持可开
  routes: clientRouters
})

export default router
