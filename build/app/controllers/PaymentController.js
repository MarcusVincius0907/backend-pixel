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
Object.defineProperty(exports, "__esModule", { value: true });
exports.validatePaymentBeforeSave = void 0;
const ResponseDefault_1 = require("../models/ResponseDefault");
const Payment_1 = __importStar(require("../models/Payment"));
const validators_1 = require("../utils/validators");
function validatePaymentBeforeSave(payment) {
    try {
        let isValid = true;
        let message = [];
        //we're not validating amount for now
        if (!(0, validators_1.required)(payment.userId)) {
            isValid = false;
            message.push('O id do usuário é inválido');
        }
        if (!(0, validators_1.validateEnum)(payment.status, Payment_1.PaymentStatus)) {
            isValid = false;
            message.push('O status é inválido');
        }
        if (!(0, validators_1.validateEnum)(payment.paymentMethod, Payment_1.PaymentMethods)) {
            isValid = false;
            message.push('O metodo de pagamento é inválido');
        }
        return { isValid, message: JSON.stringify(message) };
    }
    catch (e) {
        return { isValid: false, message: 'Erro genérico no objeto do pagamento. Verifique se todos os campos estão preenchidos' };
    }
}
exports.validatePaymentBeforeSave = validatePaymentBeforeSave;
class PaymentController {
    list(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
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
            try {
                const payments = yield Payment_1.default.find();
                return res.status(200).json({ status: ResponseDefault_1.ResponseStatus.OK, message: 'Pagamento(s) encontrado(s).', payload: payments });
            }
            catch (e) {
                return res.status(500).json({ status: ResponseDefault_1.ResponseStatus.ERROR, message: JSON.stringify(e) });
            }
        });
    }
    create(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
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
            try {
                const validation = validatePaymentBeforeSave(req.body);
                if (validation.isValid) {
                    const payment = yield Payment_1.default.create(req.body);
                    return res.status(201).json({ status: ResponseDefault_1.ResponseStatus.OK, message: 'Pagamento criado com sucesso.', payload: payment });
                }
                else {
                    return res.status(422).json({ status: ResponseDefault_1.ResponseStatus.INVALID_INFO, message: validation.message });
                }
            }
            catch (e) {
                return res.status(500).json({ status: ResponseDefault_1.ResponseStatus.ERROR, message: JSON.stringify(e) });
            }
        });
    }
    updateById(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
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
            try {
                const validation = validatePaymentBeforeSave(req.body);
                if (validation.isValid) {
                    const payment = yield Payment_1.default.findByIdAndUpdate({ _id: req.params.id }, req.body);
                    if (payment)
                        return res.status(200).json({ status: ResponseDefault_1.ResponseStatus.OK, message: 'Pagamento atualizado com sucesso.' });
                    else
                        return res.status(404).json({ status: ResponseDefault_1.ResponseStatus.NOT_FOUND, message: 'Pagamento não encontrado.' });
                }
                else {
                    return res.status(422).json({ status: ResponseDefault_1.ResponseStatus.INVALID_INFO, message: validation.message });
                }
            }
            catch (e) {
                return res.status(500).json({ status: ResponseDefault_1.ResponseStatus.ERROR, message: JSON.stringify(e) });
            }
        });
    }
    deleteById(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
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
            try {
                const payment = yield Payment_1.default.findByIdAndRemove({ _id: req.params.id });
                if (payment)
                    return res.status(200).json({ status: ResponseDefault_1.ResponseStatus.OK, message: 'Pagamento deletado com sucesso encontrado.' });
                else
                    return res.status(404).json({ status: ResponseDefault_1.ResponseStatus.NOT_FOUND, message: 'Pagamento não encontrado.' });
            }
            catch (e) {
                return res.status(500).json({ status: ResponseDefault_1.ResponseStatus.ERROR, message: JSON.stringify(e) });
            }
        });
    }
}
exports.default = PaymentController;
