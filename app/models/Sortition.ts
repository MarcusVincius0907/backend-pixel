import mongoose from "mongoose";

const SortitionSchema = new mongoose.Schema({
  name: String,
  date: Date,
  idNFTSummary: String,
  reward: String,
  status: Boolean,
  createdAt: {
    type: Date,
    default: Date.now
  }
});

export interface ISortition{
  _id?: string;
  name: string;
  date: string;
  idNFTSummary: string;
  reward: string;
  status: boolean;
}

export default mongoose.model("Sortition", SortitionSchema); 