<template>
  <div />
</template>

<script>
import NProgress from 'nprogress'
import 'nprogress/nprogress.css'

NProgress.configure({ showSpinner: false })
export default {
  methods: {
    start() {
      NProgress.start()
    },
    finish() {
      NProgress.done()
    }
  }
}
</script>
