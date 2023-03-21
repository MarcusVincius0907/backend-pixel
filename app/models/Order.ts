import mongoose from "mongoose";
import { IPixel, PixelSchema } from "./NFT";

const OrderItemSchema = new mongoose.Schema({
  sortitionId: mongoose.Schema.Types.ObjectId,
  pixels: [PixelSchema],
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

const OrderSchema = new mongoose.Schema({
  userId: mongoose.Schema.Types.ObjectId,
  paymentId: mongoose.Schema.Types.ObjectId,
  orderItem: OrderItemSchema,
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

export interface IOrder {
  _id?: string;
  userId: string;
  paymentId: string;
  orderItem: IOrderItem;
}

export interface IOrderItem {
  sortitionId: string;
  pixels: Array<IPixel>;
}

export default mongoose.model("Order", OrderSchema);
