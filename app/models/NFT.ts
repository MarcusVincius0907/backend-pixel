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

const NFTSummarySchema = new mongoose.Schema({
  name:{
    required: true,
    type: String
  },
  themes:{
    required: true,
    type: String
  },
  idNFT:{
    required: true,
    type: String
  },
  pixelQuantity:{
    required: true,
    type: Number
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

export interface INFTSummary{
  _id?: string,
  name: string,
  themes: string,
  idNFT?: string,
  pixelQuantity: number
}

export interface INFT{
  _id?: string,
  chunks?: IChunk[],
  chunkSize: number,
}

export interface IChunk{
  _id?: string,
  position: number,
  pixels: IPixel[]
}

export interface IPixel{
  _id?: string,
  uuid: string,
  color: string,
  isAvailible: boolean,
}

export interface INFTMeasurements{
  NFTWidth:number,
  chunkWidth: number
}

const NFTSummary = mongoose.model("NFTSummary", NFTSummarySchema); 

export {NFTSummary};

export default mongoose.model("NFT", NFTSchema); 
