import mongoose from "mongoose";

const connectToMongoDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_DB_URI as string);
    console.log("Connected to MongoDB");
  } catch (error: unknown) {
    if (error instanceof Error) {
      console.log("Error connecting to MongoDB:", error.message);
    } else {
      console.log("Unknown error connecting to MongoDB");
    }
  }
};

export default connectToMongoDB;
