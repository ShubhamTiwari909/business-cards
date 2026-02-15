import { z } from "zod";

export const addUserSchema = z.object({
  email: z.email().toLowerCase().trim(),
  name: z.string().min(1).trim(),
  image: z.string().trim().optional(),
  provider: z.enum(["google"]).default("google"),
  cardCount: z.number().int().min(0).default(0),
  isActive: z.boolean().default(true),
});

export type UserType = z.infer<typeof addUserSchema>;
