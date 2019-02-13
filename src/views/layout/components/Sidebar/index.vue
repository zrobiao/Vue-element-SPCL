<template>
  <el-scrollbar wrap-class="scrollbar-wrapper">
    <el-menu
      :show-timeout="200"
      :collapse="isCollapse"
      default-active="/index"
      mode="vertical"
      background-color="#304156"
      text-color="#bfcbd9"
      active-text-color="#409EFF"
    >
      <el-menu-item index="首页" @click="routeJump(indexTitle.path)">
        <svg-icon :icon-class="indexTitle.icon" />
        <span>{{ indexTitle.title }}</span>
      </el-menu-item>
      <sidebar-item v-for="route in sideMenu" :key="route.menuId" :item="route"/>
    </el-menu>
  </el-scrollbar>
</template>

<script>
import { mapGetters } from 'vuex'
import { getMenuList } from '@/api/sysadmin'
import SidebarItem from './SidebarItem'

export default {
  components: { SidebarItem },
  data() {
    return {
      sideMenu: [],
      indexTitle: {
        title: '视频彩铃平台',
        icon: 'cailing',
        path: '/'
      }
    }
  },
  computed: {
    ...mapGetters([
      'sidebar'
    ]),
    routes() {
      return this.$router.options.routes
    },
    isCollapse() {
      return !this.sidebar.opened
    }
  },
  created() {
    this.getMenuList()
    console.log(this.$router.options.routes)
  },
  methods: {
    getMenuList() {
      getMenuList().then(res => {
        const listData = res.menuList
        this.sideMenu = listData
        console.log(this.sideMenu)
      })
    },
    routeJump(path) {
      this.$router.replace(path)
    }
  }
}
</script>
