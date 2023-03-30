"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.PixelSchema = exports.NFTSummary = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const PixelSchema = new mongoose_1.default.Schema({
    uuid: {
        required: true,
        type: String,
    },
    color: {
        required: true,
        type: String,
    },
    position: {
        required: true,
        type: Number,
    },
    chunkPosition: {
        required: true,
        type: Number,
    },
    isAvailible: Boolean,
});
exports.PixelSchema = PixelSchema;
const ChunkSchema = new mongoose_1.default.Schema({
    pixels: {
        required: true,
        type: [PixelSchema],
    },
    position: {
        required: true,
        type: Number,
    },
});
const NFTSchema = new mongoose_1.default.Schema({
    chunks: {
        required: true,
        type: [ChunkSchema],
    },
    createdAt: {
        type: Date,
        default: Date.now,
    },
});
const NFTSummarySchema = new mongoose_1.default.Schema({
    name: {
        required: true,
        type: String,
    },
    themes: {
        required: true,
        type: String,
    },
    idNFT: {
        required: true,
        type: mongoose_1.default.Schema.Types.ObjectId,
    },
    pixelQuantity: {
        required: true,
        type: Number,
    },
    createdAt: {
        type: Date,
        default: Date.now,
    },
});
const NFTSummary = mongoose_1.default.model("NFTSummary", NFTSummarySchema);
exports.NFTSummary = NFTSummary;
exports.default = mongoose_1.default.model("NFT", NFTSchema);
