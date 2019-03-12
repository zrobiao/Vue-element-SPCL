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
            stripe>
            <el-table-column
              prop="belongAgent"
              label="渠道用户"/>
            <el-table-column
              prop="successNum"
              label="制作成功量"/>
            <el-table-column
              prop="waitNum"
              label="等待制作量"/>
            <el-table-column
              prop="countNum"
              label="总量"/>
            <el-table-column
              label="操作">
              <template slot-scope="scope">
                <el-button type="text" size="small" @click="handleClick(scope.row)">查看</el-button>
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
import { getCountVedioMakeCurrentUser } from '@/api/reportForms'
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
  computed: {

  },
  created() {
    this.countVedioMakeCurrentUser()
  },
  methods: {
    countVedioMakeCurrentUser() {
      const obj = {
        chooseDate: ''
      }
      getCountVedioMakeCurrentUser(obj).then(res => {
        if (res.code === 0) {
          const status = res.data.opreaState
          if (status) {
            const listData = res.data
            this.tableData = listData.data
          } else {
            this.$message.error(res.data.msg)
          }
        } else {
          this.$message.error(res.data.msg)
        }
      })
    },
    // 子组件传输选择项目给父组件
    btnSubmitData() {},
    searchSubData(selectMsg, searchMsg) {
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
      this.countVedioMakeCurrentUser()
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
