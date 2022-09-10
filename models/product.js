'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Product extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Product.belongsTo(models.Category)
      Product.belongsToMany(models.Cart, {through: 'CartProducts'})
    }
  }
  Product.init({
    name: DataTypes.TEXT,
    description: DataTypes.TEXT,
    about:DataTypes.TEXT,
    price: DataTypes.INTEGER,
    url: {type:DataTypes.TEXT,
      defaultValue:"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSxt_PlpLYLIixaf6eUu5r5i6IWkHkwyihK3CIA1NdMIQIIaiFwl8hq5aXWG73n-PG_7n0&usqp=CAU"}
  }, {
    sequelize,
    modelName: 'Product',
    createdAt:false,
    updatedAt:false
  });
  return Product;
};