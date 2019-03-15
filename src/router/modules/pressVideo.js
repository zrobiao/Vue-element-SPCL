import Layout from '@/views/layout/Layout'

const pressVideoRouter = {
  path: '/PressVideo',
  component: Layout,
  redirect: 'noredirect',
  name: 'PressList',
  meta: {
    title: '压标管理',
    icon: 'VideoList'
  },
  children: [{
    path: 'waitPress',
    component: () => import('@/views/VideoList/waitPress/index'),
    name: 'OrderManage-waitPress',
    meta: {
      title: '待压标订单',
      icon: 'waitPress'
    }
  },
  {
    path: 'pressfinish',
    component: () => import('@/views/VideoList/pressfinish/index'),
    name: 'pressfinish',
    meta: {
      title: '已完成压标',
      icon: 'pressVideo'
    }
  }, {
    path: 'pressVideo',
    component: () => import('@/views/OrderManage/pressVideo/index'),
    name: 'pressVideo',
    meta: {
      title: '已压标视频',
      icon: 'pressVideo'
    }
  }
  ]
}

export default pressVideoRouter
