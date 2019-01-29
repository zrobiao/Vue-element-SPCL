'use strict'
const merge = require('webpack-merge')
const prodEnv = require('./prod.env')

module.exports = merge(prodEnv, {
  NODE_ENV: '"development"',
  BASE_API: '"http://192.168.0.119:8082/qycl.web"',  //测试环境
  // BASE_API: '"http://192.168.0.225:80/qycl.web"',    //永泰的环境
})
