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
        <el-row class="show-title">
          <el-col>成功用户量共有<span>{{ successNumber }}<span/></span></el-col>
        </el-row>
        <el-row class="show-title">
          <el-col>失败用户量共有<span>{{ failNumber }}<span/></span></el-col>
        </el-row>
        <el-col :span="24">
          <el-table
            :data="tableData"
            stripe
            style="width: 100%">
            <el-table-column
              fixed
              prop="username"
              label="客户账户"/>
            <el-table-column
              prop="nickname"
              label="客户名称"/>
            <el-table-column
              prop="province"
              label="归属地"/>
            <el-table-column
              prop="mobileNum"
              label="移动用户量"/>
            <el-table-column
              prop="telecomNum"
              label="电信用户量"/>
            <el-table-column
              prop="unicomNum"
              label="联通用户量"/>
            <el-table-column
              prop="successNum"
              label="成功用户量"/>
            <el-table-column
              prop="failNum"
              label="失败用户量"/>
            <el-table-column
              prop="countNum"
              label="总用户量"/>
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
  </div>
</template>
<script>
import searchBar from '@/components/search'
import pagingTabs from '@/components/pagination'
import { getCountByUser } from '@/api/reportForms'
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
      successNumber: 0,
      failNumber: 0,
      preOptions: [{
        value: 'userType',
        label: '客户类型',
        children: [{
          value: '1',
          label: '个体客户'
        }, {
          value: '2',
          label: '政企合作户'
        }, {
          value: '3',
          label: '渠道商'
        }]
      }, {
        value: 'username',
        label: '客户账户'
      }, {
        value: 'phoneType',
        label: '运营商',
        children: [{
          value: '1',
          label: '移动'
        }, {
          value: '2',
          label: '电信'
        }, {
          value: '3',
          label: '联通'
        }]
      }], // 设置父级筛选项目
      tableData: [],
      currPage: 1,
      pageSize: 10,
      totalCount: 0,
      totalPage: 0,
      // 设置查询项目query
      query: {
        userType: null,
        username: null,
        phoneType: null,
        chooseDate: null
      }
    }
  },
  computed: {

  },
  created() {
    this.countByUser()
  },
  methods: {
    countByUser() {
      getCountByUser().then(res => {
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
        case 'userType':
          this.query.userType = searchMsg
          break
        case 'username':
          this.query.username = searchMsg
          break
        case 'phoneType':
          this.query.phoneType = searchMsg
          break
      }
      this.countByUser()
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
      margin-left: 15px;
      span{
        color:#409EFF;
        margin-left: 15px;
      }
    }
  }
}
</style>
