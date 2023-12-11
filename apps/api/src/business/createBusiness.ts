import { Options } from './types'
import { partial } from 'lodash'
import { createCard, getAllCards, getCardById, deleteCardById, updateCardById } from './domains/card'
import { parseId } from './helpers/parseId'

export const createBusiness = (opts: Options) => {
  return {
    getAllCards: partial(getAllCards, opts),
    getCardById: partial(getCardById, opts),
    createCard: partial(createCard, opts),
    deleteCardById: partial(deleteCardById, opts),
    updateCardById: partial(updateCardById, opts),
    parseId,
  }
}

export type Business = ReturnType<typeof createBusiness>
