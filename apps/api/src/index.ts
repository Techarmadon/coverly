import 'dotenv/config'

import app from './app.js'
import { serve } from '@hono/node-server'

const port = Number(process.env.PORT ?? 8082)

export default {
  port,
  fetch: app.fetch,
}

if (process.env.NODE_ENV !== 'production') {
  serve({ fetch: app.fetch, port, hostname: '0.0.0.0' }, (info) => {
    console.log(`Server is running on http://${info.address}:${info.port}`)
  })
}
