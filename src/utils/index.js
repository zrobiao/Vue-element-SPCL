import axios from 'axios'
import util from './index'

export default {
  /**
   * 根据请求参数名称 获取请求参数值
   * @param {Object} router 路由对象
   * @param {String} path 路由名称
   * @param {Object} queryParams 请求参数
   */
  // pushRouter: function(router, path, queryParams) { // 获取浏览器参数 name为参数名
  //   queryParams = queryParams || {}
  //   if (!queryParams.Token) queryParams.Token = util.getToken()
  //   router.push({
  //     path: path,
  //     query: queryParams
  //   })
  // },
  isExternal: function(path) {
    return /^(https?:|mailto:|tel:)/.test(path)
  },
  formatTime: function(time, option) {
    time = +time * 1000
    const d = new Date(time)
    const now = Date.now()

    const diff = (now - d) / 1000

    if (diff < 30) {
      return '刚刚'
    } else if (diff < 3600) {
      // less 1 hour
      return Math.ceil(diff / 60) + '分钟前'
    } else if (diff < 3600 * 24) {
      return Math.ceil(diff / 3600) + '小时前'
    } else if (diff < 3600 * 24 * 2) {
      return '1天前'
    }
    if (option) {
      return util.parseTime(time, option)
    } else {
      return (
        d.getMonth() +
        1 +
        '月' +
        d.getDate() +
        '日' +
        d.getHours() +
        '时' +
        d.getMinutes() +
        '分'
      )
    }
  },
  parseTime: function(time, cFormat) {
    if (arguments.length === 0) {
      return null
    }
    const format = cFormat || '{y}-{m}-{d} {h}:{i}:{s}'
    let date
    if (typeof time === 'object') {
      date = time
    } else {
      if (('' + time).length === 10) time = parseInt(time) * 1000
      date = new Date(time)
    }
    const formatObj = {
      y: date.getFullYear(),
      m: date.getMonth() + 1,
      d: date.getDate(),
      h: date.getHours(),
      i: date.getMinutes(),
      s: date.getSeconds(),
      a: date.getDay()
    }
    const time_str = format.replace(/{(y|m|d|h|i|s|a)+}/g, (result, key) => {
      let value = formatObj[key]
      // Note: getDay() returns 0 on Sunday
      if (key === 'a') {
        return ['日', '一', '二', '三', '四', '五', '六'][value]
      }
      if (result.length > 0 && value < 10) {
        value = '0' + value
      }
      return value || 0
    })
    return time_str
  },
  Ajax: function(reqPath, paramArray, successCallBack, failuredCallBack) {
    const ReqPath = reqPath + (reqPath.indexOf('?') === -1 ? '?' : '&') + 'timeSerialize=' + (new Date()).getTime()
    // var baseUrl = 'http://localhost:8080', //请求地址http://192.168.0.141:8080
    //          reqPath=baseUrl+reqPath;
    const Type = getMethod(ReqPath, '_method')

    function getMethod(reqPath, name) { // 获取_method参数类型
      var reg = new RegExp('(^|&)' + name + '=([^&]*)(&|$)')
      var r = reqPath.substr(reqPath.indexOf('?') + 1)
      r = r.match(reg)
      if (r != null) return unescape(r[2])
      return 'GET'
    }
    if (Type === 'GET') {
      console.log('现在是get请求')
      axios.get(reqPath, {
        params: paramArray
      })
        .then(function(response) {
        //			      if (response.status == 200) {
          //			                successCallBack(response);
          //			            }else{
          //			                Toast("服务器打盹了,再试一次叫醒它！");
          //			            }
          successCallBack(response)
        })
        .catch(function(error) {
          var resp = error.response
          successCallBack(resp)
          // console.log(error.response);
        })
    } else {
      console.log('现在是post请求')
      axios.post(reqPath, paramArray).then(function(response) {
        //				     if (response.status == 200) {
        //			                successCallBack(response);
        //			            }else{
        //			                Toast("服务器打盹了,再试一次叫醒它！");
        //			            }
        successCallBack(response)
      }).catch(function(error) {
        var resp = error.response
        // status报错！！！
        // switch (resp.status) {
        //     case 500:
        //         Toast("服务器错误！");
        //         break;
        //     default:
        //         Toast(resp.data.message);
        //         break;
        // }
        successCallBack(resp)
      })
    }
  }

}
