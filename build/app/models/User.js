"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ReceiveInfoType = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const CardsSchema = new mongoose_1.default.Schema({
    cardNumber: String,
    cardName: String,
    expirationDate: String,
});
const BankInfoSheme = new mongoose_1.default.Schema({
    bankName: String,
    agency: String,
    account: String,
});
const PaymentInfoSchema = new mongoose_1.default.Schema({
    cards: {
        type: [CardsSchema],
    },
});
const ReceiveInfoScheme = new mongoose_1.default.Schema({
    nickname: String,
    bankInfo: BankInfoSheme,
    pixKey: String,
    type: String,
});
const AddressScheme = new mongoose_1.default.Schema({
    zipcode: {
        type: String,
        required: true,
    },
    street: {
        type: String,
        required: true,
    },
    number: {
        type: String,
        required: true,
    },
    district: {
        type: String,
        required: true,
    },
    city: {
        type: String,
        required: true,
    },
    state: {
        type: String,
        required: true,
    },
    complement: String,
});
const UserSchema = new mongoose_1.default.Schema({
    name: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        unique: true,
        required: true,
        lowercase: true,
    },
    cpf: {
        type: String,
        unique: true,
        required: true,
    },
    cell: {
        type: String,
        unique: true,
        required: true,
    },
    birthDate: {
        type: Date,
        required: true,
    },
    saldo: {
        type: Number,
    },
    paymentInfo: {
        type: PaymentInfoSchema,
    },
    receiveInfo: {
        type: ReceiveInfoScheme,
    },
    addressInfo: {
        type: AddressScheme,
        required: true,
    },
    accessType: {
        type: String,
        enum: ["admin", "common"],
        default: "common",
    },
    createdAt: {
        type: Date,
        default: Date.now,
    },
});
var ReceiveInfoType;
(function (ReceiveInfoType) {
    ReceiveInfoType["BANK_TYPE"] = "BANK_TYPE";
    ReceiveInfoType["PIX_TYPE"] = "PIX_TYPE";
})(ReceiveInfoType = exports.ReceiveInfoType || (exports.ReceiveInfoType = {}));
exports.default = mongoose_1.default.model("User", UserSchema);
