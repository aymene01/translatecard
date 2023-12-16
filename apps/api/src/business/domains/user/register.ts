import { Options } from '@/business/types'
import { HTTPError, buildError, formatValidationError, validateRequest } from '@/business/lib'
import { User } from '@prisma/client'
import { isEmpty } from 'lodash'

type RegisterRequest = {
  username: string
  password: string
  passwordConfirmation: string
  name: string
}

type RegisterResponse =
  | {
      user: User
      token: string
    }
  | HTTPError

type ValidationError = {
  message: string
  missingFields: (keyof RegisterRequest)[]
}

const validateCreateCardRequest = (req: Partial<RegisterRequest>): ValidationError | null => {
  const requiredFields: (keyof RegisterRequest)[] = ['username', 'password', 'passwordConfirmation', 'name']
  const missingFields = requiredFields.filter(field => !req[field])

  if (!isEmpty(missingFields)) {
    return {
      message: 'Request is missing required fields',
      missingFields,
    }
  }

  return null
}

export const register = async (opts: Options, req: RegisterRequest): Promise<RegisterResponse> => {
  const error = validateRequest(req, ['username', 'password', 'passwordConfirmation', 'name'])

  if (error) {
    return buildError(formatValidationError(error), 400)
  }

  const { username, password, passwordConfirmation, name} = req

  const existingUser = await opts.database.prisma.user.findUnique({
    where: {
      username,
    },
  })

  if (existingUser) {
    return buildError('User already exists', 400)
  }

  if (password !== passwordConfirmation) {
    return buildError('Password and password confirmation do not match', 400)
  }

  const user = await opts.database.prisma.user.create({
    data: {
      username,
      name,
      password: await opts.iamService.hashPassword(password),
    },
  })

  const token = opts.iamService.generateJwt({ username: user.username, uuid: user.id })

  return {
    user,
    token,
  }
}
