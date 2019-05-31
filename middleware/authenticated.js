export default function ({ store, redirect }) {
  // console.log('Middleware authenticated function')
  const isAuthenticated = store.getters['user/isAuthenticated']
  if (!isAuthenticated) {
    return redirect('/user/login')
  }
}
