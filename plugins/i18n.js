/* eslint-disable */

import Vue from 'vue';
import VueI18n from 'vue-i18n';

Vue.use(VueI18n);

export default ({ app, store }) => {
  app.i18n = new VueI18n({
    locale: store.state.locale,
    fallbackLocale: 'vi',
    messages: {
      'en': {
        'html':             require('~/locales/en/html.json'),
        'header':           require('~/locales/en/header.json'),
        'home':             require('~/locales/en/home.json')
      },
      'vi': {
        'html':             require('~/locales/vi/html.json'),
        'header':           require('~/locales/vi/header.json'),
        'home':             require('~/locales/vi/home.json'),
      }
    }
  })

  app.i18n.path = (link) => {
    if (app.i18n.locale === app.i18n.fallbackLocale) {
      return `/${link}`
    }

    return `/${app.i18n.locale}/${link}`
  }
}
