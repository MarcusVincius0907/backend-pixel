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
exports.validateUserBeforeSave = void 0;
const ResponseDefault_1 = require("../models/ResponseDefault");
const User_1 = __importDefault(require("../models/User"));
const getAddressByZipcode_1 = __importDefault(require("../utils/getAddressByZipcode"));
const validators_1 = require("../utils/validators");
function validateUserBeforeSave(user) {
    try {
        let isValid = true;
        let message = [];
        //valida email
        if (!(0, validators_1.validateEmail)(user.email)) {
            isValid = false;
            message.push("Endereço de email inválido");
        }
        //valida nome
        if (!(0, validators_1.required)(user.name)) {
            isValid = false;
            message.push("Nome inválido");
        }
        //valida cpf
        if (!(0, validators_1.validateCPF)(user.cpf)) {
            isValid = false;
            message.push("CPF inválido");
        }
        //valida cell
        if (!(0, validators_1.maxLength)(user.cell, 13) || !(0, validators_1.minLength)(user.cell, 11)) {
            isValid = false;
            message.push("Número de telefone inválido.");
        }
        //valida data de nascimento
        if (!(0, validators_1.validateBirthDate)(user.birthDate)) {
            isValid = false;
            message.push("Data inválida ou menor de idade.");
        }
        //valida informações de endereço
        if (user.addressInfo) {
            if (!(0, validators_1.validateAddressInfo)(user.addressInfo)) {
                isValid = false;
                message.push("Informações de endereço inválidas.");
            }
        }
        //valida informações de pagamento
        if (user.paymentInfo) {
            //valida paymentInfo
            if (!(0, validators_1.validatePaymentInfo)(user.paymentInfo)) {
                isValid = false;
                message.push("Infomações de pagamento inválidas.");
            }
        }
        //valida informações de recebimento
        if (user.receiveInfo) {
            //valida receiveInfo
            if (!(0, validators_1.validateReceiveInfo)(user.receiveInfo)) {
                isValid = false;
                message.push("Infomações de recebimento inválidas.");
            }
        }
        return { isValid, message: JSON.stringify(message) };
    }
    catch (e) {
        return {
            isValid: false,
            message: "Erro genérico no objeto do usuário. Verifique se todos os campos estão preenchidos",
        };
    }
}
exports.validateUserBeforeSave = validateUserBeforeSave;
class UserController {
    list(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            // #swagger.tags = ['Users']
            // #swagger.summary = 'Listar todos os usuários'
            // #swagger.security = [{"bearerAuth": []}]
            /* #swagger.responses[200] = {
                    description: "Usuário encontrado.",
                    content: {
                        "application/json": {
                            schema:{
                              type: "array",
                              items:{
                                type: "object",
                                $ref: "#/components/schemas/User"
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
                const users = yield User_1.default.find();
                return res.status(200).json({
                    status: ResponseDefault_1.ResponseStatus.OK,
                    message: "Usuário encontrado.",
                    payload: users,
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
    findById(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            // #swagger.tags = ['Users']
            // #swagger.summary = 'Obter um usuário pelo id'
            // #swagger.security = [{"bearerAuth": []}]
            /* #swagger.responses[200] = {
                    description: "Usuário encontrado.",
                    content: {
                        "application/json": {
                            schema:{
                              type: "object",
                              $ref: "#/components/schemas/User"
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
                const user = yield User_1.default.findOne({ _id: req.params.id });
                if (user)
                    return res.status(200).json({
                        status: ResponseDefault_1.ResponseStatus.OK,
                        message: "Usuário encontrado.",
                        payload: user,
                    });
                else
                    return res.status(404).json({
                        status: ResponseDefault_1.ResponseStatus.NOT_FOUND,
                        message: "Usuário não encontrado.",
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
    //TODO create test for this method
    findByEmail(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            // #swagger.tags = ['Users']
            // #swagger.summary = 'Obter um usuário pelo email'
            // #swagger.security = [{"bearerAuth": []}]
            /* #swagger.requestBody = {
                      required: true,
                      content: {
                          "application/json": {
                              schema: { $ref: "#/components/schemas/FindByEmail" },
                              examples: {
                                  User: { $ref: "#/components/examples/FindByEmail" }
                              }
                          }
                      }
                  }
                */
            /* #swagger.responses[200] = {
                    description: "Usuário encontrado.",
                    content: {
                        "application/json": {
                            schema:{
                              type: "object",
                              $ref: "#/components/schemas/User"
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
                const user = yield User_1.default.findOne({ email: req.body.email });
                if (user)
                    return res.status(200).json({
                        status: ResponseDefault_1.ResponseStatus.OK,
                        message: "Usuário encontrado.",
                        payload: user,
                    });
                else
                    return res.status(404).json({
                        status: ResponseDefault_1.ResponseStatus.NOT_FOUND,
                        message: "Usuário não encontrado.",
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
    //TODO update test for this
    create(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            // #swagger.tags = ['Users']
            // #swagger.summary = 'Criar um usuário'
            // #swagger.security = [{"bearerAuth": []}]
            /* #swagger.requestBody = {
                      required: true,
                      content: {
                          "application/json": {
                              schema: { $ref: "#/components/schemas/User" },
                              examples: {
                                  User: { $ref: "#/components/examples/User" }
                              }
                          }
                      }
                  }
                */
            /* #swagger.responses[201] = {
                    description: "Usuário criado com sucesso.",
                    content: {
                        "application/json": {
                            schema:{
                              type: "object",
                              $ref: "#/components/schemas/User"
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
                if (yield User_1.default.findOne({
                    $or: [
                        { email: req.body.email },
                        { cpf: req.body.cpf },
                        { cell: req.body.cell },
                    ],
                }))
                    return res.status(422).json({
                        status: ResponseDefault_1.ResponseStatus.INVALID_INFO,
                        message: "Email já cadastrado.",
                    });
                const validation = validateUserBeforeSave(req.body);
                if (validation.isValid) {
                    req.body.accessType = "common";
                    const user = yield User_1.default.create(req.body);
                    return res.status(201).json({
                        status: ResponseDefault_1.ResponseStatus.OK,
                        message: "Usuário criado com sucesso.",
                        payload: user,
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
            // #swagger.tags = ['Users']
            // #swagger.summary = 'Atualizar um usuário pelo id'
            // #swagger.security = [{"bearerAuth": []}]
            /* #swagger.requestBody = {
                      required: true,
                      content: {
                          "application/json": {
                              schema: { $ref: "#/components/schemas/User" },
                              examples: {
                                  User: { $ref: "#/components/examples/User" }
                              }
                          }
                      }
                  }
                */
            /* #swagger.responses[200] = {
                    description: "Usuário atualizado com sucesso.",
                }
            */
            /* #swagger.responses[401] = {
                        description: "Requisição não autorizada.",
                    }
                */
            try {
                const validation = validateUserBeforeSave(req.body);
                if (validation.isValid) {
                    delete req.body.accessType;
                    const user = yield User_1.default.findByIdAndUpdate({ _id: req.params.id }, req.body);
                    if (user)
                        return res.status(200).json({
                            status: ResponseDefault_1.ResponseStatus.OK,
                            message: "Usuário atualizado com sucesso.",
                        });
                    else
                        return res.status(404).json({
                            status: ResponseDefault_1.ResponseStatus.ERROR,
                            message: "Usuário não encontrado.",
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
            // #swagger.tags = ['Users']
            // #swagger.summary = 'Deletar um usuário pelo id'
            // #swagger.security = [{"bearerAuth": []}]
            /* #swagger.responses[200] = {
                    description: "Usuário deletado com sucesso.",
                }
            */
            /* #swagger.responses[401] = {
                        description: "Requisição não autorizada.",
                    }
                */
            try {
                const user = yield User_1.default.findByIdAndRemove({ _id: req.params.id });
                if (user)
                    return res.status(200).json({
                        status: ResponseDefault_1.ResponseStatus.OK,
                        message: "Usuário deletado com sucesso.",
                    });
                else
                    return res.status(404).json({
                        status: ResponseDefault_1.ResponseStatus.OK,
                        message: "Usuário não encontrado.",
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
    consultZipcode(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            // #swagger.tags = ['Users']
            // #swagger.summary = 'Consultar endereço'
            // #swagger.security = [{"bearerAuth": []}]
            /* #swagger.responses[200] = {
                    description: "Endereço encontrado.",
                    content: {
                      "application/json": {
                            schema:{
                              type: "object",
                              $ref: "#/components/schemas/AddressInfo"
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
                if (!req.params.zipcode)
                    throw "Formato do CEP não identificado";
                const address = yield (0, getAddressByZipcode_1.default)(req.params.zipcode);
                if (!address) {
                    throw "Não foi possível consultar o CEP";
                }
                return res.status(200).json({
                    status: ResponseDefault_1.ResponseStatus.OK,
                    message: "Endereço encontrado.",
                    payload: address,
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
exports.default = UserController;
