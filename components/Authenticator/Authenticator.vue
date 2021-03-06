<template>
  <div>
    <sign-in v-if="displayMap.showSignIn" :sign-in-config="options.signInConfig" />
    <sign-up v-if="displayMap.showSignUp" :sign-up-config="options.signUpConfig" />
    <confirm-sign-up
      v-if="displayMap.showConfirmSignUp"
      :confirm-sign-up-config="options.confirmSignUpConfig"
    />
    <forgot-password
      v-if="displayMap.showForgotPassword"
      :forgot-password-config="options.forgotPasswordConfig"
    />
  </div>
</template>

<script>
/* eslint-disable no-unused-vars */

import { Auth } from 'aws-amplify'
import SignIn from './SignIn.vue'
import SignUp from './SignUp.vue'
import ForgotPassword from './ForgotPassword.vue'
import ConfirmSignUp from './ConfirmSignUp.vue'

export default {
  name: 'Authenticator',
  components: {
    SignIn,
    SignUp,
    ConfirmSignUp,
    ForgotPassword
  },
  props: {
    authConfig: {
      type: Object,
      default: () => {}
    }
  },
  data() {
    return {
      user: {
        username: null
      },
      displayMap: {},
      error: ''
    }
  },
  computed: {
    options() {
      const defaults = {
        signInConfig: {},
        signUpConfig: {},
        confirmSignUpConfig: {},
        confirmSignInConfig: {},
        forgotPasswordConfig: {},
        mfaConfig: {},
        requireNewPasswordConfig: {}
      }
      return Object.assign(defaults, this.authConfig || {})
    }
  },
  mounted() {
    this.$bus.$on('localUser', (user) => {
      this.user = user
      this.options.signInConfig.username = this.user.username
      this.options.confirmSignInConfig.user = this.user
      this.options.confirmSignUpConfig.username = this.user.username
      this.options.requireNewPasswordConfig.user = this.user
    })
    this.$bus.$on('authState', (data) => {
      this.displayMap = this.updateDisplayMap(data)
    })
    this.getUser()
      .then((val) => {
        if (val instanceof Error) {
          return (this.displayMap = this.updateDisplayMap('signedOut'))
        }
        this.user = val
        return (this.displayMap = this.updateDisplayMap('signedIn'))
      })
      .catch(e => this.setError(e))
  },
  methods: {
    getUser() {
      return this.$Amplify.Auth.currentAuthenticatedUser()
        .then((user) => {
          if (!user) {
            return null
          }
          return user
        })
        .catch((e) => {
          console.log(e)
          return new Error(e)
        })
    },
    updateDisplayMap: (state) => {
      return {
        showSignIn: state === 'signedOut' || state === 'signIn',
        showSignUp: state === 'signUp',
        showConfirmSignUp: state === 'confirmSignUp',
        showConfirmSignIn: state === 'confirmSignIn',
        showForgotPassword: state === 'forgotPassword',
        showSignOut: state === 'signedIn',
        showMfa: state === 'setMfa',
        requireNewPassword: state === 'requireNewPassword'
      }
    },
    setError: function (e) {
      this.$notification.error({
        message: 'Error',
        description: e.message || 'Request error, please try again later',
        duration: 4
      })
    }
  }
}
</script>
