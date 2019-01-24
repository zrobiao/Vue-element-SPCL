import Layout from '@/views/layout/Layout'

const reportformsRouter = {
  path: '/reportforms',
  component: Layout,
  redirect: 'noredirect',
  name: 'reportforms',
  meta: {
    title: '报表统计',
    icon: 'reportforms'
  },
  children: [
    {
      path: 'pressStatis-pt',
      component: () => import('@/views/reportforms/pressStatis-pt/index'),
      name: 'reportforms-pressStatis-pt',
      meta: {
        title: '压标统计-平台',
        icon: 'pressStatis'
      }
    },
    {
      path: 'pressStatis-yb',
      component: () => import('@/views/reportforms/pressStatis-yb/index'),
      name: 'reportforms-pressStatis-yb',
      meta: {
        title: '压标统计-人员',
        icon: 'pressStatis'
      }
    },
    {
      path: 'userStatis-kf',
      component: () => import('@/views/reportforms/userStatis-kf/index'),
      name: 'reportforms-userStatis-kf',
      meta: {
        title: '用户统计-客户',
        icon: 'userStatis'
      }
    },
    {
      path: 'userStatis-yy',
      component: () => import('@/views/reportforms/userStatis-yy/index'),
      name: 'reportforms-userStatis-yy',
      meta: {
        title: '用户统计-运营商',
        icon: 'userStatis'
      }
    },
    {
      path: 'videoStatis-pt',
      component: () => import('@/views/reportforms/videoStatis-pt/index'),
      name: 'reportforms-videoStatis-pt',
      meta: {
        title: '视频制作-平台',
        icon: 'videoStatis'
      }
    },
    {
      path: 'videoStatis-zz',
      component: () => import('@/views/reportforms/videoStatis-zz/index'),
      name: 'reportforms-videoStatis-zz',
      meta: {
        title: '视频制作-制作人',
        icon: 'videoStatis'
      }
    }
  ]
}

export default reportformsRouter
