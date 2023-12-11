import { Logger } from '@translatecard/toolbox'
import { Business } from '@/business/createBusiness'

export type Options = {
  logger: Logger
  business: Business
  listenAddr: { host: string; port: number }
  keepAliveTimeout: number
  mouthPath: string
}
