import Vue from 'vue'
import Amplify, * as AmplifyModules from 'aws-amplify'
import { AmplifyPlugin } from 'aws-amplify-vue'

const config = {
  Auth: {
    // REQUIRED only for Federated Authentication - Amazon Cognito Identity Pool ID
    identityPoolId: 'ap-southeast-1:5a1e862a-c390-4743-a0c0-9e75a3fc688d',

    // REQUIRED - Amazon Cognito Region
    region: 'ap-southeast-1',

    // OPTIONAL - Amazon Cognito Federated Identity Pool Region
    // Required only if it's different from Amazon Cognito Region
    identityPoolRegion: 'ap-southeast-1',

    // OPTIONAL - Amazon Cognito User Pool ID
    userPoolId: 'ap-southeast-1_9R3VXKOob',

    // OPTIONAL - Amazon Cognito Web Client ID (26-char alphanumeric string)
    userPoolWebClientId: '7iabldf2rbqeogkjifd151j8e',

    // OPTIONAL - Enforce user authentication prior to accessing AWS resources or not
    // If set false,
    mandatorySignIn: true,

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
      bucket: 'tds-storage-dev-s3attachmentsbucket-pb0vyvoo7x9g', // REQUIRED -  Amazon S3 bucket
      region: 'ap-southeast-1' // OPTIONAL -  Amazon service region
    }
  },
  API: {
    endpoints: [
      {
        name: 'ClientAPI',
        endpoint: 'https://krtsegmio9.execute-api.ap-southeast-1.amazonaws.com/dev'
        // custom_header: () => {
        //   return { 'x-api-key': API.ClientAPIKey }
        // }
      }
    ]
  }
}

Amplify.configure(config)

export default () => {
  Vue.use(AmplifyPlugin, AmplifyModules)
}
