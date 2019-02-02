import request from '@/utils/request'

export function getMenuList() {
  return request({
    url: '/perssion/menu/nav',
    method: 'get'
  })
}

export function getRoleList(params) {
  return request({
    url: '/perssion/role/list',
    method: 'get',
    params
  })
}
