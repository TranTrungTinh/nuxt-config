import Vue from 'vue'
import Amplify, * as AmplifyModules from 'aws-amplify'
import { AmplifyPlugin } from 'aws-amplify-vue'

const config = {
  Auth: {
    // REQUIRED only for Federated Authentication - Amazon Cognito Identity Pool ID
    identityPoolId: 'ap-southeast-1:d40cb55d-d077-474a-b865-41c81f5eefa8',

    // REQUIRED - Amazon Cognito Region
    region: 'ap-southeast-1',

    // OPTIONAL - Amazon Cognito Federated Identity Pool Region
    // Required only if it's different from Amazon Cognito Region
    identityPoolRegion: 'ap-southeast-1',

    // OPTIONAL - Amazon Cognito User Pool ID
    userPoolId: 'ap-southeast-1_m98QsWt9u',

    // OPTIONAL - Amazon Cognito Web Client ID (26-char alphanumeric string)
    userPoolWebClientId: '3uu4qgdtbn1vcljqn572f37s7l',

    // OPTIONAL - Enforce user authentication prior to accessing AWS resources or not
    // If set false,
    // mandatorySignIn: false,

    // OPTIONAL - Manually set the authentication flow type. Default is 'USER_SRP_AUTH'
    authenticationFlowType: 'USER_SRP_AUTH',
    oauth: {
      domain: 'skg-base.auth.ap-southeast-1.amazoncognito.com',
      scope: ['phone', 'email', 'profile', 'openid', 'aws.cognito.signin.user.admin'],
      redirectSignIn: 'http://localhost:3000/user/signed-in',
      redirectSignOut: 'http://localhost:3000',
      responseType: 'token' // or token, code
    }
  },
  Storage: {
    AWSS3: {
      bucket: 'skg-handmade-dev-s3attachmentsbucket-c7oti88gxxec', // REQUIRED -  Amazon S3 bucket
      region: 'ap-southeast-1' // OPTIONAL -  Amazon service region
    }
  },
  API: {
    endpoints: [
      {
        name: 'SellerAPI',
        endpoint: 'https://5kwwjere54.execute-api.ap-southeast-1.amazonaws.com/dev',
        // custom_header: () => {
        //   return { 'x-api-key': API.ClientAPIKey }
        // }
        custom_header: async () => {
          // return { Authorization : 'token' }
          // Alternatively, with Cognito User Pools use this:
          return { Authorization: (await Amplify.Auth.currentSession()).idToken.jwtToken }
        }
      }
    ]
  },
  Analytics: {
    // OPTIONAL - disable Analytics if true
    disabled: false,
    // OPTIONAL - Allow recording session events. Default is true.
    autoSessionRecord: true,

    AWSPinpoint: {
      // Amazon Pinpoint App Client ID
      appId: 'cb861eee54af42c1b53e091fae3a1f53',
      // Amazon service region
      region: 'us-east-1',
      mandatorySignIn: false
    }
  }
}

Amplify.configure(config)
export default () => {
  Vue.use(AmplifyPlugin, AmplifyModules)
}
