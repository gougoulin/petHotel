'use strict';
const {
  Model
} = require('sequelize');
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
  };
  AuthorityUser.init({
    UserID: DataTypes.INTEGER,
    AuthorityID: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'AuthorityUser',
  });
  return AuthorityUser;
};