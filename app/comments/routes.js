const express = require('express');
const {newComment, deleteComment, getCommentsByPostId} = require('./controllers');
const router = express.Router();
const passport = require('passport');

router.post('/api/newComment', passport.authenticate('jwt', { session: false }), newComment);
router.delete('/api/deleteComment/:id', passport.authenticate('jwt', { session: false }), deleteComment);
router.get('/api/getComments/:id', passport.authenticate('jwt', { session: false }), getCommentsByPostId);

module.exports = router;