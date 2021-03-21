"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class PaymentEmployee extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  PaymentEmployee.init(
    {
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
    },
    {
      sequelize,
      modelName: "PaymentEmployee",
    }
  );
  return PaymentEmployee;
};
