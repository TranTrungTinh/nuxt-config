import gql from 'graphql-tag'

export default gql`
  query getAllCategories($limit: Int!) {
    allCategories(limit: $limit) {
      items {
        name
      }
    }
  }
`
