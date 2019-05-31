import { Auth } from 'aws-amplify'

// TODO: get from cokkie in case server
export async function getInfo() {
  try {
    const user = await Auth.currentAuthenticatedUser()
    const { attributes, username, signInUserSession: { idToken: token } } = user
    const groups = token.payload['cognito:groups'] || []
    const idToken = token.jwtToken
    return {
      attributes,
      username,
      groups,
      idToken
    }
  } catch (e) {
    console.log(e)
    return null
  }
}

export async function logout() {
  await Auth.signOut()
}
