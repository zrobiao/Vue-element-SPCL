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
            style="width:200px;"
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
            style="width:200px;"
            placeholder="选择日期"/>
        </div>
      </el-col>
      <el-col v-show="showSearch" :span="6">
        <div class="demo-input-suffix">
          <span class="demonstration">客户类型</span>
          <el-input
            v-model="searchMsg"
            prefix-icon="el-icon-search"
            placeholder="请输入内容"
            style="width:200px;"
            clearable/>
        </div>
      </el-col>
      <el-col v-show="showSearch" :span="6">
        <div class="demo-input-suffix">
          <span class="demonstration">客户账户</span>
          <el-input
            v-model="searchMsg"
            prefix-icon="el-icon-search"
            placeholder="请输入内容"
            style="width:200px;"
            clearable/>
        </div>
      </el-col>
      <el-col v-show="showPress" :span="6">
        <div class="demo-input-suffix">
          <span class="demonstration">压标账户</span>
          <el-input
            v-model="searchMsg"
            prefix-icon="el-icon-search"
            placeholder="请输入内容"
            style="width:200px;"
            clearable/>
        </div>
      </el-col>
      <el-col v-show="showMake" :span="6">
        <div class="demo-input-suffix">
          <span class="demonstration">制作账户</span>
          <el-input
            v-model="searchMsg"
            prefix-icon="el-icon-search"
            placeholder="请输入内容"
            style="width:200px;"
            clearable/>
        </div>
      </el-col>
      <el-col v-show="showProvince" :span="6" class="province-search">
        <el-cascader :options="province" :model-change="changeHandle()" placeholder="全国"/>
      </el-col>
      <el-col v-show="showAgent" :span="6" class="agent-search">
        <el-cascader :options="options" :model-change="changeHandle()" placeholder="运营商"/>
      </el-col>
      <el-col v-show="showBtn" :span="3" class="btn-search">
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
    showPress: {
      type: Boolean,
      default: false
    },
    showProvince: {
      type: Boolean,
      default: false
    },
    showAgent: {
      type: Boolean,
      default: false
    },
    showMake: {
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
      msg: 'hi',
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
      }],

      options: [{
        value: 'yidong',
        label: '移动'
      }, {
        value: 'liantong',
        label: '联通'
      }, {
        value: 'dianxin',
        label: '电信'
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
    },
    changeHandle: function() {}
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
.province-search, .agent-search {
    margin-top: 1.2rem;
    margin-left: -1.46rem;
}
.btn-search {
    // margin-left: -3.98rem;
    margin-top: 1.2rem;
}
</style>
