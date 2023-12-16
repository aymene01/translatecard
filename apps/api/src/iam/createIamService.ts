import { Options } from './types'
import { comparePassword, generateJwt, hashPassword, verifyJwt } from './auth'
import { partial } from 'lodash'

export const createIamService = (opts: Options) => {
  return {
    generateJwt: partial(generateJwt, opts),
    verifyJwt: partial(verifyJwt, opts),
    hashPassword,
    comparePassword,
  }
}

export type IamService = ReturnType<typeof createIamService>
