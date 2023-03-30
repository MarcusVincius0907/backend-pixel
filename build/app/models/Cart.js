"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const NFT_1 = require("./NFT");
const CartSchema = new mongoose_1.default.Schema({
    pixels: [NFT_1.PixelSchema],
    userId: mongoose_1.default.Schema.Types.ObjectId,
    sortitionId: mongoose_1.default.Schema.Types.ObjectId,
    createdAt: {
        type: Date,
        default: Date.now,
    },
});
exports.default = mongoose_1.default.model("Cart", CartSchema);
