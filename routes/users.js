const mongoose = require('mongoose');

const UsersSchema = require('../db/models/Users');

const Users = mongoose.model('Users', UsersSchema);

module.exports = {
  listUsers(req, res) {
    Users.find({}, '_id name username email').then((data) => {
      res.json({ statusCode: 0, data });
    });
  },
};
