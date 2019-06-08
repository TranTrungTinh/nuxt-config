<template>
  <div :class="['tab', { 'hidden': !showNavbar }]">
    <div class="tab__bottom">
      <div class="tab__bottom--item">
        A
      </div>
      <div class="tab__bottom--item">
        B
      </div>
      <div class="tab__bottom--item">
        C
      </div>
      <div class="tab__bottom--item">
        D
      </div>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      offset: 60,
      showNavbar: true,
      lastScrollPosition: 0,
      scrollValue: 0
    }
  },

  mounted() {
    this.lastScrollPosition = window.pageYOffset
    window.addEventListener('scroll', this.onScroll)
    // const viewportMeta = document.createElement('meta')
    // viewportMeta.name = 'viewport'
    // viewportMeta.content = 'width=device-width, initial-scale=1'
    // document.head.appendChild(viewportMeta)
  },

  beforeDestroy() {
    window.removeEventListener('scroll', this.onScroll)
  },

  methods: {
    onScroll() {
      if (window.pageYOffset < 0) {
        return
      }
      if (Math.abs(window.pageYOffset - this.lastScrollPosition) < this.offset) {
        return
      }
      this.showNavbar = window.pageYOffset < this.lastScrollPosition
      this.lastScrollPosition = window.pageYOffset
    }
  }
}
</script>
<style lang="scss" scoped>
.tab {
  position: fixed;
  bottom: 0;
  width: 100%;
  height: 64px;
  background: #fff;
  display: block;
  transition: 0.3s all ease-out;

  &__bottom {
    display: flex;
    justify-content: space-around;
    align-items: center;
    font-size: 18px;
    line-height: 40px;
  }
}
.hidden {
  box-shadow: none;
  transform: translate3d(0, 100%, 0);
}
</style>
