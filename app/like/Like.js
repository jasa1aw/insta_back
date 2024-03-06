const { DataTypes } = require('sequelize');
const db = require('../../config/db');
const User = require('../auth/User');
const Post = require('../post/Post');
const Comment = require('../comments/Comment');
const Story = require('../story/Story');

const Like = db.define('Like', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
    },
    userId: {
        type: DataTypes.INTEGER,
        allowNull: true, // Разрешаем полю userId быть пустым (null)
    },
    postId: {
        type: DataTypes.INTEGER,
        allowNull: true, // Разрешаем полю postId быть пустым (null)
    },
    commentId: {
        type: DataTypes.INTEGER,
        allowNull: true, // Разрешаем полю commentId быть пустым (null)
    },
    storyId: {
        type: DataTypes.INTEGER,
        allowNull: true, // Разрешаем полю storyId быть пустым (null)
    }
},{
    timestamps: false, // Отключение автоматических полей createdAt и updatedAt
});

Like.belongsTo(User, {
    foreignKey: 'userId',
});

Like.belongsTo(Post, {
    foreignKey: 'postId',
});

Like.belongsTo(Comment, {
    foreignKey: 'commentId',
});

Like.belongsTo(Story, {
    foreignKey: 'storyId',
});

Post.hasMany(Like, {
    foreignKey: 'postId',
});

Comment.hasMany(Like, {
    foreignKey: 'commentId',
});

Story.hasMany(Like, {
    foreignKey: 'storyId',
});

module.exports = Like;