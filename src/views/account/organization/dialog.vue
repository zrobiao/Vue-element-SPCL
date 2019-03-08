<template>
  <div>
    <el-row>
      <el-col :span="24" class="dia-Title">
        <p v-if="diaData == '新增'" class="dia-title-add">{{ diaData }}</p>
        <p v-if="diaData == '修改'" class="dia-title-edit">{{ diaData }}</p>
      </el-col>
    </el-row>
    <el-row>
      <el-col :span="4" class="el-col-dafine">
        部门名称：
      </el-col>
      <el-col :span="10">
        <el-input v-model="roleInfo.name" type="text" placeholder="请输入参数名"/>
      </el-col>
    </el-row>
    <el-row>
      <el-col :span="4" class="el-col-dafine">
        所属部门：
      </el-col>
      <el-col :span="8">
        <el-input v-model="roleInfo.parentName" :disabled="true" type="text" placeholder="部门名称"/>
      </el-col>
      <el-col :span="2" class="el-col-dafine">
        <el-button type="primary" size="mini" icon="el-icon-edit" @click="openMenu"/>
      </el-col>
    </el-row>
    <el-row v-show="openTree">
      <el-col :span="24">
        <el-tree
          ref="roleTree"
          :data="mergeList"
          :props="defaultProps"
          node-key="deptId"
          accordion
          @node-click="checkTree"/>
      </el-col>
    </el-row>
    <el-row>
      <el-col :span="4" class="el-col-dafine">
        排序号：
      </el-col>
      <el-col :span="10">
        <el-input v-model="roleInfo.orderNum" type="number" placeholder="请输入备注信息"/>
      </el-col>
    </el-row>
    <el-row>
      <el-col :span="6" :offset="6" class="el-col-dafine">
        <el-button type="warning" @click="closeDialog">返回</el-button>
      </el-col>
      <el-col :span="6" class="el-col-dafine">
        <el-button type="primary" @click="sureDialog">确认</el-button>
      </el-col>
    </el-row>
  </div>
</template>
<script>
import { getDeptSelect } from '@/api/sysadmin'
export default {
  props: {
    diaData: {
      type: String,
      default: ''
    },
    roleInfo: {
      type: Object,
      default: () => {}
    }
  },
  data() {
    return {
      menuName: '',
      openTree: false,
      mergeList: [],
      menuDataList: [],
      defaultProps: {
        children: 'list',
        label: 'name'
      },
      menuProps: {
        children: 'list',
        label: 'name'
      },
      saveData: {
        id: Number,
        paramKey: '',
        remark: '',
        paramValue: ''
      }
    }
  },
  created() {},
  mounted() {},
  methods: {
    menuDataShow() {
      getDeptSelect().then(res => {
        const deptKeys = this.roleInfo.deptIdList
        console.log(deptKeys)
        this.mergeList = res.dept
        this.$refs.roleTree.setCheckedKeys(deptKeys)
      })
    },
    openMenu() {
      this.openTree = true
      this.menuDataShow()
    },
    checkTree(obj) {
      console.log(obj)
      this.openTree = false
      this.roleInfo.parentName = obj.name
      this.roleInfo.parentId = obj.parentId
    },
    closeDialog() {
      this.openTree = false
      this.$emit('dialogChild')
    },
    sureDialog() {
      if (!this.roleInfo.name) {
        return this.$message.error('所属参数名不能为空！')
      }
      console.log(this.roleInfo)
      if (this.diaData === '新增') {
        this.$emit('dialogChild', 0, this.roleInfo)
      } else if (this.diaData === '修改') {
        this.$emit('dialogChild', 1, this.roleInfo)
      }
      this.openTree = false
    }
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
  }
.dia-Title{
  p{
    padding:0 0 12px;
  text-align: center;
  font-size:16px;
  margin-top:-20px;
  }
  .dia-title-add{
  color:$primary-color;
  border-bottom:1px solid $primary-color;
  }
  .dia-title-edit{
  color:$warning-color;
  border-bottom:1px solid $warning-color;
  }
  .dia-title-remove{
  color:$danger-color;
  border-bottom:1px solid $danger-color;
  }
  }
  .el-col-dafine{
    text-align: right;
    line-height: 40px;
    font-size: 15px;
    font-weight: 700;
    padding-right: 20px;
  }
</style>
