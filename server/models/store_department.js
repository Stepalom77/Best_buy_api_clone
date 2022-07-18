'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class store_department extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  store_department.init({
    store_id: DataTypes.INTEGER,
    department_id: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'store_department',
  });
  return store_department;
};