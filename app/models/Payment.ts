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
  creditCard = 'creditCard',
  pix = 'pix',
  //Boleto
  paymentSlip = 'paymentSlip'
}

export enum PaymentStatus {
  pending = 'pending' ,
  paid = 'paid',
  canceled = 'canceled' ,
}

export default mongoose.model("Payment", PaymentSchema); 