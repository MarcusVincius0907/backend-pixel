import express from "express";
import AuthController from "./controllers/AuthController";
import CartController from "./controllers/CartController";
import CheckoutController from "./controllers/CheckoutController";
import Controllers from "./controllers/controller";
import MyPixelController from "./controllers/MyPixelController";
import NFTController from "./controllers/NFTController";
import SortitionController from "./controllers/SortitionController";
import UserController from "./controllers/UserController";

//Auth0
const { auth } = require("express-oauth2-jwt-bearer");
const checkJwt = auth({
  audience: "https://dev-2glokavh.us.auth0.com/api/v2/",
  issuerBaseURL: `https://dev-2glokavh.us.auth0.com`,
});

const routes = express.Router();

const controller = new Controllers();
const userController = new UserController();
const sortitionController = new SortitionController();
const nFTController = new NFTController();
const authController = new AuthController();
const cartController = new CartController();
const checkoutController = new CheckoutController();
const myPixelController = new MyPixelController();

routes.get("/test", checkJwt, controller.test);
routes.get("/auth", authController.getToken);

//user
routes.get("/user", checkJwt, userController.list);
routes.post("/user/create", checkJwt, userController.create);
routes.get("/user/:id", checkJwt, userController.findById);
routes.put("/user/email", checkJwt, userController.findByEmail);
routes.put("/user/:id", checkJwt, userController.updateById);
routes.delete("/user/:id", checkJwt, userController.deleteById);
routes.get("/zipcode/:zipcode", userController.consultZipcode);

//sortition
routes.get("/sortition", checkJwt, sortitionController.list);
routes.get("/sortition/:id", checkJwt, sortitionController.getById);
routes.post("/sortition/create", checkJwt, sortitionController.create);
routes.put("/sortition/:id", checkJwt, sortitionController.updateById);
routes.delete("/sortition/:id", checkJwt, sortitionController.deleteById);

//NFT
routes.get("/nft", checkJwt, nFTController.list);
routes.get("/nft/list/ids", checkJwt, nFTController.listNFTSummaryId);
routes.get(
  "/nft/measure/:id/:pixelSize",
  checkJwt,
  nFTController.getNFTMeasurements
);
routes.get("/nft/:id", checkJwt, nFTController.findById);
routes.post("/nft/create", checkJwt, nFTController.create);
routes.put("/nft/:id", checkJwt, nFTController.updateById);
routes.delete("/nft/:id", checkJwt, nFTController.deleteById);
//cart
routes.get("/cart", checkJwt, cartController.list);
routes.get(
  "/cart/user/:userId/:sortitionId",
  checkJwt,
  cartController.getByUserId
);
routes.post("/cart/create", checkJwt, cartController.create);
routes.put("/cart/:id", checkJwt, cartController.updateById);
routes.delete("/cart/:id", checkJwt, cartController.deleteById);

//checkout
routes.post("/checkout/:cartId", checkJwt, checkoutController.create);

//my pixel
routes.get("/my-pixel/:userId", checkJwt, myPixelController.list);

export default routes;
