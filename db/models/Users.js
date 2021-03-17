const mongoose = require('mongoose');
const crypto = require('crypto');

const UsersSchema = mongoose.Schema({
  firstName: {
    type: String,
    required: true,
  },
  lastName: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  username: {
    type: String,
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

module.exports = UsersSchema;