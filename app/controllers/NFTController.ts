import { Request, Response } from "express";
import ResponseDefault from "../models/ResponseDefault";
import NFT, {INFT} from '../models/NFT';
import { isValidDate, required } from "../utils/validators";

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
  * It Calculate pixels quantity, page with and chunk with, to fit in the screen 
  * @param chunkSize -> the NFT is divided in 9 chunks
  * @param divElementSize -> size of each div pixel to format the NFT in the screen
  * @returns object with all key for render NFT in the screen
  */
function calculateNFT(chunkSize: number = 12, divElementSize: number = 20){
  const avaliableChunks = 8;
  const verticalChunkQuantity = 3;
  const pixelsQuantity = (chunkSize * chunkSize) * avaliableChunks; //for default value 1152
  const pageWidth = chunkSize * verticalChunkQuantity * divElementSize;// for default 720px
  const chunkWidth = chunkSize * divElementSize;// for default 240px
  return {pixelsQuantity, pageWidth, chunkWidth}
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