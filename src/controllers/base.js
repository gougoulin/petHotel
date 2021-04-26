function Base() {
  // request succeed
  /**
   *
   * @param {String} msg
   * @returns {Object}
   */
  function success(msg, payload) {
    return { message: msg, data: payload };
  }
  /**
   * request failed
   * @param {String} message
   * @param {Array} errors
   * @returns {Object}
   */
  function fail(message, errors) {
    return { message, errors };
  }

  /**
   *
   * @param {*} message
   * @param {*} errors
   * @returns
   */
  function generateError(message, errors) {
    return { message, errors };
  }

  /**
   *
   * @param {object} req
   * @param {object} res
   * @param {object} payload
   * @return void
   */
  function badRequest(req, res, payload) {
    console.log("bad request runnning");
    res.status(400).json(payload);
  }
  function unauthorized(req, res) {
    res.status(401).send();
  }
  function forbidden(req, res) {
    res.status(403).send();
  }
  function notFound(req, res) {
    res.status(404).send();
  }
  function notAllowedMethod(req, res) {
    res.status(405).send();
  }
  function serverInternalError(req, res) {
    res.status(501).send();
  }

  return {
    success,
    fail,
    generateError,
    badRequest,
    unauthorized,
    forbidden,
    notFound,
    notAllowedMethod,
    serverInternalError,
  };
}

module.exports = Base();
