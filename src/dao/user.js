const BaseDao = require("./base");
const db = require("../models/");

var userDao = Object.create(BaseDao);

userDao.findOneUser = function (user) {
  return this.getOneRecord.call(db.User, user);
};

userDao.insertUser = async function (user) {
  let result = await this.insertOneRecord.call(db.User, user);
  console.log("userDao insertUser running", result);
  return result;
};

userDao.findOrCreateUser = function (where, user) {
  // if (!this.findOrCreateRecord) {
  //   console.log("findOrCreateRecord method not found");
  //   return;
  // }
  let response = this.findOrCreateRecord.call(db.User, where, user);
  return response;
};

module.exports = userDao;
