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
import searchBar from '@/components/search'
import pagingTabs from '@/components/pagination'
import { getFinishYaBiaoList } from '@/api/videoList'
export default {
  components: {
    searchBar,
    pagingTabs
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
      pageSize: 10,
      currPage: 1,
      totalPage: 0,
      totalCount: 0,
      // 设置查询项目query
      query: {
        orderNo: null,
        minTime: null,
        maxTime: null
      }
    }
  },
  computed: {

  },
  created() {
    this.finishYaBiaoList()
  },
  methods: {
    // 子组件传输选择项目给父组件
    searchSubData(selectMsg, searchMsg) {
      switch (selectMsg) {
        case 'orderNo':
          this.query.orderNo = searchMsg
          break
        case 'minTime':
          this.query.minTime = searchMsg
          break
        case 'maxTime':
          this.query.maxTime = searchMsg
          break
      }
    },
    btnSubmitData() {},
    finishYaBiaoList() {
      const obj = {
        pageSize: this.pageSize,
        currPage: this.currPage,
        query: this.query
      }
      getFinishYaBiaoList(obj).then(res => {
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
