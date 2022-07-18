'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class purchase extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  purchase.init({
    time: DataTypes.DATE,
    amount: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'purchase',
  });
  return purchase;
};