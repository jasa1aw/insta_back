'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.createTable('Stories', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      video: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      valid_till: {
        type: Sequelize.DATE,
        allowNull: false,
      },
      userId: {
        type: Sequelize.INTEGER,
        references: {
          model: 'Users', // Таблица, на которую ссылается
          key: 'id'       // Поле, на которое ссылается
        },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE'
      },
    });
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.dropTable('Stories');
  }
};