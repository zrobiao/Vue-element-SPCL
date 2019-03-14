<template>
  <div>
    <el-row :gutter="15">
      <h3 class="infotitle">基本信息</h3>
      <el-col :span="6" class="el-col-dafine">
        <span>企业名称：</span>&nbsp;&nbsp;&nbsp;<span class="showhint">{{ diaInfo.enterName }}</span>
      </el-col>
      <el-col :span="6" class="el-col-dafine">
        <span>企业联系人：</span>&nbsp;&nbsp;&nbsp;<span class="showhint">{{ diaInfo.enterContact }}</span>
      </el-col>
      <el-col :span="6" class="el-col-dafine">
        <span>联系电话：</span>&nbsp;&nbsp;&nbsp;<span class="showhint">{{ diaInfo.enterTel }}</span>
      </el-col>
      <el-col :span="6" class="el-col-dafine">
        <span>归属省份&nbsp;/&nbsp;城市</span>&nbsp;&nbsp;&nbsp;<span class="showhint">{{ diaInfo.province }}&nbsp;/&nbsp;{{ diaInfo.city }}</span>
      </el-col>
    </el-row>
    <el-row>
      <el-col :span="6" class="el-col-dafine">
        <span>QQ</span>&nbsp;&nbsp;&nbsp;<span class="showhint">{{ diaInfo.qq }}</span>
      </el-col>
      <el-col :span="6" class="el-col-dafine">
        <span>微信：</span>&nbsp;&nbsp;&nbsp;<span class="showhint"> {{ diaInfo.weixin }}</span>
      </el-col>
      <el-col :span="6" class="el-col-dafine">
        <span>所属代理商：</span>&nbsp;&nbsp;&nbsp;<span class="showhint"> {{ diaInfo.agentId }}</span>
      </el-col>
    </el-row>
    <el-row :gutter="15">
      <el-col :span="6" class="el-col-dafine">
        <span>特需说明</span>&nbsp;&nbsp;&nbsp;
        <p class="showhint">{{ diaInfo.needRemark }}</p>
      </el-col>
    </el-row>
    <el-row :gutter="15">
      <h3 class="infotitle">订单信息</h3>
      <el-col :span="6" class="el-col-dafine">
        <span>视频订单号：</span>&nbsp;&nbsp;&nbsp;<span class="showhint">{{ diaInfo.orderNo }}</span>
      </el-col>
      <el-col :span="6" class="el-col-dafine">
        <span>订单状态：</span>&nbsp;&nbsp;&nbsp;
        <order-state :order-stus="diaInfo.orderState" style="display:inline-block;color:#F56C6C"/>
      </el-col>
      <el-col :span="4" class="el-col-dafine">
        <span>开通类型：</span>&nbsp;&nbsp;&nbsp;
        <el-tag v-show="diaInfo.openType ===1" type="success" disable-transitions>移动</el-tag>
        <el-tag v-show="diaInfo.openType ===2" type="warning" disable-transitions>联通</el-tag>
        <el-tag v-show="diaInfo.openType ===3" type="warning" disable-transitions>电信</el-tag>
      </el-col>
      <el-col :span="6" class="el-col-dafine">
        <span>订单创建日期：</span>&nbsp;&nbsp;&nbsp;<span class="showhint">{{ diaInfo.createTime }}</span>
      </el-col>
    </el-row>
    <el-row :gutter="15">
      <el-col :span="4" class="el-col-dafine">
        <span>资费：</span>&nbsp;&nbsp;&nbsp;<span class="showhint">{{ diaInfo.openMoney }}</span>
      </el-col>
      <el-col :span="4" class="el-col-dafine">
        <span>制作费：</span>&nbsp;&nbsp;&nbsp;<span class="showhint">{{ diaInfo.makeMoney }}</span>
      </el-col>
      <el-col :span="4" class="el-col-dafine">
        <span>素材类型：</span>&nbsp;&nbsp;&nbsp;
        <el-tag v-show="diaInfo.makeFlag ===1" type="success" disable-transitions>待制作</el-tag>
        <el-tag v-show="diaInfo.makeFlag ===2" type="warning" disable-transitions>成品</el-tag>
      </el-col>
      <el-col :span="4" class="el-col-dafine">
        <span>是否压标：</span>&nbsp;&nbsp;&nbsp;
        <el-tag v-show="diaInfo.repressFlag ===1" type="success" disable-transitions>是</el-tag>
        <el-tag v-show="diaInfo.repressFlag ===2" type="warning" disable-transitions>否</el-tag>
      </el-col>
      <el-col :span="4" class="el-col-dafine">
        <span>订单来源：</span>&nbsp;&nbsp;&nbsp;
        <el-tag v-show="diaInfo.orderResources ===1" type="success" disable-transitions>个体户</el-tag>
        <el-tag v-show="diaInfo.orderResources ===2" type="warning" disable-transitions>政企合作</el-tag>
        <el-tag v-show="diaInfo.orderResources ===3" type="warning" disable-transitions>渠道商</el-tag>
      </el-col>
    </el-row>
    <el-row :gutter="15">
      <el-col v-if="diaInfo.makeFlag ===1" :span="6" class="el-col-dafine">
        <span>制作完成人&nbsp;/&nbsp;完成时间:</span>&nbsp;&nbsp;&nbsp;
        <span class="showhint">{{ diaInfo.makeUserName===null?'...':diaInfo.makeUserName }}&nbsp;/&nbsp;{{ diaInfo.makeTime===null?'...':diaInfo.makeTime }}</span>
      </el-col>
      <el-col v-if="diaInfo.repressFlag ===1" :span="6" class="el-col-dafine">
        <span>压标完成人&nbsp;/&nbsp;完成时间:</span>&nbsp;&nbsp;&nbsp;
        <span class="showhint">{{ diaInfo.repressUserName===null?'...':diaInfo.repressUserName }}&nbsp;/&nbsp;{{ diaInfo.repressTime===null?'...':diaInfo.repressTime }}</span>
      </el-col>
      <el-col :span="6" class="el-col-dafine">
        <span>开通完成人&nbsp;/&nbsp;完成时间:</span>&nbsp;&nbsp;&nbsp;
        <span class="showhint">{{ diaInfo.openUserName===null?'...':diaInfo.openUserName }}&nbsp;/&nbsp;{{ diaInfo.openTime===null?'...':diaInfo.openTime }}</span>
      </el-col>
      <el-col :span="6" class="el-col-dafine">
        <span>当前节点最晚完成时间:</span>&nbsp;&nbsp;&nbsp;<span class="showhint">{{ diaInfo.nodeMaxtime===null?'...':diaInfo.nodeMaxtime }}</span>
      </el-col>
    </el-row>
    <el-row :gutter="15">
      <el-col :span="6" class="el-col-dafine">
        <span>订单备注</span>&nbsp;&nbsp;&nbsp;
        <p class="showhint">{{ diaInfo.opreaBz }}</p>
      </el-col>
    </el-row>
    <!-- <el-row>
      <el-col :span="6" :offset="6" class="el-col-dafine">
        <el-button type="warning" @click="closeDialog">返回</el-button>
      </el-col>
      <el-col :span="6" class="el-col-dafine">
        <el-button type="primary" @click="sureDialog">确认</el-button>
      </el-col>
    </el-row> -->
  </div>
</template>
<script>
import orderState from '../../OrderManage/orderstate'
export default {
  components: {
    orderState
  },
  props: {
    diaInfo: {
      type: Object,
      default: () => { '信息字段' }
    }
  },
  data() {
    return {
      menuName: ''
    }
  },
  created() {},
  mounted() {
  },
  methods: {
    // closeDialog() {
    //   this.openTree = false
    //   this.$emit('dialogChild')
    // },
    // sureDialog() {
    //   if (!this.saveData.deptId) {
    //     return this.$message.error('所属部门不能为空！')
    //   }
    //   this.saveData.menuIdList = this.$refs.menuTree.getCheckedKeys()
    //   this.saveData.deptIdList = this.$refs.roleTree2.getCheckedKeys()
    //   this.saveData.roleName = this.roleInfo.roleName
    //   this.saveData.remark = this.roleInfo.remark
    //   console.log(this.roleInfo)
    //   console.log(this.saveData)
    //   if (this.diaData === '新增') {
    //     this.$emit('dialogChild', 0, this.saveData)
    //   } else if (this.diaData === '修改') {
    //     this.$emit('dialogChild', 1, this.saveData)
    //   }
    //   this.openTree = false
    // }
  }
}
</script>
<style lang="scss" scoped>
$primary-color:#409EFF;
$warning-color:#E6A23C;
$danger-color:#F56C6C;
$gray-color:#909399;

.el-row {
    margin-bottom: 20px;
    &:last-child {
      margin-bottom: 0;
    }
    .infotitle{
      color:#409EFF;
      padding: 12px 0;
      border-bottom: 1px solid #409EFF;
    }
  }
  .el-col-dafine{
    line-height: 40px;
    font-size: 15px;
    font-weight: 700;
    .showhint{
      color: #909399;
      padding: 8px 20px;
      border-radius: 5px;
      border:1px solid #dcdfe6;
    }
  }
</style>
