import mongoose from "mongoose";

const storeSchema = new mongoose.Schema(
  {
    store: {
      type: String,
    },
    owner: {
      type: String,
    },
    description: {
      type: String,
    },
    email: {
      type: String,
      required: true,
    },
    phone: {
      type: String,
      required: true,
    },
    prouducts: [],
    orders: [],
  },
  {
    timestamps: true,
  }
);

const Store = mongoose.models.Store || mongoose.model("Store", storeSchema);

export default Store;
