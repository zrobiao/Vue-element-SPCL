<template>
  <div>
    <search-bar
      :show-date="isDate"
      :show-search="isSearch"
      :show-search-btn="isBtn"
      :send-parent="preParent"/>
    <div class="show-container">
      <el-row>
        <el-col class="show-title">订单列表显示数据<span>{{ totalCount }}</span>条</el-col>
      </el-row>
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
import searchBar from '@/components/Searchbar/index'
import pagingTabs from '@/components/pagination'
import { resetOpenList } from '@/api/videoList'
export default {
  components: {
    pagingTabs,
    searchBar
  },
  data() {
    return {
      searchMsg: '',
      isSearch: true,
      isBtn: true,
      isDate: true,
      preParent: '',
      tableData: [],
      currPage: 1,
      pageSize: 10,
      totalCount: 10,
      totalPage: 1
    }
  },
  created() {
    this.resetOpenList()
  },
  methods: {
    resetOpenList() {
      const obj = {
        pageSize: 5,
        currPage: 1,
        'query': {
          'orderNo': 'ccc'
        }
      }
      console.log(obj)
      resetOpenList(obj).then(res => {
        const pageData = res.data.data
        const listData = pageData.list
        this.tableData = listData
        this.currPage = pageData.currPage
        this.pageSize = pageData.pageSize
        this.totalCount = pageData.totalCount
        this.totalPage = pageData.totalPage
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

