import { Business } from '@/business/createBusiness'
import { User } from '@prisma/client'

export {}

declare global {
  namespace Express {
    export interface Request {
      business: Business
      user: User
    }
  }
}
