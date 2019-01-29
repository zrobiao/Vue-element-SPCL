<template>
  <div class="big-container">
    <search-bar :show-search="isSearch" :show-date="isDate" :show-btn="isBtn"/>
  </div>
</template>
<script>
import searchBar from '@/components/search/index'
export default {
  components: {
    searchBar
  },
  data() {
    return {
      msg: '这里是显示的模块！',
      isDate: false,
      isSearch: true,
      isBtn: true
    }
  }
}
</script>
<style lang="scss" scoped>

</style>

