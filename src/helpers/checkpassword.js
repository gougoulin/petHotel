const bcrypt = require("bcrypt");
module.exports = async (target, hash) => {
  return await bcrypt.compare(target, hash);
};
