import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

import Client from '@/client/index'

const clientRouters = [
  {
    path: '/client',
    component: Client,
    redirect: '/client',
    name: 'client',
    meta: { titile: '客户端' }

  }
]

export default new Router({
  // mode: 'history', //后端支持可开
  routes: clientRouters
})
