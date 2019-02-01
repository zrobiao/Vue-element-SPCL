import Layout from '@/views/layout/Layout'

const systemadminRouter = {
  path: '/systemadmin',
  component: Layout,
  redirect: 'noredirect',
  name: 'systemadmin',
  meta: {
    title: '系统基础设置',
    icon: 'systemadmin'
  },
  children: [
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
      path: 'role',
      component: () => import('@/views/systemadmin/role/index'),
      name: 'systemAdmin-role',
      meta: {
        title: '角色管理',
        icon: 'role'
      }
    },
    {
      path: 'sqlmonitor',
      component: () => import('@/views/systemadmin/sqlmonitor/index'),
      name: 'systemAdmin-sqlmonitor',
      meta: {
        title: 'SQL监控',
        icon: 'sqlmonitor'
      }
    },
    {
      path: 'parmanage',
      component: () => import('@/views/systemadmin/parmanage/index'),
      name: 'systemAdmin-parmanage',
      meta: {
        title: '参数管理',
        icon: 'parmanage'
      }
    },
    {
      path: 'dictmanage',
      component: () => import('@/views/systemadmin/dictmanage/index'),
      name: 'systemAdmin-dictmanage',
      meta: {
        title: '字典管理',
        icon: 'dictmanage'
      }
    },
    {
      path: 'recordlog',
      component: () => import('@/views/OperationLog/recordlog/index'),
      name: 'recordlog',
      meta: {
        title: '系统日志',
        icon: 'recordlog'
      }
    }, {
      path: 'videoorder',
      component: () => import('@/views/OperationLog/videoorder/index'),
      name: 'videoorder',
      meta: {
        title: '订单日志',
        icon: 'videoorder'
      }
    },
    {
      path: 'areamanage',
      component: () => import('@/views/systemadmin/areamanage/index'),
      name: 'systemAdmin-areamanage',
      meta: {
        title: '全国区域管理',
        icon: 'areamanage'
      }
    },
    {
      path: 'phomanage',
      component: () => import('@/views/systemadmin/phomanage/index'),
      name: 'systemAdmin-phomanage',
      meta: {
        title: '手机号码段管理',
        icon: 'phomanage'
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
      path: 'notice',
      component: () => import('@/views/systemadmin/notice/index'),
      name: 'systemAdmin-notice',
      meta: {
        title: '公告管理',
        icon: 'notice'
      }
    }

  ]
}

export default systemadminRouter
