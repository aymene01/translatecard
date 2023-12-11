import { createBusiness } from '@/business/createBusiness'
import { createServer } from '@/http/createServer'
import { createIamService } from '@/iam/createIamService'
import { connectDatabase } from '@/database'
import { Logger, logger, waitForSignal } from '@translatecard/toolbox'
import * as Env from './env'

const api = async (logger: Logger) => {
  // database
  const database = connectDatabase({
    logger,
    connectionPoolSize: Env.DATABASE_CONNECTION_POOL_SIZE,
    databaseUrl: Env.DATABASE_URL,
    queryTimeout: Env.DATABASE_QUERY_TIMEOUT,
  })

  // services
  const iamService = createIamService({
    logger,
    database,
    jwtDuration: Env.JWT_DURATION,
    jwtSecretKey: Env.JWT_SECRET,
  })

  const business = createBusiness({
    logger,
    database,
    iamService,
  })

  //let's rock 🚀
  const server = createServer({
    logger,
    business,
    listenAddr: Env.LISTEN_ADDR,
    keepAliveTimeout: Env.KEEP_ALIVE_TIMEOUT,
    mouthPath: Env.MOUNT_PATH,
  })

  await server.start()
  await database.start()
  await waitForSignal(['SIGINT', 'SIGTERM'])
  logger.info('Shut down the server...👋')
  await database.stop()
  await server.stop()
}

api(logger).catch(err => {
  console.log(err)
  process.exit(0)
})
