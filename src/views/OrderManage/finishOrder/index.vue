<template>
  <div class="main-content">
    <search-bar :show-search="isDate" :show-date="isSearch">
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
                type="selection"
                width="55"/>
              <el-table-column
                fixed
                prop="date"
                label="日期"
                width="150"/>
              <el-table-column
                prop="name"
                label="姓名"
                width="120"/>
              <el-table-column
                prop="province"
                label="省份"
                width="120"/>
              <el-table-column
                prop="city"
                label="市区"
                width="120"/>
              <el-table-column
                prop="address"
                label="地址"
                width="300"/>
              <el-table-column
                prop="zip"
                label="邮编"
                width="120"/>
              <el-table-column
                fixed="right"
                label="操作"
                width="100">
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
  </search-bar></div>
</template>
<script>
import searchBar from '@/components/search'
import pagingTabs from '@/components/pagination'
export default {
  components: {
    searchBar,
    pagingTabs
  },
  data() {
    return {
      isDate: true,
      isSearch: true,
      number: 1000,
      tableData: [{
        date: '2016-05-03',
        name: '王小虎',
        province: '上海',
        city: '普陀区',
        address: '上海市普陀区金沙江路 1518 弄',
        zip: 200333
      }, {
        date: '2016-05-02',
        name: '王小虎',
        province: '上海',
        city: '普陀区',
        address: '上海市普陀区金沙江路 1518 弄',
        zip: 200333
      }, {
        date: '2016-05-04',
        name: '王小虎',
        province: '上海',
        city: '普陀区',
        address: '上海市普陀区金沙江路 1518 弄',
        zip: 200333
      }, {
        date: '2016-05-01',
        name: '王小虎',
        province: '上海',
        city: '普陀区',
        address: '上海市普陀区金沙江路 1518 弄',
        zip: 200333
      }]
    }
  },
  computed: {

  },
  created() {

  },
  methods: {
    handleClick(row) {
      console.log(row)
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
