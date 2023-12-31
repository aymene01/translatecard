import pino, { Logger as LoggerType } from 'pino'
import pretty from 'pino-pretty'

const stream = pretty({
  levelFirst: true,
  colorize: true,
  ignore: 'time,hostname,pid',
})

export const logger = pino(
  {
    name: 'translate-cards-logger',
    level: process.env.NODE_ENV === 'development' ? 'debug' : 'info',
  },
  stream,
)

export type Logger = LoggerType
