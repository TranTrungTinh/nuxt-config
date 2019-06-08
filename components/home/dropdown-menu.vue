<template>
  <a-dropdown>
    <span class="dropdown">
      <a-icon type="bars" />
      <span>DANH MỤC SẢN PHẨM</span>
    </span>
    <a-menu slot="overlay">
      <a-menu-item>Phụ kiện</a-menu-item>
      <a-menu-item>Túi xách</a-menu-item>
      <a-menu-item>Thời trang</a-menu-item>
      <a-menu-item>Đồ trẻ em</a-menu-item>
      <a-sub-menu key="maried" title="Đồ dám cưới">
        <a-menu-item>Nhẫn</a-menu-item>
        <a-menu-item>Cài tóc</a-menu-item>
        <a-menu-item>Bảng hiệu</a-menu-item>
      </a-sub-menu>
    </a-menu>
  </a-dropdown>
</template>
<script>
export default {

}
</script>
<style lang="scss" scoped>
  @import '@/assets/scss/home/dropdown-menu.scss';
</style>
