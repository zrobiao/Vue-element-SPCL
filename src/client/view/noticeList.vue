<template>
  <el-table :data="tableData5" style="width: 100%">
    <el-table-column type="expand">
      <template slot-scope="props">
        <el-form label-position="left" inline class="demo-table-expand">
          <el-form-item label="公告内容">
            <span>{{ props.row.msg }}</span>
          </el-form-item>
        </el-form>
      </template>
    </el-table-column>
    <el-table-column label="公告日期" prop="data"/>
    <el-table-column label="公告名称" prop="name"/>
    <el-table-column label="公告描述" prop="desc"/>
  </el-table>
</template>

<style>
.demo-table-expand {
  font-size: 0;
}
.demo-table-expand label {
  width: 90px;
  color: #99a9bf;
}
.demo-table-expand .el-form-item {
  margin-right: 0;
  margin-bottom: 0;
  width: 50%;
}
</style>

<script>
export default {
  data() {
    return {
      tableData5: [{
        data: '2/15',
        name: '升级',
        desc: '服务器优化升级',
        msg: '服务器优化升级'
      }, {
        data: '2/15',
        name: '升级',
        desc: '服务器优化升级',
        msg: '服务器优化升级'
      }, {
        data: '2/15',
        name: '升级',
        desc: '服务器优化升级',
        msg: '服务器优化升级'
      }, {
        data: '2/15',
        name: '升级',
        desc: '服务器优化升级',
        msg: '服务器优化升级'
      }]
    }
  }
}
</script>
