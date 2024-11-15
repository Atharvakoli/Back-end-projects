let { sequelize, dataTypes } = require('../lib/index.js');

let movieModel = sequelize.define('movies', {
  name: dataTypes.TEXT,
  genre: dataTypes.TEXT,
  release_year: dataTypes.INTEGER,
  artist: dataTypes.TEXT,
  album: dataTypes.TEXT,
  duration: dataTypes.INTEGER,
});

module.exports = { movieModel };
