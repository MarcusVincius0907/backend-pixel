import mongoose from "mongoose";

const OrderSchema = new mongoose.Schema({
  userId: mongoose.Schema.Types.ObjectId,
  paymentId: mongoose.Schema.Types.ObjectId,
  cartId: mongoose.Schema.Types.ObjectId,
  createdAt: {
    type: Date,
    default: Date.now
  }
});

export interface IOrder{
  _id?: string;
  userId: string;
  paymentId: string;
  cartId: string;
}

export default mongoose.model("Order", OrderSchema); 