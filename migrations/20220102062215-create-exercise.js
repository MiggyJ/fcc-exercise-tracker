'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('Exercises', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      _id: {
        type: Sequelize.UUID,
        unique: true
      },
      username: {
        type: Sequelize.STRING,
        references:{
          model: {
            tableName: 'users'
          },
          key: 'username'
        }
      },
      description: {
        type: Sequelize.STRING
      },
      duration: {
        type: Sequelize.INTEGER
      },
      date: {
        type: Sequelize.DATE,
      },
      timestamp: {
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
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('Exercises');
  }
};