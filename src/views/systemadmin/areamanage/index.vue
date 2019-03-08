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
                <el-radio :label="scope.row.areaname" v-model="roleRadio" @change.native="getParentRow(scope.row.areacode)"> &nbsp; </el-radio>
              </template>
            </el-table-column>
            <el-table-column
              prop="areacode"
              label="地区代码"/>
            <el-table-column
              prop="areaname"
              label="地区名称"/>
            <el-table-column
              prop="parentcode"
              label="父级代码"/>
            <el-table-column
              prop="py"
              label="英文名称"/>
            <el-table-column
              prop="unicomcode"
              label="unicomcode"/>
            <el-table-column
              prop="unicomid"
              label="unicomid"/>
            <el-table-column
              prop="levelid"
              label="levelid"/>
            <el-table-column
              prop="orderid"
              label="orderid"/>
            <el-table-column
              prop="status"
              label="status"/>
            <el-table-column
              prop="createdate"
              label="创作时间"/>
          </el-table>
        </el-col>
      </el-row>
      <el-row type="flex" justify="end">
        <el-col :span="9">
          <pagi-tabs :curr-page="currPage" :page-size="pageSize" :total-count="totalCount" :total-page="totalPage" @pageChild="pageChildFn"/>
        </el-col>
      </el-row>
    </div>
    <!-- <el-dialog :visible.sync="menuDialog" title="参数管理" width="50%">
      <dia-log :dia-data="diaTitle" :role-info="roleInfo" @dialogChild="dialogData"/>
    </el-dialog> -->
  </div>
</template>
<script>
import { getAreamsgList, saveParmasInfo, updateParmasInfo, delParmasInfo, getParmasInfo } from '@/api/sysadmin'
import searchBar from '@/components/search/index'
import pagiTabs from '@/components/pagination/index'
// import diaLog from './dialog'
export default {
  components: {
    searchBar,
    // diaLog,
    pagiTabs
  },
  data() {
    return {
      isDate: false,
      isSearch: false,
      isBtn: false,
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
    btnSubmitData() {},
    dialogData(upOrsave, params) {
      if (upOrsave === 0) {
        console.log('新增保存')
        saveParmasInfo(params).then(res => {
          this.$message.success('保存成功')
          this.getRoleList()
        })
      } else if (upOrsave === 1) {
        console.log('更新保存')
        updateParmasInfo(params).then(res => {
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
        pageSize: this.pageSize,
        currPage: this.currPage
      }
      getAreamsgList(params).then(res => {
        if (res.code === 0) {
          const status = res.data.opreaState
          if (status) {
            const pageData = res.data.data
            this.currPage = pageData.currPage
            this.pageSize = pageData.pageSize
            this.totalCount = pageData.totalCount
            this.totalPage = pageData.totalPage
            this.roleData = pageData.list
          } else {
            this.$message.error(res.data.msg)
          }
        } else {
          this.$message.error(res.msg)
        }
      })
    },
    getRoleInfo(roleId) {
      getParmasInfo(roleId).then(res => {
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
        delParmasInfo(roleId).then(res => {
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

