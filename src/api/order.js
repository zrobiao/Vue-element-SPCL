import request from '../utils/request'

export function getList(params) {
  return request({
    url: 'qycl.web/perssion/role/list',
    method: 'get',
    params
  })
}
