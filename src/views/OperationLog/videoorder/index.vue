<template>
  <div class="big-container">
    <search-bar
      :show-date="isDate"
      :show-search="isSearch"
      :show-search-btn="isSearchBtn"/>
    <div class="show-container">
      <el-row>
        <el-col class="show-title">订单列表显示数据<span>{{ totalCount }}</span>条</el-col>
      </el-row>
      <el-row>
        <el-col :span="24">
          <el-table
            :data="orderLogData"
            stripe
            style="width:100%">
            <el-table-column label="选择">
              <template slot-scope="scope">
                <el-radio :label="scope.row.code" v-model="orderLogRadio" @change.native="getParentRow(scope.row.id)"/>
              </template>
            </el-table-column>
            <el-table-column
              prop=""
              label="Id"/>
            <el-table-column
              prop=""
              label="流程节点名称"
              width="150"/>
            <el-table-column
              prop=""
              label="订单操作内容"
              width="150"/>
            <el-table-column
              prop=""
              label="操作平台"
              width="150"/>
            <el-table-column
              prop=""
              label="操作人Id"
              width="150"/>
            <el-table-column
              prop=""
              label="操作人账户"
              width="150"/>
            <el-table-column
              prop=""
              label="视频订单Id"
              width="150"/>
            <el-table-column
              prop=""
              label="用户Id"
              width="150"/>
            <el-table-column
              prop=""
              label="IP地址"
              width="150"/>
            <el-table-column
              prop=""
              label="节点耗时(h)"
              width="150"/>
            <el-table-column
              prop=""
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
import searchBar from '@/components/Searchbar/index'
import pagiTabs from '@/components/pagination/index'
export default {
  components: {
    searchBar,
    pagiTabs
  },
  data() {
    return {
      isDate: true,
      isSearch: true,
      isSearchBtn: true,
      orderLogData: [],
      totalCount: 10,
      pageSize: 10,
      totalPage: 0,
      currPage: 1

    }
  },
  created() {
    this.orderLogList()
  },
  methods: {
    orderLogList() {
      const obj = {
        pageSize: 5,
        currPage: 1,
        query: {
          orderId: 1,
          orderNo: 222
        }
      }
      orderLogList(obj).then(res => {
        const pageDate = res.data.data
        const listData = pageDate.list
        this.orderLogData = listData
        this.totalCount = pageDate.totalCount
        this.pageSize = pageDate.pageSize
        this.totalPage = pageDate.totalPage
        this.currPage = pageDate.currPage
      })
    },
    getParentRow(id) {
      alert(id)
    }
  }
}
</script>
<style lang="scss" scoped>
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

