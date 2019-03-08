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
    }, {
      path: 'videoStatis-zz',
      component: () => import('@/views/reportforms/videoStatis-zz/index'),
      name: 'videoStatis-zz/index',
      meta: {
        title: '视频制作数量统计-制作',
        icon: 'videoStatis'
      }
    }, {
      path: 'videoStatis-pt',
      component: () => import('@/views/reportforms/videoStatis-pt/index'),
      name: 'videoStatis-pt/index',
      meta: {
        title: '视频制作数量统计-平台',
        icon: 'videoStatis'
      }
    }
  ]
}

export default reportformsRouter
