<template>
  <div class="landing">
    <div class="landing-cover">
      <h1>
        {{ $t('home.landing.title') }}<br>
        {{ $t('home.landing.sub-title') }}
      </h1>
      <div class="landing-cover--item">
        <landing />
      </div>
    </div>
    <div class="landing-categories">
      <a-row :gutter="16">
        <a-col :xs="8">
          <div class="landing-categories--item accessory">
            <span>{{ $t('home.landing.categories.jewelry-accessories') }}</span>
          </div>
        </a-col>
        <a-col :xs="8">
          <div class="landing-categories--item artem">
            <span>{{ $t('home.landing.categories.fashion') }}</span>
          </div>
        </a-col>
        <a-col :xs="8">
          <div class="landing-categories--item maksym">
            <span>{{ $t('home.landing.categories.decorations') }}</span>
          </div>
          <div class="landing-categories--item craft">
            <span>{{ $t('home.landing.categories.tools-and-materials') }}</span>
          </div>
        </a-col>
      </a-row>
    </div>
  </div>
</template>
<script>
import landing from '@/assets/images/landing.svg?inline'

export default {
  components: { landing }

}
</script>
<style lang="scss" scoped>
  @import '@/assets/scss/home/landing.scss';
</style>
