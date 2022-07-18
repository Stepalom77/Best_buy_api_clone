'use strict';
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('review_stores', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      title: {
        type: Sequelize.STRING
      },
      rating: {
        type: Sequelize.INTEGER
      },
      description: {
        type: Sequelize.TEXT
      },
      helpful_votes: {
        type: Sequelize.INTEGER
      },
      unhelpful_votes: {
        type: Sequelize.INTEGER
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('review_stores');
  }
};