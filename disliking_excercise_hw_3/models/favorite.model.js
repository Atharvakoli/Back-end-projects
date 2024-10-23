let { dataTypes, sequelize } = require("../lib/index.js");
const { recipeModel } = require("./recipe.model");
const { userModel } = require("./user.model.js");

let favoriteModel = sequelize.define("favorites", {
  userId: {
    type: dataTypes.INTEGER,
    references: {
      model: userModel,
      key: "id",
    },
  },
  recipeId: {
    type: dataTypes.INTEGER,
    references: {
      model: recipeModel,
      key: "id",
    },
  },
});

userModel.belongsToMany(recipeModel, { through: favoriteModel });
recipeModel.belongsToMany(userModel, { through: favoriteModel });

module.exports = { favoriteModel };
