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
  fileType: z.string().optional(),
  fileName: z.string().optional(),
  rounded: z.boolean().optional(),
});

const profileImageSchema = z.object({
  url: z.string().optional(),
  config: profileImageConfigSchema.optional(),
});

const socialLinkSchema = z.object({
  platform: z.string().min(1),
  label: z.string().optional(),
  url: z.string().min(1),
});

export const createCardSchema = z.object({
  backgroundImage: z
    .object({
      url: z.string().optional(),
    })
    .optional(),
  visibility: cardVisibility.default("private"),
  userId: z.email(),
  variant: z
    .enum(["minimal", "modern", "engineer", "marketing", "ceo", "company"])
    .default("minimal"),
  cardType: cardTypeEnum.default("business"),
  name: z.string().min(1).trim().max(50),
  title: z.string().min(1).max(100),
  company: companySchema.optional(),
  emails: z
    .array(
      z.object({
        email: z.email().transform((email) => email.toLowerCase()),
      }),
    )
    .max(3, { message: "Maximum 3 emails allowed" })
    .optional(),
  phones: z
    .array(z.object({ phone: z.string().trim() }))
    .max(3, { message: "Maximum 3 phone numbers allowed" })
    .optional(),
  bio: z.string().max(500).optional(),
  profileImage: profileImageSchema.optional(),
  socialLinks: z.array(socialLinkSchema).optional(),
  address: z.string().max(200).optional(),
  theme: z
    .enum([
      "slate",
      "secondary",
      "tertiary",
      "rose",
      "indigo",
      "emerald",
      "amber",
      "sky",
      "navy",
      "charcoal",
      "steel",
      "gold",
      "platinum",
      "obsidian",
      "lavender",
      "mint",
      "sand",
    ])
    .default("slate"),
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
  userId: z.email().optional(),
  limit: z.coerce.number().int().positive().optional(),
  cursor: objectIdString.optional(),
});

export type GetCardsInput = z.infer<typeof getCardsSchema>;
