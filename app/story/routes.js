const express = require('express');
const router = express.Router();
const passport = require('passport')
const { upload } = require('../utils/multer');
const { createStory, deleteStory, userStoriesById } = require('./controllers');

router.post('/api/post/newStory', passport.authenticate('jwt', { session: false }), upload.single('video'), createStory);
router.delete('/api/post/deleteStory/:id', passport.authenticate('jwt', { session: false }), deleteStory);
router.get('/api/post/userStoriesById', passport.authenticate('jwt', { session: false }), userStoriesById);


module.exports = router;