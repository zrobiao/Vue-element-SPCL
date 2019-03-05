<template>
  <div>
    <el-row>
      <el-col v-show="showSearch" :span="6">
        <div class="demo-input-suffix search">
          <el-input
            v-model="searchMsg"
            prefix-icon="el-icon-search"
            placeholder="请输入订单号"
            clearable
            style="width:200px;"/>
        </div>
      </el-col>
      <el-col v-show="showState" :span="6">
        <div class="demo-input-suffix state">
          <el-input
            v-model="searchMsg"
            prefix-icon="el-icon-search"
            placeholder="请输入订单状态"
            clearable
            style="width:200px;"/>
        </div>
      </el-col>
      <el-col v-show="showNum" :span="6">
        <div class="demo-input-suffix number">
          <el-input
            v-model="searchMsg"
            prefix-icon="el-icon-search"
            placeholder="请输入商户账号"
            clearable
            style="width:200px;"/>
        </div>
      </el-col>
      <el-col v-if="showDate" :span="5">
        <div class="block date">
          <el-date-picker
            v-model="time1"
            align="right"
            type="date"
            placeholder="起始日期"
            style="width:200px;"/>
        </div>
      </el-col>
      <el-col v-if="showDate" :span="5" class="date">
        <div class="block">
          <el-date-picker
            v-model="time2"
            align="right"
            type="date"
            placeholder="结束日期"
            style="width:200px;margin-left:-32px;"/>
        </div>
      </el-col>
      <el-col v-show="showSearch" :span="3" class="btn-search">
        <el-button type="primary" @click="getSearchMsg">查询</el-button>
      </el-col>
      <el-col :span="24" class="dia-Title">
        <el-col v-show="showBtn" :span="12">
          <el-button type="warning" icon="el-icon-back" @click="orderBack(sendParent,'订单回退',sendData)">订单回退(制作视频)</el-button>
          <el-button type="success" icon="el-icon-upload" @click="videoUpload(sendParent,'上传视频(压标)',sendData)">上传视频(压标)</el-button>
        </el-col>
      </el-col>
    </el-row>
  </div>
</template>
<script>
export default {
  props: {
    showSearch: {
      type: Boolean,
      default: false
    },
    showBtn: {
      type: Boolean,
      default: false
    },
    showDate: {
      type: Boolean,
      default: false
    },
    showState: {
      type: Boolean,
      default: false
    },
    showNum: {
      type: Boolean,
      default: false
    },
    sendParent: {
      type: String,
      default: ''
    }
  },
  data() {
    return {
      searchMsg: '',
      inline: true,
      time1: '',
      time2: ''
    }
  },
  methods: {
    getSearchMsg: function() {

    },
    orderInvalid: function() {
      alert('作废订单')
      this.$router.push('/order/yworderinfo/invalidList')
    },
    orderBack: function() {},
    videoUpload: function() {}
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
.dia-Title {
  margin-top: 0.68rem;
}
.btn-bottom {
  margin-left: -9.62rem;
}
.search {
    margin-top: 0.42rem;
    // margin-left: -4.02rem;
}
.btn-search {
    // margin-left: -3.98rem;
    margin-top: 0.42rem;
}
.date {
    margin-top: 0.42rem;
    // margin-left: -14.92rem;
}
.state {
    margin-top: 0.42rem;
    // margin-left: -4.98rem;
}
.number {
    margin-top: 0.42rem;
    // margin-left: -9.96rem;
}
</style>

