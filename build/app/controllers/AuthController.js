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
const axios_1 = __importDefault(require("axios"));
const auth0_config_1 = __importDefault(require("../../auth0.config"));
const ResponseDefault_1 = require("../models/ResponseDefault");
function getTokenAuth0() {
    return __awaiter(this, void 0, void 0, function* () {
        let options = {
            url: 'https://dev-2glokavh.us.auth0.com/oauth/token',
            headers: { 'content-type': 'application/json' },
            body: auth0_config_1.default
        };
        return axios_1.default
            .post(options.url, options.body)
            .then(res => {
            return `${res.data.access_token}`;
        })
            .catch(err => {
            return '';
        });
    });
}
//TODO remove this when the system is complete. Then the dev will need to get the token from FE
class AuthController {
    getToken(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            // #swagger.tags = ['Auth']
            // #swagger.summary = 'Obter token'
            /*
            #swagger.responses[200] = {
                description: 'Token encontrado',
                content: {
                  "application/json": {
                    schema: { type: 'string' },
                  }
                }
            }
          */
            /*
            #swagger.responses[500] = {
                   description: "Erro no servidor"
               }
            */
            try {
                const token = yield getTokenAuth0();
                return res.status(200).json({ status: ResponseDefault_1.ResponseStatus.OK, message: 'Token encontrado', payload: token });
            }
            catch (e) {
                return res.status(500).json({ status: ResponseDefault_1.ResponseStatus.ERROR, message: JSON.stringify(e) });
            }
        });
    }
}
exports.default = AuthController;
