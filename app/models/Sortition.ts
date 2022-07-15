import mongoose from "mongoose";

const SortitionSchema = new mongoose.Schema({
  themes: String,
  name: String,
  date: Date,
  idNFT: String,
  pixelsAvailable: Number,
  reward: String,
  status: Boolean,
});

export interface Sortition{
  id: number;
  themes: string;
  name: string;
  date: Date;
  idNFT: string;
  pixelsAvailable: number;
  reward: string;
  status: boolean;
}

export default mongoose.model("Sortition", SortitionSchema); 