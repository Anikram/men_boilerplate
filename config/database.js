require('dotenv').config();

//  === mongoDB ===

module.exports = {
  database: process.env.DB_CONNECTION_STRING,
  secret: process.env.DB_SECRET,
};

//  === postgreSQL ===
// module.exports = {
//   development: {
//     username: process.env.DB_USER,
//     password: process.env.DB_PASSWORD,
//     database: process.env.DB_DBNAME,
//     host: process.env.DB_HOST,
//     port: process.env.DB_PORT,
//     dialect: 'postgres',
//     dialectOptions: {
//       bigNumberStrings: true
//     }
//   },
// test: {
//   username: process.env.CI_DB_USERNAME,
//   password: process.env.CI_DB_PASSWORD,
//   database: process.env.CI_DB_NAME,
//   host: '127.0.0.1',
//   port: 3306,
//   dialect: 'mysql',
//   dialectOptions: {
//     bigNumberStrings: true
//   }
// },
// production: {
//   username: process.env.PROD_DB_USERNAME,
//   password: process.env.PROD_DB_PASSWORD,
//   database: process.env.PROD_DB_NAME,
//   host: process.env.PROD_DB_HOSTNAME,
//   port: process.env.PROD_DB_PORT,
//   dialect: 'mysql',
//   dialectOptions: {
//     bigNumberStrings: true,
//     ssl: {
//       ca: fs.readFileSync(__dirname + '/mysql-ca-master.crt')
//     }
//   }
// }
// };

// .sequelizerc
// const path = require('path');
//
// module.exports = {
//   'config': path.resolve('config', 'database.js'),
//   'models-path': path.resolve('db', 'models'),
//   'seeders-path': path.resolve('db', 'seeders'),
//   'migrations-path': path.resolve('db', 'migrations')
// };
