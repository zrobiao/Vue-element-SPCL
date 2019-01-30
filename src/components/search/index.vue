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
      <el-col v-show="showBtn" :span="6">
        <el-button type="primary" icon="el-icon-plus" @click="childAdd(sendParent,sendData)">新增</el-button>
        <el-button type="warning" icon="el-icon-edit" @click="childEdit(sendParent,sendData)">修改</el-button>
        <el-button type="danger" icon="el-icon-delete" @click="childRemove(sendParent,sendData)">删除</el-button>
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
      type: String,
      default: ''
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
    childAdd(parentData, sendData) {
      if (parentData === 'menu') {
        console.log('这里显示的是菜单传过来的值')
        this.$emit('listenUp', '新增')
      }
    },
    childEdit(parentData, sendData) {
      if (parentData === 'menu') {
        console.log('这里显示的是菜单传过来的值')
        this.$emit('listenUp', '修改')
      }
    },
    childRemove(parentData, sendData) {
      if (parentData === 'menu') {
        console.log('这里显示的是菜单传过来的值')
        this.$emit('listenUp', '删除')
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
