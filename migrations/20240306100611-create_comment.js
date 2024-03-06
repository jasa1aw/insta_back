'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.createTable('Comments', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      description: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      userId: {
        type: Sequelize.INTEGER,
        references: {
          model: 'Users', // Имя связанной таблицы
          key: 'id', // Поле для связи
        },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE', // В зависимости от логики вашего приложения
      },
      postId: {
        type: Sequelize.INTEGER,
        references: {
          model: 'Posts', // Имя связанной таблицы
          key: 'id', // Поле для связи
        },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE', // В зависимости от логики вашего приложения
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
    });
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.dropTable('Comments');
  }
};