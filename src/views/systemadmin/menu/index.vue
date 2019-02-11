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
            stripe
            style="width: 100%">
            <el-table-column
              type="selection"/>
            <el-table-column type="expand">
              <template slot-scope="childList">
                <el-table
                  :data="childList.row.list"
                  border
                  style="width:100%">
                  <el-table-column
                    type="selection"/>
                  <el-table-column
                    prop="menuId"
                    label="菜单ID"/>
                  <el-table-column
                    prop="name"
                    label="菜单名称"/>
                  <el-table-column
                    prop="parentName"
                    label="上级菜单"/>
                  <el-table-column
                    prop="type"
                    label="类型">
                    <template slot-scope="scope">
                      <el-tag v-show="scope.row.type ===0" type="primary" disable-transitions>菜单</el-tag>
                      <el-tag v-show="scope.row.type ===1" type="success" disable-transitions>目录</el-tag>
                      <el-tag v-show="scope.row.type ===2" type="warning" disable-transitions>按钮</el-tag>
                    </template>
                  </el-table-column>
                  <el-table-column
                    prop="orderNum"
                    label="排序号"/>
                  <el-table-column
                    prop="url"
                    label="菜单URL"/>
                  <el-table-column
                    prop="perms"
                    label="授权标识"/>
                </el-table>
              </template>
            </el-table-column>
            <el-table-column
              fixed
              prop="menuId"
              label="菜单ID"/>
            <el-table-column
              prop="name"
              label="菜单名称"/>
            <el-table-column
              prop="parentName"
              label="上级菜单"/>
            <el-table-column
              prop="type"
              label="类型">
              <template slot-scope="scope">
                <el-tag v-show="scope.row.type ===0" type="primary" disable-transitions>菜单</el-tag>
                <el-tag v-show="scope.row.type ===1" type="success" disable-transitions>目录</el-tag>
                <el-tag v-show="scope.row.type ===2" type="warning" disable-transitions>按钮</el-tag>
              </template>
            </el-table-column>
            <el-table-column
              prop="orderNum"
              label="排序号"/>
            <el-table-column
              prop="url"
              label="菜单URL"/>
            <el-table-column
              prop="perms"
              label="授权标识"/>
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
        console.log(listData)
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

