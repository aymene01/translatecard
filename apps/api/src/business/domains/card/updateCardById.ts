import { Options } from '@/business/types'
import { Card, Prisma } from '@prisma/client'
import { BusinessResponse, buildError, buildSuccess } from '@translatecard/api-utils'
import { isEmpty } from 'lodash'

type DataToUpdate = {
  content?: string
  traduction?: string
  title?: string
}

type UpdateCardByIdRequest = {
  id: number
} & Partial<DataToUpdate>

type UpdateCardByIdResponse = BusinessResponse<Card>

export const updateCardById = async (opts: Options, req: UpdateCardByIdRequest): Promise<UpdateCardByIdResponse> => {
  const updatePayload = buildUpdatePayload(req)

  if (isEmpty(Object.keys(updatePayload))) {
    return buildError('No data to update', 400)
  }

  const existingCard = await opts.database.prisma.card.findUnique({
    where: { id: req.id },
  })

  if (!existingCard) {
    return buildError('Card not found', 404)
  }

  try {
    const updatedCard = await opts.database.prisma.card.update({
      where: { id: req.id },
      data: updatePayload,
    })

    return buildSuccess(updatedCard)
  } catch (error: unknown) {
    opts.logger.error(`Error updating card with ID ${req.id}:`, error)

    return buildError('There was an issue updating the card', 500)
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
