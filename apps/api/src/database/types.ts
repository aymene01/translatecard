import { Logger } from '@translatecard/toolbox'

export type DatabaseOption = {
  logger: Logger
  databaseUrl: string
  connectionPoolSize: number
  queryTimeout: number
}
