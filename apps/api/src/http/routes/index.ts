import { Router } from 'express'

const router: Router = Router()

router.get('/', (_, res) => {
  res.json({ message: 'Hello World!' })
})

export default router
