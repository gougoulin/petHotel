"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Customer extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Customer.belongsTo(models.User, { foreignKey: "userID" });
      Customer.hasMany(models.Payment, { foreignKey: "customerId" });
      Customer.hasMany(models.Pet, { foreignKey: "customerId" });
    }
  }
  Customer.init(
    {
      customerID: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        allowNull: false,
        autoIncrement: true,
      },
      firstName: DataTypes.STRING,
      lastName: DataTypes.STRING,
      email: DataTypes.STRING,
      mobile: DataTypes.STRING,
      phone: DataTypes.STRING,
      address: DataTypes.STRING,
      suburb: DataTypes.STRING,
      postcode: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: "Customer",
    }
  );
  return Customer;
};
