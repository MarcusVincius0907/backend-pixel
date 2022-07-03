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
  cards:{
    type: [CardsSchema]
  }
});

const ReceiveInfoScheme = new mongoose.Schema({
  nickname: String,
  bankInfo: BankInfoSheme,
  pixKey: String
})

const AddressScheme =  new mongoose.Schema({
  zipcode: String,
  streeet: String,
  number: String,
  district: String,
  city: String,
  estate: String,
  complement: String,
})

const UserSchema = new mongoose.Schema({
    name:{
      type: String,
      required: true,
    },

    email: {
      type: String,
      unique: true, //nao permite valor repitido
      required: true,
      lowercase: true,
    },

    cpf:{
      type: String,
      unique: true,
      required: true
    },

    cell:{
      type: String,
      unique: true,
      required: true
    },

    birthDate:{
      type: Date,
      required: true
    },

    saldo:{
      type: Number
    },

    paymentInfo:{
      type: PaymentInfoSchema,
      required: true,
    },

    receiveInfo: {
      type: ReceiveInfoScheme,
      required:true,
    },

    addressInfo: {
      type: AddressScheme,
      required: true
    },

    createdAt: {
        type: Date,
        default: Date.now
    }
})

export interface User{
  name: string,
  email: string,
  cpf: string,
  cell: string,
  birthDate: string,
  saldo?: number,
  paymentInfo?: PaymentInfo,
  receiveInfo?: ReceiveInfo,
  addressInfo: AddressInfo,
}

export interface PaymentInfo{
  cards: Array<Card>
}

interface Card{
  cardNumber: string,
  cardName: string,
  expirationDate: string,
}

export interface ReceiveInfo{
  nickname: string,
  bankInfo?: BankInfo,
  pixKey?: string,

}
interface BankInfo{
  bankName: string,
  agency: string,
  account: string,
}

export interface AddressInfo{
  zipcode: string,
  street: string,
  number: string,
  district: string,
  city: string,
  estate: string,
  complement: string,
}


export default mongoose.model("User", UserSchema); 