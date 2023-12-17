import { Options } from '@/business/types'
import { HTTPError, HTTPSuccess, buildError, buildSuccess } from '@translatecard/api-utils'
import { JwtPayload } from 'jsonwebtoken'
import { User } from '@prisma/client'

type AuthenticateRequest = {
  authorization?: string
}

type AuthenticateResponse = HTTPError | HTTPSuccess<{ user: User }>

const validateAuthorizationHeader = (authorization?: string): string | null => {
  if (!authorization || !authorization.startsWith('Bearer ')) {
    return null
  }
  return authorization.split(' ')[1]
}

const extractUuidFromToken = (opts: Options, token: string): string | null => {
  try {
    const jwtPayload = opts.iamService.verifyJwt(token) as JwtPayload
    return jwtPayload.uuid || null
  } catch (error) {
    opts.logger.error('Error while decoding JWT:', error)
    return null
  }
}

const findUserById = async (opts: Options, userId: string): Promise<User | null> => {
  try {
    return await opts.database.prisma.user.findUnique({
      where: { id: userId },
    })
  } catch (error) {
    opts.logger.error('Error while fetching user:', error)
    return null
  }
}

export const authenticate = async (opts: Options, req: AuthenticateRequest): Promise<AuthenticateResponse> => {
  const token = validateAuthorizationHeader(req.authorization)

  if (!token) {
    return buildError('Unauthorized: Invalid or missing token.', 401)
  }

  const uuid = extractUuidFromToken(opts, token)
  if (!uuid) {
    return buildError('Unauthorized: Invalid token.', 401)
  }

  const user = await findUserById(opts, uuid)
  if (!user) {
    return buildError('Unauthorized: User not found.', 401)
  }

  return buildSuccess({ user })
}
