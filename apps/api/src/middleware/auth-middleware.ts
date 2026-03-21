import { AppContext } from '@/types/app-context.js'
import { auth } from '@coverly/auth'
import { createMiddleware } from 'hono/factory'

export const authMiddleware = createMiddleware<AppContext>(async (c, next) => {
  const session = await auth.api.getSession({ headers: c.req.raw.headers })

  if (!session) {
    c.set('session', null)
    c.set('user', null)
    return await next()
  }

  c.set('user', session.user)
  c.set('session', session.session)
  await next()
})
