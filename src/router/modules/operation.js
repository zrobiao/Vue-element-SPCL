import Layout from '@/views/layout/Layout'

const operationRouter = {
  path: '/Operation',
  component: Layout,
  redirect: 'noredirect',
  name: 'OperationLog',
  meta: {
    title: '账户管理',
    icon: 'OperationLog'
  },
  children: [{
    path: 'organization',
    component: () => import('@/views/systemadmin/organization/index'),
    name: 'systemAdmin-organization',
    meta: {
      title: '组织机构',
      icon: 'organization'
    }
  },
  {
    path: 'Operation',
    component: () => import('@/views/systemadmin/Operation/index'),
    name: 'systemAdmin-Operation',
    meta: {
      title: '运营人员管理',
      icon: 'Operation'
    }
  },
  {
    path: 'placemanage',
    component: () => import('@/views/systemadmin/placemanage/index'),
    name: 'systemAdmin-placemanage',
    meta: {
      title: '渠道商管理',
      icon: 'placemanage'
    }
  },
  {
    path: 'govEpire',
    component: () => import('@/views/systemadmin/govEpire/index'),
    name: 'systemAdmin-govEpire',
    meta: {
      title: '政企用户管理',
      icon: 'govEpire'
    }
  },
  {
    path: 'account',
    component: () => import('@/views/SystemAdmin/Account/index'),
    name: 'systemAdmin-account',
    meta: {
      title: '视频账户管理',
      icon: 'account'
    }
  },
  {
    path: 'pressaccount',
    component: () => import('@/views/SystemAdmin/pressaccount/index'),
    name: 'systemAdmin-pressaccount',
    meta: {
      title: '压标账户管理',
      icon: 'pressaccount'
    }
  },
  {
    path: 'msgcheck',
    component: () => import('@/views/systemadmin/msgcheck/index'),
    name: 'systemAdmin-msgcheck',
    meta: {
      title: '信息审核',
      icon: 'msgcheck'
    }
  }
  ]
}

export default operationRouter
