import { Request, Response, NextFunction } from "express";
import { redis } from "../utils/redis-upstash";
import { User } from "../models/Users";
import { TOKEN_TTL } from "../constants";
import mongoose from "mongoose";

export const tokenAuth = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  const authHeader = req.headers.authorization;

  if (!authHeader?.startsWith("Bearer ")) {
    return res.status(401).json({ error: "Unauthorized" });
  }

  const token = authHeader.split(" ")[1];

  try {
    // 1. Check Upstash Redis cache first
    const cachedToken: {
      accessToken: string;
    } | null = await redis.get(`token:${token}`);

    if (cachedToken) {
      return next();
    }

    // 2. Cache miss — query MongoDB
    const userToken = await User.findOne({ accessToken: token })
      .select("accessToken")
      .lean();

    if (!userToken) {
      return res.status(401).json({ error: "Invalid token" });
    }

    // 3. Store in Redis with TTL
    await redis.set(
      `token:${token}`,
      { accessToken: userToken.accessToken },
      { ex: TOKEN_TTL },
    );

    next();
  } catch (err) {
    console.error("Auth error:", err);
    try {
      // Fail open — if Redis is down, fall back to DB only
      const userToken = await User.findOne({ accessToken: token })
        .select("accessToken")
        .lean();
      if (!userToken) return res.status(401).json({ error: "Invalid token" });
    } catch (err) {
      console.error("Auth error:", err);
      return res.status(500).json({ error: "Internal server error" });
    }
    next();
  }
};
