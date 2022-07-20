'use strict';
const {
  Model
} = require('sequelize');
const subcategory = require('./subcategory');
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
    name: {
      type: DataTypes.STRING,
      allowNull: false
    },
    price: {
      type: DataTypes.STRING,
      allowNull: false
    },
    rating: DataTypes.INTEGER,
    overview: {
      type: DataTypes.TEXT,
      allowNull: false
    },
    specifications: {
      type: DataTypes.TEXT,
      allowNull: false
    },
    shipping: {
      type: DataTypes.TEXT,
      allowNull: false
    },
    stock: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    subcategory_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: subcategory,
        key: 'id'
      }
    }
  }, {
    sequelize,
    modelName: 'product',
  });
  return product;
};