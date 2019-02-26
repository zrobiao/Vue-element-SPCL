<template>
  <div class="login-container">
    <el-form
      ref="loginForm"
      :model="loginForm"
      :rules="loginRules"
      class="login-form"
      auto-complete="on"
      label-position="left"
    >
      <el-menu
        :default-active="activeIndex2"
        class="el-menu-demo"
        mode="horizontal"
        background-color="#545c64"
        text-color="#fff"
        active-text-color="#ffd04b"
        @select="handleSelect">
        <el-menu-item index="1">公告管理</el-menu-item>
        <el-submenu index="2">
          <template slot="title">订单管理</template>
          <el-menu-item index="2-1">订单列表</el-menu-item>
          <el-menu-item index="2-2">订单详情</el-menu-item>
          <el-menu-item index="2-3" @click="test">用户列表</el-menu-item>
          <!-- <el-submenu index="2-4">
      <template slot="title">数据统计管理</template>
      <el-menu-item index="2-4-1">视频数量统计</el-menu-item>
      <el-menu-item index="2-4-2">用户数统计</el-menu-item>
    </el-submenu> -->
        </el-submenu>
        <el-submenu index="3">
          <template slot="title">数据统计管理</template>
          <el-menu-item index="3-1">视频数量统计</el-menu-item>
          <el-menu-item index="3-2">用户数统计</el-menu-item>
        </el-submenu>
        <el-menu-item index="4" >投诉管理</el-menu-item>
        <el-menu-item index="5" >商户管理</el-menu-item>
        <el-menu-item index="6" >个人中心</el-menu-item>
        <!-- <el-menu-item index="3" disabled>消息中心</el-menu-item> -->
        <!-- <el-menu-item index="4"><a href="https://www.ele.me" target="_blank">订单管理</a></el-menu-item> -->
      </el-menu>
    </el-form>
    <div>
      <router-view/>
    </div>
  </div>
</template>

<script>
// import { MessageBox } from 'element-ui'
export default {
  created() {
    // console.log(this.$route)
    //  this.open();
  },
  mounted() {
    // this.open();
    // this.test()
  },
  methods: {
    open() {
      this.$alert('服务器维护暂停服务', '公告', {
        confirmButtonText: '确定',
        callback: action => {
          this.$message({
            type: 'info',
            message: `action: ${action}`
          })
        }
      })
    },
    handleSelect(key, keyPath) {
      console.log(key, keyPath)
    },
    test() {
      this.$router.push('main/enroll')
    }
  }

}
</script>
