import request from '@/utils/request'

// 分页查询运营人员信息
export function getAccountOperatorList(params) {
  return request({
    url: '/perssion/user/operatorList',
    method: 'post',
    data: params
  })
}

// 分页查询视频制作人员信息
export function getAccountMakeList(params) {
  return request({
    url: '/perssion/user/makeList',
    method: 'post',
    data: params
  })
}
// 分页查询视频压标人员信息
export function getAccountYaBiaoList(params) {
  return request({
    url: '/perssion/user/yaBiaoList',
    method: 'post',
    data: params
  })
}
// 分页查询视频开通人员信息
export function getAccountOpenList(params) {
  return request({
    url: '/perssion/user/openList',
    method: 'post',
    data: params
  })
}
// 获取用户信息
export function getAccountUserInfo(params) {
  return request({
    url: '/perssion/user/info/' + params,
    method: 'get'
  })
}
// 修改登录用户密码
export function getAccountUpdatePw(params) {
  return request({
    url: '/perssion/user/updatePw',
    method: 'post',
    data: params
  })
}
// 新增用户信息
export function getAccountSave(params) {
  return request({
    url: '/perssion/user/save',
    method: 'post',
    data: params
  })
}
// 修改用户信息
export function getAccountUpdate(params) {
  return request({
    url: '/perssion/user/update',
    method: 'post',
    data: params
  })
}
// 删除用户信息
export function getAccountDelete(params) {
  return request({
    url: '/perssion/user/delete',
    method: 'post',
    data: params
  })
}
// 重置用户密码
export function getAccountResetPass(params, data) {
  return request({
    url: '/perssion/user/resetPass/' + params,
    method: 'post',
    data: data
  })
}
// 启用用户
export function getAccountUseAccount(params) {
  return request({
    url: '/perssion/user/useAccount',
    method: 'post',
    data: params
  })
}
// 禁用用户
export function getAccountStopAccount(params) {
  return request({
    url: '/perssion/user/stopAccount',
    method: 'post',
    data: params
  })
}
// 检测用户名是否存在
export function getAccountCheckUserName(params) {
  return request({
    url: '/perssion/user/checkUserNameIsExit',
    method: 'post',
    data: params
  })
}
/* ---------------这里是分割线----------------------- */
// 检测渠道商用户名是否存在
export function getAgentCheckUserName(params) {
  return request({
    url: '/order/agentuser/checkUserNameIsExit',
    method: 'post',
    data: params
  })
}
// 获取渠道商用户列表信息
export function getAgentAgentUserList(params) {
  return request({
    url: '/order/agentuser/agentUserList',
    method: 'post',
    data: params
  })
}
// 获取政企合作用户列表信息
export function getAgentGovUserList(params) {
  return request({
    url: '/order/agentuser/govUserList',
    method: 'post',
    data: params
  })
}
// 获取个体用户列表信息
export function getAgentCustomerList(params) {
  return request({
    url: '/order/agentuser/customerList',
    method: 'post',
    data: params
  })
}
// 保存渠道商总账户
export function getAgentUserSave(params) {
  return request({
    url: '/order/agentuser/save',
    method: 'post',
    data: params
  })
}
// 获取渠道用户信息
export function getAgentUserInfo(params) {
  return request({
    url: '/order/agentuser/info/' + params,
    method: 'get'
  })
}
// 修改渠道用户信息
export function getAgentUserUpdate(params) {
  return request({
    url: '/order/agentuser/update',
    method: 'post',
    data: params
  })
}
// 删除渠道用户信息
export function getAgentUserDelete(params) {
  return request({
    url: '/order/agentuser/delete',
    method: 'post',
    data: params
  })
}
// 重置渠道用户登录密码
export function getAgentUserResetpw(params) {
  return request({
    url: '/order/agentuser/resetpw/' + params,
    method: 'post'
    // data: params
  })
}
// 启用渠道用户
export function getAgentUserUseAccount(params) {
  return request({
    url: '/order/agentuser/useAccount',
    method: 'post',
    data: params
  })
}
// 禁用渠道用户
export function getAgentUserStopAccount(params) {
  return request({
    url: '/order/agentuser/stopAccount',
    method: 'post',
    data: params
  })
}
