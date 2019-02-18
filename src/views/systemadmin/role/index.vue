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
    <el-dialog :visible.sync="menuDialog" title="菜单操作" width="50%">
      <dia-log :dia-data="diaTitle" :menu-info="menuInfo" @dialogChild="dialogData"/>
    </el-dialog>
  </div>
</template>
<script>
import { getRoleList } from '@/api/sysadmin'
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
      isSearch: true,
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
      menuInfo: {}
    }
  },
  created() {
    this.getRoleList()
  },
  methods: {
    getParentRow(menuId) {
      this.upData = menuId
    },
    chindData(data) {
      this.menuDialog = true
      this.diaTitle = data
    },
    dialogData(val) {
      this.menuDialog = !this.menuDialog
      console.log(val)
    },
    getRoleList() {
      const params = 'admin'
      getRoleList(params).then(res => {
        console.log(res)
        const pageData = res.page
        const listData = res.page.list
        this.roleData = listData
        this.currPage = pageData.currPage
        this.pageSize = pageData.pageSize
        this.totalCount = pageData.totalCount
        this.totalPage = pageData.totalPage
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

