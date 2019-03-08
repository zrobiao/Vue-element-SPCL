<template>
  <div class="main-content">
    <search-bar
      :show-search="isSearch"
      :show-date="isDate"
      :show-btn="isBtn"
      :send-parent="preParent"
      :pre-options="preOptions"
      :send-data="upData"
      @listenSearch="searchSubData"
      @listenBtn="btnSubmitData"/>
    <el-row :gutter="15">
      <el-col>
        <el-button type="primary" icon="el-icon-plus" @click="useAccount(userIds)">启用</el-button>
        <el-button type="danger" icon="el-icon-plus" @click="stopAccount(userIds)">禁用</el-button>
        <el-button type="warning" icon="el-icon-plus" @click="resetPaswd(userIds)">重设密码</el-button>
      </el-col>
    </el-row>
    <div class="show-container">
      <el-row>
        <el-col :span="24">
          <el-table
            ref="parentMenu"
            :data="tableData"
            stripe
            style="width: 100%"
            @selection-change="handleSelectionChange">
            <el-table-column
              type="selection"
              width="55"/>
            <el-table-column
              prop="userId"
              width="80px"
              label="账户ID"/>
            <el-table-column
              prop="username"
              label="账户名称"/>
            <el-table-column
              prop="mobile"
              label="手机号码"/>
            <el-table-column
              prop="email"
              label="邮箱"/>
            <el-table-column
              prop="deptName"
              label="部门名称"/>
            <el-table-column
              prop="status"
              label="账户状态">
              <template slot-scope="scope">
                <el-tag v-show="scope.row.status ===0" type="warning" disable-transitions>禁用</el-tag>
                <el-tag v-show="scope.row.status ===1" type="success" disable-transitions>正常</el-tag>
              </template>
            </el-table-column>
            <el-table-column
              prop="userType"
              label="用户类型">
              <template slot-scope="scope">
                <el-tag v-show="scope.row.userType ===1" type="primary" disable-transitions>运营人员</el-tag>
                <el-tag v-show="scope.row.userType ===2" type="primary" disable-transitions>视频制作人员</el-tag>
                <el-tag v-show="scope.row.userType ===3" type="primary" disable-transitions>视频压标人员</el-tag>
                <el-tag v-show="scope.row.userType ===4" type="primary" disable-transitions>视频开通人员</el-tag>
              </template>
            </el-table-column>
            <el-table-column
              prop="createTime"
              label="创建日期"/>
            <el-table-column
              fixed="right"
              label="操作"
              width="100">
              <template slot-scope="scope">
                <el-button type="text" size="small" @click="detailClick(scope.row.userId)">查看</el-button>
              </template>
            </el-table-column>
          </el-table>
        </el-col>
      </el-row>
      <el-row type="flex" justify="end">
        <el-col :span="9">
          <pagi-tabs :curr-page="currPage" :page-size="pageSize" :total-count="totalCount" :total-page="totalPage" @pageChild="pageChildFn"/>
        </el-col>
      </el-row>
    </div>
    <el-dialog :visible.sync="menuDialog" title="订单详情" width="90%" top="5vh">
      <dia-log :dia-info="dialogInfo" @dialogChild="dialogData"/>
    </el-dialog>
  </div>
</template>
<script>
import {
  getAccountOperatorList,
  getAccountUserInfo,
  // getAccountUpdatePw,
  getAccountSave,
  getAccountUpdate,
  getAccountResetPass,
  getAccountUseAccount,
  getAccountStopAccount
  // getAccountCheckUserName
} from '@/api/account'
import searchBar from '@/components/search'
import pagiTabs from '@/components/pagination'
import diaLog from './dialog'
export default {
  components: {
    searchBar,
    pagiTabs,
    diaLog
    // orderState
  },
  data() {
    return {
      isDate: false,
      isSearch: true,
      isBtn: true,
      preParent: 'account',
      preOptions: [{
        value: 'username',
        label: '账户名称'
      }, {
        value: 'mobile',
        label: '手机号'
      }],
      upData: 0,
      diaTitle: '',
      dialogInfo: {},
      menuDialog: false,
      currPage: 1,
      pageSize: 10,
      totalCount: 5,
      totalPage: 1,
      radioStatus: '单选框',
      tableData: [],
      query: {
        username: null,
        mobile: null
      },
      userIds: [],
      multipleSelection: []
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
        currPage: this.currPage,
        query: this.query
      }
      getAccountOperatorList(params).then(res => {
        if (res.code === 0) {
          const status = res.data.opreaState
          if (status) {
            const orderData = res.data.data
            this.currPage = orderData.currPage
            this.pageSize = orderData.pageSize
            this.totalCount = orderData.totalCount
            this.totalPage = orderData.totalPage
            this.tableData = orderData.list
            this.query.orderNo = null
            this.query.enterName = null
            this.query.enterContact = null
            this.query.enterTel = null
            this.query.openType = null
            this.query.orderState = null
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
    btnSubmitData(titName, data) {
      this.diaTitle = titName
      this.menuDialog = true
      if (titName === '新增') {
        this.menuInfo = { type: 0 }
      } else if (titName === '修改') {
        getAccountUserInfo(data).then(res => {
          this.dialogInfo = res.data
        })
      } else {
        this.menuDialog = false
        this.delMenuInfo(data)
      }
    },
    searchSubData(selectMsg, searchMsg) {
      switch (selectMsg) {
        case 'username':
          this.query.username = searchMsg
          break
        case 'mobile':
          this.query.mobile = searchMsg
          break
      }
      this.getTableList()
    },
    dialogData(upOrsave, params) {
      if (upOrsave === 0) {
        console.log('新增保存')
        getAccountSave(params).then(res => {
          console.log(res)
        })
      } else if (upOrsave === 1) {
        console.log('更新保存')
        getAccountUpdate(params).then(res => {
          console.log(res)
        })
      }
      this.menuDialog = !this.menuDialog
    },
    detailClick(orderId) {
      this.menuDialog = !this.menuDialog
      getAccountUserInfo(orderId).then(res => {
        this.dialogInfo = res.data
      })
    },
    useAccount(userIds) {
      if (userIds.length === 0) {
        return this.$message.error('请选择一个数据选择操作！')
      }
      this.$confirm('此操作将启用选择用户, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        getAccountUseAccount(userIds).then(res => {
          this.$message({
            type: 'success',
            message: '启用成功!'
          })
          this.getTableList()
        })
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消启用'
        })
      })
    },
    stopAccount(userIds) {
      if (userIds.length === 0) {
        return this.$message.error('请选择一个数据选择操作！')
      }
      this.$confirm('此操作将禁用选择用户, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        getAccountStopAccount(userIds).then(res => {
          this.$message({
            type: 'success',
            message: '禁用成功!'
          })
          this.getTableList()
        })
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消禁用'
        })
      })
    },
    resetPaswd(userIds) {
      if (userIds.length === 0) {
        return this.$message.error('请选择一个数据选择操作！')
      }
      this.$confirm('此操作将选择用户重设密码为：123123, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        getAccountResetPass(userIds).then(res => {
          this.$message({
            type: 'success',
            message: '重设密码成功!'
          })
          this.getTableList()
        })
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消重设密码'
        })
      })
    },
    handleSelectionChange(val) {
      this.multipleSelection = val
      const ids = []
      this.multipleSelection.map((item) => {
        ids.push(item.userId)
      })
      if (ids.length > 1) {
        this.userIds = ids
        this.upData = -99
      } else {
        this.upData = ids[0]
      }
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
