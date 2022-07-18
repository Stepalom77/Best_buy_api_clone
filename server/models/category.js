'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class category extends Model {
    static associate(models) {
      category.belongsTo(models.department, {
        foreignKey: 'department_id',
        as: 'department'
      });
      category.hasMany(models.subcategory, {
        foreignKey: 'category_id',
        as: 'subcategory',
      });
    }
  }
  category.init({
    name: DataTypes.STRING,
    department_id: { 
      type:DataTypes.INTEGER,
      references: {
        model: department,
        key: 'id'
      }}
  }, {
    sequelize,
    modelName: 'category',
  });
  return category;
};