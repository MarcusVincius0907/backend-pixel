"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_oauth2_jwt_bearer_1 = require("express-oauth2-jwt-bearer");
const CustomError_1 = require("../models/CustomError");
/**
 * Custom error handler to standardize error objects returned to
 * the client
 *
 * @param err Error caught by Express.js
 * @param req Request object provided by Express
 * @param res Response object provided by Express
 * @param next NextFunction function provided by Express
 */
function handleError(err, req, res, next) {
    let customError = err;
    //Erros do Auth0
    if (err instanceof express_oauth2_jwt_bearer_1.UnauthorizedError) {
        customError = new CustomError_1.CustomError('Requisição não autorizada.', err.statusCode, err.message);
    }
    //Erro genérico
    else if (!(err instanceof CustomError_1.CustomError)) {
        customError = new CustomError_1.CustomError('Ocorreu um erro na API.');
    }
    // we are not using the next function to prvent from triggering
    // the default error-handler. However, make sure you are sending a
    // response to client to prevent memory leaks in case you decide to
    // NOT use, like in this example, the NextFunction .i.e., next(new Error())
    res.status(customError.status).send(customError);
}
;
exports.default = handleError;
