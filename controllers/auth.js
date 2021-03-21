module.exports = function (
  db,
  checkPassword,
  getToken,
  jwtSecret,
  jwtOptions,
  jwt,
  authorization
) {
  let AuthController = {};

  const { User, Authority, AuthorityUser, sequelize, Customer, Pet } = db;
  const { canGetUsers } = authorization;

  const internalServerError = (error) => {
    return {
      code: 500,
      data: {
        msg: "Internal server error. Contact admin to report the issue",
        error,
      },
    };
  };

  const getTokenData = (req) => {
    const decoded = jwt.verify(
      req.headers.authorization.split(" ")[1],
      jwtSecret
    );
    return decoded;
  };

  /**
   *
   * @param {*} req
   * @param {*} res
   *
   * handle get request to /api/auth/login
   */
  AuthController.getLogin = (req, res) => {
    res.send("under development");
  };
  /**
   * handle post request to /api/auth/login
   */
  AuthController.postLogin = async (req) => {
    /** add validation later*/

    try {
      const target = await User.findOne({
        where: { email: req.body.email },
        include: Authority,
      });
      if (await checkPassword(req.body.password, target.dataValues.password)) {
        // password matched, send token
        const payload = {
          userID: target.dataValues.userID,
          permission: target.dataValues.Authorities[0].dataValues.permission,
        };
        const token = await getToken(payload, jwtSecret, jwtOptions, jwt);
        // for security, remove password from target
        // don't send password
        delete target.dataValues.password;
        return {
          code: 200,
          data: { token, msg: "success", target: target.toJSON() },
        };
      } else {
        // incorrect password, go back
        // res.status(404).json({ msg: "failed", err: "err" });
        return {
          code: 401,
          data: { msg: "Incorrect email or password" },
        };
      }
    } catch (error) {
      return internalServerError(error);
    }
  };

  // to be added
  AuthController.postForgetPassword = () => {};

  /** handle requests to /api/auth/users */
  AuthController.getUsers = async (req) => {
    try {
      // check authority first
      // only employee and admin can request this resource
      // permission must be larger than 1
      // to be added
      const { permission } = getTokenData(req);
      if (!canGetUsers(permission)) {
        return {
          code: 401,
          data: {
            msg: "Request denied. No permission.",
          },
        };
      }

      // after authority check
      // 1. no users
      // 2. at least one user
      // to secure users information, password shouldn't be send
      // all employees can get users' info, so it's not safe to send password
      const users = await User.findAll({
        attributes: { exclude: ["password"] },
      });
      return {
        code: 200,
        data: { users, NumberOfUsers: users ? users.length : 0 },
      };
    } catch (error) {
      return internalServerError(error);
    }
  };

  /**
   * handle request to /api/auth/user
   */
  AuthController.getUser = () => {};
  AuthController.postUser = async (req) => {
    // create new user, no permission required
    try {
      let result;
      await sequelize.transaction(async (trans) => {
        const [user, isCreated] = await User.findOrCreate({
          where: { email: req.body.email },
          defaults: { password: req.body.password },
          transaction: trans,
        });
        if (isCreated) {
          // default user authority : 1
          await AuthorityUser.create(
            {
              userID: user.dataValues.userID,
              AuthorityID: 1,
            },
            { transaction: trans }
          );
          result = {
            code: 200,
            data: { user },
          };
        } else {
          result = {
            code: 409,
            data: {
              msg: "Failed. Email has been used!",
            },
          };
        }
      });
      return result;
    } catch (error) {
      console.log(error);
      return internalServerError(error);
    }
  };

  /** handle request to endpoint /user/:id */
  AuthController.getUserById = async (req) => {
    /**
     * 1. id in url NOT equal to ID in token, no permission, return 401
     * Otherwise, return user data
     * 2. not equal id, but with permission, go ahead
     * 3. equal id, go ahead
     */
    const { userID, permission } = getTokenData(req);

    if (userID != req.params.id && !canGetUsers(permission)) {
      return { code: 401, data: { msg: "Request denied. No permission." } };
    }

    try {
      const user = await User.findByPk(req.params.id, {
        attributes: { exclude: ["password"] },
      });
      if (!user) return { code: 404, data: { msg: "Resource doesn't exist." } };
      return { code: 200, data: user };
    } catch (error) {
      return internalServerError(error);
    }
  };

  AuthController.putUserById = async (req) => {
    return await {
      code: 200,
      data: { msg: "api//user/:id, method PUT, to be added" },
    };
  };
  AuthController.deleteUserById = async (req) => {
    return await {
      code: 200,
      data: { msg: "api//user/:id, method DELETE, to be added" },
    };
  };

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

  /** handle request to /customer/:id */
  AuthController.getCustomerById = async (req) => {};
  AuthController.putCustomerById = async (req) => {};
  AuthController.deleteCustomerById = async (req) => {};

  /** handle request to /customers */
  AuthController.getCustomers = async (req) => {};
  AuthController.putCustomers = async (req) => {};
  AuthController.deleteCustomers = async (req) => {};

  /** handle request to /pet */
  AuthController.getPet = async (req) => {};
  AuthController.putPet = async (req) => {};
  AuthController.deletePet = async (req) => {};

  /** handle request to /pets */
  AuthController.getPets = async (req) => {};
  AuthController.putPets = async (req) => {};
  AuthController.deletePets = async (req) => {};

  /** handle request to /pet/:id */
  AuthController.getPetById = async (req) => {};
  AuthController.putPetById = async (req) => {};
  AuthController.deletePetById = async (req) => {};

  return AuthController;
};
