const express = require('express');
const {follow, unFollow, getFollowers, getFollowings, getSuggestions} = require('./controllers');
const router = express.Router();
const passport = require('passport');

router.post('/api/:userId/follow', passport.authenticate('jwt', { session: false }), follow);
router.delete('/api/:userId/unfollow', passport.authenticate('jwt', { session: false }), unFollow);
router.get('/api/subscription/:id/followers', getFollowers);
router.get('/api/subscription/:id/following', getFollowings);
router.get('/api/subscription/suggestions/:userId', getSuggestions);

module.exports = router;