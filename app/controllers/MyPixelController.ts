import { Request, Response } from "express";
import mongoose from "mongoose";
import Order, { IOrder } from "../models/Order";
import ResponseDefault, { ResponseStatus } from "../models/ResponseDefault";
import { ObjectId } from "mongodb";
import { IPixel } from "../models/NFT";

//TODO create a test for this
export default class MyPixelController {
  async list(req: Request, res: Response) {
    // #swagger.tags = ['MyPixel']
    // #swagger.summary = 'Listar os pixels de um usuário'
    // #swagger.security = [{"bearerAuth": []}]
    /* #swagger.responses[200] = {
            description: "Lista de pixels encontrado",
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
        const order_sortition: any[] = await Order.aggregate([
          {
            $match: {
              userId: new ObjectId("63fb5a0edbd501c3bd3da1e9"),
            },
          },
          {
            $lookup: {
              from: "sortitions",
              localField: "orderItem.sortitionId",
              foreignField: "_id",
              as: "order_sortition",
            },
          },
        ]);

        if (order_sortition.length > 0) {
          const myPixelList: any = [];
          order_sortition.forEach((or) => {
            or.orderItem.pixels.forEach((pixel: IPixel) => {
              myPixelList.push({
                uuid: pixel.uuid,
                color: pixel.color,
                sortitionName: or.order_sortition[0].name,
                sortitionDate: or.order_sortition[0].date,
              });
            });
          });

          return res.status(200).json({
            status: ResponseStatus.OK,
            message: "Lista pixels encontrada",
            payload: myPixelList,
          } as ResponseDefault);
        }
      }

      return res.status(404).json({
        status: ResponseStatus.NOT_FOUND,
        message: "List de pixel não encontrada",
      } as ResponseDefault);
    } catch (e: any) {
      return res.status(500).json({
        status: ResponseStatus.ERROR,
        message: JSON.stringify(e),
      } as ResponseDefault);
    }
  }
}
