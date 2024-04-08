const dotenv = require('dotenv');
require('ts-node/register');
dotenv.config();
module.exports = {
  username: process.env.DB_USERNAME,
  password:  process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  host: 'localhost',
  port: 3000,
  dialect: 'postgres',

};
