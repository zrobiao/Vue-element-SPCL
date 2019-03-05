<template>
  <div>
    <div class="show-container">
      <el-row>
        <el-col :span="24">
          <el-table
            ref="parentMenu"
            :data="tableData"
            stripe
            style="width: 100%">
            <el-table-column
              type="selection"
              width="55"/>
            <el-table-column
              prop="orderId"
              label="订单ID"/>
            <el-table-column
              prop="orderNo"
              label="订单号"
              width="100"/>
            <el-table-column
              prop="orderName"
              label="流程节点名称"
              width="150"/>
            <el-table-column
              prop="orderOprea"
              label="订单操作内容"
              width="150"/>
            <el-table-column
              prop="opreaFlag"
              label="订单操作平台"
              width="150"/>
            <el-table-column
              prop="createTime"
              label="创建时间"
              width="100"/>
            <el-table-column
              prop="time"
              label="订单处理时间"
              width="150"/>
            <el-table-column
              prop="opreaUserId"
              label="订单处理人"
              width="150"/>
            <el-table-column
              prop="opreaUserName"
              label="处理人账户"
              width="150"/>
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
import pagingTabs from '@/components/pagination'
export default {
  components: {
    pagingTabs
  },
  data() {
    return {
      tableData: []
    }
  }
}
</script>
<style lang="scss" scoped>
.el-row {
  margin-bottom: 20px;
  &:last-child {
    margin-bottom: 0;
  }
}
</style>

