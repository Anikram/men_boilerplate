const crypto = require('crypto');

module.exports = {
  generateHashSalt(password) {
    const salt = crypto.randomBytes(16).toString('hex');
    const hash = crypto.pbkdf2Sync(password, salt, 10000, 512, 'sha512').toString('hex');
    return { hash, salt };
  },
  validatePassword(password, salt, hash) {
    const calcHash = crypto.pbkdf2Sync(password, salt, 10000, 512, 'sha512').toString('hex');
    return hash === calcHash;
  },
};
