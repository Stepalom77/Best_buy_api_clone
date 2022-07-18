'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class review_store extends Model {
    static associate(models) {
      review_store.belongsTo(models.store, {
        foreignKey: 'store_id',
        as: 'store'
      });
    }
  }
  review_store.init({
    title: DataTypes.STRING,
    rating: DataTypes.INTEGER,
    description: DataTypes.TEXT,
    helpful_votes: DataTypes.INTEGER,
    unhelpful_votes: DataTypes.INTEGER,
    store_id: { 
      type:DataTypes.INTEGER,
      references: {
        model: store,
        key: 'id'
      }}
  }, {
    sequelize,
    modelName: 'review_store',
  });
  return review_store;
};