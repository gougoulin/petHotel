"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class AuthorityUser extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  AuthorityUser.init(
    {
      authorityuserID: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.INTEGER,
      },
      userID: {
        type: DataTypes.INTEGER,
        allowNull: false,
        reference: {
          model: "User",
          key: "userID",
        },
      },
      AuthorityID: {
        type: DataTypes.INTEGER,
        allowNull: false,
        reference: {
          model: "Authority",
          key: "authorityID",
        },
      },
    },
    {
      sequelize,
      modelName: "AuthorityUser",
    }
  );
  return AuthorityUser;
};
