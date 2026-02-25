import mongoose from "mongoose";
import { Card } from "../models/Cards";
import { validateObjectId } from "../utils/id-validator";
import type {
  CreateCardInput,
  GetCardsInput,
  UpdateCardInput,
} from "../types/cards.types";
import { User } from "../models/Users";

const DEFAULT_PAGE_SIZE = 20;
const MAX_PAGE_SIZE = 100;

export type GetCardsResult = {
  data: unknown[];
  nextCursor: string | null;
  hasMore: boolean;
};

export async function getCards(
  options: GetCardsInput,
): Promise<GetCardsResult> {
  const { userId, limit = DEFAULT_PAGE_SIZE, cursor } = options;

  const pageSize = Math.min(
    Math.max(1, Math.floor(Number(limit)) || DEFAULT_PAGE_SIZE),
    MAX_PAGE_SIZE,
  );

  if (cursor && !mongoose.isValidObjectId(cursor)) {
    throw new Error("Invalid cursor");
  }

  const cursorId = cursor ? new mongoose.Types.ObjectId(cursor) : null;

  const filter: {
    userId?: string;
    _id?: { $lt: mongoose.Types.ObjectId };
  } = {
    ...(userId ? { userId } : {}),
    ...(cursorId ? { _id: { $lt: cursorId } } : {}),
  };

  const items = await Card.find(filter)
    .sort({ _id: -1 })
    .limit(pageSize + 1)
    .select("_id name title company profileImage.url cardType createdAt")
    .lean({ getters: true })
    .maxTimeMS(5000)
    .exec();

  const hasMore = items.length > pageSize;
  const data = hasMore ? items.slice(0, pageSize) : items;

  return {
    data,
    nextCursor: hasMore ? String(data[data.length - 1]._id) : null,
    hasMore,
  };
}

export async function getCardById(id: string) {
  validateObjectId(id);
  const card = await Card.findById(id).lean({ getters: true });
  if (!card) {
    const error = new Error("Card not found") as Error & {
      statusCode?: number;
    };
    error.statusCode = 404;
    throw error;
  }
  return card;
}

export async function createCard(body: CreateCardInput) {
  const { userId, ...cardData } = body;

  const card = new Card({ ...cardData, userId });
  await card.save();
  await User.findOneAndUpdate({ email: userId }, { $inc: { cardCount: 1 } });
  return card.toObject();
}

export async function updateCard(id: string, body: UpdateCardInput) {
  validateObjectId(id);
  const { id: _omit, ...updateFields } = body;
  const card = await Card.findByIdAndUpdate(
    id,
    { $set: updateFields },
    { new: true, runValidators: true },
  )
    .lean()
    .exec();
  if (!card) {
    const error = new Error("Card not found") as Error & {
      statusCode?: number;
    };
    error.statusCode = 404;
    throw error;
  }
  return card;
}

export async function updateCardVisibility(id: string, visibility: string) {
  if (visibility !== "public" && visibility !== "private") {
    const error = new Error(
      "visibility must be 'public' or 'private'",
    ) as Error & { statusCode?: number };
    error.statusCode = 400;
    throw error;
  }
  validateObjectId(id);
  const card = await Card.findByIdAndUpdate(
    id,
    { visibility },
    { new: true, runValidators: true },
  )
    .lean()
    .exec();
  if (!card) {
    const error = new Error("Card not found") as Error & {
      statusCode?: number;
    };
    error.statusCode = 404;
    throw error;
  }
  return card?.visibility;
}

export async function deleteCard(id: string) {
  validateObjectId(id);
  const card = await Card.findById(id);
  const userId = card?.userId;
  if (!card) {
    const error = new Error("Card not found") as Error & {
      statusCode?: number;
    };
    error.statusCode = 404;
    throw error;
  }
  await card.deleteOne();
  await User.findOneAndUpdate({ email: userId }, { $inc: { cardCount: -1 } });
  return { message: "Card deleted successfully" };
}
