const userDao = require("../dao/user");
const bcrypt = require("bcrypt");
const authService = require("./auth");

var userService = {};

userService.getUser = function (condition) {
  return userDao.findOneUser({ where: condition });
};

userService.authenticateUser = async function (
  userEmail,
  userPassword,
  tokenWithRequest
) {
  try {
    var userFound = await this.getUser({ email: userEmail });
    if (userFound == null) {
      /** user not found */
      console.log("user not found");
      return { status: 404, payload: { message: "Not found" } };
    }

    /** user email found, next, verify the password */
    var isMatch = await this.isPasswordCorrect(
      userPassword,
      userFound.password
    );

    /** return 401, if password is wrong */
    if (!isMatch)
      return { status: 401, payload: { message: "Email/password not valid" } };

    /** correct password, return 200; */
    /** TODO: if token exist, then (default: log out) and put the token in the blacklist */

    /** create a new token */
    let token = await authService.createToken({ user: userFound.userID });
    return {
      status: 200,
      payload: { token, uri: `/api/v2/users/${userFound.userID}` },
    };
  } catch (error) {
    return { status: 500, payload: error };
  }
};

userService.registerUser = async function (email, password) {
  try {
    /**
     * 1. email has been occupied, reject
     * 2. otherwise, register user
     */
    let result = userDao.findOrCreateUser({ email }, { email, password });
    let [userCreated, isUserCreated] = await result.then((resp) => {
      let [user, isUserCreated] = resp;
      return [user, isUserCreated];
    });
    // let result = userDao.insertUser({ email, password, role: "user" });

    /** failed, email occupied */
    if (!isUserCreated)
      return { status: 409, message: "Email has been occupied." };

    /** insert user successfully, generating token */
    return authService
      .createToken({ user: userCreated.userID })
      .then((token) => {
        console.log("token = ", token);
        return {
          status: 201,
          payload: {
            uri: `/api/v2/users/${userCreated.userID}`,
            token: "token",
          },
        };
      })
      .catch((err) => {
        throw Error(err);
      });
  } catch (error) {
    return { status: 500, message: "Internal server error" };
  }
};

/**
 *
 * @param {string} source - password in the database
 * @param {string} target - password received in req.body
 * @returns {boolean}
 */
userService.isPasswordCorrect = async function (
  inputPassword,
  passwordInDatabase
) {
  console.log("isPasswordCorrect", inputPassword, passwordInDatabase);
  return await bcrypt.compare(inputPassword, passwordInDatabase);
};

module.exports = userService;
