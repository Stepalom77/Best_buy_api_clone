'use strict';
const {
  Model
} = require('sequelize');
const product = require('./product');
module.exports = (sequelize, DataTypes) => {
  class purchase extends Model {
    static associate(models) {
      purchase.belongsTo(models.user, {
        foreignKey: 'user_id',
        as: 'user'
      });
      purchase.belongsToMany(models.product, {
        through: 'product_purchase',
        as: 'product',
        foreignKey: 'purchase_id'
      });
    }
  }
  purchase.init({
    time: DataTypes.DATE,
    amount: DataTypes.STRING,
    product_id: { 
      type:DataTypes.INTEGER,
      references: {
        model: product,
        key: 'id'
      }}
  }, {
    sequelize,
    modelName: 'purchase',
  });
  return purchase;
};