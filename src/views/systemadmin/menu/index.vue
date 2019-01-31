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
              prop="menuID"
              label="菜单ID"
              width="50"/>
            <el-table-column
              prop="menuName"
              label="菜单名称"
              width="120"/>
            <el-table-column
              prop="preMenu"
              label="上级菜单"
              width="120"/>
            <el-table-column
              prop="menuIcon"
              label="图标"
              width="120"/>
            <el-table-column
              prop="menuType"
              label="类型"
              width="300"/>
            <el-table-column
              prop="menuSort"
              label="排序号"
              width="120"/>
            <el-table-column
              prop="menuUrl"
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
      tableData: [{
        menuId: 1,
        menuName: '运营管理',
        preMenu: '无',
        menuIcon: 'manage',
        menuType: '目录',
        menuSort: 1,
        menuUrl: 'modules/perssion/menu.html',
        menuSign: '暂无'
      }]
    }
  },
  methods: {
    chindData(data) {
      this.menuDialog = true
      this.diaTitle = data
    },
    dialogData(val) {
      this.menuDialog = !this.menuDialog
      console.log(val)
    }
  }
}
</script>
<style lang="scss" scoped>
.show-container{
    margin-top:15px;
  }
</style>

