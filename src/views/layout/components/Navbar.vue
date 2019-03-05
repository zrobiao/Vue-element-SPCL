<template>
  <div>
    <el-menu class="navbar" mode="horizontal">
      <hamburger :toggle-click="toggleSideBar" :is-active="sidebar.opened" class="hamburger-container"/>
      <breadcrumb />
      <div class="username">欢迎&nbsp;<span>{{ name }}</span></div>
      <el-dropdown class="avatar-container" trigger="click" @command="openDialog">
        <div class="avatar-wrapper">
          <img :src="avatar" class="user-avatar">
          <i class="el-icon-caret-bottom"/>
        </div>
        <el-dropdown-menu slot="dropdown" class="user-dropdown">
          <router-link class="inlineBlock" to="/">
            <el-dropdown-item>
              首页
            </el-dropdown-item>
          </router-link>
          <el-dropdown-item command="eidtPsd">
            修改密码
          </el-dropdown-item>
          <el-dropdown-item divided>
            <span style="display:block;" @click="logout">退出登录</span>
          </el-dropdown-item>
        </el-dropdown-menu>
      </el-dropdown>
    </el-menu>
    <el-dialog :visible.sync="paswordDialog" title="密码修改" width="40%">
      <div class="reset-container">
        <el-form ref="loginForm" :model="loginForm" :rules="loginRules" class="login-form" auto-complete="on" label-position="left">
          <el-form-item prop="pass">
            <span class="svg-container">
              <svg-icon icon-class="password" />
            </span>
            <el-input v-model="loginForm.pass" :type="pwdType0" name="pass" auto-complete="on" placeholder="请输入旧密码" />
            <span class="show-pwd" @click="showPwd(0)">
              <svg-icon icon-class="eye" />
            </span>
          </el-form-item>
          <el-form-item prop="newpass">
            <span class="svg-container">
              <svg-icon icon-class="password" />
            </span>
            <el-input
              :type="pwdType1"
              v-model="loginForm.newpass"
              name="newpass"
              placeholder="请输入新密码" />
            <span class="show-pwd" @click="showPwd(1)">
              <svg-icon icon-class="eye" />
            </span>
          </el-form-item>
          <el-form-item prop="newpass1">
            <span class="svg-container">
              <svg-icon icon-class="password" />
            </span>
            <el-input
              :type="pwdType2"
              v-model="loginForm.newpass1"
              name="newpass1"
              placeholder="请确认新密码" />
            <span class="show-pwd" @click="showPwd(2)">
              <svg-icon icon-class="eye" />
            </span>
          </el-form-item>
          <div class="tips">
            <!-- <span style="color:#F56C6C"> {{ errorMsg }}</span> -->
          </div>
          <el-form-item>
            <el-row>
              <el-col :span="6" :offset="8" class="el-col-dafine">
                <el-button type="warning" @click="closeDialog">返回</el-button>
              </el-col>
              <el-col :span="6" class="el-col-dafine">
                <el-button type="primary" @click="sureDialog">确认</el-button>
              </el-col>
            </el-row>

          </el-form-item>
        </el-form>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import { editUserPsd } from '@/api/sysadmin'
import { mapGetters } from 'vuex'
import Breadcrumb from '@/components/Breadcrumb'
import Hamburger from '@/components/Hamburger'

export default {
  components: {
    Breadcrumb,
    Hamburger
  },
  data() {
    const olddatePass = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请输入密码'))
      } else {
        if (value.length < 5) {
          callback(new Error('密码不能小于5位'))
        }
        callback()
      }
    }
    const validatePass = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请输入密码'))
      } else {
        if (value.length < 5) {
          callback(new Error('密码不能小于5位'))
        }
        callback()
        if (this.loginForm.newpass1 !== '') {
          this.$refs.loginForm.validateField('newpass1')
        }
        callback()
      }
    }
    const validatePass2 = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请再次输入密码'))
      } else if (value !== this.loginForm.newpass) {
        callback(new Error('两次输入密码不一致!'))
      } else {
        callback()
      }
    }
    return {
      avatar: 'src/assets/images/spcl.png',
      pwdType0: 'password',
      pwdType1: 'password',
      pwdType2: 'password',
      paswordDialog: false,
      loginForm: {
        pass: '',
        newpass: '',
        newpass1: ''
      },
      loginRules: {
        pass: [{ required: true, trigger: 'blur', validator: olddatePass }],
        newpass: [{ required: true, trigger: 'blur', validator: validatePass }],
        newpass1: [{ required: true, trigger: 'blur', validator: validatePass2 }]
      },
      errorMsg: '这里显示错误信息'
    }
  },
  computed: {
    ...mapGetters([
      'sidebar',
      'name'
    ])
  },
  methods: {
    openDialog(command) {
      if (command === 'eidtPsd') {
        this.paswordDialog = true
      }
    },
    closeDialog() {
      this.paswordDialog = !this.paswordDialog
    },
    showPwd(val) {
      switch (val) {
        case 0:
          if (this.pwdType0 === 'password') {
            this.pwdType0 = ''
          } else {
            this.pwdType0 = 'password'
          }
          break
        case 1:
          if (this.pwdType1 === 'password') {
            this.pwdType1 = ''
          } else {
            this.pwdType1 = 'password'
          }
          break
        case 2:
          if (this.pwdType2 === 'password') {
            this.pwdType2 = ''
          } else {
            this.pwdType2 = 'password'
          }
          break
      }
    },
    sureDialog() {
      this.$refs.loginForm.validate(valid => {
        if (valid) {
          console.log(this.loginForm)
          const data = {
            password: this.loginForm.pass,
            newPassword: this.loginForm.newpass1
          }
          this.loading = true
          editUserPsd(data).then(res => {
            if (res.code === 0) {
              const status = res.data.opreaState
              if (status) {
                this.$alert('修改密码成功，即将返回重新登录', '提示', {
                  confirmButtonText: '确定',
                  callback: action => {
                    this.logout()
                  }
                })
              } else {
                this.$message.error(res.data.msg)
              }
            } else {
              this.$message.error(res.msg)
            }
          })
        } else {
          console.log('error submit!!')
          this.refreshCode()
          return false
        }
      })
    },
    toggleSideBar() {
      this.$store.dispatch('ToggleSideBar')
    },
    logout() {
      this.$store.dispatch('FedLogOut').then(() => {
        location.reload() // 为了重新实例化vue-router对象 避免bug
      })
    }
  }
}
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
$bg:#2d3a4b;
$dark_gray:#889aa4;
$light_gray:#eee;
.reset-container {
    height: 320px;
  .el-input {
    display: inline-block;
    height: 47px;
    width: 85%;
    input {
      background: transparent;
      border: 0px;
      -webkit-appearance: none;
      border-radius: 0px;
      padding: 12px 5px 12px 15px;
      color: $light_gray;
      height: 47px;
      &:-webkit-autofill {
        -webkit-box-shadow: 0 0 0px 1000px $bg inset !important;
        -webkit-text-fill-color: #fff !important;
      }
    }
  }
  .el-form-item {
    border: 1px solid rgba(255, 255, 255, 0.1);
    border-radius: 5px;
    color: #454545;
  }
  .refreshcode{cursor: pointer;margin: 16px 0;color: #fff}
  .login-form {
    position: absolute;
    left: 0;
    right: 0;
    width: 520px;
    max-width: 100%;
    padding: 35px 35px 15px 35px;
    margin: 0 auto;
  }
  .tips {
    font-size: 14px;
    color: #fff;
    margin-bottom: 10px;
    span {
      &:first-of-type {
        margin-right: 16px;
      }
    }
  }
  .svg-container {
    color: $dark_gray;
    vertical-align: middle;
    width: 30px;
    display: inline-block;
  }
  .title {
    font-size: 26px;
    font-weight: 400;
    color: $light_gray;
    margin: 0px auto 40px auto;
    text-align: center;
    font-weight: bold;
  }
  .show-pwd {
    position: absolute;
    right: 10px;
    top: 7px;
    font-size: 16px;
    color: $dark_gray;
    cursor: pointer;
    user-select: none;
  }
}
.navbar {
  height: 50px;
  line-height: 50px;
  border-radius: 0px !important;
  .hamburger-container {
    line-height: 58px;
    height: 50px;
    float: left;
    padding: 0 10px;
  }
  .screenfull {
    position: absolute;
    right: 90px;
    top: 16px;
    color: red;
  }
  .username{
    height: 50px;
    display: inline-block;
    position: absolute;
    right: 80px;
    span{
      color: #409EFF;
      padding: 0 8px;
    }
  }
  .avatar-container {
    height: 50px;
    display: inline-block;
    position: absolute;
    right: 35px;
    .avatar-wrapper {
      cursor: pointer;
      margin-top: 5px;
      position: relative;
      line-height: initial;
      .user-avatar {
        width: 40px;
        height: 40px;
        border-radius: 10px;
      }
      .el-icon-caret-bottom {
        position: absolute;
        right: -20px;
        top: 25px;
        font-size: 12px;
      }
    }
  }
  .el-col-dafine{
    text-align: right;
    line-height: 40px;
    font-size: 15px;
    font-weight: 700;
    padding-right: 20px;
  }
}
</style>

