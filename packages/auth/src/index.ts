import { betterAuth } from 'better-auth'
import { prismaAdapter } from 'better-auth/adapters/prisma'
import { expo } from '@better-auth/expo'
import { prisma } from '@coverly/db'

export type AppRole = 'owner' | 'employee'

export const auth = betterAuth({
  database: prismaAdapter(prisma, {
    provider: 'postgresql',
  }),
  emailAndPassword: {
    enabled: true,
  },
  user: {
    additionalFields: {
      role: {
        type: ['owner', 'employee'],
        input: false,
        required: false,
        defaultValue: 'employee',
      },
    },
  },
  plugins: [expo()],
  trustedOrigins: [
    process.env.BETTER_AUTH_URL ?? 'http://localhost:3000',
    'coverly://',
    'coverly://*',
    ...(process.env.NODE_ENV === 'development'
      ? ['exp://', 'exp://**', 'exp://192.168.*.*:*/**']
      : []),
  ],
})
