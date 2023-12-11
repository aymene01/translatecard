import { Options } from "@/business/types";
import { Card } from "@prisma/client";

type DataToUpdate = {
  content?: string;
  traduction?: string;
  title?: string;
};

type UpdateCardByIdRequest = {
  id: number;
} & Partial<DataToUpdate>;

type UpdateCardByIdResponse = 
  | { updatedCard: Card } 
  | { error: { message: string } };

export const updateCardById = async (
  opts: Options, 
  req: UpdateCardByIdRequest
): Promise<UpdateCardByIdResponse> => {

  const dataToUpdate: Partial<DataToUpdate> = {};

  if (typeof req.content !== 'undefined') dataToUpdate.content = req.content;
  if (typeof req.traduction !== 'undefined') dataToUpdate.traduction = req.traduction;
  if (typeof req.title !== 'undefined') dataToUpdate.title = req.title;

  const existingCard = await opts.database.prisma.card.findUnique({
    where: {
      id: req.id,
    },
  });

  if (!existingCard) {
    return {
      error: {
        message: `Card with ID ${req.id} does not exist.`,
      },
    };
  }

  try {
    const updatedCard = await opts.database.prisma.card.update({
      where: { id: req.id },
      data: dataToUpdate,
    });

    return { updatedCard };

  } catch (error: unknown) {
    opts.logger.error(`Error updating card with ID ${req.id}:`, error);

    return {
      error: {
        message: 'Error updating card data. Please try again later.',
      },
    };
  }
};