const express = require("express");
const authRouter = express.Router();

const authController = require("../../controllers/auth");

console.log(typeof authController.postLogin);
/** endpoint /api/v2/auth/login */
authRouter
  .route("/login")
  .post(authController.postLogin.bind(authController))
  .all(authController.notAllowedMethod);

/** endpoint /api/v2/auth/signin */
authRouter
  .route("/signin")
  .post(authController.postSignIn.bind(authController))
  .all(authController.notAllowedMethod);

module.exports = authRouter;
