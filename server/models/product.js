'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class product extends Model {
    static associate(models) {
      product.hasMany(models.review, {
        foreignKey: 'product_id',
        as: 'review',
      });
      product.belongsTo(models.subcategory, {
        foreignKey: 'subcategory_id',
        as: 'subcategory'
      });
      product.belongsToMany(models.purchase, {
        through: 'product_purchase',
        as: 'purchase',
        foreignKey: 'product_id'
      });
    }
  }
  product.init({
    name: DataTypes.STRING,
    price: DataTypes.STRING,
    rating: DataTypes.INTEGER,
    overview: DataTypes.TEXT,
    specifications: DataTypes.TEXT,
    shipping: DataTypes.TEXT,
    stock: DataTypes.INTEGER,
    subcategory_id: DataTypes.INTEGER,
  }, {
    sequelize,
    modelName: 'product',
  });
  return product;
};