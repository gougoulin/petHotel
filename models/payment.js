"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Payment extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Payment.belongsTo(models.Employee, { foreignKey: "employeeID" });
      Payment.belongsTo(models.Customer, { foreignKey: "customerID" });
    }
  }
  Payment.init(
    {
      paymentID: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      method: {
        type: Sequelize.STRING,
      },
      amount: {
        type: Sequelize.FLOAT,
      },
      gst: {
        type: Sequelize.FLOAT,
      },
      customerID: {
        type: Sequelize.INTEGER,
        allowNull: false,
        reference: {
          model: "Customer",
          key: "customerID",
        },
      },
    },
    {
      sequelize,
      modelName: "Payment",
    }
  );
  return Payment;
};
