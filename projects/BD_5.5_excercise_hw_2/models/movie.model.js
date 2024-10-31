let { dataTypes, sequelize } = require('../lib/index.js');

let movieModel = sequelize.define('movies', {
  title: dataTypes.TEXT,
  director: dataTypes.TEXT,
  genre: dataTypes.TEXT,
  year: dataTypes.INTEGER,
  summary: dataTypes.TEXT,
});

module.exports = { movieModel };
