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
            stripe
            style="width: 100%">
            <el-table-column
              type="selection"
              width="55"
              @change.native="getParentRow(scope.row.orderId)"/>
            <el-table-column
              prop="orderId"
              label="订单ID"/>
            <el-table-column
              prop="orderNo"
              label="视频订单号"
              width="150"/>
            <el-table-column
              prop="makeTime"
              label="制作完成日期"
              width="150"/>
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
              prop="province"
              label="归属省份"
              width="80"/>
            <el-table-column
              prop="city"
              label="归属城市"
              width="80"/>
            <el-table-column
              prop="qq"
              label="联系QQ"
              width="80"/>
            <el-table-column
              prop="weixin"
              label="联系微信"
              width="80"/>
            <el-table-column
              prop="needRemark"
              label="特需说明"
              width="120"/>
            <el-table-column
              prop="agentId"
              label="所属代理商"
              width="100"/>
            <el-table-column
              prop="orderState"
              label="订单状态"
              width="100"/>
            <el-table-column
              prop="orderResources"
              label="订单来源"
              width="100"/>
            <el-table-column
              label="操作"
              width="100">
              <template slot-scope="scope">
                <el-button type="text" size="small" @click="handleClick(scope.row.orderId)">查看</el-button>
                <el-button type="text" size="small">编辑</el-button>
              </template>
            </el-table-column>
          </el-table>
        </el-col>
      </el-row>
    </div>
    <el-row type="flex" justify="end">
      <el-col :span="9">
        <paging-tabs/>
      </el-col>
    </el-row>
  </div>
</template>
<script>
import searchBar from '@/components/search'
import pagingTabs from '@/components/pagination'
import { getFinishMakeList } from '@/api/videoList'
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
      preOptions: [{
        value: 'orderNo',
        label: '订单编号'
      }], // 设置父级筛选项目
      tableData: [],
      currPage: 1,
      pageSize: 10,
      totalCount: 0,
      totalPage: 0,
      // 设置查询项目query
      query: {
        orderNo: null,
        minTime: null,
        maxTime: null
      }
    }
  },
  created() {
    this.finishMakeList()
  },
  methods: {
    // 子组件传输选择项目给父组件
    chindData(selectMsg, searchMsg) {
      switch (selectMsg) {
        case 'orderNo':
          this.query.orderNo = searchMsg
          break
      }
      this.finishMakeList()
    },
    finishMakeList: function() {
      const obj = {
        pageSize: this.pageSize,
        currPage: this.currPage,
        query: this.query
      }
      getFinishMakeList(obj).then(res => {
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
    getParentRow: function(orderId) {
      alert(orderId)
    },
    handleClick(orderId) {
      alert(orderId)

      // this.$router.push({path:"./../waitMake/detail.vue", query: {} })
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
