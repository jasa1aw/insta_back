const Comment = require('./Comment');
const Like = require('../like/Like');
const User = require('../auth/User');
const Post = require('../post/Post');

const newComment = async (req, res) => {
    try {
        // Проверка на существование поста
            const postId = req.body.postId;
            const post = await Post.findByPk(postId);

        if (!post) {
            return res.status(404).send({ message: "Пост не найден" });
        }

        if (req.body.description.length > 0) {
            const comment = await Comment.create({
                description: req.body.description,
                userId: req.user.id,
                postId: postId,
            });

            let newComment = {
                id: comment.id,
                description: comment.description,
                userId: comment.userId,
                postId: comment.postId,
                updatedAt: comment.updatedAt,
                createdAt: comment.createdAt,
                User: {
                id: req.user.id,
                full_name: req.user.full_name,
                username: req.user.username,
                },
        };
        res.status(200).send(newComment);
        } else {
            res.status(401).send({ message: "Заполните все поля" });
        }
    } catch (error) {
        console.error(error);
        res.status(500).send({ message: "Что-то пошло не так" });
    }
};


const deleteComment = async (req, res) => {
    try {
        await Comment.destroy({where: { id: req.params.id }});
        res.status(200).end();
    } catch (error) {
        res.status(500).send(error);
    }
}

const getCommentsByPostId = async (req, res) => {
    try {
        const comments = await Comment.findAll({
            where: {postId: req.params.id},
            include: [
                { model: Like }, 
                {
                    model: User,
                    attributes: ['id', 'full_name', 'username'], // Выбирайте нужные атрибуты пользователя
                },
            ], 
        });

        if (!comments) {
            return res.status(404).send({ message: 'Комментарий не найден' });
        }
        res.status(200).send(comments);
    } catch (error) {
        res.status(500).send(error);
    }
}
module.exports = { newComment, deleteComment, getCommentsByPostId }