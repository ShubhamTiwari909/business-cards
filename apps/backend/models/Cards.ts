import mongoose from "mongoose";
import { User } from "./Users";

const cardSchema = new mongoose.Schema(
  {
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
    email: [
      {
        type: String,
        lowercase: true,
      },
    ],
    phone: [
      {
        type: String,
        trim: true,
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
        width: Number,
        height: Number,
        fileType: String,
        fileName: String,
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
        icon: {
          type: String,
        },
      },
    ],
    address: {
      type: String,
      maxlength: 200,
    },
    theme: {
      primaryColor: {
        type: String,
        default: "#3B82F6",
      },
      backgroundColor: {
        type: String,
        default: "#FFFFFF",
      },
    },
  },
  {
    timestamps: true,
  },
);

// Compound index for user's cards

cardSchema.index({ userId: 1, createdAt: -1 });

export const Card = mongoose.model("Card", cardSchema);
