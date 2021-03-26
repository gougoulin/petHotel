const bcrypt = require("bcrypt");
module.exports = async (target, hash) => {
  return await bcrypt.compare(target, hash);
};

// bcrypt.hash(source, saltRounds, (err, hash) => {
//   console.log("i'm running here", hash);
// });
