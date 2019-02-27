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
                <el-radio :label="scope.row.id" v-model="roleRadio" @change.native="getParentRow(scope.row.id)"> &nbsp; </el-radio>
              </template>
            </el-table-column>
            <el-table-column
              prop="id"
              label="id"/>
            <el-table-column
              prop="phoneIndexstr"
              label="phoneIndexstr"/>
            <el-table-column
              prop="phoneMiddlepart"
              label="phoneMiddlepart"/>
            <el-table-column
              prop="phoneProvicecode"
              label="phoneProvicecode"/>
            <el-table-column
              prop="phoneProname"
              label="phoneProname"/>
            <el-table-column
              prop="phoneCityname"
              label="phoneCityname"/>
            <el-table-column
              prop="phonePhonetype"
              label="phonePhonetype"/>
            <el-table-column
              prop="phoneTypename"
              label="phoneTypename"/>
            <el-table-column
              prop="phoneInintdate"
              label="phoneInintdate"/>
            <el-table-column
              prop="phoneIssupport"
              label="phoneIssupport"/>
          </el-table>
        </el-col>
      </el-row>
      <el-row type="flex" justify="end">
        <el-col :span="9">
          <pagi-tabs :curr-page="currPage" :page-size="pageSize" :total-count="totalCount" :total-page="totalPage" @pageChild="pageChildFn"/>
        </el-col>
      </el-row>
    </div>
    <el-dialog :visible.sync="menuDialog" title="参数管理" width="50%">
      <dia-log :dia-data="diaTitle" :role-info="roleInfo" @dialogChild="dialogData"/>
    </el-dialog>
  </div>
</template>
<script>
import { getNoticeList, saveNoticeInfo, updateNoticeInfo, delNoticeInfo, getNoticeInfo } from '@/api/sysadmin'
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
        saveNoticeInfo(params).then(res => {
          this.$message.success('保存成功')
          this.getRoleList()
        })
      } else if (upOrsave === 1) {
        console.log('更新保存')
        updateNoticeInfo(params).then(res => {
          this.$message.success('更新成功')
          this.getRoleList()
        })
      }
      this.menuDialog = !this.menuDialog
    },
    pageChildFn(currentPage) {
      console.log(currentPage)
      this.currPage = currentPage
      this.getRoleList()
    },
    getRoleList() {
      const params = {
        limit: this.pageSize,
        page: this.currPage
      }
      console.log(params)
      getNoticeList(params).then(res => {
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
      getNoticeInfo(roleId).then(res => {
        this.roleInfo = res.config
      })
    },
    delRoleInfo(roleId) {
      // const _this = this
      this.$confirm('此操作将永久删除, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        delNoticeInfo(roleId).then(res => {
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

