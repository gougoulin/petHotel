const baseController = require("./base");
const validator = require("validator");
const escapeHtml = require("escape-html");
const userService = require("../services/user");

var authController = Object.create(baseController);

authController.postLogin = async function (req, res) {
  try {
    var { email, password } = req.body;

    /** save old token and put it into blacklist if needed */
    const tokenWithRequest = req.headers.authorization;

    /** Return if inputs are missing */
    if (email == null || password == null) {
      this.badRequest(req, res, { message: "Must enter your email/password." });
      return;
    }

    /** validate parameters & user input escape */
    email = escapeHtml(email);
    password = escapeHtml(password);

    var errors = { email: null, password: null },
      isEmailValid = validator.isEmail(email),
      isPasswordValid = validator.isStrongPassword(password);

    if (!isEmailValid) {
      errors["email"] = "Invalid email";
    }

    if (!isPasswordValid) {
      errors["password"] =
        "Weak password. Minimum length: 8; Minimum lowercase: 1; Minimum uppercase: 1";
      this.badRequest(req, res, { errors });
      return;
    }

    /**
     * Now password and email are all valid
     * when email and password are valid,
     * let userService to do the next (authentication)
     */
    let response = await userService.authenticateUser(
      email,
      password,
      tokenWithRequest
    );
    console.log("response", response);
    switch (response.status) {
      case 200:
        res.status(200).json(this.success(null, response.payload));
        break;
      case 404:
        res
          .status(404)
          .json(this.generateError(response.payload.message, null));
        break;
      case 401:
        res
          .status(401)
          .json(this.generateError(response.payload.message, null));
        break;
      case 500:
        res
          .status(500)
          .json(this.generateError(response.payload.message, null));
      default:
        break;
    }
    // res.status(200).json(response);
    return;

    // 2. ..
    // var res = authService.postLogin({ email, password });
    // 3. ..
    // res.then((data) => {
    //   switch (data.type) {
    //     case 200:
    //       this.success("success");
    //       break;
    //     case 400:
    //       this.error("error");
    //       break;
    //     case 500:
    //       this.fail("fail");
    //       break;
    //     default:
    //       break;
    //   }
    // });
    // 4. send response
    // } else {
    /** invalid email or password */
    //   res.json(errors);
    // }
  } catch (error) {
    console.log(error);
  }
};

authController.postSignIn = async function (req, res) {
  try {
    /** validate parameters & user input escape */
    var { email, password } = req.body;
    email = escapeHtml(email);
    password = escapeHtml(password);

    if (email == null || password == null) {
      this.badRequest(req, res, { message: "Must enter your email/password." });
      return; // exit function
    }

    var errors = { email: null, password: null },
      isEmailValid = validator.isEmail(email),
      isPasswordValid = validator.isStrongPassword(password);

    if (!isEmailValid) {
      errors["email"] = "Invalid email";
      // this.badRequest({ message: "Invalid email" });
    }

    if (!isPasswordValid) {
      errors["password"] =
        "Weak password. Minimum length: 8; Minimum lowercase: 1; Minimum uppercase: 1";
      this.badRequest(req, res, { errors });
      return;
    }

    /**
     * Now password and email are all valid
     * when email and password are valid,
     * let userService to do the next (authentication)
     */
    let result = await userService.registerUser(email, password);
    console.log("userController result = ", result);
    if (result == null) return;
    switch (result.status) {
      case 409:
        res.status(409).json(this.generateError(result.message, null));
        break;
      case 201:
        console.log("authController 201");
        res
          .status(201)
          .json(this.success("Sign in successfully.", result.payload));
        break;
      case 500:
        res.status(500);
        break;
      default:
        res.status(500);
        break;
    }
    return;
  } catch (error) {
    console.log(error);
  }
};

module.exports = authController;

// module.exports = function (
//   db,
//   checkPassword,
//   getToken,
//   jwtSecret,
//   jwtOptions,
//   jwt,
//   authorization
// ) {
//   let AuthController = {};

//   const { User, Authority, AuthorityUser, sequelize, Customer, Pet } = db;
//   const { canGetUsers } = authorization;

//   const internalServerError = (error) => {
//     return {
//       code: 500,
//       data: {
//         msg: "Internal server error. Contact admin to report the issue",
//         error,
//       },
//     };
//   };

//   const getTokenData = (req) => {
//     const decoded = jwt.verify(
//       req.headers.authorization.split(" ")[1],
//       jwtSecret
//     );
//     return decoded;
//   };

//   /**
//    *
//    * @param {*} req
//    * @param {*} res
//    *
//    * handle get request to /api/auth/login
//    */
//   AuthController.getLogin = (req, res) => {
//     res.send("under development");
//   };
//   /**
//    * handle post request to /api/auth/login
//    */
//   AuthController.postLogin = async (req) => {
//     /** add validation later*/

//     try {
//       const target = await User.findOne({
//         where: { email: req.body.email },
//         include: Authority,
//       });
//       if (await checkPassword(req.body.password, target.dataValues.password)) {
//         // password matched, send token
//         const payload = {
//           userID: target.dataValues.userID,
//           permission: target.dataValues.Authorities[0].dataValues.permission,
//         };
//         const token = await getToken(payload, jwtSecret, jwtOptions, jwt);
//         // for security, remove password from target
//         // don't send password
//         delete target.dataValues.password;
//         return {
//           code: 200,
//           data: { token, msg: "success", target: target.toJSON() },
//         };
//       } else {
//         // incorrect password, go back
//         // res.status(404).json({ msg: "failed", err: "err" });
//         return {
//           code: 401,
//           data: { msg: "Incorrect email or password" },
//         };
//       }
//     } catch (error) {
//       return internalServerError(error);
//     }
//   };

//   // to be added
//   AuthController.postForgetPassword = () => {};

/** handle request to /customer */
// AuthController.postCustomer = async (req) => {
// create new customer, check authority first

// after authority check
/**
 * 1. customer
 */
//   try {
//     let result;
//     await sequelize.transaction(async (trans) => {
//       const [customer, isCreated] = await Customer.findOrCreate({
//         where: { email: req.body.email },
//         defaults: { password: req.body.password },
//         transaction: trans,
//       });
//       if (isCreated) {
//         console.log("auth.js", "success");
//         result = {
//           code: 200,
//           data: { user },
//         };
//       } else {
//         console.log("auth.js", "user exist.");
//         result = {
//           code: 409,
//           data: {
//             msg: "Failed. Email has been used!",
//           },
//         };
//       }
//     });
//     return result;
//   } catch (error) {
//     console.log(error);
//     return {
//       code: 500,
//       data: {
//         msg: "Internal server error. Contact admin to report the issue",
//         error,
//       },
//     };
//   }
// };

//   return AuthController;
// };
