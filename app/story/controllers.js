const fs = require('fs');
const path = require('path');
const Story = require('./Story')
const { Op } = require('sequelize');
const Like = require('../like/Like');

const createStory = (req, res) => {
    try {
        if(req.file){
            let storyPath = req.file.path.substring(6)
            const currentDate = new Date();
            const validTill = new Date(currentDate.getTime() + (24 * 60 * 60 * 1000)); // Добавляем 24 часа в миллисекундах

            const story = Story.create({
                video: storyPath,
                valid_till: validTill,
                userId: req.user.id
            })
            res.status(200).end();
        }else{
            res.status(401).send({message: "заполните все поля"});
        }
    } catch (error) {
        res.status(500).send(error);
    }
};

const deleteStory = async (req, res) => {
    try {
        const story = await Story.findByPk(req.params.id)
        fs.unlinkSync(path.join(__dirname + '../../../public' + story.video));
        
        await Story.destroy({
            where: { id: req.params.id }
        })
        res.status(200).send();
    } catch (error) {
        res.status(500).send(error);
    }
};

const userStoriesById = async (req, res) => {
    try {
        const currentDate = new Date();
        // Используем Sequelize для поиска историй за последние 24 часа
        const stories = await Story.findAll({
            where: {
                userId: req.user.id,
                valid_till: {
                [Op.gte]: currentDate.getTime()
                },
            },
            include: [{ model: Like }],
        });
        
        if (!stories) {
            return res.status(404).send({ message: 'Сторис не найдена' });
        }
        res.status(200).send(stories);
    } catch (error) {
        res.status(500).send(stories);
    }
}
module.exports = {
    createStory,
    deleteStory,
    userStoriesById
};