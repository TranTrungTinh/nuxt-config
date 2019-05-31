/* eslint-disable no-unused-vars */
// const enquireJs = require('enquire.js')
export const DEVICE_TYPE = {
  DESKTOP: 'desktop',
  TABLET: 'tablet',
  MOBILE: 'mobile'
}

const deviceEnquire = function (callback) {
  const matchDesktop = {
    match: () => {
      callback && callback(DEVICE_TYPE.DESKTOP)
    }
  }

  const matchLablet = {
    match: () => {
      callback && callback(DEVICE_TYPE.TABLET)
    }
  }

  const matchMobile = {
    match: () => {
      callback && callback(DEVICE_TYPE.MOBILE)
    }
  }

  // screen and (max-width: 1087.99px)
  // eslint-disable-next-line no-
  // import enquireJs from 'enquire.js'

  // eslint-disable-next-line no-undef
  enquire
    .register('screen and (max-width: 576px)', matchMobile)
    .register('screen and (min-width: 576px) and (max-width: 1199px)', matchLablet)
    .register('screen and (min-width: 1200px)', matchDesktop)
}

export const AppDeviceEnquire = {
  mounted() {
    const { $store } = this
    deviceEnquire((deviceType) => {
      switch (deviceType) {
        case DEVICE_TYPE.DESKTOP:
          $store.commit('app/TOGGLE_DEVICE', 'desktop')
          $store.dispatch('app/setSidebar', true)
          break
        case DEVICE_TYPE.TABLET:
          $store.commit('app/TOGGLE_DEVICE', 'tablet')
          $store.dispatch('app/setSidebar', false)
          break
        case DEVICE_TYPE.MOBILE:
        default:
          $store.commit('app/TOGGLE_DEVICE', 'mobile')
          $store.dispatch('app/setSidebar', true)
          break
      }
    })
  }
}
