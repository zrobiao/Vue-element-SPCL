<template>
  <div>
    <el-row :gutter="15">
      <el-col v-if="showDate" :span="8">
        <!-- <div class="block">
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
        </div> -->
        <label>选择日期：</label>
        <el-date-picker
          v-model="time1"
          type="daterange"
          clearable
          format="yyyy-MM-dd"
          value-format="yyyy-MM-dd"
          range-separator="-"
          start-placeholder="开始日期"
          end-placeholder="结束日期"
          @change="selectTime"/>
      </el-col>
      <el-col v-show="showSearch" :span="5" class="search">
        <label>选择搜索项：</label>
        <el-cascader
          v-model="searchSelect"
          :options="preOptions"
          expand-trigger="hover"
          placeholder="请选择"
          @change="changeHandle"/>
      </el-col>
      <el-col v-show="showSearch&&showInput" :span="6">
        <label>输入内容：</label>
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
        <el-button type="success" icon="el-icon-plus" @click="childAdd(sendParent,'新增')">新增</el-button>
        <el-button v-show="sendParent!=='account'" type="warning" icon="el-icon-edit" @click="childEdit(sendParent,'修改',sendData)">修改</el-button>
        <el-button v-show="sendParent!=='account'" type="danger" icon="el-icon-delete" @click="childRemove(sendParent,'删除',sendData)">删除</el-button>
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
    },
    preOptions: {
      type: Array,
      default: () => {}
    }
  },
  data() {
    return {
      time1: '',
      time2: '',
      searchMsg: '',
      searchSelect: [],
      showInput: true,
      selectMsg: ''
    }
  },
  created() {
    // console.log(this.sendParent)
  },
  methods: {
    getSearchMsg() {
      this.$emit('listenSearch', this.selectMsg, this.searchMsg)
    },
    childAdd(parentData, titName) {
      this.$emit('listenBtn', titName)
    },
    childEdit(parentData, titName, sendData) {
      if (!sendData) {
        return this.$message.error('请选择一个数据选择操作！')
      } else if (sendData === -99) {
        return this.$message.error('不支持多个数据选择操作！')
      }
      this.$emit('listenBtn', titName, sendData)
    },
    childRemove(parentData, titName, sendData) {
      if (!sendData) {
        return this.$message.error('请选择一个数据选择操作！')
      }
      this.$emit('listenBtn', titName, sendData)
    },
    selectTime(val) {
      console.log(val)
    },
    changeHandle(val) {
      this.searchMsg = ''
      if (val.length > 1) {
        this.showInput = false
        this.selectMsg = val[val.length - 2]
        this.searchMsg = val[val.length - 1]
      } else {
        this.selectMsg = val[0]
        this.showInput = true
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
    .el-col{
      display: flex;
      label{
        color: #606266;
        font-size:14px;
        line-height: 40px;
      }
    }
  }
</style>
