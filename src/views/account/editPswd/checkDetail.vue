<template>
  <div>
    <el-row :gutter="15">
      <h3 class="infotitle">基本信息</h3>
      <el-col :span="6">
        <el-col :span="24" class="ipt-box">
          <label>公司名称：</label>
          <el-input v-model="accountInfo.company" name="company" type="text" clearable placeholder="请输入公司名称"/>
        </el-col>
      </el-col>
      <el-col :span="6" class="ipt-box">
        <label>企业法人：</label>
        <el-input v-model="accountInfo.enterpriseFaren" name="enterpriseFaren" type="text" clearable placeholder="请输入企业法人"/>
      </el-col>
      <el-col :span="6" class="ipt-box">
        <label>客户名称：</label>
        <el-input v-model="accountInfo.nickName" name="ninckname" type="text" clearable placeholder="请输入客户名称"/>
      </el-col>
      <el-col :span="6" class="ipt-box">
        <label>联系电话：</label>
        <el-input v-model="accountInfo.linkPhone" name="linkPhone" type="email" clearable placeholder="请输入联系电话"/>
      </el-col>
    </el-row>
    <el-row :gutter="15">
      <el-col :span="12" class="ipt-box">
        <label>申请类型：</label>
        <el-col>
          <el-radio v-model="accountInfo.applyType" :label="1">视频制作</el-radio>
          <el-radio v-model="accountInfo.applyType" :label="2">渠道合作</el-radio>
          <el-radio v-model="accountInfo.applyType" :label="3">政企合作</el-radio>
        </el-col>
      </el-col>
      <el-col :span="6" class="ipt-box">
        <label>创建日期：</label>
        <el-input v-model="accountInfo.createTime" name="createTime" type="text" readonly/>
      </el-col>
    </el-row>
    <el-row :gutter="15">
      <el-col :span="24" class="ipt-box">
        <label>备注：</label>
        <el-input v-model="accountInfo.bz" name="bz" type="textarea" clearable/>
      </el-col>
    </el-row>
    <el-row :gutter="15">
      <el-col :span="24" class="ipt-box">
        <label>企业资质：</label>
        <el-input v-model="accountInfo.enterpriseZhizi" name="enterpriseZhizi" type="text" clearable/>
      </el-col>
    </el-row>
    <el-row :gutter="15">
      <h3 class="infotitle">状态信息</h3>
      <el-col :span="12" class="ipt-box">
        <label>处理结果：</label>
        <el-col>
          <el-radio v-model="accountInfo.auditType" :label="0">未处理</el-radio>
          <el-radio v-model="accountInfo.auditType" :label="1">已处理</el-radio>
        </el-col>
      </el-col>
      <el-col v-if="accountInfo.auditType===1" :span="6" class="ipt-box">
        <label>处理日期：</label>
        <el-col>
          <el-input v-if="accountInfo.auditTime!=null" v-model="accountInfo.auditTime" name="auditTime" type="text" readonly/>
          <el-input v-model="hintMsg" else name="auditContent" type="text" readonly/>
        </el-col>
      </el-col>
    </el-row>
    <el-row :gutter="15">
      <el-col v-if="accountInfo.auditType===1" :span="24" class="ipt-box">
        <label style="width:200px;">处理意见：</label>
        <el-col >
          <el-input v-model="accountInfo.auditContent" name="auditContent" type="textarea"/>
        </el-col>
      </el-col>
    </el-row>
    <el-row type="flex" justify="end">
      <el-col :span="3">
        <el-button type="warning" @click="goRouteBack">返回</el-button>
        <el-button type="primary" @click="saveAccountInfo(accountInfo.id,accountInfo.auditType,accountInfo.auditContent)">保存</el-button>
      </el-col>
    </el-row>
  </div>
</template>
<script>
import {
  getMsgcheckListInfo,
  getMsgcheckListAudit
} from '@/api/operation'
export default {
  data() {
    return {
      accountInfo: {},
      hintMsg: '此处不用填写'
    }
  },
  computed: {
    visitedViews() {
      return this.$store.state.tagsView.visitedViews
    }
  },
  created() {
    const userId = this.$route.params.userId
    this.accountInfo.id = userId
    if (userId !== null) {
      this.getEditInfo(userId)
    }
  },
  mounted() {
  },
  methods: {
    getEditInfo(userId) {
      getMsgcheckListInfo(userId).then(res => {
        if (res.code === 0) {
          const status = res.data.opreaState
          if (status) {
            const accountData = res.data.data
            this.accountInfo = accountData
          } else {
            this.$message.error(res.data.msg)
          }
        } else {
          this.$message.error(res.msg)
        }
        this.accountInfo = res.data.data
      })
    },
    goRouteBack() {
      const visitedViews = this.$store.state.tagsView.visitedViews
      const view = visitedViews.filter(item => item.path === this.$route.path)
      this.$store.dispatch('delView', view[0]).then(({ visitedViews }) => {
        const latestView = visitedViews.slice(-1)[0]
        if (latestView) {
          this.$router.push(latestView)
        } else {
          this.$router.push('/')
        }
        this.$router.go(-1)
      })
    },
    saveAccountInfo(id, type, data) {
      getMsgcheckListAudit(id, type, data).then(res => {

      })
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
    p{
      color: $danger-color;
      text-align:right;
      font-size: 12px;
      margin:3px 0;
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
