"use strict";

module.exports = {
  up: async (queryInterface, Sequelize) => {
    /**
     * Add seed commands here.
     *
     * Example:
     * await queryInterface.bulkInsert('People', [{
     *   name: 'John Doe',
     *   isBetaMember: false
     * }], {});
     */
    await queryInterface.bulkInsert(
      "authorities",
      [
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
      ],
      {}
    );
  },

  down: async (queryInterface, Sequelize) => {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
  },
};
