import Layout from '@/views/layout/Layout'

const ordermanageRouter = {
  path: '/ordermanage',
  component: Layout,
  redirect: 'noredirect',
  name: 'ordermanage',
  meta: {
    title: '订单管理',
    icon: 'ordermanage'
  },
  children: [
    {
      path: 'validOrder',
      component: () => import('@/views/OrderManage/validOrder/index'),
      name: 'OrderManage-validOrder',
      meta: {
        title: '有效订单',
        icon: 'validOrder'
      }
    },
    {
      path: 'discardOrder',
      component: () => import('@/views/OrderManage/discardOrder/index'),
      name: 'OrderManage-discardOrder',
      meta: {
        title: '废弃订单',
        icon: 'discardOrder'
      }
    },
    {
      path: 'waitOpen',
      component: () => import('@/views/OrderManage/waitOpen/index'),
      name: 'OrderManage-waitOpen',
      meta: {
        title: '等待开通',
        icon: 'waitOpen'
      }
    },
    {
      path: 'userOpen',
      component: () => import('@/views/OrderManage/userOpen/index'),
      name: 'OrderManage-userOpen',
      meta: {
        title: '开通用户',
        icon: 'userOpen'
      }
    },
    {
      path: 'waitVerify',
      component: () => import('@/views/OrderManage/waitVerify/index'),
      name: 'OrderManage-waitVerify',
      meta: {
        title: '等待确认',
        icon: 'waitVerify'
      }
    },
    {
      path: 'archiveOrder',
      component: () => import('@/views/OrderManage/archiveOrder/index'),
      name: 'OrderManage-archiveOrder',
      meta: {
        title: '归档订单',
        icon: 'archiveOrder'
      }
    },
    {
      path: 'resetVideo',
      component: () => import('@/views/OrderManage/resetVideo/index'),
      name: 'OrderManage-resetVideo',
      meta: {
        title: '重设视频',
        icon: 'resetVideo'
      }
    }

  ]
}

export default ordermanageRouter
