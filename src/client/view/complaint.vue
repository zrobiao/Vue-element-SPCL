<template>
  <!-- 投诉处理 -->
  <!-- <el-row :gutter="20">
    <el-col :span="6">
      <el-input v-model="input10" placeholder="请输入内容" clearable/>
    </el-col>
    <el-col :span="6"/>
    <el-col :span="6"/>
    <el-col :span="6"/>
  </el-row>-->
  <el-table :data="tableData" border="true" fit="true" style="width: 43 %">
    <el-table-column fixed prop="date" label="投诉日期" width="150"/>
    <el-table-column prop="name" label="投诉姓名" width="120"/>
    <el-table-column prop="msg" label="投诉内容" width="300"/>
    <el-table-column prop="zip" label="是否处理" width="120"/>
    <el-table-column fixed="right" label="操作" width="100">
      <template slot-scope="scope">
        <el-button type="text" size="small" @click="handleClick(scope.row)">查看</el-button>
        <el-button type="text" size="small">编辑</el-button>
      </template>
    </el-table-column>
  </el-table>
</template>

<script>
export default {

  data() {
    return {
      input10: '',
      tableData: [{
        date: '2016-05-03',
        name: '王小虎',
        msg: '服务态度恶劣',
        zip: '否'
      }]
    }
  },
  methods: {
    handleClick(row) {
      console.log(row)
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
