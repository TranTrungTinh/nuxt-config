const initialState = () => {
  return {
    locales: ['vi', 'en'],
    locale: 'vi'
  }
}
export const state = () => initialState()

export const actions = {

}

export const getters = {

}

export const mutations = {
  SET_LANGUAGE: (state, locale) => {
    if (state.locales.indexOf(locale) !== -1) {
      state.locale = locale
    }
  }
}
