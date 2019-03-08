import request from '@/utils/request'
// import axios from 'axios'
import Vue from 'vue'
const _this = new Vue()
// 修改账户登陆密码
export function editUserPsd(params) {
  const param = _this.qs.stringify(params)
  return request({
    url: 'perssion/user/password',
    method: 'post',
    data: param,
    headers: {
      'Content-type': 'application/x-www-form-urlencoded;charset=utf-8;'
    }
  })
}

// 获取菜单列表信息
export function getMenuList() {
  return request({
    url: '/perssion/menu/nav',
    method: 'get'
  })
}
// 获取选择菜单接口
export function getSelectList() {
  return request({
    url: '/perssion/menu/select',
    method: 'get'
  })
}

// 获取菜单详细信息
export function getMenuInfo(menuId) {
  return request({
    url: '/perssion/menu/info/' + menuId,
    method: 'get'
  // params: { menuId }
  })
}

// 新增保存菜单信息
export function saveMenuInfo(params) {
  return request({
    url: '/perssion/menu/save',
    method: 'post',
    data: params
  })
}
// 修改保存菜单信息
export function updataMenuInfo(params) {
  return request({
    url: '/perssion/menu/update',
    method: 'post',
    data: params
  })
}
// 删除菜单项
export function delMenuAbout(menuId) {
  return request({
    url: '/perssion/menu/delete',
    method: 'get',
    params: { menuId }
  })
}

// 获取部门选择列表
export function getDeptSelect() {
  return request({
    url: '/perssion/dept/nav',
    method: 'get'
  })
}
// 获取部门详情信息
export function getDeptInfo(params) {
  return request({
    url: 'perssion/dept/info/' + params,
    method: 'get'
  })
}
// 删除部门信息
export function delDeptInfo(deptId) {
  const param = _this.qs.stringify({
    deptId
  })
  return request({
    url: '/perssion/dept/delete',
    method: 'post',
    data: param,
    headers: {
      'Content-type': 'application/x-www-form-urlencoded;charset=utf-8;'
    }
  })
}
// 新增保存部门信息
export function saveDeptInfo(params) {
  return request({
    url: '/perssion/dept/save',
    method: 'post',
    data: params
  })
}
// 修改保存部门信息
export function updataDeptInfo(params) {
  return request({
    url: '/perssion/dept/update',
    method: 'post',
    data: params
  })
}

// 获取角色列表
export function getRoleList() {
  return request({
    url: '/perssion/role/list',
    method: 'get'
  })
}
// 获取角色详细信息
export function getRoleInfo(roleId) {
  return request({
    url: '/perssion/role/info/' + roleId,
    method: 'get'
  })
}
// 删除角色信息
export function delRoleInfo(roleId) {
  return request({
    url: '/perssion/role/delete',
    method: 'post',
    data: [roleId]
  })
}
// 新增保存角色信息
export function saveRoleInfo(params) {
  return request({
    url: '/perssion/role/save',
    method: 'post',
    data: params
  })
}
// 修改保存角色信息
export function updataRoleInfo(params) {
  return request({
    url: '/perssion/role/update',
    method: 'post',
    data: params
  })
}

// 参数管理界面接口地址
// 获取参数信息列表
export function getParmasList(params) {
  return request({
    url: '/perssion/config/list',
    method: 'post',
    data: params
  })
}
// 保存参数信息
export function saveParmasInfo(params) {
  return request({
    url: 'perssion/config/save',
    method: 'post',
    data: params
  })
}
// 更新保存参数信息
export function updateParmasInfo(params) {
  return request({
    url: '/perssion/config/update',
    method: 'post',
    data: params
  })
}
// 删除参数信息
export function delParmasInfo(params) {
  return request({
    url: '/perssion/config/delete',
    method: 'post',
    data: [params]
  })
}
// 获取参数详细信息
export function getParmasInfo(params) {
  return request({
    url: '/perssion/config/info/' + params,
    method: 'get'
  })
}

// 字典管理界面接口地址
// 获取字典信息列表
export function getDictList(params) {
  return request({
    url: '/perssion/dict/list',
    method: 'post',
    data: params
  })
}
// 保存字典信息
export function saveDictInfo(params) {
  return request({
    url: '/perssion/dict/save',
    method: 'post',
    data: { params }
  })
}
// 更新保存字典信息
export function updateDictInfo(params) {
  return request({
    url: '/perssion/dict/update',
    method: 'post',
    data: { params }
  })
}
// 删除字典信息
export function delDictInfo(params) {
  return request({
    url: '/perssion/dict/delete',
    method: 'post',
    data: [params]
  })
}
// 获取字典详细信息
export function getDictInfo(params) {
  return request({
    url: '/perssion/dict/info/' + params,
    method: 'get'
  })
}

// 获取地区信息列表
export function getAreamsgList(params) {
  return request({
    url: '/perssion/sysareainfo/list',
    method: 'post',
    data: params
  })
}

// 获取手机号码段信息列表
export function getPhoneareaList(params) {
  return request({
    url: '/perssion/sysphoneareainfo/list',
    method: 'post',
    data: params
  })
}

// 公告信息管理相关
// 获取公告列表
export function getNoticeList(params) {
  return request({
    url: 'perssion/sysnotice/list',
    method: 'post',
    data: params
  })
}
// 保存公告信息
export function saveNoticeInfo(params) {
  return request({
    url: '/perssion/sysnotice/save',
    method: 'post',
    data: {
      params
    }
  })
}
// 更新保存公告信息
export function updateNoticeInfo(params) {
  return request({
    url: '/perssion/sysnotice/update',
    method: 'post',
    data: {
      params
    }
  })
}
// 删除公告信息
export function delNoticeInfo(params) {
  return request({
    url: '/perssion/sysnotice/delete',
    method: 'post',
    data: [params]
  })
}
// 获取公告详细信息
export function getNoticeInfo(params) {
  return request({
    url: '/perssion/sysnotice/info/' + params,
    method: 'get'
  })
}

// 投诉管理相关
// 获取投诉列表
export function getComplainList(params) {
  return request({
    url: '/order/ywcomplain/list',
    method: 'post',
    data: params
  })
}
// 保存投诉信息
export function saveComplainInfo(params) {
  return request({
    url: '/order/ywcomplain/save',
    method: 'post',
    data: { params }
  })
}
// 更新保存投诉信息
export function updateComplainInfo(params) {
  return request({
    url: '/order/ywcomplain/update',
    method: 'post',
    data: { params }
  })
}
// 删除投诉信息
export function delComplainInfo(params) {
  return request({
    url: '/order/ywcomplain/delete',
    method: 'post',
    data: [params]
  })
}
// 处理投诉信息
export function handleComplainInfo(params) {
  return request({
    url: '/order/ywcomplain/handleComplain/',
    method: 'post',
    data: params
  })
}
// 获取投诉详细信息
export function getComplainInfo(params) {
  return request({
    url: '/order/ywcomplain/info/' + params,
    method: 'get'
  })
}
