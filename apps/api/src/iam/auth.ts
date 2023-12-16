import * as bcrypt from 'bcrypt'
import * as jwt from 'jsonwebtoken'
import { Options } from './types'

type Payload = {
  uuid: string
  username: string
}

export const hashPassword = async (password: string) => {
  const salt = await bcrypt.genSalt(10)
  return bcrypt.hash(password, salt)
}

export const comparePassword = async (password: string, hash: string) => {
  return bcrypt.compare(password, hash)
}

export const generateJwt = (opts: Options, payload: Payload) => {
  return jwt.sign(payload, opts.jwtSecretKey, {
    expiresIn: opts.jwtDuration,
  })
}

export const verifyJwt = (opts: Options, token: string) => {
  return jwt.verify(token, opts.jwtSecretKey)
}
