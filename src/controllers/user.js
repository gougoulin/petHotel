module.exports = function userController(
  db,
  checkPassword,
  getToken,
  jwtSecret,
  jwtOptions,
  jwt,
  authorization
) {
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
};
