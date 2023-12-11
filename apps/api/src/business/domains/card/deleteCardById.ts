import { Options } from '@/business/types'
import { Card } from '@prisma/client'

type DeleteCardByIdRequest = {
  id: number
}

type DeleteCardByIdResponse = { deletedCard: Card } | { error: { message: string } }

export const deleteCardById = async (opts: Options, req: DeleteCardByIdRequest): Promise<DeleteCardByIdResponse> => {
  const existingCard = await opts.database.prisma.card.findUnique({
    where: {
      id: req.id,
    },
  })

  if (!existingCard) {
    return {
      error: {
        message: `Card with ID ${req.id} was not found.`,
      },
    }
  }

  try {
    const deletedCard = await opts.database.prisma.card.delete({
      where: {
        id: req.id,
      },
    })

    return { deletedCard }
  } catch (error: unknown) {
    opts.logger.error(`Error deleting card with ID ${req.id}:`, error)

    return {
      error: {
        message: 'Error deleting card data. Please try again later.',
      },
    }
  }
}
