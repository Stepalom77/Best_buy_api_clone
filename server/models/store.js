'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class store extends Model {
    static associate(models) {
      store.hasMany(models.review_store, {
        foreignKey: 'store_id',
        as: 'review_store',
      });
      store.belongsToMany(models.department, {
        through: 'store_department',
        as: 'department',
        foreignKey: 'store_id'
      });
    }
  }
  store.init({
    name: DataTypes.STRING,
    address: DataTypes.STRING,
    schedule: DataTypes.TEXT,
    telephone_number: DataTypes.INTEGER,
    email: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'store',
  });
  return store;
};