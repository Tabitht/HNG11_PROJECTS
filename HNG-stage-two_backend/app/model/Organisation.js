const { DataTypes } = require('sequelize');
const sequelize = require('../../config/database');
const { ulid } = require('ulid');

const Organisation = sequelize.define('Organisation', {
  orgId: {
    type: DataTypes.STRING,
    defaultValue: DataTypes.ulid,
    primaryKey: true,
    unique: true,
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  description: {
    type: DataTypes.STRING,
  },
});

module.exports = Organisation;