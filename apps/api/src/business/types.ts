import { Logger } from '@translatecard/toolbox'
import { Database } from '@/database'
import { IamService } from '@/iam/createIamService'

export type Options = {
  logger: Logger
  database: Database
  iamService: IamService
}
