'use strict';
const {
  Model
} = require('sequelize');
const user = require('./user');
module.exports = (sequelize, DataTypes) => {
  class review_store extends Model {
    static associate(models) {
      review_store.belongsTo(models.store, {
        foreignKey: 'store_id',
        as: 'store'
      });
      review_store.belongsTo(models.user, {
        foreignKey: 'user_id',
        as: 'user'
      });
    }
  }
  review_store.init({
    title: {
      type: DataTypes.STRING,
      allowNull: false
    },
    rating: DataTypes.INTEGER,
    description: {
      type: DataTypes.TEXT,
      allowNull: false
    },
    helpful_votes: DataTypes.INTEGER,
    unhelpful_votes: DataTypes.INTEGER,
    store_id: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    user_id: {
      type: DataTypes.INTEGER,
      allowNull: false
    }
  }, {
    sequelize,
    modelName: 'review_store',
  });
  return review_store;
};