<template>
  <div class="complain">
    <!-- <h3 class="title">个人信息管理
      <el-button type="primary" width="150" fixed="right">资料编辑</el-button>
    </h3>-->
    <h3 class="title">投诉管理</h3>
    <el-table :data="tableData" border style="width: 100%">
      <el-table-column fixed prop="createTime" label="投诉日期" width="200px"/>
      <el-table-column prop="username" label="投诉电话"/>
      <el-table-column prop="ninckname" label="用户名字"/>
      <el-table-column prop="city" label="投诉内容"/>
      <el-table-column prop="weiXin" label="投诉时间"/>
      <el-table-column prop="mobile" label="联系电话"/>
      <!-- <el-table-column label="是否禁用">
        <template slot-scope="scope">
          <el-radio v-model="radio" label="1">启用</el-radio>
          <el-radio v-model="radio" label="2">禁用</el-radio>
        </template>
      </el-table-column>-->
      <el-table-column label="操作">
        <template slot-scope="scope">
          <el-button type="text" size="small" @click="handleClick(scope.row)">查看</el-button>
          <el-button type="text" size="small">编辑</el-button>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
import { complainList } from '@/api/userData'
import pagiTabs from '@/components/pagination/index'

export default {
  components: {
    pagiTabs
  },
  data() {
    return {
      input10: '',
      tableData: []
    }
  },
  created() {
    this.complain()
  },
  methods: {
    handleClick(row) {
      console.log(row)
    },
    complain() {
      const obj = {
        currPage: 1,
        pageSize: 10,
        query: {
          plainType: -1,
          plainTitle: 'a',
          plainState: -1
        }
      }
      // console.log(obj)
      complainList(obj).then(res => {
        console.log(res)
      })
    }
  }
}
</script>

<style>
.el-row {
  margin-bottom: 20px;
  /* &:last-child {
    margin-bottom: 0;
  } */
}
.el-col {
  border-radius: 4px;
}
.bg-purple-dark {
  background: #99a9bf;
}
.bg-purple {
  background: #d3dce6;
}
.bg-purple-light {
  background: #e5e9f2;
}
.grid-content {
  border-radius: 4px;
  min-height: 36px;
}
.row-bg {
  padding: 10px 0;
  background-color: #f9fafc;
}
</style>
