export default class ResponseDefault{
  constructor(status: string, message: string, payload: any = null){
    this.status = status;
    this.message = message;
    this.payload = payload;
  }

  status: string;
  message: string;
  payload?: any;
}