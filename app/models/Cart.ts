import mongoose from "mongoose";

const CartSchema = new mongoose.Schema({
  pixelIds: [mongoose.Schema.Types.ObjectId],
  createdAt: {
    type: Date,
    default: Date.now
  }
});

export interface ICart{
  _id?: string;
  pixelIds: Array<string>
}

export default mongoose.model("Cart", CartSchema); 