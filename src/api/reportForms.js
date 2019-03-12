import request from '@/utils/request'

// 报表统计接口
// 按客户统计开通用户数量
export function getCountByUser(params) {
  return request({
    url: '/order/count/countByUser',
    method: 'post',
    data: params
  })
}

// 按归属地统计开通用户数量
export function getCountByAttribution(params) {
  return request({
    url: '/order/count/countByAttribution',
    method: 'post',
    data: params
  })
}

// 统计视频制作数量（平台）（按渠道用户）
export function getCountVedioMake(params) {
  return request({
    url: '/order/count/countVedioMake',
    method: 'post',
    data: params
  })
}

// 统计视频制作数量（针对制作人员）
export function getCountVedioMakeCurrentUser(params) {
  return request({
    url: '/order/count/countVedioMakeCurrentUser',
    method: 'post',
    data: params
  })
}

// 压标数量统计（针对平台）
export function getCountVedioYaBiao(params) {
  return request({
    url: '/order/count/countVedioYaBiao',
    method: 'post',
    data: params
  })
}

// 压标数量统计（针对压标用户）
// export function getCountVedioMakeCurrentUser(params) {
//   return request({
//     url: '/order/count/countVedioMakeCurrentUser',
//     method: 'post',
//     data: params
//   })
// }
