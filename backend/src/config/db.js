import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config();

console.log("Connecting to MongoDB...");

const connectDB = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGO_URI);
    console.log(`MongoDB Connected:`);
    return conn;
  } catch (error) {
    console.error(`Error: ${error.message}`);
    process.exit(1);
  }
};

const conn = await connectDB();
const db = conn.connection.useDb("todoapp");

export default db;
