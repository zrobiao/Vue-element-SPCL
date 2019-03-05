import request from '@/utils/request'

// 系统日志接口
// 获取系统日志信息记录
export function getLogList(params) {
  return request({
    url: '/perssion/log/list',
    method: 'get',
    data: params
  })
}

// 订单日志接口
// 获取订单日志信息记录
export function getOrderLogList(params) {
  return request({
    url: '/order/yworderworkflow/list',
    method: 'get',
    data: params
  })
}

// 获取订单日志信息
export function getOrderLogInfo(params) {
  return request({
    url: 'order/yworderworkflow/info/' + params,
    method: 'get'
  })
}

// 保存订单日志信息
export function getSavaOrderLog(params) {
  return request({
    url: 'order/yworderworkflow/save',
    method: 'get',
    data: params
  })
}

// 修改订单日志信息记录
export function getUpdateOrderLog(params) {
  return request({
    url: 'order/yworderworkflow/update',
    method: 'get',
    data: params
  })
}

// 删除订单日志信息记录
export function getDelOrderLog(params) {
  return request({
    url: 'order/yworderworkflow/delete',
    method: 'get',
    data: params
  })
}

// 获取订单用户日志信息记录
export function getUserLogList(params) {
  return request({
    url: 'order/ywphoneworkflow/list',
    method: 'get',
    data: params
  })
}

// 获取订单用户日志信息
export function getUserLogInfo(params) {
  return request({
    url: 'order/ywphoneworkflow/info/' + params,
    method: 'get'
  })
}

// 保存订单用户日志信息
export function getSavaUserLog(params) {
  return request({
    url: 'order/ywphoneworkflow/save',
    method: 'get',
    data: params
  })
}

// 修改订单用户日志信息记录
export function getUpdateUserLog(params) {
  return request({
    url: 'order/ywphoneworkflow/update',
    method: 'get',
    data: params
  })
}

// 删除订单用户日志信息记录
export function getDelUserLog(params) {
  return request({
    url: 'order/ywphoneworkflow/delete',
    method: 'get',
    data: params
  })
}
