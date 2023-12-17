import { isEmpty } from 'lodash'
import { ValidationError, GenericRequest } from '../types'

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
