<template>
  <div>
    <el-row :gutter="15">
      <h3 class="infotitle">基本信息</h3>
      <el-col :span="6" class="ipt-box">
        <label>账户名称：</label>
        <el-input v-model="accountInfo.username" name="username" type="text" clearable placeholder="请输入用户名" @blur="blurVerify(accountInfo.username)"/>
      </el-col>
      <el-col :span="6" class="ipt-box">
        <label>联系号码：</label>
        <el-input v-model="accountInfo.mobile" name="mobile" type="text" clearable placeholder="请输入联系手机号码"/>
      </el-col>
      <el-col :span="6" class="ipt-box">
        <label>账户昵称：</label>
        <el-input v-model="accountInfo.ninckname" name="ninckname" type="text" clearable placeholder="请输入账户昵称"/>
      </el-col>
      <el-col :span="6" class="ipt-box">
        <label>联系邮箱：</label>
        <el-input v-model="accountInfo.email" name="email" type="text" clearable placeholder="请输入联系邮箱"/>
      </el-col>
    </el-row>
    <el-row :gutter="15">
      <!-- <el-col :span="6" class="ipt-box">
        <label>所属省/市：</label>
        <el-col :span="12">
          <el-select v-model="value" placeholder="选择省份">
            <el-option
              v-for="item in options"
              :key="item.value"
              :label="item.label"
              :value="item.value"/>
          </el-select>
        </el-col>
        <el-col :span="12">
          <el-select v-model="value" placeholder="选择城市">
            <el-option
              v-for="item in options"
              :key="item.value"
              :label="item.label"
              :value="item.value"/>
          </el-select>
        </el-col>
      </el-col> -->
      <!-- <el-col :span="6" class="ipt-box">
        <label>详细地址：</label>
        <el-input v-model="accountInfo.username" name="username" type="text" clearable placeholder="请输入详细地址"/>
      </el-col> -->
      <!-- <el-col :span="6" class="ipt-box">
        <label>联系QQ：</label>
        <el-input v-model="accountInfo.username" name="username" type="text" clearable placeholder="请输入联系QQ"/>
      </el-col>
      <el-col :span="6" class="ipt-box">
        <label>联系微信：</label>
        <el-input v-model="accountInfo.username" name="username" type="text" clearable placeholder="请输入联系微信"/>
      </el-col> -->
    </el-row>
    <el-row :gutter="15">
      <el-col :span="6" class="ipt-box">
        <label>创建日期：</label>
        <el-input v-model="accountInfo.createTime" name="username" type="text" readonly/>
      </el-col>
      <!-- <el-col :span="6" class="ipt-box">
        <label>最后登录：</label>
        <el-input v-model="accountInfo.createTime" name="username" type="text" readonly/>
      </el-col> -->
    </el-row>
    <el-row :gutter="15">
      <h3 class="infotitle">状态信息</h3>
      <el-col :span="12" class="ipt-box">
        <label>用户类型：</label>
        <el-col>
          <el-radio v-model="accountInfo.userType" :label="1">运营人员</el-radio>
          <el-radio v-model="accountInfo.userType" :label="2">视频制作人员</el-radio>
          <el-radio v-model="accountInfo.userType" :label="3">视频压标人员</el-radio>
          <el-radio v-model="accountInfo.userType" :label="4">视频开通人员</el-radio>
        </el-col>
      </el-col>
      <el-col :span="12" class="ipt-box">
        <label>用户状态：</label>
        <el-col>
          <el-radio v-model="accountInfo.status" :label="0">禁用</el-radio>
          <el-radio v-model="accountInfo.status" :label="1">启用</el-radio>
        </el-col>
      </el-col>
    </el-row>
    <el-row :gutter="15">
      <el-col :span="12" class="ipt-box">
        <label style="width:200px;">赋予角色：</label>
        <el-col >
          <el-select v-model="optValue" placeholder="选择角色">
            <el-option
              v-for="item in rolesData"
              :key="item.roleId"
              :label="item.roleName"
              :value="item.roleId"/>
          </el-select>
        </el-col>
      </el-col>
      <el-col :span="8" class="ipt-box">
        <label>所属部门：</label>
        <el-input v-model="accountInfo.deptName" name="username" type="text" readonly/>
        <el-button type="primary" icon="el-icon-edit" circle @click="getDeptSelect"/>
      </el-col>
    </el-row>
    <el-row v-if="showDeptTree" style="border:1px solid #333;">
      <el-col :span="24">
        <el-tree
          ref="roleTree2"
          :data="mergeList"
          :props="defaultProps"
          node-key="deptId"
          accordion
          default-expand-all
          @node-click="checkTree"/>
      </el-col>
    </el-row>
    <el-row :gutter="15">
      <el-col :span="8" class="ipt-box">
        <label>账户密码：</label>
        <el-input v-model="accountInfo.password" name="username" type="text" clearable placeholder="请输入账户密码"/>
      </el-col>
    </el-row>
    <el-row :gutter="15">
      <el-col :span="24" class="ipt-box">
        <label>企业资质：</label>
        <el-input v-model="accountInfo.username" name="username" type="text" clearable placeholder="请输入详细地址"/>
      </el-col>
    </el-row>
    <el-row :gutter="15">
      <el-col :span="24" class="ipt-box">
        <label>信息安全承诺书：</label>
        <el-input v-model="accountInfo.username" name="username" type="text" clearable placeholder="请输入详细地址"/>
      </el-col>
    </el-row>
    <el-row type="flex" justify="end">
      <el-col :span="3">
        <el-button type="warning" @click="goRouteBack">返回</el-button>
        <el-button type="primary" @click="saveAccountInfo(accountInfo.userId)">保存</el-button>
      </el-col>
    </el-row>
  </div>
</template>
<script>
import {
  getAccountUserInfo,
  getAccountCheckUserName,
  getAccountSave,
  getAccountUpdate
} from '@/api/account'
import { getDeptSelect, getRoleList } from '@/api/sysadmin'
export default {
  data() {
    return {
      options: [{
        value: '选项1',
        label: '黄金糕'
      }, {
        value: '选项2',
        label: '双皮奶'
      }, {
        value: '选项3',
        label: '蚵仔煎'
      }, {
        value: '选项4',
        label: '龙须面'
      }, {
        value: '选项5',
        label: '北京烤鸭'
      }],
      optValue: -1,
      dialogVisible: false,
      defaultProps: {
        children: 'list',
        label: 'name'
      },
      userRadio: '运营账户',
      agentRadio: '代理账户',
      accountInfo: {},
      rolesData: [],
      mergeList: [],
      showDeptTree: false
    }
  },
  computed: {
  },
  created() {
    this.getRoleList()
    const userId = this.$route.params.userId
    console.log(userId)
    if (userId !== -11) {
      this.getEditInfo(userId)
      this.getDeptSelect()
    }
  },
  mounted() {
  },
  methods: {
    getEditInfo(userId) {
      getAccountUserInfo(userId).then(res => {
        if (res.code === 0) {
          const status = res.data.opreaState
          if (status) {
            const accountData = res.data.data
            this.accountInfo = accountData
            this.optValue = accountData.roleIdList[0]
          } else {
            this.$message.error(res.data.msg)
          }
        } else {
          this.$message.error(res.msg)
        }
        this.accountInfo = res.data.data
      })
    },
    getRoleList() {
      getRoleList().then(res => {
        this.rolesData = res.page.list
      })
    },
    getDeptSelect() {
      this.showDeptTree = !this.showDeptTree
      getDeptSelect().then(res => {
        const deptKeys = this.accountInfo.deptId
        console.log(deptKeys)
        this.mergeList = res.dept
        this.$refs.roleTree2.setCheckedKeys(deptKeys)
      })
    },
    blurVerify(username) {
      console.log('开始校验')
      getAccountCheckUserName(username).then(res => {

      })
    },
    checkTree(obj) {
      this.showDeptTree = !this.showDeptTree
      this.accountInfo.deptName = obj.name
      this.accountInfo.deptId = obj.deptId
    },
    goRouteBack() {
      this.$router.go(-1)
    },
    saveAccountInfo(userId) {
      if (userId === -11) {
        getAccountSave(this.accountInfo).then(res => {
          console.log(res)
        })
      } else {
        getAccountUpdate(this.accountInfo).then(res => {
          console.log(res)
        })
      }
    }
  }
}
</script>
<style lang="scss" scoped>
$primary-color:#409EFF;
$warning-color:#E6A23C;
$danger-color:#F56C6C;
$word-color:#606266;
$gray-color:#909399;

.el-row {
    margin-bottom: 20px;
    &:last-child {
      margin-bottom: 0;
    }
    .infotitle{
      color:#409EFF;
      padding: 12px 8px;
      border-bottom: 1px solid #409EFF;
    }
  .ipt-box{
    display: flex;
    label{
      width: 120px;
      font-size: 14px;
      color: $word-color;
      text-align:right;
      line-height: 40px;
    }
  }
  .el-col-dafine{
    line-height: 40px;
    font-size: 15px;
    font-weight: 700;
    .showhint{
      color: #909399;
      padding: 8px 20px;
      border-radius: 5px;
      border:1px solid #dcdfe6;
    }
}
.dptDialog{
  height: 500px;
}
  }
</style>
