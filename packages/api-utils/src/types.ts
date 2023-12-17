export type HTTPError = {
  error: {
    message: string
    status: number
  }
}

export type ValidationError = {
  message: string
  missingFields: string[]
}

export type GenericRequest = Record<string, unknown>