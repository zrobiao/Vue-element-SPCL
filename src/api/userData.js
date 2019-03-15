import request from '@/utils/request'
// import axios from 'axios'
// import loginAjax from '@/utils/login'
import Vue from 'vue'
// import { resolve, reject } from 'q'
const _this = new Vue()
export function login(username, password, captcha) {
  const params = _this.qs.stringify({
    username,
    password,
    captcha
  })
  return request({
    url: '/client/login',
    method: 'post',
    data: params,
    headers: {
      'Content-type': 'application/x-www-form-urlencoded;charset=utf-8;'
    }
  })
}

// 账户登出
export function logout() {
  return request({
    url: '/client/logout',
    method: 'get'
  })
}

// 得到当前用户数据
export function getUserData() {
  return request({
    url: '/client/agent/loginInfo',
    method: 'post'
  })
}

// 渠道商列表
export function agentList(params) {
  console.log(params)
  return request({
    url: '/client/agent/list',
    method: 'post',
    data: params
  })
}

// 新增子账户
export function createInfo(params) {
  console.log(params)
  return request({
    url: '/client/agent/createInfo',
    method: 'post',
    data: params
  })
}

// 公告列表
export function noticeList(params) {
  return request({
    url: '/client/notice/list',
    method: 'post',
    data: params
  })
}

// 获取投诉列表
export function complainList(params) {
  return request({
    url: '/client/complain/list',
    method: 'post',
    data: params
  })
}

// 获取区域信息
export function areaList(params) {
  return request({
    url: '/base/area',
    method: 'get',
    params: params
  })
}

// 订单列表
export function videoList(params) {
  return request({
    url: '/client/video/list',
    method: 'post',
    data: params
  })
}

// 查看子账户信息
export function userDetailed(params) {
  return request({
    url: '/client/agent/' + params,
    method: 'get'
  })
}

// 保存用户编辑后的子商户信息
export function modifyInfo(params) {
  return request({
    url: '/client/agent/modifyInfo',
    method: 'patch',
    data: params
  })
}

// 重置密码
export function restPass(_id, params) {
  return request({
    url: '/client/agent/' + _id + '/restPass',
    method: 'put',
    params: params
  })
}

// 提交视频制作订单
export function videoC(params) {
  return request({
    url: '/client/video/create',
    method: 'post',
    data: params
  })
}

// 查询视频订单列表
export function videoL(params) {
  return request({
    url: '/client/video/list',
    method: 'post',
    data: params
  })
}

// 获取素材列表
export function fileL(params) {
  return request({
    url: '/client/file/list',
    method: 'post',
    data: params
  })
}

// 新增素材
export function fileS(params) {
  return request({
    url: '/client/file/save',
    method: 'post',
    data: params
  })
}
