"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const NFT_1 = require("./NFT");
const OrderItemSchema = new mongoose_1.default.Schema({
    sortitionId: mongoose_1.default.Schema.Types.ObjectId,
    pixels: [NFT_1.PixelSchema],
    createdAt: {
        type: Date,
        default: Date.now,
    },
});
const OrderSchema = new mongoose_1.default.Schema({
    userId: mongoose_1.default.Schema.Types.ObjectId,
    paymentId: mongoose_1.default.Schema.Types.ObjectId,
    orderItem: OrderItemSchema,
    createdAt: {
        type: Date,
        default: Date.now,
    },
});
exports.default = mongoose_1.default.model("Order", OrderSchema);
