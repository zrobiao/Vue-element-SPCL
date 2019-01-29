<template>
  <div>
    <h1>{{ msg }}</h1>
  </div>
</template>
<script>
import { getList } from '@/api/order'
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
      console.log(this.$store)
      const params = { limit: 2, page: 5, username: 'admin' }
      getList(params).then(res => {
        console.log(res)
      })
    }
  }
}
</script>
<style lang="scss" scoped>

</style>

