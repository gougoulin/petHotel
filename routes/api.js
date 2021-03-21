var express = require("express");
var router = express.Router();

// const config = require("../config/config.json")[
//   process.env.NODE_ENV || "development"
// ];
const jwt = require("jsonwebtoken");
const env = process.env.NODE_ENV || "development";
const { jwtSecret, jwtOptions } = require("../config/config.json")[env];

const db = require("../models/");
const checkPassword = require("../helpers/checkpassword");
const getToken = require("../helpers/getToken");

const authController = require("../controllers/auth")(
  db,
  checkPassword,
  getToken,
  jwtSecret,
  jwtOptions,
  jwt
);

router
  .route("/auth/login")
  .get(authController.getLogin)
  .post(async (req, res) => {
    const { code, data } = await authController.postLogin(req, res);
    sendResponse({ code, data }, res);
  })
  .all((req, res) =>
    res.status(401).json({ msg: "Invalid request methods for the resource." })
  );

/**  endpoint /user  */
router
  .route("/user")
  .get()
  .post(async (req, res) => {
    const { code, data } = await authController.postUser(req);
    sendResponse({ code, data }, res);
  })
  .all((req, res) =>
    res.status(401).json({ msg: "Invalid request methods for the resource." })
  );

/** endpoint /users */
router
  .route("/users")
  .get(async (req, res) => {
    const { code, data } = await authController.getUsers(req);
    sendResponse({ code, data }, res);
  })
  .all((req, res) =>
    res.status(401).json({ msg: "Invalid request methods for the resource." })
  );

/** endpoint /user/:id */
router
  .route("/user/:id")
  .get(async (req, res) => {
    const { code, data } = await authController.getUserById(req);
    sendResponse({ code, data }, res);
  })
  .put(async (req, res) => {
    const { code, data } = await authController.putUserById(req);
    sendResponse({ code, data }, res);
  })
  .delete(async (req, res) => {
    const { code, data } = await authController.deleteUserById(req);
    sendResponse({ code, data }, res);
  })
  .all((req, res) =>
    res.status(401).json({ msg: "Invalid request methods for the resource." })
  );

/** /customer endpoint */
router
  .route("/customer")
  .post(async (req, res) => {
    const { code, data } = await authController.postCustomer(req);
    sendResponse({ code, data }, res);
  })
  .all((req, res) =>
    res.status(401).json({ msg: "Invalid request methods for the resource." })
  );

router.route("/customers").get().post().all();

router.route("/customer/:id").get().post().delete().all();

/** /pet endpoint */
router.route("/pet").get().post().all();
router.route("/pets").get().post().all();
router.route("/pet/:id").get().post().delete().all();

/**
 *
 * @param {*} param0 - object {code: int, data: object}
 * @param {*} res - http response
 *
 */
function sendResponse({ code, data }, res) {
  res.status(code).json(data);
}

module.exports = router;
