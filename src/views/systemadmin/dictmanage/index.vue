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
                <el-radio :label="scope.row.code" v-model="roleRadio" @change.native="getParentRow(scope.row.id)"> &nbsp; </el-radio>
              </template>
            </el-table-column>
            <el-table-column
              prop="name"
              label="字典名称"/>
            <el-table-column
              prop="type"
              label="字典类型"/>
            <el-table-column
              prop="code"
              label="字典码"/>
            <el-table-column
              prop="value"
              label="字典值"/>
            <el-table-column
              prop="orderNum"
              label="排序"/>
            <el-table-column
              prop="remark"
              label="备注"/>
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
import { getDictList, saveDictInfo, updateDictInfo, delDictInfo, getDictInfo } from '@/api/sysadmin'
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
      totalCount: 0,
      totalPage: 0,
      roleInfo: {},
      query: { name: null }
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
        saveDictInfo(params).then(res => {
          this.$message.success('保存成功')
          this.getRoleList()
        })
      } else if (upOrsave === 1) {
        console.log('更新保存')
        updateDictInfo(params).then(res => {
          this.$message.success('更新成功')
          this.getRoleList()
        })
      }
      this.menuDialog = !this.menuDialog
    },
    getRoleList() {
      const params = {
        pageSize: this.pageSize,
        currPage: this.currPage,
        query: this.query.name
      }
      getDictList(params).then(res => {
        if (res.code === 0) {
          const status = res.data.opreaState
          if (status) {
            const resData = res.data.data
            this.currPage = resData.currPage
            this.pageSize = resData.pageSize
            this.totalCount = resData.totalCount
            this.totalPage = resData.totalPage
            this.roleData = resData.list
            this.query.name = null
          } else {
            this.$message.error(res.data.msg)
          }
        } else {
          this.$message.error(res.msg)
        }
      })
    },
    getRoleInfo(roleId) {
      getDictInfo(roleId).then(res => {
        this.roleInfo = res.sysDict
      })
    },
    delRoleInfo(roleId) {
      // const _this = this
      this.$confirm('此操作将永久删除, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        delDictInfo(roleId).then(res => {
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

