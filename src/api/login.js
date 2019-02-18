import request from '@/utils/request'
import axios from 'axios'
// import loginAjax from '@/utils/login'
import Vue from 'vue'
// import { resolve, reject } from 'q'
const _this = new Vue()
// export function login(username, password, captcha) {
//   const pragms = _this.qs.stringify({
//     username,
//     password,
//     captcha
//   })
//   return loginAjax({
//     url: '/sys/login',
//     method: 'post',
//     data: pragms
//   })
// }

export function login(username, password, captcha) {
  const params = _this.qs.stringify({
    username,
    password,
    captcha
  })
  return new Promise((reslove, reject) => {
    axios({
      method: 'post',
      url: process.env.BASE_API + '/sys/login',
      headers: {
        'Content-type': 'application/x-www-form-urlencoded'
      },
      data: params
      // transformRequest: [function(data) {
      //   let ret = ''
      //   for (const it in data) {
      //     ret += encodeURIComponent(it) + '=' + encodeURIComponent(data[it]) + '&'
      //   }
      //   return ret
      // }]
    }).then((res) => {
      reslove(res)
    }).catch((error) => {
      reject(error)
    })
  })
}

export function getInfo(token) {
  return request({
    url: '/perssion/user/info',
    method: 'get'
    // params: { token }
  })
}

export function logout() {
  return request({
    url: '/logout',
    method: 'get'
  })
}
