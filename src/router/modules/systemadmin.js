import Layout from '@/views/layout/Layout'

const systemadminRouter = {
  path: '/systemadmin',
  component: Layout,
  redirect: 'noredirect',
  name: 'systemadmin',
  meta: {
    title: '系统管理',
    icon: 'systemadmin'
  },
  children: [
    {
      path: 'account',
      component: () => import('@/views/SystemAdmin/Account/index'),
      name: 'systemAdmin-account',
      meta: {
        title: '账户管理',
        icon: 'account'
      }
    },
    {
      path: 'permission',
      component: () => import('@/views/systemadmin/permission/index'),
      name: 'systemAdmin-permission',
      meta: {
        title: '权限管理',
        icon: 'permission'
      }
    },
    {
      path: 'complain',
      component: () => import('@/views/systemadmin/complain/index'),
      name: 'systemAdmin-complain',
      meta: {
        title: '投诉管理',
        icon: 'complain'
      }
    },
    {
      path: 'govEpire',
      component: () => import('@/views/systemadmin/govEpire/index'),
      name: 'systemAdmin-govEpire',
      meta: {
        title: '政企渠道',
        icon: 'govEpire'
      }
    },
    {
      path: 'menu',
      component: () => import('@/views/systemadmin/menu/index'),
      name: 'systemAdmin-menu',
      meta: {
        title: '菜单管理',
        icon: 'menu'
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
    },
    {
      path: 'notice',
      component: () => import('@/views/systemadmin/notice/index'),
      name: 'systemAdmin-notice',
      meta: {
        title: '公告管理',
        icon: 'notice'
      }
    },
    {
      path: 'organization',
      component: () => import('@/views/systemadmin/organization/index'),
      name: 'systemAdmin-organization',
      meta: {
        title: '组织管理',
        icon: 'organization'
      }
    },
    {
      path: 'role',
      component: () => import('@/views/systemadmin/role/index'),
      name: 'systemAdmin-role',
      meta: {
        title: '角色管理',
        icon: 'role'
      }
    }

  ]
}

export default systemadminRouter
