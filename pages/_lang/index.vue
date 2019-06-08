<template>
  <section>
    {{ $t('home.head.title') }}
    <a-button @click="getCategories">
      Test
    </a-button>
    <a-button @click="trackEvent">
      Test trackEvent
    </a-button>
    <a-button @click="trackCustomEvent">
      Test custom event
    </a-button>
  </section>
</template>

<script>
/* eslint-disable no-unused-vars */
import gql from 'graphql-tag'
import getAllCategories from '@/api/graphql/queries'
import Analytics from '@aws-amplify/analytics'

export default {
  mounted() {},
  methods: {
    trackEvent() {
      // Record an event
      Analytics.record({ name: 'trackEvent' })
    },
    trackCustomEvent() {
      // Record a custom event
      Analytics.record({
        name: 'Album',
        attributes: { genre: 'Rock', year: '1989' }
      })
    },
    getCategories() {
      console.log('xxx')
      this.$apollo.provider.clients.private.query({
        query: gql`
          query getAllCategories($limit: Int!) {
            allCategories(limit: $limit) {
              items {
                name
              }
            }
          }
        `,
        error(e) {
          this.$message.error(e.message || 'Get tasks failed!')
        },
        variables: {
          limit: 10
        },
        update(data) {
          console.log('xxx:', data)
          return data
        }
      })
    }
  },
  // https://akryum.github.io/vue-apollo/guide/apollo/queries.html#simple-query
  // https://akryum.github.io/vue-apollo/guide/multiple-clients.html
  apollo: {
    // $client: 'private',
    // categories: {
    //   query: () => getAllCategories,
    //   error(e) {
    //     this.$message.error(e.message || 'Get tasks failed!')
    //   },
    //   variables: {
    //     limit: 10
    //   },
    //   update(data) {
    //     console.log('xxx:', data)
    //     return data
    //   }
    // }
  }
}
</script>
