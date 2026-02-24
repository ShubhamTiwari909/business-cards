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
  name: z.string().max(100, { message: "Company name must be less than 100 characters" }).optional(),
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
  platform: z.string().min(1, { message: "Social platform is required" }),
  label: z.string().optional(),
  url: z.string().min(1, { message: "Social link URL is required" }),
});

export const cardSchema = z.object({
  backgroundImage: z.object({
    url: z.string().optional(),
  }).optional(),
  visibility: cardVisibility.default("private"),
  userId: objectIdString,
  variant: z.enum(["minimal", "modern", "engineer", "marketing", "ceo", "company"]).default("minimal"),
  cardType: cardTypeEnum.default("business"),
  name: z.string().min(1, { message: "Name is required" }).trim().max(50, { message: "Name must be less than 50 characters" }),
  title: z.string().min(1, { message: "Title is required" }).max(100, { message: "Title must be less than 100 characters" }),
  company: companySchema.optional(),
  emails: z
    .array(z.object({
      email: z.email().min(1, { message: "Email is required" }).max(100, { message: "Email must be less than 100 characters" }).transform((email) => email.toLowerCase())
    }))
    .max(3, { message: "Maximum 3 emails allowed" })
    .optional(),
  phones: z.array(z.object({ phone: z.string().trim() })).max(3, { message: "Maximum 3 phone numbers allowed" }).optional(),
  bio: z.string().max(500, { message: "Bio must be less than 500 characters" }).optional(),
  profileImage: profileImageSchema.optional(),
  socialLinks: z.array(socialLinkSchema).max(8, { message: "Maximum 8 social links allowed" }).optional(),
  address: z.string().max(200, { message: "Address must be less than 200 characters" }).optional(),
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
    .default("slate")
    .optional(),
});

export const updateCardSchema = cardSchema
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

export type CardSchemaInput = z.input<typeof cardSchema>;
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


export const defaultValues: CardSchemaInput = {
  backgroundImage: {
    url: "",
  },
  visibility: "private",
  userId: "",
  cardType: "business",
  variant: "minimal",
  name: "Username",
  title: "Software Engineer",
  company: {
    name: "Google",
    logo: {
      url: "",
    },
  },
  emails: [{ email: "test@gmail.com" }],
  phones: [{ phone: "+91 9876543210" }],
  bio: "",
  profileImage: {
    url: "",
    config: {
      size: 0,
      fileType: "",
      fileName: "",
      rounded: false,
    },
  },
  socialLinks: [
    {
      platform: "linkedin",
      label: "LinkedIn",
      url: "https://www.linkedin.com/in/username",
    },
  ],
  address: "123 Main St, Anytown, USA",
  theme: "slate",
};