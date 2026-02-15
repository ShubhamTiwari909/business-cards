import mongoose from "mongoose";
import { Card } from "../models/Cards";
import { validateCardId } from "../utils/id-validator";
import { GetCardsInput } from "../types/cards.types";

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

  const filter: any = {
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
  validateCardId(id);
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

export async function createCard(body: Record<string, unknown>) {
  const {
    visibility,
    userId,
    cardType,
    name,
    title,
    company,
    email,
    phone,
    bio,
    profileImage,
    socialLinks,
    address,
    theme,
  } = body;
  if (!userId || !name || !title || !visibility || !cardType) {
    const error = new Error("userId, name and title are required") as Error & {
      statusCode?: number;
    };
    error.statusCode = 400;
    throw error;
  }
  validateCardId(userId as string);
  const card = new Card({
    visibility,
    userId,
    cardType,
    name,
    title,
    company,
    email,
    phone,
    bio,
    profileImage,
    socialLinks,
    address,
    theme,
  });
  await card.save();
  return card.toObject();
}

export async function updateCard(id: string, body: Record<string, unknown>) {
  validateCardId(id);
  const card = await Card.findByIdAndUpdate(
    id,
    { $set: body },
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
  validateCardId(id);
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
  validateCardId(id);
  const card = await Card.findById(id);
  if (!card) {
    const error = new Error("Card not found") as Error & {
      statusCode?: number;
    };
    error.statusCode = 404;
    throw error;
  }
  await card.deleteOne();
  return { message: "Card deleted successfully" };
}
