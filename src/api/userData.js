import request from '@/utils/request'
// import axios from 'axios'
// import loginAjax from '@/utils/login'
import Vue from 'vue'
// import { resolve, reject } from 'q'
const _this = new Vue()
export function login(username, password, captcha) {
  const params = _this.qs.stringify({
    username,
    password,
    captcha
  })
  return request({
    url: '/sys/login',
    method: 'post',
    data: params,
    headers: {
      'Content-type': 'application/x-www-form-urlencoded;charset=utf-8;'
    }
  })
}

// export function getInfo(token) {
//   return request({
//     url: '/perssion/user/info',
//     method: 'get'
//     // params: { token }
//   })
// }

export function logout() {
  return request({
    url: '/logout',
    method: 'get'
  })
}
