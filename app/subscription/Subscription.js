const { DataTypes } = require('sequelize');
const db = require('../../config/db');
const User = require('../auth/User');

const Subscription = db.define('Subscription', {
    followerId: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    followingId: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
},
{
  timestamps: false, // Отключение автоматических полей createdAt и updatedAt
});

Subscription.belongsTo(User, {
    foreignKey: 'followerId',
    as: 'Follower', // Алиас для связи с подписчиком (фолловером)
});

Subscription.belongsTo(User, {
    foreignKey: 'followingId',
    as: 'Following', // Алиас для связи с пользователем (на которого подписан фолловер)
});

module.exports = Subscription;
