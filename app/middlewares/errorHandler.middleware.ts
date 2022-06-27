import { Request, Response, NextFunction } from 'express';
import { UnauthorizedError } from 'express-oauth2-jwt-bearer';
import { CustomError } from '../models/CustomError';

/**
 * Custom error handler to standardize error objects returned to
 * the client
 *
 * @param err Error caught by Express.js
 * @param req Request object provided by Express
 * @param res Response object provided by Express
 * @param next NextFunction function provided by Express
 */
function handleError(
  err: TypeError | CustomError,
  req: Request,
  res: Response,
  next: NextFunction
) {
  let customError = err;

  //Erros do Auth0
  if(err instanceof UnauthorizedError){
    
    customError = new CustomError(
      'Requisição não autorizada.',
      err.statusCode,
      err.message
    )
    
  }
  //Erro genérico
  else if (!(err instanceof CustomError)) {
    customError = new CustomError(
      'Ocorreu um erro na API.'
    );
  }

  

  // we are not using the next function to prvent from triggering
  // the default error-handler. However, make sure you are sending a
  // response to client to prevent memory leaks in case you decide to
  // NOT use, like in this example, the NextFunction .i.e., next(new Error())
  res.status((customError as CustomError).status).send(customError);
};

export default handleError;