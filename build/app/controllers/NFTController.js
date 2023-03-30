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
exports.createNFT = exports.calculateNFTMeasurements = exports.calculatePixelsQuantity = exports.validateNFTBeforeSave = void 0;
const ResponseDefault_1 = require("../models/ResponseDefault");
const NFT_1 = __importStar(require("../models/NFT"));
const validators_1 = require("../utils/validators");
const uuid_1 = require("uuid");
const AVAILABLE_CHUNKS = 8;
const VERTICAL_CHUNK_QUANTITY = 3;
function validateNFTBeforeSave(nft) {
    try {
        let isValid = true;
        let message = [];
        if (!(0, validators_1.required)(nft.name)) {
            isValid = false;
            message.push("Nome é requerido");
        }
        if (!(0, validators_1.required)(nft.pixelQuantity)) {
            isValid = false;
            message.push("Quantidade de pixel é requerido");
        }
        if (nft.pixelQuantity < 10) {
            isValid = false;
            message.push("Quantidade de Pixels indisponível");
        }
        if (!(0, validators_1.required)(nft.themes)) {
            isValid = false;
            message.push("Tema é requerido");
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
exports.validateNFTBeforeSave = validateNFTBeforeSave;
/**
 * It calculates pixels quantity based on chunkSide
 * @param chunkSize -> the NFT is divided in 8 chunks. The chunkSide will define the pixelQuantity
 * @returns the pixel quantity
 */
function calculatePixelsQuantity(chunkSize = 12) {
    const pixelsQuantity = chunkSize * chunkSize * AVAILABLE_CHUNKS; //for default value 1152
    return pixelsQuantity;
}
exports.calculatePixelsQuantity = calculatePixelsQuantity;
/**
 * It calculates NFT width and chunk width, to fit in the screen
 * @param chunkSize -> the NFT is divided in 9 chunks. The chunkSide will define the pixelQuantity
 * @param divElementSize -> size of each div pixel to format the NFT in the screen
 * @returns object with NFT masurements
 */
function calculateNFTMeasurements(chunkSize = 12, divElementSize = 20) {
    const NFTWidth = chunkSize * VERTICAL_CHUNK_QUANTITY * divElementSize; // for default 720px
    const chunkWidth = chunkSize * divElementSize; // for default 240px
    return {
        NFTWidth,
        chunkWidth,
    };
}
exports.calculateNFTMeasurements = calculateNFTMeasurements;
function createNFT(chunkSize) {
    var _a;
    if (chunkSize < 10)
        return null;
    //const pixelsQuantity = calculatePixelsQuantity(chunkSize);
    const nft = {
        chunkSize,
        chunks: [],
    };
    for (let i = 0; i < AVAILABLE_CHUNKS; i++) {
        const pixelsPerChunk = chunkSize * chunkSize;
        const chunk = {
            pixels: [],
            position: i,
        };
        for (let j = 0; j < pixelsPerChunk; j++) {
            chunk.pixels.push({
                uuid: (0, uuid_1.v4)(),
                color: "#FFFFFF",
                isAvailible: true,
                position: j,
                chunkPosition: i,
            });
        }
        (_a = nft.chunks) === null || _a === void 0 ? void 0 : _a.push(chunk);
    }
    return nft;
}
exports.createNFT = createNFT;
class NFTController {
    list(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
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
                const nfts = yield NFT_1.NFTSummary.find();
                return res.status(200).json({
                    status: ResponseDefault_1.ResponseStatus.OK,
                    message: "NFT(s) encontrado(s).",
                    payload: nfts,
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
    //TODO create a test for this method
    listNFTSummaryId(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
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
                const nft_sortition = yield NFT_1.NFTSummary.aggregate([
                    {
                        $lookup: {
                            from: "sortitions",
                            localField: "_id",
                            foreignField: "idNFTSummary",
                            as: "nft_sortition",
                        },
                    },
                ]);
                const nfts = nft_sortition.map((nft) => ({
                    name: nft.name,
                    id: nft._id,
                    vinculated: nft.nft_sortition.length > 0,
                }));
                return res.status(200).json({
                    status: ResponseDefault_1.ResponseStatus.OK,
                    message: "NFT(s) encontrado(s).",
                    payload: nfts,
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
    //TODO create a test for this method
    /**
     * It will return the initial info for rendering NFT.
     * @param req.body.id -> NFTSummary id that contains chunkSize
     * @returns object with NFT masurements
     */
    getNFTMeasurements(req, res) {
        var _a;
        return __awaiter(this, void 0, void 0, function* () {
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
                    const nftSummary = yield NFT_1.NFTSummary.findOne({ _id: req.params.id });
                    if (nftSummary) {
                        const nft = yield NFT_1.default.findOne({ _id: nftSummary.idNFT });
                        if (nft) {
                            const nftMeasurements = calculateNFTMeasurements(nftSummary === null || nftSummary === void 0 ? void 0 : nftSummary.pixelQuantity, ((_a = req.params) === null || _a === void 0 ? void 0 : _a.pixelSize) ? Number(req.params.pixelSize) : undefined);
                            nftMeasurements.nft = nft;
                            nftMeasurements.themes = nftSummary.themes;
                            return res.status(200).json({
                                status: ResponseDefault_1.ResponseStatus.OK,
                                message: "Dados encontrados",
                                payload: nftMeasurements,
                            });
                        }
                    }
                }
                return res.status(404).json({
                    status: ResponseDefault_1.ResponseStatus.NOT_FOUND,
                    message: "NFT id não encontrado",
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
                const nft = yield NFT_1.NFTSummary.findOne({ _id: req.params.id });
                if (nft)
                    return res.status(200).json({
                        status: ResponseDefault_1.ResponseStatus.OK,
                        message: "NFT encontrado.",
                        payload: nft,
                    });
                else
                    return res.status(404).json({
                        status: ResponseDefault_1.ResponseStatus.NOT_FOUND,
                        message: "NFT não encontrado.",
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
                const nFTSumReq = req.body;
                if (validation.isValid) {
                    //create object structure
                    const newNFT = createNFT(nFTSumReq.pixelQuantity);
                    //create in DB
                    const nft = yield NFT_1.default.create(newNFT);
                    nFTSumReq.idNFT = nft._id;
                    const nftSum = yield NFT_1.NFTSummary.create(nFTSumReq);
                    return res.status(201).json({
                        status: ResponseDefault_1.ResponseStatus.OK,
                        message: "Sorteio criado com sucesso.",
                        payload: nftSum,
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
                const nFTSumReq = req.body;
                if (validation.isValid) {
                    const nftSum = yield NFT_1.NFTSummary.findOne({ _id: req.params.id });
                    if (nftSum) {
                        //if pixel quantity has changed, we'll have to delete nft and create another
                        if (nftSum.pixelQuantity != nFTSumReq.pixelQuantity) {
                            yield NFT_1.default.findByIdAndRemove({ _id: nftSum.idNFT });
                            const newNFT = createNFT(nFTSumReq.pixelQuantity);
                            const nft = yield NFT_1.default.create(newNFT);
                            nFTSumReq.idNFT = nft.id;
                        }
                        yield NFT_1.NFTSummary.findByIdAndUpdate({ _id: req.params.id }, nFTSumReq);
                        return res.status(200).json({
                            status: ResponseDefault_1.ResponseStatus.OK,
                            message: "NFT atualizado com sucesso.",
                        });
                    }
                    else
                        return res.status(404).json({
                            status: ResponseDefault_1.ResponseStatus.NOT_FOUND,
                            message: "NFT não encontrado.",
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
                const nftSum = yield NFT_1.NFTSummary.findOne({ _id: req.params.id });
                if (nftSum)
                    yield NFT_1.default.findByIdAndRemove({ _id: nftSum.idNFT });
                else {
                    return res.status(404).json({
                        status: ResponseDefault_1.ResponseStatus.NOT_FOUND,
                        message: "NFT não encontrado.",
                    });
                }
                nftSum.remove();
                return res.status(200).json({
                    status: ResponseDefault_1.ResponseStatus.OK,
                    message: "NFT deletado com sucesso encontrado.",
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
exports.default = NFTController;
