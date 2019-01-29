import request from '../utils/request'

export function getList(params) {
  return request({
    url: 'perssion/user/list',
    method: 'get',
    params
  })
}
