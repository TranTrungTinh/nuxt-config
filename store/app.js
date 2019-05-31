import Vue from 'vue'

import {
  DEFAULT_COLOR,
  DEFAULT_THEME,
  DEFAULT_LAYOUT_MODE,
  DEFAULT_COLOR_WEAK,
  SIDEBAR_TYPE,
  DEFAULT_FIXED_HEADER,
  DEFAULT_FIXED_HEADER_HIDDEN,
  DEFAULT_FIXED_SIDEMENU,
  DEFAULT_CONTENT_WIDTH_TYPE,
  DEFAULT_MULTI_TAB
} from '@/config/mutation-types'

import config from '@/config/defaultSettings'

const initialState = () => {
  return {
    sidebar: true,
    device: 'desktop',
    theme: config.navTheme, // theme for nav menu
    layout: config.layout, // nav menu position: sidemenu or topmenu
    contentWidth: config.contentWidth, // layout of content: Fluid or Fixed, only works when layout is topmenu
    fixedHeader: config.autoHideHeader,
    fixSiderbar: config.fixSiderbar,
    autoHideHeader: config.fixedHeader,
    color: config.primaryColor, // primary color of ant design
    weak: config.colorWeak,
    multiTab: config.multiTab
  }
}

// initial state
export const state = () => initialState()

// getters
export const getters = {
  device: state => state.device,
  theme: state => state.theme,
  color: state => state.color,
  multiTab: state => state.multiTab
}

// actions
export const actions = {
  setSidebar({ commit }, type) {
    commit('SET_SIDEBAR_TYPE', type)
  },
  CloseSidebar({ commit }) {
    commit('CLOSE_SIDEBAR')
  },
  ToggleDevice({ commit }, device) {
    commit('TOGGLE_DEVICE', device)
  },
  ToggleTheme({ commit }, theme) {
    commit('TOGGLE_THEME', theme)
  },
  ToggleLayoutMode({ commit }, mode) {
    commit('TOGGLE_LAYOUT_MODE', mode)
  },
  ToggleFixedHeader({ commit }, fixedHeader) {
    if (!fixedHeader) {
      commit('TOGGLE_FIXED_HEADER_HIDDEN', false)
    }
    commit('TOGGLE_FIXED_HEADER', fixedHeader)
  },
  ToggleFixSiderbar({ commit }, fixSiderbar) {
    commit('TOGGLE_FIXED_SIDERBAR', fixSiderbar)
  },
  ToggleFixedHeaderHidden({ commit }, show) {
    commit('TOGGLE_FIXED_HEADER_HIDDEN', show)
  },
  ToggleContentWidth({ commit }, type) {
    commit('TOGGLE_CONTENT_WIDTH', type)
  },
  ToggleColor({ commit }, color) {
    commit('TOGGLE_COLOR', color)
  },
  ToggleWeak({ commit }, weakFlag) {
    commit('TOGGLE_WEAK', weakFlag)
  },
  ToggleMultiTab({ commit }, bool) {
    commit('TOGGLE_MULTI_TAB', bool)
  }
}

// mutations
export const mutations = {
  SET_SIDEBAR_TYPE: (state, type) => {
    state.sidebar = type
    Vue.ls.set(SIDEBAR_TYPE, type)
  },
  CLOSE_SIDEBAR: (state) => {
    Vue.ls.set(SIDEBAR_TYPE, true)
    state.sidebar = false
  },
  TOGGLE_DEVICE: (state, device) => {
    state.device = device
  },
  TOGGLE_THEME: (state, theme) => {
    // setStore('_DEFAULT_THEME', theme)
    Vue.ls.set(DEFAULT_THEME, theme)
    state.theme = theme
  },
  TOGGLE_LAYOUT_MODE: (state, layout) => {
    Vue.ls.set(DEFAULT_LAYOUT_MODE, layout)
    state.layout = layout
  },
  TOGGLE_FIXED_HEADER: (state, fixed) => {
    Vue.ls.set(DEFAULT_FIXED_HEADER, fixed)
    state.fixedHeader = fixed
  },
  TOGGLE_FIXED_SIDERBAR: (state, fixed) => {
    Vue.ls.set(DEFAULT_FIXED_SIDEMENU, fixed)
    state.fixSiderbar = fixed
  },
  TOGGLE_FIXED_HEADER_HIDDEN: (state, show) => {
    Vue.ls.set(DEFAULT_FIXED_HEADER_HIDDEN, show)
    state.autoHideHeader = show
  },
  TOGGLE_CONTENT_WIDTH: (state, type) => {
    Vue.ls.set(DEFAULT_CONTENT_WIDTH_TYPE, type)
    state.contentWidth = type
  },
  TOGGLE_COLOR: (state, color) => {
    Vue.ls.set(DEFAULT_COLOR, color)
    state.color = color
  },
  TOGGLE_WEAK: (state, flag) => {
    Vue.ls.set(DEFAULT_COLOR_WEAK, flag)
    state.weak = flag
  },
  TOGGLE_MULTI_TAB: (state, bool) => {
    Vue.ls.set(DEFAULT_MULTI_TAB, bool)
    state.multiTab = bool
  }
}
