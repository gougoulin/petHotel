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
  AuthController.postLogin = async (req, res) => {
    /** add validation */
    const target = await User.findOne({ where: { email: req.body.email } });
    if (await checkPassword(req.body.password, target.password)) {
      // password matched, send token
      const token = await getToken(target.userID);
      res.status(200).json({ token, msg: "success" });
    } else {
      // incorrect password, go back
      res.status(404).json({ msg: "failed", err: "err" });
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