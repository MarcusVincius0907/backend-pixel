import { Request, Response } from "express";
import Cart, { ICart } from "../models/Cart";
import { ICheckoutRequest, ICheckoutResponse } from "../models/Checkout";
import NFT, { INFT, INFTSummary, IPixel, NFTSummary } from "../models/NFT";
import ResponseDefault, { ResponseStatus } from "../models/ResponseDefault";
import Sortition from "../models/Sortition";
import Payment, { IPayment, PaymentStatus } from "../models/Payment";
import Order, { IOrder } from "../models/Order";
import { required } from "../utils/validators";

//TODO implement when checkout logic is complete
export function validateCheckoutBeforeSave(checkoutRequest: ICheckoutRequest) {
  try {
    let isValid = true;
    let message = [];

    if (!required(checkoutRequest.paymentMethod)) {
      isValid = false;
      message.push("Metodo de pagamento é requerido");
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

//TODO create test for this
export default class CheckoutController {
  async create(req: Request, res: Response) {
    // #swagger.tags = ['Checkout']
    // #swagger.summary = 'Finalizar pedido'
    // #swagger.security = [{"bearerAuth": []}]
    /* #swagger.requestBody = {
              required: true,
              content: {
                  "application/json": {
                    schema:{
                      type: "string",
                    }
                } 
              }
          }
        */
    /* #swagger.responses[200] = {
            description: "Pedido finalizado com sucesso.",
            content: {
                "application/json": {
                    schema:{
                      type: "string",
                    }
                }           
            }
        }   
    */
    /* #swagger.responses[201] = {
            description: "Pedido finalizado com sucesso",
            content: {
                "application/json": {
                    
                }           
            }
        }   
    */
    /* #swagger.responses[401] = {
              description: "Requisição não autorizada.",
              
          }   
      */
    try {
      //receive cart id, payment method
      /* amount: number,
      paymentMethod: PaymentMethods,
       */

      const validation = validateCheckoutBeforeSave(req.body);
      if (validation.isValid && req.params.cartId) {
        const cart: ICart | null = await Cart.findOne({
          _id: req.params.cartId,
        });
        if (cart) {
          const sortition = await Sortition.findOne({ _id: cart.sortitionId });
          if (sortition) {
            const nftSummary: INFTSummary | null = await NFTSummary.findOne({
              _id: sortition.idNFTSummary,
            });
            if (nftSummary) {
              const nft: INFT | null = await NFT.findOne({
                _id: nftSummary.idNFT,
              });

              if (nft) {
                //verificar no nft se pixel esta disponivel
                if (cart.pixels && cart.pixels.length > 0) {
                  const checkoutResp: ICheckoutResponse = {
                    availablePixels: [],
                    unavailablePixels: [],
                  };

                  cart.pixels.forEach((pixel) => {
                    const currentPixel =
                      nft.chunks[pixel.chunkPosition].pixels[pixel.position];
                    if (currentPixel.isAvailible) {
                      currentPixel.isAvailible = false;
                      currentPixel.color = pixel.color;
                      checkoutResp.availablePixels.push(currentPixel);
                    } else {
                      checkoutResp.unavailablePixels.push(currentPixel);
                    }
                  });

                  await NFT.findByIdAndUpdate({ _id: `${nft._id}` }, nft);

                  //create payment record
                  const payment: IPayment = {
                    amount: checkoutResp.availablePixels.length,
                    paymentMethod: req.body?.paymentMethod ?? "",
                    userId: cart.userId,
                    status: PaymentStatus.PAID,
                  };

                  const createdPayment = await Payment.create(payment);

                  //TODO implement real payment

                  //create order record
                  const order: IOrder = {
                    userId: cart.userId,
                    paymentId: `${createdPayment._id}`,
                    orderItem: {
                      pixels: checkoutResp.availablePixels,
                    },
                  };

                  await Order.create(order);

                  //delete cart
                  await Cart.deleteOne({ _id: `${cart._id}` });

                  return res.status(200).json({
                    status: ResponseStatus.OK,
                    message: "Pedido finalizado com sucesso.",
                    payload: checkoutResp,
                  } as ResponseDefault);
                }
              }
            }
          }
        }
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
}
