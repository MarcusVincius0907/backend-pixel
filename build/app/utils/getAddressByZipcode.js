"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
require("dotenv").config();
const axios_1 = __importDefault(require("axios"));
const regex = /^[0-9]*$/;
function getAddressByZipcode(zipcode) {
    var _a;
    let url = (_a = process.env.VIACEP_URL) !== null && _a !== void 0 ? _a : "https://viacep.com.br/ws/";
    if (!url || !zipcode || !regex.test(zipcode))
        return false;
    let urlSufix = "/json";
    return axios_1.default
        .get(url + zipcode + urlSufix)
        .then((res) => {
        const address = {
            zipcode: res.data.cep.replace("-", ""),
            street: res.data.logradouro,
            district: res.data.bairro,
            city: res.data.localidade,
            state: res.data.uf,
        };
        return address;
    })
        .catch((err) => {
        return false;
    });
}
exports.default = getAddressByZipcode;
