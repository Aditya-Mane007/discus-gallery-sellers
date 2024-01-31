import mongoose from "mongoose"

const orderSchema = new mongoose.Schema({
  receiver: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true
  },
  seller: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Seller",
    required: true
  },
  item: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Post",
    required: true
  },
  quantiy: { type: String, required: true },
  price: { type: String, required: true },
  isPaid: { type: Boolean, required: true }
})

const Order = mongoose.models?.Order || mongoose.model("Order", orderSchema)

export default Order
