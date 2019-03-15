<template>
  <div>
    <span v-show="orderStus ===1" type="success" disable-transitions>待接单</span>
    <span v-show="orderStus ===11" type="warning" disable-transitions>待接单，视频更换</span>
    <span v-show="orderStus ===12" type="warning" disable-transitions>客户成品视频，压标不通过</span>
    <span v-show="orderStus ===13" type="warning" disable-transitions>制作打回，重新提交</span>
    <span v-show="orderStus ===14" type="warning" disable-transitions>制作打回,视频更换</span>
    <span v-show="orderStus ===15" type="warning" disable-transitions>客户成品视频,运营商审核不通过</span>
    <span v-show="orderStus ===2" type="warning" disable-transitions>制作中，已接单</span>
    <span v-show="orderStus ===21" type="warning" disable-transitions>制作中，素材新增,视频更换</span>
    <span v-show="orderStus ===22" type="warning" disable-transitions>制作中,压标审核不通过</span>
    <span v-show="orderStus ===23" type="warning" disable-transitions>制作中,运营商审核不通过</span>
    <span v-show="orderStus ===24" type="warning" disable-transitions>制作中,客户确认视频不通过</span>
    <span v-show="orderStus ===3" type="warning" disable-transitions>等待客户确认</span>
    <span v-show="orderStus ===31" type="warning" disable-transitions>客户确认--更换视频</span>
    <span v-show="orderStus ===4" type="warning" disable-transitions>等待压标，制作视频</span>
    <span v-show="orderStus ===41" type="warning" disable-transitions>等待视频压标,更换视频</span>
    <span v-show="orderStus ===42" type="warning" disable-transitions>客户成品视频压标</span>
    <span v-show="orderStus ===43" type="warning" disable-transitions>等待视频压标,运营商审核不通过</span>
    <span v-show="orderStus ===5" type="warning" disable-transitions>等待开通用户</span>
    <span v-show="orderStus ===51" type="warning" disable-transitions>全部用户更换视频</span>
    <span v-show="orderStus ===52" type="warning" disable-transitions>重设全部用户视频</span>
    <span v-show="orderStus ===53" type="warning" disable-transitions>重设部分用户视频</span>
    <span v-show="orderStus ===54" type="warning" disable-transitions>成品视频开通用户</span>
    <span v-show="orderStus ===55" type="warning" disable-transitions>新增用户</span>
    <span v-show="orderStus ===56" type="warning" disable-transitions>删除用户</span>
    <span v-show="orderStus ===6" type="warning" disable-transitions>归档,全部开通</span>
    <span v-show="orderStus ===61" type="warning" disable-transitions>归档，部分用户开通成功 </span>
    <span v-show="orderStus ===62" type="warning" disable-transitions>归档,全部用户开通失败</span>
    <span v-show="orderStus ===7" type="warning" disable-transitions>订单作废 </span>
    <span v-show="orderStus ===71" type="warning" disable-transitions>订单作废，客户作废</span>
    <span v-show="orderStus ===72" type="warning" disable-transitions>订单作废，制作人员作废</span>
    <span v-show="orderStus ===73" type="warning" disable-transitions>订单作废,客户成品视频运营商审核不通过</span>
  </div>
</template>
<script>
export default {
  props: {
    orderStus: {
      type: Number,
      default: 0
    }
  }
}
</script>
<style lang="scss" scoped>
  span{color:#F56C6C}
</style>
