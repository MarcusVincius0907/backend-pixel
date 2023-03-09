import { Request, Response } from "express";
import ResponseDefault, { ResponseStatus } from "../models/ResponseDefault";
import Payment, { IPayment, PaymentMethods, PaymentStatus } from '../models/Payment';
import { arrayIsNotEmpty, required, validateEnum } from "../utils/validators";

export function validatePaymentBeforeSave(payment: IPayment){
  try{
    let isValid = true;
    let message = [];

    //we're not validating amount for now

    if(!required(payment.userId)){
      isValid = false;
      message.push( 'O id do usuário é inválido');
    }

    if(!validateEnum(payment.status, PaymentStatus)){
      isValid = false;
      message.push( 'O status é inválido');
    }

    if(!validateEnum(payment.paymentMethod, PaymentMethods)){
      isValid = false;
      message.push( 'O metodo de pagamento é inválido');
    }
  
    return {isValid, message: JSON.stringify(message)};  
  }catch(e){
    return {isValid: false, message: 'Erro genérico no objeto do pagamento. Verifique se todos os campos estão preenchidos'};
  }
}

export default class PaymentController{
  
  async list(req: Request, res: Response){
    // #swagger.tags = ['Payments']
    // #swagger.summary = 'Listar todos os pagamentos'
    // #swagger.security = [{"bearerAuth": []}]
    /* #swagger.responses[200] = {
            description: "Pagamento(s) encontrado(s).",
            content: {
                "application/json": {
                    schema:{
                      type: "array",
                      items:{
                        type: "object",
                        $ref: "#/components/schemas/Payment"
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
      const payments = await Payment.find();
      return res.status(200).json({status: ResponseStatus.OK, message: 'Pagamento(s) encontrado(s).', payload: payments} as ResponseDefault);
    }catch(e: any){
      return res.status(500).json({status: ResponseStatus.ERROR, message: JSON.stringify(e)} as ResponseDefault);
    }
  }

  async create(req: Request, res: Response){
    // #swagger.tags = ['Payments']
    // #swagger.summary = 'Criar um pagamento'
    // #swagger.security = [{"bearerAuth": []}] 
    /* #swagger.requestBody = {
              required: true,
              content: {
                  "application/json": {
                      schema: { $ref: "#/components/schemas/Payment" },
                      examples: { 
                          Payment: { $ref: "#/components/examples/Payment" }
                      }
                  }
              }
          }
        */
    /* #swagger.responses[201] = {
            description: "Pagamento criado com sucesso.",
            content: {
                "application/json": {
                    schema:{
                      type: "object",
                      $ref: "#/components/schemas/Payment"
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

      const validation = validatePaymentBeforeSave(req.body);

      if(validation.isValid){
        const payment = await Payment.create(req.body);
        return res.status(201).json({status: ResponseStatus.OK, message: 'Pagamento criado com sucesso.', payload: payment} as ResponseDefault);
      }else{
        return res.status(422).json({status: ResponseStatus.INVALID_INFO, message: validation.message} as ResponseDefault);
      }

    }catch(e: any){
      return res.status(500).json({status: ResponseStatus.ERROR, message: JSON.stringify(e)} as ResponseDefault);
    }
  }
  async updateById(req: Request, res: Response){
    // #swagger.tags = ['Payments']
    // #swagger.summary = 'Atualizar um pagamento pelo id'
    // #swagger.security = [{"bearerAuth": []}]
    /* #swagger.requestBody = {
              required: true,
              content: {
                  "application/json": {
                      schema: { $ref: "#/components/schemas/Payment" },
                      examples: { 
                          Payment: { $ref: "#/components/examples/Payment" }
                      }
                  }
              }
          }
        */
     /* #swagger.responses[200] = {
            description: "Pagamento atualizado com sucesso.",
        }   
    */
    /* #swagger.responses[401] = {
                description: "Requisição não autorizada.",
            }   
        */
    try{

      const validation = validatePaymentBeforeSave(req.body);

      if(validation.isValid){
        const payment = await Payment.findByIdAndUpdate({_id: req.params.id}, req.body);
        if(payment)
          return res.status(200).json({status: ResponseStatus.OK, message: 'Pagamento atualizado com sucesso.'} as ResponseDefault);
        else
         return res.status(404).json({status: ResponseStatus.NOT_FOUND, message: 'Pagamento não encontrado.'} as ResponseDefault);
      }else{
        return res.status(422).json({status: ResponseStatus.INVALID_INFO, message: validation.message} as ResponseDefault);
      }

    }catch(e: any){
      return res.status(500).json({status: ResponseStatus.ERROR, message: JSON.stringify(e)} as ResponseDefault);
    }
  }
  async deleteById(req: Request, res: Response){
    // #swagger.tags = ['Payments']
    // #swagger.summary = 'Deletar um pagamento pelo id'
    // #swagger.security = [{"bearerAuth": []}]
     /* #swagger.responses[200] = {
            description: "Pagamento deletado com sucesso.",
        }   
    */
    /* #swagger.responses[401] = {
                description: "Requisição não autorizada.",
            }   
        */
    try{
      const payment = await Payment.findByIdAndRemove({_id: req.params.id});
      
      if(payment)
        return res.status(200).json({status: ResponseStatus.OK, message: 'Pagamento deletado com sucesso encontrado.'} as ResponseDefault);
      else  
        return res.status(404).json({status: ResponseStatus.NOT_FOUND, message: 'Pagamento não encontrado.'} as ResponseDefault);
      
    }catch(e: any){
      return res.status(500).json({status: ResponseStatus.ERROR, message: JSON.stringify(e)} as ResponseDefault);
    }
  }
}