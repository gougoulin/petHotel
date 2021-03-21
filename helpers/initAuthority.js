const user = require("../models/user");

/**
 *
 * @param {*} Authority sequelize model
 *
 * initialize the Authority table for app
 */
module.exports = async (Authority) => {
  Authority.bulkCreate([
    /**
     * 0-no permission 1-customer only 2-customer & employee 4 admin
     * admin: 0 no; 1 r; 2 rw; 3: rw;
     * employee, customer
     */
    {
      permission: 0,
      detail: "temporary permission",
      // may used in future
    },
    {
      permission: 1,
      detail: "customer permission",
    },
    {
      permission: 2,
      detail: "employee permission, crud customer, only read employee",
    },
    {
      permission: 4,
      detail: "super admin permission, crud employee & customer ",
    },
  ]);
};

// normal user: read, edit, delete own data
// when customer(normal user) fetch pet data, still need to check ownership
// employee user: read edit delete all normal user
// admin user: read edit delete all normal and employee user
