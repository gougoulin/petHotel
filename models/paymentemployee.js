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
      PaymentID: DataTypes.INTEGER,
      EmployeeID: DataTypes.INTEGER,
    },
    {
      sequelize,
      modelName: "PaymentEmployee",
    }
  );
  return PaymentEmployee;
};
