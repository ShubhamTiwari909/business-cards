import mongoose from "mongoose";

const cardSchema = new mongoose.Schema(
  {
    backgroundImage: {
      url: String,
    },
    visibility: {
      type: String,
      required: true,
      enum: ["public", "private"],
      default: "private",
    },
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
      index: true,
    },
    variant: {
      type: String,
      enum: ["minimal", "modern", "engineer", "marketing", "ceo", "company"],
      default: "minimal",
    },
    cardType: {
      type: String,
      enum: [
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
      ],
      default: "business",
      required: true,
    },
    name: {
      type: String,
      required: true,
      trim: true,
      maxlength: 50,
    },
    title: {
      type: String,
      required: true,
      maxlength: 100,
    },
    company: {
      name: {
        type: String,
        maxlength: 100,
      },
      logo: {
        url: String,
      },
    },
    emails: [
      {
        email: {
          type: String,
          trim: true,
        },
      },
    ],
    phones: [
      {
        phone: {
          type: String,
          trim: true,
        },
      },
    ],
    bio: {
      type: String,
      maxlength: 500,
    },
    profileImage: {
      url: String,
      config: {
        size: Number,
        fileType: String,
        fileName: String,
        rounded: Boolean,
      },
    },
    socialLinks: [
      {
        platform: {
          type: String,
          required: true,
        },
        label: {
          type: String,
        },
        url: {
          type: String,
          required: true,
        },
      },
    ],
    address: {
      type: String,
      maxlength: 200,
    },
    theme: {
      type: String,
      enum: [
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
      ],
      default: "slate",
    },
  },
  {
    timestamps: true,
  },
);

// Compound index for user's cards

cardSchema.index({ userId: 1, createdAt: -1 });

export const Card = mongoose.model("Card", cardSchema);
