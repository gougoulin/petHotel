"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Authority extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Authority.belongsToMany(models.User, { through: models.AuthorityUser });
    }
  }
  Authority.init(
    {
      authorityID: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      permission: {
        type: Sequelize.INTEGER,
      },
      detail: {
        type: Sequelize.TEXT,
      },
    },
    {
      sequelize,
      modelName: "Authority",
    }
  );
  return Authority;
};
