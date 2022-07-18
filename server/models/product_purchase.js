'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class product_purchase extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  product_purchase.init({
    product_id: DataTypes.INTEGER,
    purchase_id: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'product_purchase',
  });
  return product_purchase;
};