export type HTTPError = {
  error: {
    message: string
    status: number
  }
}

export type HTTPSuccess<T> = {
  data: T
  status: number
}

export type ValidationError = {
  message: string
  missingFields: string[]
}

export type BusinessResponse<T> = HTTPError | HTTPSuccess<T>

export type GenericRequest = Record<string, unknown>
