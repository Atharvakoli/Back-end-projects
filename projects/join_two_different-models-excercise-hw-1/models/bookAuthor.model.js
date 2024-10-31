let { dataTypes, sequelize } = require("../lib/index/js");
let { bookModel } = require("../models/book.model.js");
const { authorModel } = require("./author.model");

let bookAuthorModel = sequelize.define("bookAuthor", {
  bookId: {
    type: dataTypes.INTEGER,
    reference: {
      model: bookModel,
      key: "id",
    },
  },
  authorId: {
    type: dataTypes.INTEGER,
    reference: {
      model: authorModel,
      key: "id",
    },
  },
});

authorModel.belongsToMany(bookModel, { through: bookAuthorModel });
bookModel.belongsToMany(authorModel, { through: bookAuthorModel });

module.exports = { bookAuthorModel };
