<template>
  <section class="home">
    <div class="home--landing">
      <landing />
    </div>
    <div class="home--suggess">
      <h2>Gợi ý cho bạn</h2>
      <a-row :gutter="16">
        <a-col v-for="item in products" :key="item.id" :xs="12" :md="8" :xl="6">
          <thumbnail />
        </a-col>
      </a-row>
      <div class="home--suggess--more">
        <span>Xem thêm</span>
      </div>
    </div>
    <div class="home--sub-landing">
      <sub-landing />
    </div>
    <a-divider />
    <div class="home--footer">
      <home-footer />
    </div>
  </section>
</template>
<script>
import { Landing, SubLanding, HomeFooter } from '@/components/home'
import { Thumbnail } from '@/components/thumbnail'

export default {
  components: { Landing, SubLanding, Thumbnail, HomeFooter },
  data() {
    return {
      products: [
        { id: 1 },
        { id: 2 },
        { id: 3 },
        { id: 4 },
        { id: 21 },
        { id: 22 },
        { id: 23 },
        { id: 24 },
        { id: 11 },
        { id: 12 },
        { id: 13 },
        { id: 14 }
      ]
    }
  },
  head() {
    return {
      htmlAttrs: {
        lang: this.$t('html.language')
      },
      title: this.$t('home.head.title'),
      meta: [
        {
          hid: 'description',
          name: 'description',
          content: this.$t('home.head.description')
        },
        {
          name: 'keywords',
          content: this.$t('home.head.keywords')
        }
      ]
    }
  }
}
</script>
<style lang="scss" scoped>
  @import '@/assets/scss/home/home.scss';
</style>
