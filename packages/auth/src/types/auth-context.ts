import type { Session, User } from '../index.js'

export type AuthContext = {
  user: User | null
  session: Session | null
}
