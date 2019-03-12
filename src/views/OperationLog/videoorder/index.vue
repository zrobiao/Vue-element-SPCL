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
            :data="orderLogData"
            stripe
            style="width:100%">
            <el-table-column
              prop="orderId"
              label="订单Id"/>
            <el-table-column
              prop="orderNo"
              label="订单编号"
              width="150"/>
            <el-table-column
              prop="orderName"
              label="流程节点名称"
              width="180"/>
            <el-table-column
              prop="orderOprea"
              label="订单操作内容"
              width="180"/>
            <el-table-column
              prop="opreaFlag"
              label="操作平台"
              width="150">
              <template slot-scope="scope">
                <el-tag v-show="scope.row.opreaFlag===1">运营</el-tag>
                <el-tag v-show="scope.row.opreaFlag===2">客户</el-tag>
              </template>
            </el-table-column>
            <el-table-column
              prop="opreaUserId"
              label="操作人Id"
              width="150"/>
            <el-table-column
              prop="opreaUserName"
              label="操作人账户"
              width="150"/>
            <el-table-column
              prop="time"
              label="节点耗时(h)"
              width="150"/>
            <el-table-column
              prop="ip"
              label="IP地址"
              width="200"/>
            <el-table-column
              prop="createTime"
              label="创建日期"
              width="150"/>
          </el-table>
        </el-col>
      </el-row>
      <el-row>
        <pagi-tabs :total-count="totalCount" :page-size="pageSize" :total-page="totalPage" :curr-page="currPage"/>
      </el-row>
    </div>
  </div>
</template>
<script>
import { orderLogList } from '@/api/log'
import searchBar from '@/components/search'
import pagiTabs from '@/components/pagination'
export default {
  components: {
    searchBar,
    pagiTabs
  },
  data() {
    return {
      isSearch: true,
      isDate: true,
      isBtn: false,
      preParent: '',
      upData: 0,
      preOptions: [
        {
          value: 'orderId',
          label: '订单Id'
        },
        {
          value: 'orderNo',
          label: '订单编号'
        },
        {
          value: 'orderName',
          label: '流程节点名称'
        },
        {
          value: 'opreaUserName',
          label: '操作人'
        }
      ], // 设置父级筛选项目
      orderLogRadio: '表单单选',
      orderLogData: [],
      totalCount: 0,
      totalPage: 0,
      pageSize: 10,
      currPage: 1,
      // 设置查询项目query
      query: {
        orderId: null,
        orderNo: null,
        orderName: null,
        opreaUserName: null,
        minTime: null,
        maxTime: null
      }
    }
  },
  created() {
    this.getTableList()
  },
  methods: {
    // 子组件传输选择项目给父组件
    searchSubData(selectMsg, searchMsg) {
      switch (selectMsg) {
        case 'orderId':
          this.query.orderId = searchMsg
          break
        case 'orderNo':
          this.query.orderNo = searchMsg
          break
        case 'orderName':
          this.query.orderName = searchMsg
          break
        case 'opreaUserName':
          this.query.opreaUserName = searchMsg
          break
      }
      this.getTableList()
    },
    btnSubmitData() {},
    getTableList() {
      const obj = {
        pageSize: this.pageSize,
        currPage: this.currPage,
        query: this.query
      }
      console.log(obj)
      orderLogList(obj).then(res => {
        if (res.code === 0) {
          const status = res.data.opreaState
          if (status) {
            const orderData = res.data.data
            this.currPage = orderData.currPage
            this.pageSize = orderData.pageSize
            this.totalCount = orderData.totalCount
            this.totalPage = orderData.totalPage
            this.orderLogData = orderData.list
            // 以下数据根据查询项进行变换绑定
            // this.query.orderNo = null
            // this.query.enterName = null
            // this.query.enterContact = null
            // this.query.enterTel = null
            // this.query.openType = null
            // this.query.orderState = null
          } else {
            this.$message.error(res.data.msg)
          }
        } else {
          this.$message.error(res.msg)
        }
      })
    },
    getParentRow(id) {
      alert(id)
    }
  }
}
</script>
<style lang="scss" scoped>
.show-container {
  margin-top: 15px;
  .show-title {
    font-size: 12px;
    padding: 5px 0;
    span {
      color: #409eff;
    }
  }
}
</style>
