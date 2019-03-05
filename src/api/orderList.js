import request from '@/utils/request'

// 获取有效订单列表
export function getValidList(params) {
  return request({
    url: '/order/yworderinfo/effectiveList',
    method: 'POST',
    data: params
  })
}
// 获取作废订单列表
export function getDiscardList(params) {
  return request({
    url: '/order/yworderinfo/invalidList',
    method: 'POST',
    data: { params }
  })
}
// 获取已归档订单列表
export function getArchiveList(params) {
  return request({
    url: '/order/yworderinfo/archivedList',
    method: 'POST',
    data: { params }
  })
}
// 获取待制作订单列表
export function getWaitMakeList(params) {
  return request({
    url: '/order/yworderinfo/waitMakeList',
    method: 'POST',
    data: { params }
  })
}
// 订单作废操作
export function getInvalidOrder(params) {
  return request({
    url: '/order/yworderinfo/invalidOrder/' + params,
    method: 'POST'
    // data: { params }
  })
}
// 订单回退--制作打回,重新提交
export function getBackOrder(params) {
  return request({
    url: '/order/yworderinfo/backOrder/' + params,
    method: 'POST'
    // data: { params }
  })
}
// 视频制作-接单
export function getMakeOrder(params) {
  return request({
    url: '/order/yworderinfo/makeOrder/' + params,
    method: 'POST'
    // data: { params }
  })
}
// 获取等待客户确认视频订单列表
export function getWaitConfirmList(params) {
  return request({
    url: '/order/yworderinfo/waitConfirmList',
    method: 'POST',
    data: { params }
  })
}
// 获取等待压标视频订单信息列表
export function getWaitYaBiaoList(params) {
  return request({
    url: '/order/yworderinfo/waitYaBiaoList',
    method: 'POST',
    data: { params }
  })
}
// 获取等待开通用户视频订单列表
export function getWaitOpenList(params) {
  return request({
    url: '/order/yworderinfo/waitOpenList',
    method: 'POST',
    data: { params }
  })
}
// 获取压标完成视频订单列表
export function getFinishYaBiaoList(params) {
  return request({
    url: '/order/yworderinfo/finishYaBiaoList',
    method: 'POST',
    data: { params }
  })
}
// 获取视频制作完成订单列表
export function getFinishMakeList(params) {
  return request({
    url: '/order/yworderinfo/finishMakeList',
    method: 'POST',
    data: { params }
  })
}
// 获取重设视频订单列表
export function getResetOpenList(params) {
  return request({
    url: '/order/yworderinfo/resetOpenList',
    method: 'POST',
    data: { params }
  })
}
// 视频订单归档---订单归档,全部开通
export function getYaBiaoFail(params) {
  return request({
    url: '/order/yworderinfo/yaBiaoFail/' + params,
    method: 'POST'
    // data: { params }
  })
}
// 视频订单归档---订单归档,全部用户开通失败
export function getArchivePartOpen(params) {
  return request({
    url: '/order/yworderinfo/archivePartOpen/' + params,
    method: 'POST'
    // data: { params }
  })
}
// 获取订单详细信息
export function getOrderListInfo(params) {
  return request({
    url: '/order/yworderinfo/info/' + params,
    method: 'get'
    // data: { params }
  })
}
