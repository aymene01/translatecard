import { Request, Response, NextFunction } from 'express'

export const authenticate = async (req: Request, res: Response, next: NextFunction) => {
  const { authorization } = req.headers

  const response = await req.business.authenticate({ authorization })

  if ('error' in response) {
    return res.status(response.error.status).json(response.error)
  }

  req.user = response.user

  next()
}
