import { Storage } from 'aws-amplify'

export const getS3Image = async (key, level = 'protected') => {
  const url = await Storage.get(key, { level })
  return url
}
