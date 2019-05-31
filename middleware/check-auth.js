import { getInfo } from '@/api/auth'

export default async function ({ store, app, req, route }) {
  // If nuxt generate, pass this middleware
  if (process.server) return
  const user = await getInfo()
  // const { code } = route.query
  // console.log(code)
  if (user) {
    store.commit('user/SET_USER', user)
  } else {
    store.commit('user/reset')
  }
}
