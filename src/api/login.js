// import request from '@/utils/request'
import util from '@/utils/index'

export function login(username, password, captcha) {
  const url = '/api/qycl.web/sys/login?_method=POST'
  const params = {
    username: username,
    password: password,
    captcha: captcha
  }
  util.Ajax(url, params, data => {
    console.log(data)
  })
}

// export function login(username, password) {
//   return request({
//     url: '/sys/login',
//     method: 'post',
//     data: {
//       username,
//       password
//     }
//   })
// }

// export function getInfo(token) {
//   return request({
//     url: '/user/info',
//     method: 'get',
//     params: { token }
//   })
// }

// export function logout() {
//   return request({
//     url: '/user/logout',
//     method: 'post'
//   })
// }
