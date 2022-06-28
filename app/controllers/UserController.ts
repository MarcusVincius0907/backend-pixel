import { Request, Response } from "express";
import ResponseDefault from "../models/ResponseDefault";
import User from '../models/User';

export default class UserController{

  async createUser(req: Request, res: Response){
    try{

      if(await User.findOne({ email: req.body.email}))
        return res.status(422).json({status:'Error', message:"Email já cadastrado."} as ResponseDefault); 

      if(await User.findOne({ cpf: req.body.cpf}))
        return res.status(422).json({status:'Error', message:"CPF já cadastrado."} as ResponseDefault);
      
      if(await User.findOne({ cell: req.body.cell}))
        return res.status(422).json({status:'Error', message:"Número de celular já cadastrado."} as ResponseDefault);

      const user = await User.create(req.body);

      return res.status(201).json({status: 'Ok', message: 'Usuário criado com sucesso.', payload: user} as ResponseDefault);

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