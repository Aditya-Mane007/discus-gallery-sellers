import mongoose from "mongoose";
import { type } from "os";

const productSchema = new mongoose.Schema(
  {
    sellerId: {
      type: mongoose.Types.ObjectId,
      ref: "store",
    },
    name: {
      type: String,
      required: [true, "Please add name of product"],
    },
    description: {
      type: String,
      required: [true, "Please add description of product"],
    },
    category: {
      type: String,
      required: [true, "Please add category of product"],
    },
    availbleInd: [type],
  },
  {
    timestamps: true,
  }
);

const Product =
  mongoose.models("Product") || mongoose.model("Product", productSchema);

export default Product;
