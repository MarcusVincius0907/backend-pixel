import axios from "axios";
import {
  AddressInfo,
  PaymentInfo,
  ReceiveInfo,
  User,
} from "../app/models/User";

import config from "../auth0.config";

export const token = async () => {
  let options = {
    url: "https://dev-2glokavh.us.auth0.com/oauth/token",
    headers: { "content-type": "application/json" },
    body: config,
  };

  return axios
    .post(options.url, options.body)
    .then((res) => {
      return `${res.data.token_type} ${res.data.access_token}`;
    })
    .catch((err) => {
      return "";
    });
};

export const addressInfo: AddressInfo = {
  zipcode: "05717200",
  street: "rua almaden",
  number: "130",
  district: "vila andrade",
  city: "São Paulo",
  state: "sp",
  complement: "edf macapa. 136",
};

export const paymentInfo: PaymentInfo = {
  cards: [
    {
      cardName: "Marcus V Leite",
      cardNumber: "123123123123",
      expirationDate: "05/28",
    },
  ],
};

export const receiveInfo: ReceiveInfo = {
  nickname: "pix nubank",
  pixKey: "asdf@sdf.com",
};

export const user: User = {
  name: "Marcus Vinicius Leite",
  email: "mvleite0908@gmail.com",
  cpf: "52245472888",
  cell: "11958755705",
  birthDate: "2001-07-09",
  addressInfo,
  paymentInfo,
  receiveInfo,
};
