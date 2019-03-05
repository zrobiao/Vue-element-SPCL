<template>
  <div>
    <el-row :gutter="15">
      <h3 class="infotitle">其它信息</h3>
      <el-col :span="6" class="el-col-dafine">
        <span>企业名称</span>&nbsp;&nbsp;&nbsp;<span class="showhint">这里显示的时一段信息</span>
      </el-col>
      <el-col :span="6" class="el-col-dafine">
        <span>联系人</span>&nbsp;&nbsp;&nbsp;<span class="showhint">这里显示的时一段信息</span>
      </el-col>
      <el-col :span="6" class="el-col-dafine">
        <span>联系电话</span>&nbsp;&nbsp;&nbsp;<span class="showhint">这里显示的时一段信息</span>
      </el-col>
      <el-col :span="6" class="el-col-dafine">
        <span>联系电话归属省份</span>&nbsp;&nbsp;&nbsp;<span class="showhint">这里显示的时一段信息</span>
      </el-col>
    </el-row>
    <el-row>
      <el-col :span="6" class="el-col-dafine">
        <span>联系电话归属城市</span>&nbsp;&nbsp;&nbsp;<span class="showhint">这里显示的时一段信息</span>
      </el-col>
      <el-col :span="6" class="el-col-dafine">
        <span>联系QQ或微信</span>&nbsp;&nbsp;&nbsp;<span class="showhint">这里显示的时一段信息</span>
      </el-col>
      <el-col :span="6" class="el-col-dafine">
        <span>是否压标</span>&nbsp;&nbsp;&nbsp;<span class="showhint">这里显示的时一段信息</span>
      </el-col>
    </el-row>
    <el-row :gutter="15">
      <el-col :span="6" class="el-col-dafine">
        <span>特需说明</span>&nbsp;&nbsp;&nbsp;
        <p class="showhint">这里显示的时一段信息</p>
      </el-col>
    </el-row>
    <el-row :gutter="15">
      <h3 class="infotitle">订单信息</h3>
      <el-col :span="6" class="el-col-dafine">
        <span>视频订单号</span>&nbsp;&nbsp;&nbsp;<span class="showhint">这里显示的时一段信息</span>
      </el-col>
      <el-col :span="6" class="el-col-dafine">
        <span>订单创建日期</span>&nbsp;&nbsp;&nbsp;<span class="showhint">这里显示的时一段信息</span>
      </el-col>
      <el-col :span="6" class="el-col-dafine">
        <span>订单制作完成人</span>&nbsp;&nbsp;&nbsp;<span class="showhint">这里显示的时一段信息</span>
      </el-col>
      <el-col :span="6" class="el-col-dafine">
        <span>订单压标完成日期</span>&nbsp;&nbsp;&nbsp;<span class="showhint">这里显示的时一段信息</span>
      </el-col>
    </el-row>
    <el-row :gutter="15">
      <el-col :span="6" class="el-col-dafine">
        <span>订单压标完成人</span>&nbsp;&nbsp;&nbsp;<span class="showhint">这里显示的时一段信息</span>
      </el-col>
      <el-col :span="6" class="el-col-dafine">
        <span>订单开通完成日期</span>&nbsp;&nbsp;&nbsp;<span class="showhint">这里显示的时一段信息</span>
      </el-col>
      <el-col :span="6" class="el-col-dafine">
        <span>订单开通完成人</span>&nbsp;&nbsp;&nbsp;<span class="showhint">这里显示的时一段信息</span>
      </el-col>
      <el-col :span="3" class="el-col-dafine">
        <span>视频订单状态</span>&nbsp;&nbsp;&nbsp;<span class="showhint">1</span>
      </el-col>
      <el-col :span="3" class="el-col-dafine">
        <span>订单开通类型</span>&nbsp;&nbsp;&nbsp;<span class="showhint">2</span>
      </el-col>
    </el-row>
    <el-row :gutter="15">
      <el-col :span="6" class="el-col-dafine">
        <span>操作备注</span>&nbsp;&nbsp;&nbsp;
        <p class="showhint">这里显示的时一段信息</p>
      </el-col>
    </el-row>
    <!-- <el-row>
      <el-col :span="6" :offset="6" class="el-col-dafine">
        <el-button type="warning" @click="closeDialog">返回</el-button>
      </el-col>
      <el-col :span="6" class="el-col-dafine">
        <el-button type="primary" @click="sureDialog">确认</el-button>
      </el-col>
    </el-row> -->
  </div>
</template>
<script>
export default {
  props: {
    diaData: {
      type: String,
      default: ''
    },
    diaInfo: {
      type: Object,
      default: () => { '信息字段' }
    }
  },
  data() {
    return {
      menuName: ''
    }
  },
  created() {},
  mounted() {
  },
  methods: {
    // closeDialog() {
    //   this.openTree = false
    //   this.$emit('dialogChild')
    // },
    // sureDialog() {
    //   if (!this.saveData.deptId) {
    //     return this.$message.error('所属部门不能为空！')
    //   }
    //   this.saveData.menuIdList = this.$refs.menuTree.getCheckedKeys()
    //   this.saveData.deptIdList = this.$refs.roleTree2.getCheckedKeys()
    //   this.saveData.roleName = this.roleInfo.roleName
    //   this.saveData.remark = this.roleInfo.remark
    //   console.log(this.roleInfo)
    //   console.log(this.saveData)
    //   if (this.diaData === '新增') {
    //     this.$emit('dialogChild', 0, this.saveData)
    //   } else if (this.diaData === '修改') {
    //     this.$emit('dialogChild', 1, this.saveData)
    //   }
    //   this.openTree = false
    // }
  }
}
</script>
<style lang="scss" scoped>
$primary-color:#409EFF;
$warning-color:#E6A23C;
$danger-color:#F56C6C;
$gray-color:#909399;

.el-row {
    margin-bottom: 20px;
    &:last-child {
      margin-bottom: 0;
    }
    .infotitle{
      color:#F56C6C;
      padding: 12px 0;
      border-bottom: 1px solid #409EFF;
    }
  }
  .el-col-dafine{
    line-height: 40px;
    font-size: 15px;
    font-weight: 700;
    .showhint{
      padding: 8px 20px;
      border-radius: 5px;
      border:1px solid #dcdfe6;
    }
  }
</style>
