/**
 *
 * @param {*} payload object
 * @param {*} secret string
 * @param {*} options object
 * @param {*} jwt object, jsonwebtoken package
 * @returns string
 */
module.exports = (payload, secret, options, jwt) => {
  return jwt.sign(payload, secret, options);
};
