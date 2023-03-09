import mongoose from "mongoose";

const PaymentSchema = new mongoose.Schema({
  userId: mongoose.Schema.Types.ObjectId,
  amount: mongoose.Schema.Types.Decimal128,
  paymentMethod: String,
  status: String,
  createdAt: {
    type: Date,
    default: Date.now
  }
});

export interface IPayment{
  _id?: string;
  userId: string,
  amount: number,
  paymentMethod: PaymentMethods,
  status: PaymentStatus,
}

export enum PaymentMethods {
  CREDIT_CARD = 'CREDIT_CARD',
  PIX = 'PIX',
  //Boleto
  PAYMENT_SLIP = 'PAYMENT_SLIP'
}

export enum PaymentStatus {
  PENDING = 'PENDING' ,
  PAID = 'PAID',
  CANCELED = 'CANCELED' ,
}

export default mongoose.model("Payment", PaymentSchema); 