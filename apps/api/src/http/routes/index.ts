import { Router } from 'express'
import card from './card'
import auth from './auth'
import { authenticate } from '../middlewares/authenticate'

const router: Router = Router()

router.get('/', (_, res) => {
  res.json({ message: 'Hello World!' })
})

router.use('/card', authenticate, card)
router.use('/auth', auth)

export default router
