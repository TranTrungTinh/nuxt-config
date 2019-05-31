<template>
  <div class="logo">
    <nuxt-link :to="{name:'index'}">
      <LogoSvg alt="logo" />
      <h1 v-if="showTitle">
        {{ title }}
      </h1>
    </nuxt-link>
  </div>
</template>

<script>
import LogoSvg from '@/assets/logo.svg?inline'

export default {
  name: 'Logo',
  components: {
    LogoSvg
  },
  props: {
    title: {
      type: String,
      default: () => 'SKG Web',
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
