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
            stripe
            style="width: 100%">
            <el-table-column
              prop="belongAgent"
              label="渠道用户"/>
            <el-table-column
              prop="successNum"
              label="压标成功量"/>
            <el-table-column
              prop="waitNum"
              label="等待压标量"/>
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
import { getCountVedioYaBiaoCurrentUser } from '@/api/reportForms'
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
        value: 'province',
        label: '归属地'
      }, {
        value: 'makeUser',
        label: '压标账户'
      }], // 设置父级筛选项目
      tableData: [],
      currPage: 1,
      pageSize: 10,
      totalCount: 0,
      totalPage: 0,
      // 设置查询项目query
      query: {
        chooseDate: null,
        province: null,
        makeUser: null
      }
    }
  },
  computed: {

  },
  created() {
    this.countVedioYaBiaoCurrentUser()
  },
  methods: {
    countVedioYaBiaoCurrentUser() {
      getCountVedioYaBiaoCurrentUser().then(res => {
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
    searchSubData(selectMsg, searchMsg) {
      switch (selectMsg) {
        case 'province':
          this.query.province = searchMsg
          break
        case 'makeUser':
          this.query.makeUser = searchMsg
          break
      }
      this.countVedioYaBiaoCurrentUser()
    },
    btnSubmitData() {},
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
