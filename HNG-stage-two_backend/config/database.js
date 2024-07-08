const { Sequelize } = require('sequelize');
const dotenv = require('dotenv');

dotenv.config();

const databaseUrl = process.env.DATABASE_URL;

const sequelize = new Sequelize(databaseUrl, {
 // process.env.DB_NAME, process.env.DB_USER, process.env.DB_PASSWORD, {
 // host: process.env.DB_HOST,
  dialect: 'postgres',
  protocol: 'postgres',
  logging: false,
  pool: {
    max: 10,
    min: 0,
    acquire: 30000,
    idle: 10000
  }
});
 /** dialectOptions:{
	ssl: isProduction
	  ? {
          require: true,
          rejectUnauthorized: false,
        }
	: false,
  },
  logging: false,**/
// });

module.exports = sequelize;
