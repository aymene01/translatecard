import { Options } from '@/business/types'
import {
  BusinessResponse,
  buildError,
  buildSuccess,
  formatValidationError,
  validateRequest,
} from '@translatecard/api-utils'
import { User } from '@prisma/client'

type LoginRequest = {
  username: string
  password: string
}

type LoginResponse = BusinessResponse<{
  user: User
  token: string
}>

export const login = async (opts: Options, req: LoginRequest): Promise<LoginResponse> => {
  const error = validateRequest(req, ['username', 'password'])

  if (error) {
    return buildError(formatValidationError(error), 400)
  }

  const user = await opts.database.prisma.user.findUnique({
    where: {
      username: req.username,
    },
  })

  if (!user) {
    return buildError('Invalid username or password', 401)
  }

  const passwordValid = await opts.iamService.comparePassword(req.password, user.password)

  if (!passwordValid) {
    return buildError('Invalid username or password', 401)
  }

  const token = opts.iamService.generateJwt({ username: user.username, uuid: user.id })

  return buildSuccess({
    user,
    token,
  })
}
