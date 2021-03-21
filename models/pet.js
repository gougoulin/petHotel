"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Pet extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Pet.belongsTo(models.Customer, { foreignKey: "customerID" });
    }
  }
  Pet.init(
    {
      petId: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      name: {
        type: Sequelize.STRING,
      },
      animal: {
        type: Sequelize.STRING,
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
      modelName: "Pet",
    }
  );
  return Pet;
};
