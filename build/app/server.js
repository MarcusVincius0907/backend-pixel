"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const index_1 = __importDefault(require("./index"));
const API_PORT = process.env.API_PORT || 3000;
index_1.default.listen(API_PORT, () => {
    console.log(`Listening at http://localhost:${API_PORT}`);
});
