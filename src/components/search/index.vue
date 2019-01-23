<template>
  <div>
    <el-row :gutter="20">
      <el-col v-if="showDate" :span="5">
        <div class="block">
          <span class="demonstration">起始日期</span>
          <el-date-picker
            v-model="time1"
            align="right"
            type="date"
            placeholder="选择日期"/>
        </div>
      </el-col>
      <el-col v-if="showDate" :span="5">
        <div class="block">
          <span class="demonstration">结束日期</span>
          <el-date-picker
            v-model="time2"
            align="right"
            type="date"
            placeholder="选择日期"/>
        </div>
      </el-col>
      <el-col :span="6">
        <div class="demo-input-suffix">
          <el-input
            v-model="searchMsg"
            prefix-icon="el-icon-search"
            placeholder="请输入内容"
            clearable/>
        </div>
      </el-col>
      <el-col :span="6">
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
      default: true
    }
  },
  data() {
    return {
      time1: '',
      time2: '',
      searchMsg: ''
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
</style>
