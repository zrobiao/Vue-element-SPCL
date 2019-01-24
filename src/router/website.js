import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

import Website from '@/website/index'

const websiteRouters = [{
  path: '/website',
  component: Website,
  redirect: '/website',
  name: 'website',
  meta: {
    titile: '客户端'
  }

}]

export default new Router({
  // mode: 'history', //后端支持可开
  routes: websiteRouters
})
