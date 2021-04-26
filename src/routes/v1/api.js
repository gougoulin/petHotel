var express = require("express");
var router = express.Router();

const jwt = require("jsonwebtoken");
const env = process.env.NODE_ENV || "development";
const config = require("../../config/config.json")[env];
const { jwtSecret, jwtOptions } = config;

const db = require("../../models");
const checkPassword = require("../../helpers/checkpassword");
const getToken = require("../../helpers/getToken");
const authorization = require("../../helpers/permission");

const authController = require("../../controllers/auth")(
  db,
  checkPassword,
  getToken,
  jwtSecret,
  jwtOptions,
  jwt,
  authorization
);

router
  .route("/auth/login")
  .get(authController.getLogin)
  .post(async (req, res) => {
    const { code, data } = await authController.postLogin(req, res);
    sendResponse({ code, data }, res);
  })
  .all((req, res) =>
    res
      .status(401)
      .json({ message: "Invalid request methods for the resource." })
  );

/**
 * endpoint /users
 */
// single user
router
  .route("/users/:id")
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
    res
      .status(401)
      .json({ message: "Invalid request methods for the resource." })
  );
/**
 * /users
 * 1. create new user
 * 2. read user list
 */
router
  .route("/users")
  .get(async (req, res) => {
    const { code, data } = await authController.getUsers(req);
    sendResponse({ code, data }, res);
  })
  .post(async (req, res) => {
    const { code, data } = await authController.postUser(req);
    sendResponse({ code, data }, res);
  })
  .all((req, res) =>
    res
      .status(401)
      .json({ message: "Invalid request methods for the resource." })
  );

/**
 * Endpoint Customers
 * /customers
 * 1. get
 * 2. post
 * /customers/:id
 * 1. get
 * 2. put
 * 3. delete
 */
router
  .route("/customers")
  .post(async (req, res) => {
    const { code, data } = await authController.postCustomer(req);
    sendResponse({ code, data }, res);
  })
  .get()
  .all((req, res) =>
    res
      .status(401)
      .json({ message: "Invalid request methods for the resource." })
  );

router.route("/customers/:id").get().post().delete().all();

/**
 * Endpoint Pets /pets
 */
router.route("/pets").get().post().all();
router.route("/pets/:id").get().post().delete().all();

/**
 *
 * @param {*} object {code: int, data: object}
 * @param {data} Object or Array
 * @param {*} res - http response
 *
 */
function sendResponse({ code, data }, res) {
  res.status(code).json({ ...data });
}

module.exports = router;
