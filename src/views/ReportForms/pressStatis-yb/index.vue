<template>
  <div class="main-content">
    <search-bar
      :show-date="isShow"
      :show-province="isProvince"
      :show-btn="isBtn"/>
    <div class="show-container">
      <el-row>
        <el-col class="show-title">订单列表显示数据<span>{{ number }}</span>条</el-col>
      </el-row>
      <el-row>
        <el-col :span="24">
          <el-table
            :data="tableData"
            border
            stripe
            style="width: 100%">
            <el-table-column
              type="selection"/>
            <el-table-column
              prop="date"
              label="日期"/>
            <el-table-column
              prop="name"
              label="压标账户名称"/>
            <el-table-column
              prop="number"
              label="压标账户"/>
            <el-table-column
              prop="success"
              label="压标成功量"/>
            <el-table-column
              prop="province"
              label="待压标量"/>
            <el-table-column
              prop="address"
              label="总数"/>
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
import searchBar from './../userStatis-kf/search/index'
import pagingTabs from '@/components/pagination'
export default {
  components: {
    searchBar,
    pagingTabs
  },
  data() {
    return {
      isShow: true,
      isProvince: true,
      isBtn: true,
      number: 1000,
      tableData: [{
        date: '2016-05-03',
        number: '1234',
        success: '11111',
        name: '王小虎',
        province: '上海',
        address: '444'
      }, {
        date: '2016-05-02',
        name: '王小虎',
        number: '1234',
        success: '11111',
        province: '上海',
        address: '333'
      }, {
        date: '2016-05-04',
        name: '王小虎',
        number: '1234',
        success: '11111',
        province: '上海',
        address: '234'
      }, {
        date: '2016-05-01',
        name: '王小虎',
        number: '1234',
        success: '11111',
        province: '上海',
        address: '567'
      }]
    }
  },
  computed: {

  },
  created() {

  },
  methods: {
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
