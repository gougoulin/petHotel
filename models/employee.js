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
      fisrtName: DataTypes.STRING,
      lastName: DataTypes.STRING,
      position: DataTypes.STRING,
      email: DataTypes.STRING,
      contact: DataTypes.STRING,
      userID: DataTypes.INTEGER,
    },
    {
      sequelize,
      modelName: "Employee",
    }
  );
  return Employee;
};
