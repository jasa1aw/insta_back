'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.createTable('Likes', {
      id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
      },
      userId: {
        type: Sequelize.INTEGER,
        allowNull: true,
        references: {
          model: 'Users',
          key: 'id',
        },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE',
      },
      postId: {
        type: Sequelize.INTEGER,
        allowNull: true,
        references: {
          model: 'Posts',
          key: 'id',
        },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE',
      },
      commentId: {
        type: Sequelize.INTEGER,
        allowNull: true,
        references: {
          model: 'Comments',
          key: 'id',
        },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE',
      },
      storyId: {
        type: Sequelize.INTEGER,
        allowNull: true,
        references: {
          model: 'Stories',
          key: 'id',
        },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE',
      },
    });
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.dropTable('Likes');
  }
};
