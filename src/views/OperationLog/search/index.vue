<template>
  <div>
    <el-row :gutter="20">
      <el-col v-if="showDate" :span="5">
        <div class="block order-name">
          <span class="demonstration">起始日期</span>
          <el-date-picker
            v-model="time1"
            align="right"
            type="date"
            placeholder="选择日期"/>
        </div>
      </el-col>
      <el-col v-if="showDate" :span="5">
        <div class="block order-name">
          <span class="demonstration">结束日期</span>
          <el-date-picker
            v-model="time2"
            align="right"
            type="date"
            placeholder="选择日期"/>
        </div>
      </el-col>
      <el-col v-show="showSearch" :span="5">
        <div class="demo-input-suffix order-name">
          <span class="demonstration">操作人</span>
          <el-input
            v-model="searchMsg"
            prefix-icon="el-icon-search"
            placeholder="请输入内容"
            clearable/>
        </div>
      </el-col>
      <el-col v-show="showOrderNo" :span="5">
        <div class="demo-input-suffix order-name">
          <span class="demonstration">订单号</span>
          <el-input
            v-model="searchMsg"
            prefix-icon="el-icon-search"
            placeholder="请输入内容"
            clearable/>
        </div>
      </el-col>
      <el-col v-show="showOrderNo" :span="5">
        <div class="demo-input-suffix order-name">
          <span class="demonstration">节点名称</span>
          <el-input
            v-model="searchMsg"
            prefix-icon="el-icon-search"
            placeholder="请输入内容"
            clearable/>
        </div>
      </el-col>
      <el-col v-show="showSearch" :span="3" class="search-btn">
        <el-button type="primary" @click="getSearchMsg">查询</el-button>
      </el-col>
    </el-row>
  </div>
</template>
<script>
export default {
  props: {
    showDate: {
      type: Boolean,
      default: false
    },
    showSearch: {
      type: Boolean,
      default: false
    },
    showOrderNo: {
      type: Boolean,
      default: false
    },
    sendParent: {
      type: String,
      default: ''
    },
    sendData: {
      type: Number,
      default: 0
    }
  },
  data() {
    return {
      time1: '',
      time2: '',
      searchMsg: '',
      msg: 'hi'
    }
  },
  methods: {
    getSearchMsg() {
      const hintmsg = `关注与查询相关`
      this.$alert(`${hintmsg}`, '测试', {
        confirmButtonText: '确定',
        callback: action => {
          this.$message({
            type: 'info',
            message: `callback: ${hintmsg}`
          })
        }
      })
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
  .search-btn {
      margin-top: 2.16rem
  }
  .order-name {
      margin-top: 1.08rem
  }
</style>
