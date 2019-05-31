const pkg = require('./package')
const generateRoutes = [
  '/dashboard/workplace',
  '/en/dashboard/workplace',
  '/dashboard/analysis',
  '/en/dashboard/analysis'
];

module.exports = {
  mode: 'universal', // universal: spa

  router: {
    // prefetchLinks: false,
    middleware: ['i18n', 'check-auth'],
    scrollBehavior: function (to, from, savedPosition) {
      return { x: 0, y: 0 }
    },
    extendRoutes(routes, resolve) {
      routes.push({
        name: 'error',
        path: '*',
        component: resolve(__dirname, 'pages/exception/404.vue')
      })
    }
  },
  server: {
    port: 3002, // default: 3000
    host: 'localhost' // default: localhost,
  },
  /*
  ** Headers of the page
  */
  head: {
    title: pkg.name,
    script: [
      { src: '/libs/enquire.min.js' },
      { src: '/pwabuilder-sw-register.js' },
      { src: '/awa-register.js' }
    ],
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: pkg.description }
    ],
    link: [
      // { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' },
      { rel: 'icon', type: 'image/png', href: 'Images/favicon-32x32.png'},
      { rel: 'manifest', href: '/manifest.webmanifest' },
      { rel: 'apple-touch-icon', href: '/Images/assets/icons/apple-icon-06144a2a7b5101d447ecb4832502e73e.png' },
      { rel: 'apple-touch-icon', sizes: '57x57', href: '/Images/assets/icons/apple-icon-57x57-b82ef058b133f3197df61c326fa7cd6d.png' },
      { rel: 'apple-touch-icon', sizes: '72x72', href: '/Images/assets/icons/apple-icon-72x72-66bbf8447788cee426eebcddfa8eede8.png' },
      { rel: 'apple-touch-icon', sizes: '76x76', href: '/Images/assets/icons/apple-icon-76x76-8e88034967133f6a0454fe32e2070ffd.png' },
      { rel: 'apple-touch-icon', sizes: '114x114', href: '/Images/assets/icons/apple-icon-114x114-a2731f540851db0ed9fb4a7c74e2c6ce.png' },
      { rel: 'apple-touch-icon', sizes: '120x120', href: '/Images/assets/icons/apple-icon-120x120-06144a2a7b5101d447ecb4832502e73e.png' },
      { rel: 'apple-touch-icon', sizes: '144x144', href: '/Images/assets/icons/apple-icon-144x144-487a503e5cb29bbe0df7296db4093b7e.png' },
      { rel: 'apple-touch-icon', sizes: '152x152', href: '/Images/assets/icons/apple-icon-152x152-b600c0b40a21bbb9f8c1d18acde168e9.png' },
      { rel: 'apple-touch-icon', sizes: '180x180', href: '/Images/assets/icons/apple-icon-180x180-f0f5be1ded11c7ec66b00dd23c277a5d.png' }]
  },

  /*
  ** Customize the progress-bar color
  */
  // loading: { color: '#fff' },
  loading: '@/components/tools/Loading.vue',

  /*
  ** Global CSS
  */
  css: [
    // 'ant-design-vue/dist/antd.css'
    { src: 'ant-design-vue/dist/antd.less', lang: 'less' },
    { src: '@/assets/css/_theme.less', lang: 'less' },
    { src: '@/assets/css/main.scss', lang: 'scss' }
  ],

  /*
  ** Plugins to load before mounting the App
  */
  plugins: [
    { src: '~plugins/antd-ui' },
    { src: '~/plugins/filter' },
    { src: '~plugins/bus' },
    { src: '~plugins/i18n.js' },
    { src: '~plugins/aws', ssr: false },
    { src: '~plugins/use', ssr: false }
  ],

  generate: {
    routes: generateRoutes,
  },

  /*
  ** Nuxt.js modules
  */
  modules: [
    '@nuxtjs/pwa',
    'nuxt-svg-loader',
    '@nuxtjs/axios'
  ],

  axios: {
    // proxyHeaders: false
  },

  /*
  ** Build configuration
  */
  build: {
    /*
   ** You can extend webpack config here
   */
    extend(config, ctx) {
    // Run ESLint on save
      if (ctx.isDev && ctx.isClient) {
        config.module.rules.push({
          enforce: 'pre',
          test: /\.(js|vue)$/,
          loader: 'eslint-loader',
          exclude: /(node_modules)/,
          options : {
            fix : true
          }
        })
      }
    },
    loaders: {
      less: {
        javascriptEnabled: true
      }
    }
  }
}
