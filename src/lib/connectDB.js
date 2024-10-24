"use server";
import mongoose from "mongoose";

let isConnected = false;

const connectDb = async () => {
  if (isConnected) {
    console.log("MongoDB is already connected");
    return;
  }
  try {
    const conn = await mongoose.connect(process.env.NEXT_PUBLIC_DATABASE_URL, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    if (conn) {
      console.log(
        `MongoDB is Connected ${conn.connection.host}`.blue.underline
      );
    }
  } catch (error) {
    console.log("MongoDB Error " + error);
  }
};

export default connectDb;
