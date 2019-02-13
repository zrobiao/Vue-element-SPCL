<template>
  <div v-if="item.list" class="menu-wrapper">
    <el-submenu :index="item.name">
      <template slot="title">
        <item :icon="item.icon" :title="item.name" />
      </template>
      <template v-for="child in item.list">
        <sidebar-item
          v-if="child.list&&child.list.length>0"
          :is-nest="true"
          :item="child"
          :key="child.menuId"
          :base-path="resolvePath(child.url)"
          class="nest-menu" />
        <app-link v-else :to="resolvePath(child.url)" :key="child.name">
          <el-menu-item :index="child.name">
            <item :icon="child.icon" :title="child.name" />
          </el-menu-item>
        </app-link>
      </template>
    </el-submenu>
  </div>
</template>
<script>
import path from 'path'
import { isExternal } from '@/utils'
import Item from './Item'
import AppLink from './Link'

export default {
  name: 'SidebarItem',
  components: { Item, AppLink },
  props: {
    // route object
    item: {
      type: Object,
      required: true
    },
    isNest: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      onlyOneChild: null,
      menuUrl: ''
    }
  },
  methods: {
    hasOneShowingChild(children, parent) {
      const showingChildren = children.filter(item => {
        if (item.hidden) {
          return false
        } else {
          // Temp set(will be used if only has one showing child)
          this.onlyOneChild = item
          return true
        }
      })

      // When there is only one child router, the child router is displayed by default
      if (showingChildren.length === 1) {
        return true
      }

      // Show parent if there are no child router to display
      if (showingChildren.length === 0) {
        this.onlyOneChild = { ... parent, path: '', noShowingChildren: true }
        return true
      }

      return false
    },
    resolvePath(routePath) {
      if (this.isExternalLink(routePath)) {
        return routePath
      }
      return path.resolve(routePath)
    },
    isExternalLink(routePath) {
      return isExternal(routePath)
    },
    filterMenupath(menuName) {
      switch (menuName) {
        case '菜单管理':
          this.menuUrl = '/systemadmin/menu'
          break
        case '角色管理':
          this.menuUrl = '/systemadmin/role'
          break
        case 'SQL监控':
          this.menuUrl = '/systemadmin/sqlmonitor'
          break
        case '参数管理':
          this.menuUrl = '/systemadmin/parmanage'
          break
        case '字典管理':
          this.menuUrl = '/systemadmin/dictmanage'
          break
        case '系统日志':
          this.menuUrl = '/systemadmin/recordlog'
          break
        case '订单日志':
          this.menuUrl = '/systemadmin/videoorder'
          break
        case '全国区域管理':
          this.menuUrl = '/systemadmin/areamanage'
          break
        case '手机号码段管理':
          this.menuUrl = '/systemadmin/phomanage'
          break
        case '权限管理':
          this.menuUrl = '/systemadmin/permission'
          break
        case '投诉管理':
          this.menuUrl = '/systemadmin/complain'
          break
        case '公告管理':
          this.menuUrl = '/systemadmin/notice'
          break
        case '部门管理':
          this.menuUrl = '/Operation/organization'
          break
        case '运营人员管理':
          this.menuUrl = '/Operation/Operation'
          break
        case '渠道商管理':
          this.menuUrl = '/Operation/govEpire'
          break
        case '视频账户管理':
          this.menuUrl = '/Operation/account'
          break
        case '信息审核':
          this.menuUrl = '/Operation/msgcheck'
          break
        case '待制作视频订单':
          this.menuUrl = '/VideoList/waitMake'
          break
        case '已完成制作订单':
          this.menuUrl = '/VideoList/finishVideo'
          break
        case '制作视频完成统计':
          this.menuUrl = '/VideoList/videoStatis-pt'
          break
        case '待压标订单':
          this.menuUrl = '/Pressmanage/waitPress'
          break
        case '已完成压标订单':
          this.menuUrl = '/Pressmanage/pressVideo'
          break
        case '压标完成统计':
          this.menuUrl = '/Pressmanage/pressStatis-pt'
          break
        case '有效订单':
          this.menuUrl = '/ordermanage/validOrder'
          break
        case '作废订单':
          this.menuUrl = '/ordermanage/discardOrder'
          break
        case '等待开通订单':
          this.menuUrl = '/ordermanage/waitOpen'
          break
        case '开通用户':
          this.menuUrl = '/ordermanage/userOpen'
          break
        case '开通用户统计':
          this.menuUrl = '/reportforms/userStatis-kf'
          break
        case '视频制作统计':
          this.menuUrl = '/reportforms/videoStatis-pt'
          break
        default:
          break
      }
    }
  }
}
</script>
