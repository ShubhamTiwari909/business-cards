import { Request, Response, NextFunction } from "express";
import { redis } from "../utils/redis-upstash";
import { User } from "../models/Users";
import { TOKEN_TTL } from "../constants";

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
    const cachedToken = await redis.get(`token:${token}`);

    if (cachedToken) {
      req.accessToken = cachedToken as string; // already parsed, Upstash auto deserializes JSON
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
    await redis.set(`token:${token}`, userToken, { ex: TOKEN_TTL });

    req.accessToken = userToken.accessToken as string;
    next();
  } catch (err) {
    console.error("Auth error:", err);
    // Fail open — if Redis is down, fall back to DB only
    const userToken = await User.findOne({ accessToken: token })
      .select("accessToken")
      .lean();
    if (!userToken) return res.status(401).json({ error: "Invalid token" });
    req.accessToken = userToken.accessToken as string;
    next();
  }
};
