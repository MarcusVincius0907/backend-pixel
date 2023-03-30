"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const SortitionSchema = new mongoose_1.default.Schema({
    name: String,
    date: Date,
    idNFTSummary: mongoose_1.default.Schema.Types.ObjectId,
    reward: String,
    status: Boolean,
    createdAt: {
        type: Date,
        default: Date.now
    }
});
exports.default = mongoose_1.default.model("Sortition", SortitionSchema);
