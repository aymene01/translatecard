import { Router, Request, Response } from 'express'
import { sendErrorResponse, sendSuccessResponse, parseIdOrSendError } from '@/http/utils'

const api: Router = Router()

api.get('/', async (req: Request, res: Response) => {
  const response = await req.business.getAllCards()
  if ('error' in response) {
    return sendErrorResponse(res, response.error)
  }
  return sendSuccessResponse(res, response)
})

api.get('/:id', async (req: Request, res: Response) => {
  const id = parseIdOrSendError(req, res)
  if (id) {
    const response = await req.business.getCardById({ id })
    if ('error' in response) {
      return sendErrorResponse(res, response.error)
    }
    return sendSuccessResponse(res, response)
  }
})

api.post('/', async (req: Request, res: Response) => {
  const response = await req.business.createCard(req.body)
  if ('error' in response) {
    return sendErrorResponse(res, response.error)
  }
  return sendSuccessResponse(res, response)
})

api.delete('/:id', async (req: Request, res: Response) => {
  const id = parseIdOrSendError(req, res)
  if (id) {
    const response = await req.business.deleteCardById({ id })
    if ('error' in response) {
      return sendErrorResponse(res, response.error)
    }
    return sendSuccessResponse(res, response)
  }
})

api.put('/:id', async (req: Request, res: Response) => {
  const id = parseIdOrSendError(req, res)
  if (id) {
    const response = await req.business.updateCardById({ id, ...req.body })
    if ('error' in response) {
      return sendErrorResponse(res, response.error)
    }
    return sendSuccessResponse(res, response)
  }
})

export default api
