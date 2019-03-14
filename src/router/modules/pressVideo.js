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
}

export default pressVideoRouter
