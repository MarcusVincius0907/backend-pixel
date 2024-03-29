import mongoose from "mongoose";

const CardsSchema = new mongoose.Schema({
  cardNumber: String,
  cardName: String,
  expirationDate: String,
});

const BankInfoSheme = new mongoose.Schema({
  bankName: String,
  agency: String,
  account: String,
});

const PaymentInfoSchema = new mongoose.Schema({
  cards: {
    type: [CardsSchema],
  },
});

const ReceiveInfoScheme = new mongoose.Schema({
  nickname: String,
  bankInfo: BankInfoSheme,
  pixKey: String,
  type: String,
});

const AddressScheme = new mongoose.Schema({
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

const UserSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },

  email: {
    type: String,
    unique: true, //nao permite valor repitido
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

export interface User {
  name: string;
  email: string;
  cpf: string;
  cell: string;
  birthDate: string;
  saldo?: number;
  paymentInfo?: PaymentInfo;
  receiveInfo?: ReceiveInfo;
  addressInfo: AddressInfo;
  accessType: AccessType;
}

export interface PaymentInfo {
  cards: Array<Card>;
}

interface Card {
  cardNumber: string;
  cardName: string;
  expirationDate: string;
}

export interface ReceiveInfo {
  nickname: string;
  bankInfo?: BankInfo;
  pixKey?: string;
  type: ReceiveInfoType;
}
interface BankInfo {
  bankName: string;
  agency: string;
  account: string;
}

export interface AddressInfo {
  zipcode: string;
  street: string;
  number?: string;
  district: string;
  city: string;
  state: string;
  complement?: string;
}

export enum ReceiveInfoType {
  BANK_TYPE = "BANK_TYPE",
  PIX_TYPE = "PIX_TYPE",
}

export type AccessType = "admin" | "common";

export default mongoose.model("User", UserSchema);
