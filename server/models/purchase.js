'use strict';
const {
  Model
} = require('sequelize');
const user = require('./user');
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
    time: {
      type: DataTypes.DATE,
      allowNull: false
    },
    amount: {
      type: DataTypes.STRING,
      allowNull: false
    },
    user_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: user,
        key: 'id'
      }
    }
  }, {
    sequelize,
    modelName: 'purchase',
  });
  return purchase;
};