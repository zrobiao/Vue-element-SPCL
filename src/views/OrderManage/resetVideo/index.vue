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
      msg: '这里是显示的模块！'
    }
  },
  created() {
    this.getOrderList()
  },
  methods: {
    getOrderList() {
      getList().then(res => {
        console.log(res)
      })
    }
  }
}
</script>
<style lang="scss" scoped>

</style>

