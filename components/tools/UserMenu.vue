<template>
  <div class="user-wrapper">
    <div class="content-box">
      <shopping-cart class="action" />
      <div v-if="isAuthenticated">
        <notice-icon class="action" />
        <a-dropdown>
          <span class="action ant-dropdown-link user-dropdown-menu">
            <a-avatar class="avatar" size="small" :src="avatar" />
          </span>
          <a-menu slot="overlay" class="user-dropdown-menu-wrapper">
            <a-menu-item key="0">
              <nuxt-link :to="{ name: 'user-profile' }">
                <a-icon type="user" />
                <span>Profile</span>
              </nuxt-link>
            </a-menu-item>
            <a-menu-item key="1">
              <nuxt-link :to="{ name: 'user-settings' }">
                <a-icon type="setting" />
                <span>Settings</span>
              </nuxt-link>
            </a-menu-item>
            <a-menu-divider />
            <a-menu-item key="3">
              <a href="javascript:;" @click="handleLogout">
                <a-icon type="logout" />
                <span>Logout</span>
              </a>
            </a-menu-item>
          </a-menu>
        </a-dropdown>
      </div>
      <span v-else class="action ant-dropdown-link user-dropdown-menu" @click="handleLogin">
        <span>{{ $t('header.authentication.login') }}</span>
      </span>
      <span>
        <language />
      </span>
    </div>

    <a-modal
      v-model="showLoginDialog"
      centered
      :mask-closable="true"
      :closable="true"
      :footer="null"
    >
      <authenticator />
    </a-modal>
  </div>
</template>

<script>
import { NoticeIcon, ShoppingCart } from '@/components/NoticeIcon'
import { mapActions, mapGetters } from 'vuex'
import { Authenticator } from '@/components/Authenticator'
import Language from '@/components/tools/Language'

export default {
  name: 'UserMenu',
  components: {
    NoticeIcon,
    ShoppingCart,
    Authenticator,
    Language
  },
  data() {
    return {
      showLoginDialog: false
    }
  },
  computed: {
    ...mapGetters('user', ['nickname', 'avatar', 'isAuthenticated'])
  },
  mounted() {
    this.$bus.$on('authState', (info) => {
      if (info === 'signedIn') {
        this.showLoginDialog = false
      }
    })
  },
  methods: {
    ...mapActions('user', ['Logout', 'Login']),
    handleLogout() {
      const that = this
      this.$confirm({
        title: `Logout [${that.nickname}]`,
        content: 'Do you want to logout?',
        onOk() {
          return that
            .Logout()
            .then(() => {
              // window.location.reload()
            })
            .catch((err) => {
              that.$message.error({
                title: 'Error',
                description: err.message
              })
            })
        },
        onCancel() {}
      })
    },
    handleLogin() {
      this.showLoginDialog = true
    }
  }
}
</script>
