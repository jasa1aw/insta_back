const {DataTypes} = require('sequelize');
const db = require('../../config/db');
const User = require('../auth/User');
const Post  = require('../post/Post');

const Comment = db.define('Comment', {
    description: {
        type: DataTypes.STRING,
        allowNull: true
    }
});

Comment.belongsTo(User, {
    foreignKey: 'userId'
});
Comment.belongsTo(Post, {
    foreignKey: 'postId'
});
Post.hasMany(Comment,{
    foreignKey: 'postId'
});

module.exports = Comment;