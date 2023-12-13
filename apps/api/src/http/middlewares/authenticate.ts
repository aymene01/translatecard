import { Request, Response, NextFunction } from 'express'

export const authenticate = (req: Request, res: Response, next: NextFunction) => {
  const { authorization } = req.headers

  if (!req.business.authenticate({ authorization })) return res.status(401).json({ error: 'Unauthorized' })

  next()
}
