<template>
  <a-modal v-model="visible" centered :mask-closable="closable" :closable="closable" :footer="null">
    <a-spin :spinning="loadding">
      <sign-in />
    </a-spin>
  </a-modal>
</template>

<script>
import { setToken, extractInfoFromHash } from '~/utils/auth'
import { SignIn } from '@/components/Authenticator'
import { timer } from 'rxjs'
import { getInfo } from '@/api/auth'
import { mapActions } from 'vuex'

export default {
  components: {
    SignIn
  },
  data() {
    return {
      visible: true,
      closable: false,
      loadding: true
    }
  },

  mounted() {
    const { token } = extractInfoFromHash()
    // if (!checkSecret(secret) || !token) {
    //   console.error('Something happened with the Sign In request')
    // }
    setToken(token)
    this.$subscribeTo(timer(1000), async (count) => {
      // TODO try to get user from cognito
      const user = await getInfo()
      if (user) {
        await this.Login()
        this.visible = false
        this.$router.replace('/')
      } else {
        this.$notification.error({
          message: 'Error',
          description: 'Login failed, please try again',
          duration: 4
        })
      }
      this.closable = true
      this.loadding = false
    })
  },
  methods: {
    ...mapActions('user', ['Login'])
  }
}
</script>
