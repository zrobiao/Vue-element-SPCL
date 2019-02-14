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
            ref="parentMenu"
            :data="tableData"
            stripe
            style="width: 100%">
            <el-table-column label="选择" width="65">
              <template slot-scope="scope">
                <el-radio :label="scope.row.menuId" v-model="parentMenuRadio" @change.native="getParentRow(scope.row.menuId)"> &nbsp; </el-radio>
              </template>
            </el-table-column>
            <el-table-column
              prop="menuId"
              label="菜单ID"/>
            <el-table-column type="expand">
              <template slot-scope="childList">
                <el-table
                  ref="childMenu"
                  :data="childList.row.list"
                  border
                  style="width:100%">
                  <el-table-column label="选择" width="65">
                    <template slot-scope="scope">
                      <el-radio :label="scope.row.menuId" v-model="parentMenuRadio" @change.native="getParentRow(scope.row.menuId)">&nbsp;</el-radio>
                    </template>
                  </el-table-column>
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
      <dia-log :dia-data="diaTitle" :menu-info="menuInfo" @dialogChild="dialogData"/>
    </el-dialog>
  </div>
</template>
<script>
import { getMenuList, getMenuInfo } from '@/api/sysadmin'
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
      upData: 0,
      menuId: 0,
      menuInfo: {},
      menuDialog: false,
      diaTitle: '',
      tableData: [],
      parentMenuRadio: '一级菜单',
      childMenuRadio: '二级菜单'
    }
  },
  created() {
    this.getMenuList()
  },
  methods: {
    chindData(titName, data) {
      this.diaTitle = titName
      this.menuDialog = true
      if (titName === '新增') {
        this.menuInfo = { type: 0 }
      } else if (titName === '修改') {
        this.getMenuInfo(data)
      } else {
        this.delMenuInfo(data)
      }
    },
    dialogData(val) {
      this.getMenuList()
      this.menuDialog = !this.menuDialog
    },
    getMenuList() {
      getMenuList().then(res => {
        const listData = res.menuList
        this.tableData = listData
        console.log(listData)
      })
    },
    getParentRow(menuId) {
      this.upData = menuId
    },
    getMenuInfo(menuId) {
      getMenuInfo(menuId).then(res => {
        this.menuInfo = res.menu
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

