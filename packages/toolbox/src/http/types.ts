type HTTPVerb = 'GET' | 'POST' | 'PUT' | 'DELETE' | 'HEAD' | 'OPTIONS'

export type FetchOptions = {
  method: HTTPVerb
  headers?: HeadersInit
}

export type SafeFetchOptions = FetchOptions & {
  body?: unknown
}

export type FetchArgs = {
  apiBaseUrl?: string
  resources?: string | string[]
  options?: SafeFetchOptions
}

export type FormatedFetchOptions = FetchOptions & {
  body: string
}

export type FetchResponse = {
  json: () => Promise<any>
}

export type FetchArgsQl<T> = {
  apiBaseUrl?: string
  query: string
  variables?: T
}
