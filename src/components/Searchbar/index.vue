<template>
  <div>
    <el-row>
      <el-col v-if="showDate" :span="5">
        <div class="block date">
          <el-date-picker
            v-model="time1"
            align="right"
            type="date"
            placeholder="起始日期"
            style="width:200px;margin-left:-230px;"/>
        </div>
      </el-col>
      <el-col v-if="showDate" :span="5">
        <div class="block date">
          <el-date-picker
            v-model="time2"
            align="right"
            type="date"
            placeholder="结束日期"
            style="width:200px;margin-left:-250px;"/>
        </div>
      </el-col>
      <el-col v-show="showSearch" :span="6" class="search">
        <el-cascader
          :options="options"
          :model-change="changeHandle()"
          placeholder="请选择"
          style="width:120px;"/>
      </el-col>
      <el-col v-show="showSearch" :span="6">
        <div class="demo-input-suffix">
          <el-input
            v-model="searchMsg"
            prefix-icon="el-icon-search"
            placeholder="请输入查询条件"
            clearable
            style="width:200px;margin-left:-160px;margin-top:7px;"/>
        </div>
      </el-col>
      <el-col v-show="showProvince" :span="6" class="province-search">
        <el-cascader
          :options="province"
          :model-change="changeHandle()"
          placeholder="归属地"
          style="width:120px;"/>
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
      <el-col :span="24" class="dia-Title">
        <el-col v-show="showWaitBtn" :span="12">
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
    showSearchBtn: {
      type: Boolean,
      default: false
    },
    showWaitBtn: {
      type: Boolean,
      default: false
    },
    showProvince: {
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
        value: 'enterLinkman',
        label: '企业联系人'
      }, {
        value: 'pressUser',
        label: '压标账户'
      }, {
        value: 'kfUser',
        label: '客户账户'
      }, {
        value: 'makeUser',
        label: '制作账户'
      }, {
        value: 'kfType',
        label: '客户类型'
      }, {
        value: 'enterName',
        label: '企业名称'
      }, {
        value: 'orderNo',
        label: '订单号'
      }, {
        value: 'agent',
        label: '代理商'
      }, {
        value: 'username',
        label: '操作人'
      }, {
        value: 'state',
        label: '状态'
      }],

      province: [{
        value: 'guizhou',
        label: '贵州'
      }, {
        value: 'guangdong',
        label: '广东'
      }, {
        value: 'sichuan',
        label: '四川'
      }, {
        value: 'hunan',
        label: '湖南'
      }, {
        value: 'shanghai',
        label: '上海'
      }, {
        value: 'beijing',
        label: '北京'
      }, {
        value: 'guangxi',
        label: '广西'
      }, {
        value: 'shanxi',
        label: '陕西'
      }, {
        value: 'heilongjiang',
        label: '黑龙江'
      }, {
        value: 'shanxi',
        label: '山西'
      }, {
        value: 'jilin',
        label: '吉林'
      }, {
        value: 'chongqing',
        label: '重庆'
      }, {
        value: 'hebei',
        label: '河北'
      }, {
        value: 'henan',
        label: '河南'
      }, {
        value: 'jiangxi',
        label: '江西'
      }, {
        value: 'yunnan',
        label: '云南'
      }, {
        value: 'zhejiang',
        label: '浙江省'
      }, {
        value: 'shandong',
        label: '山东'
      }, {
        value: 'ningxia',
        label: '宁夏自治区'
      }, {
        value: 'tianjin',
        label: '天津'
      }, {
        value: 'liaoning',
        label: '辽宁'
      }, {
        value: 'anhui',
        label: '安徽'
      }, {
        value: 'fujian',
        label: '福建'
      }, {
        value: 'jiangsu',
        label: '江苏'
      }, {
        value: 'gansu',
        label: '甘肃'
      }, {
        value: 'xinjiang',
        label: '新疆维吾尔'
      }, {
        value: 'hainan',
        label: '海南'
      }, {
        value: 'xizang',
        label: '西藏'
      }, {
        value: 'qinghai',
        label: '青海'
      }, {
        value: 'neimenggu',
        label: '内蒙古'
      }]
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
  margin-top: 12px;
  &:last-child {
    margin-bottom: 0;
  }
}
.dia-Title {
  margin-top: 0.68rem;
}

.search {
  margin-top: 0.42rem;
}
.btn-search {
  margin-left: 330px;
  margin-top:-40px;
}
.date {
  margin-top: 0.42rem;
}
.province-search {
  margin-left: 200px;
  margin-top: -40px;
}
</style>

