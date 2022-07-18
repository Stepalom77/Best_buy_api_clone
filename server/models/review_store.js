'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class review_store extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  review_store.init({
    title: DataTypes.STRING,
    rating: DataTypes.INTEGER,
    description: DataTypes.TEXT,
    helpful_votes: DataTypes.INTEGER,
    unhelpful_votes: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'review_store',
  });
  return review_store;
};