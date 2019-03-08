<template>
  <div class="big-container">
    <search-bar
      :show-search="isSearch"
      :show-date="isDate"
      :show-btn="isBtn"
      :send-parent="preParent"
      :pre-options="preOptions"
      :send-data="upData"
      @listenSearch="searchSubData"
      @listenBtn="btnSubmitData"/>
    <div class="show-container">
      <el-row>
        <el-col :span="24">
          <el-table
            :data="roleData"
            stripe
            style="width: 100%">
            <el-table-column label="选择" width="65">
              <template slot-scope="scope">
                <el-radio :label="scope.row.roleName" v-model="roleRadio" @change.native="getParentRow(scope.row.roleId)"> &nbsp; </el-radio>
              </template>
            </el-table-column>
            <el-table-column
              prop="roleId"
              label="角色Id"/>
            <el-table-column
              prop="roleName"
              label="角色名称"/>
            <el-table-column
              prop="deptName"
              label="所属部门"/>
            <el-table-column
              prop="remark"
              label="来源"/>
            <el-table-column
              prop="createTime"
              label="创建时间"/>
          </el-table>
        </el-col>
      </el-row>
      <el-row type="flex" justify="end">
        <el-col :span="9">
          <pagi-tabs :curr-page="currPage" :page-size="pageSize" :total-count="totalCount" :total-page="totalPage"/>
        </el-col>
      </el-row>
    </div>
    <el-dialog :visible.sync="menuDialog" title="角色操作" width="90%">
      <dia-log :dia-data="diaTitle" :role-info="roleInfo" @dialogChild="dialogData"/>
    </el-dialog>
  </div>
</template>
<script>
import { getRoleList, getRoleInfo, delRoleInfo, saveRoleInfo, updataRoleInfo } from '@/api/sysadmin'
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
      preOptions: [],
      menuDialog: false,
      diaTitle: '',
      roleData: [],
      roleRadio: '角色选择',
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
    searchSubData() {},
    btnSubmitData(titName, data) {
      this.diaTitle = titName
      if (titName === '新增') {
        this.roleInfo = {}
      } else if (titName === '修改') {
        this.getRoleInfo(data)
      } else {
        this.menuDialog = false
        this.delRoleInfo(data)
      }
      this.menuDialog = true
    },
    dialogData(upOrsave, params) {
      if (upOrsave === 0) {
        console.log('新增保存')
        saveRoleInfo(params).then(res => {
          this.$message.success('保存成功')
          this.getRoleList()
        })
      } else if (upOrsave === 1) {
        console.log('更新保存')
        updataRoleInfo(params).then(res => {
          this.$message.success('更新成功')
          this.getRoleList()
        })
      }
      this.menuDialog = !this.menuDialog
    },
    getRoleList() {
      // const params = 'admin'
      getRoleList().then(res => {
        const pageData = res.page
        const listData = res.page.list
        this.roleData = listData
        this.currPage = pageData.currPage
        this.pageSize = pageData.pageSize
        this.totalCount = pageData.totalCount
        this.totalPage = pageData.totalPage
      })
    },
    getRoleInfo(roleId) {
      getRoleInfo(roleId).then(res => {
        this.roleInfo = res.role
      })
    },
    delRoleInfo(roleId) {
      // const _this = this
      this.$confirm('此操作将永久删除, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        delRoleInfo(roleId).then(res => {
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

