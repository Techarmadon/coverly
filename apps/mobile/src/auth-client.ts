import { createAuthClient } from 'better-auth/react'
import { expoClient } from '@better-auth/expo/client'
import * as SecureStore from 'expo-secure-store'
import {
  SERVER_LOCAL_URL,
  SERVER_STAGING_URL,
  SERVER_URL,
} from '@coverly/shared'

const baseURL = `${
  process.env.NODE_ENV === 'staging'
    ? SERVER_STAGING_URL
    : process.env.NODE_ENV === 'production'
      ? SERVER_URL
      : SERVER_LOCAL_URL
}/auth`

console.log('baseURL: ', baseURL)

export const authClient = createAuthClient({
  baseURL,
  plugins: [
    expoClient({
      scheme: 'coverly',
      storagePrefix: 'coverly',
      storage: SecureStore,
    }),
  ],
})
