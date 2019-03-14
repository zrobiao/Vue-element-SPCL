import Layout from '@/views/layout/Layout'

const makeVideoRouter = {
  path: '/MakeVideo',
  component: Layout,
  redirect: 'noredirect',
  name: 'VideoList',
  meta: {
    title: '制作视频',
    icon: 'VideoList'
  },
  children: [{
    path: 'waitMake',
    component: () => import('@/views/VideoList/waitMake/index'),
    name: 'OrderManage-waitMake',
    meta: {
      title: '等待制作订单',
      icon: 'waitMake'
    }
  }, {
    path: 'waitVerify',
    component: () => import('@/views/VideoList/waitVerify/index'),
    name: 'OrderManage-waitVerify',
    meta: {
      title: '等待客户确认',
      icon: 'waitVerify'
    }
  },
  {
    path: 'makefinish',
    component: () => import('@/views/VideoList/makefinish/index'),
    name: 'finishVideo',
    meta: {
      title: '完成制作订单',
      icon: 'finishVideo'
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

export default makeVideoRouter
