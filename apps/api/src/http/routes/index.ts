import { Router } from 'express'
import card from './card'

const router: Router = Router()

router.get('/', (_, res) => {
  res.json({ message: 'Hello World!' })
})

router.use('/card', card)

export default router
