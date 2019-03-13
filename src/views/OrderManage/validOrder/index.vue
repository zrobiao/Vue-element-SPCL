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
    <div class="show-container">
      <el-row>
        <el-col :span="24">
          <el-table
            ref="parentMenu"
            :data="tableData"
            stripe
            style="width: 100%">
            <!-- <el-table-column label="选择" width="65">
              <template slot-scope="scope">
                <el-radio :label="scope.row.order_no" v-model="radioStatus" @change.native="getParentRow(scope.row.order_id)"> &nbsp; </el-radio>
              </template>
            </el-table-column> -->
            <el-table-column
              prop="orderId"
              width="80px"
              label="订单ID"/>
            <el-table-column
              prop="orderNo"
              label="订单编号"/>
            <el-table-column
              prop="enterName"
              label="企业名称"/>
            <el-table-column
              prop="enterContact"
              label="企业联系人"/>
            <el-table-column
              prop="enterTel"
              label="企业联系电话"/>
            <el-table-column
              prop="orderState"
              label="订单状态">
              <template slot-scope="scope">
                <order-state :order-stus="scope.row.orderState"/>
              </template>
            </el-table-column>
            <el-table-column
              prop="makeFlag"
              label="素材类型">
              <template slot-scope="scope">
                <el-tag v-show="scope.row.makeFlag ===1" type="success" disable-transitions>待制作</el-tag>
                <el-tag v-show="scope.row.makeFlag ===2" type="warning" disable-transitions>成品</el-tag>
              </template>
            </el-table-column>
            <el-table-column
              prop="repressFlag"
              label="是否压标">
              <template slot-scope="scope">
                <el-tag v-show="scope.row.repressFlag ===1" type="success" disable-transitions>是</el-tag>
                <el-tag v-show="scope.row.repressFlag ===2" type="warning" disable-transitions>否</el-tag>
              </template>
            </el-table-column>
            <el-table-column
              prop="openType"
              label="开通类型">
              <template slot-scope="scope">
                <el-tag v-show="scope.row.openType ===1" type="primary" disable-transitions>移动</el-tag>
                <el-tag v-show="scope.row.openType ===2" type="success" disable-transitions>联通</el-tag>
                <el-tag v-show="scope.row.openType ===3" type="warning" disable-transitions>电信</el-tag>
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
                <el-button type="text" size="small" @click="detailClick(scope.row.orderId)">查看</el-button>
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
import { getValidList, getOrderInfo } from '@/api/videoList'
import { orderStateStus } from '@/utils/index'
import searchBar from '@/components/search'
import pagiTabs from '@/components/pagination'
import diaLog from './dialog'
import orderState from '../orderstate'
export default {
  components: {
    searchBar,
    pagiTabs,
    diaLog,
    orderState
  },
  data() {
    return {
      isDate: true,
      isSearch: true,
      isBtn: false,
      preParent: 'menu',
      preOptions: [{
        value: 'orderNo',
        label: '订单编号'
      }, {
        value: 'enterName',
        label: '企业名称'
      }, {
        value: 'enterContact',
        label: '企业联系人'
      }, {
        value: 'enterTel',
        label: '企业联系电话'
      }, {
        value: 'orderState',
        label: '订单状态',
        children: orderStateStus()
      }, {
        value: 'openType',
        label: '开通类型',
        children: [{
          value: '1',
          label: '移动'
        }, {
          value: '2',
          label: '联通'
        }, {
          value: '3',
          label: '电信'

        }]
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
        orderNo: null,
        enterName: null,
        enterContact: null,
        enterTel: null,
        orderState: null,
        openType: null
      }
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
    btnSubmitData() {},
    searchSubData(selectMsg, searchMsg) {
      switch (selectMsg) {
        case 'orderNo':
          this.query.orderNo = searchMsg
          break
        case 'enterName':
          this.query.enterName = searchMsg
          break
        case 'enterContact':
          this.query.enterContact = searchMsg
          break
        case 'enterTel':
          this.query.enterTel = searchMsg
          break
        case 'orderState':
          this.query.orderState = searchMsg
          break
        case 'openType':
          this.query.openType = searchMsg
          break
      }
      this.getTableList()
    },
    dialogData(upOrsave, params) {
      if (upOrsave === 0) {
        console.log('新增保存')
      } else if (upOrsave === 1) {
        console.log('更新保存')
      }
      this.menuDialog = !this.menuDialog
    },
    detailClick(orderId) {
      this.menuDialog = !this.menuDialog
      getOrderInfo(orderId).then(res => {
        if (res.code === 0) {
          const status = res.data.opreaState
          if (status) {
            const orderData = res.data.data
            this.dialogInfo = orderData
          } else {
            this.$message.error(res.data.msg)
          }
        } else {
          this.$message.error(res.msg)
        }
      })
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
