'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class department extends Model {
    static associate(models) {
      department.hasMany(models.category, {
        foreignKey: 'department_id',
        as: 'category',
      });
      department.belongsToMany(models.store, {
        through: 'store_department',
        as: 'store',
        foreignKey: 'department_id'
      });
    }
  }
  department.init({
    name: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'department',
  });
  return department;
};