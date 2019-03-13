import Vue from 'vue'
import Router from 'vue-router'

// in development-env not use lazy-loading, because lazy-loading too many pages will cause webpack hot update too slow. so only in production use lazy-loading;
// detail: https://panjiachen.github.io/vue-element-admin-site/#/lazy-loading

Vue.use(Router)

/* Layout */
import Layout from '@/views/layout/Layout'

import systemadminRouter from './modules/systemadmin'
import operationRouter from './modules/operation'
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
  systemadminRouter,
  operationRouter,
  {
    path: '/VideoList',
    component: Layout,
    redirect: 'noredirect',
    name: 'VideoList',
    meta: {
      title: '制作视频',
      icon: 'VideoList'
    },
    children: [
      {
        path: 'waitMake',
        component: () => import('@/views/VideoList/waitMake/index'),
        name: 'OrderManage-waitMake',
        meta: {
          title: '等待制作订单',
          icon: 'waitMake'
        }
      }, {
        path: 'waitVerify',
        component: () => import('@/views/OrderManage/waitVerify/index'),
        name: 'OrderManage-waitVerify',
        meta: {
          title: '等待客户确认',
          icon: 'waitVerify'
        }
      },
      {
        path: 'finishVideo',
        component: () => import('@/views/VideoList/finishVideo/index'),
        name: 'finishVideo',
        meta: {
          title: '完成制作订单',
          icon: 'finishVideo'
        }
      }]
  },
  {
    path: '/Pressmanage',
    component: Layout,
    redirect: 'noredirect',
    name: 'PressList',
    meta: {
      title: '压标管理',
      icon: 'VideoList'
    },
    children: [{
      path: 'waitPress',
      component: () => import('@/views/OrderManage/waitPress/index'),
      name: 'OrderManage-waitPress',
      meta: {
        title: '待压标订单',
        icon: 'waitPress'
      }
    },
    {
      path: 'pressVideo',
      component: () => import('@/views/VideoList/pressVideo/index'),
      name: 'pressVideo',
      meta: {
        title: '已完成压标',
        icon: 'pressVideo'
      }
    },
    {
      path: 'pressStatis-pt',
      component: () => import('@/views/reportforms/pressStatis-pt/index'),
      name: 'reportforms-pressStatis-pt',
      meta: {
        title: '压标完成统计-平台',
        icon: 'pressStatis'
      }
    }, {
      path: 'pressStatis-yb',
      component: () => import('@/views/reportforms/pressStatis-yb/index'),
      name: 'reportforms-pressStatis-yb',
      meta: {
        title: '压标完成统计-人员',
        icon: 'pressStatis'
      }
    }
    ]
  },
  ordermanageRouter,
  reportformsRouter,
  { path: '*', redirect: '/404', hidden: true }
]

export default new Router({
  // mode: 'history', //后端支持可开
  scrollBehavior: () => ({ y: 0 }),
  routes: constantRouterMap
})

