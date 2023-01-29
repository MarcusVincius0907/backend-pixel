export default class ResponseDefault{
  constructor(status: ResponseStatus, message: string, payload: any = null){
    this.status = status;
    this.message = message;
    this.payload = payload;
  }

  status: ResponseStatus;
  message: string;
  payload?: any;
}

export enum ResponseStatus {
  OK = 'OK',
  NOT_FOUND = 'NOT_FOUND',
  INVALID_INFO = 'INVALID_INFO',
  ERROR = 'ERROR',
}