import { Options } from '@/business/types';
import { Card, Prisma } from '@prisma/client';

type DataToUpdate = {
  content?: string;
  traduction?: string;
  title?: string;
};

type UpdateCardByIdRequest = {
  id: number;
} & Partial<DataToUpdate>;

type UpdateCardByIdResponse = { updatedCard: Card } | { error: { message: string } };

export const updateCardById = async (
  opts: Options, 
  req: UpdateCardByIdRequest
): Promise<UpdateCardByIdResponse> => {
  const updatePayload = buildUpdatePayload(req);

  if (Object.keys(updatePayload).length === 0) {
    return {
      error: {
        message: 'No valid fields provided for update.',
      },
    };
  }

  try {
    const updatedCard = await opts.database.prisma.card.update({
      where: { id: req.id },
      data: updatePayload,
    });

    return { updatedCard };
  } catch (error) {
    opts.logger.error(`Error updating card with ID ${req.id}:`, error);

    if (isRecordNotFoundError(error)) {
      return {
        error: {
          message: `Card with ID ${req.id} does not exist.`,
        },
      };
    }

    return {
      error: {
        message: 'Error updating card data. Please try again later.',
      },
    };
  }
};

function buildUpdatePayload(req: UpdateCardByIdRequest): Prisma.CardUpdateInput {
  const { id, ...fields } = req;
  return Object.entries(fields).reduce((payload, [key, value]) => {
    if (value !== undefined) {
      payload[key as keyof DataToUpdate] = value;
    }
    return payload;
  }, {} as Prisma.CardUpdateInput);
}

function isRecordNotFoundError(error: unknown): boolean {
  return isPrismaError(error) && error.meta?.cause === 'Record to delete does not exist.';
}

function isPrismaError(error: unknown): error is Prisma.PrismaClientKnownRequestError {
  return typeof error === 'object' && error !== null && 'code' in error;
}