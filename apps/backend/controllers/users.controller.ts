import { User } from "../models/Users";
import type { Request, Response } from "express";
import { validateCardId } from "../utils/id-validator";
import { addUserSchema } from "../types/users.types";

export async function checkIfUserExists(email: string) {
  validateCardId(email);
  return await User.findOne({ email }).select("_id passkey").lean();
}

export const addUser = async (req: Request, res: Response) => {
  const parsedBody = addUserSchema.safeParse(req.body);
  if (!parsedBody.success) {
    return res.status(400).json({
      message: "Bad Request - invalid parameters",
      errors: parsedBody.error.flatten(),
    });
  }
  const { name, email, image, provider, cardCount, isActive } = parsedBody.data;

  const userExist = await checkIfUserExists(email);

  if (userExist) {
    return res.status(200).json({ message: "User already exists", email });
  }

  try {
    const newUser = new User({
      name,
      email,
      image,
      provider,
      cardCount,
      isActive,
    });
    await newUser.save();
    res.status(201).json({ message: "User saved" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Internal Server Error" });
  }
};
