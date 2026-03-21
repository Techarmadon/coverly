import { cors } from 'hono/cors'

type ServerConfig = {
  corsOptions: Parameters<typeof cors>[0]
}

export const config = {
  corsOptions: {
    origin: (origin) => {
      console.log('origin: ', origin)
      console.log('origin.startsWith(exp://): ', origin.startsWith('exp://'))
      console.log(
        'origin.startsWith(coverly://): ',
        origin.startsWith('coverly://'),
      )
      return origin.startsWith('exp://')
        ? origin
        : origin.startsWith('coverly://')
          ? origin
          : undefined
    },
    credentials: true,
  },
} satisfies ServerConfig

export const AUTH_CATCH_ALL_ENDPOINT = '/auth/*'
