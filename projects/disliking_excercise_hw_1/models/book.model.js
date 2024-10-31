let { dataTypes, sequelize } = require("../lib/index.js");

let bookModel = sequelize.define("books", {
  title: dataTypes.TEXT,
  author: dataTypes.TEXT,
  genre: dataTypes.TEXT,
  year: dataTypes.INTEGER,
  summary: dataTypes.TEXT,
});

module.exports = { bookModel };
