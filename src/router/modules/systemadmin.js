import Layout from '@/views/layout/layout'

const systemadminRouter = [
  {
    path: '/systemadmin',
    component: Layout,
    redirect: 'noredirect',
    name: 'systemadmin',
    meta: {
      title: 'systemadmin',
      icon: 'systemadmin'
    },
    children: [
      {
        path: 'account',
        component: () => import('@/views/systemAdmin/account'),
        name: 'systemAdmin-account',
        meta: {
          title: '账户管理',
          icon: 'account'
        }
      },
      {
        path: 'permission',
        component: () => import('@/views/systemAdmin/permission'),
        name: 'systemAdmin-permission',
        meta: {
          title: '权限管理',
          icon: 'permission'
        }
      }, {
        path: 'complain',
        component: () => import('@/views/systemAdmin/complain'),
        name: 'systemAdmin-complain',
        meta: {
          title: '权限管理',
          icon: 'complain'
        }
      }

    ]
  }
]

export default systemadminRouter
