export function debounce(func, wait, immediate) {
  let timeout, args, context, timestamp, result

  const later = function() {
    // 据上一次触发时间间隔
    const last = +new Date() - timestamp

    // 上次被包装函数被调用时间间隔last小于设定时间间隔wait
    if (last < wait && last > 0) {
      timeout = setTimeout(later, wait - last)
    } else {
      timeout = null
      // 如果设定为immediate===true，因为开始边界已经调用过了此处无需调用
      if (!immediate) {
        result = func.apply(context, args)
        if (!timeout) context = args = null
      }
    }
  }
  return function(...args) {
    context = this
    timestamp = +new Date()
    const callNow = immediate && !timeout
    // 如果延时不存在，重新设定延时
    if (!timeout) timeout = setTimeout(later, wait)
    if (callNow) {
      result = func.apply(context, args)
      context = args = null
    }

    return result
  }
}

export function isExternal(path) {
  return /^(https?:|mailto:|tel:)/.test(path)
}

export function formatTime(time, option) {
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
    return parseTime(time, option)
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
}

export function parseTime(time, cFormat) {
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
}

export function orderStateStus() {
  const orderState = [
    {
      value: '1',
      label: '待接单'
    },
    {
      value: '11',
      label: '待接单, 视频更换'
    },
    {
      value: '12',
      label: '客户成品视频,压标不通过'
    },
    {
      value: '13',
      label: '制作打回,重新提交'
    },
    {
      value: '14',
      label: '制作打回,视频更换'
    },
    {
      value: '2',
      label: '制作中，已接单 '
    },
    {
      value: '21',
      label: '制作中，素材新增,视频更换'
    },
    {
      value: '22',
      label: '制作中,压标审核不通过'
    },
    {
      value: '23',
      label: '制作中,运营商审核不通过'
    },
    {
      value: '24',
      label: '制作中,客户确认视频不通过'
    },
    {
      value: '3',
      label: '等待客户确认'
    },
    {
      value: '31',
      label: '客户确认--更换视频'
    },
    {
      value: '4',
      label: '等待压标，制作视频 '
    },
    {
      value: '41',
      label: '等待视频压标,更换视频'
    },
    {
      value: '5',
      label: '等待开通 '
    },
    {
      value: '51',
      label: '全部用户更换视频'
    },
    {
      value: '52',
      label: '重设全部用户视频'
    },
    {
      value: '53',
      label: '重设部分用户视频'
    },
    {
      value: '54',
      label: '成品视频开通用户'
    },
    {
      value: '55',
      label: '新增用户'
    },
    {
      value: '56',
      label: '删除用户'
    },
    {
      value: '6',
      label: '归档,全部开通'
    },
    {
      value: '61',
      label: '归档，部分用户开通成功'
    },
    {
      value: '62',
      label: '归档,全部用户开通失败'
    }
  ]
  return orderState
}
