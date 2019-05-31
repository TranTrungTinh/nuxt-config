<template>
  <nuxt-child />
</template>

<script>
// applied to route groups
// it make this.$route.matched return correct.
export default {
  name: 'SearchPage',
  layout: 'SearchLayout'
}
</script>
