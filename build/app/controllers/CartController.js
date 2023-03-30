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
exports.validateCartBeforeSave = void 0;
const ResponseDefault_1 = require("../models/ResponseDefault");
const Cart_1 = __importDefault(require("../models/Cart"));
function validateCartBeforeSave(cart) {
    try {
        let isValid = true;
        let message = [];
        //TODO refactor logic because cart can be empty
        /* if (!arrayIsNotEmpty(cart.pixelIds)) {
          isValid = false;
          message.push("O carrinho está vazio");
        } */
        return { isValid, message: JSON.stringify(message) };
    }
    catch (e) {
        return {
            isValid: false,
            message: "Erro genérico no objeto do carrinho. Verifique se todos os campos estão preenchidos",
        };
    }
}
exports.validateCartBeforeSave = validateCartBeforeSave;
class CartController {
    list(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
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
                const carts = yield Cart_1.default.find();
                return res.status(200).json({
                    status: ResponseDefault_1.ResponseStatus.OK,
                    message: "Carrinhos(s) encontrado(s).",
                    payload: carts,
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
    getByUserId(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
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
                if (req.params.userId && req.params.sortitionId) {
                    const cart = yield Cart_1.default.findOne({ userId: req.params.userId });
                    if (cart) {
                        if (`${cart.sortitionId}` === req.params.sortitionId) {
                            return res.status(200).json({
                                status: ResponseDefault_1.ResponseStatus.OK,
                                message: "Carrinho encontrado",
                                payload: cart,
                            });
                        }
                        else {
                            const newCart = {
                                sortitionId: req.params.sortitionId,
                                pixels: [],
                                userId: cart.userId,
                            };
                            yield Cart_1.default.findByIdAndRemove({ _id: cart._id });
                            const createdCart = yield Cart_1.default.create(newCart);
                            return res.status(200).json({
                                status: ResponseDefault_1.ResponseStatus.OK,
                                message: "Carrinho encontrado",
                                payload: createdCart,
                            });
                        }
                    }
                }
                return res.status(404).json({
                    status: ResponseDefault_1.ResponseStatus.NOT_FOUND,
                    message: "Carrinho não encontrado",
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
    create(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
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
                    const cart = yield Cart_1.default.create(req.body);
                    return res.status(201).json({
                        status: ResponseDefault_1.ResponseStatus.OK,
                        message: "Carrinho criado com sucesso.",
                        payload: cart,
                    });
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
    updateById(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
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
                    const cart = yield Cart_1.default.findByIdAndUpdate({ _id: req.params.id }, req.body);
                    if (cart)
                        return res.status(200).json({
                            status: ResponseDefault_1.ResponseStatus.OK,
                            message: "Carrinho atualizado com sucesso.",
                        });
                    else
                        return res.status(404).json({
                            status: ResponseDefault_1.ResponseStatus.NOT_FOUND,
                            message: "Carrinho não encontrado.",
                        });
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
    deleteById(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
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
                const cart = yield Cart_1.default.findByIdAndRemove({ _id: req.params.id });
                if (cart)
                    return res.status(200).json({
                        status: ResponseDefault_1.ResponseStatus.OK,
                        message: "Carrinho deletado com sucesso encontrado.",
                    });
                else
                    return res.status(404).json({
                        status: ResponseDefault_1.ResponseStatus.NOT_FOUND,
                        message: "Carrinho não encontrado.",
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
exports.default = CartController;
