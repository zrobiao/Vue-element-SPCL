<template>
  <div>
    <h1>{{ msg }}</h1>
  </div>
</template>
<script>
import util from '@/utils/index'
export default {
  data() {
    return {
      msg: '这里是显示的模块！',
      userId: 0
    }
  },
  created() {
    this.getOrderList()
  },
  methods: {
    getOrderList() {
      const params = { limit: 2, page: 5, username: 'admin' }
      util.Ajax('/api/qycl.web/perssion/user/list?_method=GET', params, res => {
        console.log(res)
      })
    }
  }
}
</script>
<style lang="scss" scoped>

</style>

