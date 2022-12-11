import { Request, Response } from "express";
import ResponseDefault from "../models/ResponseDefault";
import Sortition, {ISortition} from '../models/Sortition';
import { isValidDate, required } from "../utils/validators";

export function validateSortitionBeforeSave(sortition: ISortition){
  try{
    let isValid = true;
    let message = [];

    if(!required(sortition.name)){
      isValid = false;
      message.push( 'Nome é requerido');
    }

    if(!required(sortition.date) || !isValidDate(sortition.date, true)){
      isValid = false;
      message.push( 'Data inválida');
    }

    if(!required(sortition.reward)){
      isValid = false;
      message.push( 'Premiação é requerido');
    }

    if(!required(sortition.idNFTSummary)){
      isValid = false;
      message.push( 'id do NFT é requerido');
    }
  
    return {isValid, message: JSON.stringify(message)};  
  }catch(e){
    return {isValid: false, message: 'Erro genérico no objeto do sorteio. Verifique se todos os campos estão preenchidos'};
  }
}

export default class SortitionController{
  async list(req: Request, res: Response){
    try{
      const sortition = await Sortition.find();
      return res.status(200).json({status: 'Ok', message: 'Sorteio(s) encontrado(s).', payload: sortition} as ResponseDefault);
    }catch(e: any){
      return res.status(500).json({status: 'Error', message: JSON.stringify(e)} as ResponseDefault);
    }
  }
  async create(req: Request, res: Response){
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
  }
  async updateById(req: Request, res: Response){
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
  }
  async deleteById(req: Request, res: Response){
    try{
      const sortition = await Sortition.findByIdAndRemove({_id: req.params.id});
      
      if(sortition)
        return res.status(200).json({status: 'Ok', message: 'Sorteio deletado com sucesso encontrado.'} as ResponseDefault);
      else  
        return res.status(404).json({status: 'Ok', message: 'Sorteio não encontrado.'} as ResponseDefault);
      
    }catch(e: any){
      return res.status(500).json({status: 'Error', message: JSON.stringify(e)} as ResponseDefault);
    }
  }
}