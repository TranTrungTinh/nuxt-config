<template>
  <div class="search">
    <a-input-search placeholder="Tìm kiếm sản phẩm" size="large" @search="onSearch">
      <a-button slot="enterButton">
        <a-icon type="search" />
        <span>Tìm kiếm</span>
      </a-button>
    </a-input-search>
  </div>
</template>
<script>
export default {
  methods: {
    onSearch(value) {
      console.log(value)
    }
  }
}
</script>
<style lang="scss" scoped>
  @import '@/assets/scss/search/the-search.scss';
</style>
