const baseDao = require("./base");

/** link authDao to baseDao, inherit methods */
var authDao = {};
Object.setPrototypeOf(authDao, baseDao);

/** new methods */
