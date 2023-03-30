"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.PaymentStatus = exports.PaymentMethods = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const PaymentSchema = new mongoose_1.default.Schema({
    userId: mongoose_1.default.Schema.Types.ObjectId,
    amount: mongoose_1.default.Schema.Types.Decimal128,
    paymentMethod: String,
    status: String,
    createdAt: {
        type: Date,
        default: Date.now
    }
});
var PaymentMethods;
(function (PaymentMethods) {
    PaymentMethods["CREDIT_CARD"] = "CREDIT_CARD";
    PaymentMethods["PIX"] = "PIX";
    //Boleto
    PaymentMethods["PAYMENT_SLIP"] = "PAYMENT_SLIP";
})(PaymentMethods = exports.PaymentMethods || (exports.PaymentMethods = {}));
var PaymentStatus;
(function (PaymentStatus) {
    PaymentStatus["PENDING"] = "PENDING";
    PaymentStatus["PAID"] = "PAID";
    PaymentStatus["CANCELED"] = "CANCELED";
})(PaymentStatus = exports.PaymentStatus || (exports.PaymentStatus = {}));
exports.default = mongoose_1.default.model("Payment", PaymentSchema);
