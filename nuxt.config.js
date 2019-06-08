const manifest = require('./pwa/manifest')

const pkg = require('./package')

const generateRoutes = [
  '/',
  '/home',
  '/exception/403',
  '/exception/404',
  '/exception/500',
  '/products',
  '/products/:id',

  '/en/',
  '/en/home',
  '/en/exception/403',
  '/en/exception/404',
  '/en/exception/500',
  '/en/products',
  '/en/products/:id'
]

module.exports = {
  mode: 'spa', // universal: spa
  manifest,
  // workbox: {
  //   'dev': true,
  //   'importScripts': ['custom-sw.js']
  // },

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
    port: 3000, // default: 3000
    host: 'localhost' // default: localhost,
  },
  /*
  ** Headers of the page
  */
  head: {
    title: pkg.name,
    script: [
      {
        src: '/libs/enquire.min.js'
      }
    ],
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: pkg.description }
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }
    ]
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
    // { src: 'ant-design-vue/dist/antd.less', lang: 'less' },
    'ant-design-vue/dist/antd.css',
    { src: '@/assets/scss/main.scss', lang: 'scss' }
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
    { src: '~plugins/app-sync', ssr: false },
    { src: '~plugins/use', ssr: false },
    // { src: '~plugins/sw', ssr: false }
  ],

  generate: {
    routes: generateRoutes
  },

  /*
  ** Nuxt.js modules
  */
  modules: [
    'nuxt-svg-loader',
    '@nuxtjs/axios',
    '@nuxtjs/pwa'
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
          options: {
            fix: true
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
