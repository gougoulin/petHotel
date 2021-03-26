"use strict";
const { Model } = require("sequelize");
const bcrypt = require("bcrypt");
const { saltRounds } = require("../config/config.json")[
  process.env.NODE_ENV || "development"
];

module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      User.hasOne(models.Customer, { foreignKey: "userID" });
      User.hasOne(models.Employee, { foreignKey: "userId" });
      User.hasOne(models.Admin, { foreignKey: "userID" });
      User.belongsToMany(models.Authority, {
        through: "AuthorityUser",
        foreignKey: "userId",
      });
    }
  }
  User.init(
    {
      userID: {
        type: DataTypes.INTEGER,
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
      },
      email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
        validate: {
          isEmail: true,
        },
      },
      password: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          // to be add
          // is: /^[0-9a-f]{64}$/i,
        },
      },
    },
    {
      hooks: {
        beforeCreate: async (user) => {
          user.password = await bcrypt.hash(user.password, saltRounds);
        },
      },
      sequelize,
      modelName: "User",
      timestamps: true,
    }
  );
  return User;
};
