"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const AuthController_1 = __importDefault(require("./controllers/AuthController"));
const CartController_1 = __importDefault(require("./controllers/CartController"));
const CheckoutController_1 = __importDefault(require("./controllers/CheckoutController"));
const controller_1 = __importDefault(require("./controllers/controller"));
const MyPixelController_1 = __importDefault(require("./controllers/MyPixelController"));
const NFTController_1 = __importDefault(require("./controllers/NFTController"));
const SortitionController_1 = __importDefault(require("./controllers/SortitionController"));
const UserController_1 = __importDefault(require("./controllers/UserController"));
//Auth0
const { auth } = require("express-oauth2-jwt-bearer");
const checkJwt = auth({
    audience: "https://dev-2glokavh.us.auth0.com/api/v2/",
    issuerBaseURL: `https://dev-2glokavh.us.auth0.com`,
});
const routes = express_1.default.Router();
const controller = new controller_1.default();
const userController = new UserController_1.default();
const sortitionController = new SortitionController_1.default();
const nFTController = new NFTController_1.default();
const authController = new AuthController_1.default();
const cartController = new CartController_1.default();
const checkoutController = new CheckoutController_1.default();
const myPixelController = new MyPixelController_1.default();
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
routes.get("/nft/measure/:id/:pixelSize", checkJwt, nFTController.getNFTMeasurements);
routes.get("/nft/:id", checkJwt, nFTController.findById);
routes.post("/nft/create", checkJwt, nFTController.create);
routes.put("/nft/:id", checkJwt, nFTController.updateById);
routes.delete("/nft/:id", checkJwt, nFTController.deleteById);
//cart
routes.get("/cart", checkJwt, cartController.list);
routes.get("/cart/user/:userId/:sortitionId", checkJwt, cartController.getByUserId);
routes.post("/cart/create", checkJwt, cartController.create);
routes.put("/cart/:id", checkJwt, cartController.updateById);
routes.delete("/cart/:id", checkJwt, cartController.deleteById);
//checkout
routes.post("/checkout/:cartId", checkJwt, checkoutController.create);
//my pixel
routes.get("/my-pixel/:userId", checkJwt, myPixelController.list);
exports.default = routes;
