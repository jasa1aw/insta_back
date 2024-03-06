const {DataTypes} = require('sequelize');
const db = require('../../config/db');
const User = require('../auth/User');

const Post = db.define('Post', {
    image:{
        type: DataTypes.STRING,
        allowNull: false
    },
    description:{
        type: DataTypes.STRING,
        allowNull: true
    },
}, {
    timestamps: false,
});

Post.belongsTo(User, {
    foreignKey: 'userId'
});

module.exports = Post;