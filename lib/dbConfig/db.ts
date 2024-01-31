import mongoose from "mongoose"

let isConnected = false

export const connectToDB = async () => {
  mongoose.set("strictQuery", true)
  mongoose.set("strictPopulate", false)

  if (!process.env.MONGO_URI) return console.log("MONGO_URI not found")

  if (isConnected) return console.log(`MogngoDb Connected`)

  try {
    const conn = await mongoose.connect(process.env.MONGO_URI!)
    isConnected = true
    console.log(`MongoDB Connected : ${conn.connection.host}`)
  } catch (error) {
    console.log("MONGODB_ERROR :" + error)
  }
}
