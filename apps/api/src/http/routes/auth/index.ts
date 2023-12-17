import { Router } from 'express'
import { sendErrorResponse, sendSuccessResponse } from '@/http/utils'

const api: Router = Router()

api.post('/login', async (req, res) => {
  const response = await req.business.login(req.body)

  if ('error' in response) {
    return sendErrorResponse(res, response.error)
  }

  return sendSuccessResponse(res, response)
})

api.post('/register', async (req, res) => {
  const response = await req.business.register(req.body)

  if ('error' in response) {
    return sendErrorResponse(res, response.error)
  }

  return sendSuccessResponse(res, response)
})

export default api
