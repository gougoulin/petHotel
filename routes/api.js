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

router
  .route("/login")
  .get(authController.getLogin)
  .post(async (req, res) => {
    const { code, data } = await authController.postLogin(req, res);
    res.status(code).json(data);
  });

/**  /user endpoint */
router.route("/user").get().post();
router.route("/users").get().post();
router.route("/user/:id").get().put().delete();

/** /customer endpoint */
router.route("/customer").get().post();
router.route("/customers").get().post();
router.route("/customer/:id").get().post().delete();

/** /pet endpoint */
router.route("/pet").get().post();
router.route("/pets").get().post();
router.route("/pet/:id").get().post().delete();

module.exports = router;
