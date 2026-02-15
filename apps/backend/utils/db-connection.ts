import mongoose from "mongoose";

export const dbConnection = async () => {
  try {
    const mongoUri = process.env.MONGODB_URI;
    if (!mongoUri) {
      console.error(
        "Error: MONGODB_URI is not defined in environment variables.",
      );
      process.exit(1);
    }
    await mongoose.connect(mongoUri);
    console.log("Connected to MongoDB");
  } catch (error) {
    console.error("Error connecting to MongoDB");
    process.exit(1);
  }
};
