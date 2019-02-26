import request from '@/utils/request'
// import axios from 'axios'
// import Vue from 'vue'
// const _this = new Vue()
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
    url: 'perssion/dept/nav',
    method: 'get'
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
    url: 'perssion/role/info/' + roleId,
    method: 'get'
  })
}

// 删除角色信息
export function delRoleInfo(roleId) {
  return request({
    url: 'perssion/role/delete',
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
    url: 'perssion/config/list',
    method: 'get',
    data: { params }
  })
}
// 保存参数信息
export function saveParmasInfo(params) {
  return request({
    url: 'perssion/config/save',
    method: 'post',
    data: { params }
  })
}
// 更新保存参数信息
export function updateParmasInfo(params) {
  return request({
    url: 'perssion/config/update',
    method: 'post',
    data: { params }
  })
}
// 删除参数信息
export function delParmasInfo(params) {
  return request({
    url: 'perssion/config/delete',
    method: 'post',
    data: [params]
  })
}
// 获取参数详细信息
export function getParmasInfo(params) {
  return request({
    url: 'perssion/config/info/' + params,
    method: 'get'
  })
}

// 字典管理界面接口地址
// 获取字典信息列表
export function getDictList(params) {
  return request({
    url: 'perssion/dict/list',
    method: 'get',
    data: { params }
  })
}
// 保存字典信息
export function saveDictInfo(params) {
  return request({
    url: 'perssion/dict/save',
    method: 'post',
    data: { params }
  })
}
// 更新保存字典信息
export function updateDictInfo(params) {
  return request({
    url: 'perssion/dict/update',
    method: 'post',
    data: { params }
  })
}
// 删除字典信息
export function delDictInfo(params) {
  return request({
    url: 'perssion/dict/delete',
    method: 'post',
    data: [params]
  })
}
// 获取字典详细信息
export function getDictInfo(params) {
  return request({
    url: 'perssion/dict/info/' + params,
    method: 'get'
  })
}
