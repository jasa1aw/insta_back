'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.createTable('Subscriptions', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      followerId: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: 'Users', // Имя таблицы пользователей
          key: 'id' // Идентификатор пользователя
        },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE'
      },
      followingId: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: 'Users', // Имя таблицы пользователей
          key: 'id' // Идентификатор пользователя
        },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE'
      }
    });
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.dropTable('Subscriptions');
  }
};
