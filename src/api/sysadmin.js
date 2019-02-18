import request from '@/utils/request'
import axios from 'axios'
// import Vue from 'vue'
// const _this = new Vue()
// 获取菜单列表信息
export function getMenuList() {
  return request({
    url: '/perssion/menu/nav',
    method: 'get'
  })
}
// 获取角色列表
export function getRoleList(params) {
  return request({
    url: '/perssion/role/list',
    method: 'get',
    params })
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
  // return new Promise((reslove, reject) => {
  //   axios({
  //     method: 'post',
  //     url: process.env.BASE_API + '/perssion/menu/save',
  //     headers: {
  //       'Content-type': 'application/json;charset=utf-8'
  //     },
  //     data: params
  //     // transformRequest: [function(data) {
  //     //   let ret = ''
  //     //   for (const it in data) {
  //     //     ret += encodeURIComponent(it) + '=' + encodeURIComponent(data[it]) + '&'
  //     //   }
  //     //   return ret
  //     // }]
  //   }).then((res) => {
  //     reslove(res)
  //   }).catch((error) => {
  //     reject(error)
  //   })
  // })
}
// 修改保存菜单信息
export function updataMenuInfo(params) {
  console.log('更新菜单西信息')
  console.log(JSON.stringify(params))
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

// 获取选择菜单列表
export function getRoleSelect() {
  return request({
    url: 'perssion/role/select',
    method: 'get'
  })
}
