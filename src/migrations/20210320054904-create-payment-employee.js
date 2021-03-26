"use strict";
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable("PaymentEmployees", {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      paymentID: {
        type: Sequelize.INTEGER,
        allowNull: false,
        reference: {
          model: "Payment",
          key: "paymentID",
        },
      },
      employeeID: {
        type: Sequelize.INTEGER,
        allowNull: true,
        reference: {
          model: "Employee",
          key: "employeeID",
        },
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
    });
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable("PaymentEmployees");
  },
};
