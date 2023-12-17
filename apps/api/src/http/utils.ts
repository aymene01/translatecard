import { Request, Response } from 'express'

export const sendErrorResponse = (res: Response, error: { status: number; message: string }) => {
  res.status(error.status).json({ error: error.message })
}

export const sendSuccessResponse = (res: Response, { data, status }: { data: any; status: number }) => {
  res.status(status).json(data)
}

export const parseIdOrSendError = (req: Request, res: Response): number | null => {
  const id = req.business.parseId(req.params.id)
  if (!id) {
    sendErrorResponse(res, { status: 400, message: 'Invalid ID format' })
    return null
  }
  return id
}
