'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class product extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  product.init({
    name: DataTypes.STRING,
    price: DataTypes.STRING,
    rating: DataTypes.INTEGER,
    overview: DataTypes.TEXT,
    specifications: DataTypes.TEXT,
    shipping: DataTypes.TEXT,
    stock: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'product',
  });
  return product;
};