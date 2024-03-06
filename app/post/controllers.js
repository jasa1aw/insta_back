const fs = require('fs');
const path = require('path');
const { Op } = require('sequelize');
const User = require('../auth/User');
const Post = require('./Post');
const Like = require('../like/Like');
const Comment = require('../comments/Comment');

const createPost = async (req, res) => {
    try {
        if(req.file){
            const post = await Post.create({
                image: '/images/postsImages/' + req.file.filename,
                description: req.body.description,
                userId: req.user.id
            })
            res.status(200).send(post);
        }else{
            res.status(401).send({message: "заполните все поля"});
        }
    } catch (error) {
        console.error('Error deleting item by ID:', error);
        res.status(500).send(error);
    }
};

const editPost = async (req, res) => {
    try {
        if(req.file){
            const post = await Post.findByPk(req.body.id);

            fs.unlinkSync(path.join(__dirname + '../../../public' + post.image));

            Post.update({
                image: '/images/postsImages/' + req.file.filename,
                description: req.body.description,
            },
            {
                where: {id: req.body.id}
            });
            
            res.status(200).end();
        }else if(!req.file){
            const post = await Post.findByPk(req.body.id);
            Post.update({
                description: req.body.description,
            },
            {
                where: {id: req.body.id}
            });
        }else{
            res.status(401).send({message: "заполните все поля"});
        }
    } catch (error) {
        res.status(500).send(error);
    }
};

const deletePostByID = async (req, res) => {
    try {
        const post = await Post.findByPk(req.params.id)
        fs.unlinkSync(path.join(__dirname + '../../../public' + post.image));
        await Post.destroy({
            where: { id: req.params.id }
        })
        res.status(200).send();
    } catch (error) {
        console.error('Error deleting item by ID:', error);
        res.status(500).send(error);
    }
};


// -------------------------

const getAllUserPosts = async (req, res) => {
    try {
        const posts = await Post.findAll({
        where: {
            userId: req.user.id,
        },
        include: [
                { model: Like },
                {
                    model: User,
                    attributes: ['id', 'full_name', 'username'], // Выбирайте нужные атрибуты пользователя
                },
            ], // Включите связанные лайки
        });

        if (!posts) {
            return res.status(404).send({ message: 'Посты не найден' });
        }
        res.status(200).send(posts);
    } catch (error) {
        res.status(500).send('Error while fetching items:', error);
    }
};

const getAllUsersPosts = async (req, res) => {
    try {
        const posts = await Post.findAll(
        {
            include: [
                { model: Like },
                { model: Comment },
                {
                    model: User,
                    attributes: ['id', 'full_name', 'username'], // Выбирайте нужные атрибуты пользователя
                },
            ],
        });
        
        if (!posts) {
            return res.status(404).send({ message: 'Посты не найден' });
        }
        res.status(200).send(posts);
    } catch (error) {
        res.status(500).send('Error while fetching items:', error);
    }
};

const getPostByID = async (req, res) => {
    try {
        const post = await Post.findOne({
            where: { id: req.params.id },
            include: [
                { model: Like },
                { model: Comment },
                {
                model: User,
                attributes: ['id', 'full_name', 'username'], // Выбирайте нужные атрибуты пользователя
                },
            ], // Включите связанные лайки
        });

        if (!post) {
            return res.status(404).send({ message: 'Пост не найден' });
        }
        res.status(200).send(post);
    } catch (error) {
        res.status(500).send(error);
    }
};

const getPostsByUserID = async (req, res) => {
    try {
        const post = await Post.findAll({
            where: { userId: req.params.id },
            include: [
                { model: Like },
                { model: Comment },
                {
                model: User,
                attributes: ['id', 'full_name', 'username'], // Выбирайте нужные атрибуты пользователя
                },
            ], // Включите связанные лайки
        });

        if (!post) {
            return res.status(404).send({ message: 'Пост не найден' });
        }
        res.status(200).send(post);
    } catch (error) {
        res.status(500).send(error);
    }
}

const getByUsername = async (req, res) => {
    try {
            const username = req.params.username.toLowerCase();
            const user = await User.findOne({
            where: {username: { [Op.iLike]: `%${username}%` }}
        });

        if (!user) {
            return res.status(404).send({ message: 'User not found' });
        }else{
            const posts = await Post.findAll({
                where: {
                userId: user.id
                },
                include: [{ model: Like }] 
            })
            res.status(200).send(posts)
        }
    } catch (error) {
        res.status(500).send(error)
    }
};


module.exports = {
    createPost, 
    getAllUserPosts, 
    getAllUsersPosts, 
    getPostByID,
    getPostsByUserID, 
    deletePostByID, 
    editPost, 
    getByUsername
};

