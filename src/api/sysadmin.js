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

export function getSelectList() {
  return request({
    url: '/perssion/menu/select',
    methods: 'get'
  })
}

export function getMenuInfo(menuId) {
  return request({
    url: '/perssion/menu/info/' + menuId,
    methods: 'get'
    // params: { menuId }
  })
}
