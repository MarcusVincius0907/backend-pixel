import express from 'express';
import Controllers from './controllers/controller'

//Auth0
const { auth } = require('express-oauth2-jwt-bearer');
const checkJwt = auth({
  audience: 'https://dev-2glokavh.us.auth0.com/api/v2/',
  issuerBaseURL: `https://dev-2glokavh.us.auth0.com`,
});

const routes = express.Router();

const controller = new Controllers()

routes.get("/test", checkJwt, controller.test);

export default routes;
