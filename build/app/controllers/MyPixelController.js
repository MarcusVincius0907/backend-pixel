"use strict";
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
const Order_1 = __importDefault(require("../models/Order"));
const ResponseDefault_1 = require("../models/ResponseDefault");
const mongodb_1 = require("mongodb");
//TODO create a test for this
class MyPixelController {
    list(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
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
                    const order_sortition = yield Order_1.default.aggregate([
                        {
                            $match: {
                                userId: new mongodb_1.ObjectId(req.params.userId),
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
                        const myPixelList = [];
                        order_sortition.forEach((or) => {
                            or.orderItem.pixels.forEach((pixel) => {
                                myPixelList.push({
                                    uuid: pixel.uuid,
                                    color: pixel.color,
                                    sortitionName: or.order_sortition[0].name,
                                    sortitionDate: or.order_sortition[0].date,
                                });
                            });
                        });
                        return res.status(200).json({
                            status: ResponseDefault_1.ResponseStatus.OK,
                            message: "Lista pixels encontrada",
                            payload: myPixelList,
                        });
                    }
                }
                return res.status(404).json({
                    status: ResponseDefault_1.ResponseStatus.NOT_FOUND,
                    message: "List de pixel não encontrada",
                });
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
exports.default = MyPixelController;
