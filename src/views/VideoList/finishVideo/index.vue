<template>
  <div>
    <search-bar
      :show-search="isSearch"
      :show-btn="isBtn"
      :show-search-btn="isSearchBtn"
      :show-date="isDate"/>
    <div class="show-container">
      <el-row>
        <el-col class="show-title">订单列表显示数据<span>{{ totalCount }}</span>条</el-col>
      </el-row>
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
import searchBar from '@/components/Searchbar/index'
import pagingTabs from '@/components/pagination'
import { finishMakeList } from '@/api/videoList'
export default {
  components: {
    pagingTabs,
    searchBar
  },
  data() {
    return {
      searchMsg: '',
      isEnter: true,
      isSearch: true,
      isDate: true,
      isBtn: false,
      isSearchBtn: true,
      preParent: '',
      tableData: [],
      currPage: 1,
      pageSize: 2,
      totalCount: 4,
      totalPage: 2
    }
  },
  created() {
    this.finishMakeList()
  },
  methods: {
    finishMakeList: function() {
      const obj = {
        'pageSize': 10,
        'currPage': 1,
        'query': {
          'orderNo': 'ccc'
        }
      }
      console.log(obj)
      finishMakeList(obj).then(res => {
        const pageData = res.data.data
        const listData = pageData.list
        this.tableData = listData
        this.currPage = pageData.currPage
        this.pageSize = pageData.pageSize
        this.totalCount = pageData.totalCount
        this.totalPage = pageData.totalPage
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

