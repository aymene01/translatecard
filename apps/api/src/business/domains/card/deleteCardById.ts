import { Options } from '@/business/types'
import { Card } from '@prisma/client'
import { buildError, buildSuccess, BusinessResponse } from '@translatecard/api-utils'

type DeleteCardByIdRequest = {
  id: number
}

type DeleteCardByIdResponse = BusinessResponse<Card>

export const deleteCardById = async (opts: Options, req: DeleteCardByIdRequest): Promise<DeleteCardByIdResponse> => {
  const existingCard = await opts.database.prisma.card.findUnique({
    where: {
      id: req.id,
    },
  })

  if (!existingCard) {
    return buildError('Card not found', 404)
  }

  try {
    const deletedCard = await opts.database.prisma.card.delete({
      where: {
        id: req.id,
      },
    })

    return buildSuccess(deletedCard)
  } catch (error: unknown) {
    opts.logger.error(`Error deleting card with ID ${req.id}:`, error)

    return buildError('There was an issue deleting the card', 500)
  }
}
