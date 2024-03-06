const Like = require('./Like');

// Добавление лайка к посту
const addLikeToPost = async (req, res) => {
    try {
        const userId = req.user.id;
        const { postId } = req.params;

        // Проверяем, существует ли лайк для данного пользователя и поста
        // Остальные поля (commentId и storyId) могут быть null
        const existingLike = await Like.findOne({where: { userId, postId },});

        if (existingLike) {
            return res.status(400).json({ message: 'Лайк уже существует' });
        }
        // Создаем новый лайк
        const newLike = await Like.create({ userId, postId });
        return res.status(201).json(newLike);
    } catch (error) {
        res.status(500).send({ message: 'Ошибка сервера' });
    }
};

// Добавление лайка к комментарию
const addLikeToComment = async (req, res) => {
    try {
        const  userId  = req.user.id;
        const { commentId } = req.params;

        // Проверяем, существует ли лайк для данного пользователя и комментария
        // Остальные поля (postId и storyId) могут быть null
        const existingLike = await Like.findOne({where: { userId, commentId },});

        if (existingLike) {
            return res.status(400).json({ message: 'Лайк уже существует' });
        }
        // Создаем новый лайк
        const newLike = await Like.create({ userId, commentId });
        return res.status(201).json(newLike);
    } catch (error) {
        console.error('Ошибка при добавлении лайка:', error);
        res.status(500).send({ message: 'Ошибка сервера' });
    }
};

// Добавление лайка к истории
const addLikeToStory = async (req, res) => {
    try {
        const  userId  = req.user.id;
        const { storyId } = req.params;

        // Проверяем, существует ли лайк для данного пользователя и истории
        // Остальные поля (postId и commentId) могут быть null
        const existingLike = await Like.findOne({where: { userId, storyId },});

        if (existingLike) {
            return res.status(400).json({ message: 'Лайк уже существует' });
        }
        // Создаем новый лайк
        const newLike = await Like.create({ userId, storyId });
        return res.status(201).json(newLike);
    } catch (error) {
        console.error('Ошибка при добавлении лайка:', error);
        res.status(500).send({ message: 'Ошибка сервера' });
    }
};

// Удаление лайка
const removeLike = async (req, res) => {
    try {
        const  userId  = req.user.id;
        const { likeId } = req.params;

        // Проверяем, существует ли лайк с указанным ID и принадлежащий данному пользователю
        const existingLike = await Like.findOne({where: { id: likeId, userId },});

        if (!existingLike) {
            return res.status(404).json({ message: 'Лайк не найден' });
        }
        // Удаляем лайк
        await existingLike.destroy();
        return res.status(200).json({ message: 'Лайк успешно удален' });
    } catch (error) {
        console.error('Ошибка при удалении лайка:', error);
        res.status(500).send({ message: 'Ошибка сервера' });
    }
};

// Получение лайков по id поста
const getLikesByPost = async (req, res) => {
    try {
        const { postId } = req.params;
        const likes = await Like.findAll({where: { postId },});
        return res.status(200).json(likes);
    } catch (error) {
        console.error('Ошибка при получении лайков:', error);
        res.status(500).send({ message: 'Ошибка сервера' });
    }
};

// Получение лайков по id комментария
const getLikesByComment = async (req, res) => {
    try {
        const { commentId } = req.params;
        const likes = await Like.findAll({where: { commentId },});
        return res.status(200).json(likes);
    } catch (error) {
        console.error('Ошибка при получении лайков:', error);
        res.status(500).send({ message: 'Ошибка сервера' });
    }
};

// Получение лайков по id истории
const getLikesByStory = async (req, res) => {
    try {
        const { storyId } = req.params;
        const likes = await Like.findAll({where: { storyId },});
        return res.status(200).json(likes);
    } catch (error) {
        console.error('Ошибка при получении лайков:', error);
        res.status(500).send({ message: 'Ошибка сервера' });
    }
};

module.exports ={
    addLikeToPost,
    addLikeToComment,
    addLikeToStory,
    removeLike,
    getLikesByPost,
    getLikesByComment,
    getLikesByStory
}