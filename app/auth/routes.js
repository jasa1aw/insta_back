const express = require('express');
const {signUp, signIn, editUser, userDetailInfo, getUserInfoById} = require('./controllers');
const router = express.Router();
const passport = require('passport')

router.post('/api/auth/signup', signUp);
router.post('/api/auth/signin', signIn);
router.put('/api/auth/editUser', passport.authenticate('jwt', { session: false }),  editUser);
router.get('/api/userDetailInfo/:username', userDetailInfo)
router.get('/api/getUserInfoById/:id', getUserInfoById)


module.exports = router;