import type { Request, Response, NextFunction } from "express";

export const verifyAuth = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const { getToken } = await import("next-auth/jwt");

    const token = await getToken({
      req: { headers: req.headers as Record<string, string> },
      secret: process.env.NEXTAUTH_SECRET,
    });

    if (!token) {
      return res.status(401).json({ message: "Unauthorized" });
    }

    next();
  } catch (err) {
    return res.status(403).json({ message: "Invalid token" });
  }
};
