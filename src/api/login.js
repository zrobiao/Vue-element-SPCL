import request from '@/utils/request'
import loginAjax from '@/utils/login'
import Vue from 'vue'
const _this = new Vue()
export function login(username, password, captcha) {
  const pragms = _this.qs.stringify({
    username,
    password,
    captcha
  })
  return loginAjax({
    url: '/sys/login',
    method: 'post',
    data: pragms
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
