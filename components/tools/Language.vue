<template>
  <a-dropdown placement="bottomRight">
    <span class="action ant-dropdown-link user-dropdown-menu">
      <a-icon type="global" />
    </span>
    <a-menu slot="overlay" class="user-dropdown-menu-wrapper" @click="changeLanguage">
      <a-menu-item
        v-for="(language, index) in languages"
        :key="language.shortName"
        class="language--item"
      >
        <vi v-if="index === 0" alt="language vi" />
        <en v-if="index === 1" alt="language en" />
        <span>{{ language.name }}</span>
      </a-menu-item>
    </a-menu>
  </a-dropdown>
</template>

<script>
import vi from '@/assets/vi.svg?inline'
import en from '@/assets/en.svg?inline'

export default {
  components: { vi, en },
  data() {
    return {
      languages: [
        {
          name: 'Vietnamese',
          shortName: 'vi'
        },
        {
          name: 'English',
          shortName: 'en'
        }
      ]
    }
  },
  methods: {
    changeLanguage({ key }) {
      const routeName = this.$route.name

      if (routeName === 'index' && this.$i18n.locale !== key) {
        this.$router.push({ name: 'lang', params: { lang: key } })
        return
      }

      if (routeName === 'lang' && this.$i18n.locale !== key) {
        this.$router.push({ name: 'lang', params: { lang: key } })
        return
      }

      let route = ''

      if (this.$i18n.locale === 'vi') {
        route = `lang-${this.$route.name}`
      } else {
        route = this.$route.name
      }

      if (this.$i18n.locale !== 'vi' && key === 'vi') {
        this.$i18n.locale = 'vi'
        this.$router.push({ name: route, params: { lang: 'vi' } })
      } else if (this.$i18n.locale !== 'en' && key === 'en') {
        this.$i18n.locale = 'en'
        this.$router.push({ name: route, params: { lang: 'en' } })
      }
    }
  }
}
</script>
<style lang="scss" scoped>
.language {

  &--item {
    display: flex;
    align-items: center;

    & span {
      padding-left: 10px;
    }
  }
}
</style>
