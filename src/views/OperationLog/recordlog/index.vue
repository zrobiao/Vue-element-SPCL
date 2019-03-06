<template>
  <div class="big-container">
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
            :data="logData"
            border
            stripe
            style="width: 100%">
            <!-- <el-table-column label="选择" width="65">
              <template slot-scope="scope">
                <el-radio :label="scope.row.code" v-model="logRadio" @change.native="getParentRow(scope.row.id)"> &nbsp; </el-radio>
              </template>
            </el-table-column> -->
            <el-table-column
              prop="id"
              label="Id"/>
            <el-table-column
              prop="username"
              label="用户名"/>
            <el-table-column
              prop="operation"
              label="用户操作"
              width="120"/>
            <el-table-column
              prop="method"
              label="请求方法"
              width="400"/>
            <el-table-column
              prop="params"
              label="请求参数"
              width="400"/>
            <el-table-column
              prop="time"
              label="执行时长(毫秒)"/>
            <el-table-column
              prop="ip"
              label="IP地址"/>
            <el-table-column
              prop="createDate"
              label="创建时间"
              width="120"/>
          </el-table>
        </el-col>
      </el-row>
      <el-row type="flex" justify="end">
        <el-col :span="9">
          <pagi-tabs :curr-page="currPage" :page-size="pageSize" :total-count="totalCount" :total-page="totalPage"/>
        </el-col>
      </el-row>
    </div>
  </div>
</template>
<script>
import { logList } from '@/api/log'
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
      logRadio: '日志选择',
      logData: [],
      upData: 0,
      currPage: 1,
      pageSize: 10,
      totalCount: 5,
      totalPage: 1
    }
  },
  created() {
    this.logList()
  },
  methods: {
    logList() {
      logList().then(res => {
        const pageData = res.page
        const listData = pageData.list
        this.logData = listData
        this.currPage = pageData.currPage
        this.pageSize = pageData.pageSize
        this.totalCount = pageData.totalCount
        this.totalPage = pageData.totalPage
      })
    }
    // getParentRow(id){
    //   alert(id)
    //   this.upData = id
    // }
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

