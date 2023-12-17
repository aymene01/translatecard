import { ValidationError } from '../types'

export const formatValidationError = (error: ValidationError): string => {
    const { message, missingFields } = error
    const missingFieldsString = missingFields.join(', ')
    return `${message}: ${missingFieldsString}`
  }