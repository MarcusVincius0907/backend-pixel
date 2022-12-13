import express from 'express';
import Controllers from './controllers/controller';
import NFTController from './controllers/NFTController';
import SortitionController from './controllers/SortitionController';
import UserController from './controllers/UserController';

//Auth0
const { auth } = require('express-oauth2-jwt-bearer');
const checkJwt = auth({
  audience: 'https://dev-2glokavh.us.auth0.com/api/v2/',
  issuerBaseURL: `https://dev-2glokavh.us.auth0.com`,
})

const routes = express.Router();

const controller = new Controllers();
const userController = new UserController();
const sortitionController = new SortitionController();
const nFTController = new NFTController();

routes.get("/test", checkJwt, controller.test);

//user
routes.get("/user", checkJwt, userController.list);
routes.post("/user/create", checkJwt, userController.create);
routes.get("/user/:id", checkJwt, userController.findById);
routes.put("/user/:id", checkJwt, userController.updateById);
routes.delete("/user/:id", checkJwt, userController.deleteById);
routes.get("/zipcode/:zipcode", userController.consultZipcode);

//sortition
routes.get("/sortition", checkJwt, sortitionController.list);
routes.post("/sortition/create", checkJwt, sortitionController.create);
routes.put("/sortition/:id", checkJwt, sortitionController.updateById);
routes.delete("/sortition/:id", checkJwt, sortitionController.deleteById);

//NFT
routes.get("/nft", checkJwt, nFTController.list);
routes.post("/nft/create", checkJwt, nFTController.create);
routes.put("/nft/:id", checkJwt, nFTController.updateById);
routes.delete("/nft/:id", checkJwt, nFTController.deleteById);


export default routes;
