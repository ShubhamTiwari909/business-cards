import type { Router } from "express";
import express from "express";
import { dynamicLimiter } from "../utils/rate-limit";
import * as cardsController from "../controllers/cards.controller";

const router: Router = express.Router();

router.get(
  "/",
  dynamicLimiter(30, { windowMs: 60 * 1000 }),
  cardsController.list,
);

router.post(
  "/create",
  dynamicLimiter(5, { windowMs: 60 * 1000 }),
  cardsController.create,
);

router.get(
  "/:id",
  dynamicLimiter(30, { windowMs: 60 * 1000 }),
  cardsController.getById,
);

router.put(
  "/update/visibility/:id",
  dynamicLimiter(20, { windowMs: 60 * 1000 }),
  cardsController.updateVisibility,
);

router.put(
  "/update/:id",
  dynamicLimiter(10, { windowMs: 60 * 1000 }),
  cardsController.update,
);

router.delete(
  "/delete/:id",
  dynamicLimiter(30, { windowMs: 60 * 1000 }),
  cardsController.remove,
);

export default router;
