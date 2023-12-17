import { Options } from '@/business/types'
import { Card } from '@prisma/client'
import {
  buildError,
  validateRequest,
  HTTPError,
  formatValidationError,
  buildSuccess,
  HTTPSuccess,
} from '@translatecard/api-utils'

type CreateCardRequest = {
  content: string
  traduction: string
  title: string
}

type CreateCardResponse = HTTPSuccess<Card> | HTTPError

export const createCard = async (opts: Options, req: Partial<CreateCardRequest>): Promise<CreateCardResponse> => {
  const error = validateRequest(req, ['content', 'traduction', 'title'])

  if (error) return buildError(formatValidationError(error), 400)

  const existingCard = await opts.database.prisma.card.findFirst({
    where: {
      title: req.title!,
    },
  })

  if (existingCard) return buildError('Card already exists', 409)

  try {
    const newCardData = {
      content: req.content!,
      traduction: req.traduction!,
      title: req.title!,
      createdAt: new Date(),
      updatedAt: new Date(),
    }

    const card = await opts.database.prisma.card.create({ data: newCardData })

    return buildSuccess(card)
  } catch (error: unknown) {
    opts.logger.error(`Error creating card: ${error}`)
    return buildError('There was an issue creating the card', 500)
  }
}
