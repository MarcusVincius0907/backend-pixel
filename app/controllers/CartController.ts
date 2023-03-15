import { Request, Response } from "express";
import ResponseDefault, { ResponseStatus } from "../models/ResponseDefault";
import Cart, { ICart } from "../models/Cart";
import { arrayIsNotEmpty } from "../utils/validators";

export function validateCartBeforeSave(cart: ICart) {
  try {
    let isValid = true;
    let message: any[] = [];

    //TODO refactor logic because cart can be empty
    /* if (!arrayIsNotEmpty(cart.pixelIds)) {
      isValid = false;
      message.push("O carrinho está vazio");
    } */

    return { isValid, message: JSON.stringify(message) };
  } catch (e) {
    return {
      isValid: false,
      message:
        "Erro genérico no objeto do carrinho. Verifique se todos os campos estão preenchidos",
    };
  }
}

export default class CartController {
  async list(req: Request, res: Response) {
    // #swagger.tags = ['Carts']
    // #swagger.summary = 'Listar todos os carrinhos'
    // #swagger.security = [{"bearerAuth": []}]
    /* #swagger.responses[200] = {
            description: "Carrinhos(s) encontrado(s).",
            content: {
                "application/json": {
                    schema:{
                      type: "array",
                      items:{
                        type: "object",
                        $ref: "#/components/schemas/Cart"
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
    try {
      const carts = await Cart.find();
      return res.status(200).json({
        status: ResponseStatus.OK,
        message: "Carrinhos(s) encontrado(s).",
        payload: carts,
      } as ResponseDefault);
    } catch (e: any) {
      return res.status(500).json({
        status: ResponseStatus.ERROR,
        message: JSON.stringify(e),
      } as ResponseDefault);
    }
  }

  async getByUserId(req: Request, res: Response) {
    // #swagger.tags = ['Carts']
    // #swagger.summary = 'Buscar carrinho de um usuario'
    // #swagger.security = [{"bearerAuth": []}]
    /* #swagger.responses[200] = {
            description: "Carrinhos(s) encontrado(s).",
            content: {
                "application/json": {
                    schema:{
                      type: "string",
                    }
                }           
            }
        }   
    */
    /* #swagger.responses[401] = {
            description: "Requisição não autorizada.",
        }   
    */
    try {
      if (req.params.userId) {
        const cart = await Cart.findOne({ userId: req.params.userId });
        if (cart) {
          return res.status(200).json({
            status: ResponseStatus.OK,
            message: "Carrinho encontrado",
            payload: cart,
          } as ResponseDefault);
        }
      }
      return res.status(404).json({
        status: ResponseStatus.NOT_FOUND,
        message: "Carrinho não encontrado",
      } as ResponseDefault);
    } catch (e: any) {
      return res.status(500).json({
        status: ResponseStatus.ERROR,
        message: JSON.stringify(e),
      } as ResponseDefault);
    }
  }

  async create(req: Request, res: Response) {
    // #swagger.tags = ['Carts']
    // #swagger.summary = 'Criar um carrinho'
    // #swagger.security = [{"bearerAuth": []}]
    /* #swagger.requestBody = {
              required: true,
              content: {
                  "application/json": {
                      schema: { $ref: "#/components/schemas/Cart" },
                      examples: { 
                          Cart: { $ref: "#/components/examples/Cart" }
                      }
                  }
              }
          }
        */
    /* #swagger.responses[201] = {
            description: "Carrinho criado com sucesso.",
            content: {
                "application/json": {
                    schema:{
                      type: "object",
                      $ref: "#/components/schemas/Cart"
                    }
                }           
            }
        }   
    */
    /* #swagger.responses[401] = {
              description: "Requisição não autorizada.",
              
          }   
      */
    try {
      const validation = validateCartBeforeSave(req.body);

      if (validation.isValid) {
        const cart = await Cart.create(req.body);
        return res.status(201).json({
          status: ResponseStatus.OK,
          message: "Carrinho criado com sucesso.",
          payload: cart,
        } as ResponseDefault);
      } else {
        return res.status(422).json({
          status: ResponseStatus.INVALID_INFO,
          message: validation.message,
        } as ResponseDefault);
      }
    } catch (e: any) {
      return res.status(500).json({
        status: ResponseStatus.ERROR,
        message: JSON.stringify(e),
      } as ResponseDefault);
    }
  }
  async updateById(req: Request, res: Response) {
    // #swagger.tags = ['Carts']
    // #swagger.summary = 'Atualizar um carrinho pelo id'
    // #swagger.security = [{"bearerAuth": []}]
    /* #swagger.requestBody = {
              required: true,
              content: {
                  "application/json": {
                      schema: { $ref: "#/components/schemas/Cart" },
                      examples: { 
                          Cart: { $ref: "#/components/examples/Cart" }
                      }
                  }
              }
          }
        */
    /* #swagger.responses[200] = {
            description: "Carrinho atualizado com sucesso.",
        }   
    */
    /* #swagger.responses[401] = {
                description: "Requisição não autorizada.",
            }   
        */
    try {
      const validation = validateCartBeforeSave(req.body);

      if (validation.isValid) {
        const cart = await Cart.findByIdAndUpdate(
          { _id: req.params.id },
          req.body
        );
        if (cart)
          return res.status(200).json({
            status: ResponseStatus.OK,
            message: "Carrinho atualizado com sucesso.",
          } as ResponseDefault);
        else
          return res.status(404).json({
            status: ResponseStatus.NOT_FOUND,
            message: "Carrinho não encontrado.",
          } as ResponseDefault);
      } else {
        return res.status(422).json({
          status: ResponseStatus.INVALID_INFO,
          message: validation.message,
        } as ResponseDefault);
      }
    } catch (e: any) {
      return res.status(500).json({
        status: ResponseStatus.ERROR,
        message: JSON.stringify(e),
      } as ResponseDefault);
    }
  }
  async deleteById(req: Request, res: Response) {
    // #swagger.tags = ['Carts']
    // #swagger.summary = 'Deletar um carrinho pelo id'
    // #swagger.security = [{"bearerAuth": []}]
    /* #swagger.responses[200] = {
            description: "Carrinho deletado com sucesso.",
        }   
    */
    /* #swagger.responses[401] = {
                description: "Requisição não autorizada.",
            }   
        */
    try {
      const cart = await Cart.findByIdAndRemove({ _id: req.params.id });

      if (cart)
        return res.status(200).json({
          status: ResponseStatus.OK,
          message: "Carrinho deletado com sucesso encontrado.",
        } as ResponseDefault);
      else
        return res.status(404).json({
          status: ResponseStatus.NOT_FOUND,
          message: "Carrinho não encontrado.",
        } as ResponseDefault);
    } catch (e: any) {
      return res.status(500).json({
        status: ResponseStatus.ERROR,
        message: JSON.stringify(e),
      } as ResponseDefault);
    }
  }
}
