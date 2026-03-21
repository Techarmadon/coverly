import { Hono } from 'hono'
import { cors } from 'hono/cors'
import { AUTH_CATCH_ALL_ENDPOINT, config } from './config.js'
import { authMiddleware } from './middleware/auth-middleware.js'
import { AppContext } from './types/app-context.js'
import { logger } from 'hono/logger'
import { auth } from '@coverly/auth'

const app = new Hono<AppContext>()

app.use(logger())

app.use(cors(config.corsOptions))

app.use(AUTH_CATCH_ALL_ENDPOINT, authMiddleware)

app.on(['GET', 'POST'], AUTH_CATCH_ALL_ENDPOINT, (c) => auth.handler(c.req.raw))

export default app
