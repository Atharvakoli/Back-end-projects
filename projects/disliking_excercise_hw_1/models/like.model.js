let { dataTypes, sequelize } = require("../lib/index.js");
const { bookModel } = require("./book.model.js");
const { userModel } = require("./user.model.js");

let likeModel = sequelize.define("likes", {
  userId: {
    type: dataTypes.INTEGER,
    allowNull: false,
    references: {
      model: userModel,
      key: "id",
    },
  },
  bookId: {
    type: dataTypes.INTEGER,
    allowNull: false,
    references: {
      model: bookModel,
      key: "id",
    },
  },
});

bookModel.belongsToMany(userModel, { through: likeModel });
userModel.belongsToMany(bookModel, { through: likeModel });

module.exports = { likeModel };
