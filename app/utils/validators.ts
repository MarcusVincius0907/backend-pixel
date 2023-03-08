import moment from "moment";
import {
  PaymentInfo,
  ReceiveInfo,
  AddressInfo,
  ReceiveInfoType,
} from "../models/User";

export function validateEmail(email: any) {
  return String(email)
    .toLowerCase()
    .match(
      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
    );
}

export function minLength(value: any, size: number) {
  return String(value).length >= size;
}

export function maxLength(value: any, size: number) {
  return String(value).length <= size;
}

export function required(value: any) {
  return !!value;
}

export function validateCPF(cpf: string) {
  cpf = cpf.replace(/[^\d]+/g, "");
  if (cpf == "") return false;
  // Elimina CPFs invalidos conhecidos
  if (
    cpf.length != 11 ||
    cpf == "00000000000" ||
    cpf == "11111111111" ||
    cpf == "22222222222" ||
    cpf == "33333333333" ||
    cpf == "44444444444" ||
    cpf == "55555555555" ||
    cpf == "66666666666" ||
    cpf == "77777777777" ||
    cpf == "88888888888" ||
    cpf == "99999999999"
  )
    return false;
  // Valida 1o digito
  let add = 0;
  for (let i = 0; i < 9; i++) add += parseInt(cpf.charAt(i)) * (10 - i);
  let rev = 11 - (add % 11);
  if (rev == 10 || rev == 11) rev = 0;
  if (rev != parseInt(cpf.charAt(9))) return false;
  // Valida 2o digito
  add = 0;
  for (let i = 0; i < 10; i++) add += parseInt(cpf.charAt(i)) * (11 - i);
  rev = 11 - (add % 11);
  if (rev == 10 || rev == 11) rev = 0;
  if (rev != parseInt(cpf.charAt(10))) return false;
  return true;
}

export function validateBirthDate(value: string) {
  var eighteenYearsAgo = moment().subtract(18, "years");
  var birthday = moment(value);

  if (!birthday.isValid()) {
    return false;
  } else if (eighteenYearsAgo.isAfter(birthday)) {
    return true;
  } else {
    return false;
  }
}

export function validateExpirationDate(value: string) {
  const dates = value.split("/");
  if (dates.length !== 2) return false;

  let month = dates[0];
  let year = dates[1];
  let expireDate = moment(`20${year}-${month}-01`);
  let today = moment();

  if (expireDate.isBefore(today)) return false;

  return true;
}

//TODO fix: if one card is invalid, all will be invalid
export function validatePaymentInfo(paymentInfo: PaymentInfo) {
  if (!paymentInfo) return false;

  let isValid = true;

  paymentInfo.cards.forEach((card) => {
    if (!required(card.cardName)) isValid = false;
    if (
      !required(card.cardNumber) ||
      !maxLength(card.cardNumber, 16) ||
      !minLength(card.cardNumber, 10)
    )
      isValid = false;
    if (!validateExpirationDate(card.expirationDate)) isValid = false;
  });

  return isValid;
}

export function validateReceiveInfo(receiveInfo: ReceiveInfo) {
  if (!receiveInfo) return false;

  if (!required(receiveInfo.nickname)) return false;

  if (receiveInfo.type === ReceiveInfoType.BANK_TYPE && receiveInfo.bankInfo) {
    const { account, agency, bankName } = receiveInfo.bankInfo;
    if (!required(account) || !required(agency) || !required(bankName))
      return false;
  } else if (receiveInfo.type === ReceiveInfoType.PIX_TYPE) {
    if (!required(receiveInfo.pixKey)) return false;
  }

  return true;
}

export function validateAddressInfo(addressInfo: AddressInfo) {
  if (!addressInfo) return false;

  if (
    !required(addressInfo.zipcode) ||
    !required(addressInfo.street) ||
    !required(addressInfo.number) ||
    !required(addressInfo.district) ||
    !required(addressInfo.city) ||
    !required(addressInfo.state)
  )
    return false;

  return true;
}

export function isValidDate(value: any, checkIsAfter: boolean = false) {
  let newDate = new Date(value);
  if (newDate.toString() == "Invalid Date") {
    return false;
  }

  //se for uma data antiga, então não é valida pois já expirou
  if (checkIsAfter) {
    return moment(value).isAfter(new Date());
  }

  return true;
}

//TODO create a test for this
export function arrayIsNotEmpty(arr: any[]){
  return arr.length !== 0
}