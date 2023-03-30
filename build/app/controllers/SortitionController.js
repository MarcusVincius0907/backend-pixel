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
exports.validateSortitionBeforeSave = void 0;
const ResponseDefault_1 = require("../models/ResponseDefault");
const Sortition_1 = __importDefault(require("../models/Sortition"));
const validators_1 = require("../utils/validators");
function validateSortitionBeforeSave(sortition) {
    try {
        let isValid = true;
        let message = [];
        if (!(0, validators_1.required)(sortition.name)) {
            isValid = false;
            message.push("Nome é requerido");
        }
        if (!(0, validators_1.required)(sortition.date) || !(0, validators_1.isValidDate)(sortition.date, true)) {
            isValid = false;
            message.push("Data inválida");
        }
        if (!(0, validators_1.required)(sortition.reward)) {
            isValid = false;
            message.push("Premiação é requerido");
        }
        if (!(0, validators_1.required)(sortition.idNFTSummary)) {
            isValid = false;
            message.push("id do NFT é requerido");
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
exports.validateSortitionBeforeSave = validateSortitionBeforeSave;
class SortitionController {
    list(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
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
                const sortition = yield Sortition_1.default.find();
                return res.status(200).json({
                    status: ResponseDefault_1.ResponseStatus.OK,
                    message: "Sorteio(s) encontrado(s).",
                    payload: sortition,
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
    //TODO create a test for this
    getById(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
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
                const sortition = yield Sortition_1.default.findOne({ _id: req.params.id });
                return res.status(200).json({
                    status: ResponseDefault_1.ResponseStatus.OK,
                    message: "Sorteio(s) encontrado(s).",
                    payload: sortition,
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
                    const sortition = yield Sortition_1.default.create(req.body);
                    return res.status(201).json({
                        status: ResponseDefault_1.ResponseStatus.OK,
                        message: "Sorteio criado com sucesso.",
                        payload: sortition,
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
                    const sortition = yield Sortition_1.default.findByIdAndUpdate({ _id: req.params.id }, req.body);
                    if (sortition)
                        return res.status(200).json({
                            status: ResponseDefault_1.ResponseStatus.OK,
                            message: "Sorteio atualizado com sucesso.",
                        });
                    else
                        return res.status(404).json({
                            status: ResponseDefault_1.ResponseStatus.NOT_FOUND,
                            message: "Sorteio não encontrado.",
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
                const sortition = yield Sortition_1.default.findByIdAndRemove({
                    _id: req.params.id,
                });
                if (sortition)
                    return res.status(200).json({
                        status: ResponseDefault_1.ResponseStatus.OK,
                        message: "Sorteio deletado com sucesso encontrado.",
                    });
                else
                    return res.status(404).json({
                        status: ResponseDefault_1.ResponseStatus.NOT_FOUND,
                        message: "Sorteio não encontrado.",
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
exports.default = SortitionController;
