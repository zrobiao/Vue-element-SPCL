<template>
  <div class="big-container">
    <search-bar
      :show-search="isSearch"
      :show-date="isDate"
      :show-btn="isBtn"
      :send-parent="preParent"
      :send-data="upData"
      @listenUp="chindData"/>
    <div class="show-container">
      <el-row>
        <el-col :span="24">
          <el-table
            :data="roleData"
            stripe
            style="width: 100%">
            <el-table-column label="选择" width="65">
              <template slot-scope="scope">
                <el-radio :label="scope.row.name" v-model="parentMenuRadio" @change.native="getParentRow(scope.row.deptId)"> &nbsp; </el-radio>
              </template>
            </el-table-column>
            <el-table-column
              prop="deptId"
              label="部门ID"/>
            <el-table-column type="expand">
              <template slot-scope="childList">
                <el-table
                  ref="childMenu"
                  :data="childList.row.list"
                  style="width:100%">
                  <el-table-column label="选择" width="65">
                    <template slot-scope="scope">
                      <el-radio :label="scope.row.name" v-model="parentMenuRadio" @change.native="getParentRow(scope.row.deptId)">&nbsp;</el-radio>
                    </template>
                  </el-table-column>
                  <el-table-column
                    prop="deptId"
                    label="部门ID"/>
                  <el-table-column type="expand">
                    <template slot-scope="childList">
                      <el-table
                        ref="childMenu"
                        :data="childList.row.list"
                        style="width:100%">
                        <el-table-column label="选择" width="65" >
                          <template slot-scope="scope">
                            <el-radio :label="scope.row.name" v-model="parentMenuRadio" @change.native="getParentRow(scope.row.deptId)">&nbsp;</el-radio>
                          </template>
                        </el-table-column>
                        <el-table-column
                          prop="deptId"
                          label="部门ID"/>
                        <el-table-column
                          prop="name"
                          label="部门名称"/>
                        <el-table-column
                          prop="parentName"
                          label="上级部门"/>
                        <el-table-column
                          prop="orderNum"
                          label="排序号"/>
                      </el-table>
                    </template>
                  </el-table-column>
                  <el-table-column
                    prop="name"
                    label="部门名称"/>
                  <el-table-column
                    prop="parentName"
                    label="上级部门"/>
                  <el-table-column
                    prop="orderNum"
                    label="排序号"/>
                </el-table>
              </template>
            </el-table-column>
            <el-table-column
              prop="name"
              label="部门名称"/>
            <el-table-column
              prop="parentName"
              label="上级部门"/>
            <el-table-column
              prop="orderNum"
              label="排序号"/>
          </el-table>
        </el-col>
      </el-row>
      <el-row type="flex" justify="end">
        <el-col :span="9">
          <pagi-tabs :curr-page="currPage" :page-size="pageSize" :total-count="totalCount" :total-page="totalPage"/>
        </el-col>
      </el-row>
    </div>
    <el-dialog :visible.sync="menuDialog" title="参数管理" width="50%">
      <dia-log :dia-data="diaTitle" :role-info="roleInfo" @dialogChild="dialogData"/>
    </el-dialog>
  </div>
</template>
<script>
import { getDeptSelect, delDeptInfo, saveDeptInfo, updataDeptInfo, getDeptInfo } from '@/api/sysadmin'
import searchBar from '@/components/search/index'
import pagiTabs from '@/components/pagination/index'
import diaLog from './dialog'
export default {
  components: {
    searchBar,
    diaLog,
    pagiTabs
  },
  data() {
    return {
      msg: '这里是显示的模块！',
      isDate: false,
      isSearch: false,
      isBtn: true,
      preParent: 'menu',
      upData: 0,
      menuDialog: false,
      diaTitle: '',
      roleData: [],
      parentMenuRadio: '角色选择',
      currPage: 1,
      pageSize: 10,
      totalCount: 5,
      totalPage: 1,
      roleInfo: {}
    }
  },
  created() {
    this.getRoleList()
  },
  methods: {
    getParentRow(menuId) {
      this.upData = menuId
    },
    chindData(titName, data) {
      this.diaTitle = titName
      this.menuDialog = true
      if (titName === '新增') {
        this.roleInfo = {}
      } else if (titName === '修改') {
        this.getRoleInfo(data)
      } else {
        this.delRoleInfo(data)
        this.menuDialog = false
      }
    },
    dialogData(upOrsave, params) {
      if (upOrsave === 0) {
        console.log('新增保存')
        saveDeptInfo(params).then(res => {
          this.$message.success('保存成功')
          this.getRoleList()
        })
      } else if (upOrsave === 1) {
        console.log('更新保存')
        updataDeptInfo(params).then(res => {
          this.$message.success('更新成功')
          this.getRoleList()
        })
      }
      this.menuDialog = !this.menuDialog
    },
    getRoleList() {
      // const params = 'admin'
      getDeptSelect().then(res => {
        const pageData = res.dept
        this.roleData = pageData
      })
    },
    getRoleInfo(roleId) {
      getDeptInfo(roleId).then(res => {
        this.roleInfo = res.dept
      })
    },
    delRoleInfo(roleId) {
      // const _this = this
      this.$confirm('此操作将永久删除, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        delDeptInfo(roleId).then(res => {
          this.$message({
            type: 'success',
            message: '删除成功!'
          })
          this.getRoleList()
        })
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消删除'
        })
      })
    }
  }
}
</script>
<style lang="scss" scoped>
.show-container{
    margin-top:15px;
  }
</style>

