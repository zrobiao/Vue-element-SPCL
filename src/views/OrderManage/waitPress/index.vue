<template>
  <div>
    <search-bar
      :show-search="isSearch"
      :show-date="isDate"
      :show-btn="isBtn"
      :send-parent="preParent"
      :pre-options="preOptions"
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
              prop="orderId"
              label="订单ID"/>
            <el-table-column
              prop="orderNo"
              label="视频订单号"
              width="150"/>
            <el-table-column
              prop="createTime"
              label="订单创建日期"
              width="150"/>
            <el-table-column
              prop="createTime"
              label="订单压标完成日期"
              width="180"/>
            <el-table-column
              prop="enterName"
              label="企业名称"
              width="100"/>
            <el-table-column
              prop="enterContact"
              label="企业联系人"
              width="100"/>
            <el-table-column
              prop="enterTel"
              label="企业联系电话"
              width="120"/>
            <el-table-column
              prop="needRemark"
              label="特需说明"
              width="120"/>
            <el-table-column
              label="操作"
              width="100">
              <template slot-scope="scope">
                <el-button type="text" size="small" @click="handleClick(scope.row)">详情</el-button>
              </template>
            </el-table-column>
          </el-table>
        </el-col>
      </el-row>
    </div>
    <el-row type="flex" justify="end">
      <el-col :span="9">
        <paging-tabs :curr-page="currPage" :page-size="pageSize" :total-count="totalCount" :total-page="totalPage"/>
      </el-col>
    </el-row>
  </div>
</template>
<script>
import searchBar from '@/components/search'
import pagingTabs from '@/components/pagination'
import { getWaitYaBiaoList } from '@/api/videoList'
export default {
  components: {
    pagingTabs,
    searchBar
  },
  data() {
    return {
      isSearch: true,
      isDate: true,
      isBtn: false,
      preParent: '',
      upData: 0,
      preOptions: [], // 设置父级筛选项目
      tableData: [],
      currPage: 1,
      pageSize: 10,
      totalCount: 0,
      totalPage: 0,
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
    this.waitYaBiaoList()
  },
  methods: {
    // 子组件传输选择项目给父组件
    chindData(selectMsg, searchMsg) {
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
    waitYaBiaoList() {
      const obj = {
        pageSize: this.pageSize,
        currPage: this.currPage,
        query: this.query
      }
      getWaitYaBiaoList(obj).then(res => {
        if (res.code === 0) {
          const status = res.data.opreaState
          if (status) {
            const orderData = res.data.data
            this.currPage = orderData.currPage
            this.pageSize = orderData.pageSize
            this.totalCount = orderData.totalCount
            this.totalPage = orderData.totalPage
            this.tableData = orderData.list
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
    handleClick(row) {
      console.log(row)
      alert(row.orderId)
    }
  }
}
</script>
<style lang="scss" scoped>
.el-row {
  margin-bottom: 20px;
  &:last-child {
    margin-bottom: 0;
  }
}
.dia-Title {
  margin-top: 0.68rem;
}
// .btn-bottom {
//   margin-left: -9.62rem;
// }
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
</style>
