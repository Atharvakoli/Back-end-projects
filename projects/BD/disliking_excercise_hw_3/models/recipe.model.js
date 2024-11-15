let { sequelize, dataTypes } = require("../lib/index");

let recipeModel = sequelize.define("recipes", {
  title: dataTypes.TEXT,
  chef: dataTypes.TEXT,
  cuisine: dataTypes.TEXT,
  preparationTime: dataTypes.INTEGER,
  instructions: dataTypes.TEXT,
});

module.exports = { recipeModel };
