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
        path: 'noticeList',
        component: () => import('@/client/view/main/noticeList.vue'),
        name: 'noticeList'
        // 公告页面
      },
      {
        path: 'complaint',
        component: () => import('@/client/view/main/complaint.vue'),
        name: 'complaint'
        // 投诉页面
      },
      {
        path: 'personal',
        component: () => import('@/client/view/main/personal.vue'),
        name: 'personal'
        // 个人中心
      },
      {
        path: 'merchantRule',
        component: () => import('@/client/view/agent/merchantRule.vue'),
        name: 'merchantRule'
        // 商户管理
      },
      {
        path: 'materialList',
        component: () => import('@/client/view/file/materialList.vue'),
        name: 'materialList'
        // 素材列表
      },
      {
        path: 'newOrder',
        component: () => import('@/client/view/video/newOrder.vue'),
        name: 'newOrder'
        // 新建订单
      },
      {
        path: 'orderList',
        component: () => import('@/client/view/video/orderList.vue'),
        name: 'orderList'
        // 订单列表
      },
      {
        path: 'merchantDetails',
        component: () => import('@/client/view/agent/merchantDetails.vue'),
        name: 'merchantDetails'
        // 商户详情
      },
      {
        path: 'materialAdd',
        component: () => import('@/client/view/file/materialAdd.vue'),
        name: 'materialAdd'
        // 新增素材
      },
      {
        path: 'orderDetails',
        component: () => import('@/client/view/video/orderDetails.vue'),
        name: 'orderDetails'
        // 视频订单详情
      }
    ]
  }
]

const router = new Router({
  // mode: 'history', //后端支持可开
  routes: clientRouters
})

export default router
