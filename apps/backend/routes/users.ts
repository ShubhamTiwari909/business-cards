import type { NextFunction, Request, Response, Router } from "express";
import express from "express";
import { dynamicLimiter } from "../utils/rate-limit";
import { addUser, logoutUser } from "../controllers/users.controller";
import { internalAuth } from "../middlware/internal-auth";
import { tokenAuth } from "../middlware/token-auth";

const router: Router = express.Router();
router.post(
  "/add",
  internalAuth,
  dynamicLimiter(10, { windowMs: 60 * 1000 * 60 }),
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      await addUser(req, res, next);
    } catch (error) {
      next(error);
    }
  },
);
router.post(
  "/logout",
  tokenAuth,
  dynamicLimiter(10, { windowMs: 60 * 1000 * 60 }),
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      await logoutUser(req, res, next);
    } catch (error) {
      next(error);
    }
  },
);

export default router;
