import { HTTPError } from '../types'

export const buildError = (message: string, status: number): HTTPError => ({
  error: {
    message,
    status,
  },
})