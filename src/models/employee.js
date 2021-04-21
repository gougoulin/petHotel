"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Employee extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Employee.belongsTo(models.User, { foreignKey: "userId" });
      Employee.hasMany(models.Payment, { foreignKey: "employeeId" });
    }
  }
  Employee.init(
    {
      employeeID: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.INTEGER,
      },
      firstName: {
        type: DataTypes.STRING,
      },
      lastName: {
        type: DataTypes.STRING,
      },
      position: {
        type: DataTypes.STRING,
      },
      email: {
        type: DataTypes.STRING,
      },
      contact: {
        type: DataTypes.STRING,
      },
      userID: {
        type: DataTypes.INTEGER,
        allowNull: false,
        reference: {
          model: "User",
          key: "userID",
        },
      },
    },
    {
      sequelize,
      modelName: "Employee",
    }
  );
  return Employee;
};
