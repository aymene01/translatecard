import { Router } from 'express'
import card from './card'
import { authenticate } from '../middlewares/authenticate'

const router: Router = Router()

router.get('/', (_, res) => {
  res.json({ message: 'Hello World!' })
})

router.use('/card', authenticate, card)

export default router
