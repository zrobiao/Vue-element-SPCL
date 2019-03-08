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
    component: () => import('@/views/account/organization/index'),
    name: 'systemAdmin-organization',
    meta: {
      title: '组织机构',
      icon: 'organization'
    }
  },
  {
    path: 'placemanage',
    component: () => import('@/views/account/placemanage/index'),
    name: 'systemAdmin-placemanage',
    meta: {
      title: '渠道商管理',
      icon: 'placemanage'
    }
  },
  {
    path: 'govEpire',
    component: () => import('@/views/account/govEpire/index'),
    name: 'systemAdmin-govEpire',
    meta: {
      title: '政企用户管理',
      icon: 'govEpire'
    }
  },
  {
    path: 'indvidAccount',
    component: () => import('@/views/account/indvidAccount/index'),
    name: 'systemAdmin-indvidAccount',
    meta: {
      title: '个体户管理',
      icon: 'indvidAccount'
    }
  },
  {
    path: 'Operation',
    component: () => import('@/views/account/Operation/index'),
    name: 'systemAdmin-Operation',
    meta: {
      title: '运营人员管理',
      icon: 'Operation'
    }
  },
  {
    path: 'account',
    component: () => import('@/views/account/videoAccount/index'),
    name: 'systemAdmin-account',
    meta: {
      title: '制作账户管理',
      icon: 'account'
    }
  },
  {
    path: 'pressaccount',
    component: () => import('@/views/account/pressaccount/index'),
    name: 'systemAdmin-pressaccount',
    meta: {
      title: '压标账户管理',
      icon: 'pressaccount'
    }
  },
  {
    path: 'openaccount',
    component: () => import('@/views/account/openAccount/index'),
    name: 'systemAdmin-openaccount',
    meta: {
      title: '开通账户管理',
      icon: 'openaccount'
    }
  },
  {
    path: 'msgcheck',
    component: () => import('@/views/account/msgcheck/index'),
    name: 'systemAdmin-msgcheck',
    meta: {
      title: '信息审核',
      icon: 'msgcheck'
    }
  }
  ]
}

export default operationRouter
