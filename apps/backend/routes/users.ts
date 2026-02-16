import type { NextFunction, Request, Response, Router } from "express";
import express from "express";
import { dynamicLimiter } from "../utils/rate-limit";
import { addUser } from "../controllers/users.controller";

const router: Router = express.Router();
router.post(
  "/add",
  dynamicLimiter(10, { windowMs: 60 * 1000 * 60 }),
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      await addUser(req, res, next);
    } catch (error) {
      next(error);
    }
  },
);

export default router;
