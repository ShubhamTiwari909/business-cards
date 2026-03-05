import { Request, Response, NextFunction } from "express";
import crypto from "node:crypto";

export const internalAuth = (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  const secret = req.headers["x-internal-secret"] as string;
  const expectedSecret = process.env.INTERNAL_SECRET;

  if (!secret || !expectedSecret) {
    return res.status(401).json({ error: "Unauthorized" });
  }

  const secretBuffer = Buffer.from(secret);
  const expectedSecretBuffer = Buffer.from(expectedSecret);

  if (
    secretBuffer.length !== expectedSecretBuffer.length ||
    !crypto.timingSafeEqual(secretBuffer, expectedSecretBuffer)
  ) {
    return res.status(401).json({ error: "Unauthorized" });
  }

  next();
};
