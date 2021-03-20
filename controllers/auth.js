module.exports = function (User, checkPassword, getToken) {
  let AuthController = {};

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
      const target = await User.findOne({ where: { email: req.body.email } });
      if (await checkPassword(req.body.password, target.password)) {
        // password matched, send token
        const token = await getToken(target.userID);
        // res.status(200).json({ token, msg: "success" });
        return { code: 200, data: { token, msg: "success" } };
      } else {
        // incorrect password, go back
        // res.status(404).json({ msg: "failed", err: "err" });
        return {
          code: 401,
          data: { msg: "failed", msg: "Incorrect email or password" },
        };
      }
    } catch (error) {
      console.log(error);
    }
  };

  AuthController.postForgetPassword = () => {};

  /**
   * handle request to /api/auth/user
   */
  AuthController.getUser = () => {};
  AuthController.postUser = async (req, res) => {
    User.findOrCreate({
      where: { email: req.body.email },
      default: {
        email: req.body.email,
        password: req.body.password,
      },
    });
  };

  return AuthController;
};
