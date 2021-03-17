const mongoose = require('mongoose');
const { sendMail } = require('../helpers/mailMock');
const { sendRefreshToken } = require('../helpers/tokens');
const {
  generateAccessToken,
  generateRefreshToken,
  verifyRefreshToken,
  generatePasswordToken,
} = require('../utils/jwts');
const UsersSchema = require('../db/models/Users');
const resetPasswordTextAccepted = require('../content/emails/resetPasswordTextAccepted');

const Users = mongoose.model('Users', UsersSchema);

module.exports = {
  // eslint-disable-next-line consistent-return
  async register(req, res) {
    const {
      firstName, lastName, email, username, password,
    } = req.body;
    const oldUser = await Users.find({ email });
    const user = oldUser[0];
    if (user) { return res.json({ statusCode: 1, error: 'This email is already taken.' }); }
    const { hash, salt } = Users.generateHashSalt(password);
    const newPlayer = new Users({
      firstName,
      lastName,
      username,
      email,
      hash,
      salt,
    });
    newPlayer.save().then((resUser) => {
      const jrt = generateRefreshToken(resUser);
      const jwt = generateAccessToken(resUser);
      sendRefreshToken(res, jrt); // set refresh token into cookies
      return res.json({
        statusCode: 0, accessToken: jwt.token, refreshToken: jrt, expiresIn: jwt.expires,
      });
    }).catch((err) => res.json({ statusCode: 1, errors: err }));
  },
  async authenticate(req, res) {
    const { email, password } = req.body;
    const oldUser = await Users.find({ email });
    const user = oldUser[0];
    if (!user) {
      return res.json({ statusCode: 1, error: 'No user with such credentials.' });
    }
    const { hash, salt } = user;
    const isValid = Users.validatePassword(password, salt, hash);
    if (isValid) {
      const jrt = generateRefreshToken(user);
      const jwt = generateAccessToken(user);
      sendRefreshToken(res, jrt); // set refresh token into cookies
      return res.json({
        statusCode: 0, accessToken: jwt.token, refreshToken: jrt, expiresIn: jwt.expires,
      });
    } else {
      return res.json({ statusCode: 1, error: 'Email or password are incorrect.' });
    }
  },
  async logout(req, res) {
    sendRefreshToken(res, '');
    res.json({ statusCode: 0, message: 'Logged out successfully.' });
  },
  // eslint-disable-next-line consistent-return
  async refreshTokens(req, res) {
    const token = req.cookies.jrt;
    if (!token) return res.json({ statusCode: 1, accessToken: '', error: 'No refresh token is provided' });
    verifyRefreshToken(token)
      .then(async (response) => {
        const users = await Users.find({ _id: response.sub });
        const user = users[0];
        if (!user) return res.json({ statusCode: 1, accessToken: '', error: 'User not found' });
        if (user.tokenVersion !== response.tokenVersion) {
          return res.json({ statusCode: 1, accessToken: '', error: 'Token version is invalid' });
        }
        const jrt = generateRefreshToken(user);
        const jwt = generateAccessToken(user);
        sendRefreshToken(res, jrt); // set refresh token into cookies
        sendRefreshToken(res, generateRefreshToken(users[0]));
        return res.json({
          statusCode: 0, accessToken: jwt.token, refreshToken: jrt, expiresIn: jwt.expires,
        });
      })
      .catch((err) => res.json({ statusCode: 1, accessToken: '', error: `Refresh token invalid: ${err.message}` }));
  },
  // eslint-disable-next-line consistent-return
  async getResetPasswordLink(req, res) {
    const { email } = req.body;
    if (!email) {
      return res.json({ statusCode: 1, error: 'Email needed to proceed' });
    }
    const oldUser = await Users.find({ email });
    const user = oldUser[0];
    if (!user) {
      return res.json({ statusCode: 1, error: 'No user with such credentials.' });
    }
    user.tokenVersion += 1;
    user.passwordToken = generatePasswordToken();
    user.save();
    sendMail(req, res, email, resetPasswordTextAccepted(req.headers.host, user.passwordToken))
      .then(() => res.json({ statusCode: 0, msg: 'sent' }))
      .catch((err) => res.json({ statusCode: 1, accessToken: '', error: `${err.message}` }));
  },
  // eslint-disable-next-line consistent-return
  async resetPassword(req, res) {
    try {
      const { passToken, email, userNewPassword } = req.body;
      const users = await Users.find({ email });
      const user = users[0];
      if (!user) { return res.json({ statusCode: 1, error: 'No user with such credentials.' }); }
      if (!userNewPassword) { return res.json({ statusCode: 1, error: 'New password is invalid.' }); }
      if (user.passwordToken !== passToken) { return res.json({ statusCode: 1, error: 'Invalid password token.' }); }
      const { hash, salt } = Users.generateHashSalt(userNewPassword);
      const newPassToken = generatePasswordToken();
      user.hash = hash;
      user.salt = salt;
      user.passwordToken = newPassToken;
      await user.save();
      return res.json({ statusCode: 0, message: 'Password has been changed' });
    } catch (err) {
      console.error(err.message);
    }
  },
};
