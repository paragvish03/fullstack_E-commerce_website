'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      User.belongsTo(models.Cart)
    }
  }
  User.init({
    name: DataTypes.TEXT,
    email: DataTypes.TEXT,
    password: DataTypes.TEXT,
    title:{ 
      type:DataTypes.TEXT,
      defaultValue:"user"
    }
  }, {
    sequelize,
    modelName: 'User',
    createdAt:false,
    updatedAt:false
  });
  return User;
};