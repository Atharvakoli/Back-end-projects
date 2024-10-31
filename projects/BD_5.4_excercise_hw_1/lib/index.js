let { Sequelize, DataTypes } = require('sequelize');

let sequelize = new Sequelize({
  dialect: 'sqlite',
  storage: './db/database.sqlite',
});

module.exports = { dataTypes: DataTypes, sequelize };
