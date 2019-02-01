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
              prop="menuId"
              label="菜单ID"
              width="50"/>
            <el-table-column
              prop="name"
              label="菜单名称"
              width="120"/>
            <el-table-column
              prop="perms"
              label="上级菜单"
              width="120"/>
            <el-table-column
              prop="icon"
              label="图标"
              width="120"/>
            <el-table-column
              prop="type"
              label="类型"
              width="300"/>
            <el-table-column
              prop="menuSort"
              label="排序号"
              width="120"/>
            <el-table-column
              prop="url"
              label="菜单URL"
              width="250"/>
            <el-table-column
              prop="menuSign"
              label="授权标识"
              width="100"/>
          </el-table>
        </el-col>
      </el-row>
    </div>
    <el-dialog :visible.sync="menuDialog" title="菜单操作" width="40%">
      <dia-log :dia-data="diaTitle" @dialogChild="dialogData"/>
    </el-dialog>
  </div>
</template>
<script>
import { getMenuList } from '@/api/sysadmin'
import searchBar from '@/components/search/index'
import diaLog from './dialog'
export default {
  components: {
    searchBar,
    diaLog
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
    this.getMenuList()
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
    getMenuList() {
      getMenuList().then(res => {
        const listData = res.menuList
        this.tableData = listData
        console.log(res)
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

