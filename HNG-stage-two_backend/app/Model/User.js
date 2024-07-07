const { DataTypes } = require('sequelize');
const sequelize = require('../../config/database');
const { ulid } = require('ulid');
const Organisation = require('./Organisation');

const User = sequelize.define('User', {
  userId: {
    type: DataTypes.STRING,
    defaultValue: () => ulid(),
    primaryKey: true,
    unique: true,
  },
  firstName: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  lastName: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
    validate: {
      isEmail: true,
    },
  },
  password: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  phone: {
    type: DataTypes.STRING,
  },
});

module.exports = User;
