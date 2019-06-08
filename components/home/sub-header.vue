<template>
  <div class="sub-header">
    <a-row :gutter="16">
      <a-col :xs="12">
        <dropdown-menu />
      </a-col>
      <a-col :xs="12">
        <div class="sub-header--right">
          <div class="sub-header--right__item handmade-links">
            <span>Bán hàng cùng Lazaha</span>
          </div>
          <div class="sub-header--right__item handmade-links">
            <span>Kiểm tra đơn hàng</span>
          </div>
          <div class="sub-header--right__item handmade-links">
            <span>Hổ trợ</span>
          </div>
          <div class="sub-header--right__item">
            <language />
            <!-- <span>Ngôn ngữ</span> -->
          </div>
        </div>
      </a-col>
    </a-row>
  </div>
</template>
<script>
import DropdownMenu from './dropdown-menu'
import { Language } from '@/components/tools'
export default {
  components: { DropdownMenu, Language }
}
</script>
<style lang="scss" scoped>
  @import '@/assets/scss/home/sub-header.scss';
</style>
