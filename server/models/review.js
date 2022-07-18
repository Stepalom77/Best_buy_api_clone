'use strict';
const {
  Model
} = require('sequelize');
const product = require('./product');
const user = require('./user');
module.exports = (sequelize, DataTypes) => {
  class review extends Model {
    static associate(models) {
      review.belongsTo(models.user, {
        foreignKey: 'user_id',
        as: 'user'
      });
      review.belongsTo(models.product, {
        foreignKey: 'product_id',
        as: 'product'
      });
    }
  }
  review.init({
    title: DataTypes.STRING,
    rating: DataTypes.INTEGER,
    description: DataTypes.TEXT,
    helpful_votes: DataTypes.INTEGER,
    unhelpful_votes: DataTypes.INTEGER,
    time_if_purchase: DataTypes.DATE,
    user_id: { 
      type:DataTypes.INTEGER,
      references: {
        model: user,
        key: 'id'
      }},
      product_id: { 
        type:DataTypes.INTEGER,
        references: {
          model: product,
          key: 'id'
        }}
  }, {
    sequelize,
    modelName: 'review',
  });
  return review;
};