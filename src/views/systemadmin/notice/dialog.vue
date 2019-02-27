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
        角色名称：
      </el-col>
      <el-col :span="10">
        <el-input v-model="roleInfo.roleName" type="text" placeholder="请输入角色名称"/>
      </el-col>
    </el-row>
    <el-row>
      <el-col :span="4" class="el-col-dafine">
        所属部门：
      </el-col>
      <el-col :span="8">
        <el-input v-model="roleInfo.deptName" :disabled="true" type="text" placeholder="部门名称"/>
      </el-col>
      <el-col :span="2" class="el-col-dafine">
        <el-button type="primary" size="mini" icon="el-icon-edit" @click="openMenu"/>
      </el-col>
    </el-row>
    <el-row v-show="openTree">
      <el-col :span="24">
        <el-tree
          ref="roleTree1"
          :data="mergeList"
          :props="defaultProps"
          node-key="deptId"
          accordion
          @node-click="checkTree"/>
      </el-col>
    </el-row>
    <el-row>
      <el-col :span="4" class="el-col-dafine">
        备注：
      </el-col>
      <el-col :span="10">
        <el-input v-model="roleInfo.remark" type="text" placeholder="请输入备注信息"/>
      </el-col>
    </el-row>
    <el-row>
      <el-col :span="12">
        <el-tree
          ref="menuTree"
          :data="menuDataList"
          :props="menuProps"
          node-key="menuId"
          show-checkbox
          default-expand-all/>
      </el-col>
      <el-col :span="12">
        <el-tree
          ref="roleTree2"
          :data="mergeList"
          :props="defaultProps"
          node-key="deptId"
          show-checkbox
          default-expand-all/>
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
import { getDeptSelect, getMenuList } from '@/api/sysadmin'
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
        roleName: '',
        remark: '',
        deptId: Number,
        menuIdList: [],
        deptIdList: []

      }
    }
  },
  created() {},
  mounted() {
    this.menuDataShow()
  },
  methods: {
    menuDataShow() {
      getMenuList().then(res => {
        const menuKeys = this.roleInfo.menuIdList
        console.log(menuKeys)
        this.menuDataList = res.menuList
        this.$refs.menuTree.setCheckedKeys(menuKeys)
      })
      getDeptSelect().then(res => {
        const deptKeys = this.roleInfo.deptIdList
        console.log(deptKeys)
        this.mergeList = res.dept
        this.$refs.roleTree2.setCheckedKeys(deptKeys)
      })
    },
    openMenu() {
      this.openTree = true
    },
    checkTree(obj) {
      this.openTree = false
      this.roleInfo.deptName = obj.name
      this.saveData.deptId = obj.deptId
    },
    closeDialog() {
      this.openTree = false
      this.$emit('dialogChild')
    },
    sureDialog() {
      if (!this.saveData.deptId) {
        return this.$message.error('所属部门不能为空！')
      }
      this.saveData.menuIdList = this.$refs.menuTree.getCheckedKeys()
      this.saveData.deptIdList = this.$refs.roleTree2.getCheckedKeys()
      this.saveData.roleName = this.roleInfo.roleName
      this.saveData.remark = this.roleInfo.remark
      console.log(this.roleInfo)
      console.log(this.saveData)
      if (this.diaData === '新增') {
        this.$emit('dialogChild', 0, this.saveData)
      } else if (this.diaData === '修改') {
        this.$emit('dialogChild', 1, this.saveData)
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
