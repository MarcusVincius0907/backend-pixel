import { Request, Response } from "express";
import ResponseDefault from "../models/ResponseDefault";
import NFT, {IChunk, INFT, INFTMeasurements, IPixel} from '../models/NFT';
import { isValidDate, required } from "../utils/validators";
import { v4 as uuidv4 } from 'uuid';


const AVAILABLE_CHUNKS: number = 8;
const VERTICAL_CHUNK_QUANTITY: number = 3

/* export function validateBeforeSave(nft: INFT){
  try{
    let isValid = true;
    let message = [];

    
  
    return {isValid, message: JSON.stringify(message)};  
  }catch(e){
    return {isValid: false, message: 'Erro genérico no objeto do sorteio. Verifique se todos os campos estão preenchidos'};
  }
} */

/**
  * It calculates pixels quantity based on chunkSide
  * @param chunkSize -> the NFT is divided in 9 chunks. The chunkSide will define the pixelQuantity
  * @returns the pixel quantity
  */
export function calculatePixelsQuantity(chunkSize: number = 12){
  const pixelsQuantity = (chunkSize * chunkSize) * AVAILABLE_CHUNKS; //for default value 1152
  return pixelsQuantity;
}

/**
  * It calculates NFT width and chunk width, to fit in the screen 
  * @param chunkSize -> the NFT is divided in 9 chunks. The chunkSide will define the pixelQuantity
  * @param divElementSize -> size of each div pixel to format the NFT in the screen
  * @returns object with NFT masurements
  */
export function calculateNFTMeasurements(chunkSize: number = 12, divElementSize: number = 20){
  const NFTWidth = chunkSize * VERTICAL_CHUNK_QUANTITY * divElementSize;// for default 720px
  const chunkWidth = chunkSize * divElementSize;// for default 240px
  return {NFTWidth, chunkWidth} as INFTMeasurements
}

export function createNFT(chunkSize: number){
  if( chunkSize < 10 ) return null;

  const pixelsQuantity = calculatePixelsQuantity(chunkSize);
  const nft: INFT = {
    chunkSize,
    chunks: []
  }

  for(let i = 0; i < AVAILABLE_CHUNKS; i++){

    const pixelsPerChunk = chunkSize * chunkSize;
    const chunk: IChunk = {
      pixels: [],
      position: i,
    }

    for(let j = 0; j < pixelsPerChunk; j ++){
      chunk.pixels.push({
        uuid: uuidv4(),
        color: '#FFFFFF',
        isAvailible: true,
      } as IPixel)
    }

    nft.chunks?.push(chunk)
  }

  return nft;
  
}

export default class SortitionController{
  async list(req: Request, res: Response){
    try{
      const nft = await NFT.find();
      return res.status(200).json({status: 'Ok', message: 'NFT(s) encontrado(s).', payload: nft} as ResponseDefault);
    }catch(e: any){
      return res.status(500).json({status: 'Error', message: JSON.stringify(e)} as ResponseDefault);
    }
  }
  async findById(req: Request, res: Response){

    try{
      const nft = await NFT.findOne({_id: req.params.id});
      if(nft)
        return res.status(200).json({status: 'Ok', message: 'NFT encontrado.', payload: nft} as ResponseDefault);
      else  
        return res.status(404).json({status: 'Ok', message: 'Usuário não encontrado.'} as ResponseDefault);
    }catch(e: any){
      return res.status(500).json({status: 'Error', message: JSON.stringify(e)} as ResponseDefault);
    }

  }
  /* async create(req: Request, res: Response){
    try{

      

      const validation = validateSortitionBeforeSave(req.body);

      if(validation.isValid){
        const sortition = await Sortition.create(req.body);
        return res.status(201).json({status: 'Ok', message: 'Sorteio criado com sucesso.', payload: sortition} as ResponseDefault);
      }else{
        return res.status(422).json({status:'Error', message: validation.message} as ResponseDefault);
      }

    }catch(e: any){
      return res.status(500).json({status: 'Error', message: JSON.stringify(e)} as ResponseDefault);
    }
  } */
 /*  async updateById(req: Request, res: Response){
    try{

      const validation = validateSortitionBeforeSave(req.body);

      if(validation.isValid){
        const user = await Sortition.findByIdAndUpdate({_id: req.params.id}, req.body);
        if(user)
          return res.status(200).json({status: 'Ok', message: 'Sorteio atualizado com sucesso.'} as ResponseDefault);
        else
         return res.status(404).json({status: 'Error', message: 'Sorteio não encontrado.'} as ResponseDefault);
      }else{
        return res.status(422).json({status:'Error', message: validation.message} as ResponseDefault);
      }

    }catch(e: any){
      return res.status(500).json({status: 'Error', message: JSON.stringify(e)} as ResponseDefault);
    }
  } */
 /*  async deleteById(req: Request, res: Response){
    try{
      const sortition = await Sortition.findByIdAndRemove({_id: req.params.id});
      
      if(sortition)
        return res.status(200).json({status: 'Ok', message: 'Sorteio deletado com sucesso encontrado.'} as ResponseDefault);
      else  
        return res.status(404).json({status: 'Ok', message: 'Sorteio não encontrado.'} as ResponseDefault);
      
    }catch(e: any){
      return res.status(500).json({status: 'Error', message: JSON.stringify(e)} as ResponseDefault);
    }
  } */
}