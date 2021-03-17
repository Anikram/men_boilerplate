// === mongoDB ===

const mongoose = require('mongoose');
const dbConfig = require('../config/database');
// const UsersSchema = require('./models/Users');

module.exports = async () => {
  const db = mongoose.connection;
  mongoose.connect(dbConfig.database, { useUnifiedTopology: true, useNewUrlParser: true });
  db.on('error', console.error.bind(console, 'connection error:'));
  db.once('open', () => true);
};

// === postgreSQL template ===

// module.exports = async (instance) => {
//   let retries = 5;
//   while (retries) {
//     try {
//       await instance.authenticate();
//       console.log('Connection has been established successfully.');
//       break;
//     } catch (error) {
//       console.error('Unable to connect to the database:', error);
//       retries -= 1;
//       console.log(`retries left: ${retries}`);
//       await new Promise((res) => setTimeout(res, 5000));
//     }
//   }
// };
