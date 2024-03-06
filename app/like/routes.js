const express = require('express');
const router = express.Router();
const {addLikeToPost, addLikeToComment,addLikeToStory, removeLike, getLikesByPost, getLikesByComment ,getLikesByStory} = require('./controllers');
const passport = require('passport');

// Маршрут для добавления лайка к посту
router.post('/api/like/add-like-to-post/:postId', passport.authenticate('jwt', { session: false }), addLikeToPost);

// Маршрут для добавления лайка к комментарию
router.post('/api/like/add-like-to-comment/:commentId', passport.authenticate('jwt', { session: false }), addLikeToComment);

// Маршрут для добавления лайка к истории
router.post('/api/like/add-like-to-story/:storyId', passport.authenticate('jwt', { session: false }), addLikeToStory);

// Маршрут для удаления лайка
router.delete('/api/like/remove-like/:likeId', passport.authenticate('jwt', { session: false }), removeLike);

// Маршрут для получения лайков по id поста
router.get('/api/like/get-likes-by-post/:postId', getLikesByPost);

// Маршрут для получения лайков по id комментария
router.get('/api/like/get-likes-by-comment/:commentId', getLikesByComment);

// Маршрут для получения лайков по id истории
router.get('/api/like/get-likes-by-story/:storyId', getLikesByStory);

module.exports = router;