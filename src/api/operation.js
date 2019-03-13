import request from '@/utils/request'

// 获取合作商信息审核列表
export function getMsgcheckList(params) {
  return request({
    url: '/order/ywinfoaudit/list',
    method: 'post',
    data: params
  })
}
// 保存合作审核信息
export function getMsgcheckSave(params) {
  return request({
    url: '/order/ywinfoaudit/save',
    method: 'post',
    data: params
  })
}
// 修改合作审核信息
export function getMsgcheckUpdate(params) {
  return request({
    url: '/order/ywinfoaudit/update',
    method: 'post',
    data: params
  })
}
// 获取合作审核信息
export function getMsgcheckListInfo(params) {
  return request({
    url: '/order/ywinfoaudit/info/' + params,
    method: 'get'
    // data: params
  })
}
// 删除合作审核信息
export function getMsgcheckDelete(params) {
  return request({
    url: '/order/ywinfoaudit/delete',
    method: 'post',
    data: [params]
  })
}
// 审核合作审核信息
export function getMsgcheckListAudit(id, type, params) {
  return request({
    url: '/order/ywinfoaudit/audit/' + id + '/' + type,
    method: 'post',
    data: params
  })
}
