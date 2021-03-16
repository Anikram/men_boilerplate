require('dotenv').config();

const fs = require('fs');
const path = require('path');
const mongoose = require('mongoose');
const { ExtractJwt } = require('passport-jwt');
const JwtStrategy = require('passport-jwt').Strategy;

const UsersSchema = require('../db/models/Users');

const Users = mongoose.model('Users', UsersSchema);
const PUB_KEY = fs.readFileSync(path.join(__dirname, '..', '/keys/id_rsa_pub1.pem'), 'utf8');

const options = {
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
  secretOrKey: PUB_KEY,
  algorithms: ['RS256'],
};

const strategy = new JwtStrategy(options, (payload, done) => {
  Users.find({ _id: payload.sub })
    .then((user) => (user ? done(null, user) : done(null, false)))
    .catch((err) => done(err, null));
});

module.exports = (passport) => {
  passport.use('jwt', strategy);
};
