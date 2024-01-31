import mongoose from "mongoose"

const sellerSchema = new mongoose.Schema(
  {
    userId: { type: String, required: true },
    firstName: { type: String },
    lastName: { type: String },
    email: { type: String },
    profileImage: { type: String },
    phoneNumber: { type: String },
    orders: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Order"
      }
    ]
  },
  {
    timestamps: true
  }
)

const Seller = mongoose.models?.Seller || mongoose.model("Seller", sellerSchema)

export default Seller
