<template>
  <div class="logo">
    <nuxt-link :to="{name:'index'}">
      <LogoSvg alt="logo" />
      <h1 v-if="showTitle" class="title">
        {{ title }}
      </h1>
    </nuxt-link>
  </div>
</template>

<script>
import LogoSvg from '@/assets/images/logo.svg?inline'

export default {
  name: 'Logo',
  components: {
    LogoSvg
  },
  props: {
    title: {
      type: String,
      default: () => 'Lazaha',
      required: false
    },
    showTitle: {
      type: Boolean,
      default: () => true,
      required: false
    }
  }
}
</script>
<style lang="scss" scoped>
.logo {
  .title {
    font-weight: bold !important;
  }
}
</style>
