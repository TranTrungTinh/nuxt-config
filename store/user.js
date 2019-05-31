
import { welcome } from '@/utils/util'
import { logout, getInfo } from '@/api/auth'

const initialState = () => {
  return {
    username: '',
    welcome: '',
    attributes: {},
    groups: [],
    idToken: null
  }
}

// initial state
export const state = () => initialState()

// getters
export const getters = {
  avatar: state => state.attributes.picture || '/avatar2.jpg',
  nickname: state => state.attributes.email,
  welcome: state => state.welcome,
  groups: state => state.groups,
  userInfo: state => state.attributes,
  isAuthenticated: state => !!state.idToken
}

// actions
export const actions = {
  async Login({ commit }) {
    const userInfo = await getInfo()
    return new Promise((resolve, reject) => {
      commit('SET_USER', userInfo)
      resolve()
    })
  },
  Logout({ commit }) {
    return new Promise((resolve) => {
      commit('reset')
      logout()
        .then(() => {
          resolve()
        })
        .catch(() => {
          resolve()
        })
    })
  }
}

// mutations
export const mutations = {
  SET_AVATAR: (state, avatar) => {
    state.avatar = avatar
  },
  SET_USER: (state, user) => {
    Object.assign(state, user, { welcome: welcome() })
  },
  reset(state) {
    Object.assign(state, initialState())
  }
}
