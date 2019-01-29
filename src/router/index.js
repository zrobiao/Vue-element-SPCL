import Vue from 'vue'
import Router from 'vue-router'

// in development-env not use lazy-loading, because lazy-loading too many pages will cause webpack hot update too slow. so only in production use lazy-loading;
// detail: https://panjiachen.github.io/vue-element-admin-site/#/lazy-loading

Vue.use(Router)

/* Layout */
import Layout from '@/views/layout/Layout'

import systemadminRouter from './modules/systemadmin'
import ordermanageRouter from './modules/ordermanage'
import reportformsRouter from './modules/reportforms'

/**
* hidden: true                   if `hidden:true` will not show in the sidebar(default is false)
* alwaysShow: true               if set true, will always show the root menu, whatever its child routes length
*                                if not set alwaysShow, only more than one route under the children
*                                it will becomes nested mode, otherwise not show the root menu
* redirect: noredirect           if `redirect:noredirect` will no redirect in the breadcrumb
* name:'router-name'             the name is used by <keep-alive> (must set!!!)
* meta : {
    title: 'title'               the name show in submenu and breadcrumb (recommend set)
    icon: 'svg-name'             the icon show in the sidebar
    breadcrumb: false            if false, the item will hidden in breadcrumb(default is true)
  }
**/
export const constantRouterMap = [
  { path: '/login', component: () => import('@/views/login/index'), hidden: true },
  { path: '/404', component: () => import('@/views/404'), hidden: true },

  {
    path: '/redirect',
    component: Layout,
    hidden: true,
    children: [{
      path: '/redirect/:path*',
      component: () => import('@/views/redirect/index')
    }]
  },

  {
    path: '/',
    component: Layout,
    redirect: '/dashboard',
    name: '首页',
    hidden: true,
    children: [{
      path: 'dashboard',
      component: () => import('@/views/dashboard/index')
    }]
  },
  {
    path: '/index',
    component: Layout,
    redirect: '/dashboard',
    name: 'dashboard',
    meta: { title: '首页' },
    children: [{
      path: 'dashboard',
      component: () => import('@/views/dashboard/index'),
      meta: {
        title: '视频彩铃管理平台',
        icon: 'cailing'
      }
    }]
  },

  ordermanageRouter,
  reportformsRouter,
  systemadminRouter,

  {
    path: '/VideoList',
    component: Layout,
    redirect: 'noredirect',
    name: 'VideoList',
    meta: {
      title: '视频列表',
      icon: 'VideoList'
    },
    children: [{
      path: 'finishVideo',
      component: () => import('@/views/VideoList/finishVideo/index'),
      name: 'finishVideo',
      meta: {
        title: '制作完成',
        icon: 'finishVideo'
      }
    },
    {
      path: 'pressVideo',
      component: () => import('@/views/VideoList/pressVideo/index'),
      name: 'pressVideo',
      meta: {
        title: '压标完成',
        icon: 'pressVideo'
      }
    }
    ]
  },
  {
    path: '/OperationLog',
    component: Layout,
    redirect: 'noredirect',
    name: 'OperationLog',
    meta: {
      title: '操作日志',
      icon: 'OperationLog'
    },
    children: [{
      path: 'recordlog',
      component: () => import('@/views/OperationLog/recordlog/index'),
      name: 'recordlog',
      meta: {
        title: '操作日志',
        icon: 'recordlog'
      }
    },
    {
      path: 'videoorder',
      component: () => import('@/views/OperationLog/videoorder/index'),
      name: 'videoorder',
      meta: {
        title: '订单操作日志',
        icon: 'videoorder'
      }
    }
    ]
  },

  { path: '*', redirect: '/404', hidden: true }
]

export default new Router({
  // mode: 'history', //后端支持可开
  scrollBehavior: () => ({ y: 0 }),
  routes: constantRouterMap
})

export const asyncRouterMap = [
  {
    path: '/Systemadmin',
    component: Layout,
    redirect: 'noredirect',
    name: 'Systemadmin',
    meta: { title: 'Systemadmin', icon: 'Systemadmin' },
    children: [{
      path: 'account',
      component: () => import('@/views/SystemAdmin/Account'),
      name: 'SystemAdmin-account',
      meta: { title: '账户管理', icon: 'account' }
    }]
  }
]
