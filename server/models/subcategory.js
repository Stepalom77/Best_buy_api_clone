'use strict';
const {
  Model
} = require('sequelize');
const category = require('./category');
module.exports = (sequelize, DataTypes) => {
  class subcategory extends Model {
    static associate(models) {
      subcategory.belongsTo(models.category, {
        foreignKey: 'category_id',
        as: 'category'
      });
      subcategory.hasMany(models.product, {
        foreignKey: 'subcategory_id',
        as: 'product',
      });
    }
  }
  subcategory.init({
    name: {
      type: DataTypes.STRING,
      allowNull: false
    },
    category_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: category,
        key: 'id'
      }
    } 
  }, {
    sequelize,
    modelName: 'subcategory',
  });
  return subcategory;
};