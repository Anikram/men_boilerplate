const jsonwebtoken = require('jsonwebtoken');
const fs = require('fs');
const path = require('path');
const { v4: uuidv4 } = require('uuid');

const PRIV_KEY = fs.readFileSync(path.join(__dirname, '..', '/keys/id_rsa_private1.pem'), 'utf8');
// const PUB_KEY = fs.readFileSync(path.join(__dirname, '..', '/keys/id_rsa_pub1.pem'), 'utf8')
const REF_PRIV_KEY = fs.readFileSync(path.join(__dirname, '..', '/keys/id_rsa_private.pem'), 'utf8');
const REF_PUB_KEY = fs.readFileSync(path.join(__dirname, '..', '/keys/id_rsa_pub.pem'), 'utf8');

module.exports = {
  generateAccessToken(user) {
    const { id } = user;
    const expiresIn = '15m';
    const payload = {
      sub: id,
      iat: Date.now(),
      type: 'access',
    };
    const signedToken = jsonwebtoken.sign(payload, PRIV_KEY, { expiresIn, algorithm: 'RS256' });

    return {
      token: `Bearer ${signedToken}`,
      expires: expiresIn,
    };
  },

  generateRefreshToken(user) {
    return jsonwebtoken.sign({ sub: user.id, tokenVersion: user.tokenVersion }, REF_PRIV_KEY, {
      expiresIn: '7d',
      encoding: 'utf8',
      algorithm: 'RS256',
    });
  },

  generatePasswordToken() {
    return jsonwebtoken.sign({}, REF_PRIV_KEY, {
      expiresIn: '5m',
      encoding: 'utf8',
      algorithm: 'RS256',
    });
  },

  verifyRefreshToken(token) {
    return new Promise((r) => r(jsonwebtoken.verify(token, REF_PUB_KEY)));
  },
};
