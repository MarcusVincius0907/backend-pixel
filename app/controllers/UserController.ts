import { Request, Response } from "express";
import ResponseDefault from "../models/ResponseDefault";
import User, {User as UserInterface} from '../models/User';
import { required, validateEmail } from '../utils/validators';

function validateUserBeforeSave(user: UserInterface){

  let isValid = true;
  let message = '';

  if(!validateEmail(user.email)){
    isValid = false;
    message = 'Endereço de email inválido';
  }

  if(!required(user.name)){
    isValid = false;
    message = 'Nome inválido';
  }


  return {isValid, message};  
}

export default class UserController{

  async createUser(req: Request, res: Response){
    try{

      if(await User.findOne({ email: req.body.email}))
        return res.status(422).json({status:'Error', message:"Email já cadastrado."} as ResponseDefault); 

      if(await User.findOne({ cpf: req.body.cpf}))
        return res.status(422).json({status:'Error', message:"CPF já cadastrado."} as ResponseDefault);
      
      if(await User.findOne({ cell: req.body.cell}))
        return res.status(422).json({status:'Error', message:"Número de celular já cadastrado."} as ResponseDefault);

      const validation = validateUserBeforeSave(req.body);

      if(validation.isValid){
        const user = await User.create(req.body);
        return res.status(201).json({status: 'Ok', message: 'Usuário criado com sucesso.', payload: user} as ResponseDefault);
      }else{
        return res.status(422).json({status:'Error', message: validation.message} as ResponseDefault);
      }

    }catch(e: any){
      return res.status(500).json({status: 'Error', message: JSON.stringify(e)} as ResponseDefault);
    }
  }

  async findUserById(req: Request, res: Response){

    try{
      const user = User.findOne({id: req.query.id});
      return res.status(200).json({status: 'Ok', message: 'Usuário encontrado.', payload: user} as ResponseDefault);
    }catch(e: any){
      return res.status(500).json({status: 'Error', message: JSON.stringify(e)} as ResponseDefault);
    }

  }

}