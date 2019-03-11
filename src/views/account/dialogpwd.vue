<template>
  <div class="reset-container">
    <el-form ref="loginForm" :model="loginForm" :rules="loginRules" class="login-form" auto-complete="on" label-position="left">
      <el-form-item prop="username">
        <span class="svg-container">
          <svg-icon icon-class="user" />
        </span>
        <el-input v-model="diaInfo.username" name="username" type="text" auto-complete="on" readonly/>
      </el-form-item>
      <el-form-item prop="repass">
        <span class="svg-container">
          <svg-icon icon-class="password" />
        </span>
        <el-input
          :type="pwdType"
          v-model="loginForm.repass"
          name="repass"
          placeholder="请输入重设密码" />
        <span class="show-pwd" @click="showPwd">
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
</template>
<script>
export default {
  props: {
    diaInfo: {
      type: Object,
      default: () => {}
    }
  },
  data() {
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
    return {
      pwdType: 'password',
      loginForm: {
        repass: ''
      },
      loginRules: {
        repass: [{ required: true, trigger: 'blur', validator: validatePass }]
      },
      errorMsg: '这里显示错误信息'
    }
  },
  methods: {
    showPwd() {
      if (this.pwdType === 'password') {
        this.pwdType = ''
      } else {
        this.pwdType = 'password'
      }
    },
    sureDialog() {
      this.$refs.loginForm.validate(valid => {
        if (valid) {
          this.$emit('dialogPwdChild', this.diaInfo.userId, this.loginForm.repass)
        }
      })
    },
    closeDialog() {
      this.$emit('dialogPwdChild')
    }
  }
}
</script>
<style lang="scss" scoped>
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
