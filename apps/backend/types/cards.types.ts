import { z } from "zod";

const objectIdString = z.string().regex(/^[a-f0-9]{24}$/i, "Invalid ObjectId");

const cardVisibility = z.enum(["public", "private"]);
const cardTypeEnum = z.enum([
  "business",
  "developer",
  "role",
  "portfolio",
  "personal",
  "marketing",
  "sales",
  "engineering",
  "design",
  "product",
  "other",
]);

const companySchema = z.object({
  name: z.string().max(100).optional(),
  logo: z
    .object({
      url: z.string().optional(),
    })
    .optional(),
});

const profileImageConfigSchema = z.object({
  size: z.number().optional(),
  width: z.number().optional(),
  height: z.number().optional(),
  fileType: z.string().optional(),
  fileName: z.string().optional(),
});

const profileImageSchema = z.object({
  url: z.string().optional(),
  config: profileImageConfigSchema.optional(),
});

const socialLinkSchema = z.object({
  platform: z.string().min(1),
  label: z.string().optional(),
  url: z.string().min(1),
  icon: z.string().optional(),
});

const themeSchema = z.object({
  primaryColor: z.string().default("#3B82F6"),
  backgroundColor: z.string().default("#FFFFFF"),
});

export const createCardSchema = z.object({
  visibility: cardVisibility.default("private"),
  userId: objectIdString,
  cardType: cardTypeEnum.default("business"),
  name: z.string().min(1).trim().max(50),
  title: z.string().min(1).max(100),
  company: companySchema.optional(),
  email: z
    .array(z.email().transform((email) => email.toLowerCase()))
    .optional(),
  phone: z.array(z.string().trim()).optional(),
  bio: z.string().max(500).optional(),
  profileImage: profileImageSchema.optional(),
  socialLinks: z.array(socialLinkSchema).optional(),
  address: z.string().max(200).optional(),
  theme: themeSchema.optional(),
});

export const updateCardSchema = createCardSchema
  .partial()
  .omit({ userId: true })
  .extend({
    id: objectIdString,
  });

export const idSchema = z.object({
  id: objectIdString,
});

export const updateCardVisibilitySchema = z.object({
  visibility: cardVisibility,
});

export type CreateCardInput = z.infer<typeof createCardSchema>;
export type UpdateCardInput = z.infer<typeof updateCardSchema>;
export type UpdateCardVisibilityInput = z.infer<
  typeof updateCardVisibilitySchema
>;

export const getCardsSchema = z.object({
  userId: objectIdString.optional(),
  limit: z.coerce.number().int().positive().optional(),
  cursor: objectIdString.optional(),
});

export type GetCardsInput = z.infer<typeof getCardsSchema>;
