const User = require('../auth/User');
const Subscription = require('./Subscription');

const follow = async (req, res) => {
    try {
        const followerId = req.user.id; // Идентификатор текущего пользователя
        const followingId = req.params.userId;  
        const subscription = await Subscription.create({ followerId, followingId });
        res.status(201).send(subscription);
    } catch (error) {
        res.status(400).send({ message: error.message });
    }
}

const unFollow = async (req, res) => {
    try {
        const followerId = req.user.id; // Идентификатор текущего пользователя
        const followingId = req.params.userId;
        await Subscription.destroy({
            where: { followerId, followingId },
        });
        res.status(204).end();
    } catch (error) {
        res.status(500).send({ message: error.message });
    }
};

const getFollowers = async (req, res) => {
    try {
        const user = await User.findOne({
            where: {id: req.params.id},
            attributes: { exclude: ['password'] }, // Исключаем поле password из выборки
        });
        
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }else{
            const followers = await Subscription.findAll({
                where: { followingId: user.id },
                include: [{ model: User, as: 'Follower', attributes: { exclude: ['password'] } }], // Включаем данные о подписчиках
            });
            res.status(200).send(followers)
        }
    } catch (error) {
        res.status(200).send(error)
    }
};

const getFollowings = async (req, res) => {
    try {
        const user = await User.findOne({
            where: {id: req.params.id},
            attributes: { exclude: ['password'] }, // Исключаем поле password из выборки
        })
        
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }else{
            const following = await Subscription.findAll({
                where: { followerId: user.id },
                include: [{ model: User, as: 'Following', attributes: { exclude: ['password'] } }], // Включаем данные о подписчиках
            });
            res.status(200).send(following)
        }
    } catch (error) {
        res.status(200).send(error)
    }
};

const getSuggestions = async (req, res) => {
    const userId = req.params.userId  
    try {
        const user = await User.findByPk(userId);
        if (!user) {
            return res.status(400).send({message: 'User not found'})
        }
        // Используем ассоциацию Subscription для получения друзей (подписчиков)
        const friends = await Subscription.findAll({
            where: { followerId: user.id },
            include: [{ model: User, as: 'Follower', attributes: { exclude: ['password'] } }], // Включаем данные о подписчиках
        });

        const friendsOfFriends = [];
        // Получить друзей каждого друга пользователя
        for (const friend of friends) {
            const friendFriends = await Subscription.findAll({
                where: { followerId: friend.followingId },
                include: [{ model: User, as: 'Following', attributes: { exclude: ['password'] } }], // Включаем данные о подписчиках
            });
            // Добавить в список друзей друзей только тех, кого пользователь ещё не знает
            const newFriendsOfFriend = friendFriends.filter(
                (friendOfFriend) => !friends.some((userFriend) => userFriend.id === friendOfFriend.id)
            );
            friendsOfFriends.push(...newFriendsOfFriend);
        };
        
        // фильтрация на кого подписан я и на кого подписаны те на кого подписан я
        let friendList = friendsOfFriends;
        const subscriptions = friends;
        friendList = friendList.filter(item => item.followingId !== user.id);

        const notSubscribedUsers = friendList.filter(
            (friend) => !subscriptions.some((subscription) => subscription.followingId === friend.followingId)
        );

        // 5 - limit
        const suggestions = notSubscribedUsers.slice(0, 5);
        res.status(200).send(suggestions)
    } catch (error) {
        console.error('Error getting friend list:', error);
        res.status(400).send({message: 'something wrong'})
    }
};

module.exports = {follow, unFollow, getFollowers, getFollowings, getSuggestions};