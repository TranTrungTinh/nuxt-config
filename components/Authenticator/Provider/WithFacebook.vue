<template>
  <!-- <div>
    <Button class="FacebookButton" v-text="buttonText" @click="handleClick" :disabled="isLoading"/>
  </div>-->
  <a :disabled="isLoading" @click="handleClick">
    <a-icon class="item-icon" type="facebook" />
  </a>
</template>

<script>

export default {
  name: 'FacebookButton',
  components: {},
  data() {
    return {
      isLoading: true
    }
  },
  async mounted() {
    this.loadFacebookSDK()
    await this.waitForInit()
    this.isLoading = false
  },
  beforeCreate() {},
  methods: {
    waitForInit() {
      return new Promise((resolve) => {
        const hasFbLoaded = () => {
          if (window.FB) {
            resolve()
          } else {
            setTimeout(hasFbLoaded, 300)
          }
        }
        hasFbLoaded()
      })
    },
    statusChangeCallback(response) {
      if (response.status === 'connected') {
        this.handleResponse(response.authResponse)
      } else {
        this.handleError(response)
      }
    },
    checkLoginState() {
      window.FB.getLoginStatus(this.statusChangeCallback)
    },
    handleClick() {
      window.FB.login(this.checkLoginState, { scope: 'public_profile,email' })
    },
    handleError(error) {
      alert(error)
    },
    handleResponse(data) {
      const { accessToken: token, expiresIn } = data
      // eslint-disable-next-line camelcase
      const expires_at = expiresIn * 1000 + new Date().getTime()

      this.isLoading = true

      try {
        // const response = await Auth.federatedSignIn(
        const fb = window.FB
        fb.api('/me', { fields: 'name,email' }, (response) => {
          const user = {
            name: response.name,
            email: response.email
          }
          this.$Amplify.Auth.federatedSignIn('facebook', { token: token, expires_at }, user)
            .then((credentials) => {
              return this.$Amplify.Auth.currentAuthenticatedUser()
            }).then((authUser) => {
              this.isLoading = false
              this.$bus.$emit('authState', 'signedIn')
            }).catch((err) => {
              console.log(err)
              throw err
            })
        })

        // this.props.onLogin(response);
      } catch (e) {
        this.isLoading = false
        this.handleError(e)
      }
    },
    loadFacebookSDK() {
      window.fbAsyncInit = function () {
        window.FB.init({
          appId: '536817946849601',
          xfbml: true,
          version: 'v3.2'
        })
        window.FB.AppEvents.logPageView()
      }
      ;(function (d, s, id) {
        const fjs = d.getElementsByTagName(s)[0]
        if (d.getElementById(id)) {
          return
        }
        const js = d.createElement(s)
        js.id = id
        js.src = 'https://connect.facebook.net/en_US/sdk.js'
        fjs.parentNode.insertBefore(js, fjs)
      })(document, 'script', 'facebook-jssdk')
    }
  }
}
</script>

<style lang="less" scoped>
.item-icon {
  font-size: 24px;
  color: rgba(0, 0, 0, 0.2);
  margin-left: 16px;
  vertical-align: middle;
  cursor: pointer;
  transition: color 0.3s;

  &:hover {
    color: #1890ff;
  }
}
</style>
