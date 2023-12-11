import { Router, Request, Response } from 'express'

const api: Router = Router()

// get all cards
api.get('/', async (req: Request, res: Response) => {
  const cards = await req.business.getAllCards()
  res.json(cards)
})

// get card by id
api.get('/:id', async (req: Request, res: Response) => {
  const id = req.business.parseId(req.params.id)

  if (!id) {
    return res.status(400).json({ error: 'Invalid ID format' })
  }

  const response = await req.business.getCardById({ id })
  if ('error' in response) {
    return res.status(404).json(response.error)
  }
  res.json(response)
})

// create card
api.post('/', async (req: Request, res: Response) => {
  const response = await req.business.createCard(req.body)
  if ('error' in response) {
    return res.status(400).json(response.error)
  }
  res.status(201).json(response)
})

// delete card by id
api.delete('/:id', async (req: Request, res: Response) => {
  const id = req.business.parseId(req.params.id)

  if (!id) {
    return res.status(400).json({ error: 'Invalid ID format' })
  }

  const response = await req.business.deleteCardById({ id })
  if ('error' in response) {
    return res.status(404).json(response.error)
  }
  res.status(204).json(response)
})

// update card by id
api.put('/:id', async (req: Request, res: Response) => {
  const id = req.business.parseId(req.params.id)

  if (!id) {
    return res.status(400).json({ error: 'Invalid ID format' })
  }

  const response = await req.business.updateCardById({ id, ...req.body })
  if ('error' in response) {
    return res.json(response.error)
  }
  res.json(response)
})

export default api
