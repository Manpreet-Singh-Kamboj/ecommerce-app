import mongoose from "mongoose";
import { loadEnv } from "../utils/dotenv";
loadEnv();

const connectToDatabase = () => {
  const MONGODB_URI = process.env.MONGODB_URI;
  if (!MONGODB_URI) {
    throw new Error(
      "Please define the MONGODB_URI environment variable inside .env"
    );
  }
  mongoose
    .connect(MONGODB_URI)
    .then(() => console.log("Connected to database "))
    .catch((err) => console.log(err));
};

export default connectToDatabase;
