"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.validateEnum = exports.arrayIsNotEmpty = exports.isValidDate = exports.validateAddressInfo = exports.validateReceiveInfo = exports.validatePaymentInfo = exports.validateExpirationDate = exports.validateBirthDate = exports.validateCPF = exports.required = exports.maxLength = exports.minLength = exports.validateEmail = void 0;
const moment_1 = __importDefault(require("moment"));
const User_1 = require("../models/User");
function validateEmail(email) {
    return String(email)
        .toLowerCase()
        .match(/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/);
}
exports.validateEmail = validateEmail;
function minLength(value, size) {
    return String(value).length >= size;
}
exports.minLength = minLength;
function maxLength(value, size) {
    return String(value).length <= size;
}
exports.maxLength = maxLength;
function required(value) {
    return !!value;
}
exports.required = required;
function validateCPF(cpf) {
    cpf = cpf.replace(/[^\d]+/g, "");
    if (cpf == "")
        return false;
    // Elimina CPFs invalidos conhecidos
    if (cpf.length != 11 ||
        cpf == "00000000000" ||
        cpf == "11111111111" ||
        cpf == "22222222222" ||
        cpf == "33333333333" ||
        cpf == "44444444444" ||
        cpf == "55555555555" ||
        cpf == "66666666666" ||
        cpf == "77777777777" ||
        cpf == "88888888888" ||
        cpf == "99999999999")
        return false;
    // Valida 1o digito
    let add = 0;
    for (let i = 0; i < 9; i++)
        add += parseInt(cpf.charAt(i)) * (10 - i);
    let rev = 11 - (add % 11);
    if (rev == 10 || rev == 11)
        rev = 0;
    if (rev != parseInt(cpf.charAt(9)))
        return false;
    // Valida 2o digito
    add = 0;
    for (let i = 0; i < 10; i++)
        add += parseInt(cpf.charAt(i)) * (11 - i);
    rev = 11 - (add % 11);
    if (rev == 10 || rev == 11)
        rev = 0;
    if (rev != parseInt(cpf.charAt(10)))
        return false;
    return true;
}
exports.validateCPF = validateCPF;
function validateBirthDate(value) {
    var eighteenYearsAgo = (0, moment_1.default)().subtract(18, "years");
    var birthday = (0, moment_1.default)(value);
    if (!birthday.isValid()) {
        return false;
    }
    else if (eighteenYearsAgo.isAfter(birthday)) {
        return true;
    }
    else {
        return false;
    }
}
exports.validateBirthDate = validateBirthDate;
function validateExpirationDate(value) {
    const dates = value.split("/");
    if (dates.length !== 2)
        return false;
    let month = dates[0];
    let year = dates[1];
    let expireDate = (0, moment_1.default)(`20${year}-${month}-01`);
    let today = (0, moment_1.default)();
    if (expireDate.isBefore(today))
        return false;
    return true;
}
exports.validateExpirationDate = validateExpirationDate;
//TODO fix: if one card is invalid, all will be invalid
function validatePaymentInfo(paymentInfo) {
    if (!paymentInfo)
        return false;
    let isValid = true;
    paymentInfo.cards.forEach((card) => {
        if (!required(card.cardName))
            isValid = false;
        if (!required(card.cardNumber) ||
            !maxLength(card.cardNumber, 16) ||
            !minLength(card.cardNumber, 10))
            isValid = false;
        if (!validateExpirationDate(card.expirationDate))
            isValid = false;
    });
    return isValid;
}
exports.validatePaymentInfo = validatePaymentInfo;
function validateReceiveInfo(receiveInfo) {
    if (!receiveInfo)
        return false;
    if (!required(receiveInfo.nickname))
        return false;
    if (!required(receiveInfo.type))
        return false;
    if (receiveInfo.type === User_1.ReceiveInfoType.BANK_TYPE && receiveInfo.bankInfo) {
        const { account, agency, bankName } = receiveInfo.bankInfo;
        if (!required(account) || !required(agency) || !required(bankName))
            return false;
    }
    else if (receiveInfo.type === User_1.ReceiveInfoType.PIX_TYPE) {
        if (!required(receiveInfo.pixKey))
            return false;
    }
    return true;
}
exports.validateReceiveInfo = validateReceiveInfo;
function validateAddressInfo(addressInfo) {
    if (!addressInfo)
        return false;
    if (!required(addressInfo.zipcode) ||
        !required(addressInfo.street) ||
        !required(addressInfo.number) ||
        !required(addressInfo.district) ||
        !required(addressInfo.city) ||
        !required(addressInfo.state))
        return false;
    return true;
}
exports.validateAddressInfo = validateAddressInfo;
function isValidDate(value, checkIsAfter = false) {
    let newDate = new Date(value);
    if (newDate.toString() == "Invalid Date") {
        return false;
    }
    //se for uma data antiga, então não é valida pois já expirou
    if (checkIsAfter) {
        return (0, moment_1.default)(value).isAfter(new Date());
    }
    return true;
}
exports.isValidDate = isValidDate;
function arrayIsNotEmpty(arr) {
    return arr.length !== 0;
}
exports.arrayIsNotEmpty = arrayIsNotEmpty;
//TODO create a test for this
function validateEnum(value, enumValue) {
    let isType = false;
    for (const item in enumValue) {
        if (item === value)
            isType = true;
    }
    return isType;
}
exports.validateEnum = validateEnum;
