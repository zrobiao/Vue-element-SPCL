import Vue from 'vue'
import axios from 'axios'
import Qs from 'qs'
// import jq from 'jquery'
import webuploader from 'webuploader'

import 'normalize.css/normalize.css' // A modern alternative to CSS resets

import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import locale from 'element-ui/lib/locale/lang/zh-CN' // lang i18n
// import { library } from '@fortawesome/fontawesome-svg-core'
// import { faCoffee } from '@fortawesome/free-solid-svg-icons'
// import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'

import '@/styles/index.scss' // global css

import App from './App'
import router from './router/index'
import store from './store'

import '@/icons' // icon
import '@/permission' // permission control

// library.add(faCoffee)
// Vue.component('font-awesome-icon', FontAwesomeIcon)
Vue.use(ElementUI, { locale })
Vue.prototype.qs = Qs
// Vue.prototype.$ = jq
Vue.prototype.upFile = webuploader

Vue.config.productionTip = false
axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded'
axios.defaults.withCredentials = true

new Vue({
  el: '#app',
  router,
  store,
  render: h => h(App)
})
