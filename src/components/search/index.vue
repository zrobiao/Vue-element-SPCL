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
      <el-col v-show="showSearch" :span="6">
        <div class="demo-input-suffix">
          <el-input
            v-model="searchMsg"
            prefix-icon="el-icon-search"
            placeholder="请输入内容"
            clearable/>
        </div>
      </el-col>
      <el-col v-show="showSearch" :span="3">
        <el-button type="primary" @click="getSearchMsg">查询</el-button>
      </el-col>
      <el-col v-show="showBtn" :span="8">
        <el-button type="primary" icon="el-icon-plus" @click="childAdd(sendParent,'新增')">新增</el-button>
        <el-button type="warning" icon="el-icon-edit" @click="childEdit(sendParent,'修改',sendData)">修改</el-button>
        <el-button type="danger" icon="el-icon-delete" @click="childRemove(sendParent,'删除',sendData)">删除</el-button>
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
    showBtn: {
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
    },
    childAdd(parentData, titName) {
      if (parentData === 'menu') {
        this.$emit('listenUp', titName)
      }
    },
    childEdit(parentData, titName, sendData) {
      if (parentData === 'menu') {
        if (!sendData) {
          return this.$message.error('请选择一个菜单进行操作！')
        }
        this.$emit('listenUp', titName, sendData)
      }
    },
    childRemove(parentData, titName, sendData) {
      if (parentData === 'menu') {
        if (!sendData) {
          return this.$message.error('请选择一个菜单进行操作！')
        }
        this.$emit('listenUp', titName, sendData)
      }
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
