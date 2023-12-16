import { Router } from 'express'

const api: Router = Router()

api.post('/login', async (req, res) => {
  const response = await req.business.login(req.body)

  if ('error' in response) {
    return res.status(response.error.status).json(response.error.message)
  }

  return res.status(200).json(response)
})

api.post('/register', async (req, res) => {
  const response = await req.business.register(req.body)

  if ('error' in response) {
    return res.status(response.error.status).json({ message: response.error.message })
  }

  return res.status(200).json(response)
})

export default api
