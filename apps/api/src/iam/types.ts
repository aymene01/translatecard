import { Database } from '@/database'
import { Logger } from '@translatecard/toolbox'

export type Options = {
  logger: Logger
  database: Database
  jwtSecretKey: string
  // in ms
  jwtDuration: number
}
