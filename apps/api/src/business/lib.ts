import { isEmpty } from 'lodash'

export type HTTPError = {
  error: {
    message: string
    status: number
  }
}

export const buildError = (message: string, status: number): HTTPError => ({
  error: {
    message,
    status,
  },
})

export const buildSuccess = <T>(data: T): T => {
  return data
}

type GenericRequest = Record<string, unknown>

interface ValidationError {
  message: string
  missingFields: string[]
}

export function validateRequest<T extends GenericRequest>(
  req: Partial<T>,
  requiredFields: (keyof T)[],
): ValidationError | null {
  const missingFields = requiredFields.filter(field => req[field] === undefined || req[field] === null)

  if (!isEmpty(missingFields)) {
    return {
      message: 'Request is missing required fields',
      missingFields: missingFields as string[],
    }
  }

  return null
}

interface ValidationError {
  message: string
  missingFields: string[]
}

export const formatValidationError = (error: ValidationError): string => {
  const { message, missingFields } = error
  const missingFieldsString = missingFields.join(', ')
  return `${message}: ${missingFieldsString}`
}
