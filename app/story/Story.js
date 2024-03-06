const { DataTypes } = require('sequelize');
const db = require('../../config/db');
const User = require('../auth/User');

const Story = db.define('Story', {
    video: {
        type: DataTypes.STRING,
        allowNull: false
    },
    valid_till: {
        type: DataTypes.DATE,
        allowNull: false
    },
},{
    timestamps: false
});

Story.belongsTo(User, {
    foreignKey: 'userId'
});

module.exports = Story;