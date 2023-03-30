"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ResponseStatus = void 0;
class ResponseDefault {
    constructor(status, message, payload = null) {
        this.status = status;
        this.message = message;
        this.payload = payload;
    }
}
exports.default = ResponseDefault;
var ResponseStatus;
(function (ResponseStatus) {
    ResponseStatus["OK"] = "OK";
    ResponseStatus["NOT_FOUND"] = "NOT_FOUND";
    ResponseStatus["INVALID_INFO"] = "INVALID_INFO";
    ResponseStatus["ERROR"] = "ERROR";
})(ResponseStatus = exports.ResponseStatus || (exports.ResponseStatus = {}));
