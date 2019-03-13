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
            <!-- <el-table-column label="选择" width="65">
              <template slot-scope="scope">
                <el-radio :label="scope.row.id" v-model="roleRadio" @change.native="getParentRow(scope.row.id)"> &nbsp; </el-radio>
              </template>
            </el-table-column> -->
            <el-table-column
              prop="id"
              label="id"/>
            <el-table-column
              prop="company"
              label="公司名称"/>
            <el-table-column
              prop="nickName"
              label="客户名称"/>
            <el-table-column
              prop="linkPhone"
              label="联系电话"/>
            <el-table-column
              prop="applyType"
              label="申请类型">
              <template slot-scope="scope">
                <el-tag v-show="scope.row.applyType ===1" type="primary" disable-transitions>视频制作</el-tag>
                <el-tag v-show="scope.row.applyType ===2" type="primary" disable-transitions>渠道合作</el-tag>
                <el-tag v-show="scope.row.applyType ===3" type="primary" disable-transitions>政企合作</el-tag>
              </template>
            </el-table-column>
            <el-table-column
              prop="auditType"
              label="处理类型">
              <template slot-scope="scope">
                <el-tag v-show="scope.row.auditType ===0" type="primary" disable-transitions>未处理</el-tag>
                <el-tag v-show="scope.row.auditType ===1" type="primary" disable-transitions>已处理</el-tag>
              </template>
            </el-table-column>
            <el-table-column
              prop="auditTime"
              label="处理日期"/>
            <el-table-column
              prop="auditContent"
              label="处理意见"/>
            <el-table-column
              prop="createTime"
              label="创建日期"/>
            <el-table-column
              fixed="right"
              label="操作"
              width="100">
              <template slot-scope="scope">
                <el-button type="text" size="small" @click="detailClick(scope.row.id,1)">查看</el-button>
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
  </div>
</template>
<script>
import {
  getMsgcheckList,
  // getMsgcheckSave,
  // getMsgcheckUpdate,
  getMsgcheckListInfo,
  getMsgcheckDelete
  // getMsgcheckListAudit
} from '@/api/operation'
import searchBar from '@/components/search/index'
import pagiTabs from '@/components/pagination/index'
export default {
  components: {
    searchBar,
    pagiTabs
  },
  data() {
    return {
      msg: '这里是显示的模块！',
      isDate: false,
      isSearch: true,
      isBtn: false,
      preParent: 'menu',
      preOptions: [{
        value: 'nickName',
        label: '客户名称'
      }, {
        value: 'linkPhone',
        label: '联系电话'
      }, {
        value: 'company',
        label: '公司名称'
      }, {
        value: 'enterpriseFaren',
        label: '企业法人'
      }],
      upData: 0,
      diaTitle: '',
      roleData: [],
      roleRadio: '角色选择',
      currPage: 1,
      pageSize: 10,
      totalCount: 5,
      totalPage: 1,
      roleInfo: {},
      query: {
        nickName: null,
        linkPhone: null,
        company: null,
        enterpriseFaren: null
      }
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
    detailClick(orderId, type) {
      this.$router.push({
        path: '/Operation/agentAccount',
        name: 'systemAdmin-agentAccount',
        params: {
          userId: orderId,
          type: type
        }
      })
    },
    pageChildFn(currentPage) {
      this.currPage = currentPage
      this.getRoleList()
    },
    getRoleList() {
      const params = {
        pageSize: this.pageSize,
        currPage: this.currPage,
        query: this.query
      }
      getMsgcheckList(params).then(res => {
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
        const pageData = res.page
        const listData = res.page.list
        this.roleData = listData
        this.currPage = pageData.currPage
        this.pageSize = pageData.pageSize
        this.totalCount = pageData.totalCount
        this.totalPage = pageData.totalPage
      })
    },
    getRoleInfo(roleId) {
      getMsgcheckListInfo(roleId).then(res => {
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
        getMsgcheckDelete(roleId).then(res => {
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

