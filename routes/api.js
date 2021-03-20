var express = require("express");
var router = express.Router();

// const config = require("../config/config.json")[
//   process.env.NODE_ENV || "development"
// ];

const db = require("../models/");
const checkPassword = require("../helpers/checkpassword");
const getToken = require("../helpers/getToken");

const authController = require("../controllers/auth")(
  db.User,
  checkPassword,
  getToken
);

console.log(authController);
router
  .route("/login")
  .get(authController.getLogin)
  .post(authController.postLogin);

module.exports = router;
