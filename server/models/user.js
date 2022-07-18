'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class user extends Model {
    static associate(models) {
      user.hasMany(models.review, {
        foreignKey: 'user_id',
        as: 'review',
      });
      user.hasMany(models.purchase, {
        foreignKey: 'user_id',
        as: 'purchase',
      });
      user.hasMany(models.review_store, {
        foreignKey: 'user_id',
        as: 'review_store',
      });
    }
  }
  user.init({
    username: DataTypes.STRING,
    password: DataTypes.STRING,
    email: DataTypes.STRING,
    first_name: DataTypes.STRING,
    last_name: DataTypes.STRING,
    payment_method: DataTypes.STRING,
    telephone_number: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'user',
  });
  return user;
};