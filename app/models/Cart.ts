import mongoose from "mongoose";
import { IPixel, PixelSchema } from "./NFT";

const CartSchema = new mongoose.Schema({
  pixels: [PixelSchema],
  userId: mongoose.Schema.Types.ObjectId,
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

export interface ICart {
  _id?: string;
  pixels: Array<IPixel>;
  userId: string;
}

export default mongoose.model("Cart", CartSchema);
