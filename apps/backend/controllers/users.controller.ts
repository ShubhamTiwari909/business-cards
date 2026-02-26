import { User } from "../models/Users";
import type { NextFunction, Request, Response } from "express";
import { addUserSchema } from "../types/users.types";
import crypto from "node:crypto";
import { redis } from "../utils/redis-upstash";
import { TOKEN_TTL } from "../constants";

export async function checkIfUserExists(email: string) {
  return await User.findOne({ email }).select("_id accessToken").lean();
}

export const addUser = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  const randomToken = crypto.randomBytes(32).toString("hex");

  const parsedBody = addUserSchema.safeParse(req.body);
  if (!parsedBody.success) {
    return res.status(400).json({
      message: "Bad Request - invalid parameters",
      errors: parsedBody.error.flatten(),
    });
  }
  const { name, email, image, provider, cardCount, isActive } = parsedBody.data;

  const userExist = await checkIfUserExists(email);

  if (userExist?.accessToken && userExist?._id) {
    return res.status(200).json({
      message: "User already exists",
      accessToken: userExist.accessToken,
    });
  }
  if (userExist?._id && !userExist?.accessToken) {
    await User.updateOne(
      { _id: userExist._id },
      { $set: { accessToken: randomToken } },
    );
    await redis.set(`token:${randomToken}`, randomToken, { ex: TOKEN_TTL });
    return res
      .status(200)
      .json({ message: "User already exists", accessToken: randomToken });
  }

  try {
    const newUser = new User({
      name,
      email,
      image,
      provider,
      cardCount,
      isActive,
      accessToken: randomToken,
    });
    await newUser.save();
    await redis.set(`token:${newUser.accessToken}`, newUser.accessToken, {
      ex: TOKEN_TTL,
    });
    res
      .status(201)
      .json({ message: "User saved", accessToken: newUser.accessToken });
  } catch (err) {
    next(err);
  }
};

export const logoutUser = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  const authHeader = req.headers.authorization;

  if (!authHeader?.startsWith("Bearer ")) {
    return res.status(401).json({ error: "Unauthorized" });
  }

  const token = authHeader.split(" ")[1];

  // Remove from both cache and DB simultaneously
  await Promise.all([
    redis.del(`token:${token}`),
    User.updateOne({ accessToken: token }, { $unset: { accessToken: "" } }),
  ]);

  res.json({ ok: true });
};
