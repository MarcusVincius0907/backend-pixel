import { IPixel } from "./NFT";

export interface ICheckoutResponse {
  availablePixels: Array<IPixel>;
  unavailablePixels: Array<IPixel>;
}
