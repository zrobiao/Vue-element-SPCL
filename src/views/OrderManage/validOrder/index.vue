<template>
  <div class="main-content">
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
                <el-radio :label="scope.row.name" v-model="radioStatus" @change.native="getParentRow(scope.row.menuId)"> &nbsp; </el-radio>
              </template>
            </el-table-column>
            <el-table-column
              prop="menuId"
              label="订单ID"/>
            <el-table-column
              prop="menuId"
              label="订单编号"/>
            <el-table-column
              prop="name"
              label="联系人"/>
            <el-table-column
              prop="parentName"
              label="联系电话"/>
            <el-table-column
              prop="orderNum"
              label="联系电话归属地"/>
            <el-table-column
              prop="url"
              label="订单开通类型"/>
            <el-table-column
              prop="perms"
              label="操作备注"/>
          </el-table>
        </el-col>
      </el-row>
      <el-row type="flex" justify="end">
        <el-col :span="9">
          <pagi-tabs :curr-page="currPage" :page-size="pageSize" :total-count="totalCount" :total-page="totalPage" @pageChild="pageChildFn"/>
        </el-col>
      </el-row>
    </div>
    <el-dialog :visible.sync="menuDialog" title="订单详情" width="90%">
      <dia-log :dia-data="diaTitle" :dia-info="dialogInfo" @dialogChild="dialogData"/>
    </el-dialog>
  </div>
</template>
<script>
import { getValidList } from '@/api/orderList'
import searchBar from '@/components/search'
import pagiTabs from '@/components/pagination'
import diaLog from './dialog'
export default {
  components: {
    searchBar,
    pagiTabs,
    diaLog
  },
  data() {
    return {
      isDate: true,
      isSearch: true,
      isBtn: false,
      preParent: 'menu',
      upData: 0,
      diaTitle: '',
      dialogInfo: {},
      menuDialog: false,
      currPage: 1,
      pageSize: 10,
      totalCount: 5,
      totalPage: 1,
      radioStatus: '单选框',
      tableData: []
    }
  },
  computed: {

  },
  created() {
    this.getTableList()
  },
  methods: {
    getTableList() {
      const params = {
        pageSize: this.pageSize,
        currPage: this.currPage
      }
      getValidList(params).then(res => {
        if (res.code === 0) {
          const status = res.data.opreaState
          if (status) {
            const orderData = res.data.data
            this.currPage = orderData.currPage
            this.pageSize = orderData.pageSize
            this.totalCount = orderData.totalCount
            this.totalPage = orderData.totalPage
            this.tableData = orderData.list
          } else {
            this.$message.error(res.data.msg)
          }
        } else {
          this.$message.error(res.msg)
        }
      })
    },
    pageChildFn(currentPage) {
      console.log(currentPage)
      this.currPage = currentPage
      this.getTableList()
    },
    chindData(titName, data) {
      this.diaTitle = titName
      this.menuDialog = true
      if (titName === '新增') {
        this.menuInfo = { type: 0 }
      } else if (titName === '修改') {
        this.getMenuInfo(data)
      } else {
        this.menuDialog = false
        this.delMenuInfo(data)
      }
    },
    dialogData(upOrsave, params) {
      if (upOrsave === 0) {
        console.log('新增保存')
      } else if (upOrsave === 1) {
        console.log('更新保存')
      }
      this.menuDialog = !this.menuDialog
    },
    getParentRow(menuId) {
      this.upData = menuId
    },
    handleClick(row) {
      console.log(row)
    }
  }
}
</script>
<style lang="scss" scoped>
.main-content{
  margin:10px;
  .show-container{
    margin-top:15px;
    .show-title{
      font-size: 12px;
      padding: 5px 0;
      span{
        color:#409EFF;
      }
    }
  }
}
</style>
