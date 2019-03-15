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

<script>
import { noticeList } from '@/api/userData'
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
  },
  created() {
    this.notice()
  },
  mounted() {
  },
  methods: {
    notice() {
      const obj = {
        pageSize: 5,
        currPage: 1,
        query: '公告内容'
      }
      // console.log(obj)
      noticeList(obj).then(res => {
        console.log(res)
      })
    }
  }
}
</script>
