const express = require('express');
const passport = require('passport');

const router = express.Router();

const authRouter = require('./auth');
const usersRouter = require('./users');

router.get('/', (req, res) => res.send('Invalid endpoint'));

router.post('/register', authRouter.register);
router.post('/authenticate', authRouter.authenticate);
router.post('/refresh_token', authRouter.refreshTokens);
router.get('/logout', authRouter.logout);
router.post('/forgot', authRouter.getResetPasswordLink);
router.post('/reset', authRouter.resetPassword);

router.get('/users', passport.authenticate('jwt', { session: false }), usersRouter.listUsers);

module.exports = router;
