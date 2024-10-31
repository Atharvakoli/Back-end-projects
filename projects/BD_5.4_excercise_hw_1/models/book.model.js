let { dataTypes, sequelize } = require('../lib/index.js');

let bookModel = sequelize.define('books', {
  title: dataTypes.TEXT,
  genre: dataTypes.TEXT,
  publicationYear: dataTypes.INTEGER,
});

module.exports = { bookModel };
