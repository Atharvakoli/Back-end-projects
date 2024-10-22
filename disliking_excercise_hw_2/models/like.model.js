let { dataTypes, sequelize } = require("../lib/index.js");
const { movieModel } = require("./movie.model.js");
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
  movieId: {
    type: dataTypes.INTEGER,
    allowNull: false,
    references: {
      model: movieModel,
      key: "id",
    },
  },
});

movieModel.belongsToMany(userModel, { through: likeModel });
userModel.belongsToMany(movieModel, { through: likeModel });

module.exports = { likeModel };
