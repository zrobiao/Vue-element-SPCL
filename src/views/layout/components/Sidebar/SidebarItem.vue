<template>
  <div v-if="item.list" class="menu-wrapper">

    <!-- <template v-if="hasOneShowingChild(item.list,item)">
      <app-link :to="resolvePath(item.name,menuUrl)">
        <el-menu-item :index="resolvePath(item.name,menuUrl)" :class="{'submenu-title-noDropdown':!isNest}">
          <item v-if="onlyOneChild.meta" :icon="onlyOneChild.meta.icon||item.meta.icon" :title="onlyOneChild.name" />
        </el-menu-item>
      </app-link>
    </template> -->

    <el-submenu :index="resolvePath(item.name,menuUrl)">
      <template slot="title">
        <item :icon="item.icon" :title="item.name" />
      </template>

      <template v-for="child in item.list">
        <sidebar-item
          v-if="child.list&&child.list.length>0"
          :is-nest="true"
          :item="child"
          :key="child.path"
          :base-path="resolvePath(child)"
          class="nest-menu" />
        <app-link v-else :to="resolvePath(child.name,menuUrl)" :key="child.name">
          <el-menu-item :index="resolvePath(child.name,menuUrl)">
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
    },
    basePath: {
      type: String,
      default: ''
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
    resolvePath(menuName, routePath) {
      this.filterMenupath(menuName)
      if (this.isExternalLink(routePath)) {
        return routePath
      }
      return path.resolve(this.basePath, routePath)
    },
    isExternalLink(routePath) {
      return isExternal(routePath)
    },
    filterMenupath(menuName) {
      switch (menuName) {
        case '菜单管理':
          this.menuUrl = '/systemadmin/menu'
          break

        default:
          break
      }
    }
  }
}
</script>
