import { Options } from '@/business/types'
import { Card } from '@prisma/client'

export type GetAllCardsResponse = Card[] | { error: string }

export const getAllCards = async (opts: Options): Promise<GetAllCardsResponse> => {
  try {
    const cards: Card[] = await opts.database.prisma.card.findMany()

    return cards
  } catch (error: any) {
    opts.logger.error(`Error retrieving cards: ${error.message}`)

    return { error: 'Unable to retrieve cards at this time. Please try again later.' }
  }
}
