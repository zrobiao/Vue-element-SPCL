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
    children: [
      {
        path: 'enroll',
        component: () => import('@/client/view/enroll.vue'),
        name: 'enroll'
        // 注册页面
      },
      {
        path: 'noticeList',
        component: () => import('@/client/view/noticeList.vue'),
        name: 'noticeList'
        // 公告页面
      },
      {
        path: 'complaint',
        component: () => import('@/client/view/complaint.vue'),
        name: 'complaint'
        // 投诉页面
      },
      {
        path: 'personal',
        component: () => import('@/client/view/personal.vue'),
        name: 'personal'
        // 个人中心
      },
      {
        path: 'merchantRule',
        component: () => import('@/client/view/merchantRule.vue'),
        name: 'merchantRule'
        // 商户管理
      },
      {
        path: 'materialRule',
        component: () => import('@/client/view/materialRule.vue'),
        name: 'materialRule'
        // 素材管理
      },
      {
        path: 'newOrder',
        component: () => import('@/client/view/newOrder.vue'),
        name: 'newOrder'
        // 新建订单
      },
      {
        path: 'orderList',
        component: () => import('@/client/view/orderList.vue'),
        name: 'orderList'
        // 素材管理
      }
    ]
  }
]

const router = new Router({
  // mode: 'history', //后端支持可开
  routes: clientRouters
})

export default router
