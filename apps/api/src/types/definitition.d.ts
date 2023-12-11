import { Business } from '@/business/createBusiness'

export {}

declare global {
  namespace Express {
    export interface Request {
      business: Business
    }
  }
}
