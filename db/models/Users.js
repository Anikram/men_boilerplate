const mongoose = require('mongoose');
const crypto = require('crypto');

const UsersSchema = mongoose.Schema({
  name: {
    type: String,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  username: {
    type: String,
    required: true,
  },
  hash: {
    type: String,
  },
  salt: {
    type: String,
  },
  tokenVersion: {
    type: Number,
    default: 0,
  },
  passwordToken: {
    type: String,
  },
});

UsersSchema.statics.generateHashSalt = (password) => {
  const salt = crypto.randomBytes(16).toString('hex');
  const hash = crypto.pbkdf2Sync(password, salt, 10000, 512, 'sha512').toString('hex');
  return { hash, salt };
};

UsersSchema.statics.validatePassword = (password, salt, hash) => {
  const calcHash = crypto.pbkdf2Sync(password, salt, 10000, 512, 'sha512').toString('hex');
  return hash === calcHash;
};

module.exports = UsersSchema;

// mongoose.model('Users', UsersSchema);
