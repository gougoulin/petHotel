"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Admin extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Admin.belongsTo(model.User, { foreignKey: "userId" });
    }
  }
  Admin.init(
    {
      adminID: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      firstName: {
        type: Sequelize.STRING,
      },
      lastName: {
        type: Sequelize.STRING,
      },
      userID: {
        type: Sequelize.INTEGER,
        allowNull: false,
        reference: {
          model: "User",
          key: "userID",
        },
      },
    },
    {
      sequelize,
      modelName: "Admin",
    }
  );
  return Admin;
};
