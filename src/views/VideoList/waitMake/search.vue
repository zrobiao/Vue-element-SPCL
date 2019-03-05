<template>
  <div>
    <el-row>
      <el-col v-show="showEnter" :span="6">
        <div class="demo-input-suffix">
          <el-input
            v-model="searchMsg"
            prefix-icon="el-icon-search"
            placeholder="请输入企业名称"
            clearable
            style="width:200px;"/>
        </div>
      </el-col>
      <el-col v-show="showSearch" :span="6">
        <div class="demo-input-suffix">
          <el-input
            v-model="searchMsg"
            prefix-icon="el-icon-search"
            placeholder="请输入企业联系人"
            clearable
            style="width:200px;margin-left:-80px;"/>
        </div>
      </el-col>
      <el-col v-show="showSearch" :span="6">
        <div class="demo-input-suffix">
          <el-input
            v-model="searchMsg"
            prefix-icon="el-icon-search"
            placeholder="请输入订单号"
            clearable
            style="width:200px;margin-left:-160px;"/>
        </div>
      </el-col>
      <el-col v-show="showSearch" :span="6">
        <div class="demo-input-suffix">
          <el-input
            v-model="searchMsg"
            prefix-icon="el-icon-search"
            placeholder="请输入代理商"
            clearable
            style="width:200px;margin-left:-240px;"/>
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
      <el-col v-if="showDate" :span="5">
        <div class="block date">
          <el-date-picker
            v-model="time2"
            align="right"
            type="date"
            placeholder="结束日期"
            style="width:200px;margin-left:-32px;"/>
        </div>
      </el-col>
      <el-col v-show="showState" :span="6" class="search">
        <el-cascader :options="options" :model-change="changeHandle()" placeholder="请选择状态"/>
      </el-col>
      <el-col v-show="showSearchBtn" :span="3" class="btn-search">
        <el-button type="primary" @click="getSearchMsg">查询</el-button>
      </el-col>
      <el-col :span="24" class="dia-Title">
        <el-col v-show="showBtn" :span="12">
          <el-button type="danger" icon="el-icon-error" @click="orderInvalid(sendParent,'作废订单')">作废订单</el-button>
          <el-button type="warning" icon="el-icon-back" @click="orderBack(sendParent,'订单回退',sendData)">订单回退</el-button>
          <el-button type="success" icon="el-icon-upload" @click="videoUpload(sendParent,'上传成品视频',sendData)">上传成品视频</el-button>
        </el-col>
        <el-col v-show="showBtn" :span="12" class="btn-bottom">
          <el-button type="primary" icon="el-icon-circle-check" @click="confirmVideo(sendParent,'客户确认视频',sendData)">客户确认视频</el-button>
          <el-button type="primary" icon="el-icon-download" @click="downloadVideo(sendParent,'下载视频素材',sendData)">下载视频素材</el-button>
        </el-col>
      </el-col>
    </el-row>
  </div>
</template>
<script>
export default {
  props: {
    showEnter: {
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
    showDate: {
      type: Boolean,
      default: false
    },
    showState: {
      type: Boolean,
      default: false
    },
    showSearchBtn: {
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
      time2: '',
      options: [{
        value: 'daijiedan',
        label: '待接单',
        children: [{
          value: 'shipingenghuan',
          label: '视频更换'
        }, {
          value: 'yanbabutongguo',
          label: '客户成品视频，压标不通过'
        }, {
          value: 'dahui',
          label: '制作打回，重新提交'
        }]
      }, {
        value: 'yijiedan',
        label: '已接单',
        children: [{
          value: 'xinzengsucai',
          label: '新增素材，视频更换'
        }, {
          value: 'shenhebutongguo',
          label: '压标审核不通过'
        }, {
          value: 'yunyingshang',
          label: '运营商审核不通过'
        }, {
          value: 'kehu',
          label: '客户确认不通过'
        }]
      }]
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
    videoUpload: function() {},
    confirmVideo: function() {},
    downloadVideo: function() {},
    changeHandle: function() {

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
.dia-Title {
  margin-top: 0.68rem;
}
.btn-bottom {
  margin-left: -9.62rem;
}
.search {
    // float: right;
    margin-top: 0.42rem;
    // margin-left: -4.02rem;
}
.btn-search {
    margin-left: -3.98rem;
    margin-top: 0.42rem;
}
.date {
    margin-top: 0.42rem;
}
</style>

