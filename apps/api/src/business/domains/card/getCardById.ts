import { Options } from '@/business/types'
import { Card } from '@prisma/client'
import { BusinessResponse, buildError, buildSuccess } from '@translatecard/api-utils'

type GetCardByIdRequest = {
  id: number
}

type GetCardByIdResponse = BusinessResponse<Card>

export const getCardById = async (opts: Options, req: GetCardByIdRequest): Promise<GetCardByIdResponse> => {
  try {
    const card = await opts.database.prisma.card.findUnique({
      where: {
        id: req.id,
      },
    })

    if (!card) {
      return buildError('Card not found', 404)
    }

    return buildSuccess(card)
  } catch (error: unknown) {
    opts.logger.error('Error retrieving card:', error)

    return buildError('There was an issue retrieving the card', 500)
  }
}
