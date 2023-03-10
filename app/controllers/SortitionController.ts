import { Request, Response } from "express";
import ResponseDefault, { ResponseStatus } from "../models/ResponseDefault";
import Sortition, { ISortition } from "../models/Sortition";
import { isValidDate, required } from "../utils/validators";

export function validateSortitionBeforeSave(sortition: ISortition) {
  try {
    let isValid = true;
    let message = [];

    if (!required(sortition.name)) {
      isValid = false;
      message.push("Nome é requerido");
    }

    if (!required(sortition.date) || !isValidDate(sortition.date, true)) {
      isValid = false;
      message.push("Data inválida");
    }

    if (!required(sortition.reward)) {
      isValid = false;
      message.push("Premiação é requerido");
    }

    if (!required(sortition.idNFTSummary)) {
      isValid = false;
      message.push("id do NFT é requerido");
    }

    return { isValid, message: JSON.stringify(message) };
  } catch (e) {
    return {
      isValid: false,
      message:
        "Erro genérico no objeto do sorteio. Verifique se todos os campos estão preenchidos",
    };
  }
}

export default class SortitionController {
  async list(req: Request, res: Response) {
    // #swagger.tags = ['Sortitions']
    // #swagger.summary = 'Listar todos os sorteios'
    // #swagger.security = [{"bearerAuth": []}]
    /* #swagger.responses[200] = {
            description: "Sorteio(s) encontrado(s).",
            content: {
                "application/json": {
                    schema:{
                      type: "array",
                      items:{
                        type: "object",
                        $ref: "#/components/schemas/Sortition"
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
      const sortition = await Sortition.find();
      return res.status(200).json({
        status: ResponseStatus.OK,
        message: "Sorteio(s) encontrado(s).",
        payload: sortition,
      } as ResponseDefault);
    } catch (e: any) {
      return res.status(500).json({
        status: ResponseStatus.ERROR,
        message: JSON.stringify(e),
      } as ResponseDefault);
    }
  }

  //TODO create a test for this
  async getById(req: Request, res: Response) {
    // #swagger.tags = ['Sortitions']
    // #swagger.summary = 'Buscar pelo id'
    // #swagger.security = [{"bearerAuth": []}]
    /* #swagger.responses[200] = {
            description: "Sorteio(s) encontrado(s).",
            content: {
                "application/json": {
                    schema:{
                      type: "object",
                      $ref: "#/components/schemas/Sortition"
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
      const sortition = await Sortition.findOne({ _id: req.params.id });
      return res.status(200).json({
        status: ResponseStatus.OK,
        message: "Sorteio(s) encontrado(s).",
        payload: sortition,
      } as ResponseDefault);
    } catch (e: any) {
      return res.status(500).json({
        status: ResponseStatus.ERROR,
        message: JSON.stringify(e),
      } as ResponseDefault);
    }
  }
  async create(req: Request, res: Response) {
    // #swagger.tags = ['Sortitions']
    // #swagger.summary = 'Criar um sorteio'
    // #swagger.security = [{"bearerAuth": []}]
    /* #swagger.requestBody = {
              required: true,
              content: {
                  "application/json": {
                      schema: { $ref: "#/components/schemas/Sortition" },
                      examples: { 
                          Sortition: { $ref: "#/components/examples/Sortition" }
                      }
                  }
              }
          }
        */
    /* #swagger.responses[201] = {
            description: "Sorteio criado com sucesso.",
            content: {
                "application/json": {
                    schema:{
                      type: "object",
                      $ref: "#/components/schemas/Sortition"
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
      const validation = validateSortitionBeforeSave(req.body);

      if (validation.isValid) {
        const sortition = await Sortition.create(req.body);
        return res.status(201).json({
          status: ResponseStatus.OK,
          message: "Sorteio criado com sucesso.",
          payload: sortition,
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
    // #swagger.tags = ['Sortitions']
    // #swagger.summary = 'Atualizar um sorteio pelo id'
    // #swagger.security = [{"bearerAuth": []}]
    /* #swagger.requestBody = {
              required: true,
              content: {
                  "application/json": {
                      schema: { $ref: "#/components/schemas/Sortition" },
                      examples: { 
                          Sortition: { $ref: "#/components/examples/Sortition" }
                      }
                  }
              }
          }
        */
    /* #swagger.responses[200] = {
            description: "Sorteio atualizado com sucesso.",
        }   
    */
    /* #swagger.responses[401] = {
                description: "Requisição não autorizada.",
            }   
        */
    try {
      const validation = validateSortitionBeforeSave(req.body);

      if (validation.isValid) {
        const sortition = await Sortition.findByIdAndUpdate(
          { _id: req.params.id },
          req.body
        );
        if (sortition)
          return res.status(200).json({
            status: ResponseStatus.OK,
            message: "Sorteio atualizado com sucesso.",
          } as ResponseDefault);
        else
          return res.status(404).json({
            status: ResponseStatus.NOT_FOUND,
            message: "Sorteio não encontrado.",
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
    // #swagger.tags = ['Sortitions']
    // #swagger.summary = 'Deletar um sorteio pelo id'
    // #swagger.security = [{"bearerAuth": []}]
    /* #swagger.responses[200] = {
            description: "Sorteio deletado com sucesso.",
        }   
    */
    /* #swagger.responses[401] = {
                description: "Requisição não autorizada.",
            }   
        */
    try {
      const sortition = await Sortition.findByIdAndRemove({
        _id: req.params.id,
      });

      if (sortition)
        return res.status(200).json({
          status: ResponseStatus.OK,
          message: "Sorteio deletado com sucesso encontrado.",
        } as ResponseDefault);
      else
        return res.status(404).json({
          status: ResponseStatus.NOT_FOUND,
          message: "Sorteio não encontrado.",
        } as ResponseDefault);
    } catch (e: any) {
      return res.status(500).json({
        status: ResponseStatus.ERROR,
        message: JSON.stringify(e),
      } as ResponseDefault);
    }
  }
}
