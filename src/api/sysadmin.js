import request from '@/utils/request'

export function getMenuList() {
  return request({
    url: '/perssion/menu/nav',
    method: 'get'
  })
}
