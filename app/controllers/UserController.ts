import { Request, Response } from "express";
import ResponseDefault, { ResponseStatus } from "../models/ResponseDefault";
import User, {User as UserInterface} from '../models/User';
import getAddressByZipcode from "../utils/getAddressByZipcode";
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
    if(user.addressInfo){

      if(!validateAddressInfo(user.addressInfo)){
        isValid = false;
        message.push( 'Informações de endereço inválidas.');
      }

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
    // #swagger.tags = ['Users']
    // #swagger.summary = 'Listar todos os usuários'
    // #swagger.security = [{"bearerAuth": []}]
    /* #swagger.responses[200] = {
            description: "Usuário encontrado.",
            content: {
                "application/json": {
                    schema:{
                      type: "array",
                      items:{
                        type: "object",
                        $ref: "#/components/schemas/User"
                      }
                    }
                }           
            }
        }   
    */
    /* #swagger.responses[401] = {
            description: "Requisição não autorizada.",
        }   
    */

    try{
      const users = await User.find();
      return res.status(200).json({status: ResponseStatus.OK, message: 'Usuário encontrado.', payload: users} as ResponseDefault);
    }catch(e: any){
      return res.status(500).json({status: ResponseStatus.ERROR, message: JSON.stringify(e)} as ResponseDefault);
    }
  }

  async findById(req: Request, res: Response){
    // #swagger.tags = ['Users']
    // #swagger.summary = 'Obter um usuário pelo id'
    // #swagger.security = [{"bearerAuth": []}]
     /* #swagger.responses[200] = {
            description: "Usuário encontrado.",
            content: {
                "application/json": {
                    schema:{
                      type: "object",
                      $ref: "#/components/schemas/User"
                    }
                }           
            }
        }   
    */
    /* #swagger.responses[401] = {
                description: "Requisição não autorizada.",
            }   
        */
    
    try{
      const user = await User.findOne({_id: req.params.id});
      if(user)
        return res.status(200).json({status: ResponseStatus.OK, message: 'Usuário encontrado.', payload: user} as ResponseDefault);
      else  
        return res.status(404).json({status: ResponseStatus.NOT_FOUND, message: 'Usuário não encontrado.'} as ResponseDefault);
    }catch(e: any){
      return res.status(500).json({status: ResponseStatus.ERROR, message: JSON.stringify(e)} as ResponseDefault);
    }

  }
   
  //TODO create test for this method
  async findByEmail(req: Request, res: Response){
    // #swagger.tags = ['Users']
    // #swagger.summary = 'Obter um usuário pelo email'
    // #swagger.security = [{"bearerAuth": []}]
    /* #swagger.requestBody = {
              required: true,
              content: {
                  "application/json": {
                      schema: { $ref: "#/components/schemas/FindByEmail" },
                      examples: { 
                          User: { $ref: "#/components/examples/FindByEmail" }
                      }
                  }
              }
          }
        */
     /* #swagger.responses[200] = {
            description: "Usuário encontrado.",
            content: {
                "application/json": {
                    schema:{
                      type: "object",
                      $ref: "#/components/schemas/User"
                    }
                }           
            }
        }   
    */
    /* #swagger.responses[401] = {
                description: "Requisição não autorizada.",
            }   
        */
    
    try{
      const user = await User.findOne({email: req.body.email});
      if(user)
        return res.status(200).json({status: ResponseStatus.OK, message: 'Usuário encontrado.', payload: user} as ResponseDefault);
      else  
        return res.status(404).json({status: ResponseStatus.NOT_FOUND, message: 'Usuário não encontrado.'} as ResponseDefault);
    }catch(e: any){
      return res.status(500).json({status: ResponseStatus.ERROR, message: JSON.stringify(e)} as ResponseDefault);
    }

  }

  async create(req: Request, res: Response){
    // #swagger.tags = ['Users']
    // #swagger.summary = 'Criar um usuário'
    // #swagger.security = [{"bearerAuth": []}] 
    /* #swagger.requestBody = {
              required: true,
              content: {
                  "application/json": {
                      schema: { $ref: "#/components/schemas/User" },
                      examples: { 
                          User: { $ref: "#/components/examples/User" }
                      }
                  }
              }
          }
        */
    /* #swagger.responses[201] = {
            description: "Usuário criado com sucesso.",
            content: {
                "application/json": {
                    schema:{
                      type: "object",
                      $ref: "#/components/schemas/User"
                    }
                }           
            }
        }   
    */
    /* #swagger.responses[401] = {
              description: "Requisição não autorizada.",
              
          }   
      */

    try{

      if(await User.findOne({ email: req.body.email}))
        return res.status(422).json({status:ResponseStatus.INVALID_INFO, message:"Email já cadastrado."} as ResponseDefault); 

      if(await User.findOne({ cpf: req.body.cpf}))
        return res.status(422).json({status:ResponseStatus.INVALID_INFO, message:"CPF já cadastrado."} as ResponseDefault);
      
      if(await User.findOne({ cell: req.body.cell}))
        return res.status(422).json({status:ResponseStatus.INVALID_INFO, message:"Número de celular já cadastrado."} as ResponseDefault);

      const validation = validateUserBeforeSave(req.body);

      if(validation.isValid){
        const user = await User.create(req.body);
        return res.status(201).json({status: ResponseStatus.OK, message: 'Usuário criado com sucesso.', payload: user} as ResponseDefault);
      }else{
        return res.status(422).json({status: ResponseStatus.INVALID_INFO, message: validation.message} as ResponseDefault);
      }

    }catch(e: any){
      return res.status(500).json({status: ResponseStatus.ERROR, message: JSON.stringify(e)} as ResponseDefault);
    }
  }

  async updateById(req: Request, res: Response){
    // #swagger.tags = ['Users']
    // #swagger.summary = 'Atualizar um usuário pelo id'
    // #swagger.security = [{"bearerAuth": []}]
    /* #swagger.requestBody = {
              required: true,
              content: {
                  "application/json": {
                      schema: { $ref: "#/components/schemas/User" },
                      examples: { 
                          User: { $ref: "#/components/examples/User" }
                      }
                  }
              }
          }
        */
     /* #swagger.responses[200] = {
            description: "Usuário atualizado com sucesso.",
        }   
    */
    /* #swagger.responses[401] = {
                description: "Requisição não autorizada.",
            }   
        */

    try{

      const validation = validateUserBeforeSave(req.body);

      if(validation.isValid){
        const user = await User.findByIdAndUpdate({_id: req.params.id}, req.body);
        if(user)
          return res.status(200).json({status: ResponseStatus.OK, message: 'Usuário atualizado com sucesso.'} as ResponseDefault);
        else
         return res.status(404).json({status: ResponseStatus.ERROR, message: 'Usuário não encontrado.'} as ResponseDefault);
      }else{
        return res.status(422).json({status: ResponseStatus.INVALID_INFO, message: validation.message} as ResponseDefault);
      }

    }catch(e: any){
      return res.status(500).json({status: ResponseStatus.ERROR, message: JSON.stringify(e)} as ResponseDefault);
    }
  }

  async deleteById(req: Request, res: Response){

    // #swagger.tags = ['Users']
    // #swagger.summary = 'Deletar um usuário pelo id'
    // #swagger.security = [{"bearerAuth": []}]
     /* #swagger.responses[200] = {
            description: "Usuário deletado com sucesso.",
        }   
    */
    /* #swagger.responses[401] = {
                description: "Requisição não autorizada.",
            }   
        */
    try{
      const user = await User.findByIdAndRemove({_id: req.params.id});
      
      if(user)
        return res.status(200).json({status: ResponseStatus.OK, message: 'Usuário deletado com sucesso.'} as ResponseDefault);
      else  
        return res.status(404).json({status: ResponseStatus.OK, message: 'Usuário não encontrado.'} as ResponseDefault);
      
    }catch(e: any){
      return res.status(500).json({status: ResponseStatus.ERROR, message: JSON.stringify(e)} as ResponseDefault);
    }
  }

  async consultZipcode(req: Request, res: Response){
    // #swagger.tags = ['Users']
    // #swagger.summary = 'Consultar endereço'
    // #swagger.security = [{"bearerAuth": []}]
     /* #swagger.responses[200] = {
            description: "Endereço encontrado.",
            content: {
              "application/json": {
                    schema:{
                      type: "object",
                      $ref: "#/components/schemas/AddressInfo"
                    }
                }     
            }
        }   
    */
    /* #swagger.responses[401] = {
                description: "Requisição não autorizada.",
            }   
        */
    try{
      if(!req.params.zipcode) throw "Formato do CEP não identificado";
      
      const address = await getAddressByZipcode(req.params.zipcode)
      if(!address){
        throw "Não foi possível consultar o CEP";
      }
      return res.status(200).json({status: ResponseStatus.OK, message: 'Endereço encontrado.', payload: address} as ResponseDefault);
    }catch(e: any){
      return res.status(500).json({status: ResponseStatus.ERROR, message: JSON.stringify(e)} as ResponseDefault);
    }
  }

}
