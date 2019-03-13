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
    <div>
      <el-row>
        <el-col :span="24">
          <el-table
            :data="logData"
            border
            stripe
            style="width: 100%">
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
import searchBar from '@/components/search'
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
      isBtn: false,
      preParent: 'menu',
      upData: 0,
      preOptions: [],
      logData: [],
      currPage: 1,
      pageSize: 10,
      totalCount: 5,
      totalPage: 1,
      query: {
        username: null,
        minTime: null,
        maxTime: null
      }
    }
  },
  created() {
    this.getlogList()
  },
  methods: {
    btnSubmitData() {},
    searchSubData(selectMsg, searchMsg) {
      switch (selectMsg) {
        case 'username':
          this.query.username = searchMsg
          break
      }
      this.getlogList()
    },
    getlogList() {
      const params = {
        pageSize: this.pageSize,
        currPage: this.currPage,
        query: this.query
      }
      logList(params).then(res => {
        if (res.code === 0) {
          const status = res.data.opreaState
          if (status) {
            const resData = res.data.data
            this.currPage = resData.currPage
            this.pageSize = resData.pageSize
            this.totalCount = resData.totalCount
            this.totalPage = resData.totalPage
            this.logData = resData.list
            this.query.username = null
          } else {
            this.$message.error(res.data.msg)
          }
        } else {
          this.$message.error(res.msg)
        }
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
