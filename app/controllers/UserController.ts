import { Request, Response } from "express";
import ResponseDefault from "../models/ResponseDefault";
import User, {User as UserInterface} from '../models/User';
import { maxLength, minLength, required, validateAddressInfo, validateBirthDate, validateCPF, validateEmail, validatePaymentInfo, validateReceiveInfo } from '../utils/validators';

export function validateUserBeforeSave(user: UserInterface){

  try{
    let isValid = true;
    let message = [];
  
    //valida email
    if(!validateEmail(user.email)){
      isValid = false;
      message.push( 'Endereço de email inválido');
    }
  
    //valida nome
    if(!required(user.name)){
      isValid = false;
      message.push( 'Nome inválido');
    }
  
    //valida cpf
    if(!validateCPF(user.cpf)){
      isValid = false;
      message.push( 'CPF inválido');
    }
  
    //valida cell
    if((!maxLength(user.cell, 13))  || (!minLength(user.cell, 11))  ){
      isValid = false;
      message.push( 'Número de telefone inválido.');
    }
  
    //valida data de nascimento
    if(!validateBirthDate(user.birthDate)){
      isValid = false;
      message.push( 'Data inválida ou menor de idade.');
    }
  
    //valida informações de endereço
    if(!validateAddressInfo(user.addressInfo)){
      isValid = false;
      message.push( 'Informações de endereço inválidas.');
    }
  
    //valida informações de pagamento
    if(user.paymentInfo){
  
      //valida paymentInfo
      if(!validatePaymentInfo(user.paymentInfo)){
        isValid = false;
        message.push( 'Infomações de pagamento inválidas.');
      }
  
    }
  
    //valida informações de recebimento
    if(user.receiveInfo){
  
      //valida receiveInfo
      if(!validateReceiveInfo(user.receiveInfo)){
        isValid = false;
        message.push( 'Infomações de recebimento inválidas.');
      }
      
  
    }
  
    return {isValid, message: JSON.stringify(message)};  
  }catch(e){
    return {isValid: false, message: 'Erro genérico no objeto do usuário. Verifique se todos os campos estão preenchidos'};
  }

  
}

export default class UserController{

  async list(req: Request, res: Response){
    try{
      const users = await User.find();
      return res.status(200).json({status: 'Ok', message: 'Usuário encontrado.', payload: users} as ResponseDefault);
    }catch(e: any){
      return res.status(500).json({status: 'Error', message: JSON.stringify(e)} as ResponseDefault);
    }
  }

  async create(req: Request, res: Response){
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

  async updateById(req: Request, res: Response){
    try{

      const validation = validateUserBeforeSave(req.body);

      if(validation.isValid){
        const user = await User.findByIdAndUpdate({_id: req.params.id}, req.body);
        if(user)
          return res.status(200).json({status: 'Ok', message: 'Usuário atualizado com sucesso.'} as ResponseDefault);
        else
         return res.status(404).json({status: 'Ok', message: 'Usuário não encontrado.'} as ResponseDefault);
      }else{
        return res.status(422).json({status:'Error', message: validation.message} as ResponseDefault);
      }

    }catch(e: any){
      return res.status(500).json({status: 'Error', message: JSON.stringify(e)} as ResponseDefault);
    }
  }

  async findById(req: Request, res: Response){

    try{
      const user = await User.findOne({_id: req.params.id});
      if(user)
        return res.status(200).json({status: 'Ok', message: 'Usuário encontrado.', payload: user} as ResponseDefault);
      else  
        return res.status(404).json({status: 'Ok', message: 'Usuário não encontrado.'} as ResponseDefault);
    }catch(e: any){
      return res.status(500).json({status: 'Error', message: JSON.stringify(e)} as ResponseDefault);
    }

  }

  async deleteById(req: Request, res: Response){
    try{
      const user = await User.findByIdAndRemove({_id: req.params.id});
      
      if(user)
        return res.status(200).json({status: 'Ok', message: 'Usuário deletado com sucesso encontrado.'} as ResponseDefault);
      else  
        return res.status(404).json({status: 'Ok', message: 'Usuário não encontrado.'} as ResponseDefault);
      
    }catch(e: any){
      return res.status(500).json({status: 'Error', message: JSON.stringify(e)} as ResponseDefault);
    }
  }

}