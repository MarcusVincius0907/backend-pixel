import mongoose from "mongoose";

const PixelSchema = new mongoose.Schema({
  uuid:{
    required: true,
    unique: true,
    type: String
  },
  color: {
    required: true,
    type: String,
  },
  isAvailible: Boolean
  
});

const ChunkSchema = new mongoose.Schema({
  pixels:{
    required: true,
    type: [PixelSchema]
  },
  position:{
    required: true,
    type: Number
  }
  
});

const NFTSchema = new mongoose.Schema({
  chunks:{
    required: true,
    type: [ChunkSchema]
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});


export interface INFT{
  _id?: number,
  chunks?: IChunk[],
  chunkSize: number,
}

export interface IChunk{
  _id?: number,
  position: number,
  pixels: IPixel[]
}

export interface IPixel{
  _id?: number,
  uuid: string,
  color: string,
  isAvailible: boolean,
}

export interface INFTMeasurements{
  NFTWidth:number,
  chunkWidth: number
}

export default mongoose.model("NFT", NFTSchema); 