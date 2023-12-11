import { isString } from 'lodash'
import { FetchArgs, FormatedFetchOptions, FetchArgsQl } from './types'
import { GraphQLClient, Variables } from 'graphql-request'

const API_BASE_URL = 'http://localhost:8080/api/v1'

//http
const safeFetch = ({
  resources,
  apiBaseUrl = API_BASE_URL,
  options = { method: 'GET' },
}: FetchArgs): Promise<Response> => {
  const jswt = localStorage.getItem('token')

  const headers: Record<string, any> = {
    Accept: 'application/json',
    'Content-Type': 'application/json',
    ...options,
  }

  if (jswt) {
    headers.authorization = `Bearer ${jswt}`
  }

  const formattedOptions: FormatedFetchOptions = {
    ...options,
    headers,
    body: isString(options.body) ? options.body : JSON.stringify(options.body),
  }

  const url = apiBaseUrl + '/' + resources

  return fetch(url, formattedOptions)
}

export const fetcher = async (args: FetchArgs): Promise<any> => {
  const response = await safeFetch(args)

  if (!response.ok) {
    throw new Error(response.statusText)
  }

  const data = await response.json()

  return data
}

// graphql request
const safeFetchQL = <T>({ apiBaseUrl = API_BASE_URL, query, variables }: FetchArgsQl<T>): Promise<any> => {
  const jswt = localStorage.getItem('token')

  const options: Record<string, any> = { headers: {} }
  if (jswt) {
    options.headers.authorization = `Bearer ${jswt}`
  }

  const graphQLClient = new GraphQLClient(apiBaseUrl, options)

  return graphQLClient.request(query, variables as Variables)
}

export const fetcherQL = async <T>(args: FetchArgsQl<T>): Promise<any> => {
  try {
    return await safeFetchQL(args)
  } catch (err: any) {
    throw new Error(err.response.errors[0].message)
  }
}
