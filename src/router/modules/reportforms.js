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
    }
  ]
}

export default reportformsRouter
