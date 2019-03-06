<template>
  <div class="main-content">
    <search-bar
      :show-search="isSearch"
      :show-date="isDate"
      :show-search-btn="isSearchBtn"/>
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
            />
            <el-table-column
              prop="orderNo"
              label="订单号"
            />
            <el-table-column
              prop="name"
              label="企业名称"
            />
            <el-table-column
              prop="date"
              label="上传日期"
            />
            <el-table-column
              label="操作"
            >
              <template slot-scope="scope">
                <el-button type="text" size="small" @click="handleClick(scope.row)">播放</el-button>
              </template>
            </el-table-column>
          </el-table>
        </el-col>
      </el-row>
    </div>
    <el-row type="flex" justify="end">
      <el-col :span="9">
        <paging-tabs :page-size="pageSize" :curr-page="currPage" :total-page="totalPage" :total-count="totalCount"/>
      </el-col>
    </el-row>
  </div>
</template>
<script>
import searchBar from '@/components/Searchbar/index'
import pagingTabs from '@/components/pagination'
import { finishYaBiaoList } from '@/api/videoList'
export default {
  components: {
    searchBar,
    pagingTabs
  },
  data() {
    return {
      isSearch: true,
      isDate: true,
      isSearchBtn: true,
      tableData: [],
      pageSize: 10,
      currPage: 1,
      totalPage: 1,
      totalCount: 5
    }
  },
  computed: {

  },
  created() {
    this.finishYaBiaoList()
  },
  methods: {
    finishYaBiaoList() {
      const obj = {
        'pageSize': 5,
        'currPage': 1,
        'query': {
          'orderNo': '444'
        }
      }
      console.log(obj)
      finishYaBiaoList(obj).then(res => {
        const pageData = res.list
        const listData = pageData.list
        this.tableData = listData
        this.pageSize = pageData.pageSize
        this.currPage = pageData.currPage
        this.totalPage = pageData.totalPage
        this.totalCount = pageData.totalCount
      })
    },
    handleClick(row) {
      alert(row)
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
