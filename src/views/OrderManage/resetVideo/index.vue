<template>
  <div>
    <h1>{{ msg }}</h1>
  </div>
</template>
<script>
import { getList } from '@/api/order'
// import axios from 'axios'
// import { getToken } from '@/utils/auth'
export default {
  data() {
    return {
      msg: '这里是显示的模块！',
      userId: 0
    }
  },
  created() {
    this.getOrderList()
    // this.testFn()
  },
  methods: {
    getOrderList() {
      const params = { limit: 2, page: 5, username: 'admin' }
      getList(params).then(res => {
        console.log(res)
      })
    }
    // testFn() {
    //   const params = { limit: 2, page: 5, username: 'admin' }
    //   const Token = getToken()
    //   console.log('token：' + Token)
    //   axios({
    //     method: 'get',
    //     url: 'http://192.168.0.192:8080/qycl.web/perssion/user/list',
    //     data: params,
    //     headers: { 'token': Token }
    //   }).then(res => {
    //     console.log(res)
    //   })
    // }
  }
}
</script>
<style lang="scss" scoped>

</style>

