<template>
  <!-- <div class="enroll">
    <h3 class="title">个人中心</h3>
  </div>-->
  <el-container>
    <el-header>个人中心</el-header>
    <el-main>
      <el-button type="primary" right="3px" @click="updatePW()">修改密码</el-button>
      <el-button type="danger" right="3px" @click="loginOut()">安全退出</el-button>
    </el-main>
  </el-container>
</template>

<script>
import { logout } from '@/api/userData'
export default {
  data() {
    return {
    }
  },
  methods: {
    loginOut() {
      logout().then(res => {
        this.$router.push('/landing')
      })
    },
    updatePW() {

    }
  }
}
</script>

<style>
.el-row {
  margin-top: 50px;
  margin-bottom: 50px;
  margin: 10px auto;
}
.el-header,
.el-footer {
  /* background-color: #b3c0d1;
  color: #333; */
  text-align: center;
}
</style>
