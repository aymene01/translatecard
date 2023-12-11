import { Options } from '@/business/types'
import { Card } from '@prisma/client'

type GetCardByIdRequest = {
  id: number
}

type GetCardByIdResponse = { card: Card } | { error: { message: string } }

export const getCardById = async (opts: Options, req: GetCardByIdRequest): Promise<GetCardByIdResponse> => {
  try {
    const card = await opts.database.prisma.card.findUnique({
      where: {
        id: req.id,
      },
    })

    if (!card) {
      return {
        error: {
          message: `Card with ID ${req.id} not found.`,
        },
      }
    }

    return { card }
  } catch (error: unknown) {
    opts.logger.error('Error retrieving card:', error)

    return {
      error: {
        message: 'Error retrieving card data. Please try again later.',
      },
    }
  }
}
