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
    name: {
      type: DataTypes.STRING,
      allowNull: false
    },
    address: {
      type: DataTypes.STRING,
      allowNull: false
    },
    schedule: {
      type: DataTypes.TEXT,
      allowNull: false
    },
    telephone_number: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false
    },
  }, {
    sequelize,
    modelName: 'store',
  });
  return store;
};