import { Options } from '@/business/types'
import { Card, Prisma } from '@prisma/client'
import { isEmpty } from 'lodash'

type DataToUpdate = {
  content?: string
  traduction?: string
  title?: string
}

type UpdateCardByIdRequest = {
  id: number
} & Partial<DataToUpdate>

type UpdateCardByIdResponse = { updatedCard: Card } | { error: { message: string } }

export const updateCardById = async (opts: Options, req: UpdateCardByIdRequest): Promise<UpdateCardByIdResponse> => {
  const updatePayload = buildUpdatePayload(req)

  if (isEmpty(Object.keys(updatePayload))) {
    return {
      error: {
        message: 'No valid fields provided for update.',
      },
    }
  }

  const existingCard = await opts.database.prisma.card.findUnique({
    where: { id: req.id },
  })

  if (!existingCard) {
    return {
      error: {
        message: `Card with ID ${req.id} does not exist.`,
      },
    }
  }

  try {
    const updatedCard = await opts.database.prisma.card.update({
      where: { id: req.id },
      data: updatePayload,
    })

    return { updatedCard }
  } catch (error: unknown) {
    opts.logger.error(`Error updating card with ID ${req.id}:`, error)

    return {
      error: {
        message: 'Error updating card data. Please try again later.',
      },
    }
  }
}

function buildUpdatePayload(req: UpdateCardByIdRequest): Prisma.CardUpdateInput {
  const { id, ...fields } = req
  return Object.entries(fields).reduce((payload, [key, value]) => {
    if (value !== undefined) {
      payload[key as keyof DataToUpdate] = value
    }
    return payload
  }, {} as Prisma.CardUpdateInput)
}
