"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const swagger_autogen_1 = __importDefault(require("swagger-autogen"));
const outputFile = "./swagger-output.json";
const endpointsFiles = ["./app/routes.ts"];
const doc = {
    swagger: "3.0.0",
    info: {
        title: "API Pixel",
        description: "API Pixel",
        contact: {
            email: "mvleite0908@gmail.com",
        },
        version: "1.0.0",
    },
    servers: [
        {
            url: "http://localhost:3000/api",
            description: "dev",
        },
    ],
    securityDefinitions: {
        bearerAuth: {
            type: "http",
            scheme: "bearer",
            bearerFormat: "JWT",
        },
    },
    components: {
        "@schemas": {
            User: {
                type: "object",
                properties: {
                    name: {
                        type: "string",
                    },
                    email: {
                        type: "string",
                    },
                    cell: {
                        type: "string",
                    },
                    birthDate: {
                        type: "string",
                    },
                    saldo: {
                        type: "number",
                    },
                    paymentInfo: {
                        type: "object",
                        properties: {
                            cards: {
                                type: "array",
                                items: {
                                    type: "object",
                                    properties: {
                                        cardNumber: {
                                            type: "string",
                                        },
                                        cardName: {
                                            type: "string",
                                        },
                                        expirationDate: {
                                            type: "string",
                                        },
                                    },
                                },
                            },
                        },
                    },
                    receiveInfo: {
                        type: "object",
                        properties: {
                            nickname: {
                                type: "string",
                            },
                            pixKey: {
                                type: "string",
                                required: false,
                            },
                            bankInfo: {
                                type: "object",
                                required: false,
                                properties: {
                                    bankName: {
                                        type: "string",
                                    },
                                    agency: {
                                        type: "string",
                                    },
                                    account: {
                                        type: "string",
                                    },
                                },
                            },
                        },
                    },
                    addressInfo: {
                        type: "object",
                        properties: {
                            zipcode: {
                                type: "string",
                            },
                            street: {
                                type: "string",
                            },
                            number: {
                                type: "string",
                            },
                            district: {
                                type: "string",
                            },
                            city: {
                                type: "string",
                            },
                            state: {
                                type: "string",
                            },
                            complement: {
                                type: "string",
                                required: false,
                            },
                        },
                    },
                },
            },
            AddressInfo: {
                type: "object",
                properties: {
                    zipcode: {
                        type: "string",
                    },
                    street: {
                        type: "string",
                    },
                    number: {
                        type: "string",
                    },
                    district: {
                        type: "string",
                    },
                    city: {
                        type: "string",
                    },
                    state: {
                        type: "string",
                    },
                    complement: {
                        type: "string",
                    },
                },
            },
            Sortition: {
                type: "object",
                properties: {
                    name: {
                        type: "string",
                    },
                    date: {
                        type: "string",
                    },
                    idNFTSummary: {
                        type: "string",
                    },
                    reward: {
                        type: "string",
                    },
                    status: {
                        type: "boolean",
                    },
                },
            },
            NFTSummary: {
                type: "object",
                properties: {
                    name: {
                        required: true,
                        type: "string",
                    },
                    themes: {
                        required: true,
                        type: "string",
                    },
                    idNFT: {
                        type: "string",
                    },
                    pixelQuantity: {
                        required: true,
                        type: "number",
                    },
                },
            },
            FindByEmail: {
                type: "object",
                properties: {
                    email: {
                        type: "string",
                    },
                },
            },
        },
        examples: {
            User: {
                value: {
                    name: "Marcus",
                    email: "mvleite0908@gmail.com",
                    cpf: "52245472888",
                    cell: "11958755705",
                    birthDate: "2001-07-09",
                    addressInfo: {
                        zipcode: "05717200",
                        street: "rua almaden",
                        number: "130",
                        district: "vila andrade",
                        city: "São Paulo",
                        state: "sp",
                        complement: "edf macapa. 136",
                    },
                    paymentInfo: {
                        cards: [
                            {
                                cardName: "Marcus V Leite",
                                cardNumber: "123123123123",
                                expirationDate: "05/28",
                            },
                        ],
                    },
                    receiveInfo: {
                        nickname: "pix nubank",
                        pixKey: "asdf@sdf.com",
                    },
                },
            },
            AddressInfo: {
                value: {
                    zipcode: "05717200",
                    street: "rua almaden",
                    number: "130",
                    district: "vila andrade",
                    city: "São Paulo",
                    state: "sp",
                    complement: "edf macapa. 136",
                },
            },
            Sortition: {
                value: {
                    name: "sortition inverno",
                    date: "2023-01-22",
                    idNFTSummary: "sdfasdf2",
                    reward: "R$ 1000 + NFT",
                    status: true,
                },
            },
            NFTSummary: {
                value: {
                    name: "nft-summary 1",
                    themes: "asdf 3",
                    pixelQuantity: 10,
                },
            },
            FindByEmail: {
                value: {
                    email: "mvleite0908@gmail.com",
                },
            },
        },
    },
};
const options = {
    openapi: "3.0.0", // Enable/Disable OpenAPI. By default is null
};
(0, swagger_autogen_1.default)(options)(outputFile, endpointsFiles, doc);
