import { betterAuth } from 'better-auth'
import { prismaAdapter } from 'better-auth/adapters/prisma'
import { expo } from '@better-auth/expo'
import { prisma } from '@coverly/db'
import { admin } from 'better-auth/plugins/admin'
import { ac, employee, owner } from './permissions.js'
import {
  SERVER_STAGING_URL,
  SERVER_URL,
  SERVER_LOCAL_URL,
} from '@coverly/shared'

const baseURL =
  process.env.NODE_ENV === 'staging'
    ? SERVER_STAGING_URL
    : process.env.NODE_ENV === 'production'
      ? SERVER_URL
      : SERVER_LOCAL_URL

export const auth = betterAuth({
  baseURL,
  basePath: '/auth',
  database: prismaAdapter(prisma, {
    provider: 'postgresql',
  }),
  emailAndPassword: {
    enabled: true,
  },
  plugins: [
    admin({ ac, roles: { owner, employee }, defaultRole: 'employee' }),
    expo(),
  ],
  trustedOrigins: [
    baseURL,
    'coverly://',
    'coverly://*',
    ...(process.env.NODE_ENV === 'development'
      ? ['exp://', 'exp://**', 'exp://192.168.*.*:*/**']
      : []),
  ],
})

export type User = typeof auth.$Infer.Session.user
export type Session = typeof auth.$Infer.Session.session
