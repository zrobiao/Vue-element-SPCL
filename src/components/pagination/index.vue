<template>
  <div class="pagination-content">
    <div class="block">
      <el-pagination
        :current-page="currPage"
        :page-size="pageSize"
        :total="totalCount"
        layout="total, prev, pager, next"
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"/>
    </div>
  </div>
</template>
<script>
export default {
  props: {
    currPage: {
      type: Number,
      default: 1
    },
    pageSize: {
      type: Number,
      default: 10
    },
    totalCount: {
      type: Number,
      default: 5
    },
    totalPage: {
      type: Number,
      default: 1
    }
  },
  data() {
    return {
    }
  },
  methods: {
    handleSizeChange(val) {
      console.log(`每页 ${val} 条`)
    },
    handleCurrentChange(val) {
      console.log(`当前页: ${val}`)
    }
  }
}
</script>
<style lang="scss" scoped>
.pagination-content{
  margin: 10px;
}
</style>
