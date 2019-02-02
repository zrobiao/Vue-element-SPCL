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
            :data="tableData"
            border
            stripe
            style="width: 100%">
            <el-table-column
              type="selection"
              width="55"/>
            <el-table-column
              fixed
              prop="deptId"
              label="菜单ID"
              width="50"/>
            <el-table-column
              prop="deptName"
              label="菜单名称"
              width="120"/>
            <el-table-column
              prop="roleId"
              label="角色Id"
              width="50"/>
            <el-table-column
              prop="roleName"
              label="角色名称"
              width="200"/>
            <el-table-column
              prop="remark"
              label="角色来源"
              width="220"/>
            <el-table-column
              prop="createTime"
              label="创建时间"
              width="320"/>
          </el-table>
        </el-col>
      </el-row>
      <el-row type="flex" justify="end">
        <el-col :span="9">
          <pagi-tabs/>
        </el-col>
      </el-row>
    </div>
    <el-dialog :visible.sync="menuDialog" title="菜单操作" width="40%">
      <dia-log :dia-data="diaTitle" @dialogChild="dialogData"/>
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
      upData: '父组件传过去的数据',
      menuDialog: false,
      diaTitle: '',
      tableData: []
    }
  },
  created() {
    this.getRoleList()
  },
  methods: {
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
        const listData = res.page.list
        this.tableData = listData
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

