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
        type: DataTypes.INTEGER,
      },
      paymentID: {
        type: DataTypes.INTEGER,
        allowNull: false,
        reference: {
          model: "Payment",
          key: "paymentID",
        },
      },
      employeeID: {
        type: DataTypes.INTEGER,
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
