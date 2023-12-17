import { Options } from '@/business/types'
import { Card } from '@prisma/client'
import { BusinessResponse, buildError, buildSuccess } from '@translatecard/api-utils'

export type GetAllCardsResponse = BusinessResponse<Card[]>

export const getAllCards = async (opts: Options): Promise<GetAllCardsResponse> => {
  try {
    const cards: Card[] = await opts.database.prisma.card.findMany()

    return buildSuccess(cards)
  } catch (error: any) {
    opts.logger.error(`Error retrieving cards: ${error.message}`)

    return buildError('There was an issue retrieving the cards', 500)
  }
}
