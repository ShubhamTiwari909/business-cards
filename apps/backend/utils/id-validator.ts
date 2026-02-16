import mongoose from "mongoose";

const isValidObjectId = (id: string): boolean =>
  mongoose.Types.ObjectId.isValid(id) &&
  String(new mongoose.Types.ObjectId(id)) === id;

export function validateObjectId(id: string): void {
  if (!isValidObjectId(id)) {
    const error = new Error("Invalid card id") as Error & {
      statusCode?: number;
    };
    error.statusCode = 400;
    throw error;
  }
}
