import type { NextFunction, Request, Response } from "express";
import * as cardsService from "../services/cards.service";
import {
  createCardSchema,
  getCardsSchema,
  idSchema,
  updateCardSchema,
  updateCardVisibilitySchema,
} from "../types/cards.types";

export async function list(
  req: Request,
  res: Response,
  next: NextFunction,
): Promise<void> {
  try {
    const parsedBody = getCardsSchema.safeParse(req.query);
    if (!parsedBody.success) {
      res.status(400).json({
        message: "Bad Request - invalid parameters",
        errors: parsedBody.error.message,
      });
      return;
    }
    const { userId, limit, cursor } = parsedBody.data;

    const result = await cardsService.getCards({
      userId,
      limit: limit !== undefined ? Number(limit) : undefined,
      cursor: cursor !== undefined && cursor !== "" ? cursor : undefined,
    });
    res.status(200).json(result);
  } catch (error) {
    next(error);
  }
}

export async function getById(
  req: Request,
  res: Response,
  next: NextFunction,
): Promise<void> {
  try {
    const parsedBody = idSchema.safeParse({ id: req.params.id });
    if (!parsedBody.success) {
      res.status(400).json({
        message: "Bad Request - invalid parameters",
        errors: parsedBody.error.message,
      });
      return;
    }
    const { id } = parsedBody.data;
    const card = await cardsService.getCardById(id);
    res.status(200).json({ data: card });
  } catch (error) {
    next(error);
  }
}

export async function create(
  req: Request,
  res: Response,
  next: NextFunction,
): Promise<void> {
  try {
    const parsedBody = createCardSchema.safeParse(req.body);
    if (!parsedBody.success) {
      res.status(400).json({
        message: "Bad Request - invalid parameters",
        errors: parsedBody.error.message,
      });
      return;
    }
    const card = await cardsService.createCard(parsedBody.data);
    res.status(201).json({ data: card });
  } catch (error) {
    next(error);
  }
}

export async function update(
  req: Request,
  res: Response,
  next: NextFunction,
): Promise<void> {
  try {
    const parsedBody = updateCardSchema.safeParse({
      ...req.body,
      id: req.params.id,
    });
    if (!parsedBody.success) {
      res.status(400).json({
        message: "Bad Request - invalid parameters",
        errors: parsedBody.error.message,
      });
      return;
    }
    const { id } = parsedBody.data;
    const card = await cardsService.updateCard(id, parsedBody.data);
    res.status(200).json({ data: card });
  } catch (error) {
    next(error);
  }
}

export async function updateVisibility(
  req: Request,
  res: Response,
  next: NextFunction,
): Promise<void> {
  try {
    const parsedParams = idSchema.safeParse({ id: req.params.id });
    if (!parsedParams.success) {
      res.status(400).json({
        message: "Bad Request - invalid id",
        errors: parsedParams.error.message,
      });
      return;
    }
    const { id } = parsedParams.data;
    const parsedBody = updateCardVisibilitySchema.safeParse({
      visibility: req.query.visibility,
    });
    if (!parsedBody.success) {
      res.status(400).json({
        message: "Bad Request - invalid visibility",
        errors: parsedBody.error.message,
      });
      return;
    }
    const { visibility } = parsedBody.data;
    const card = await cardsService.updateCardVisibility(id, visibility);
    res.status(200).json({ data: card });
  } catch (error) {
    next(error);
  }
}

export async function remove(
  req: Request,
  res: Response,
  next: NextFunction,
): Promise<void> {
  try {
    const parsedBody = idSchema.safeParse({ id: req.params.id });
    if (!parsedBody.success) {
      res.status(400).json({
        message: "Bad Request - invalid parameters",
        errors: parsedBody.error.message,
      });
      return;
    }
    const { id } = parsedBody.data;
    await cardsService.deleteCard(id);
    res.status(204).send();
  } catch (error) {
    next(error);
  }
}
