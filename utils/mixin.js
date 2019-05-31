// import Vue from 'vue'
import { DEVICE_TYPE } from '@/utils/device'
import { mapState } from 'vuex'

// const mixinsComputed = Vue.config.optionMergeStrategies.computed
// const mixinsMethods = Vue.config.optionMergeStrategies.methods

const mixin = {
  computed: {
    ...mapState('app', {
      layoutMode: state => state.layout,
      navTheme: state => state.theme,
      primaryColor: state => state.color,
      colorWeak: state => state.weak,
      fixedHeader: state => state.fixedHeader,
      fixSiderbar: state => state.fixSiderbar,
      fixSidebar: state => state.fixSiderbar,
      contentWidth: state => state.contentWidth,
      autoHideHeader: state => state.autoHideHeader,
      sidebarOpened: state => state.sidebar,
      multiTab: state => state.multiTab
    })
  },
  methods: {
    isTopMenu() {
      return this.layoutMode === 'topmenu'
    },
    isSideMenu() {
      return !this.isTopMenu()
    }
  }
}

const mixinDevice = {
  computed: {
    ...mapState('app', {
      device: state => state.device
    })
  },
  methods: {
    isMobile() {
      return this.device === DEVICE_TYPE.MOBILE
    },
    isDesktop() {
      return this.device === DEVICE_TYPE.DESKTOP
    },
    isTablet() {
      return this.device === DEVICE_TYPE.TABLET
    }
  }
}

export { mixin, mixinDevice }
