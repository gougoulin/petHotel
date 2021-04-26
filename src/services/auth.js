const authDao = require("../dao/auth");
const config = require("../config/config");
const jwt = require("jsonwebtoken");

var authService = function () {
  let _env, _config, createToken, isValidToken;
  _env = process.env.ENV || "development";
  _config = config;

  let {
    jwtSecret: _jwtSecret,
    salt: _salt,
    saltRounds: _saltRounds,
    jwtOptions: _jwtOptions,
  } = _config[_env];

  createToken = function (payload) {
    return new Promise((resolve, reject) => {
      jwt.sign(payload, _jwtSecret, _jwtOptions, (err, token) => {
        if (err) {
          reject(err);
        }
        resolve(token);
      });
    });
  };

  isValidToken = async function () {};

  return {
    createToken,
    isValidToken,
  };
};

module.exports = authService();
