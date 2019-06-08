/* eslint-disable no-unused-vars */
import Vue from 'vue'
import AWSAppSyncClient, { AUTH_TYPE } from 'aws-appsync'
import VueApollo from 'vue-apollo'
import { Auth } from 'aws-amplify'
import * as localForage from 'localforage'

const APPSYNC_API_KEY = ''

const client1 = new AWSAppSyncClient({
  url: 'https://fntt6ikhvzbrvf7qmj5cd7wneu.appsync-api.ap-southeast-1.amazonaws.com/graphql',
  region: 'ap-southeast-1',
  auth: { type: AUTH_TYPE.API_KEY, apiKey: APPSYNC_API_KEY },
  disableOffline: true,
  offlineConfig: {
    keyPrefix: 'public'
  }
})

const client2 = new AWSAppSyncClient({
  url: 'https://fntt6ikhvzbrvf7qmj5cd7wneu.appsync-api.ap-southeast-1.amazonaws.com/graphql',
  region: 'ap-southeast-1',
  auth: {
    type: AUTH_TYPE.AMAZON_COGNITO_USER_POOLS,
    jwtToken: async () => (await Auth.currentSession()).getIdToken().getJwtToken()
  },
  disableOffline: false,
  offlineConfig: {
    callback: (err, succ) => {
      if (err) {
        const { mutation, variables } = err

        console.warn(`ERROR for ${mutation}`, err)
      } else {
        const { mutation, variables } = succ

        console.info(`SUCCESS for ${mutation}`, succ)
      }
    },
    storage: localForage,
    keyPrefix: 'private'
  }
})

const apolloProvider = new VueApollo({
  defaultClient: client2,
  clients: {
    public: client1,
    private: client2
  }
})
Vue.use(VueApollo)

export default ({ app }) => {
  app.apolloProvider = apolloProvider
}
