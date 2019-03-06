import request from '@/utils/request'

// 系统日志接口
// 获取系统日志信息记录
export function logList(params) {
  return request({
    url: '/perssion/log/list',
    method: 'post',
    data: params
  })
}

// 获取系统日志详细信息
export function logInfo(params) {
  return request({
    url: 'perssion/log/info/' + params,
    method: 'get'
  })
}

// 订单日志接口
// 获取订单日志信息记录
export function orderLogList(params) {
  return request({
    url: '/order/yworderworkflow/list',
    method: 'post',
    data: params
  })
}

// 获取订单日志详细信息
export function getOrderLogInfo(params) {
  return request({
    url: 'order/yworderworkflow/info/' + params,
    method: 'get'
  })
}

// 获取订单用户日志信息记录
export function userLogList(params) {
  return request({
    url: 'order/ywphoneworkflow/list',
    method: 'post',
    data: params
  })
}

// 获取订单用户日志详细信息
export function getUserLogInfo(params) {
  return request({
    url: 'order/ywphoneworkflow/info/' + params,
    method: 'get'
  })
}

