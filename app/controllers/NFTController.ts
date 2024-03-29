import { Request, Response } from "express";
import ResponseDefault, { ResponseStatus } from "../models/ResponseDefault";
import NFT, {
  NFTSummary,
  IChunk,
  INFT,
  INFTMeasurements,
  IPixel,
  INFTSummary,
} from "../models/NFT";
import { isValidDate, required } from "../utils/validators";
import { v4 as uuidv4 } from "uuid";
import Sortition from "../models/Sortition";

const AVAILABLE_CHUNKS: number = 8;
const VERTICAL_CHUNK_QUANTITY: number = 3;

export function validateNFTBeforeSave(nft: INFTSummary) {
  try {
    let isValid = true;
    let message = [];

    if (!required(nft.name)) {
      isValid = false;
      message.push("Nome é requerido");
    }

    if (!required(nft.pixelQuantity)) {
      isValid = false;
      message.push("Quantidade de pixel é requerido");
    }

    if (nft.pixelQuantity < 10) {
      isValid = false;
      message.push("Quantidade de Pixels indisponível");
    }

    if (!required(nft.themes)) {
      isValid = false;
      message.push("Tema é requerido");
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

/**
 * It calculates pixels quantity based on chunkSide
 * @param chunkSize -> the NFT is divided in 8 chunks. The chunkSide will define the pixelQuantity
 * @returns the pixel quantity
 */
export function calculatePixelsQuantity(chunkSize: number = 12) {
  const pixelsQuantity = chunkSize * chunkSize * AVAILABLE_CHUNKS; //for default value 1152
  return pixelsQuantity;
}

/**
 * It calculates NFT width and chunk width, to fit in the screen
 * @param chunkSize -> the NFT is divided in 9 chunks. The chunkSide will define the pixelQuantity
 * @param divElementSize -> size of each div pixel to format the NFT in the screen
 * @returns object with NFT masurements
 */
export function calculateNFTMeasurements(
  chunkSize: number = 12,
  divElementSize: number = 20
) {
  const NFTWidth = chunkSize * VERTICAL_CHUNK_QUANTITY * divElementSize; // for default 720px
  const chunkWidth = chunkSize * divElementSize; // for default 240px
  return {
    NFTWidth,
    chunkWidth,
  } as INFTMeasurements;
}

export function createNFT(chunkSize: number) {
  if (chunkSize < 10) return null;

  //const pixelsQuantity = calculatePixelsQuantity(chunkSize);
  const nft: INFT = {
    chunkSize,
    chunks: [],
  };

  for (let i = 0; i < AVAILABLE_CHUNKS; i++) {
    const pixelsPerChunk = chunkSize * chunkSize;
    const chunk: IChunk = {
      pixels: [],
      position: i,
    };

    for (let j = 0; j < pixelsPerChunk; j++) {
      chunk.pixels.push({
        uuid: uuidv4(),
        color: "#FFFFFF",
        isAvailible: true,
        position: j,
        chunkPosition: i,
      } as IPixel);
    }

    nft.chunks?.push(chunk);
  }

  return nft;
}

export default class NFTController {
  async list(req: Request, res: Response) {
    // #swagger.tags = ['NFTs']
    // #swagger.summary = 'Listar todos os NFTs resumidos'
    // #swagger.security = [{"bearerAuth": []}]
    /* #swagger.responses[200] = {
            description: "NFT(s) encontrado(s).",
            content: {
                "application/json": {
                    schema:{
                      type: "array",
                      items:{
                        type: "object",
                        $ref: "#/components/schemas/NFTSummary"
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
      const nfts = await NFTSummary.find();
      return res.status(200).json({
        status: ResponseStatus.OK,
        message: "NFT(s) encontrado(s).",
        payload: nfts,
      } as ResponseDefault);
    } catch (e: any) {
      return res.status(500).json({
        status: ResponseStatus.ERROR,
        message: JSON.stringify(e),
      } as ResponseDefault);
    }
  }

  //TODO create a test for this method
  async listNFTSummaryId(req: Request, res: Response) {
    // #swagger.tags = ['NFTs']
    // #swagger.summary = 'Listar todos os ids dos NFTs'
    // #swagger.security = [{"bearerAuth": []}]
    /* #swagger.responses[200] = {
            description: "NFT(s) encontrado(s).",
            content: {
                "application/json": {
                    schema:{
                      type: "array",
                      items:{
                        type: "string",
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
      const nft_sortition = await NFTSummary.aggregate([
        {
          $lookup: {
            from: "sortitions",
            localField: "_id",
            foreignField: "idNFTSummary",
            as: "nft_sortition",
          },
        },
      ]);
      const nfts = nft_sortition.map(
        (nft) =>
          ({
            name: nft.name,
            id: nft._id,
            vinculated: nft.nft_sortition.length > 0,
          } as any)
      );
      return res.status(200).json({
        status: ResponseStatus.OK,
        message: "NFT(s) encontrado(s).",
        payload: nfts,
      } as ResponseDefault);
    } catch (e: any) {
      return res.status(500).json({
        status: ResponseStatus.ERROR,
        message: JSON.stringify(e),
      } as ResponseDefault);
    }
  }

  //TODO create a test for this method
  /**
   * It will return the initial info for rendering NFT.
   * @param req.body.id -> NFTSummary id that contains chunkSize
   * @returns object with NFT masurements
   */
  async getNFTMeasurements(req: Request, res: Response) {
    // #swagger.tags = ['NFTs']
    // #swagger.summary = 'Buscar informações iniciais para renderizar o NFT'
    // #swagger.security = [{"bearerAuth": []}]
    /* #swagger.responses[200] = {
            description: "Dados gerados",
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
      if (req.params.id) {
        const nftSummary = await NFTSummary.findOne({ _id: req.params.id });

        if (nftSummary) {
          const nft = await NFT.findOne({ _id: nftSummary.idNFT });

          if (nft) {
            const nftMeasurements = calculateNFTMeasurements(
              nftSummary?.pixelQuantity,
              req.params?.pixelSize ? Number(req.params.pixelSize) : undefined
            );

            nftMeasurements.nft = nft as any;

            nftMeasurements.themes = nftSummary.themes;

            return res.status(200).json({
              status: ResponseStatus.OK,
              message: "Dados encontrados",
              payload: nftMeasurements,
            } as ResponseDefault);
          }
        }
      }

      return res.status(404).json({
        status: ResponseStatus.NOT_FOUND,
        message: "NFT id não encontrado",
      } as ResponseDefault);
    } catch (e: any) {
      return res.status(500).json({
        status: ResponseStatus.ERROR,
        message: JSON.stringify(e),
      } as ResponseDefault);
    }
  }

  async findById(req: Request, res: Response) {
    // #swagger.tags = ['NFTs']
    // #swagger.summary = 'Obter um NFT resumido pelo id'
    // #swagger.security = [{"bearerAuth": []}]
    /* #swagger.responses[200] = {
            description: "NFT encontrado.",
            content: {
                "application/json": {
                    schema:{
                      type: "object",
                      $ref: "#/components/schemas/NFTSummary"
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
      const nft = await NFTSummary.findOne({ _id: req.params.id });
      if (nft)
        return res.status(200).json({
          status: ResponseStatus.OK,
          message: "NFT encontrado.",
          payload: nft,
        } as ResponseDefault);
      else
        return res.status(404).json({
          status: ResponseStatus.NOT_FOUND,
          message: "NFT não encontrado.",
        } as ResponseDefault);
    } catch (e: any) {
      return res.status(500).json({
        status: ResponseStatus.ERROR,
        message: JSON.stringify(e),
      } as ResponseDefault);
    }
  }

  async create(req: Request, res: Response) {
    // #swagger.tags = ['NFTs']
    // #swagger.summary = 'Criar um NFT'
    // #swagger.security = [{"bearerAuth": []}]
    /* #swagger.requestBody = {
              required: true,
              content: {
                  "application/json": {
                      schema: { $ref: "#/components/schemas/NFTSummary" },
                      examples: { 
                          NFTSummary: { $ref: "#/components/examples/NFTSummary" }
                      }
                  }
              }
          }
        */
    /* #swagger.responses[201] = {
            description: "NFT criado com sucesso.",
            content: {
                "application/json": {
                    schema:{
                      type: "object",
                      $ref: "#/components/schemas/NFTSummary"
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
      const validation = validateNFTBeforeSave(req.body);
      const nFTSumReq: INFTSummary = req.body;

      if (validation.isValid) {
        //create object structure
        const newNFT = createNFT(nFTSumReq.pixelQuantity);

        //create in DB
        const nft = await NFT.create(newNFT);

        nFTSumReq.idNFT = nft._id as any;
        const nftSum = await NFTSummary.create(nFTSumReq);

        return res.status(201).json({
          status: ResponseStatus.OK,
          message: "Sorteio criado com sucesso.",
          payload: nftSum,
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
    // #swagger.tags = ['NFTs']
    // #swagger.summary = 'Atualizar um NFT pelo id'
    // #swagger.security = [{"bearerAuth": []}]
    /* #swagger.requestBody = {
              required: true,
              content: {
                  "application/json": {
                      schema: { $ref: "#/components/schemas/NFTSummary" },
                      examples: { 
                          NFTSummary: { $ref: "#/components/examples/NFTSummary" }
                      }
                  }
              }
          }
        */
    /* #swagger.responses[200] = {
            description: "NFT atualizado com sucesso.",
        }   
    */
    /* #swagger.responses[401] = {
                description: "Requisição não autorizada.",
            }   
        */
    try {
      const validation = validateNFTBeforeSave(req.body);
      const nFTSumReq: INFTSummary = req.body;

      if (validation.isValid) {
        const nftSum = await NFTSummary.findOne({ _id: req.params.id });
        if (nftSum) {
          //if pixel quantity has changed, we'll have to delete nft and create another
          if (nftSum.pixelQuantity != nFTSumReq.pixelQuantity) {
            await NFT.findByIdAndRemove({ _id: nftSum.idNFT });

            const newNFT = createNFT(nFTSumReq.pixelQuantity);

            const nft = await NFT.create(newNFT);

            nFTSumReq.idNFT = nft.id;
          }

          await NFTSummary.findByIdAndUpdate({ _id: req.params.id }, nFTSumReq);

          return res.status(200).json({
            status: ResponseStatus.OK,
            message: "NFT atualizado com sucesso.",
          } as ResponseDefault);
        } else
          return res.status(404).json({
            status: ResponseStatus.NOT_FOUND,
            message: "NFT não encontrado.",
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
    // #swagger.tags = ['NFTs']
    // #swagger.summary = 'Deletar um NFT pelo id'
    // #swagger.security = [{"bearerAuth": []}]
    /* #swagger.responses[200] = {
            description: "NFT deletado com sucesso.",
        }   
    */
    /* #swagger.responses[401] = {
                description: "Requisição não autorizada.",
            }   
        */
    try {
      const nftSum = await NFTSummary.findOne({ _id: req.params.id });

      if (nftSum) await NFT.findByIdAndRemove({ _id: nftSum.idNFT });
      else {
        return res.status(404).json({
          status: ResponseStatus.NOT_FOUND,
          message: "NFT não encontrado.",
        } as ResponseDefault);
      }

      nftSum.remove();

      return res.status(200).json({
        status: ResponseStatus.OK,
        message: "NFT deletado com sucesso encontrado.",
      } as ResponseDefault);
    } catch (e: any) {
      return res.status(500).json({
        status: ResponseStatus.ERROR,
        message: JSON.stringify(e),
      } as ResponseDefault);
    }
  }
}
