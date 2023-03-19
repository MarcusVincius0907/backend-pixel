import { IPixel } from "./NFT";
import { PaymentMethods } from "./Payment";

export interface ICheckoutResponse {
  availablePixels: Array<IPixel>;
  unavailablePixels: Array<IPixel>;
}

export interface ICheckoutRequest {
  paymentMethod: PaymentMethods;
}
