const { Sequelize } = require('sequelize');
const dotenv = require('dotenv');

dotenv.config();

const databaseUrl = process.env.DATABASE_URL;

const sequelize = new Sequelize(databaseUrl, {
  host: process.env.DB_HOST,
  dialect: 'postgres',
  dialectOptions:{
	ssl: isProduction
	  ? {
          require: true,
          rejectUnauthorized: false,
        }
	: false,
  },
  logging: false,
});

/**process.env.DB_NAME, process.env.DB_USER, process.env.DB_PASSWORD,**/

module.exports = sequelize;
