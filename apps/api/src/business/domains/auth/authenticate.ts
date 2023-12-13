import { Options } from '@/business/types'

type AuthenticateRequest = {
  authorization?: string
}

type AuthenticateResponse = boolean

export const authenticate = (opts: Options, req: AuthenticateRequest): AuthenticateResponse => {
  const { authorization } = req

  if (!authorization || !authorization.startsWith('Bearer ')) return false

  const [_, token] = authorization.split(' ')

  if (token !== 'secret') return false

  return true
}
