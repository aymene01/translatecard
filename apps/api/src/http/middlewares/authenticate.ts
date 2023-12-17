import { Request, Response, NextFunction } from 'express'
import { sendErrorResponse } from '../utils'

export const authenticate = async (req: Request, res: Response, next: NextFunction) => {
  const { authorization } = req.headers

  const response = await req.business.authenticate({ authorization })

  if ('error' in response) {
    return sendErrorResponse(res, response.error)
  }

  req.user = response.data.user

  next()
}
