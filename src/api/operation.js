import request from '@/utils/request'

export function getMsgcheckList(params) {
  return request({
    url: '/order/ywinfoaudit/list',
    method: 'post',
    data: { params }
  })
}
