<template>
  <div class="footer">
    <a-row :gutter="16">
      <a-col :xs="24" :lg="12">
        <div class="footer--logo">
          <logo-svg />
          <span>Lazaha</span>
        </div>
      </a-col>
      <a-col :xs="24" :lg="12">
        <div class="footer--copyright">
          <p>@2019 Handmade, Inc</p>
          <p>Term of service</p>
          <p>Privacy</p>
        </div>
      </a-col>
    </a-row>
    <tab-bottom />
  </div>
</template>

<script>
import LogoSvg from '@/assets/images/logo.svg?inline'
import TabBottom from '@/components/tools/tab-bottom.vue'
export default {
  name: 'GlobalFooter',
  components: { LogoSvg, TabBottom },
  data() {
    return {}
  }
}
</script>

<style lang="scss" scoped>
  @import '@/assets/scss/global-footer/global-footer.scss';
</style>
