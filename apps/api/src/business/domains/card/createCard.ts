import { Options } from '@/business/types'
import { Card } from '@prisma/client'
import { isEmpty } from 'lodash'

type CreateCardRequest = {
  content: string
  traduction: string
  title: string
}

type ValidationError = {
  message: string
  missingFields: string[]
}

type CreateCardResponse = Card | { error: ValidationError }

const validateCreateCardRequest = (req: Partial<CreateCardRequest>): ValidationError | null => {
  const requiredFields: (keyof CreateCardRequest)[] = ['content', 'traduction', 'title']
  const missingFields = requiredFields.filter(field => !req[field])

  if (!isEmpty(missingFields)) {
    return {
      message: 'Request is missing required fields',
      missingFields,
    }
  }

  return null
}

export const createCard = async (opts: Options, req: Partial<CreateCardRequest>): Promise<CreateCardResponse> => {
  const error = validateCreateCardRequest(req)

  if (error) return { error }

  try {
    const newCardData = {
      content: req.content!,
      traduction: req.traduction!,
      title: req.title!,
      createdAt: new Date(),
      updatedAt: new Date(),
    }

    const card = await opts.database.prisma.card.create({ data: newCardData })

    return card
  } catch (error: unknown) {
    opts.logger.error(`Error creating card: ${error}`)
    return {
      error: {
        message: 'There was an issue creating the card',
        missingFields: ['database error'],
      },
    }
  }
}
