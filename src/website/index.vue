<template>
  <div class="Main">
    <router-view/>
    <h1>{{ msg }}</h1>
  </div>
</template>
<script>
export default {
  data() {
    return {
      msg: '这里显示的是官网'
    }
  }
}
</script>
<style lang="scss" scoped>
  h1{color:blue;font-size: 20px;}
</style>
