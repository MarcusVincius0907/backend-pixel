"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.validateCheckoutBeforeSave = void 0;
const Cart_1 = __importDefault(require("../models/Cart"));
const NFT_1 = __importStar(require("../models/NFT"));
const ResponseDefault_1 = require("../models/ResponseDefault");
const Sortition_1 = __importDefault(require("../models/Sortition"));
const Payment_1 = __importStar(require("../models/Payment"));
const Order_1 = __importDefault(require("../models/Order"));
const validators_1 = require("../utils/validators");
//TODO implement when checkout logic is complete
function validateCheckoutBeforeSave(checkoutRequest) {
    try {
        let isValid = true;
        let message = [];
        if (!(0, validators_1.required)(checkoutRequest.paymentMethod)) {
            isValid = false;
            message.push("Metodo de pagamento é requerido");
        }
        return { isValid, message: JSON.stringify(message) };
    }
    catch (e) {
        return {
            isValid: false,
            message: "Erro genérico no objeto do sorteio. Verifique se todos os campos estão preenchidos",
        };
    }
}
exports.validateCheckoutBeforeSave = validateCheckoutBeforeSave;
//TODO create test for this
class CheckoutController {
    create(req, res) {
        var _a, _b;
        return __awaiter(this, void 0, void 0, function* () {
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
                    const cart = yield Cart_1.default.findOne({
                        _id: req.params.cartId,
                    });
                    if (cart) {
                        const sortition = yield Sortition_1.default.findOne({ _id: cart.sortitionId });
                        if (sortition) {
                            const nftSummary = yield NFT_1.NFTSummary.findOne({
                                _id: sortition.idNFTSummary,
                            });
                            if (nftSummary) {
                                const nft = yield NFT_1.default.findOne({
                                    _id: nftSummary.idNFT,
                                });
                                if (nft) {
                                    //verificar no nft se pixel esta disponivel
                                    if (cart.pixels && cart.pixels.length > 0) {
                                        const checkoutResp = {
                                            availablePixels: [],
                                            unavailablePixels: [],
                                        };
                                        cart.pixels.forEach((pixel) => {
                                            const currentPixel = nft.chunks[pixel.chunkPosition].pixels[pixel.position];
                                            if (currentPixel.isAvailible) {
                                                currentPixel.isAvailible = false;
                                                currentPixel.color = pixel.color;
                                                checkoutResp.availablePixels.push(currentPixel);
                                            }
                                            else {
                                                checkoutResp.unavailablePixels.push(currentPixel);
                                            }
                                        });
                                        yield NFT_1.default.findByIdAndUpdate({ _id: `${nft._id}` }, nft);
                                        //create payment record
                                        const payment = {
                                            amount: checkoutResp.availablePixels.length,
                                            paymentMethod: (_b = (_a = req.body) === null || _a === void 0 ? void 0 : _a.paymentMethod) !== null && _b !== void 0 ? _b : "",
                                            userId: cart.userId,
                                            status: Payment_1.PaymentStatus.PAID,
                                        };
                                        const createdPayment = yield Payment_1.default.create(payment);
                                        //TODO implement real payment
                                        //create order record
                                        const order = {
                                            userId: cart.userId,
                                            paymentId: `${createdPayment._id}`,
                                            orderItem: {
                                                sortitionId: cart.sortitionId,
                                                pixels: checkoutResp.availablePixels,
                                            },
                                        };
                                        yield Order_1.default.create(order);
                                        //delete cart
                                        yield Cart_1.default.deleteOne({ _id: `${cart._id}` });
                                        return res.status(200).json({
                                            status: ResponseDefault_1.ResponseStatus.OK,
                                            message: "Pedido finalizado com sucesso.",
                                            payload: checkoutResp,
                                        });
                                    }
                                }
                            }
                        }
                    }
                }
                else {
                    return res.status(422).json({
                        status: ResponseDefault_1.ResponseStatus.INVALID_INFO,
                        message: validation.message,
                    });
                }
            }
            catch (e) {
                return res.status(500).json({
                    status: ResponseDefault_1.ResponseStatus.ERROR,
                    message: JSON.stringify(e),
                });
            }
        });
    }
}
exports.default = CheckoutController;
